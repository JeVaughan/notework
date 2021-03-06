
import { fieldGet } from "../../util/fieldGet";
import { fieldWrap } from "../../util/fieldWrap";

import { PusherFn } from "./Push";
import { mapPusher } from "./mapPusher";

export function selectPusher<
  K, M, f extends keyof M
>(
  fieldname: f, 
  basePusher: PusherFn<K, Pick<M, f>>
): PusherFn<K, M[f]> {
  
  return mapPusher<K, Pick<M, f>, M[f]>(
    basePusher, 
    fieldWrap<M, f>(fieldname),
    fieldGet<M, f>(fieldname)
  );
} 