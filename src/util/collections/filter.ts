import { foldr } from "./foldr";

function toBoolean(input: any): boolean {
  return !!input;
}

export function filter<T>(
  iterable: Iterable<T>,
  fn: (t: T) => boolean = toBoolean
): T[] {

  function tryAppend(elem: T, builder: T[]): T[] {
    if (fn(elem))
      builder.push(elem);

    return builder;
  }

  return foldr(iterable, [], tryAppend);
}