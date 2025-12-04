<template>
  <div class="background">
    <div class="bluebg"></div>
    <img
      v-for="i in 29"
      :src="`/images/backgrounds/menubg${i === 1 ? '' : i - 1}.webp`"
      :alt="`${i}`"
      class="bgimg"
      :style="{ opacity: currentIndex === i - 1 ? 1 : 0 }"
    >
  </div>
</template>

<script setup>
const currentIndex = ref(0)
let intervalId = null

const showSlides = () => {
  currentIndex.value = (currentIndex.value + 1) % 29
}

onMounted(() => {
  intervalId = setInterval(showSlides, 5000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>