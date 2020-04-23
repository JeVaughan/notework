
export type Dispatch<S extends {}> 
  = (action: Action<S>) => void;

export type Action<S extends {}> 
  = (store: S, dispatch: Dispatch<S>) => S | undefined;

export class Store<S> { 
  
  private value: S;
  private readonly queue: Action<S>[];

  constructor(initialValue: S) {
    this.value = initialValue;
    this.queue = [];
  }

  hasPendingActions(): boolean {
    return this.queue.length > 0;
  }

  contents(): S {
    return this.value;
  }
  
  dispatch(...actions: Action<S>[]): Store<S> {
    const hadPending: boolean = this.hasPendingActions();
    this.queue.push(...actions);

    if (!hadPending) {
      let nextAction: Action<S>;
      while (nextAction = this.queue.pop()) {
        const result: S | undefined = nextAction(
          this.value, child => { this.dispatch(child) }
        );

        if (result !== undefined) 
          this.value = result;
      };
    }

    return this;
  }

};