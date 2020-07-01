import { Pushed, PPushed, PusherM, pusherM } from "./Push";
import { mapPromise } from "../../util/mapPromise";

export function orderPusher<K, V>(
  basePusher: PusherM<K, V>,
  order: (k1: K, k2: K) => number,
  latestVersion: K
): PusherM<K, V> {

  function pusherFn(baseVersion: K, update?: V): PPushed<K, V> {
    const handleResult = mapPromise(
      function(result: Pushed<K, V>): Pushed<K, V> {
        const { newVersion } = result;

        if (newVersion && order(latestVersion, newVersion) > 0) {
          latestVersion = newVersion;
          return result;
        }
        return { error: `Ignoring older version ${newVersion}.` }
      }
    );

    if (order(latestVersion, baseVersion) == 0)
      return handleResult(basePusher.push(baseVersion, update));
    else
      return { newVersion: latestVersion };
  }

  return pusherM(pusherFn, () => basePusher.close());
}