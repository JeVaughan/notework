import { fieldSet } from './fieldSet';

it('it should return a valid setter for the field', () => {
  expect(fieldSet<{ a: number }, 'a'>('a')({ a: 1 }, 2)).toEqual({ a: 2 });
  expect(fieldSet<{ a: number }, 'a'>('a')({ a: 5 }, 3)).toEqual({ a: 3 });
});