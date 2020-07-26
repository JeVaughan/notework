import { tuple } from "../../../util/collections/tuple";
import { map } from "../../../util/collections/map";

import { NoteAst, deserialise } from "./NoteAst";
import { BlockPath, EMPTY_BLOCK_PATH } from "./BlockPath";

function noteLeavesImpl(path: BlockPath, content: NoteAst): [BlockPath, NoteAst][] {
  const { children } = content;

  function childLeaves(ast: NoteAst, index: number): [BlockPath, NoteAst][] {
    return noteLeavesImpl(path.push(index), ast);
  }

  const head = [ tuple(path, content) ];
  return children ? 
    head.concat(...map(children, childLeaves)) :
    head;
}

export function noteLeaves(content: NoteAst | string): [BlockPath, NoteAst][] {
  return noteLeavesImpl(
    EMPTY_BLOCK_PATH, 
    typeof content == 'string' ?
      deserialise(content) : 
      content 
  );
}