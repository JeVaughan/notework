import { useState, useMemo, useReducer } from "react";
import { Store, store } from "./Store";

export function useStore<S>(
  initState: S
): Store<S> {

  const [state, setState] = useState<S>(initState);
  
  return useMemo(
    () => store(state, setState),
    [state, setState]
  );
}