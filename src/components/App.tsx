import React, { useState } from 'react';
import { Notebook } from './Notebook';
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

const pinned: string[] = ['page1', 'page2'];

export default function App() {
  const [notes, setNotes] = useState<Map<string, string>>(
    new Map(Object.entries({ page1, page2 }))
  );

  return <Notebook 
    pinned={pinned} 
    notes={notes}
  />;
}