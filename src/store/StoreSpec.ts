import { Reducer } from "./Store";

export type Setter<S> =  
  (state: S) => void;

export type StoreWrapper<S> = 
  (reducer: Reducer<S>) => Reducer<S>;

