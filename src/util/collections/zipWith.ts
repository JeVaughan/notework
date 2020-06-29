
export function zipWith<i1, i2, o>(func: (i1: i1, i2: i2) => o) {
  return function(l1: Iterable<i1>, l2: Iterable<i2>): o[] {
    const a1 = Array.from(l1), a2 = Array.from(l2);
    
    return a1.length < a2.length ?
      a1.map((i1, idx) => func(i1, a2[idx])) :
      a2.map((i2, idx) => func(a1[idx], i2)) 
  }
}