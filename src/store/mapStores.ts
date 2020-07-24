import { useMemo } from "react";
import { Store, store } from "./Store";
import { Action } from "./Actions";

export function mapStore<S, T>(
  storeS: Store<S>,
  mapS2T: (s: S) => T,
  mapT2S: (t: T, s: S) => S
): Store<T> {

  return useMemo(
    () => store<T>(
      mapS2T(storeS.state),
      function(action: Action<T>): void {
        storeS.reducer(
          (stateS: S) => 
            mapT2S(
              action(mapS2T(stateS)), 
              stateS
            )
        )
      }

    ), [ storeS, mapS2T, mapT2S ]
  );
}