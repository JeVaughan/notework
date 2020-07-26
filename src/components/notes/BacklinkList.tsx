import React, { useState } from 'react';

import { Store } from '../../store/Store';

import { NoteNav } from './NoteNav';
import { DEBUG_BACKLINKS } from './stores/debugNoteStore';
import { Backlink } from './datatypes/Backlink';
import { BacklinkView, backlinkKey } from './BacklinkView';

import './BacklinkList.scss';

export function BacklinkList(
  { store }: { store: Store<NoteNav> }
) {
  const backlinks: Backlink[] = DEBUG_BACKLINKS; 

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