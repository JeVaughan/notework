import { tuple } from "./tuple";

it('should construct an empty tuple', () => {
  expect(tuple()).toEqual([]);
});

it('should construct a single element tuple', () => {
  expect(tuple(1)).toEqual([1]);
});

it('should construct a multi-element tuple', () => {
  expect(tuple(1, 2)).toEqual([1, 2]);
});