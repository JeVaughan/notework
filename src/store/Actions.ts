
export type Action<S extends {}> = (s: S) => S | undefined;

export type ActionCreator<S extends {}, Params extends []>
  = (...args: Params) => Action<S> 

export type ActionMiddleware = 
  <S extends {}, P extends []>(creator: ActionCreator<S, P>) =>
    ActionCreator<S, P>

export type ActionBinder<S> = 
  <P extends []>(creator: ActionCreator<S, P>) =>
    (...args: P) => void;

export type Store<S> = (...actions: Action<S>[]) => S;