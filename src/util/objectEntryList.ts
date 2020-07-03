import { List } from "immutable";


export function mapObject<O, T>(
  objectMap: { [K in keyof O]: T<O[K]> },
  mapFn: <K extends keyof O> (t: T<O[K]>, k: K) => O[K]
): O {

  // Some implmentation
}

const listsObject = {
  a: List([1, 2, 3]),
  b: List(["hello", "there"]),
};

const headsObject = mapObject<
  { a: number, b: string }, List
>(
  listsObject, 
  list => list.get(0)!
);