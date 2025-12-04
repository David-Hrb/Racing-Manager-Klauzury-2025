<template>
  <div class="maincont">
    <div class="career">
      <div class="career-drivers">
        <h2 class="title">Best Teams
          <div class="toggle-buttons">
            <button 
              :class="{ active: teamShowType === 'championship' }" 
              @click="teamShowType = 'championship'; sound2.play()">
              championáty
            </button>
            <button 
              :class="{ active: teamShowType === 'wins' }" 
              @click="teamShowType = 'wins'; sound2.play()">
              vítězství
            </button>
            <button 
              :class="{ active: teamShowType === 'podiums' }" 
              @click="teamShowType = 'podiums'; sound2.play()">
              pódia
            </button>
          </div>
        </h2>
        
        <div class="table-wrapper">
          <table class="drivers-table">
            <thead>
              <tr>
                <th>Pořadí</th>
                <th>Logo</th>
                <th>Národnost</th>
                <th>Datum Založení</th>
                <th>Název týmu</th>
                <th>{{ teamShowType === 'championship' ? 'Championáty' : teamShowType === 'wins' ? 'Vítězství' : 'Pódia' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(team, index) in currentTeamList" :key="team.ID">
                <td class="driver-rank">{{ index + 1 }}</td>
                <td>
                  <img 
                    :src="`/images/logo/teams/${String(team.logo).padStart(2, '0')}.svg`"
                    class="avatar" 
                    alt="team logo"
                    style="border: none; border-radius: 0%;"
                  >
                </td>
                <td class="driverflag">
                  <span class="fi" :class="`fi-${team.nationality}`" aria-hidden="true"></span>
                </td>
                <td class="bornyear">{{ team.creationyear }}</td>
                <td class="drivername">{{ team.name }}</td>
                <td class="career-points">
                  {{ teamShowType === 'championship' ? team.historytitles : teamShowType === 'wins' ? team.historywins : team.historypodiums }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="career-drivers">
        <h2 class="title">Career Statistics
          <div class="toggle-buttons">
            <button 
              :class="{ active: driverShowType === 'championship' }" 
              @click="driverShowType = 'championship'; sound2.play()">
              championáty
            </button>
            <button 
              :class="{ active: driverShowType === 'wins' }" 
              @click="driverShowType = 'wins'; sound2.play()">
              vítězství
            </button>
            <button 
              :class="{ active: driverShowType === 'podiums' }" 
              @click="driverShowType = 'podiums'; sound2.play()">
              pódia
            </button>
          </div>
        </h2>
        
        <div class="table-wrapper">
          <table class="drivers-table">
            <thead>
              <tr>
                <th>Pořadí</th>
                <th>Avatar</th>
                <th>Jméno</th>
                <th>Národnost</th>
                <th>Datum Narození</th>
                <th>Aktuální tým</th>
                <th>{{ driverShowType === 'championship' ? 'Championáty' : driverShowType === 'wins' ? 'Vítězství' : 'Pódia' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(driver, index) in currentDriverList" :key="driver.id">
                <td class="driver-rank">{{ index + 1 }}</td>
                <td>
                  <img 
                    :src="`/images/avatars/${giveavatar(driver.avatar)}.svg`" 
                    class="avatar" 
                    alt="avatar"
                  >
                </td>
                <td class="drivername">{{ driver.name }}</td>
                <td class="driverflag">
                  <span class="fi" :class="`fi-${driver.nationality}`" aria-hidden="true"></span> 
                  {{ driver.nationality }}
                </td>
                <td class="bornyear">{{ driver.bornyear }}</td>
                <td class="currentteam">
                  {{ driver.currentteam == null ? "bez týmu" : teams.find(team => team.ID === driver.currentteam)?.name }}
                </td>
                <td class="career-points">
                  {{ driverShowType === 'championship' ? driver.championship : driverShowType === 'wins' ? driver.wins : driver.podiums }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import avatars from '~/assets/json/avatars.json'
const sound = useClickSound(); 
const sound2 = useClickSoundNext();
const drivers = ref([]);
const teams = ref([]);
drivers.value = await $fetch("/api/listDriver");
teams.value = await $fetch("/api/listTeam");

function giveavatar(num) {
  return avatars[num.toString()] 
}

const teamShowType = ref('championship');
const driverShowType = ref('championship');

const currentTeamList = computed(() => {
  const type = teamShowType.value;
  if (type === 'championship') {
    return teams.value.filter(team => team.historytitles > 0).sort((a, b) => b.historytitles - a.historytitles);
  } else if (type === 'wins') {
    return teams.value.filter(team => team.historywins > 0).sort((a, b) => b.historywins - a.historywins);
  } else {
    return teams.value.filter(team => team.historypodiums > 0).sort((a, b) => b.historypodiums - a.historypodiums);
  }
});

const currentDriverList = computed(() => {
  const type = driverShowType.value;
  if (type === 'championship') {
    return drivers.value.filter(driver => driver.championship > 0).sort((a, b) => b.championship - a.championship);
  } else if (type === 'wins') {
    return drivers.value.filter(driver => driver.wins > 0).sort((a, b) => b.wins - a.wins);
  } else {
    return drivers.value.filter(driver => driver.podiums > 0).sort((a, b) => b.podiums - a.podiums);
  }
});

const switchLayout = inject('switchLayout')

onMounted(() => {
  switchLayout('menu') 
})
</script>

<style>

</style>