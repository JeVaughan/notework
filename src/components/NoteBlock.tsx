import React, { useMemo } from 'react';
import * as react from 'react';

import { NoteMd } from './NoteMd';

import './NoteBlock.css';

export type NoteBlockProps = {
  rawMd?: string,
  onClick?: (newCaret?: number) => void
};

type MouseEventDiv = react.MouseEvent<HTMLDivElement, MouseEvent>;

export function NoteBlock({ rawMd, onClick }: NoteBlockProps) {
  const doClick = useMemo(
    () => function(event: MouseEventDiv) {
      onClick(); // TODO figure out `newCaret` position.

    }, [ onClick ]
  )
  return <div className='NoteBlock' onClick={doClick}>
    <NoteMd rawMd={rawMd} />
  </div>;
}