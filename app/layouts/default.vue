
<template>
  <Background />
  <div v-if="settingsval">
    <Settings />
  </div>
  <music />
  <main>
    <slot />
  </main>

</template>

<script setup>
import Background from '~/components/background.vue'
import music from '~/components/music.vue'
const { settingsval, toggle } = useSettingsValue();
</script>
