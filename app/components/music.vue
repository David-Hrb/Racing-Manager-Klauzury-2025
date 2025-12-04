
<template>
    <div class="music">
        <button 
            @click="toggleMusic()" 
            class="music-btn"
            :class="bgmusic.isPlaying.value ? 'playing' : ''"
        >
        <i v-if="bgmusic.isPlaying.value" class="fa-solid fa-volume-high"></i>
        <i v-else class="fa-solid fa-volume-xmark"></i>
        
        </button>
    </div>
</template>

<script setup>
const bgmusic = useMusicSound();

function toggleMusic() {
    console.log('Aktuální stav:', bgmusic.isPlaying.value);
    if (bgmusic.isPlaying.value) {
        bgmusic.stop();
    } else {
        bgmusic.play();
    }
}
</script>