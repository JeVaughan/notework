import React, { useState } from 'react';
import { Map, List, OrderedSet } from 'immutable';

import { MapStore } from '../store/MapStore';
import { Store } from '../store/Store';
import { Notebook } from './notes/Notebook';
import { EMPTY_NOTEBOOK, NotebookStore } from './notes/NotebookStore';

import './App.css';

const page1: string = `# Live demo
Changes are automatically rendered as you type.
## Table of Contents
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
Pretty neat, eh?
## Tables?
|Feature   |Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |
## More info?
Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)
---------------
A component by [Espen Hovlandsdal](https://espen.codes/)
`;

const page2: string = `# page2
this is another page dumbass
`;

const page3: string = `some more stuff
# Some examples
**bold**

__underline__

[ ] checkbox`;

const TEST_NOTEBOOK: NotebookStore = {
  ...EMPTY_NOTEBOOK,
  pinned: OrderedSet<string>(['page1', 'page2', 'page3']),
  notes: Map<string>({ page1, page2, page3 }), 
};

const store = new Store(TEST_NOTEBOOK);

export default function App() {
  return <MapStore store={store}>
    <Notebook />
  </MapStore>;
}