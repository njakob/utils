/* @flow */

type PromiseInspectionOptions<T> = {
  fulfilled: boolean;
  reason?: Error;
  value?: T;
};

export class PromiseInspection<T> {
  reason: ?Error;
  value: ?T;
  isRejected: boolean;
  isFulfilled: boolean;

  constructor(options: PromiseInspectionOptions<T>) {
    this.reason = options.reason;
    this.value = options.value;
    this.isFulfilled = options.fulfilled;
    this.isRejected = !options.fulfilled;
  }

  static fulfill(value: T): PromiseInspection<T> {
    return new PromiseInspection({ fulfilled: true, value });
  }

  static reject(reason: Error): PromiseInspection<T> {
    return new PromiseInspection({ fulfilled: false, reason });
  }
}

export type PromiseInspections<T> = Array<PromiseInspection<T>>;

export function reflect<T>(promise: Promise<T>): Promise<PromiseInspection<T>> {
  return promise.then(
    value => PromiseInspection.fulfill(value),
    reason => PromiseInspection.reject(reason),
  );
}
