import { useState, useMemo } from "react";
import { Store, store } from "./Store";
import { StoreWrapper } from "./StoreSpec";
import { identity } from "../util/identity";

interface StoreBinding<S> {
  getState(): S;
  setState(newState: S): void;
};

export function useStore<S>(
  initState: S,
  wrapper: StoreWrapper<S> = identity
): Store<S> {

  const [state, setState] = useState<S>(initState);
  
  return useMemo(
    () => store(state, wrapper(setState)),
    [state, wrapper, setState]
  );
}