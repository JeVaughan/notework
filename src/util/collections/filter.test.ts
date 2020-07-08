import { filter } from "./filter";

it('should correctly filter a list', () => {
  expect(filter([true, false, false, true, false]))
    .toEqual([true, true]);
})

it('should correctly filter using a function', () => {
  expect(filter([1, 2, 3, 4, 5, 6], i => i % 2 === 0))
    .toEqual([2, 4, 6]);
})
