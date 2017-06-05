/* @flow */

import mkdirp from 'mkdirp';

export default function makeDirectory(directoryPath: string): Promise<*> {
  return new Promise((resolve: () => void, reject: (err: ?Error) => void) => {
    mkdirp(directoryPath, (err: ?Error): void => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}
