/* @flow */

import fs from 'fs';

export default function readFile(filePath: string): Promise<Buffer> {
  return new Promise((resolve: (Buffer) => void, reject: (Error) => void) => {
    fs.readFile(filePath, (err: ?Error, data: Buffer): void => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}
