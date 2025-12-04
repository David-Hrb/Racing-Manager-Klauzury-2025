export const useGetNextRace = async () => {
    const calendar = ref([])
    calendar.value = await $fetch("/api/calendar/listCalendar");
    
    const currentTrack = ref(0)
    
    for (let i = 0; i < calendar.value.length; i++) {
        if (calendar.value[i].raced === 0) {
            currentTrack.value = calendar.value[i].track
            break
        }
       
    }
    console.log(currentTrack.value, "current track")
    return { currentcircuit: currentTrack.value }
}