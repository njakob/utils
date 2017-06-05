/* @flow */

import fs from 'fs';

export default function writeFile(filePath: string, buffer: Buffer): Promise<*> {
  return new Promise((resolve: () => void, reject: (err: ?Error) => void) => {
    fs.writeFile(filePath, buffer, { encoding: 'utf8' }, (err: ?Error): void => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
