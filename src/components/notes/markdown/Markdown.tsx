import React, { useMemo } from "react";
import { JsonMap } from "../../../util/JsonMap";
import { MdNode, markdown } from "./parseMarkdown";

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
  return <>Debug Ref: [[{node.value}]]</>;
}

function Link({ node }: any) {
  const { text, url } = node.value;
  return <a href={url}>{text}</a>;
}

function Img({ node }: any) {
  const { text, url } = node.value;
  return <>Debug Img: <a href={url}>{text}</a></>;
}

const MarkdownComponents: JsonMap<any> = {
  'bold': Bold,
  'emph': Emph,
  'strike': Strike,
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