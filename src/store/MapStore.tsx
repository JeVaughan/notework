import React, { useContext, Context, useMemo } from "react";
import { Map } from 'immutable';

import { objectFromMap } from "../util/objectFromMap";
import { JsonMap } from "../util/JsonMap";

import { bindDispatch, ActionCreator, BoundCreator } from "./ActionCreator";
import { Store } from "./Store";

const StoreContext: Context<Store<any>>
  = React.createContext<any>(undefined);

export type StoreMappings<S> = { 
  selectors?: JsonMap<(state: S) => any>, 
  actions?: JsonMap<ActionCreator<S, any>>, 
};

export function mapStore<S, P>(Component: any, mappings: StoreMappings<S>) {
  const selectors = Map(mappings.selectors);

  return function(providedProps: any) {
    const store: Store<S> = useContext(StoreContext)!;
    if (store === undefined) 
      return <>ERROR: Store is undefined</>

    const state: S = useMemo(() => store.contents(), [ store ]);

    const bindings: Map<string, BoundCreator<any>> = useMemo(
      () => Map(mappings.actions).map(fn => bindDispatch(store, fn)),
      [ store ]
    );

    return <Component 
      {...objectFromMap(selectors.map(fn => fn(state)))}
      {...objectFromMap(bindings)}
      {...providedProps} 
    />;
  }
}


// TODO update with local store, selectors, and routing.
export function MapStore({ store, children }: any) {
  return <StoreContext.Provider value={store}>
    { children }
  </StoreContext.Provider>
}