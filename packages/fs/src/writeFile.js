/* @flow */

import fs from 'fs';
import * as core from './core';

export default function writeFile(filePath: string, buffer: any): Promise<*> {
  return new Promise((resolve: core.Resolution<void>, reject: core.Rejection) => {
    fs.writeFile(filePath, buffer, { encoding: 'utf8' }, (err: ?Error) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
