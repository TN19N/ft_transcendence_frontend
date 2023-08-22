
export const scale = (size: number, marging: number) => {
  return size * marging / 100;
}

export const mapRange = (
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
) => {
  var ratio = (value - fromLow) / (fromHigh - fromLow);
  var mappedValue = ratio * (toHigh - toLow) + toLow;

  return Math.floor(mappedValue);
}
