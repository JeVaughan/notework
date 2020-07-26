import { foldr } from "./foldr";

export function map<I, O>(
  list: Iterable<I>, 
  func: (i: I, idx: number) => O
): O[] {

  function appendto(elem: I, acc: O[], idx: number): O[] {
    acc.push(func(elem, idx));
    return acc;
  }

  return foldr(list, [], appendto);
}