import { flattenPromises } from "./flattenPromises"
import { toPromise } from "./MaybePromise";

it('should flatten non-promises', () => {
  expect(flattenPromises([ 1, 2, 3 ])).toEqual([ 1, 2, 3 ]);
})

it('should flatten promises in order', async done => {
  const result = flattenPromises([ 
    toPromise(1),
    toPromise(2),
    toPromise(3),
  ]);

  expect(result instanceof Promise).toBeTruthy();
  await expect(result).resolves.toEqual([ 1, 2, 3 ]);
  done()
})