
import { Map, OrderedSet } from 'immutable';
import { Action } from '../../store/Store';

export type NotebookStore = {
  history: OrderedSet<string | undefined>,
  pinned: OrderedSet<string>,
  notes: Map<string, string>,
};

export const EMPTY_NOTEBOOK: NotebookStore = {
  history: OrderedSet(),
  pinned: OrderedSet(),
  notes: Map()
};

export function setOpenFile(filename?: string): Action<NotebookStore> {
  return function(store: NotebookStore) {
    const history: OrderedSet<string | undefined> 
      = OrderedSet([ filename ]).concat(store.history.remove(undefined));

    return { ...store, history };
  }
}

export function getTargetFilename({ history }: NotebookStore, filename?: string): string | undefined {
  return filename ? filename : history.first();
}

export function getFilebody(store: NotebookStore, filename?: string): string | undefined { 
  return store.notes.get(getTargetFilename(store, filename));
}

export function writeFile(filebody?: string, filename?: string): Action<NotebookStore> {
  return function(store: NotebookStore) {
    const { notes } = store;
    const target: string | undefined = getTargetFilename(store, filename);

    if (target) {
      return {
        notes: typeof filebody === 'string' ? 
          notes.set(target, filebody) : 
          notes.remove(target),

        ...store
      };
    }
  }
}

export function renameFile(newFilename: string, filename?: string): Action<NotebookStore> {
  return function(store: NotebookStore) {
    const { history, pinned, notes } = store;
    const oldFilename: string | undefined = getTargetFilename(store, filename);

    if (oldFilename) {
      const filebody = notes.get(oldFilename);

      if (!notes.contains(newFilename) || typeof filebody === 'string') {
        return {
          history: history,
          
          pinned: pinned.map(
            pinnedFile => pinnedFile === oldFilename ?
              newFilename : pinnedFile
          ),

          notes: notes.merge(Map({
            [newFilename]: filebody,
            [oldFilename]: undefined
          }))
        }
      }
    }
  }
}

export function setPinned(pin: boolean | number, filename?: string): Action<NotebookStore> {
  return function(store: NotebookStore) {
    const { pinned, notes } = store;
    const target: string | undefined = getTargetFilename(store, filename);

    if (target && notes.contains(target)) {
      if (typeof pin === 'number') {
        return {
          pinned: pinned
            .take(pin).remove(target).add(target)
            .concat(pinned.skip(pin)),

          ...store
        };
        
      } else {
        return {
          pinned: pin ? 
            pinned.add(target) :
            pinned.remove(target),

          ...store
        };
      }
    }
  }
}

export function isFilePinned(store: NotebookStore, filename?: string): boolean {
  return store.history.contains(getTargetFilename(store, filename));
}