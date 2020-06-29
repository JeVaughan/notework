import { zipWith } from "./zipWith"

it('should zip 2 lists with a function', () => {
  const addArrays = zipWith((a: number, b: number) => a + b);
  expect(addArrays([1], [2])).toEqual([ 3 ]);
  expect(addArrays([1, 3], [2, 3])).toEqual([ 3, 6 ]);
})

it('should handle empty lists', () => {
  const addArrays = zipWith((a: number, b: number) => a + b);
  expect(addArrays([1, 2], [])).toEqual([]);
})

it('should handle multiple length inputs', () => {
  const addArrays = zipWith((a: number, b: number) => a + b);
  expect(addArrays([1, 2], [2])).toEqual([ 3 ]);
  expect(addArrays([1, 3], [2, 3, 4])).toEqual([ 3, 6 ]);
})
