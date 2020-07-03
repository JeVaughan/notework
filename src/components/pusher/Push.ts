
export type Pushed<K, V> = {
  newVersion?: K,
  newValue?: V,
  error?: string
};

export type PPushed<K, V> = 
  Promise<Pushed<K, V>> | Pushed<K, V>;

export interface PusherM<K, V> {
  push(baseVersion: K, update: V): PPushed<K, V>;
  pull(baseVersion: K): PPushed<K, V>;
  close(): void;
};

export type PusherFn<K, V> = (
  baseVersion?: K,
  update?: V,
) => PPushed<K, V>;

export type Pusher<K, V> = PusherM<K, V> | PusherFn<K, V>;

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

  pull(baseVersion?: K): PPushed<K, V> {
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
  pusher: Pusher<K, V>
): PusherFn<K, V> {

  if (typeof pusher === 'function') {
    return pusher;
    
  } else {
    return function(
      baseVersion?: K,
      update?: V,
    ): PPushed<K, V> {

      return update !== undefined ?
        pusher.push(baseVersion, update) :
        pusher.pull(baseVersion);
    }
  }
}
