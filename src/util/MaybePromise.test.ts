import { toPromise } from "./MaybePromise"

it('should return a valid proimse', async done => {
  await expect(toPromise(3)).resolves.toEqual(3);
  done();
});