<template>
  <div class="container">
    <div class="parent">
      <!-- DIV 1 - Tabulka s pořadím -->
      <div class="div1 table-section">
        <h2 class="table-title">Pořadí Kvalifikace</h2>
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
                <span class="driver-name">{{ driver.name }}</span>
              </div>
              <div class="team-line">
                <span class="fi" :class="`fi-${driver.teamnationality}`" aria-hidden="true"></span>
                <span class="team-name">{{ driver.teamname }}</span>
              </div>
            </div>
            <div class="laptime-info">
              <span class="bestlap">{{ laptimecounter(driver.bestTime) }}</span>
              <span class="laptime">{{ driver.laptime }}</span>
              
            </div>
          </div>
        </div>
      </div>

      <!-- DIV 2 - Jezdci na trati -->
      <div class="div2 table-section">
        <h2 class="table-title">Jezdci na trati</h2>
        <div class="table">
          <div 
            v-for="(driver, index) in activeDrivers" 
            class="active-driver-row"
          >
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
              {{ givetimeontrack(driver.num) }}
              {{ whereontack(driver.num)}}
              
            </div>
          </div>
        </div>
      </div>

      <!-- driver 1 -->
      <div class="div3 driver1 grid-box">
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
            
            <div class="kvalborn ">poslední čas: {{ givecurrentlap(0) }}</div>
            <div class="kvalborn ">nejlepší čas: {{ currentbestlap(0) }}</div>
            <div class="kvalplace ">pořadí: {{ givecurrentposition(0) }}</div>
          </div>
          <button @click="sentdriver(0)" class="letout-button">Vyjet</button>
        </div>
      </div>

      <!-- DIV 4 -->
      <div class="div4 driver1 grid-box">
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
            
            <div class="kvalborn ">poslední čas: {{ givecurrentlap(1) }}</div>
            <div class="kvalborn ">nejlepší čas: {{ currentbestlap(1) }}</div>
            <div class="kvalplace">aktuální pořadí: {{ givecurrentposition(1)}}</div>
          </div>
          <button @click="sentdriver(1)" class="letout-button">Vyjet</button>
        </div>
      </div>

      <!-- DIV 5 -->
      <div class="div5 grid-box circuit-info">
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

      <!-- DIV 6 -->
      <div class="div6 timer grid-box">
         <div class="countdown">
          <div class="time-box">
            <span class="number">{{ formattedMinutes }}</span>
            :
            <span class="number">{{ formattedSeconds }}</span>
            :
            <span class="number">{{ formattedMilliseconds }}</span>
            
          </div>
        </div>
        <div class="controls">
          <button 
            class="play-stop-btn" 
            @click="toggleTimer"
            :class="{ 'is-playing': isRunning }"
          >
            <div class="play-icon" v-if="!isRunning"></div>
            <div class="stop-icon" v-else></div>
          </button>
          <button  @click="changefastness(25)" class="speed-button">
            3X
          </button>
          <button @click="changefastness(50)" class="speed-button">
            2X
          </button>
          <button @click="changefastness(100)" class="speed-button">
            1X
          </button>
          <button @click="changefastness(200)" class="speed-button">
            0.5X
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="pos-absolute" v-if="kvalended">
    <div class="pos-absolute-inside">
      <h1>KVAL RESULT</h1>
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
            <span class="bestlap">{{ laptimecounter(driver.bestTime) }}</span>       
          </div>
        </div>
        <button @click="switchToRace" class="close-button">POKRAČOVAT</button>
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



let drivers = ref([]);
let teams = ref([]);
let circuits = ref([]); 
let manager = ref([]);

drivers.value = await $fetch("/api/listDriver");
teams.value = await $fetch("/api/listTeam");
circuits.value = await $fetch("/api/listCircuit");
manager.value = await $fetch("/api/manager/listManager");

let currentteam = manager.value[0].team;;
const { currentcircuit } = await useGetNextRace()

const { teamDrivers, currentTeamInfo, currentCircuitInfo, isValid } = setupRace({
  drivers: drivers.value,
  teams: teams.value,
  circuits: circuits.value,
  teamId: currentteam,
  circuitId: currentcircuit
});

// Převod na ref pro reaktivitu v template
let teamdrivers = ref(teamDrivers);
console.log(teamDrivers);
let currentcircuitinfo = ref(currentCircuitInfo ? [currentCircuitInfo] : []);

let bestlapdriver1 = ref(1000);
let bestlapdriver2 = ref(1000);

let cardriverinfo = ref([])
let driverslap = ref({});
let driverslastlap = ref({});
let driversdeg = ref({});
let driversinlap = ref({});
let driverscurrtyre = ref({})
let driver1laps = [];
let driver2laps = [];
let timeontrack = ref({});
let kvalended = ref(false);
const { displayedLaptimes } = useKvalification()
function giveavatar(num) {
  return avatars[num.toString()] 
}
function givetimeontrack(num) {
  if(isNaN(timeontrack.value[num])) {
    return "trať";
  }
  return timeontrack.value[num];
}

function currentbestlap(num) {
  switch(num) {
    case 0:
      if(bestlapdriver1.value > 999) {
        return "Bez Času"
      } 
      return laptimecounter(bestlapdriver1.value);
    case 1:
      if(bestlapdriver2.value > 999) {
        return "Bez Času"
      } 
      return laptimecounter(bestlapdriver2.value);
    default:
      return "ERROR"
  }
}


function drivernum(num) {
  for (let i = 0; i < cardriverinfo.value.length; i++) {
        if (teamdrivers.value[num].ID == cardriverinfo.value[i].id) {
          return cardriverinfo.value[i].num
        }
    }
}

function sentdriver(driver) {
  if (driver == 0) {
    if (driversinlap.value[currdrivernum0] == 0) {
      const randomtime = getRandomInteger(0, 100);
      timeontrack.value[currdrivernum0] = currentcircuitinfo.value[0].normallaptime + randomtime/100; 
      drivertolap(currdrivernum0);
    } else {
      driveroutlap(currdrivernum0);
    }
    
  } else {
    if (driversinlap.value[currdrivernum1] == 0) {
      const randomtime = getRandomInteger(0, 100);
      timeontrack.value[currdrivernum1] = currentcircuitinfo.value[0].normallaptime + randomtime/100; 
      drivertolap(currdrivernum1);
    } else {
      driveroutlap(currdrivernum1); 
    }
  }
}

function givecurrentlap(num) {
  if (num === 0) {
    if(driver1laps.length > 0) {
      return laptimecounter(driver1laps[driver1laps.length -1]); 
    } else {
      return "Bez Času" 
    }
    //return offtrack(currdrivernum0);
  } else {
    if(driver2laps.length > 0) {
      return laptimecounter(driver2laps[driver2laps.length -1]); 
    } else {
      return "Bez Času" 
    }
   // return offtrack(currdrivernum1);
  }
}



function givecurrentposition(num) {
  try {
    for (let i = 0; i < cardriverinfo.value.length; i++) {
        if (teamdrivers.value[num].ID == cardriverinfo.value[i].id) {
          for(let j = 0; j < displayedLaptimes.value.length; j++) {
            if(displayedLaptimes.value[j].num == cardriverinfo.value[i].num) {       
              return displayedLaptimes.value[j].position;
            } 
          }      
        }
    } 
  } catch (error) { 
    return "NULL";
  }
    return "NULL";
}

function laptimecounter(num) {
  if(num > 999) {
    return "Žádný Čas"
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

function countlaptime(basetime, racestart, concentration, overtaking, experience, quickness, stamina, aerodynamics, gearbox, brakes ,rearwing, frontwing, reliability, turns, drszones, degradation, num) {
  const stats = {
      quickness,
      concentration,
      stamina,
      turns,
      aerodynamics,
      frontwing,
      brakes,
      drszones,
      gearbox,
      rearwing,
      degradation,
      experience,
      basetime,
      tyretype: 0
    }
  let result = calculateLapTime(stats);  
  let laptime = result.laptime;   
  if(laptime < driverslap.value[num]) {
    driverslap.value[num] = laptime;
  }
  driverslastlap.value[num] = laptime;
  //console.log("basespeed: ", basespeed , "cornerspeed", cornerspeed, "straightspeed", straightspeed, "mistakmult", mistakemultiplier, "mistake", mistake,"pneudegrad", pneudegradation/100, "laptime", laptime );
  if(driverslap.value[num] < 999) {
    return laptimecounter(driverslastlap.value[num]) 
  } else {
    return laptimecounter(driverslastlap.value[num]) 
  }
}

function offtrack(num) {
  if(driverslap.value[num] < 999) {
    return laptimecounter(driverslastlap.value[num]) 
  } else {
    return "Bez Času" 
  }
}

function whereontack(num){
  //console.log(num)
  let tracknum = driversinlap.value[num]
  switch(tracknum){
    case 1: 
      return "outlap"
    case 2:
      return "hotlap"
    case 3:
      //console.log(driverslastlap.value[num], "kolo")
      return laptimecounter(driverslastlap.value[num]) + " - inlap"
    default:
      return "není na trati"
  }
}

// ------------------------------ LOADĚNÍ DO PROMĚNNÝCH PŘI ZAPNUTÍ ------------------------------

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
        "num": i,
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
        "num": i+10,
        "id": drivers.value[teams.value[i].driver2 - 1].ID
      });
      driverslap.value[i] = 1000;
      driverslap.value[i + 10] = 1000;
      driversdeg.value[i] = 0;
      driversdeg.value[i + 10] = 0;
      driversinlap.value[i] = 0;
      driversinlap.value[i + 10] = 0;
      driverscurrtyre.value[i] = 0;
      driverscurrtyre.value[i + 10] = 0;
      driverslastlap.value[i] = 1000;
      driverslastlap.value[i + 10] = 1000;
      timeontrack.value[i] = 0;
      timeontrack.value[i + 10] = 0;
    }
  }
loaddriver()


console.log(cardriverinfo)


// ------------------------------ UPDATE ČASŮ ------------------------------
function updateDriverLaptime(driverNum) {
  const driver = cardriverinfo.value.find(d => d.num === driverNum);
  if (!driver) return;
  
  const driverState = driversinlap.value[driver.num];
  let laptime;
  
  switch(driverState) {      
    case 2: 
      laptime = laptimecounter(driverslastlap.value[driver.num]);
      break;
    case 3:
      laptime = laptimecounter(driverslastlap.value[driver.num]);
      if(driver.num == currdrivernum0 ) {
        if(!driver1laps.includes(driverslastlap.value[driver.num])) {
          driver1laps.push(driverslastlap.value[driver.num]);
        }
      }
      if(driver.num == currdrivernum1 ) {
        if(!driver2laps.includes(driverslastlap.value[driver.num])) {
          driver2laps.push(driverslastlap.value[driver.num]);
        }
      }
      break;
      
    default:    
      laptime = offtrack(driver.num);
  }
  
  // Najdi existující záznam nebo vytvoř nový
  const existingIndex = displayedLaptimes.value.findIndex(d => d.num === driverNum);
  const updatedDriver = {
    id: driver.id,
    num: driver.num,
    teamname: driver.teamname,
    nationality: driver.nationality,
    name: driver.name,
    avatar: driver.avatar,
    teamnationality: driver.teamnationality,
    laptime: laptime,
    bestTime: driverslap.value[driver.num],
    currenttyre: 0
  };
  
  if (existingIndex !== -1) {
    displayedLaptimes.value[existingIndex] = updatedDriver;
  } else {
    displayedLaptimes.value.push(updatedDriver);
  }

  displayedLaptimes.value = displayedLaptimes.value
    .sort((a, b) => {
      if (a.bestTime >= 1000 && b.bestTime >= 1000) return 0;
      if (a.bestTime >= 1000) return 1;
      if (b.bestTime >= 1000) return -1;
      return a.bestTime - b.bestTime;
    })
    .map((driver, index) => ({
      ...driver,
      position: index + 1  
    }));
}
const activeDrivers = computed(() => {
  return cardriverinfo.value.filter((driver, index) => {
    return driversinlap.value[driver.num] > 0;
  });
});

// ------------------------------ SWITCHOVÁNÍ AKCE JEZDCŮ NA TRATI ------------------------------

function drivertolap(i) {
  driversinlap.value[i] = 1;
}

function driverinlap(i) {
  driversinlap.value[i] = 2;
}

function driveroutlap(i) {
  driversinlap.value[i] = 3;
}

function drivertopit(i) {
  driversinlap.value[i] = 0;
}

let intervalId; //vytvoří interval
let skip1 = null;
let skip2 = null;

// ------------------------------ PO NAČTENÍ JEZDCI NA TRAŤ (KROMĚ JEZDCŮ KTERÉ OVLÁDÁ HRÁČ) ------------------------------
onMounted(() => {
  for(let i=0;i < 20; i++) {
    drivertopit(i)
  }
  skip1 = teamdrivercheck(0);
  skip2 = teamdrivercheck(1);
  console.log("skip1", skip1, "skip2", skip2);
  
  function teamdrivercheck(num) {
    let number = 0;
    for (let i = 0; i < 20; i++) {
        if (teamdrivers.value[num].ID == cardriverinfo.value[i].id) {
          number = cardriverinfo.value[i].num       
          return number;    
        }
    }
    return "nic";
  }
  
  let driversontrack = 20;
  for(let i=0;i < driversontrack; i++) {
    let shouldSkip = false;
    if(i == skip1 || i == skip2) {
      shouldSkip = true;
    }
    if (!shouldSkip) {
      drivertolap(i);
      const randomtime = getRandomInteger(0, 100);
      timeontrack.value[i] = Math.round((currentcircuitinfo.value[0].normallaptime + randomtime/100) * 10) / 10;
    }
    updateDriverLaptime(i)
  }
  console.log("initial drivers on track", timeontrack);
  startIntervalLoop();
});


console.log(teamdrivers, "teamdrivers", cardriverinfo, "cardriverinfo", activeDrivers, "activeDrivers", displayedLaptimes, "displayedLaptimes");


onUnmounted(() => {
  clearInterval(intervalId);
});


// ------------------------------ INTERVAL KTERÝ POSÍLÁ JEZDCE NA TRAŤ, POKUD TAM JIŽ NEJSOU ------------------------------
function startIntervalLoop() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  
  intervalId = setInterval(() => {
    let driversontrack = getRandomInteger(1, 5);
    for(let i=0; i < driversontrack; i++) {
      const randomnum = getRandomInteger(0, 19);
      //console.log("randomnum", randomnum);       
      if(driversinlap.value[randomnum] == 0){
        let shouldSkip = false;
        
        if(randomnum == skip1 || randomnum == skip2) {
          shouldSkip = true;
        }
        if (!shouldSkip) {
          drivertolap(randomnum);
          const randomtime = getRandomInteger(0, 100);
          timeontrack.value[randomnum] = Math.round((currentcircuitinfo.value[0].normallaptime + randomtime/100) * 10) / 10;
        }
      }
      
    }
  }, timefastness.value * 200);
}


// ------------------------------ TIMER, ODČÍTÁNÍ ČASU, POČÍTÁNÍ ČASU JEZDCŮ, OVLÁDÁ POZICE JEZDCŮ NA TRATI, VOLÁ PO AKTUALIZACI ČASŮ ------------------------------

const totalSeconds = ref(600) 
const milliseconds = ref(0)
const isRunning = ref(false)
let timer = null
let timefastness = ref(100);

function changefastness(value) {
  timefastness.value = value;
  console.log(timefastness, "timefastness");
  if (isRunning.value) {
    clearInterval(timer);
    timer = setInterval(countdown, timefastness.value);
  }
}

const formattedMinutes = computed(() => {
  return String(Math.floor(totalSeconds.value / 60)).padStart(2, '0')
})

const formattedSeconds = computed(() => {
  return String(totalSeconds.value % 60).padStart(2, '0')
})

const formattedMilliseconds = computed(() => {
  return String(milliseconds.value).padStart(1, '0')
})

const countdown = () => {
  if (totalSeconds.value > 0 || milliseconds.value > 0) {
    milliseconds.value--
    
    if (milliseconds.value < 0) {
      milliseconds.value = 9
      totalSeconds.value--
    }
    for (let i=0; i<20; i++) {
      let driverNum = cardriverinfo.value[i].num;
      
      if (timeontrack.value[driverNum] > 0) {
        timeontrack.value[driverNum] -= 0.1;
        timeontrack.value[driverNum] = Math.round(timeontrack.value[driverNum] * 10) / 10;
        
      } else {
        let state = driversinlap.value[driverNum];
        switch (state) {
          case 1:
            driverinlap(driverNum);
            //console.log(driverslastlap.value[driverNum], "driverlastlap + number", driverNum);
            let driver = cardriverinfo.value.find(d => d.num === driverNum);
            countlaptime(
              driver.normallaptime, driver.racestart, driver.concentration,
              driver.overtaking, driver.experience, driver.quickness,
              driver.stamina, driver.aerodynamics, driver.gearbox,
              driver.brakes, driver.rearwing, driver.frontwing,
              driver.reliability, driver.numberofturns, driver.DRSzones,
              driver.pneudeg, driver.num
            );
            timeontrack.value[driverNum] = driverslastlap.value[driverNum];
            break;
          case 2:
            driveroutlap(driverNum);
            if (driverNum === skip1 || driverNum === skip2) {
              console.log(driverNum);
              
              if (driverNum === currdrivernum0) {
                console.log("true", driverNum, cardriverinfo.value[driverNum].name, cardriverinfo.value[driverNum].num, currdrivernum0);
                if(driverslastlap.value[driverNum] < bestlapdriver1.value) {
                  bestlapdriver1.value = driverslastlap.value[currdrivernum0];
                }
              }
              
              if (driverNum === currdrivernum1) {
                console.log("true", driverNum, cardriverinfo.value[driverNum].name, cardriverinfo.value[driverNum].num, currdrivernum1);
                if(driverslastlap.value[driverNum] < bestlapdriver2.value) {
                  bestlapdriver2.value = driverslastlap.value[currdrivernum1];
                }
              }
            }
            
            updateDriverLaptime(driverNum);
            const randomtime = getRandomInteger(0, 100);
            timeontrack.value[driverNum] = currentcircuitinfo.value[0].normallaptime + randomtime/100; 
            break;
          default:
            drivertopit(driverNum);
            timeontrack.value[driverNum] = 0;
        }
      }
    }
  } else {
    clearInterval(timer)
    clearInterval(intervalId)
    intervalId = null
    for(let i=0; i<20; i++) {
      drivertopit(i)  
      timeontrack.value[i] = 0;
    }
    isRunning.value = false
    kvalended.value = true
  }
}

const toggleTimer = () => {
  if (!isRunning.value) {
    if (totalSeconds.value > 0 || milliseconds.value > 0) {
      isRunning.value = true
      timer = setInterval(countdown, timefastness.value)
      startIntervalLoop() 
    }
  } else {
    clearInterval(timer)
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    isRunning.value = false
  }
}

onUnmounted(() => {
  clearInterval(timer)
})

const switchLayout = inject('switchLayout')

onMounted(() => {
  switchLayout('kvalification') 
})
const switchToRace = () => {
  navigateTo('race')
} 

const currdrivernum0 = drivernum(0);
const currdrivernum1 = drivernum(1);
console.log(currdrivernum0, "currdrivernum0", currdrivernum1, "currdrivernum1")

//console.log(cardriverinfo) 
//countlaptime(currentcircuitinfo.value[0].normallaptime, drivers.value[0].racestart, drivers.value[0].concentration, drivers.value[0].overtaking, drivers.value[0].experience, drivers.value[0].quickness, drivers.value[0].stamina, curentteams.value[0].aerodynamics, curentteams.value[0].gearbox, curentteams.value[0].brakes, curentteams.value[0].rearwing, curentteams.value[0].frontwing, curentteams.value[0].reliability, currentcircuitinfo.value[0].numberofturns, currentcircuitinfo.value[0].DRSzones)
</script>