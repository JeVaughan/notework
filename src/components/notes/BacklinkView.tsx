import React from 'react';

import { List } from 'immutable';

import { Store } from '../../store/Store';

import { NoteNav } from './NoteNav';
import { NoteAst, deserialise } from './NoteAst';
import { NoteBlock } from './NoteBlock';
import { Reference } from './markdown/RenderReference';

import './BacklinkView.scss';

export type Backlink = {
  note: string,
  path: number[],
  content: NoteAst,
};

export function backlinkKey({ note, path }: Backlink) {
  return note + '-' + path.join('-');
}

export function BacklinkView(
  { note, store, path, content }: Backlink & { store: Store<NoteNav> }
) {

  return <div className="backlinkView">
    <Reference node={{ value: { text: note, url: note } }} />:
    <div className="backlinkContainer">
      <NoteBlock store={store} ast={content} />
    </div>
  </div>;
}