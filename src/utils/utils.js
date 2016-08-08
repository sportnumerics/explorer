
export function round(r, n) {
  let m = Math.pow(10, n);
  return Math.round(r*m)/m;
}
