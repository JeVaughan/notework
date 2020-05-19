import { PusherM } from "./Push";

export function cachePusher<K, V>(
  basePusher: PusherM<K, V>,
  equivalence: (a: V, b: V) => boolean
): PusherM<K, V> {

  return basePusher; // TODO
}