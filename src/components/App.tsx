import React, { useState } from 'react';
import { Map, List, OrderedSet } from 'immutable';

import { MapStore } from '../store/MapStore';
import { Store } from '../store/Store';
import { Notebook } from './notes/Notebook';
import { EMPTY_NOTEBOOK, NotebookStore } from './notes/NotebookStore';

import './App.css';
import { deserialise, NoteAst } from './notes/NoteAst';

const page1: NoteAst = deserialise(`<nb><nb>Changes are automatically rendered as you type.</nb>
<nb>Table of Contents
<nb>Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)</nb>
<nb>Renders actual, "native" React DOM elements</nb>
<nb>Allows you to escape or skip HTML (try toggling the checkboxes above)</nb>
<nb>If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
Pretty neat, eh?</nb></nb>
<nb>Tables?<nb>|Feature   |Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |</nb></nb>
<nb>More info?
Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)
---------------
A component by [Espen Hovlandsdal](https://espen.codes/)</nb></nb>`);

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

const store = new Store(TEST_NOTEBOOK);

export default function App() {
  return <MapStore store={store}>
    <Notebook />
  </MapStore>;
}