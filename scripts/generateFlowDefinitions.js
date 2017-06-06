const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

module.exports = function generateFlowDefinitions(packagePath, pkg) {
  const packageSourcesPath = path.join(packagePath, 'src');
  const packageLibraryPath = path.join(packagePath, 'lib');
  const definitionPath = path.join(packageLibraryPath, `${pkg.name.name}.js.flow`);
  const definitionESPath = path.join(packageLibraryPath, `${pkg.name.name}.es.js.flow`);

  childProcess.execSync([
    './node_modules/.bin/flow',
    'gen-flow-files',
    `--out-dir ${packageLibraryPath}`,
    `${path.join(packageSourcesPath, pkg.name.name)}.js`,
  ].join(' '));

  let definition = fs.readFileSync(definitionPath, 'utf8');
  definition = definition.replace(/import.*\n/g, '');
  fs.writeFileSync(definitionPath, definition, 'utf8');
  fs.writeFileSync(definitionESPath, definition, 'utf8');
};
