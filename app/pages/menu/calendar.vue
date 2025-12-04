<template>
  <div class="maincont">
    <div class="container-calendar">
      <h1 class="title">Kalendář Závodů</h1>
      
      <div class="table-wrapper">
        <table class="calendar-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Datum</th>
              <th>Okruh</th>
              <th>Stát</th>
              <th>Město</th>
              <th>Délka</th>
              <th>Kola</th>
              <th>Zatáček</th>
              <th>DRS</th>
              <th>🥇 Vítěz</th>
              <th>🥈 Druhý</th>
              <th>🥉 Třetí</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(calendar, index) in calendarreturn"
              :key="index"
              class="table-row"
            >
              <td class="race-number">{{ index + 1 }}</td>
              <td>{{ daycount(calendar.date) }}</td>
              <td class="circuit-name">{{ getCircuit(calendar.track)?.name }}</td>
              <td><span class="fi" :class="`fi-${getCircuit(calendar.track)?.nationality.toLowerCase()}`" aria-hidden="true"></span> {{ getCircuit(calendar.track)?.nationality }}</td>
              <td>{{ getCircuit(calendar.track)?.town }}</td>
              <td class="text-right"> {{ getCircuit(calendar.track)?.length }} km</td>
              <td class="text-right">{{ getCircuit(calendar.track)?.lapslength }} </td>
              <td class="text-right">{{ getCircuit(calendar.track)?.numberofturns }}</td>
              <td class="text-right">{{ getCircuit(calendar.track)?.DRSzones }}</td>
              <td>
                <div v-if="calendar.winner !== 0" class="driver-info">
                  <div class="driver-name winner">
                  <span class="fi" :class="`fi-${drivers.find(driver => driver.ID === calendar.winner)?.nationality.toLowerCase()}`" aria-hidden="true"></span> 
                  {{ drivers.find(driver => driver.ID === calendar.winner)?.name }}</div>
                  <div class="team-name">
                    <span class="fi" :class="`fi-${teams.find(team => team.ID === calendar.winnerteam)?.nationality.toLowerCase()}`" aria-hidden="true"></span>
                    {{ teams.find(team => team.ID === calendar.winnerteam)?.name }}
                  </div>
                </div>
                <div v-else class="not-raced">Nejelo se</div>
              </td>
              <td>
                <div v-if="calendar.secondplace !== 0" class="driver-info">
                  <div class="driver-name second">
                    <span class="fi" :class="`fi-${drivers.find(driver => driver.ID === calendar.secondplace)?.nationality.toLowerCase()}`" aria-hidden="true"></span> 
                    {{ drivers.find(driver => driver.ID === calendar.secondplace)?.name }}
                  </div>
                  <div class="team-name">
                    <span class="fi" :class="`fi-${teams.find(team => team.ID === calendar.secondteam)?.nationality.toLowerCase()}`" aria-hidden="true"></span>
                    {{ teams.find(team => team.ID === calendar.secondteam)?.name }}
                  </div>
                </div>
                <div v-else class="not-raced">Nejelo se</div>
              </td>
              <td>
                <div v-if="calendar.thirdplace !== 0" class="driver-info">
                  <div class="driver-name third">
                    <span class="fi" :class="`fi-${drivers.find(driver => driver.ID === calendar.thirdplace)?.nationality.toLowerCase()}`" aria-hidden="true"></span> 
                    {{ drivers.find(driver => driver.ID === calendar.thirdplace)?.name }}
                  </div>
                  <div class="team-name">
                    <span class="fi" :class="`fi-${teams.find(team => team.ID === calendar.thirdteam)?.nationality.toLowerCase()}`" aria-hidden="true"></span>
                    {{ teams.find(team => team.ID === calendar.thirdteam)?.name }}
                  </div>
                </div>
                <div v-else class="not-raced">Nejelo se</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   </div>
</template>

<script setup>
const circuits = ref([]);
circuits.value = await $fetch("/api/listCircuit");
const { calendarreturn } = await useCalendarRange()
console.log(calendarreturn)
const { daycount } = useDayCount()


const drivers = ref([])
const teams = ref([])


drivers.value = await $fetch('/api/listDriver')
teams.value = await $fetch('/api/listTeam')
console.log(circuits)

const getCircuit = (trackId) => {
  return circuits.value.find(circuit => circuit.ID === trackId)
}

const switchLayout = inject('switchLayout')

onMounted(() => {
  switchLayout('menu') 
})
</script>

