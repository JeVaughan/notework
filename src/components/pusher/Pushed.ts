

// --------------------- //
// --- PUSH ACCEPTED --- //
// --------------------- //

import { PusherFn } from "./Push";

export type PushAccepted<K, V> = {
  version: K,
  data: V,
};

export function pushAcc<K, V>(
  version: K, data: V
): PushAccepted<K, V> {

  return { version, data };
}

export function wasAccepted<K, V>(
  p: Pushed<K, V>
): p is PushAccepted<K, V> {

  return !wasModified(p) && !wasRejected(p);
}


// --------------------- //
// --- PUSH MODIFIED --- //
// --------------------- //

export type PushModified<K, V> = {
  version: K,
  data: V,
  modified: string,
};

export function pushMod<K, V>(
  version: K, data: V, 
  modified: string = 'Push was modified'
): PushModified<K, V> {

  return { version, data, modified };
}

export function wasModified<K, V>(
  p: Pushed<K, V>
): p is PushModified<K, V> {

  return p.hasOwnProperty('modified');
}


// --------------------- //
// --- PUSH REJECTED --- //
// --------------------- //

export type PushRejected<K, V> = {
  version: K,
  data: V,
  rejected: string,
};

export function wasRejected<K, V>(
  p: Pushed<K, V>
): p is PushRejected<K, V> {

  return p.hasOwnProperty('rejected');
}

export function pushRej<K, V>(
  version: K, data: V, 
  rejected: string = 'Push was rejected'
): PushRejected<K, V> {

  return { version, data, rejected };
}


// -------------------- //
// --- PUSH CLASSES --- //
// -------------------- //

export type PushUpdated<K, V> = 
  PushModified<K, V> |
  PushRejected<K, V>;

export function wasUpdated<K, V>(
  p: Pushed<K, V>
): p is PushUpdated<K, V> {

  return !wasAccepted(p);
}

export type Pushed<K, V> = 
  PushAccepted<K, V> |
  PushModified<K, V> |
  PushRejected<K, V>;

export function isPushed(
  src: any
): src is Pushed<any, any> {

  return src.hasOwnProperty('version')
    && src.hasOwnProperty('data');
}