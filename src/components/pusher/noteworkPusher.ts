import fs from 'fs';
import { Map, OrderedSet } from 'immutable';

import { Store, Action } from '../../store/Store';
import { NoteAst } from '../notes/NoteAst';
import { PusherM } from './Push';
import { mapPusher } from './mapPusher';
import { DirectoryMap } from './FsPusher';

export type NoteworkApp = {
  pinned: OrderedSet<string>,
  notes: DirectoryMap,
};

/**
 * @param metaDirP
 * @param notesDirP 
 */
export function noteworkPusher(
  metaDirP: PusherM<number, DirectoryMap>,
  notesDirP: PusherM<number, DirectoryMap>,
): PusherM<number, NoteworkApp> {

  
}