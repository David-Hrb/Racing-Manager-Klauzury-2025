<template>
  <footer class="main-footer">
    <div class="leftside">
      <NuxtLink @click="sound.play()" to="/menu/upgrade" class="footer-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
        </svg>
        <span>Upgrade</span>
      </NuxtLink>
      
      <div class="divider"></div>
      
      <NuxtLink @click="sound.play()" to="/menu/calendar" class="footer-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>
        </svg>
        <span>Kalendář</span>
      </NuxtLink>

      
      
      <div class="divider"></div>
      
      <NuxtLink @click="sound.play()" to="/menu/driverlist" class="footer-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
        <span>Jezdci</span>
      </NuxtLink>
      
      <div class="divider"></div>
      
      <NuxtLink @click="sound.play()" to="/menu/chef" class="footer-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2"/>
        </svg>
        <span>Váši Jezdci</span>
      </NuxtLink>
      
      <div class="divider"></div>
      
      <NuxtLink @click="sound.play()"to="/menu/statistics" class="footer-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1Z"/>
        </svg>
        <span>Statistiky</span>
      </NuxtLink>
      
      <div class="divider"></div>
      
      <NuxtLink @click="sound.play()" to="/menu/leaderboard" class="footer-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"/>
        </svg>
        <span>Žebříček</span>
      </NuxtLink>

      <div class="divider"></div>
    </div>
    <div class="rigthside">
      <button v-if="!racingday" @click="nextday(currentday + 1)" class="menu-button" style="height: 80%; padding: 0px 20px; ">
        Další Den
      </button>

      <button v-else @click="switchToDefaut" class="menu-button" style="height: 80%; padding: 0px 20px;">
        Závod
      </button>
    </div>
 
  </footer>
</template>

<script setup>
const sound = useClickSound();
const { currentday, refreshManager } = useManagerDay();
let racingday = ref(false);
const calendar = ref([]);
calendar.value = await $fetch("/api/calendar/listCalendar");


onMounted(() => {
  switchLayout('menu') 
  checkRacingDay(currentday.value);
})

const nextday = async (newDay) => {
  sound.play();
 
  console.log("Next day:", newDay);
  try {
    await $fetch("/api/manager/updateNextDay", {
      method: "PUT",
      body: {
        day: newDay,
      },
    });
    currentday.value = newDay; 
    checkRacingDay(newDay);
  } catch (error) {
    console.error("Error updating limit:", error);
  }
}

function checkRacingDay(day) {
  const racingDays = calendar.value
    .filter(event => event.raced === 0)
    .map(event => event.date);  
  console.log("Racing Days:", racingDays);
  console.log("Is Racing Day:", racingDays.includes(day));
  if (racingDays.includes(day)) return racingday.value = true;
  else return racingday.value = false;
}

const switchLayout = inject('switchLayout')

const switchToDefaut = () => {
  navigateTo('../kvalification')
} 
</script>