/* @flow */

import mkdirp from 'mkdirp';
import * as core from './core';

export default function makeDirectory(directoryPath: string): Promise<*> {
  return new Promise((resolve: core.Resolution<void>, reject: core.Rejection) => {
    mkdirp(directoryPath, (err: ?Error): void => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
