// Fisher–Yates shuffle

export const shuffleArray = (
  arr: ReadonlyArray<number>
): ReadonlyArray<number> => {
  const array = [...arr];
  let currentIndex = array.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
