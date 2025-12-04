export const useManagerApi = () => {
    let id = 1;
    const updateManager = async (data) => {
        try {
        console.log('ID:', id);
        return await $fetch(`/api/manager/man`, {
            method: 'PATCH',
            body: data
        });
        } catch (error) {
        console.error('Chyba při aktualizaci týmu:', error);
        throw error;
        }
    };



    return {
        updateManager,    
    };
};