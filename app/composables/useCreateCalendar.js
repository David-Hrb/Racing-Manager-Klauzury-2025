export const useCreateCalendar = () => {
    let calendar = ref([]);
    let date = 0;
    //calendar.value = $fetch("/api/manager/listCalendar");
    const { getRandomInteger } = UseInteger();
    let randomlength = getRandomInteger(16, 18);
    let usedtrack = [];
    let randomtrack = getRandomInteger(1, 20);
    usedtrack.push(randomtrack);
    for(let i = 0; i < randomlength; i++) {       
        while(usedtrack.includes(randomtrack)) {
            randomtrack = getRandomInteger(1, 20);
        }
        usedtrack.push(randomtrack);
        let randomdate = getRandomInteger(0,2);
        switch(randomdate) {
            case 0:
                date += 7;
                break;
            case 1:
                date += 14;
                break;
            case 2:
                date += 21;
                break;
        }
        calendar.value.push({
            i: randomtrack,
            date: date
        })
    }
    return {
        calendar
    }
}