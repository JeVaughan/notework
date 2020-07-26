import { foldr } from "./foldr";

export function groupBy<K, V, VO = V>(
  list: Iterable<V>, 
  getKey: (elem: V) => K,
  getValue: (elem: V, key: K) => VO
): Map<K, VO[]> {

  function indexElem(elem: V, map: Map<K, VO[]>): Map<K, VO[]> {
    const key: K = getKey(elem);
    const keyList: VO[] = map.get(key);
    const newValue: VO = getValue(elem, key);
    
    if (keyList) {
      keyList.push(newValue);

    } else {
      map.set(key, [newValue]);
    }

    return map;
  }

  return foldr(list, new Map, indexElem);
}