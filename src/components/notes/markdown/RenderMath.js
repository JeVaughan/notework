import React from "react";

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export function MathBlock({ node }) {
  return React.createElement(
    BlockMath, { math: node.value }
  );
}

export function Math({ node }) {
  return React.createElement(
    InlineMath, { math: node.value }
  );
}