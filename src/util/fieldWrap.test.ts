import { fieldWrap } from './fieldWrap';

type TestT = { a: boolean, b: number, c: string };

it('it should return a valid wrapper for the field', () => {
  expect(fieldWrap<TestT, 'a'>('a')(true)).toEqual({ a: true });
  expect(fieldWrap<TestT, 'b'>('b')(3)).toEqual({ b: 3 });
  expect(fieldWrap<TestT, 'c'>('c')('hi')).toEqual({ c: 'hi' });
});