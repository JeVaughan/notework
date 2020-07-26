import { Map, List } from "immutable";
import { markdown, MdNode } from "../markdown/parseMarkdown";
import { flatten } from "../../../util/collections/flatten";

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

  function makeBacklinks([path, ast]: [BlockPath, NoteAst]) {
    function links(node: MdNode): [string, Backlink] {
      if (typeof node === 'object' && node.type == 'ref') {
        if (typeof node.value === 'object') {
          const { url, text } = node.value;
          return [
            url, {
              filename: sourceName,
              path,
              content: ast
            }
          ]
        }
      }
    }  
    
    return ast.markdown ? 
      flatMap(markdown(ast.markdown), links) :
      
  }

  const allMarkdown: [BlockPath, MdNode][] 
    = List(
      flatten(
        noteLeaves(content).flatMap(
          ([ path, md ]) => 
            markdown(md).map(node => [])
        )
      )
    );
  
  allMarkdown.filter(
    function(node: MdNode): [string, Backlink] {
      if (typeof node === 'object' && node.type == 'ref') {
        if (typeof node.value === 'object') {
          const { url, text } = node.value;
          return [url, node]
        }
      }
    }
  )
}