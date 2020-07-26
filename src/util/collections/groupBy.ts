import { foldr } from "./foldr";

export function groupBy<K, V, VO = V>(
  list: Iterable<V>, 
  mapFunc: (elem: V) => [K, VO],
): Map<K, VO[]> {

  function indexElem(elem: V, map: Map<K, VO[]>): Map<K, VO[]> {
    const [key, value] = mapFunc(elem);
    const keyList: VO[] = map.get(key);
    
    if (keyList) {
      keyList.push(value);

    } else {
      map.set(key, [value]);
    }

    return map;
  }

  return foldr(list, new Map, indexElem);
}