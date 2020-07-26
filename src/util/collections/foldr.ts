import { getIterator } from "./getIterator";

export function foldr<I, O>(
  iterable: Iterable<I>, 
  zero: O, 
  fn: (i: I, o: O, index: number) => O
): O {
  
  var idx: number = 0;
  var it = getIterator(iterable);
  var out: O = zero;

  for (var i = it.next(); !i.done; i = it.next()) {
    out = fn(i.value, out, idx);
    idx += 1;
  }
  
  return out;
}