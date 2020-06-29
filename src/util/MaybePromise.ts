
export type MaybePromise<T> = Promise<T> | T;

export function toPromise<T>(maybe: MaybePromise<T>): Promise<T> {
  return maybe instanceof Promise ? 
    maybe : new Promise(resolve => resolve(maybe));
}