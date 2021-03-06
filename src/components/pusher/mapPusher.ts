
import { PusherFn, PPushed, Pushed } from './Push';

export function mapPushed<v, V>(fn: (_: v) => V) {
  return function<K>(pushed: Pushed<K, v>): Pushed<K, V> {
    const { newValue, ...remaining } = pushed;

    return newValue !== undefined ?
      { newValue: fn(newValue), ...remaining } :
      remaining
  }
}

export function mapPusher<K, v, V>(
  basePusher: PusherFn<K, v>,
  mapFn: (_: V) => v,
  unmapFn: (_: v) => V,
): PusherFn<K, V> {

  const unmap = mapPushed(unmapFn);

  return function(
    baseVersion: K, 
    update?: V
  ): PPushed<K, V> {

    const result = basePusher(
      baseVersion, 
      update ? 
        mapFn(update) : 
        undefined
    );

    return result instanceof Promise ?
      result.then(unmap) :
      unmap(result);
  }
}