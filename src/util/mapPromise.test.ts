import { mapPromise } from './mapPromise';

function testStringFn(num: number): string {
  return String(num);
}

it('it should map the input function over non-promises', () => {
  expect(mapPromise(testStringFn)(432)).toEqual("432");
});

it('it should map the input function over promises', async () => {
  const promise = mapPromise(testStringFn)(new Promise(() => 432));
  
  expect(promise instanceof Promise).toBeTruthy();
  expect(await promise).toEqual("432");
});