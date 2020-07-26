
import { Map } from "immutable";

import { Action } from "../../../store/Actions";
import { Store, store } from "../../../store/Store";
import { useStore } from "../../../store/useStore";
import { NoteAst, deserialise } from "../datatypes/NoteAst";
import { Backlink } from "../datatypes/Backlink";

import { NoteEditor, NoteEditorSource } from "./NoteEditor";
import { NotebookData } from "../Notebook";
import { EMPTY_HISTORY } from "./FileHistory";
import { setPinned, EMPTY_PINS } from "./PinnedFiles";
import { EMPTY_BLOCK_PATH } from "../datatypes/BlockPath";

const page1: NoteAst = deserialise(`<nb><nb>Changes are automatically rendered as you type.</nb>
<nb>Bi-directional links like this [[page2]]</nb>
<nb>**bold** __emph__ ~~strikes~~ ^^HIGHLIGHT^^</nb>
<nb>Its got MATH $$E = mc^2$$</nb>
<nb>and images ![Demo Image](https://i.imgur.com/OvMZBs9.jpg)</nb>
<nb>Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)</nb>
<nb>Renders actual, "native" React DOM elements</nb>
<nb>Allows you to escape or skip HTML (try toggling the checkboxes above)</nb>
<nb>If you  \`dangerouslySetInnerHTML\` is used! Yay! Pretty neat, eh?</nb>
<nb>New lines?
Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)
A component by [Espen Hovlandsdal](https://espen.codes/)</nb>`);

const page2: NoteAst = deserialise(`<nb>page2
<nb>this is another page dumbass</nb></nb>`);

const page3: NoteAst = deserialise(`<nb>some more stuff
<nb>Some examples</nb>
<nb>**bold**</nb>
<nb>__underline__</nb>
<nb>[ ] checkbox</nb></nb>`);

console.assert(typeof page1 == 'object', 'Correctly parsed page1');
console.assert(typeof page2 == 'object', 'Correctly parsed page2');
console.assert(typeof page3 == 'object', 'Correctly parsed page3');

var TEST_NOTEBOOK = Map<NoteAst>({ page1, page2, page3 });

const debugBacklinks: Backlink[] = [
  { filename: 'page1', path: EMPTY_BLOCK_PATH, content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
  { filename: 'page2', path: EMPTY_BLOCK_PATH, content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
  { filename: 'page3', path: EMPTY_BLOCK_PATH, content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
  { filename: 'page3', path: EMPTY_BLOCK_PATH.push(1), content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
];

export function debugNoteSource(_: string): NoteEditorSource {
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

export function debugNotebookStore(): Store<NotebookData> {
  return useStore({ 
    ...EMPTY_HISTORY,
    ...setPinned(true, 'page2')(EMPTY_PINS),
    ...debugNoteSource('test'),
  });
}