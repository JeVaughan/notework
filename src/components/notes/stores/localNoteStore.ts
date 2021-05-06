
import { Action } from "../../../store/Actions";
import { Store, store } from "../../../store/Store";
import { useStore, StoreBinding } from "../../../store/useStore";

import { NoteAst, deserialise } from "../datatypes/NoteAst";
import { Backlink, getNoteBacklinks } from "../datatypes/Backlink";
import { NoteEditor, NoteEditorSource } from "./NoteEditor";
import { NotebookData } from "../Notebook";
import { EMPTY_HISTORY } from "./FileHistory";
import { setPinned, EMPTY_PINS } from "./PinnedFiles";


export function localNoteSource(_: string): NoteEditorSource {
  function noteEditorSrc(filename: string): StoreBinding<NoteEditor> {
    
  }

  return { noteEditorSrc };
}

export function useLocalNotebookStore(directory: string): Store<NotebookData> {
  const store = useStore(EMPTY_NOTEBOOK_DATA)
  return {
    ...EMPTY_HISTORY,
    ...setPinned(true, 'page2')(EMPTY_PINS),
    ...localNoteSource(directory)
  };
}