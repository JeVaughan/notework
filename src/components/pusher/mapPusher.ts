
import { PusherM, pusherM } from './Push';
import { Pushed, wasUpdated, pushAcc } from './Pushed';

export function mapPusher<K, v, V>(
  basePusher: PusherM<K, v>,
  mapFn: (_: V) => v,
  unmapFn: (_: v) => V,
): PusherM<K, V> {

  function unmapV({ data, ...res }: Pushed<K, v>): Pushed<K, V> {
    return { data: unmapFn(data), ...res };
  }

  return pusherM<K, V>(
    function(baseVersion: K, update?: V): Pushed<K, V> {
      if (update) {
        const pushed: Pushed<K, v> = 
          basePusher.push(baseVersion, mapFn(update));
      
        return wasUpdated(pushed) ?
          unmapV(pushed) : 
          pushAcc(pushed.version, update);
      }

      return unmapV(basePusher.pull(baseVersion));
      
    }, () => basePusher.close()
  )
}