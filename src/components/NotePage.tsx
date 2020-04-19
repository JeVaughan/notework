import React, { useState } from "react";
import { NoteBlock } from "./NoteBlock";
import './NotePage.css';

const initialSource: string = `
# Live demo
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
`

export function NotePage() {
  const [content, setContent] = useState(initialSource);

  return <div className='NotePage'>
    <NoteBlock 
      rawMd={content} 
      onSave={setContent}
    />
  </div>;
}