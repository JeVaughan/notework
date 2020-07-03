import React, { useContext, Context, useMemo, useState } from "react";

import { Pusher } from "../components/pusher/Push";;
import { simplifyPusher } from "../components/pusher/simplifyPusher";
import { mapPromise } from "../util/mapPromise";

import { ActionCreator, ActionBinder } from "./Actions";

type StoreHeader<S> = {
  contents?: S,
  binder?: ActionBinder<S>,
};

const StoreContext: Context<StoreHeader<any>>
  = React.createContext<StoreHeader<any>>({});

export function useStore<S>(...selectors: ((state: S) => any)[]): any[] {
  const { contents } = useContext(StoreContext)!;
  return useMemo(() => selectors.map(fn => fn(contents)), [ selectors, contents ]);
}

export function useActions<S>(...actions: ActionCreator<S, any>[]): any[] {
  const { binder } = useContext(StoreContext)!;
  return useMemo(() => actions.map(binder), [ actions, binder ]);
}

export type MapStoreProps<S> = { 
  state0?: S,
  pusher: Pusher<any, S>,
  children?: any,
};

// TODO update with local store, selectors, and routing.
export function MapStore<S>({ state0, pusher, children }: MapStoreProps<S>) {
  const simplified = simplifyPusher(pusher);
  const initialGet = simplified();

  const [contents, setContents] = useState<S>(
    initialGet instanceof Promise ?
      state0 : initialGet
  );

  const handleResult = mapPromise(setContents);

  if (initialGet instanceof Promise)
    handleResult(initialGet);
  
  const binder: ActionBinder<S> = 
    <P extends []> (creator: ActionCreator<S, P>) => 
      (...args: P) => {
        console.log('Dispatching: %s(%s).', creator.name, JSON.stringify(args))
        handleResult(simplified(creator(...args)(contents)));
      }
      
  return <StoreContext.Provider value={{ contents, binder }}>
    {children}
  </StoreContext.Provider>
}