
export type Action<S> = (store: S) => S | undefined;