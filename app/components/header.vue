<template>
  <header class="main-header">
    <div class="left">
      <div class="logo-section">
        <div class="logo-text">
          <span class="main-title">RACING</span>
          <span class="sub-title">MANAGER</span>
        </div>
      </div>
      
      <div class="divider-vertical"></div>
      
      <NuxtLink  @click="sound.play()" to="/menu/menu" class="header-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="60%" viewBox="0 0 24 24">
          <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/>
        </svg>
        <span>Váš tým</span>
      </NuxtLink>
    </div>
    
    <div class="right" >
      <div class="stats-section">
        <div class="stat-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15c0-1.09 1.01-1.85 2.7-1.85c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61c0 2.31 1.91 3.46 4.7 4.13c2.5.6 3 1.48 3 2.41c0 .69-.49 1.79-2.7 1.79c-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55c0-2.84-2.43-3.81-4.7-4.4z"/>
          </svg>
          <span>{{ (String(money).split(/(?=(?:\d{3})+(?!\d))/)).join(' ')}} €</span>
        </div>
        
        <div class="divider-vertical"></div>
        
        <div class="stat-item">
          <svg data-name="Layer 1" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
            <path fill="currentColor" d="M113.854 22.323h-9.667v-2.677a7.25 7.25 0 0 0-14.5 0v2.677H38.313v-2.677a7.25 7.25 0 0 0-14.5 0v2.677h-9.667a1.75 1.75 0 0 0-1.75 1.75v89.781a1.751 1.751 0 0 0 1.75 1.75h99.708a1.751 1.751 0 0 0 1.75-1.75V24.073a1.75 1.75 0 0 0-1.75-1.75zm-20.667-2.677a3.75 3.75 0 0 1 7.5 0V28.5a3.75 3.75 0 0 1-7.5 0zm-65.874 0a3.75 3.75 0 0 1 7.5 0V28.5a3.75 3.75 0 0 1-7.5 0zm-3.5 6.177V28.5a7.25 7.25 0 0 0 14.5 0v-2.677h51.374V28.5a7.25 7.25 0 0 0 14.5 0v-2.677h7.913V44.2H15.9V25.823zM15.9 112.1V47.7h96.2v64.4z"/><path d="M40.2 56h-8.721a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75H40.2a1.749 1.749 0 0 0 1.75-1.75V57.75A1.749 1.749 0 0 0 40.2 56zm-1.75 8.719h-5.221V59.5h5.218zM58.972 56h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.75 1.75 0 0 0 1.75-1.75V57.75a1.75 1.75 0 0 0-1.75-1.75zm-1.75 8.719H52V59.5h5.219zM77.747 56h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.749 1.749 0 0 0 1.75-1.75V57.75a1.749 1.749 0 0 0-1.75-1.75zM76 64.719h-5.222V59.5H76zM96.521 56H87.8a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75h8.718a1.749 1.749 0 0 0 1.75-1.75V57.75A1.749 1.749 0 0 0 96.521 56zm-1.75 8.719h-5.218V59.5h5.218zM40.2 74h-8.721a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75H40.2a1.749 1.749 0 0 0 1.75-1.75V75.75A1.749 1.749 0 0 0 40.2 74zm-1.75 8.719h-5.221V77.5h5.218zM58.972 74h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.75 1.75 0 0 0 1.75-1.75V75.75a1.75 1.75 0 0 0-1.75-1.75zm-1.75 8.719H52V77.5h5.219zM77.747 74h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.749 1.749 0 0 0 1.75-1.75V75.75a1.749 1.749 0 0 0-1.75-1.75zM76 82.719h-5.222V77.5H76zM96.521 74H87.8a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75h8.718a1.749 1.749 0 0 0 1.75-1.75V75.75A1.749 1.749 0 0 0 96.521 74zm-1.75 8.719h-5.218V77.5h5.218zM40.2 92h-8.721a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75H40.2a1.749 1.749 0 0 0 1.75-1.75V93.75A1.749 1.749 0 0 0 40.2 92zm-1.75 8.719h-5.221V95.5h5.218zM58.972 92h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.75 1.75 0 0 0 1.75-1.75V93.75a1.75 1.75 0 0 0-1.75-1.75zm-1.75 8.719H52V95.5h5.219zM77.747 92h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.749 1.749 0 0 0 1.75-1.75V93.75a1.749 1.749 0 0 0-1.75-1.75zM76 100.719h-5.222V95.5H76zM96.521 92H87.8a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75h8.718a1.749 1.749 0 0 0 1.75-1.75V93.75A1.749 1.749 0 0 0 96.521 92zm-1.75 8.719h-5.218V95.5h5.218z"/>
          </svg>
          <span>{{ daycount(currentday) }}</span>
        </div>
      </div>
      
      <div class="divider-vertical"></div>
      
      <button @click="downloadData" class="savegame">
        Uložit hru
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2M5 5v14h14V10h-4V5H5m7 3l5 5h-3v4h-4v-4H9l5-5z"/>
        </svg>
      </button>
      
      
      <div class="divider-vertical"></div>
      
      <button @click="settingsbutton" class="settings-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
const thisManager = ref([]);
const teams = ref([]);
teams.value = await $fetch("/api/listTeam");
const sound = useClickSound();
const { settingsval, toggle } = useSettingsValue();
thisManager.value = await $fetch("/api/manager/listManager");
const currentmanager = thisManager.value[0];
const { manager, currentday, refreshManager } = useManagerDay();
await refreshManager();
let money = ref(teams.value[manager.value[0].team - 1].money);
const { daycount } = useDayCount()

async function downloadData() {
  sound.play()
  try {
    const name = prompt('Zadej název souboru:', 'moje-data');
    if (!name) return;
    
    const data = await $fetch(`/api/port/export?name=${encodeURIComponent(name)}`);
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Chyba při stahování:', error);
    alert('Nepodařilo se stáhnout data');
  }
}

watch(
  () => teams.value[manager.value[0].team - 1].money,
  (newValue, oldValue) => {
    money.value = newValue;
    console.log(`Peníze se změnily z ${oldValue} na ${newValue}`);
  },
  { deep: true }
);



function settingsbutton() {
  sound.play()
  console.log("Toogle")
  toggle()
}
definePageMeta({
  layout: 'menu',
})
</script>

