import { List } from "immutable";

import { PusherFn, Pushed, pusherM } from "./Push";
import { Pushed } from "./Pushed";

import { objectEntryList } from "../../util/objectEntryList";
import { mapPusher } from "./mapPusher";

export type PusherMap<K, V extends {}> = {
  [m in keyof V]: PusherFn<K, V[m]>
};

export function childPushers<K, V extends {}>(
  pusherMap: PusherMap<K, V>
): List<PusherFn<K, Partial<V>>> {

  return 
}

export function joinPushed<K, V>(
  ...args: Pushed<K, Partial<V>>
): Pushed<K, V> {


}

export function combinePushers<K, V>(
  pusherMap: PusherMap<K, V>
): PusherFn<K, V> {

  const meh = objectEntryList(
    pusherMap,
    selectPusher
  );
  
  return async function(baseVersion: K, update?: V) {
    const responses = await Promise.all();
    return joinPushed(...responses);
  };
}