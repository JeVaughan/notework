import { pullPusher } from "./pullPusher";
import { varPusher } from "./varPusher";
import { toPromise } from "../../util/MaybePromise";

it('should pull a non-promise pusher immediately', () => {
  let result;
  pullPusher(varPusher("four"), (version, value) => result = [ version, value ]);
  expect(result).toEqual([ 0, "four" ]);
});

it('should pull a promise pusher on completion', async done => {
  pullPusher(
    () => toPromise({ newVersion: 0, newValue: "four" }), 

    (version, value) => {
      expect([ version, value ]).toEqual([ 0, "four" ]);
      done();
    }
  );
});