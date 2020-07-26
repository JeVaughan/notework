
import { flatten } from './flatten';

it('should correctly flatten arrays', () => {

  expect(flatten([])).toEqual([]);

  expect(flatten([[]])).toEqual([]);

  expect(flatten([[], []])).toEqual([]);

  expect(flatten([[1, 2], []])).toEqual([1, 2]);

  expect(flatten([[], [1, 2]])).toEqual([1, 2]);

  expect(flatten([[1], [2], [3]])).toEqual([1, 2, 3]);

});