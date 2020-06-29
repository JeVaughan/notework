
import { first } from './first';

it('should return undefined with empty iterators', () => {
  expect(first([])).toBe(undefined);
  expect(first(new Set())).toBe(undefined);
});

it('should otherwise return the first element of an iterator', () => {
  expect(first([1])).toBe(1);
  expect(first(new Set([1]))).toBe(1);
  expect(first([1, 3, 4, 5, 6])).toBe(1);
});

function *repeat(num: number): IterableIterator<number> {
  while (true) yield num;
}

it('should only evaluate the first element of a generator', () => {
  expect(first(repeat(1))).toBe(1);
});