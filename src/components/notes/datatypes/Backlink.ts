import { Map } from "immutable";
import { NoteAst } from "./NoteAst";

export type Backlink = {
  filename: string,
  path: number[],
  content: NoteAst,
};

export function getNoteBacklinks(
  filename: string, 
  content: NoteAst | string
): Map<string, Backlink[]> {

  
}