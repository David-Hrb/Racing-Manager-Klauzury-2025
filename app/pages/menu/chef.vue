<template>
  <div class="team-management">   
    <div class="management-container">
      <div class="current-team-section">
        <h1>SPRÁVA JEZDCŮ V TÝMU</h1>
        
        <div class="team-slots">
          <!-- Driver 1 -->
          <div 
            class="team-slot"
            @dragover.prevent="handleDragOver($event, 'driver1')"
            @drop="handleDrop($event, 'driver1')"
            @dragleave="handleDragLeave"
            :class="{ 'drag-over': dragOverSlot === 'driver1' }"
          >
            <div class="slot-label">HLAVNÍ JEZDEC 1</div>
            <div 
              v-if="currentTeamDrivers.driver1"
              class="driver-card"
              draggable="true"
              @dragstart="handleDragStart($event, currentTeamDrivers.driver1, 'driver1')"
              @dragend="handleDragEnd"
            >
              <img 
                :src="`/images/avatars/${giveavatar(currentTeamDrivers.driver1.avatar)}.svg`" 
                class="avatar" 
                alt="avatar"
              >
              <h3>{{ currentTeamDrivers.driver1.name }}</h3>
              <div class="driver-flag">
                <span class="fi" :class="`fi-${currentTeamDrivers.driver1.nationality}`"></span>
                {{ currentTeamDrivers.driver1.nationality }}
              </div>
              <p>Narozen: {{ currentTeamDrivers.driver1.bornyear }}</p>
              <p>Výher: {{ currentTeamDrivers.driver1.wins }}</p>
              <p>Body: {{ getDriverPoints(currentTeamDrivers.driver1.ID) }}</p>
              <div class="driver-rating">
                <div 
                  v-for="(star, index) in stars(calculateRating(currentTeamDrivers.driver1))"
                  :key="index"
                  class="css-star"
                  :class="{
                    'half-star': star === 'half',
                    'empty': star === 'empty'
                  }"
                ></div>
              </div>
            </div>
            <div v-else class="empty-slot">
              <span>Přetáhněte jezdce sem</span>
            </div>
          </div>

          <!-- Driver 2 -->
          <div 
            class="team-slot"
            @dragover.prevent="handleDragOver($event, 'driver2')"
            @drop="handleDrop($event, 'driver2')"
            @dragleave="handleDragLeave"
            :class="{ 'drag-over': dragOverSlot === 'driver2' }"
          >
            <div class="slot-label">HLAVNÍ JEZDEC 2</div>
            <div 
              v-if="currentTeamDrivers.driver2"
              class="driver-card"
              draggable="true"
              @dragstart="handleDragStart($event, currentTeamDrivers.driver2, 'driver2')"
              @dragend="handleDragEnd"
            >
              <img 
                :src="`/images/avatars/${giveavatar(currentTeamDrivers.driver2.avatar)}.svg`" 
                class="avatar" 
                alt="avatar"
              >
              <h3>{{ currentTeamDrivers.driver2.name }}</h3>
              <div class="driver-flag">
                <span class="fi" :class="`fi-${currentTeamDrivers.driver2.nationality}`"></span>
                {{ currentTeamDrivers.driver2.nationality }}
              </div>
              <p>Narozen: {{ currentTeamDrivers.driver2.bornyear }}</p>
              <p>Výher: {{ currentTeamDrivers.driver2.wins }}</p>
              <p>Body: {{ getDriverPoints(currentTeamDrivers.driver2.ID) }}</p>
              <div class="driver-rating">
                <div 
                  v-for="(star, index) in stars(calculateRating(currentTeamDrivers.driver2))"
                  :key="index"
                  class="css-star"
                  :class="{
                    'half-star': star === 'half',
                    'empty': star === 'empty'
                  }"
                ></div>
              </div>
            </div>
            <div v-else class="empty-slot">
              <span>Přetáhněte jezdce sem</span>
            </div>
          </div>

          <!-- Test Driver -->
          <div 
            class="team-slot"
            @dragover.prevent="handleDragOver($event, 'testdriver')"
            @drop="handleDrop($event, 'testdriver')"
            @dragleave="handleDragLeave"
            :class="{ 'drag-over': dragOverSlot === 'testdriver' }"
          >
            <div class="slot-label">TESTOVACÍ JEZDEC</div>
            <div 
              v-if="currentTeamDrivers.testdriver"
              class="driver-card"
              draggable="true"
              @dragstart="handleDragStart($event, currentTeamDrivers.testdriver, 'testdriver')"
              @dragend="handleDragEnd"
            >
              <img 
                :src="`/images/avatars/${giveavatar(currentTeamDrivers.testdriver.avatar)}.svg`" 
                class="avatar" 
                alt="avatar"
              >
              <h3>{{ currentTeamDrivers.testdriver.name }}</h3>
              <div class="driver-flag">
                <span class="fi" :class="`fi-${currentTeamDrivers.testdriver.nationality}`"></span>
                {{ currentTeamDrivers.testdriver.nationality }}
              </div>
              <p>Narozen: {{ currentTeamDrivers.testdriver.bornyear }}</p>
              <p>Výher: {{ currentTeamDrivers.testdriver.wins }}</p>
              <p>Body: {{ getDriverPoints(currentTeamDrivers.testdriver.ID) }}</p>
              <div class="driver-rating">
                <div 
                  v-for="(star, index) in stars(calculateRating(currentTeamDrivers.testdriver))"
                  :key="index"
                  class="css-star"
                  :class="{
                    'half-star': star === 'half',
                    'empty': star === 'empty'
                  }"
                ></div>
              </div>
            </div>
            <div v-else class="empty-slot">
              <span>Přetáhněte jezdce sem</span>
            </div>
          </div>
        </div>

        <!-- Control Panel -->
        <div class="control-panel">
          <button 
            @click="saveChanges" 
            class="save-button"
            :disabled="!canSave || isSaving"
          >
            {{ isSaving ? 'UKLÁDÁNÍ...' : 'ULOŽIT ZMĚNY' }}
          </button>
          <button 
            @click="resetChanges" 
            class="reset-button"
            :disabled="isSaving"
          >
            RESETOVAT
          </button>
          <div v-if="saveMessage" class="save-message" :class="saveMessageType">
            {{ saveMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import avatars from '~/assets/json/avatars.json'

const { manteam } = await useManager()
const { logoroad } = await useLogos(manteam - 1)
const { updateTeam } = useTeamsApi()
const { setupRace } = useRaceSetup()

// Data loading
const drivers = ref([])
const teams = ref([])
const leadboard = ref([])
const currentTeamDrivers = ref({
  driver1: null,
  driver2: null,
  testdriver: null
})
const originalTeamDrivers = ref({})

const draggedDriver = ref(null)
const draggedFromSlot = ref(null)
const dragOverSlot = ref(null)
const isDragging = ref(false)

const isSaving = ref(false)
const saveMessage = ref('')
const saveMessageType = ref('')

const loadData = async () => {
  drivers.value = await $fetch("/api/listDriver")
  teams.value = await $fetch("/api/listTeam")
  leadboard.value = await $fetch('/api/leadboard/listLeadboard')
  
  const { teamAllDrivers } = setupRace({
    drivers: drivers.value,
    teams: teams.value,
    circuits: [],
    teamId: manteam,
    circuitId: 0
  })
  
  const currentTeam = teams.value.find(t => t.ID === manteam)
  if (currentTeam && teamAllDrivers.length >= 3) {
    currentTeamDrivers.value = {
      driver1: teamAllDrivers.find(d => d.ID === currentTeam.driver1) || null,
      driver2: teamAllDrivers.find(d => d.ID === currentTeam.driver2) || null,
      testdriver: teamAllDrivers.find(d => d.ID === currentTeam.testdriver) || null
    }
    
    originalTeamDrivers.value = JSON.parse(JSON.stringify(currentTeamDrivers.value))
  }
}

await loadData()
// Computed property to check if there are unsaved changes
const canSave = computed(() => {
  if (!currentTeamDrivers.value.driver1 || 
      !currentTeamDrivers.value.driver2 || 
      !currentTeamDrivers.value.testdriver) {
    return false
  }
  
  return currentTeamDrivers.value.driver1.ID !== originalTeamDrivers.value.driver1?.ID ||
         currentTeamDrivers.value.driver2.ID !== originalTeamDrivers.value.driver2?.ID ||
         currentTeamDrivers.value.testdriver.ID !== originalTeamDrivers.value.testdriver?.ID
})

function giveavatar(num) {
  return avatars[num.toString()] 
}

// Get driver points from leadboard<
function getDriverPoints(driverId) {
  return leadboard.value.find(entry => entry.driverID === driverId)?.points || 0
}

// Calculate driver rating
function calculateRating(driver) {
  return driver.concentration + driver.overtaking + driver.experience + driver.quickness + driver.stamina
}

function stars(rating) {
  rating = Math.floor(rating / 50) * 0.5
  
  const stars = []
  let remainingRating = rating
  
  for (let i = 0; i < 5; i++) {
    if (remainingRating >= 1) {
      stars.push('full')
      remainingRating -= 1
    } else if (remainingRating >= 0.5) {
      stars.push('half')
      remainingRating -= 0.5
    } else {
      stars.push('empty')
    }
  }
  
  return stars
}

function handleDragStart(event, driver, source) {
  draggedDriver.value = driver
  draggedFromSlot.value = source
  isDragging.value = true
  event.dataTransfer.effectAllowed = 'move'
  event.target.style.opacity = '0.5'
}

function handleDragEnd(event) {
  event.target.style.opacity = '1'
  isDragging.value = false
  draggedDriver.value = null
  draggedFromSlot.value = null
  dragOverSlot.value = null
}

function handleDragOver(event, slot) {
  event.preventDefault()
  dragOverSlot.value = slot
}

function handleDragLeave(event) {
  if (event.target.classList.contains('team-slot')) {
    dragOverSlot.value = null
  }
}

function handleDrop(event, targetSlot) {
  event.preventDefault()
  dragOverSlot.value = null
  
  if (!draggedDriver.value || !draggedFromSlot.value) return
  
  if (draggedFromSlot.value !== targetSlot) {
    const temp = currentTeamDrivers.value[targetSlot]
    currentTeamDrivers.value[targetSlot] = draggedDriver.value
    currentTeamDrivers.value[draggedFromSlot.value] = temp
  }
}

async function saveChanges() {
  if (!canSave.value) return
  
  isSaving.value = true
  saveMessage.value = ''
  
  try {
    const currentTeam = teams.value.find(t => t.ID === manteam)
    
    const updatedTeamData = {
      ...currentTeam,
      driver1: currentTeamDrivers.value.driver1.ID,
      driver2: currentTeamDrivers.value.driver2.ID,
      testdriver: currentTeamDrivers.value.testdriver.ID
    }
    
    await updateTeam(manteam, updatedTeamData)
    
    await loadData()
    
    saveMessage.value = 'Změny byly úspěšně uloženy!'
    saveMessageType.value = 'success'
    
    setTimeout(() => {
      saveMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Error saving team:', error)
    saveMessage.value = 'Chyba při ukládání změn!'
    saveMessageType.value = 'error'
  } finally {
    isSaving.value = false
  }
}

function resetChanges() {
  currentTeamDrivers.value = JSON.parse(JSON.stringify(originalTeamDrivers.value))
  saveMessage.value = ''
}


const switchLayout = inject('switchLayout')

onMounted(() => {
  switchLayout('menu')
})
</script>

<style scoped>

</style>