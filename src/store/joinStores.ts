import { Store, store } from "./Store";
import { Action } from "./Actions";

export function joinStores<S, T>(
  storeS: Store<S>,
  storeT: Store<T>
): Store<S & T> {

  const state: S & T = { 
    ...storeS.state, 
    ...storeT.state 
  };

  return store<S & T>(
    state,
    function(action: Action<S & T>): void {
      var newState: S & T = state;
      storeS.reducer(
        (state: S) => {
          newState = { ...newState, ...state };
          newState = { ...newState, ...action(newState) };
          return <S> newState;
        }
      );
      storeT.reducer(
        (state: T) => {
          newState = { ...newState, ...state };
          newState = { ...newState, ...action(newState) };
          return <T> newState;
        }
      );
    }
  );  
}