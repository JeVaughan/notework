import React, { useMemo, useState } from 'react';
import * as react from 'react';

import { useStore } from '../../store/MapStore';
import { Action } from '../../store/Store';

import { NoteMd } from './NoteMd';
import { NoteAst } from './NoteAst';
import { NoteEditor } from './NoteEditor';

import './NoteBlock.css';

export type NoteBlockProps = {
  isChild?: boolean,
  ast: NoteAst,
  // dispatch: (action: Action<NoteAst>) => void,
};

type MouseEventDiv = react.MouseEvent<HTMLDivElement, MouseEvent>;

export function NoteBlock({ ast, isChild }: NoteBlockProps) {
  const { markdown, children } = ast;

  const cMarkdown = useMemo(
    () => markdown ? <NoteEditor key='md' rawMd={markdown}/> : null,
    [ markdown ]
  );

  // Recurse down children in AST.
  const cListItems = useMemo(() => 
    children && children.size > 0 && <ul>{
      children.map(child =>
        <NoteBlock
          key={child.hashValue} 
          ast={child}
          isChild
        />
      )
    }</ul>, [ children ]
  );

  // Wrap non-root nodes in list item tags.
  return isChild ? 
    <li>{cMarkdown} {cListItems}</li> :
    <>{cMarkdown} {cListItems}</>;
}