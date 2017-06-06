const path = require('path');
const rollup = require('rollup');
const hulk = require('@njakob/hulk');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupBabel = require('rollup-plugin-babel');
const rollupJSON = require('rollup-plugin-json');

module.exports = async function bundle(packagePath, pkg, dependencies) {
  const packageName = pkg.name.name;
  const packageSourcesPath = path.join(packagePath, 'src');
  const packageLibraryPath = path.join(packagePath, 'lib');

  const banner = hulk.banner({
    commitHash: hulk.getCommitHash(),
    version: pkg.version,
    name: pkg.name.fullName,
    repository: pkg.homepage,
  });

  const rollupBundle = await rollup.rollup({
    entry: path.join(packageSourcesPath, `${packageName}.js`),
    external: dependencies,
    plugins: [
      rollupNodeResolve({
        jsnext: true,
      }),
      rollupJSON(),
      rollupBabel({
        babelrc: true,
      }),
    ],
  });

  await Promise.all([
    rollupBundle.write({
      banner,
      format: 'cjs',
      moduleName: packageName,
      sourceMap: true,
      dest: path.join(packageLibraryPath, `${packageName}.js`),
    }),
    rollupBundle.write({
      banner,
      format: 'es',
      moduleName: packageName,
      sourceMap: true,
      dest: path.join(packageLibraryPath, `${packageName}.es.js`),
    }),
  ]);
};
