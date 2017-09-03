/* @flow */

export function stripObject(obj: Object): ?Object {
  const clone = {};
  Object.keys(obj).forEach((key) => {
    // eslint-disable-next-line no-use-before-define
    const value = strip(obj[key]);
    if (value !== undefined) {
      clone[key] = value;
    }
  });

  if (Object.keys(clone).length === 0) {
    return undefined;
  }

  return clone;
}

export function stripArray(array: Array<mixed>): Array<mixed> {
  const clone = [];
  const length = array.length;
  for (let i = 0; i < length; i += 1) {
    // eslint-disable-next-line no-use-before-define
    const value = strip(array[i]);
    if (value !== undefined) {
      clone.push(value);
    }
  }
  return clone;
}

export function strip(value: mixed): mixed {
  if (value === null || value === undefined) {
    return undefined;
  } else if (typeof value === 'object') {
    return stripObject(value);
  } else if (Array.isArray(value)) {
    return stripArray(value);
  }
  return value;
}
