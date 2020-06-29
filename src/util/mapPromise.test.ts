import { mapPromise } from './mapPromise';
import { toPromise } from './MaybePromise';

function testStringFn(num: number): string {
  return String(num);
}

it('it should map the input function over non-promises', () => {
  expect(mapPromise(testStringFn)(432)).toEqual("432");
});

it('it should map the input function over promises', async done => {
  const promise = mapPromise(testStringFn)(toPromise(432));
  
  expect(promise instanceof Promise).toBeTruthy();
  await expect(promise).resolves.toEqual("432");
  done();
});