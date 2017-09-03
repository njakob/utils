/* @flow */

export function guard<T>(value: ?T, fallback?: T): T {
  if (value != null) {
    return value;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  // TODO: Error code
  throw new Error('Missing value');
}

export function asNumber(value: mixed, fallback?: number): number {
  if (typeof value === 'number') {
    return value;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  // TODO: Error code
  throw new Error('Value not a number');
}

export function asString(value: mixed, fallback?: string): string {
  if (typeof value === 'string') {
    return value;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  // TODO: Error code
  throw new Error('Value not a string');
}

export function as<T>(value: mixed, type: Class<T>, fallback?: T): T {
  if (value instanceof type) {
    return value;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  // TODO: Error code
  // $FlowFixMe
  const typeName = type.name;
  throw new Error(`Value not ${typeName}`);
}

export function maybeNumber(value: mixed): ?number {
  if (typeof value === 'number') {
    return value;
  }

  if (value === null || value === undefined) {
    return null;
  }

  // TODO: Error code
  throw new Error('Value not a number');
}

export function maybeString(value: mixed): ?string {
  if (typeof value === 'string') {
    return value;
  }

  if (value === null || value === undefined) {
    return null;
  }

  // TODO: Error code
  throw new Error('Value not a string');
}

export function maybe<T>(value: mixed, type: Class<T>): ?T {
  if (value instanceof type) {
    return value;
  }

  if (value === null || value === undefined) {
    return null;
  }

  // TODO: Error code
  // $FlowFixMe
  const typeName = type.name;
  throw new Error(`Value not ${typeName}`);
}
