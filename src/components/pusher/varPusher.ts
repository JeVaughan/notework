import { PusherFn, PPushed } from "./Push";

export function varPusher<V>(initialValue: V): PusherFn<number, V> {
  var version: number = 0, value: V = initialValue;

  return function(baseVersion?: number, update?: V): PPushed<number, V> {
    if (update === undefined || baseVersion === undefined) {
      return {
        newVersion: version,
        newValue: value,
      };

    } else if (baseVersion === version) {
      version += 1;
      value = update;

      return { 
        newVersion: version,
        newValue: value,
      };
    }

    return { newVersion: version };
  }
}