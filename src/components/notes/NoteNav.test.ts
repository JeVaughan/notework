import { List } from "immutable";
import { selectorIsSelected, actionSetSelected } from "./NoteNav";

function test(a: number[], b: number[]): boolean {
  return selectorIsSelected(List(a))({ selected: List(b) });
}

it('selectorIsSelected should detect empty list equality', () => {
  expect(test([], [])).toBeTruthy();
});

it('selectorIsSelected should work on empty list inequality', () => {
  expect(test([], [1])).toBeFalsy();
  expect(test([1], [])).toBeFalsy();
});

it('selectorIsSelected should detect same length list equality', () => {
  expect(test([1, 2, 3, 4], [1, 2, 3, 4])).toBeTruthy();
});

it('selectorIsSelected should detect same length list inequality', () => {
  expect(test([1, 2, 3, 4], [1, 2, 6, 4])).toBeFalsy();
});

it('selectorIsSelected should detect unequal list length', () => {
  expect(test([1, 2, 3], [1, 2, 3, 4])).toBeFalsy();
});

it('setSelected should set the current selected path', () => {
  expect(actionSetSelected(List([1, 2]))({ selected: List() }).selected)
    .toEqual(List([1, 2]));
})