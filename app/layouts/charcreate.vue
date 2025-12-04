<template>
  <div>
    <Background />
    <music />
    <slot /> 
  </div>
 
</template>

<script setup>
import Background from '~/components/background.vue'
import music from '~/components/music.vue'
</script>