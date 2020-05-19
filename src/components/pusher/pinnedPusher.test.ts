import { OrderedSet } from "immutable";
import { mapPinned, PINNED_FILE, unmapPinned } from "./pinnedPusher";
import { EMPTY_DIRECTORY_MAP } from "./FsPusher";

function test(...values: string[]) {
  const set = OrderedSet(values);
  expect(unmapPinned(mapPinned(set))).toEqual(set);
}

it('should reserialise an empty set.', () => {
  test();
});

it('should reserialise a single element.', () => {
  test('test');
});

it('should reserialise multiple elements.', () => {
  test('a', 'b', 'CEE', 'DEE');
});

it('should return an empty set for a missing file.', () => {
  expect(unmapPinned(EMPTY_DIRECTORY_MAP))
    .toEqual(OrderedSet())
});

it('should return an empty set for a deleted file.', () => {
  expect(unmapPinned(EMPTY_DIRECTORY_MAP.set(PINNED_FILE, null)))
    .toEqual(OrderedSet())
});
