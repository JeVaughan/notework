
import { List } from 'immutable';

import { Pushed } from "./Pushed";
import { PusherM, pusherM } from "./Push";

export function testPusher<K, V>(...args: Pushed<K, V>[]): PusherM<K, V> {
  console.assert(args.length > 0);
  
  const states = List(args);
  const last = <Pushed<K, V>> states.last();
  
  var idx: number = -1;
  return pusherM(() => states.get(idx += 1, last));
}