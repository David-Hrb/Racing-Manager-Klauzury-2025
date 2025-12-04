export const useManager = async () => {
    const manager = ref([])
    manager.value = await $fetch("/api/manager/listManager")
    console.log(manager.value, "manager")
    const managerteam = computed(() => {
        return manager.value[0].team || ''
    })
    console.log(managerteam.value, "managerteam")
    let manteam = managerteam.value
    return { managerteam, manteam }
}