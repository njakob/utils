/* @flow */

export type HashObject<T> = {[key: string]: T };

export function hashObjectValues<T>(hashObject: HashObject<T>): Array<T> {
  return (Object.values(hashObject): any);
}
