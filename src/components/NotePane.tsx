import React, { useState, useEffect, useMemo } from 'react';

import { NoteMd } from './NoteMd';

import './NotePane.css';

export type NotePaneProps = {
  rawMd?: string,
  saveChanges?: (md: string) => void
};

/**
 * 
 * @param param0 
 */
export function NotePane({ rawMd, saveChanges }: NotePaneProps) {
  const [isEditing, setEditing] = useState(false);

  const onClick: any = useMemo(
    () => (e: any) => { 
      if (isEditing) {
        
      } else {
        setEditing(true) 
      }
    }, [ isEditing ]
  );

  useEffect(() => {
    
  }, [isEditing]);
  
  if (isEditing) {
    return <textarea 
      className='NotePaneEditor'
      defaultValue={rawMd}
    />

  } else {
    return <div className='NotePaneRendered' onClick={onClick}>
      <NoteMd rawMd={rawMd} />
    </div>
  }
}