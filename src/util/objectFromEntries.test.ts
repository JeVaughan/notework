
import { objectFromEntries } from './objectFromEntries';

it('should create new objects from entries list', () => {
    const newObj = objectFromEntries([["hello", 1], ["world", "!!!"], ["child", {meh: 3}]]);
    expect(newObj).toEqual({ hello: 1, world: "!!!", child: { meh: 3 } });
});