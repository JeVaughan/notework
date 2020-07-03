
import { Pusher, PPushed, pusherFn, Pushed } from "./Push";

export function pullPusher<K, V>(
  basePusher: Pusher<K, V>,
  cb: (version: K, value: V) => void
): void {

  function callCb({ newVersion, newValue }: Pushed<K, V>) {
    cb(newVersion, newValue);
  }

  const ppushed: PPushed<K, V> = pusherFn(basePusher)();
  
  if (ppushed instanceof Promise)
    ppushed.then(callCb)
  else
    callCb(ppushed);
}