import React, { useMemo } from "react";

import './RenderRichText.scss';

export function Crlf({ node }: any) {
  return <br />
}

export function Bold({ node }: any) {
  return <strong>
    {node.value}
  </strong>;
}

export function Emph({ node }: any) {
  return <em>
    {node.value}
  </em>
}

export function Strike({ node }: any) {
  return <span style={{ textDecoration: 'line-through' }}>
    {node.value}
  </span>
}

export function Highlight({ node }: any) {
  return <span className="richtextHighlight">
    {node.value}
  </span>
}