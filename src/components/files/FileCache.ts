
export type FileInfo = {
  name: string,
  hash: number,
  revision: number,

  local: string,
  remote: string,
};

export type SyncData<T> = { 
  version: number,
  content: any,
};

export type PushResult<S> =
  { accepted: SyncData<S> } | 
  { rejected: SyncData<S> } | 
  { exception: string };

/**
 * Attempt to apply an update from a `source` to
 * the `master` copy of a synchronised object.
 * 
 * @param master 
 * @param source 
 * @param baseVersion 
 */
function tryPushData<T>(
  pushed: SyncData<T>,
  cached: SyncData<T>, 
  baseVersion: number,
  force: boolean = false,
): PushResult<S> {

  if (pushed)
}


export type FileCache = {
  session: string,
  files: Map<string, FileMetadata>,
};

// UI (string) <-> Client Cache (string) <-> Session Server Cache <-> File Cache <-> Hard Disk

// Step 1, UI pushes new change to client cache. (checked, string -> string, hash-version)
// always "accepts" change, calculates diff, proceeds to step 2

// Step 2a, Client Cache pushes over network to File Cache, (checked, diff -> string, timestamp + hash)

// Step 2b, Client cache pushes over network to Session Cache, (checked, diff -> string, ord-version + hash)

// Step 3b, Session Cache pushes to File Cache, (checked, string -> string, ord-version + hash)

// Step 4, File Cache writes to disk

function writeToCache()