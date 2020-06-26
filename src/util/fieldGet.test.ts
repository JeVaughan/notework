import { fieldGet } from './fieldGet';

it('it should return a valid getter for the field', () => {
  expect(fieldGet<{ a: number }, 'a'>('a')({ a: 1 })).toEqual(1);
  expect(fieldGet<{ a: number }, 'a'>('a')({ a: 5 })).toEqual(5);
});