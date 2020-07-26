import { foldr } from "./foldr";

export function flatMap<I, O>(
  iterable: Iterable<I>,
  func: (i: I) => Iterable<O>
): O[] {

  function appendto(elem: I, acc: O[]): O[] {
    return acc.concat(Array.from(func(elem)));
  }

  return foldr<I, O[]>(iterable, [], appendto);
}