/* @flow */

import * as uuid from 'uuid';

// @TODO: Fix Buffer type
export default function v1Buffer<T: Array<number> | any>(buffer: T, offset: number): T {
  return uuid.v1({}, buffer, offset);
}
