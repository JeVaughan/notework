import { stdEquals, EqFunc } from "./equality";
import { allOf } from "./allOf";

export function containsAll<T>(
  col: Iterable<T>, sub: Iterable<T>,
  eqFunc: EqFunc<T> = stdEquals
): boolean {

  const arr: T[] = Array.from(col);
  return allOf(sub, e2 => arr.findIndex(e1 => eqFunc(e1, e2)) !== -1);
};