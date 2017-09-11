const builtinModules = require('builtin-modules');

module.exports = function readPackage(pkg) {
  return pkg.dependencies
    .map(dependency => dependency.name.fullName)
    .concat(builtinModules);
};
