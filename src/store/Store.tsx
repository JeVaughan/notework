import { Action } from './Actions';

export interface Store<S> {
  readonly state: S;
  reducer(action: Action<S>): void;
};

export function store<S>(
  state: S, 
  reducer: (_: Action<S>) => void
): Store<S> {
  
  return { state, reducer };
}