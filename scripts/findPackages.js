const fs = require('fs');
const path = require('path');

module.exports = function findPackages(cwd) {
  const directoryPath = path.resolve(cwd, 'packages');
  const filesPaths = fs.readdirSync(directoryPath);

  return filesPaths
    .map(filePath => path.resolve(directoryPath, filePath))
    .filter(filePath => fs.lstatSync(filePath).isDirectory())
    ;
};
