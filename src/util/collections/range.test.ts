import { range } from "./range";

it('should return empty list when len == 0', () => {
  expect(range(0)).toEqual([]);
});

it('should return [0, 1, 2] when len == 3', () => {
  expect(range(3)).toEqual([0, 1, 2]);
});