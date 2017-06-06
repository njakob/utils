/* @flow */

import fs from 'fs';
import * as core from './core';

// @TODO: Fix Buffer type
export default function readFile(filePath: string): Promise<any> {
  return new Promise((resolve: core.Resolution<any>, reject: core.Rejection) => {
    fs.readFile(filePath, { encoding: 'utf8' }, (err: ?Error, data: any): void => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}
