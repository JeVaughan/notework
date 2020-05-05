import { OrderedSet, Map } from 'immutable';

import { EMPTY_NOTEBOOK, setOpenFile, NotebookStore, setPinned, getTargetFilename, writeFile, getFilebody } from "./NotebookStore";
import { deserialise, updateHash } from './NoteAst';

const store: NotebookStore = { 
  ...EMPTY_NOTEBOOK,

  notes: Map({ 
    meh: deserialise('<nb>meh-content</nb>'),
    foo: deserialise('<nb>foo-body</nb>'),
    bar: deserialise('<nb>bar-text</nb>'),
    ahh: deserialise('<nb>ahh-string</nb>'),
  })
};


// -------------------------- //
// --- NAVIGATION HISTORY --- //
// -------------------------- //

it('setOpenFile should open existing files', () => {
  expect(setOpenFile('meh')(store).history.first()).toEqual('meh');
});

it('getTargetFile should default to the openFile', () => {
  expect(getTargetFilename(store)).toBeUndefined();

  const openStore = setOpenFile('meh')(store);
  expect(getTargetFilename(openStore)).toEqual('meh');
  expect(getTargetFilename(openStore, 'meh')).toEqual('meh');
  expect(getTargetFilename(openStore, 'foo')).toEqual('foo');
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


// ----------------------- //
// --- FILE MANAGEMENT --- //
// ----------------------- //

it('writeFile should update the contents of a file', () => {
  expect(
    getFilebody(
      writeFile(updateHash({ markdown: "hello" }))(
        setOpenFile('meh')(store)
      )
    )
  ).toEqual(updateHash({ markdown: "hello" }));
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

it('setPinned should default to targetting the open file', () => {
  const openStore = setPinned(true)(setOpenFile('meh')(store));
  expect(openStore.pinned).toEqual(OrderedSet([ 'meh' ]));
  expect(setPinned(false)(openStore).pinned).toEqual(OrderedSet())
});

it('setPinned should remove existing pins from the list', () => {
  expect(
    setPinned(false, 'meh')(
      setPinned(true, 'meh')(store)
    ).pinned.toArray()
  ).toEqual([])

  expect(
    setPinned(false, 'meh')(
      setPinned(true, 'foo')(
        setPinned(true, 'meh')(store)
    )).pinned.toArray()
  ).toEqual([ 'foo' ]);
});


it('setPinned can insert new pins at a specific location', () => {
  const pinned = OrderedSet([ 'meh', 'foo', 'bar' ]);
  const store2: NotebookStore = { ...store, pinned };

  expect(setPinned(0, 'ahh')(store2).pinned.toArray())
    .toEqual([ 'ahh', 'meh', 'foo', 'bar' ]);

  expect(setPinned(2, 'ahh')(store2).pinned.toArray())
    .toEqual([ 'meh', 'foo', 'ahh',  'bar' ]);
});


it('setPinned should be able to re-order existing pins', () => {
  const pinned = OrderedSet([ 'meh', 'foo', 'bar' ]);
  const store2: NotebookStore = { ...store, pinned };

  expect(setPinned(1, 'meh')(store2).pinned.toArray())
    .toEqual([ 'foo', 'meh', 'bar' ]);

  expect(setPinned(0, 'bar')(store2).pinned.toArray())
    .toEqual([ 'bar', 'meh', 'foo' ]);
});