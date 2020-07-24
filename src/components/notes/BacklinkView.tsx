import React from 'react';

import { Store } from '../../store/Store';

import { NoteNav } from './NoteNav';
import { Backlink } from './stores/NoteEditor';
import { NoteBlock } from './NoteBlock';
import { Reference } from './markdown/RenderReference';

import './BacklinkView.scss';

export function backlinkKey({ filename, path }: Backlink) {
  return filename + '-' + path.join('-');
}

export type BacklinkViewProps = {
  backlink: Backlink,
  store: Store<NoteNav>,
}

export function BacklinkView({ backlink, store }: BacklinkViewProps) {
  const { filename, content } = backlink;
  return <div className="backlinkView">
    <Reference node={{ value: { text: filename, url: filename } }} />:
    <div className="backlinkContainer">
      <NoteBlock store={store} ast={content} />
    </div>
  </div>;
}