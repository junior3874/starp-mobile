export function millisToHumanReadableFormat(millis: number): string {
  const totalSeconds = millis / 1000;

  const HH = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const MM = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const SS = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${HH}:${MM}:${SS}`;
}
