
import { flatMap } from "./flatMap";
import { identity } from "../identity";

export function flatten<T>(listOfLists: T[][]): T[];
export function flatten<T>(listOfLists: Iterable<T[]>): T[];
export function flatten<T>(listOfLists: Iterable<T>[]): T[];

export function flatten<T>(listOfLists: Iterable<Iterable<T>>): T[] {
  return flatMap(listOfLists, identity);
};
