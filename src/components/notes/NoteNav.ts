import { List } from "immutable";
import { Action } from "../../store/Actions";

export type NoteNav = { selected: List<number> };

export function selectorIsSelected(path: List<number>) {
  return function({ selected }: NoteNav): boolean {
    return selected && path.size === selected.size &&
      path.every((val, idx) => val == selected.get(idx))
  }
}

export function actionSetSelected(selected: List<number>): Action<NoteNav> {
  return store => ({ ...store, selected });
}

export function actionNavigate(nav?: number): Action<NoteNav> {
  return store => {
    const { selected } = store;
    if (selected && selected.size && nav) {
      return {
        ...store,
        selected: selected.pop().push(
          selected.last(0) + nav
        )
      }
    }
  }
}