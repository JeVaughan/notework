
export function foldr<I, O>(
  iterable: Iterable<I>, 
  zero: O, 
  fn: (i: I, o: O) => O
): O {
  
  var out: O = zero;
  
  for (const i of Array.from(iterable))
    out = fn(i, out);

  return out;
}