
export function mapPromise<I, O>(mapFn: (i: I) => O) {
  return function(obj: Promise<I> | I): Promise<O> | O {
    return obj instanceof Promise ?
      obj.then(mapFn) : mapFn(obj);
  }
}