import { Range } from "immutable";

import { PusherFn } from "./Push";
import { testPusher } from "./testPusher";
import { mapPusher } from "./mapPusher";


function numPusher(): PusherFn<number, number> {
  return testPusher(
    ...Range(0, 5)
      .map(i => ({ newVersion: i }))
      .toArray()
  );
}

it('should use unmap function to create a valid pusher', () => {
  const pusher = mapPusher(
    numPusher(),
    JSON.parse,
    JSON.stringify,
  );

  expect(pusher(0)).toEqual({ newVersion: 0 });
  expect(pusher(1)).toEqual({ newVersion: 1 });
  expect(pusher(2)).toEqual({ newVersion: 2 });
});