
import { List } from "immutable";

import { noteLeaves } from "./noteLeaves";
import { updateHash } from "./NoteAst";
import { EMPTY_BLOCK_PATH } from "./BlockPath";

it('should parse string arguments', () => {
  expect(noteLeaves("<nb>hello</nb>"))
    .toEqual(List([[ EMPTY_BLOCK_PATH, "hello" ]]));
});

it('should handle empty notes', () => {
  expect(noteLeaves(updateHash({})))
    .toEqual(List([]));
});

it('should handle single notes', () => {
  expect(noteLeaves(updateHash({ markdown: "hi" })))
    .toEqual(List([[ EMPTY_BLOCK_PATH, "hi" ]]));
});

it('should not return undefined values', () => {
  expect(noteLeaves(updateHash({ markdown: undefined })))
    .toEqual(List([]));
});

it('should handle nested notes', () => {
  expect(
    noteLeaves(
      updateHash({ 
        markdown: "hello", 
        children: List([ 
          updateHash({ 
            markdown: "world"
          }) 
        ]) 
      })
    )
  ).toEqual(List([ 
    [ EMPTY_BLOCK_PATH, "hello" ], 
    [ EMPTY_BLOCK_PATH.push(0), "world" ]
  ]));
});