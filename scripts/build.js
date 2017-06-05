const cliUtils = require('@njakob/cli-utils');
const bundle = require('./bundle');
const findPackages = require('./findPackages');
const readPackage = require('./readPackage');
const getDependencies = require('./getDependencies');

const reporter = new cliUtils.ConsoleReporter();

async function build() {
  const cwd = process.cwd();

  const packagesPaths = findPackages(cwd);

  const buildActivity = reporter.activity(reporter.parse`Bundle ${packagesPaths.length} package${packagesPaths.length > 0 ? 's' : ''}`);

  await Promise.all(packagesPaths.map(async (packagePath) => {
    const pkg = readPackage(packagePath);
    return bundle(packagePath, pkg, getDependencies(pkg));
  }));

  buildActivity.complete();
}

build().catch((err) => {
  reporter.error(reporter.parse`${reporter.styles.bold.red`Unexpected Error`}: ${err.stack}`);
});
