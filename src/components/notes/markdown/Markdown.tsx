import React, { useMemo } from "react";

import { useActions } from "../../../store/MapStore";
import { JsonMap } from "../../../util/JsonMap";

import { MdNode, markdown } from "./parseMarkdown";
import { setOpenFile } from "../NotebookStore";

function Bold({ node }: any) {
  return <strong>
    {node.value}
  </strong>;
}

function Emph({ node }: any) {
  return <em>
    {node.value}
  </em>
}

function Strike({ node }: any) {
  return <span style={{ textDecoration: 'line-through' }}>
    {node.value}
  </span>
}

function Highlight({ node }: any) {
  return <span style={{ background: 'lightblue' }}>
    {node.value}
  </span>
}

function Math({ node }: any) {
  return <>
    Debug Math: ({node.value})
  </>;
}

function Block({ node }: any) {
  return <code>
    {node.value}
  </code>;
}

function Code({ node }: any) {
  return <span>
    {node.value}
  </span>;
}

function Ref({ node }: any) {
  const { text, url } = node.value;

  const [ doSetOpenFile ] = useActions(setOpenFile);

  const braceStyle = {
    cursor: 'pointer',
    color: 'lightgrey'
  };

  const linkStyle = {
    textDecoration: 'underline', 
    color: 'blue'
  };

  function openNote(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    doSetOpenFile(url);
    event.stopPropagation();
  }

  return <span style={braceStyle} title={url} onClick={openNote}>
    [[<span style={linkStyle}>{text}</span>]]
  </span>;
}

function Link({ node }: any) {
  const { text, url } = node.value;

  function openLink(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    window.open(url)
    event.preventDefault();
  }

  return <a 
    title={url} 
    href={url} 
    onClick={openLink}>

      {text}
  </a>;
}

function Img({ node }: any) {
  const { text, url } = node.value;
  return <img title={text} alt={text} src={url} />;
}

const MarkdownComponents: JsonMap<any> = {
  'bold': Bold,
  'emph': Emph,
  'strike': Strike,
  'highlight': Highlight,
  'math': Math,
  'block': Block,
  'code': Code,
  'ref': Ref,
  'link': Link,
  'img': Img,
};

function SwitchComponent({ node }: any) {
  if (node.type) {
    const Component = MarkdownComponents[node.type];
    return <Component node={node} />
  } 
  return <>{node}</>;
}

export function Markdown({ source }: { source: string }) {
  const nodes: MdNode[] = useMemo(() => markdown(source || ''), [source]);
  return <>{
    nodes.map(
      (node, index) => 
        <SwitchComponent 
          key={index} 
          node={node} 
        />
    )
  }</>;
}