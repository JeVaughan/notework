import { NoteAst, deserialise, serialise } from "./NoteAst";
import { cyrb53 } from "../../../util/cyrb53";
import { List } from "immutable";

const emptyXml: string = "<nb/>";

const emptyAst: NoteAst = { hashValue: cyrb53("") };

const leafXml: string = "<nb>this is a leaf note</nb>";

const leafAst: NoteAst = {
  hashValue: cyrb53("this is a leaf note"),
  markdown: "this is a leaf note",
};

const treeXml: string = "<nb>root<nb>c1</nb><nb>c2</nb></nb>";

const treeAst: NoteAst = {
  hashValue: cyrb53("root", cyrb53("c1"), cyrb53("c2")),
  markdown: "root",
  children: List([
    { 
      hashValue: cyrb53("c1"),
      markdown: "c1",
    }, 

    {
      hashValue: cyrb53("c2"),
      markdown: "c2",
    }
  ])
};

const complexXml: string = 
  "<nb><nb>Changes</nb><nb>Table of Contents\n" +
  "<nb>Renders actual</nb><nb>Allows you to</nb></nb></nb>";

const complexAst: NoteAst = {
  hashValue: cyrb53(
    "", // Root
    cyrb53("Changes"),
    cyrb53("Table of Contents\n",
      cyrb53("Renders actual"),
      cyrb53("Allows you to")
    )
  ),

  children: List([{

      hashValue: cyrb53("Changes"),
      markdown: "Changes",

    }, {
      hashValue: cyrb53("Table of Contents\n",
        cyrb53("Renders actual"),
        cyrb53("Allows you to")
      ),
      markdown: "Table of Contents\n",

      children: List([{
          hashValue: cyrb53("Renders actual"),
          markdown: "Renders actual",

        }, { 
          hashValue: cyrb53("Allows you to"),
          markdown: "Allows you to",
        }
      ])
    }
  ])
};
  

// ------------------ //
// --- JEST Tests --- //
// ------------------ //

it('deserialise empty xml', () => {
  expect(deserialise(emptyXml)).toEqual(emptyAst);
});

it('deserialise xml with markdown', () => {
  expect(deserialise(leafXml)).toEqual(leafAst);
});

it('deserialise xml with children', () => {
  expect(deserialise(treeXml)).toEqual(treeAst);
});

it('deserialise actual example', () => {
  expect(deserialise(complexXml)).toEqual(complexAst);
});

it('serialise empty xml', () => {
  expect(serialise(emptyAst)).toEqual(emptyXml);
});

it('serialise xml with markdown', () => {
  expect(serialise(leafAst)).toEqual(leafXml);
});

it('serialise xml with children', () => {
  expect(serialise(treeAst)).toEqual(treeXml);
});

it('serialise actual example', () => {
  expect(serialise(complexAst)).toEqual(complexXml);
});