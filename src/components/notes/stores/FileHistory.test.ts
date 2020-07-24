import { setOpenFile, EMPTY_HISTORY } from "./FileHistory";
import { OrderedSet } from "immutable";

it('setOpenFile should open existing files', () => {
  expect(setOpenFile('meh')(EMPTY_HISTORY).history.first()).toEqual('meh');
});

// it('setOpenFile should ignore non-existant files', () => {
//   expect(setOpenFile('???')(EMPTY_FILE_HISTORY).history.first()).toBeUndefined();
//   expect(setOpenFile('???')(setOpenFile('meh')(store)).history.first()).toEqual('meh');
// });

it('setOpenFile should track history of opened files', () => {
  expect(
    setOpenFile('meh')(
      setOpenFile('foo')(
        setOpenFile('bar')(
          EMPTY_HISTORY
  ))).history).toEqual(OrderedSet(['meh', 'foo', 'bar']));
});

it('history should ignore duplicates opened files', () => {
  expect(
    setOpenFile('foo')(
      setOpenFile('meh')(
        setOpenFile('foo')(
          setOpenFile('bar')(
            EMPTY_HISTORY
  )))).history).toEqual(OrderedSet(['foo', 'meh', 'bar']));
});

it('setOpenFile should be able to close files', () => {
  expect(
    setOpenFile(undefined)(
      setOpenFile('meh')(
        setOpenFile('foo')(
          setOpenFile('bar')(
            EMPTY_HISTORY
  )))).history.first()).toBeUndefined();
});

