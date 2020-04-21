import React, { useState } from 'react';
import { OrderedSet } from 'immutable';

import { NotePage } from './NotePage';

import './Notebook.css';
import { AdjustableWidthColumns } from './generic/AdjustableWidthColumns';

type NavButtonProps = {
  key: string,
  onClick?: () => void
};

function NavButton({ key, onClick }: NavButtonProps) {
  return <button key={name} onClick={onClick}>
    {key}
  </button>
}

export type NotebookProps = {
  pinned: string[],
  notes: Map<string, string>,
  update?: (name: string, body?: string) => void,
};

export function Notebook({ pinned, notes, update }: NotebookProps) {
  const [recent, setRecent] = useState(OrderedSet<string>());
  const open: string | undefined = recent.first(undefined);

  function updatePage(body?: string) {
    if (open && update) update(open, body)
  }

  function getOpenFn(pageName: string) {
    return function() {
      setRecent(OrderedSet([pageName]).concat(recent));
    }
  }

  return <AdjustableWidthColumns 
    className='Notebook'
    defaultWidth={120}

    left={<div className='Navigator'>
      <span>Meta</span>
      <button key='Diary'>
        Diary
      </button>
      <button key='Network'>
        Network
      </button>
      <button key='Index'>
        Index
      </button>

      <hr/><span>Pinned</span>
      {pinned.map(
        name => <button key={name} onClick={getOpenFn(name)}>
          {name}
        </button>
      )}

      <hr/><span>Recent</span>
      {recent.slice(1).map(
        name => <button key={name} onClick={getOpenFn(name)}>
          {name}
        </button>
      )}
    </div>}

    right={
      open ?
        <NotePage 
          key={open} 
          title={open}
          rawMd={notes.get(open)} 
          update={updatePage} 
        /> :
        "Please open a page."
    }
  />;
  
}