export const useManagerDay = () => {
  const manager = useState('manager', () => []);
  const currentday = useState('currentday', () => 0);
  
  const refreshManager = async () => {
    manager.value = await $fetch("/api/manager/listManager");
    if (manager.value[0]) {
      currentday.value = manager.value[0].day;
    }
  };

  return {
    manager,
    currentday,
    refreshManager
  };
};