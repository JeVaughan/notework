import { Pusher, pusherFn, Pushed } from "./Push";
import { MaybePromise } from "../../util/MaybePromise";

export function simplifyPusher<S>(basePusher: Pusher<any, S>) {
  const pusher = pusherFn(basePusher);

  var version: any;
  function handleResult({ newVersion, newValue }: Pushed<any, S>): S {
    if (newVersion !== undefined) 
      version = newVersion

    return newValue
  }

  return function(newValue?: S): MaybePromise<S> {
    const result = pusher(version, newValue);
    
    return result instanceof Promise ?
      result.then(handleResult) :
      handleResult(result);
  }
}