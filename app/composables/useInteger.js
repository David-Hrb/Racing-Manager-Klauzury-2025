export const UseInteger = (min, max) => {
  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return {getRandomInteger}
}
