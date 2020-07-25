
import { Action } from "../../../store/Actions";
import { Store, store } from "../../../store/Store";
import { useStore } from "../../../store/useStore";

import { NoteAst, deserialise } from "../NoteAst";
import { NoteEditor, NoteEditorSource, Backlink } from "./NoteEditor";
import { NotebookData } from "../Notebook";
import { EMPTY_HISTORY } from "./FileHistory";
import { setPinned, EMPTY_PINS } from "./PinnedFiles";


export function localNoteSource(_: string): NoteEditorSource {
  function noteEditorSrc(filename: string): Store<NoteEditor> {
    console.assert(
      TEST_NOTEBOOK.has(filename), 
      `TEST_NOTEBOOK is missing a page called "${filename}".`
    );

    const state = {
      filename,
      backlinks: debugBacklinks,
      content: TEST_NOTEBOOK.get(filename),
    };

    return store(
      state, (action: Action<NoteEditor>) => {
        const { content } = action(state);
        TEST_NOTEBOOK = TEST_NOTEBOOK.set(filename, content);
      }
    );
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