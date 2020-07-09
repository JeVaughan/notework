
import { mapPromise } from "../../util/mapPromise";
import { writeJson } from "../../util/json";

import { PusherFn, PPushed, Pushed } from "./Push";

export function dfltLogCall(rawKey: any, rawValue: any): void {
  const key = writeJson(rawKey), val = writeJson(rawValue);
  console.trace(`Pusher: Call(key=${key}, val=${val})`);
}

export function dfltLogPushed(pushed: Pushed<any, any>): void {
  const { newVersion, newValue } = pushed;
  const key = writeJson(newVersion), value = writeJson(newValue);
  console.trace(`Pusher: Return(key=${key}, val=${value})`);
}

export function logPusher<K, V>(
  basePusher: PusherFn<K, V>,
  logCall: (key: K, value?: V) => void = dfltLogCall,
  logPushed: (pushed: Pushed<K, V>) => void = dfltLogPushed,
): PusherFn<K, V> {

  const handleResponse = mapPromise(
    function(pushed: Pushed<K, V>): Pushed<K, V> {
      logPushed(pushed);
      return pushed;
    }
  )

  return function(baseVersion: K, update?: V): PPushed<K, V> {
    logCall(baseVersion, update);
    return handleResponse(basePusher(baseVersion, update));
  }
}