
import { Map } from 'immutable';
import { objectFromEntries } from "./objectFromEntries";
import { JsonMap } from './JsonMap';

export function objectFromMap<V>(mapObj: Map<string, V>): JsonMap<V> {
    return objectFromEntries(Array.from(mapObj.entries()));
}