<template>
  <div class="menu-content">
    <div class="header">
      <h1>MOTORSPORT</h1>
      <h2>MANAGER</h2>
    </div>
    
    <div class="menu-options">
      <button @click="loaddata" class="menu-button primary">
        Load Game
      </button>
      <button @click="newgame" class="menu-button primary">
        New Game
      </button>
      <button @click="toggle" class="menu-button primary">
        Settings
      </button>
      <button @click="author" class="menu-button primary">
        Author Notes
      </button>
      <!--
      <button @click="submit sound.play()" class="menu-button primary">
        Submit (del)
      </button>
      -->
    </div>
  </div>
</template>

<script setup>

const sound = useClickSound(); 
const switchLayout = inject('switchLayout')
const { settingsval, toggle } = useSettingsValue();

onMounted(() => {
  switchLayout('default')
})

const newgame = () => {
  sound.play()
  
  navigateTo('charcreate')
}


async function loaddata() {
  sound.play()
  try {
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      const text = await file.text();
      const data = JSON.parse(text);
      
      await $fetch('/api/port/import', {
        method: 'POST',
        body: data
      });
      
      alert('Data úspěšně načtena');
      navigateTo('menu/menu');
    };
    
    input.click();
  } catch (error) {
    console.error('Chyba při načítání:', error);
    alert('Nepodařilo se načíst data');
  }
}

/* 
Formula 1 = Velocity Series
Formula 2 = Circuit Pro Series
Formula 3 = Ignition Series
GT 1 = GT Masters
GT 2 = GT Elite
*/

</script>
