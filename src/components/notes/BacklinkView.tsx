import React from 'react';

import { List } from 'immutable';

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

const debugBacklinks: Backlink[] = [
  { note: 'page1', path: [], content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
  { note: 'page2', path: [], content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
  { note: 'page3', path: [], content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
  { note: 'page3', path: [1], content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
]

export function BacklinkView(
  { note, path, content }: Backlink
) {

  return <div className="backlinkView">
    <Reference node={{ value: { text: note, url: note } }} />:
    <div className="backlinkContainer">
      <NoteBlock ast={content} />
    </div>
  </div>;
}