export const useLeadBoardsApi = () => {
  const updateLeadboard = async (id, data) => {
    try {
        console.log(id, data)
      return await $fetch(`/api/leadboard/id/${id}`, {
        method: 'PATCH',
        body: data
      });
    } catch (error) {
      console.error('Chyba při aktualizaci týmu:', error);
      throw error;
    }
  };


  return {
    updateLeadboard,     
  };
};