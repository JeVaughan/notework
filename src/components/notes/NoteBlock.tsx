import React, { useMemo, useState } from 'react';
import * as react from 'react';
import { List } from 'immutable';

import { useStore, useActions } from '../../store/MapStore';
import { Action } from '../../store/Store';

import { NoteMd } from './NoteMd';
import { NoteAst, updateHash } from './NoteAst';
import { NoteEditor } from './NoteEditor';
import { NoteNav, selectorIsSelected, actionSetSelected, actionNavigate } from './NoteNav';

import './NoteBlock.css';

export type NoteBlockProps = {
  path?: List<number>,
  ast: NoteAst,
  setAst?: (ast: NoteAst) => void,
};

type MouseEventDiv = react.MouseEvent<HTMLDivElement, MouseEvent>;


export function NoteBlock({ path, ast, setAst }: NoteBlockProps) {
  const { hashValue, markdown, children } = ast;

  // Ensure current path is not undefined.
  path = path ? path : List();

  const [isSelected] = useStore<NoteNav>(selectorIsSelected(path));
  const [setSelected, navigate] = useActions<NoteNav>(
    actionSetSelected, actionNavigate
  )

  function setMarkdown(md: string): void {
    if (setAst)
      setAst(updateHash({ markdown: md, children }));
  }

  function setChildAst(idx: number) {
    return function(childAst: NoteAst): void {
      if (setAst)
        setAst(updateHash({
          markdown,
          children: children.set(idx, childAst)
        }))
    }
  }

  const cMarkdown =
    isSelected && setAst ?
      <NoteEditor 
        key={hashValue} 
        rawMd={markdown}
        onUpdate={(md, nav) => {
          setMarkdown(md);
          navigate(nav);
        }}
      /> :
      <div onClick={() => setSelected(path)}>
        <NoteMd rawMd={markdown} />
      </div>;

  // Recurse down children in AST.
  const cListItems = children && children.size && <ul>{
    children.map((child, idx) =>
      <NoteBlock
        key={child.hashValue} 
        path={path.push(idx)}
        ast={child}
        setAst={setChildAst(idx)}
      />
    )
  }</ul>;

  // Wrap non-root nodes in list item tags.
  return path && path.size ? 
    <li>{cMarkdown} {cListItems}</li> :
    <>{cMarkdown} {cListItems}</>;
}