export const UseFloat = (min, max) => {
  const getRandomFloat = (min, max) => {
    return (Math.random() * (max - min + 1)) + min;
  }
  return {getRandomFloat}
}
