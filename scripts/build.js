const cliUtils = require('@njakob/cli-utils');
const bundle = require('./bundle');
const findPackages = require('./findPackages');
const readPackage = require('./readPackage');
const getDependencies = require('./getDependencies');
const generateFlowDefinitions = require('./generateFlowDefinitions');

const reporter = new cliUtils.ConsoleReporter();

async function build() {
  const cwd = process.cwd();

  const packagesPaths = findPackages(cwd);

  const buildActivity = reporter.activity(reporter.parse`Bundle ${packagesPaths.length} package${packagesPaths.length > 0 ? 's' : ''}`);

  try {
    const packages = packagesPaths.reduce((table, packagePath) => {
      // eslint-disable-next-line no-param-reassign
      table[packagePath] = readPackage(packagePath);
      return table;
    }, {});

    await Promise.all(packagesPaths.map(async (packagePath) => {
      const pkg = packages[packagePath];
      await bundle(packagePath, pkg, getDependencies(pkg));
    }));

    packagesPaths.forEach((packagePath) => {
      const pkg = packages[packagePath];
      generateFlowDefinitions(packagePath, pkg);
    });
  } finally {
    buildActivity.complete();
  }
}

build().catch((err) => {
  reporter.error(reporter.parse`${reporter.styles.bold.red`Unexpected Error`}: ${err.stack}`);
});
