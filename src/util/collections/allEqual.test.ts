
import { allEqual } from './allEqual';

it('should correctly comparse 2 iterators', () => {

  expect(allEqual([], [])).toBe(true);
  
  expect(allEqual([1], [])).toBe(false);
  
  expect(allEqual([1], [1])).toBe(true);
  
  expect(allEqual([1], [2])).toBe(false);
  
  expect(allEqual([1, 2], [1])).toBe(false);

});