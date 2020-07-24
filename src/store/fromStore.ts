import { useMemo } from "react";
import { Store } from "./Store";

export function fromStore<S, T>(
  store: Store<S>, func: (s: S) => T
): T {

  const { state } = store;
  return useMemo<T>(
    () => func(state), 
    [ func, state ]
  );
}