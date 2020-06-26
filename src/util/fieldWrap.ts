export function fieldWrap<T, f extends keyof T>(field: f) {
  return function(val: T[f]): Pick<T, f> {
    return <Pick<T, f>> { [field]: val };
  }
}