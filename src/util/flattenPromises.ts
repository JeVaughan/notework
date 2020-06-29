
import { MaybePromise, toPromise } from "./MaybePromise";
import { anyOf } from "./collections/allOf";

export function flattenPromises<T>(
  promises: Iterable<MaybePromise<T>>
): MaybePromise<T[]>  {
  
  const arr = Array.from(promises);
  return anyOf(arr, e => e instanceof Promise) ?
    Promise.all(arr.map(toPromise)) :
    <T[]> arr;
}