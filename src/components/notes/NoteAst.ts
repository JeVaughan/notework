import { List } from "immutable";
import { cyrb53 } from "../../util/cyrb53";

export type NoteAst = {
  hashValue: number,
  markdown?: string,
  children?: List<NoteAst>,
};

const domParser = new DOMParser();

function getChildDocs(xml: Element): List<Element> {
  const array = [];
  
  for (
    let node: Element = xml.firstElementChild; 
    node != null; 
    node = node.nextElementSibling
  ) {

    if (node.nodeType == Node.ELEMENT_NODE && 
        node.tagName == 'nb') {

      array.push(node);
    }
  }

  return List(array);
}

function getHash(markdown: string = "", children: List<NoteAst> = List()): number {
  return cyrb53(markdown, ...children.map(({ hashValue }) => hashValue).toArray());
}

export function updateHash({ markdown, children }: Partial<NoteAst>): NoteAst {
  return { hashValue: getHash(markdown, children), markdown, children };
}

export function deserialise(xml: Element | string): NoteAst {
  if (xml instanceof Element) {
    const { firstChild } = xml;

    const markdown: string | undefined = 
      firstChild && firstChild.nodeType == Node.TEXT_NODE ? 
      firstChild.nodeValue : undefined;
    
    const children = xml.children.length ? 
      getChildDocs(xml).map(deserialise) : undefined;

    return updateHash({ markdown, children });

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