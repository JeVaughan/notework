import { EqFunc, dfltEquals } from "./equality";
import { allOf } from "./allOf";
import { zipWith } from "./zipWith";

export function allEqual<T>(
  a: Iterable<T>, b: Iterable<T>,
  eqFunc: EqFunc<T> = dfltEquals
): boolean {
	
	const alist = Array.from(a), blist = Array.from(b);

  return alist.length === blist.length &&
    allOf(zipWith(eqFunc)(alist, blist));
};