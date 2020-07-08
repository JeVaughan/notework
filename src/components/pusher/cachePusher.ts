
import { mapPromise } from "../../util/mapPromise";

import { PusherM, Pushed, PPushed, pusherM } from "./Push";

export function cachePusher<K, V, v extends V = V>(
  basePusher: PusherM<K, v>,
  merge: (src: v, ext: V) => v,
  latestValue: v
): PusherM<K, V> {

  const handleResult = mapPromise(
    function(result: Pushed<K, v>): Pushed<K, v> {
      if (result.newValue) 
        latestValue = result.newValue;

      return result;
    }
  );

  function pusherFn(baseVersion: K, update?: V): PPushed<K, V> {
    return handleResult(
      basePusher.push(
        baseVersion, 
        merge(latestValue, update)
      )
    );
  }

  return pusherM(pusherFn, () => basePusher.close());
}