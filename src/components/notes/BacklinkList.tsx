import React, { useState } from 'react';

import { Store } from '../../store/Store';

import { NoteNav } from './NoteNav';
import { deserialise } from './NoteAst';
import { Backlink } from './stores/NoteEditor';
import { BacklinkView, backlinkKey } from './BacklinkView';

import './BacklinkList.scss';


const debugBacklinks: Backlink[] = [
  { filename: 'page1', path: [], content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
  { filename: 'page2', path: [], content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
  { filename: 'page3', path: [], content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
  { filename: 'page3', path: [1], content: deserialise('<nb>Test backlink [[unknown page]]</nb>') },
]

export function BacklinkList(
  { store }: { store: Store<NoteNav> }
) {
  const backlinks = debugBacklinks;

  const [collapsed, setCollapsed] = useState(false);

  function toggleCollapsed() {
    setCollapsed(val => !val);
  }

  function searchReferences() {

  }

  return <div className="backlinkList">
    <div className="backlinkDetail" onClick={toggleCollapsed}>{
      backlinks.length > 0 ?
        `${backlinks.length} backlinks${collapsed ? '...' : ':'}` :
        `No backlinks.`
    }</div>

    {collapsed || backlinks.map(
      (backlink: Backlink) => 
        <BacklinkView 
          key={backlinkKey(backlink)} 
          backlink={backlink}
          store={store}
        />
    )}

    <div className="backlinkDetail" onClick={searchReferences}>
      search for unlinked references
    </div>
  </div>;
}