
function toTruthy(x: any): boolean {
  return !!x;
}

export function allOf<T>(
  collection: Iterable<T>, 
  fn: (t: T) => boolean = toTruthy
): boolean {

  for (const elem of Array.from(collection))
    if (!fn(elem)) 
      return false;

  return true;
};

export function anyOf<T>(
  collection: Iterable<T>, 
  fn: (t: T) => boolean = toTruthy
) {

  for (const elem of Array.from(collection))
    if (fn(elem)) 
      return true;

  return false;
};