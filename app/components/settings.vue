<template>
  <div class="settings">
    <div class="settings-cont">
      <button @click="settingsbutton" class="settings-btn settings-close-btn">
      <svg width="2rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve">
        <path fill="currentcolor" d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
          c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
          c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
          c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
          l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
          c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
      </svg>
      </button>
      <h2>Nastavení</h2>
      <h3>Volume</h3>
      <div class="volume">
        <h4>Main volume: {{volume }} %</h4>
        <input
          type="range"
          min="0"
          max="100"
          v-model="volume"
          @input="handleVolumeChange"
        />
      </div>
      <div class="music-settings">
        <h4>Zapnou hudbu do potadí:</h4>
        <musicOnlyButton style="font-size: 1rem;"/>
      </div> 
      
    </div>

  </div>
</template>

<script setup>
import musicButton from '~/components/musicOnlyButton.vue'
const sound = useClickSound();
const { volume }= useSettings();
const { soundsettings } = useSoundSettings();

const { settingsval, toggle } = useSettingsValue();

function settingsbutton() {
  sound.play()
  console.log("Toogle")
  toggle()
}

function handleVolumeChange() {
  soundsettings(volume.value / 100);
}

onMounted(() => {
  soundsettings(volume.value / 100);
});
</script>

<style>

</style>