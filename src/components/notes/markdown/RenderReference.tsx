import React from "react";

import { useActions } from "../../../store/MapStore";
import { setOpenFile } from "../NotebookStore";

import './RenderReference.scss';

export function Reference({ node }: any) {
  const { text, url } = node.value;

  const [ doSetOpenFile ] = useActions(setOpenFile);

  function openNote(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    doSetOpenFile(url);
    event.stopPropagation();
  }

  return <span className='refBrace' title={url} onClick={openNote}>
    [[<span className='refText'>{text}</span>]]
  </span>;
}