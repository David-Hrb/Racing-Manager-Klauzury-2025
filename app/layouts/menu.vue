<template>
  <div v-if="settingsval">
    <Settings />
  </div>
  
  <div>
   
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
    
  </div>
</template>

<script setup>
import AppHeader from '~/components/header.vue'
import AppFooter from '~/components/footer.vue'
import Settings from '~/components/settings.vue'

const { settingsval, toggle } = useSettingsValue();
</script>
