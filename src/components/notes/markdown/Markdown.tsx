import React, { useMemo } from "react";

import { JsonMap } from "../../../util/JsonMap";

import { MdNode, markdown } from "./parseMarkdown";
import { Math, MathBlock } from "./RenderMath";
import { Reference } from "./RenderReference";
import { Crlf, Bold, Emph, Strike, Highlight } from "./RenderRichText";


function CodeBlock({ node }: any) {
  return <code>
    {node.value}
  </code>;
}

function Code({ node }: any) {
  return <span>
    {node.value}
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
  'crlf': Crlf,
  'bold': Bold,
  'emph': Emph,
  'strike': Strike,
  'highlight': Highlight,
  'mathblock': MathBlock,
  'math': Math,
  'codeblock': CodeBlock,
  'code': Code,
  'ref': Reference,
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
  const nodes: MdNode[] = useMemo(
    () => markdown(source || ''), 
    [ source ]
  );
  
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