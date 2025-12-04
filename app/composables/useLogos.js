export const useLogos = async (id) => {
    const logos = ref([])
    logos.value = await $fetch("/api/listlogo")
    const logo = computed(() => {
        return logos.value[id]?.road || ''
    })
    let logoroad = logo.value
    console.log(logoroad)
    return { logoroad }
  
}