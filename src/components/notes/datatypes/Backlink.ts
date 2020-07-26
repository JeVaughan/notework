
import { markdown, MdNode } from "../markdown/parseMarkdown";
import { flatMap } from "../../../util/collections/flatMap";
import { tuple } from "../../../util/collections/tuple";
import { map } from "../../../util/collections/map";
import { groupBy } from "../../../util/collections/groupBy";
import { identity } from "../../../util/identity";

import { NoteAst } from "./NoteAst";
import { noteLeaves } from "./noteLeaves";
import { BlockPath } from "./BlockPath";

export type Backlink = {
  filename: string,
  path: BlockPath,
  content: NoteAst,
};

export function getNoteBacklinks(
  sourceName: string, 
  content: NoteAst | string
): Map<string, Backlink[]> {

  function makeBacklinks([path, ast]: [BlockPath, NoteAst]): [string, Backlink][] {
    function links(node: MdNode): [string, Backlink] {
      if (typeof node === 'object' && node.type == 'ref') {
        if (typeof node.value === 'object') {
          const { url, text } = node.value;
          return tuple(
            url, {
              filename: sourceName,
              path,
              content: ast
            }
          );
        }
      }
    }  
    
    return ast.markdown ? map(markdown(ast.markdown), links) : [];
  }
  return groupBy(
    flatMap(noteLeaves(content), makeBacklinks), 
    identity
  );
}