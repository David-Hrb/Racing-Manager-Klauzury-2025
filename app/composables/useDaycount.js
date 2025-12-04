const manager = ref([]);
manager.value = await $fetch('/api/manager/listManager');
const year = manager.value[0].season;

export const useDayCount = () => {
    function Daytodatum(denVRoce) {
        
     
        console.log(denVRoce, year);
        const yearStart = new Date(year, 2, 1);
        const vyslednyDatum = new Date(yearStart);
        vyslednyDatum.setDate(vyslednyDatum.getDate() + denVRoce - 1);
        console.log(vyslednyDatum);
        return vyslednyDatum.toLocaleDateString('cs-CZ', { 
            day: 'numeric', 
            month: 'short'
        });
        
    }
    
    return { daycount: Daytodatum }
}