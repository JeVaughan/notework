import React from 'react';
import { Map, OrderedSet } from 'immutable';

import { useStore } from '../store/useStore';
import { Notebook } from './notes/Notebook';
import { EMPTY_NOTEBOOK, NotebookStore } from './notes/NotebookStore';

import { deserialise, NoteAst } from './notes/NoteAst';
import { varPusher } from './pusher/varPusher';
import { logPusher } from './pusher/logPusher';

import './App.scss';

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

const TEST_NOTEBOOK: NotebookStore = {
  ...EMPTY_NOTEBOOK,
  pinned: OrderedSet<string>(['page1', 'page2', 'page3']),
  notes: Map<NoteAst>({ page1, page2, page3 }), 
};

export default function App() {
  const store = useStore(TEST_NOTEBOOK);
  return <Notebook store={store}/>;
}