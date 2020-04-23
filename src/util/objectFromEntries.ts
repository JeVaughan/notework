
/**
 * Custom implementation of `Object.fromEntries` as it has 
 * not been fully integrated into the ES6 standard.
 * 
 * @param members Key/Value pairs from which to create 
 * member variables of a new object.
 */
export function objectFromEntries<T = any>(
	members: Iterable<readonly [string, T]>
): { [k in string]: T } {

	// TODO, find a way to do this.
	// if (Object.fromEntries)
	// 	return Object.fromEntries(members);

	const asDicts = Array.from(members, ([k, v]) => ({[k]: v}));
	return Object.assign({}, ...asDicts);
};