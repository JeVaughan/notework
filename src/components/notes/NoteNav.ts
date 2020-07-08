import { List } from "immutable";
import { Action } from "../../store/Actions";
import { allEqual } from "../../util/collections/allEqual";

export type NoteNav = { selected?: List<number> };

export function selectorIsSelected(path: List<number>) {
  return function({ selected }: NoteNav): boolean {
    return selected && allEqual(path, selected);
  }
}

export function actionSetSelected(selected: List<number>): Action<NoteNav> {
  return store => ({ ...store, selected });
}

export function actionNavigate(nav?: number): Action<NoteNav> {
  return store => {
    const { selected } = store;
    if (selected && selected.size) {
      return {
        ...store,
        selected: typeof nav === 'number' ?
          selected.pop().push(selected.last(0) + nav) :
          undefined
      }
    }
  }
}