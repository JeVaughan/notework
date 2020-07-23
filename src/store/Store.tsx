import { Action } from './Actions';
import { useMemo } from 'react';

export interface Store<S> {
  readonly state: S;
  reducer(action: Action<S>): void;
};

export function store<S>(state: S, reducer: (_: Action<S>) => void): Store<S> {
  return { state, reducer };
}

export function mergeStores<S, T>(
  storeS: Store<S>, storeT: Store<T>
): Store<S | T> {

  return useMemo(
    () => store<S | T>(
      { ...storeS.state, ...storeT.state },
      action => {
        storeS.reducer(
          (s: S) => action({ ...s, ...storeT.state })
        )
      }

    ), [ storeS, storeT ]
  );
}

export function localStore<S>(initState: S): Store<S> {
  return 
}