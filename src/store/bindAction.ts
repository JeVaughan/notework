import { useMemo } from "react";
import { Store } from "./Store";
import { ActionCreator } from "./Actions";

export function bindAction<S, P extends any[]>(
  store: Store<S>,
  creator: ActionCreator<S, P>
): (...args: P) => void {

  return useMemo<(...args: P) => void>(
    () => function(...args: P): void {
      store.reducer(creator(...args))

    }, [ store, creator ]
  );
}