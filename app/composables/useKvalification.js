export const useKvalification = () => {
  const displayedLaptimes = useState('laptimes', () => [])
  
  return {
    displayedLaptimes
  }
}