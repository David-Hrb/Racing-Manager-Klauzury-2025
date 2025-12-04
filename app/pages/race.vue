<template>
  <div class="pos-absolute" v-if="choosetyre">
    <div class="pos-absolute-inside">
      <h1 v-if="firstopen">VYBERTE GUMY PRO VÁŠ TÝM</h1>
      <h1 v-else>PIT STOP</h1>
      <button @click="loadgame()" class="letout-button">CONTINUE</button>  
      <!-- DRIVER 1-->
      <div 
          v-if="teamdrivers"
          class="pneupick-container"
          >
          <div class="pneu-driver">
            <img :src="`/images/avatars/${giveavatar(teamdrivers[0].avatar)}.svg`" class="kvalimg" alt="avatar">
            <div class="pneu-name">
              <div class="pneu-driver-info">
                <span class="fi" :class="`fi-${teamdrivers[0].nationality}`" aria-hidden="true"></span>
                <div >{{ teamdrivers[0].name }}</div>
              </div>
              <div class="pneu-tyre-info">
                <span>Aktuální pneumatiky: </span> 
                <div :style="`color: ${gettyrescolor(driver1?.currenttyre)}`">
                    {{ gettyres(driver1?.currenttyre, true) }}
                </div>
              </div>
            </div>
          </div>        
          <div class="tyres">
            <button 
              v-for="(tyres, index) in tyres"
              @click="changetyres(tyres.id, teamdrivers[0].ID)"
              class="pneupick"
              >
              <div class="tyre" :style="`color: ${tyres.color}`">                    
               <div class="color-stripe"></div>      
                <div class="rim">
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                </div>                
                <span class="tyre-name">{{ tyres.name }}</span>
              </div>        
            </button>
          </div>    
          
      </div>
      <!-- DRIVER 2-->
      <div 
          v-if="teamdrivers"
          class="pneupick-container"
          >
          <div class="pneu-driver">
            <img :src="`/images/avatars/${giveavatar(teamdrivers[1].avatar)}.svg`" class="kvalimg" alt="avatar">
            <div class="pneu-name">
              <div class="pneu-driver-info">
                <span class="fi" :class="`fi-${teamdrivers[1].nationality}`" aria-hidden="true"></span>
                <div >{{ teamdrivers[1].name }}</div>
              </div>
              <div class="pneu-tyre-info">
                <span>Aktuální pneumatiky: </span> 
                <div :style="`color: ${gettyrescolor(driver2?.currenttyre)}`">
                    {{ gettyres(driver2?.currenttyre, true)}}
                </div>
              </div>
            
            </div>
          </div>        
          <div class="tyres">
            <button 
              v-for="(tyres, index) in tyres"
              @click="changetyres(tyres.id, teamdrivers[1].ID)"
              class="pneupick"
              >
              <div class="tyre" :style="`color: ${tyres.color}`">                    
               <div class="color-stripe"></div>      
                <div class="rim">
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                </div>                
                <span class="tyre-name">{{ tyres.name }}</span>
              </div>        
            </button>
          </div>
          
      </div>
      
    </div>
  </div>
  <div class="pos-absolute" v-if="boxTrue">
    <div class="pos-absolute-inside">
      <h1 v-if="selectedDriver">PIT STOP - {{ selectedDriver ? selectedDriver.name : '' }}</h1>
      <button @click="confirmPitStop()" class="letout-button">POTVRDIT A POKRAČOVAT</button>  
      
      <!-- SINGLE DRIVER -->
      <div 
          v-if="selectedDriver"
          class="pneupick-container"
          >
          <div class="pneu-driver">
            <img :src="`/images/avatars/${giveavatar(selectedDriver.avatar)}.svg`" class="kvalimg" alt="avatar">
            <div class="pneu-name">
              <div class="pneu-driver-info">
                <span class="fi" :class="`fi-${selectedDriver.nationality}`" aria-hidden="true"></span>
                <div>{{ selectedDriver.name }}</div>
              </div>
             
              <div class="pneu-tyre-info">
                <span>Nová pneumatika: </span> 
                <div :style="`color: ${gettyrescolor(newTyreSelection)}`">
                    {{ gettyres(newTyreSelection, true) }}
                </div>
              </div>
            </div>
          </div>        
          <div class="tyres">
            <button 
              v-for="(tyre, index) in tyres"
              :key="index"
              @click="selectNewTyre(tyre.id)"
              class="pneupick"
              :class="{ 'selected': newTyreSelection === tyre.id }"
              >
              <div class="tyre" :style="`color: ${tyre.color}`">                    
               <div class="color-stripe"></div>      
                <div class="rim">
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                  <div class="spoke"></div>
                </div>                
                <span class="tyre-name">{{ tyre.name }}</span>
              </div>        
            </button>
          </div>           
      </div>   
    </div>
  </div>
  <div class="pos-absolute" v-if="raceEnded">
    <div class="pos-absolute-inside">
      <h1>VÝSLEDKY ZÁVODU</h1>
       <div class="results-container">
        <div 
          v-for="(driver, index) in displayedLaptimes" 
          :key="driver.num"
          class="result-row"
        >
          <img :src="`/images/avatars/${giveavatar(driver.avatar)}.svg`" class="kvalimg" alt="avatar">
            
          <span class="position">{{ index + 1 }}.</span>
          <div class="driver-info">
            <div class="driver-line">
              <span class="fi" :class="`fi-${driver.nationality}`" aria-hidden="true"></span>
              <span class="driver-name">{{ driver.name }}</span>
            </div>
            <div class="team-line">
              <span class="fi" :class="`fi-${driver.teamnationality}`" aria-hidden="true"></span>
              <span class="team-name">{{ driver.teamname }}</span>
            </div>
          </div>
          <div class="laptime-info">
            <span class="bestlap"></span>       
          </div>
        </div>
        <button @click="switchToMenu" class="close-button" :disabled="isProcessingRaceEnd">
          {{ isProcessingRaceEnd ? 'UKLÁDÁNÍ VÝSLEDKŮ...' : 'POKRAČOVAT' }}
        </button>
      </div>
    </div>
  </div>
  <!-- RACE -->
  <div class="container">
    <div class="parentrace">
      <div class="div1race table-section">
        <h2 class="table-title">Aktuální Pořadí Závodu</h2>
        <div class="table">
          <div 
            v-for="(driver, index) in displayedLaptimes" 
            :key="driver.num"
            class="result-row"
          >
            <span class="position">{{ index + 1 }}.</span>
            <div class="driver-info">
              <div class="driver-line">
                <span class="fi" :class="`fi-${driver.nationality}`" aria-hidden="true"></span>
                <span class="driver-name">{{ driver.name }} {{ driver.id }}</span>
              </div>
              <div class="team-line">
                <span class="fi" :class="`fi-${driver.teamnationality}`" aria-hidden="true"></span>
                <span class="team-name">{{ driver.teamname }}</span>
              </div>
            </div>
            <div class="laptime-info">
              <span class="bestlap" v-if="index == 0">
                {{ laptimereturn(Number(driver.time).toFixed(4)) }}               
                <span class="text" :style="`color: ${gettyrescolor(driver.currenttyre)}`">
                {{gettyres(driver.currenttyre, false)}} 
                </span>
              {{ driver.driverdeg.toString().padEnd(7, '0') }}%

              {{ driver.lastposition }}
              </span>
              <span class="bestlap" v-else>
                <span v-if="driver.dnf" class="text">DNF <span></span></span> 
                <span v-else>+ {{ Number(driver.gaptonext).toFixed(4) }} <span></span></span>
                <span class="text" :style="`color: ${gettyrescolor(driver.currenttyre)}`">
                  {{gettyres(driver.currenttyre, false)}} 
                </span>

                {{ (driver.driverdeg).toString().padEnd(7, '0') }}%

                {{ driver.lastposition }}
              </span>
              
            </div>
          </div>
        </div>
      </div>
      <div class="div2race grid-box" >
        <h2>INFORMACE O ZÁVODĚ</h2>
        <div class="race-buttons">
          <button @click="minuslap">-</button>
          <select v-model="infotextlap">
            <option v-for="lap in totalLaps" :key="lap" :value="lap">
              Lap {{ lap }}
            </option>
          </select>
          <button @click="addlap">+</button>
        </div>     
        <div class="text" v-if="currentLapInfo">
          <div class="inside-text">
            LAP: {{ infotextlap }} 
            <div class="text-cont" v-if="currentLapInfo.overtake && currentLapInfo.overtake.length > 0">
              <h3>OVERTAKES</h3>
              <span v-for="(textover, index) in currentLapInfo.overtake" :key="index">
                {{ Array.isArray(textover) ? textover.join(" ") : textover }}
              </span>
            </div>
            <div v-if="currentLapInfo.pitstop && currentLapInfo.pitstop.length > 0">
              <h3>PITSTOPS</h3>
              <span v-for="(pitstop, index) in currentLapInfo.pitstop" :key="index">
                {{  Array.isArray(pitstop) ? pitstop.join(" ") : pitstop }}
              </span>
            </div>
            <div v-if="currentLapInfo.dnf && currentLapInfo.dnf.length > 0">
              <h3>OUT OF THE RACE</h3>
              <span v-for="(crash, index) in currentLapInfo.dnf" :key="index">
                {{ Array.isArray(crash) ? crash.join(" ") : crash  }}
              </span>
            </div>
            <div v-if="currentLapInfo.other && currentLapInfo.other.length > 0">
              <h3>OUT OF THE RACE</h3>
              <span v-for="(otherinfo, index) in currentLapInfo.other" :key="index">
                {{ Array.isArray(craotherinfosh) ? otherinfo.join(" ") : otherinfo  }}
              </span>
            </div>
          </div>       
        </div>     
      </div>
      <div class="div3race driver1 grid-box">
        <div 
        v-if="teamdrivers[0]"
        :class="`drivers-${teamdrivers[0].name.replace(/\s+/g, '-').toLowerCase()}`"
        class="kvaldriver "
        >
        
          <img :src="`/images/avatars/${giveavatar(teamdrivers[0].avatar)}.svg`" class="kvalimg" alt="avatar">
          
          <div class="kvalperson">
            <div class="name">
              <span class="fi" :class="`fi-${teamdrivers[0].nationality}`" aria-hidden="true"></span>
              <div class="kvalname">{{ teamdrivers[0].name }}</div>
            </div>
            
            <div class="kvalborn ">Pozice: {{ driver1?.position }}</div>
            <div class="kvalborn ">nejlepší čas: {{ laptimereturn(driver1?.bestTime) }}</div>
            <div class="kvalplace">Aktuálůní pneumatika: <span :style="`color: ${gettyrescolor(driver1?.currenttyre)}`">{{ gettyres(driver1?.currenttyre, true) }}</span></div>
            <div class="kvalplace">poškození pneumatiky: {{ driver1?.driverdeg }} %</div>
          </div>
          <button @click="sentdriver(0)" class="letout-button">Box</button>
        </div>
      </div>
      <div class="div4race driver1 grid-box">
         <div 
          v-if="teamdrivers[1]"
          :class="`drivers-${teamdrivers[1].name.replace(/\s+/g, '-').toLowerCase()}`"
          class="kvaldriver"
          >
          <img :src="`/images/avatars/${giveavatar(teamdrivers[1].avatar)}.svg`" class="kvalimg" alt="avatar">
          
          <div class="kvalperson">
            <div class="name">
              <span class="fi" :class="`fi-${teamdrivers[1].nationality}`" aria-hidden="true"></span>
              <div class="kvalname">{{ teamdrivers[1].name }}</div>
            </div>
            
            <div class="kvalborn ">Pozice: {{ driver2?.position }}</div>
            <div class="kvalborn ">nejlepší čas: {{ laptimereturn(driver2?.bestTime) }}</div>
            <div class="kvalplace">Aktuálůní pneumatika: <span :style="`color: ${gettyrescolor(driver2?.currenttyre)}`">{{ gettyres(driver2?.currenttyre, true) }}</span></div>
            <div class="kvalplace">poškození pneumatiky: {{ driver2?.driverdeg }} %</div>
          </div>
          <button @click="sentdriver(1)" class="letout-button">Box</button>
        </div>
      </div>
      <div class="div5race timer grid-box">
         {{ formattedCurrentLap }} / {{ formattedTotalLaps }} 
         <div class="controls">
          <button 
            class="play-stop-btn" 
            @click="toggleTimer"
            :class="{ 'is-playing': isRunning }"
          >
            <div class="play-icon" v-if="!isRunning"></div>
            <div class="stop-icon" v-else></div>
          </button>
         </div>
        </div>
      <div class="div6race grid-box circuit-info">
         <div
          v-for="(circuit) in currentcircuitinfo"
          class="circuit"
        >
          <div class="name">
            <span class="fi" :class="`fi-${circuit.nationality.toLowerCase()}`"></span>
            {{ circuit.name }}
          </div>
          <div class="info">
            <div>Místo závodu: {{ circuit.town }}</div>
            <div>Počet zatáček: {{ circuit.numberofturns }}</div>
            <div>Délka kola: {{ circuit.length }} m</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import avatars from '~/assets/json/avatars.json'
import tyres from '~/assets/json/tyrelist.json'


const { setupRace } = useRaceSetup();
const { getRandomInteger } = UseInteger();
const { getRandomFloat } = UseFloat();
const { calculateLapTime } = useLapTime();
const { createEvent } = useRaceEvents();



let drivers = ref([]);
let teams = ref([]);
let circuits = ref([]); 
let manager = ref([]);
let calendar = ref([]);


drivers.value = await $fetch("/api/listDriver");
teams.value = await $fetch("/api/listTeam");
circuits.value = await $fetch("/api/listCircuit");
manager.value = await $fetch("/api/manager/listManager");
calendar.value = await $fetch('/api/calendar/listCalendar');

let currentteam = manager.value[0].team;;
const { currentcircuit } = await useGetNextRace()
const raceEnded = ref(false);
const isProcessingRaceEnd = ref(false);

const { teamDrivers, currentTeamInfo, currentCircuitInfo, isValid } = setupRace({
  drivers: drivers.value,
  teams: teams.value,
  circuits: circuits.value,
  teamId: currentteam,
  circuitId: currentcircuit
});

let teamdrivers = ref(teamDrivers);
let currentcircuitinfo = ref(currentCircuitInfo ? [currentCircuitInfo] : []);
let currentCircuitPositionID = calendar.value.find(event => event.track === currentcircuit)?.ID || null;
let selectedDriver = ref(null);
const pitStopDriverId = ref(null);
let boxTrue = ref(false);
let newTyreSelection = ref(0);

let cardriverinfo = ref([])
let driverslap = ref({});
let driverslastlap = ref({});
let driversdeg = ref({});
let driversinlap = ref({});
let driverscurrtyre = ref({})
let timeontrack = ref({});
let driverTime = ref({});


let text = ref([]);


const { displayedLaptimes } = useKvalification();
let tyreLife = ref({
  "0": 14,
  "1": 22,
  "2": 37,
  "3": 11,
  "4": 9
});

let choosetyre = ref(true);
let firstopen = ref(true);

// timer 
const totalLaps = ref(currentCircuitInfo.lapslength);        
const currentLap = ref(0)       
const isRunning = ref(false)   
const lapSpeed = ref(3000)       
let currenttime = ref(0);
let timedelay = ref({})

let timer = null 

// 

const infotext = ref({});
const infotextlap = ref(0);


console.log(totalLaps.value)
for (let i = 0; i < totalLaps.value; i++) {
  infotext.value[i] = [];
}

console.log("info",infotext.value);

const minuslap = () => {
  if (infotextlap.value > 1) {
    infotextlap.value--;
  }
};

const addlap = () => {
  if (infotextlap.value < totalLaps.value) {
    infotextlap.value++;
  }
};

const currentLapInfo = computed(() => {
  return infotext.value[infotextlap.value] || null;
});

// FUNKCE INGAME
function laptimereturn(num) {
  if(num === 1000) {
    return "Žádný čas"
  }
  let minute = 0
  while(num > 60){
    num -= 60;
    minute +=1;
  }
  let seconds = Math.floor(num);
  let miliseconds = Math.round((num - seconds) * 10000);
  
  if(seconds < 10) {
    return minute + ":0" + seconds + "." + miliseconds.toString().padStart(4, '0')
  } else {
    return minute + ":" + seconds + "." + miliseconds.toString().padStart(4, '0')
  } 
}

function giveavatar(num) {
  return avatars[num.toString()] 
}
const driver1 = computed(() => {
  return displayedLaptimes.value.find(d => d.id === teamdrivers.value[0].ID);
});

const driver2 = computed(() => {
  return displayedLaptimes.value.find(d => d.id === teamdrivers.value[1].ID);
});
function gettyres(num, fullname) {
  switch(num) {
    case 0:
      return fullname ? "SOFT" :  "S"
    case 1: 
      return fullname ? "MEDIUM" :  "M" 
    case 2: 
      return fullname ? "HARD" : "H"
    case 3: 
      return fullname ? "INTERMEDIATE" : "I"
    case 4: 
      return fullname ? "WET" : "W"
  }
}

function gettyrescolor(num) {
  switch(num) {
    case 0:
      return tyres[0].color
    case 1: 
      return tyres[1].color
    case 2: 
      return tyres[2].color
    case 3: 
      return tyres[3].color
    case 4: 
      return tyres[4].color
  }
}
function changetyres(num, index) {
  console.log("true");
  console.log(index);
  console.log(num);
  const driverIndex = displayedLaptimes.value.findIndex(driver => driver.id === index);
  
  if (driverIndex !== -1) {
    displayedLaptimes.value[driverIndex].currenttyre = num;
    console.log("Tyre changed for:", displayedLaptimes.value[driverIndex].name);
  } else {
    console.error("Driver not found:", index);
  }
}


function sentdriver(driverIndex) {
  if (isRunning.value) {
    toggleTimer()
  }

  const driverId = teamdrivers.value[driverIndex].ID;
  pitStopDriverId.value = driverId;
  selectedDriver.value = teamdrivers.value[driverIndex];

  const currentDriver = displayedLaptimes.value.find(d => d.id === driverId);
  if (currentDriver) {
    newTyreSelection.value = currentDriver.currenttyre;
  }
  
  boxTrue.value = true
  choosetyre.value = false
}

function selectNewTyre(tyreId) {
  newTyreSelection.value = tyreId;
}


function confirmPitStop() {
  const driverIndex = displayedLaptimes.value.findIndex(
    driver => driver.id === pitStopDriverId.value
  )
  
  if (driverIndex !== -1) {
    const driver = displayedLaptimes.value[driverIndex]
    driver.currenttyre = newTyreSelection.value
    driver.driverdeg = 0
    const pitStopTime = currentCircuitInfo.pitstoptime
    const randomDelay = getRandomFloat(0, 2)
    driver.time = Number(driver.time) + pitStopTime + randomDelay
    
    console.log(`${driver.name} dokončil pit stop - nové pneumatiky: ${gettyres(newTyreSelection.value, true)}`)
  }
  
  boxTrue.value = false
  selectedDriver.value = null
  pitStopDriverId.value = null
  
  toggleTimer()
}

// ONSTART FUNKCE
function loaddriver() {
    for(let i = 0; i < 10; i++) {
      cardriverinfo.value.push({
        "normallaptime": currentcircuitinfo.value[0].normallaptime,
        "teamnationality": teams.value[i].nationality,
        "teamname": teams.value[i].name,
        "nationality": drivers.value[teams.value[i].driver1 - 1].nationality,
        "name": drivers.value[teams.value[i].driver1 - 1].name,
        "racestart": drivers.value[teams.value[i].driver1 - 1].racestart,
        "concentration": drivers.value[teams.value[i].driver1 - 1].concentration,
        "overtaking": drivers.value[teams.value[i].driver1 - 1].overtaking,
        "experience": drivers.value[teams.value[i].driver1 - 1].experience,
        "quickness": drivers.value[teams.value[i].driver1 - 1].quickness,
        "stamina": drivers.value[teams.value[i].driver1 - 1].stamina,
        "bornyear": drivers.value[teams.value[i].driver1 - 1].bornyear,
        "avatar": drivers.value[teams.value[i].driver1 - 1].avatar,
        "aerodynamics": teams.value[i].aerodynamics,
        "gearbox": teams.value[i].gearbox,
        "brakes": teams.value[i].brakes,
        "rearwing": teams.value[i].rearwing,
        "frontwing": teams.value[i].frontwing,
        "reliability": teams.value[i].reliability,
        "numberofturns": currentcircuitinfo.value[0].numberofturns,
        "DRSzones": currentcircuitinfo.value[0].DRSzones,
        "pneudeg": 0,
        "currenttyre": 0,
        "id": drivers.value[teams.value[i].driver1 - 1].ID
      });
      cardriverinfo.value.push({
        "normallaptime": currentcircuitinfo.value[0].normallaptime,
        "teamnationality": teams.value[i].nationality,
        "teamname": teams.value[i].name,
        "nationality": drivers.value[teams.value[i].driver2 - 1].nationality,
        "name": drivers.value[teams.value[i].driver2 - 1].name,
        "racestart": drivers.value[teams.value[i].driver2 - 1].racestart,
        "concentration": drivers.value[teams.value[i].driver2 - 1].concentration,
        "overtaking": drivers.value[teams.value[i].driver2 - 1].overtaking,
        "experience": drivers.value[teams.value[i].driver2 - 1].experience,
        "quickness": drivers.value[teams.value[i].driver2 - 1].quickness,
        "stamina": drivers.value[teams.value[i].driver2 - 1].stamina,
        "bornyear": drivers.value[teams.value[i].driver2 - 1].bornyear,
        "avatar": drivers.value[teams.value[i].driver2 - 1].avatar,
        "aerodynamics": teams.value[i].aerodynamics,
        "gearbox": teams.value[i].gearbox,
        "brakes": teams.value[i].brakes,
        "rearwing": teams.value[i].rearwing,
        "frontwing": teams.value[i].frontwing,
        "reliability": teams.value[i].reliability,
        "numberofturns": currentcircuitinfo.value[0].numberofturns,
        "DRSzones": currentcircuitinfo.value[0].DRSzones,
        "pneudeg": 0,
        "currenttyre": 0,
        "id": drivers.value[teams.value[i].driver2 - 1].ID
      });
    }
  }

loaddriver()

/**
 * Function to start the game and set up all the drivers with their start positions,
 * tyre strategies and lap times.
 */
function startgame() {
  let i = 0;
  displayedLaptimes.value.forEach(driver => {
    if(driver.id != teamdrivers.value[0].ID && driver.id != teamdrivers.value[1].ID) {
      let driverstrategy = [];
      let firstpneu = getRandomInteger(0, 2);
      driver.currenttyre = firstpneu;
      let driverpneulife = tyreLife.value[firstpneu.toString()];
      let maxlaps = currentCircuitInfo.lapslength;
      let currentlap = driverpneulife;  
      let stops = 0;
      driverstrategy.push({"stopnum": 0, "type": firstpneu, "lap": 0});
      
      while(currentlap < maxlaps) {
        stops++;
        let remainingLaps = maxlaps - currentlap;
        let randompneu = getRandomInteger(0, 2);
        driverpneulife = tyreLife.value[randompneu.toString()];
        if (driverpneulife < remainingLaps) {
          let found = false;
          for(let i = 0; i < Object.keys(tyreLife.value).length; i++) {
            if(tyreLife.value[i] >= remainingLaps) {
              driverpneulife = tyreLife.value[i];
              randompneu = i;
              found = true;
              break;
            }
          }
          if (!found) {
            randompneu = getRandomInteger(0, 2);
            driverpneulife = tyreLife.value[randompneu.toString()];
          }
        }
        
        driverstrategy.push({"stopnum": stops, "type": randompneu, "lap": currentlap});
        currentlap += driverpneulife;
      }
    driver.strategy = driverstrategy;
    } 
    driver.time = (i * 0.2).toFixed(1);
    driver.gaptoleader = (i * 0.2).toFixed(1);
    driver.driverdeg = 0;
    driver.laptime = "16:40.0000";  
    driver.bestTime = 1000;
    driver.gaptonext = (i * 0.2).toFixed(1);
    driver.dnf = false;
    driver.lastposition = i + 1;
    i++
  });
  
  console.log(displayedLaptimes.value);
}

startgame()

function loadgame() {
  console.log("here in loadgame")
  choosetyre.value = false;
  firstopen.value = false;
}

// TIMER                

const formattedCurrentLap = computed(() => {
  return currentLap.value
})

const formattedTotalLaps = computed(() => {
  return totalLaps.value
})
function changeLapSpeed(value) {
  lapSpeed.value = value
  console.log('Lap speed changed to:', lapSpeed.value, 'ms')
  
  if (isRunning.value) {
    clearInterval(timer)
    timer = setInterval(processLap, lapSpeed.value)
  }
}

function processLap() {
  if (currentLap.value < totalLaps.value) {
    currentLap.value++;
    everyLap();
    console.log(`Lap ${currentLap.value}/${totalLaps.value}`);
  } else {
    clearInterval(timer);
    isRunning.value = false;
    raceEnded.value = true;
    isProcessingRaceEnd.value = true;
    raceEnd();
    console.log('Race finished!');
  }
}

function toggleTimer() {
  if (!isRunning.value) {
    if (currentLap.value < totalLaps.value) {
      isRunning.value = true;
      timer = setInterval(processLap, lapSpeed.value);
      console.log('Timer started.');
    }
  } else {
    clearInterval(timer);
    isRunning.value = false;
    console.log('Timer paused.');
  }
}

// EVERY LAP FUNCTIONS


function everyLap() {
  let allOvertakes = [];
  let allPitstops = [];
  let allCrashes = [];
  let allEvents = [];
  
  //PLAYERS ACTIONS
  infotextlap.value = currentLap.value;
  displayedLaptimes.value.forEach((driver, i, arr) => {
    if(driver.id == teamdrivers.value[0].ID || driver.id == teamdrivers.value[1].ID) {
      /*if((tyreLife.value[driver.currenttyre.toString()] + driver.driverdeg) >= 100) {
        toggleTimer();
        //choosetyre.value = true;
      }*/
      if(driver.driverdeg > 100) {
        console.log("true driver from our team retire");
        driver.dnf = true;
        driver.time = 1000000000000 + currentLap.value;
      }
    }
  });

  displayedLaptimes.value.forEach((driver) => {
    if(driver.dnf) return;
    
    // Přidat degradaci z minulého kola
    driver.driverdeg += tyres[driver.currenttyre.toString()].degradation_per_lap;
    driver.driverdeg = Number(driver.driverdeg.toFixed(4));
    
    // Zkontrolovat pitstop strategii
    if(driver.id != teamdrivers.value[0].ID && driver.id != teamdrivers.value[1].ID) {
      driver.strategy.forEach(strategy => {
        if(strategy.lap == currentLap.value) {
          driver.currenttyre = strategy.type;
          let timelostinpit = getRandomFloat(0, 2);
          driver.time = Number(driver.time) + currentCircuitInfo.pitstoptime + timelostinpit;
          driver.driverdeg = 0;
          console.log(driver.name, "pit stop na kole", currentLap.value)
          let drivereventtyre = gettyres(driver.currenttyre, true)
          const pitstopEvent = createEvent('pitstop', {
            driver1Name: driver.name,
            driver1Team: driver.teamname,
            tyre: drivereventtyre
          });
          allPitstops.push(pitstopEvent);
        }
      });  
    }
   // console.log("PITSOP",driver.name, driver.position)
  });

  displayedLaptimes.value = displayedLaptimes.value.sort((a, b) => {
    return a.time - b.time;
  }).map((driver, index, sortedArr) => ({
    ...driver,
    position: index + 1,
    gaptonext: index > 0 && !driver.dnf 
      ? Math.abs(Number(driver.time) - Number(sortedArr[index - 1].time))
      : driver.gaptonext
  }));

  

  displayedLaptimes.value.forEach((driver, i, arr) => {
    if(driver.dnf) {
      return;
    }
    
    // ------------------------------ DRIVER LAP TIME ------------------------------   
    const driverstats = cardriverinfo.value.find(driverstats => driverstats.id === driver.id)  
    const stats = {
      quickness: driverstats.quickness,
      concentration: driverstats.concentration,
      stamina: driverstats.stamina,
      turns: currentCircuitInfo.numberofturns,
      aerodynamics: driverstats.aerodynamics,
      frontwing: driverstats.frontwing,
      brakes: driverstats.brakes,
      drszones: currentCircuitInfo.DRSzones,
      gearbox: driverstats.gearbox,
      rearwing: driverstats.rearwing,
      degradation: driver.driverdeg,
      experience: driverstats.experience,
      basetime: currentCircuitInfo.normallaptime,
      tyretype: driver.currenttyre
    }

    let result = calculateLapTime(stats);
    let laptime = result.laptime;
    let crash = result.crash;
    
    if(crash) {
      driver.gaptonext = 0;
      driver.time = 1000000000000 + currentLap.value;
      driver.dnf = true;
      console.log(driver.name, "crash")
      const crashEvent = createEvent('retirement_crash', {
        driver1Name: driver.name,
        driver1Team: driver.teamname
      });
      allCrashes.push(crashEvent);
      return;
    }

    if(laptime < driver.bestTime) {
      driver.bestTime = laptime;
    }
    
    driver.time = Number(driver.time) + Number(laptime);
    
    // ------------------------------ DRIVER OVERTAKING ------------------------------
    if(i > 0) {
      let j = i - 1;
      while(j >= 0 && driver.time < arr[j].time) {       
        let difference = driver.time - arr[j].time;
        const normalDifference = Math.min(Math.abs(difference), 100) / 100;
        const sigmoidChance = (1 / (1 + Math.exp(-10 * (normalDifference - 0.5)))) * 100;
        const randomvalue = getRandomInteger(0, 100);
        const timeadd = getRandomInteger(0, 100);         
        driver.time = Number(driver.time) + 0.01 * timeadd;
        arr[j].time = Number(arr[j].time) + 0.01 * timeadd;
        if(randomvalue > sigmoidChance) {
          /*if(arr[j].position == 1) {
            const leadevent = createEvent('leading', {
              driver1Name: driver.name,
              driver1Team: driver.teamname
            })
            allEvents.push(leadevent)
          }*/
          const overtakeEvent = createEvent('overtake', {
            driver1Name: driver.name,
            driver1Team: driver.teamname,
            driver2Name: arr[j].name,
            driver2Team: arr[j].teamname
          });
          allOvertakes.push(overtakeEvent);
          driver.gaptonext = Math.abs(Number(driver.time) - Number(arr[i - 1].time));
        } else {
          break;
        }             
        j--;
      }
    }
  });
  
  // Zapsat všechny overtakes najednou na konci
  infotext.value[currentLap.value] = {
    "overtake": allOvertakes,
    "dnf": allCrashes,
    "pitstop": allPitstops,
    "other": allEvents
  };
  console.log(infotext.value[currentLap.value]);

  displayedLaptimes.value = displayedLaptimes.value.sort((a, b) => {
    // DNF jezdci vždy na konec
    if (a.dnf && b.dnf) return 0;
    if (a.dnf) return 1;
    if (b.dnf) return -1;
    
    // Normální řazení podle času
    return a.time - b.time;
  }).map((driver, index, sortedArr) => ({
    ...driver,
    position: index + 1,
    gaptonext: index > 0 && !driver.dnf 
      ? Math.abs(Number(driver.time) - Number(sortedArr[index - 1].time))
      : driver.gaptonext
  }));

  
}
// AFTER RACE
const { updateLeadboard  } = useLeadBoardsApi();
const leadboard = ref([])
leadboard.value = await $fetch('/api/leadboard/listLeadboard')

const updateCurrentLeadboard = async (id, newData) => {
  try {
    await updateLeadboard(id, newData);
    leadboard.value = await $fetch("/api/leadboard/listLeadboard");
    
  } catch (error) {
    console.error("Error updating team:", error);
  }
};

const editLeadboard = async (id, points) => {
  const currentRecord = leadboard.value.find(record => record.driverID === id);
  
  if (!currentRecord) {
    console.error(`Leadboard záznam s ID ${id} nebyl nalezen`);
    return;
  }
  
  const newData = {
    ...currentRecord,
    points: points 
  };
  await updateCurrentLeadboard(id, newData);
};


async function raceEnd() {
  const pointsDistribution = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  const retryUpdate = async (updateFn, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await updateFn();
        return true;
      } catch (error) {
        console.error(`Update failed (attempt ${attempt}/${maxRetries}):`, error);
        if (attempt === maxRetries) throw error;
        await wait(500 * attempt); 
      }
    }
  };
  
  for (let i = 0; i < displayedLaptimes.value.length; i++) {
    const driver = displayedLaptimes.value[i];

    const currentDriver = drivers.value.find(d => d.ID === driver.id);
    
    if (!currentDriver) {
      console.error(`Driver ${driver.id} not found`);
      continue;
    }

    const currentTeam = teams.value.find(t => t.ID === currentDriver.currentteam);
    
    if (!currentTeam) {
      console.error(`Team for driver ${driver.id} not found`);
      continue;
    }
    
    console.log("Processing:", currentDriver.name, "Position:", i + 1, "DNF:", driver.dnf);
    
    if (!driver.dnf && i < 3) {
      if (i === 0) {
        await retryUpdate(async () => {
          const newWins = currentDriver.wins + 1;
          await updateDriver(driver.id, { wins: newWins });
          console.log("✅ Driver wins updated:", currentDriver.name, newWins);
        });
        
        await wait(500);
        
        await retryUpdate(async () => {
          const newTeamWins = currentTeam.historywins + 1;
          await updateTeam(currentTeam.ID, { historywins: newTeamWins });
          console.log("✅ Team wins updated:", currentTeam.name, newTeamWins);
        });
        
        await wait(500);
        
        await retryUpdate(async () => {
          await updateCalendar(currentCircuitPositionID, {
            winner: currentDriver.ID,
            winnerteam: currentTeam.ID
          });
          console.log("✅ Calendar winner updated");
        });
        
        await wait(500);
      }
      else if (i === 1) {
        await retryUpdate(async () => {
          await updateCalendar(currentCircuitPositionID, {
            secondplace: currentDriver.ID,
            secondteam: currentTeam.ID
          });
          console.log("✅ Calendar 2nd place updated");
        });
        await wait(500);
      }
      else if (i === 2) {
        await retryUpdate(async () => {
          await updateCalendar(currentCircuitPositionID, {
            thirdplace: currentDriver.ID,
            thirdteam: currentTeam.ID
          });
          console.log("✅ Calendar 3rd place updated");
        });
        await wait(500);
      }
      
      // Podium updates
      await retryUpdate(async () => {
        const newPodiums = currentDriver.podiums + 1;
        await updateDriver(driver.id, { podiums: newPodiums });
        console.log("✅ Driver podiums updated:", currentDriver.name, newPodiums);
      });
      
      await wait(500);
      
      await retryUpdate(async () => {
        const newTeamPodiums = currentTeam.historypodiums + 1;
        await updateTeam(currentTeam.ID, { historypodiums: newTeamPodiums });
        teams.value = await $fetch("/api/listTeam");
        console.log("✅ Team podiums updated:", currentTeam.name, newTeamPodiums);
      });
      
      await wait(500);
    }
    
    if (!driver.dnf && i < 10) {
      const pointsEarned = pointsDistribution[i];
      
      const freshLeadboard = await $fetch('/api/leadboard/listLeadboard');
      const currentLeadboard = freshLeadboard.find(l => l.driverID === driver.id);
      
      if (currentLeadboard) {
        await retryUpdate(async () => {
          const newPoints = currentLeadboard.points + pointsEarned;
          await updateLeadboard(driver.id, { ...currentLeadboard, points: newPoints });
          console.log(`✅ ${driver.name} gained ${pointsEarned} points (total: ${newPoints})`);
        });
        await wait(500);
      } else {
        console.error(`❌ Leadboard record for driver ${driver.id} not found`);
      }
    }
    
    await wait(750); 
  }
  
  await retryUpdate(async () => {
    await updateCalendar(currentCircuitPositionID, { raced: 1 });
    console.log("✅ Calendar marked as raced");
  });
  
  await wait(200);
  
  await retryUpdate(async () => {
    await upgradeLimit(1);
    console.log("✅ Limit upgraded");
  });
  
  leadboard.value = await $fetch('/api/leadboard/listLeadboard');

  drivers.value = await $fetch("/api/listDriver");
  
  isProcessingRaceEnd.value = false;
  console.log("🏁 Race end processing completed");
}

const { updateTeam } = useTeamsApi();
const { updateDriver } = useDriversApi();
const { updateCalendar } = useCalendarApi();

const upgradeLimit = async (newLimit) => {
  try {
    await $fetch("/api/manager/limit", {
      method: "PUT",
      body: {
        NumLimit: newLimit,
      },
    });
  } catch (error) {
    console.error("Error updating limit:", error);
  }
};
const updateTeamFunc = async (teamID, newData) => {
  try {
    await updateTeam(teamID, newData);
  } catch (error) {
    console.error("Error updating team:", error);
  }
};

const updateDriverFunc = async (driverID, newData) => {
  try {
    await updateDriver(driverID, newData);
  } catch (error) {
    console.error("Error updating team:", error);
  }
};

const updateCalendarFunc = async (calendarID, newData) => {
  try {
    await updateCalendar(calendarID, newData);
  } catch (error) {
    console.error("Error updating calendar:", error);
  }
};

onUnmounted(() => {
  clearInterval(timer)
  console.log('Timer cleared on unmount.')
})

const switchLayout = inject('switchLayout')

const switchToMenu = () => {
  if (isProcessingRaceEnd.value) {
    console.log('Nelze přejít do menu - probíhá ukládání výsledků závodu');
    return;
  }
  navigateTo('menu/menu')
} 
onMounted(() => {
  switchLayout('race') 
})
</script>

<style>

</style>