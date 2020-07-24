import { OrderedSet } from "immutable";

import { setPinned, EMPTY_PINS } from "./PinnedFiles";

it('setPinned should append new pins to the list', () => {
  expect(setPinned(true, 'meh')(EMPTY_PINS).pinned)
    .toEqual(OrderedSet([ 'meh' ]));

  expect(setPinned(true, 'foo')(setPinned(true, 'meh')(EMPTY_PINS)).pinned)
    .toEqual(OrderedSet([ 'meh', 'foo' ]));
});

it('setPinned should remove existing pins from the list', () => {
  expect(
    setPinned(false, 'meh')(
      setPinned(true, 'meh')(EMPTY_PINS)
    ).pinned.toArray()
  ).toEqual([])

  expect(
    setPinned(false, 'meh')(
      setPinned(true, 'foo')(
        setPinned(true, 'meh')(EMPTY_PINS)
    )).pinned.toArray()
  ).toEqual([ 'foo' ]);
});


it('setPinned can insert new pins at a specific location', () => {
  const store = { pinned: OrderedSet([ 'meh', 'foo', 'bar' ]) };

  expect(setPinned(0, 'ahh')(store).pinned.toArray())
    .toEqual([ 'ahh', 'meh', 'foo', 'bar' ]);

  expect(setPinned(2, 'ahh')(store).pinned.toArray())
    .toEqual([ 'meh', 'foo', 'ahh',  'bar' ]);
});


it('setPinned should be able to re-order existing pins', () => {
  const pinned = { pinned: OrderedSet([ 'meh', 'foo', 'bar' ]) };

  expect(setPinned(1, 'meh')(pinned).pinned.toArray())
    .toEqual([ 'foo', 'meh', 'bar' ]);

  expect(setPinned(0, 'bar')(pinned).pinned.toArray())
    .toEqual([ 'bar', 'meh', 'foo' ]);
});