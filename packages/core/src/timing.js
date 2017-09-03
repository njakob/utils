/* @flow */

type Rest<T> = $ReadOnlyArray<T>;
type Function0<T, X> = (...args: Rest<T>) => X;

export function throttle<T>(
  callback: Function0<T, void>,
  threshold: number = 250,
): Function0<T, void> {
  let last;
  let deferTimer;

  return (...args: Rest<T>) => {
    const now = Date.now();

    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        callback(...args);
      }, threshold);
    } else {
      last = now;
      callback(...args);
    }
  };
}

export function debounce<T>(
  callback: Function0<T, void>,
  wait: number,
  immediate?: boolean = false,
): Function0<T, void> {
  let timeout: ?number;

  return (...args: Rest<T>) => {
    const later = () => {
      timeout = null;
      if (!immediate) {
        callback(...args);
      }
    };

    const callNow = immediate && timeout !== null;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      callback(...args);
    }
  };
}
