
import { Map } from 'immutable';
import { objectFromMap } from './objectFromMap';

function testObj<V>(obj: {[key: string]: V}): void {
    expect(objectFromMap(Map(obj))).toEqual(obj);
}

it('should properly parse an empty object.', () => {
    testObj({});
});

it('should properly parse a homogeneous object.', () => {
    testObj({ test: true });
    testObj({ a: 1, b: 2, c: 3 });
    testObj({ a: "a", b: "b", c: "c"});
});

it('should properly parse a heterogeneous object.', () => {
    testObj({ test: true, test2: false, num: 1 });
    testObj({ a: 2, b: null, c: "Test string!" });
});

it('should properly parse a rich object.', () => {
    testObj({ test: {} });
    testObj({ test: { child: "test string." } });
    testObj({ obj1: {}, obj2: { a: "2" }, obj3: { a: "3" } });
});