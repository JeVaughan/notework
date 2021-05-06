import { useState, useMemo } from "react";
import { Store, store, Reducer } from "./Store";
import { identity } from "../util/identity";

export type Setter<S> = (state: S) => void;

export type StoreBinding<S> = 
  (reducer: Reducer<S>) => Reducer<S>;

export function useStore<S>(
  initState: S,
  binding: StoreBinding<S> = identity
): Store<S> {

  const [state, setState] = useState<S>(initState);
  
  return useMemo(
    () => store(state, binding(setState)),
    [state, binding, setState]
  );
}