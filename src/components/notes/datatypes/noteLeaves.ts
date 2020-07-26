import { List } from "immutable";
import { tuple } from "../../../util/collections/tuple";

import { NoteAst, deserialise } from "./NoteAst";
import { BlockPath, EMPTY_BLOCK_PATH } from "./BlockPath";

function noteLeavesImpl(path: BlockPath, content: NoteAst): List<[BlockPath, NoteAst]> {
  const { children } = content;

  function childLeaves(ast: NoteAst, index: number): List<[BlockPath, NoteAst]> {
    return noteLeavesImpl(path.push(index), ast);
  }

  const head = List([ tuple(path, content) ]);
  return children ? 
    head.concat(...children.map(childLeaves).toArray()) :
    head;
}

export function noteLeaves(content: NoteAst | string): List<[BlockPath, NoteAst]> {
  return noteLeavesImpl(
    EMPTY_BLOCK_PATH, 
    typeof content == 'string' ?
      deserialise(content) : 
      content 
  );
}