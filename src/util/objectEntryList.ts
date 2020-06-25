import { List } from "immutable";

export type ObjectMapFn<O, T> =
  <M extends keyof O> (
    memberId: M,
    value: O[M]
  ) => T;

export function objectEntryList<O extends {}, T>(
  objectMap: O,
  mapFn: ObjectMapFn<O, T>
): List<T> {

  return List(Object.keys(objectMap)).map(
    (key: string) => 
      mapFn(key, objectMap[key])
  )
}
