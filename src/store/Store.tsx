import { Action } from './Actions';

export type Reducer<S> = 
  (action: Action<S>) => void;

export interface Store<S> {
  readonly state: S;
  readonly reducer: Reducer<S>;
};

export function store<S>(
  state: S, 
  reducer: (_: Action<S>) => void
): Store<S> {
  
  return { state, reducer };
}