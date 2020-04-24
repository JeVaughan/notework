import { Action, Store } from "./Store";

export type ActionCreator<S extends {}, Params extends []>
  = (...args: Params) => Action<S> 

export type BoundCreator<Params extends []> =
  (...args: Params) => void

export function bindDispatch<S, P extends []>(
  store: Store<S>,
  creator: ActionCreator<S, P>
): BoundCreator<P> {

  return function(...args: P) {
    console.log('Dispatching: %s(%s).', creator.name, JSON.stringify(args))
    store.dispatch(creator(...args));
  }
}