/* @flow */

export type Rejection = (err: Error) => void;
export type Resolution<T> = (value: T) => void;
