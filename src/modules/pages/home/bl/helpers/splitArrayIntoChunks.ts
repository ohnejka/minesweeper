export function splitArrayIntoChunks<T>(
  arr: ReadonlyArray<T>,
  chunkSize = 8
): ReadonlyArray<ReadonlyArray<T>> {
  if (chunkSize === 0) {
    console.error(`chunk size must be greater than 0, using default ${8}`);
  }

  const chunkArray = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    chunkArray.push(chunk);
  }

  return chunkArray;
}
