import { OrderedSet, Map } from 'immutable';

import { EMPTY_NOTEBOOK, setOpenFile, NotebookStore, setPinned } from "./NotebookStore";

const store: NotebookStore = { 
  notes: Map({ 
    meh: 'meh-content',
    foo: 'foo-body',
    bar: 'bar-text',
    ahh: 'ahh-string',
  }), 

  ...EMPTY_NOTEBOOK
};


// -------------------------- //
// --- NAVIGATION HISTORY --- //
// -------------------------- //

it('setOpenFile should open existing files', () => {
  expect(setOpenFile('meh')(store).history.first()).toEqual('meh');
});

it('setOpenFile should ignore non-existant files', () => {
  expect(setOpenFile('???')(store).history.first()).toBeUndefined();
  expect(setOpenFile('???')(setOpenFile('meh')(store)).history.first()).toEqual('meh');
});

it('setOpenFile should track history of opened files', () => {
  expect(
    setOpenFile('meh')(
      setOpenFile('foo')(
        setOpenFile('bar')(
          store
  ))).history).toEqual(OrderedSet(['meh', 'foo', 'bar']));
});

it('history should ignore duplicates opened files', () => {
  expect(
    setOpenFile('foo')(
      setOpenFile('meh')(
        setOpenFile('foo')(
          setOpenFile('bar')(
            store
  )))).history).toEqual(OrderedSet(['foo', 'meh', 'bar']));
});

it('setOpenFile should be able to close files', () => {
  expect(
    setOpenFile(undefined)(
      setOpenFile('meh')(
        setOpenFile('foo')(
          setOpenFile('bar')(
            store
  )))).history.first()).toBeUndefined();
});


// ---------------------- //
// --- PIN MANAGEMENT --- //
// ---------------------- //

it('setPinned should append new pins to the list', () => {
  expect(setPinned(true, 'meh')(store).pinned)
    .toEqual(OrderedSet([ 'meh' ]));

  expect(setPinned(true, 'foo')(setPinned(true, 'meh')(store)).pinned)
    .toEqual(OrderedSet([ 'meh', 'foo' ]));
});

it('setPinned should remove existing pins from the list', () => {
  expect(setPinned(false, 'meh')(setPinned(true, 'meh')(store)).pinned)
    .toHaveLength(0)

  expect(setPinned(false, 'meh')(setPinned(true, 'foo')(setPinned(true, 'meh')(store))).pinned)
    .toEqual(OrderedSet([ 'foo' ]));
});


it('setPinned can insert new pins at a specific location', () => {
  const pinned = OrderedSet([ 'meh', 'foo', 'bar' ]);
  const store2: NotebookStore = { ...store, pinned };

  expect(setPinned(0, 'ahh')(store2).pinned).toEqual([ 'ahh', 'meh', 'foo', 'bar' ]);
  expect(setPinned(2, 'ahh')(store2).pinned).toEqual([ 'meh', 'foo', 'ahh',  'bar' ]);
});


it('setPinned should be able to re-order existing pins', () => {
  const pinned = OrderedSet([ 'meh', 'foo', 'bar' ]);
  const store2: NotebookStore = { ...store, pinned };

  expect(setPinned(1, 'meh')(store2).pinned).toEqual([ 'foo', 'meh', 'bar' ]);
  expect(setPinned(0, 'bar')(store2).pinned).toEqual([ 'bar', 'meh', 'foo' ]);
});