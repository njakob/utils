const fs = require('fs');
const path = require('path');
const parcel = require('@njakob/parcel');

module.exports = function readPackage(packagePath) {
  const content = fs.readFileSync(path.resolve(packagePath, 'package.json'), 'utf-8');
  return parcel.parseParcel(JSON.parse(content));
};
