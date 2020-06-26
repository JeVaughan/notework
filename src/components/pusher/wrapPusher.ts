
import { fieldGet } from "../../util/fieldGet";
import { fieldWrap } from "../../util/fieldWrap";

import { PusherFn } from "./Push";
import { mapPusher } from "./mapPusher";

export function wrapPusher<
  K, M, f extends keyof M
>(
  fieldname: f, 
  basePusher: PusherFn<K, M[f]>
): PusherFn<K, Pick<M, f>> {
  
  return mapPusher<K, M[f], Pick<M, f>>(
    basePusher, 
    fieldGet<M, f>(fieldname),
    fieldWrap<M, f>(fieldname)
  );
} 