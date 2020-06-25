import { Pushed } from "./Pushed";

export type PPushed<K, V> = 
  Promise<Pushed<K, V>> | Pushed<K, V>;

export interface PusherM<K, V> {
  push(baseVersion: K, update: V): PPushed<K, V>;
  pull(baseVersion: K): PPushed<K, V>;
  close(): void;
};

export type PusherFn<K, V> = (
  baseVersion: K,
  update?: V,
) => PPushed<K, V>;

export type OnCloseFn = () => void;

export function doNothing(): void {
  // Do nothing on close.
}

class PusherFnClass<K, V>
  implements PusherM<K, V> {

  readonly pushFunc: PusherFn<K, V>;
  readonly onCloseFunc: OnCloseFn;
  
  constructor(pushFunc: PusherFn<K, V>, onClose: OnCloseFn) {
    this.pushFunc = pushFunc;
    this.onCloseFunc = onClose;
  }

  push(baseVersion: K, update: V): PPushed<K, V> {
    return this.pushFunc(baseVersion, update);
  }

  pull(baseVersion: K): PPushed<K, V> {
    return this.pushFunc(baseVersion);
  }

  close(): void {
    return this.onCloseFunc();
  }
}

export function pusherM<K, V>(
  pushFunc: PusherFn<K, V>,
  onClose: OnCloseFn = doNothing,
): PusherM<K, V> {

  return new PusherFnClass(pushFunc, onClose);
}

export function pusherFn<K, V>(
  pusherM: PusherM<K, V>
): PusherFn<K, V> {

  return function(
    baseVersion: K,
    update?: V,
  ): PPushed<K, V> {

    return update ?
      pusherM.push(baseVersion, update) :
      pusherM.pull(baseVersion);
  }
}
