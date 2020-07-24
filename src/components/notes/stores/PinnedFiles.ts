import { OrderedSet } from "immutable";
import { Action } from "../../../store/Actions";

export type PinnedFiles = { pinned: OrderedSet<string> };

export const EMPTY_PINS = { pinned: OrderedSet() };

export function setPinned(pin: boolean | number, target: string): Action<PinnedFiles> {
  return function(store: PinnedFiles) {
    const { pinned } = store;

    if (target) {
      if (typeof pin == 'number') {
        return {
          ...store,
          pinned: 
            pinned.remove(target).take(pin)
              .add(target).concat(pinned)
        };
        
      } else {
        return {
          ...store,
          pinned: pin ? 
            pinned.add(target) :
            pinned.remove(target),
        };
      }
    }
  }
}

export function isFilePinned(filename: string)  {
  return function(store: PinnedFiles): boolean {
    return store.pinned.has(filename);
  }
}