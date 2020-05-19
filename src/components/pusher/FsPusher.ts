import fs from 'fs';
import { Map } from 'immutable';

import { PusherM, PusherFn, pusherM } from './Push';
import { Pushed, pushAcc, pushRej, pushMod } from './Pushed';

export type DirectoryMap = Map<string, string | null>;
export const EMPTY_DIRECTORY_MAP: DirectoryMap = Map();

function fsReadTimestamp(path: string): [string, number] {
  return [path, fs.statSync(path).mtimeMs];
}

function fsReadDir(referenceTimeMs: number, directoryPath: string): Map<string, number> {
  const lastDirEditMs = fs.statSync(directoryPath).mtimeMs;

  // Quick check of directory modification time against reference time.
  if (lastDirEditMs <= referenceTimeMs) {
    return Map();

  } else {
    // Collect list of directory contents, then fetch their modification times.
    return Map(fs.readdirSync(directoryPath).map(fsReadTimestamp))
      .filter(timeMs => timeMs > referenceTimeMs);
  }
}

function fsReadFile(file: string): [string, string] {
  return [file, fs.readFileSync(file, { encoding: 'ascii' })];
}

function fsReadFiles(files: Iterable<string>): DirectoryMap {
  return Map(Array.from(files).map(fsReadFile));
}

function fsWriteFile([path, body]: [string, string]): void {
  fs.writeFileSync(path, body);
}

function fsWriteFiles(files: Iterable<[string, string]>): void {
  Array.from(files).forEach(fsWriteFile);
}

export function fsPusherFn(dir: string): PusherFn<number, DirectoryMap> {
  return function(baseVersion: number, update?: DirectoryMap) {

    const timestamps = fsReadDir(baseVersion, dir);
    const newModifications = fsReadFiles(timestamps.keys());
    const newVersion = timestamps.max(Math.max);
      
    if (update) {
      const conflicts = newModifications.keySeq().toSet().union(update.keys());
      if (conflicts.size > 0)
        return pushRej(newVersion, newModifications);

      fsWriteFiles(update);
      return pushMod(baseVersion, newModifications.merge(update));
    }
    return pushAcc(newVersion, newModifications);
  }
}

export function fsPusherM(dir: string): PusherM<number, DirectoryMap> {
  return pusherM(fsPusherFn(dir));
}