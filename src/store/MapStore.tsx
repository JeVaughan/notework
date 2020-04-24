import React, { useContext, Context, useMemo, useState } from "react";
import { Map } from 'immutable';

import { objectFromMap } from "../util/objectFromMap";
import { JsonMap } from "../util/JsonMap";

import { bindDispatch, ActionCreator, BoundCreator } from "./ActionCreator";
import { Store } from "./Store";

type StoreHeader<S> = {
  contents?: S,
  binder?: <P extends []> (fn: ActionCreator<S, P>) => BoundCreator<P>,
};

const StoreContext: Context<StoreHeader<any>>
  = React.createContext<StoreHeader<any>>({});

export type StoreMappings<S> = { 
  selectors?: JsonMap<(state: S) => any>, 
  actions?: JsonMap<ActionCreator<S, any>>, 
};

export function mapStore<S, P>(Component: any, mappings: StoreMappings<S>) {
  const selectors = Map(mappings.selectors);

  return function(providedProps: any) {
    const { contents, binder } = useContext(StoreContext)!;

    const bindings: Map<string, BoundCreator<any>> = useMemo(
      () => Map(mappings.actions).map(binder),
      [ binder ]
    );

    return <Component 
      {...objectFromMap(selectors.map(fn => fn(contents)))}
      {...objectFromMap(bindings)}
      {...providedProps} 
    />;
  }
}

export function useStore<S>(...selectors: ((state: S) => any)[]): any[] {
  const { contents } = useContext(StoreContext)!;
  return useMemo(() => selectors.map(fn => fn(contents)), [ selectors, contents ]);
}

export function useActions<S>(...actions: ActionCreator<S, any>[]): any[] {
  const { binder } = useContext(StoreContext)!;
  return useMemo(() => actions.map(binder), [ actions, binder ]);
}

export type MapStoreProps<S> = { 
  store: Store<S> 
  children?: any,
};


// TODO update with local store, selectors, and routing.
export function MapStore<S>({ store, children }: MapStoreProps<S>) {
  const [contents, setContents] = useState<S>(store.contents());

  function binder<P extends []>(creator: ActionCreator<S, P>): BoundCreator<P> {
    return function(...args: P) {
      console.log('Dispatching: %s(%s).', creator.name, JSON.stringify(args))
      setContents(store.dispatch(creator(...args)).contents());
    }
  }
  
  return <StoreContext.Provider value={{contents, binder}}>
    {children}
  </StoreContext.Provider>
}