import { OrderedSet } from "immutable";
import { Action } from "../../../store/Actions";

export type FileHistory = {
  history: OrderedSet<string | undefined>
};

export const EMPTY_HISTORY = { history: OrderedSet() };

export function setOpenFile(filename: string): Action<FileHistory> {
  return function(store: FileHistory) {
    const history: OrderedSet<string | undefined> 
      = OrderedSet([ filename ]).concat(store.history.remove(undefined));

    return { ...store, history };
  }
}

export function getOpenFilename({ history }: FileHistory): string | undefined {
  return history.first(undefined);
}