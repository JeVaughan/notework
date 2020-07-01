
import { List } from 'immutable';

import { PusherFn, Pushed } from "./Push";

export function testPusher<K, V>(
  ...args: Pushed<K, V>[]
): PusherFn<K, V> {

  console.assert(args.length > 0);
  
  const states = List(args);
  const last = <Pushed<K, V>> states.last();
  
  var idx: number = -1;
  return () => states.get(idx += 1, last);
}