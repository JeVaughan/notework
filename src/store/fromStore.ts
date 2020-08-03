import { useMemo } from "react";
import { Store } from "./Store";

export function fromStore<S, T>(
  { state }: Store<S>, fn: (s: S) => T
): T {

  return useMemo<T>(() => fn(state), [ fn, state ]);
}