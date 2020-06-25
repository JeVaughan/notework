
import { PusherFn } from "./Push";
import { mapPusher } from "./mapPusher";

export function fieldGet<T, f extends keyof T>(field: f) {
  return function(obj: T): T[f] {
    return obj[field];
  }
}

export function fieldSet<T, f extends keyof T>(obj: T, field: f) {
  return function(val: T[f]): T {
    return { ...obj, [field]: val };
  }
}

export function fieldWrap<T, f extends keyof T>(field: f) {
  return function(val: T[f]): Pick<T, f> {
    return <Pick<T, f>> { [field]: val };
  }
}

export function selectPusher<
  K, M, 
  f extends keyof M
>(
  fieldname: f, 
  basePusher: PusherFn<K, M[f]>
): PusherFn<K, Partial<M>> {
  
  return mapPusher<K, M[f], Partial<M>>(
    basePusher, 
    getField<M, f>(fieldname),
    wrapField(fieldname)i => <Partial<M>> <any> ({ [fieldname]: i })
  );
} 