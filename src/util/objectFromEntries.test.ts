
import { objectFromEntries } from './objectFromEntries';

it('should create new objects from entries list', () => {
  const entries: [string, any][] = 
    [["hello", 1], ["world", "!!!"], ["child", { meh: 3 }]];

  expect(objectFromEntries(entries))
    .toEqual({ hello: 1, world: "!!!", child: { meh: 3 } });
});