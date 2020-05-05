import { List } from "immutable";
import { cyrb53 } from "../../util/cyrb53";

export type NoteAst = {
  hashValue: number,
  markdown?: string,
  children?: List<NoteAst>,
};

const domParser = new DOMParser();

function getChildDocs(xml: Element): List<Element> {
  const children = xml.getElementsByTagName('nb');
  const array = [];
  for (var i = 0; i < children.length; i++) {
    array.push(children[i]);
  }

  return List(array);
}

function getHash(markdown: string = "", children: List<NoteAst> = List()): number {
  return cyrb53(markdown, ...children.map(({ hashValue }) => hashValue).toArray());
}

export function deserialise(xml: Element | string): NoteAst {
  if (xml instanceof Element) {
    const { firstChild } = xml;

    const markdown: string | undefined = 
      firstChild && firstChild.nodeType == Node.TEXT_NODE ? 
      firstChild.nodeValue : undefined;
    
    const children = xml.children.length ? 
      getChildDocs(xml).map(deserialise) : undefined;

    const hashValue: number = getHash(markdown, children);

    return { hashValue, markdown, children };

  } else {
    const doc = domParser.parseFromString(xml, 'text/xml');
    return deserialise(doc.firstElementChild);
  }
}

function serialiseRecurse(
  markdown: string = "", 
  children: List<NoteAst> = List()
): string {

  return markdown || children.size ?
    "<nb>" + markdown + children.map(serialise).join('') + "</nb>" :
    "<nb/>";
}

export function serialise({ markdown, children }: NoteAst): string {
  return serialiseRecurse(markdown, children);
}