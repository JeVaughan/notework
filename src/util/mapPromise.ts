import { MaybePromise } from "./MaybePromise";

export function mapPromise<I, O>(mapFn: (i: I) => O) {
  return function(obj: MaybePromise<I>): MaybePromise<O> {
    return obj instanceof Promise ?
      obj.then(mapFn) : mapFn(obj);
  }
}