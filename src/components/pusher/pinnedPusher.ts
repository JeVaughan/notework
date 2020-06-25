
import { OrderedSet } from "immutable";

import { DirectoryMap, EMPTY_DIRECTORY_MAP } from "./FsPusher";
import { PusherFn } from "./Push";
import { mapPusher } from "./mapPusher";

/**
 * Filename of file the pinned note list lives inside.
 */
export const PINNED_FILE: string = 'pinned.json';

/**
 * Creates a DirectoryMap update from the pinned list.
 * 
 * @param set OrderedSet containing the pinned notes.
 */
export function mapPinned(set: OrderedSet<string>): DirectoryMap {
  return EMPTY_DIRECTORY_MAP.set(PINNED_FILE, JSON.stringify(set));
}

/**
 * Extracts the pinned list from the metadata directory.
 * 
 * @param map DirectoryMap of the metadata directory.
 */
export function unmapPinned(map: DirectoryMap): OrderedSet<string> {
  const value: string | null = JSON.parse(map.get(PINNED_FILE, "[]"));
  return OrderedSet(Array.isArray(value) ? value : []);
}

/**
 * Creates a pinned list pusher from a directory map pusher.
 * 
 * @param metaDirP DirectoryMap pusher for the metadata directory.
 */
export function pinnedPusher(
  metaDirP: PusherFn<number, DirectoryMap>
): PusherFn<number, OrderedSet<string>> {

  return mapPusher(
    metaDirP, 
    mapPinned,
    unmapPinned
  );
}