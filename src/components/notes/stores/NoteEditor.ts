import { StoreBinding } from "../../../store/useStore";
import { Action } from "../../../store/Actions";
import { NoteAst } from "../datatypes/NoteAst";
import { Backlink } from "../datatypes/Backlink";

export type NoteEditor = {
  filename: string,
  content: NoteAst,
  backlinks: Backlink[],
};

export type NoteEditorSource = {
  noteEditorSrc: (filename: string) => StoreBinding<NoteEditor>,
};

export function getContent(store: NoteEditor): NoteAst { 
  return store.content;
}

export function setContent(content?: NoteAst): Action<NoteEditor> {
  return function(store: NoteEditor) {
    return { ...store, content };
  }
}

// TODO rename the entries in PinnedFiles and FileHistory too.
export function renameNote(newFilename: string): Action<NoteEditor> {
  return function(store: NoteEditor) {
    const { filename, content } = store;

    if (filename !== newFilename && typeof content === 'string')
      return { ...store, filename: newFilename };
  }
}