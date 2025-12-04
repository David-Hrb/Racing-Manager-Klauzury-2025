<template>
  <div class="drivercont">
    <div class="driverDiv currentDriver">
      <h2>Aktuální jezdec</h2>
      <div class="driver-fullinfo" v-if="currentdriver !== null">
        <img 
          :src="`/images/avatars/${giveavatar(drivers[currentdriver].avatar)}.svg`" 
          class="avatar" 
          alt="avatar" 
          style="width: 100px;"
        >
        <div class="drivername">Jméno: {{ drivers[currentdriver].name }}</div>
        <div class="driverflag">Národnost: <span class="fi" :class="`fi-${drivers[currentdriver].nationality}`" aria-hidden="true"></span> {{ drivers[currentdriver].nationality }}</div>
        <div class="bornyear">Datum Narození: {{ drivers[currentdriver].bornyear }} </div>
        <div class="currentyear">Aktuální tým: {{ drivers[currentdriver].currentteam == null ? "bez týmu" : teams.find(team => team.ID === drivers[currentdriver].currentteam)?.name }} </div>
        <div class="popularity">Popularita: {{ drivers[currentdriver].popularity }} </div>
        <div class="ego">Ego: {{ drivers[currentdriver].ego }} </div>
        <div class="contractexp">Kontrakt do: {{ drivers[currentdriver].contractexp == null ? "nemá" : drivers[currentdriver].contractexp }}</div>
        <div class="payedDriver">platící: {{ drivers[currentdriver].payeddriver === "false" ? "NE" : "ANO" }}</div>
        <div class="driverrating">
          <div 
            v-for="(star, index) in stars(drivers[currentdriver].concentration + drivers[currentdriver].overtaking + drivers[currentdriver].experience + drivers[currentdriver].quickness + drivers[currentdriver].stamina)"
            :key="index"
            class="css-star"
            :class="{
              'half-star': star === 'half',
              'empty': star === 'empty'
            }"
          ></div>
        </div>
        <div class="driverfullrating">
          <span>Koncentrace: {{drivers[currentdriver].concentration}} </span>
          <span>Předjíždění: {{ drivers[currentdriver].overtaking }}</span>
          <span>Zkušenosti: {{ drivers[currentdriver].experience }}</span>
          <span>Rychlost: {{ drivers[currentdriver].quickness }}</span>
          <span>Výdrž: {{ drivers[currentdriver].stamina }}</span>               
        </div>
        <button @click="openNegonation()">
          Jednat s jezdcem
        </button>
      </div>
      <div v-else>
        Klikněte na jezdce v seznamu vedle pro zobrazení detailů.
      </div>
    </div>
    <div class="driverDiv ListOfDrivers">
      <div class="header">
        <h2>Vyber si Jezdce</h2>
        <div class="filters-sort-container">
          <select v-model="sortBy" @change="sortDrivers" class="sort-select">
            <option value="">Řadit podle...</option>
            <option value="name">Jméno</option>
            <option value="bornyear">Věk</option>
            <option value="popularity">Popularita</option>
            <option value="ego">Ego</option>
            <option value="rating">Hodnocení</option>
            <option value="currentteam">Tým</option>
          </select>
          <button @click="toggleSortOrder" class="sort-order-btn" v-if="sortBy">
            {{ sortOrder === 'asc' ? '↑' : '↓' }}
          </button>
          
          <input 
            v-model="searchFilter" 
            type="text" 
            placeholder="Hledat jezdce..." 
            class="search-input"
          >
          
          <select v-model="teamFilter" class="filter-select">
            <option value="">Všechny týmy</option>
            <option value="null">Bez týmu</option>
            <option v-for="team in teams" :key="team.ID" :value="team.ID">
              {{ team.name }}
            </option>
          </select>
          
          <select v-model="payedFilter" class="filter-select">
            <option value="">Všichni jezdci</option>
            <option value="true">Platící</option>
            <option value="false">Neplatící</option>
          </select>
          
          <button @click="clearFilters" class="clear-filters-btn" v-if="hasActiveFilters">
            Vymazat filtry
          </button>
        </div>
      </div>
      <div class="ListOfDriversCont">
      
        <div class="info">
          <div class="header-avatar">Avatar</div>
          <div class="header-flag">Země</div>
          <div class="header-name">Jméno</div>  
          <div class="header-bornyear">Narozen</div>
          <div class="header-currentteam">Tým</div>
          <div class="header-popularity">Popularita</div>
          <div class="header-ego">Ego</div>
          <div class="header-contractexp">Konec smlouvy</div>
          <div class="header-payedDriver">platící</div>
          <div class="header-driverrating">Hodnocení</div>
        </div>
        <div class="allDriversList">
          <div 
            v-for="(driver, index) in filteredAndSortedDrivers"
            :key="index"
            class="driverInfo-cont"
            @click="currentdriver = driver.ID - 1"
          >  
            <img :src="`/images/avatars/${giveavatar(driver.avatar)}.svg`" class="avatar" alt="avatar" style="width: 40px;">
            <div class="driverflag">
              <span class="fi" :class="`fi-${driver.nationality}`" aria-hidden="true"></span> 
              {{ driver.nationality }}             
            </div>
            <div class="drivername">{{ driver.name }}</div>
            <div class="bornyear">{{ driver.bornyear }}  </div>
            <div class="currentyear">{{ driver.currentteam == null ? "bez týmu" : teams.find(team => team.ID === driver.currentteam)?.name }} </div>
            <div class="popularity">{{ driver.popularity }} </div>
            <div class="ego">{{ driver.ego }} </div>
            <div class="contractexp">{{ driver.contractexp == null ? "nemá" : driver.contractexp }}</div>
            <div class="payedDriver">{{ driver.payeddriver === "false" ? "NE" : "ANO" }}</div>
            <div class="driverrating">
              <div 
                v-for="(star, index) in stars(driver.concentration + driver.overtaking + driver.experience + driver.quickness + driver.stamina)"
                :key="index"
                class="css-star"
                :class="{
                  'half-star': star === 'half',
                  'empty': star === 'empty'
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="driver-negonation" v-if="negonation">
      <div class="driver-negonation-cont">
        <button class="settings-btn settings-close-btn" @click="closeNegonation()">
          <svg width="2rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve">
            <path fill="currentcolor" d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
          </svg>
        </button>
        <h2>Nabídněte podmínky smlouvy</h2>
        <h3>Jezdec podmínky nemusí přijmout</h3>
        <div class="negonation-inputs">
          <div class="negonation-input">
            <span>vyberte délku smlouvy:</span>
            <select name="years" id="years">
              <option @click="yearsOfContract = 1">1 rok</option>
              <option @click="yearsOfContract = 2">2 roky</option>
              <option @click="yearsOfContract = 3">3 roky</option>
              <option @click="yearsOfContract = 4">4 roky</option>
              <option @click="yearsOfContract = 5">5 roků</option>
            </select>
          </div>
          <div class="negonation-input">
            <span>nabídněte plat:</span>
            <div class="money">
              <button @click="currentSalaryIndex <= 0 ? currentSalaryIndex = 0 : currentSalaryIndex-=1">-</button>
              <div class="money-text">{{ (String(salaryPrices[currentSalaryIndex]).split(/(?=(?:\d{3})+(?!\d))/)).join(' ') }} €</div>
              <button @click="currentSalaryIndex >= salaryPrices.length - 1 ? currentSalaryIndex = salaryPrices.length - 1 : currentSalaryIndex+=1">+</button>
            </div>

          </div>
          <div class="negonation-input">
            <span>cena za výkup</span>
            {{ buyoutIdeal }}
          </div>
          <button style="padding: 1.5rem 3rem; " class="settings-btn driver-negonation-btn" @click="tryNegonation()">Potvrdit</button>

        </div>
      </div>
    </div>
    <div class="driver-negonation" v-if="driverAccepted">
      <div class="driver-negonation-cont">
        <h2>Jezdec přijal vaši nabídku.</h2>
        <h3>Vyberte jezdce, za kterého ho chcete nahradit.</h3>
        <div class="driversneg-container">
          <div class="drivers" v-for="drivers in teamAllDrivers" :key="drivers.ID">
            <div class="driver-info">
              <img 
                :src="`/images/avatars/${giveavatar(drivers.avatar)}.svg`" 
                class="avatar" 
                alt="avatar" 
                style="width: 100px;"
              >
              <div class="driverflag">Národnost: <span class="fi" :class="`fi-${drivers.nationality}`" aria-hidden="true"></span> {{ drivers.nationality }}</div>
              <span>Jmeno: {{ drivers.name }}</span>
              <span>Cena: {{ drivers.fee }}</span>
              <span>Pokud má jezdec body tak budou přepsány z nového jezdce!</span>
              <button class="driver-negonation-btn" @click="driverAcceptedOffer(drivers.ID)">Nahradit</button>

            </div>

          </div>     
        </div>
        <button class="driver-negonation-btn" @click="driverAccepted = false">zpět</button>
      </div>
    </div>
    <div class="driver-negonation" v-if="driverDeclined">
      <div class="driver-negonation-cont">
        Jezdec odmítl vaši nabídku.
        <button @click="driverDeclined = false">continue</button>
      </div>
    </div>
   </div>
</template>

<script setup>
import avatars from '~/assets/json/avatars.json'
const sound = useClickSound(); 
const sound2 = useClickSoundNext();
const { getRandomInteger } = UseInteger();
const { setupRace } = useRaceSetup();
const { updateLeadboard  } = useLeadBoardsApi();
const drivers = ref([]);
const teams = ref([]);
const manager = ref([]);
const leadboard = ref([]);
drivers.value = await $fetch("/api/listDriver");
teams.value = await $fetch("/api/listTeam");
manager.value = await $fetch("/api/manager/listManager");
leadboard.value = await $fetch('/api/leadboard/listLeadboard');

let currentteam = ref(manager.value[0].team);
let currentdriver = ref(null);
let salaryIdeal = ref(0);
let salaryPrices = ref([]);
let currentSalaryIndex = ref(0);
let wantToTeam = ref(false);
let buyoutIdeal = ref(0);
let driverAccepted = ref(false);
let driverDeclined = ref(false);
let negonation = ref(false);
let yearsOfContract = ref(1);

const sortBy = ref('');
const sortOrder = ref('asc');
const searchFilter = ref('');
const teamFilter = ref('');
const payedFilter = ref('');

const { teamAllDrivers } = setupRace({
  drivers: drivers.value,
  teams: teams.value,
  circuits: [],
  teamId: currentteam.value,
  circuitId: 0
});
console.log(teamAllDrivers);
console.log(drivers);

function giveavatar(num) {
  return avatars[num.toString()] 
}

function stars(rating) {
  rating = Math.floor(rating / 50) * 0.5;
  
  const stars = [];
  let remainingRating = rating;
  
  for (let i = 0; i < 5; i++) {
    if (remainingRating >= 1) {
      stars.push('full');
      remainingRating -= 1;
    } else if (remainingRating >= 0.5) {
      stars.push('half');
      remainingRating -= 0.5;
    } else {
      stars.push('empty');
    }
  }
  
  return stars;
}

function calculateRating(driver) {
  return driver.concentration + driver.overtaking + driver.experience + driver.quickness + driver.stamina;
}

const hasActiveFilters = computed(() => {
  return searchFilter.value || teamFilter.value || payedFilter.value || sortBy.value;
});

const closeNegonation = () => {
  negonation.value = false;
}

const openNegonation = () => {
  negonation.value = true;
  negonationLogic(drivers.value[currentdriver.value].ID);
}

function negonationLogic(driverID) {
  let negonationdriver = drivers.value.find(driver => driver.ID === driverID);
  let driverTeam = teams.value.find(team => team.ID === negonationdriver.currentteam);
  console.log(negonationdriver, "negonation driver");
  console.log(negonationdriver.currentteam, currentteam.value);
  let priceFactor = (negonationdriver.prmanagement + negonationdriver.ego) / 200;
  if(negonationdriver.currentteam == currentteam.value) return driverDeclined.value = true, negonation.value = false;
  if(negonationdriver.currentteam == null  || negonationdriver.currentteam == undefined) {
    console.log("driver without team or different team");
    wantToTeam.value = true;
  } else {
    buyoutIdeal.value = Math.floor((getRandomInteger(1000000, 5000000) * priceFactor) / 1000) * 1000;
    let wantToTeam = ref(false);
    console.log(teams.value[currentteam.value], "current team stats", teams.value[currentteam.value].aerodynamics, teams.value[currentteam.value].gearbox, teams.value[currentteam.value].brakes, teams.value[currentteam.value].rearwing, teams.value[currentteam.value].frontwing, teams.value[currentteam.value].reliability );
    console.log(driverTeam, "driver team stats", driverTeam.aerodynamics, driverTeam.gearbox, driverTeam.brakes, driverTeam.rearwing, driverTeam.frontwing, driverTeam.reliability);
    let currTeamStats = teams.value[currentteam.value].aerodynamics + teams.value[currentteam.value].gearbox + teams.value[currentteam.value].brakes + teams.value[currentteam.value].rearwing + teams.value[currentteam.value].frontwing + teams.value[currentteam.value].reliability ;
    let driverTeamStats = driverTeam.aerodynamics + driverTeam.gearbox + driverTeam.brakes + driverTeam.rearwing + driverTeam.frontwing + driverTeam.reliability ;
    console.log(currTeamStats, "current team stats");
    console.log(driverTeamStats, "driver team stats");
    let teamDifference =  currTeamStats - driverTeamStats;
    console.log(teamDifference, "team difference");
    if(teamDifference > -8) {
      wantToTeam.value = true;
    } else {
      wantToTeam.value = false;
      return driverDeclined.value = true, negonation.value = false;
    }
  }
  salaryIdeal.value = Math.floor((getRandomInteger(500000, 2000000) * priceFactor) / 1000) * 10000;
  salaryPrices.value = [
    Math.round(salaryIdeal.value / 1.4),
    Math.round(salaryIdeal.value / 1.3),
    Math.round(salaryIdeal.value / 1.2),
    Math.round(salaryIdeal.value / 1.1),
    salaryIdeal.value,
    Math.round(salaryIdeal.value * 1.1),
    Math.round(salaryIdeal.value * 1.2),
    Math.round(salaryIdeal.value * 1.3),
    Math.round(salaryIdeal.value * 1.4)
  ];
  console.log(salaryIdeal.value, salaryPrices.value);
}

function tryNegonation() {
  console.log(currentSalaryIndex.value, "current salary index");
  let offeredSalary = salaryPrices.value[currentSalaryIndex.value];
  console.log("offered salary:", offeredSalary, "ideal salary:", salaryIdeal.value, "wants to team:", wantToTeam.value);
  if(offeredSalary >= salaryIdeal.value) {
    driverAccepted.value = true;
    negonation.value = false;
    console.log("driver accepted the offer");  
  } else {
    driverDeclined.value = true;
    negonation.value = false;
    console.log("driver declined the offer");
  }
}

function driverAcceptedOffer(replaceDriverID) {
  //
  console.log("replacing driver ID:", replaceDriverID);
  let newTeamID = currentteam.value;
  let TeamWithoutDriverTeamID = drivers.value[currentdriver.value].currentteam;
  

  let changeDriverID = drivers.value[currentdriver.value].ID; 
  let replaceDriver = drivers.value.find(driver => driver.ID === replaceDriverID);

  let teamWithoutDriver = teams.value.find(t => t.ID === TeamWithoutDriverTeamID);
  let team = teams.value.find(t => t.ID === replaceDriver.currentteam);
  let contractExp = manager.value[0].season + yearsOfContract.value;

  const driverFields = ['driver1', 'driver2', 'testdriver'];
  let driverPosition = driverFields.findIndex(field => team[field] === replaceDriverID)
 
  if(TeamWithoutDriverTeamID == null) {
      const fieldToUpdate = driverFields[driverPosition];  
      const updatedTeamData = { [fieldToUpdate]: changeDriverID, money: team.money - (salaryPrices.value[currentSalaryIndex.value] + replaceDriver.fee) };  
      const pointsToTransfer = leadboard.value.find(entry => entry.driverID === replaceDriverID)?.points || 0;
      const newPointsForChangedDriver = (leadboard.value.find(entry => entry.driverID === changeDriverID)?.points || 0);
      console.log(pointsToTransfer, "points to transfer", newPointsForChangedDriver , "new points for changed driver");
      editLeadboard(changeDriverID, pointsToTransfer);
      editLeadboard(replaceDriverID, newPointsForChangedDriver);
      updateTeamFunc(newTeamID, updatedTeamData);
      updateDriverFunc(changeDriverID, {
        currentteam: newTeamID,
        contractexp: contractExp
      });
      updateDriverFunc(replaceDriverID, {
        currentteam: null,
        contractexp: null
      });
      console.log(TeamWithoutDriverTeamID, "TeamWithoutDriverTeamID");
      console.log(currentteam.value, "current team ID");
      console.log(changeDriverID, "change driver ID");
      console.log(replaceDriverID, "replace driver ID");
      console.log(driverPosition, "driver position in team");
    return driverAccepted.value = false;
  }
 
  let currentDriverPosition = driverFields.findIndex(field => teamWithoutDriver[field] === changeDriverID)
  let newDriverID = findNewDriver(teamWithoutDriver);
  let newDriver = drivers.value.find(driver => driver.ID === newDriverID);
  let newDriverFee = Math.floor((newDriver.concentration + newDriver.overtaking + newDriver.experience + newDriver.quickness + newDriver.stamina) / 5 * 10000);
  console.log(TeamWithoutDriverTeamID, "TeamWithoutDriverTeamID");
  console.log(currentteam.value, "current team ID");
  console.log(changeDriverID, "change driver ID");
  console.log(replaceDriverID, "replace driver ID");
  console.log(driverPosition, "driver position in team");
  console.log(newDriverID, "new driver ID to fill the empty spot");
  console.log(newDriverFee, "new driver fee");
  

  if(newDriverID !== null) {
    if (driverPosition !== -1) {
      const fieldToUpdate = driverFields[driverPosition];
      const currentDriverFieldToUpdate = driverFields[currentDriverPosition];
      console.log({ [fieldToUpdate]: changeDriverID }, "field to update in team");
      console.log({ [currentDriverFieldToUpdate]: newDriverID }, "current driver field to update in team");
      const updatedTeamData = { [fieldToUpdate]: changeDriverID, money: team.money - (salaryPrices.value[currentSalaryIndex.value] + replaceDriver.fee) };
      const currentTeamData = { [currentDriverFieldToUpdate]: newDriverID };

      const pointsToTransfer = leadboard.value.find(entry => entry.driverid === replaceDriverID)?.points || 0;
      const newPointsForChangedDriver = (leadboard.value.find(entry => entry.driverid === changeDriverID)?.points || 0);
      editLeadboard(changeDriverID, pointsToTransfer);
      editLeadboard(newDriverID, newPointsForChangedDriver);
      updateTeamFunc(newTeamID, updatedTeamData);
      updateTeamFunc(TeamWithoutDriverTeamID, currentTeamData);
      updateDriverFunc(changeDriverID, {
        currentteam: newTeamID,
        contractexp: contractExp
      });
      updateDriverFunc(replaceDriverID, {
        currentteam: null,
        contractexp: null
      });
      updateDriverFunc(newDriverID, {
        currentteam: TeamWithoutDriverTeamID,
        contractexp: manager.value[0].season + getRandomInteger(1, 4),
        fee: newDriverFee
      });
    } else {
      alert("Chyba při nalezení pozice jezdce v týmu.");
    }
  } else {
    alert("Není dostupný žádný vhodný jezdec na nahrazení.");
  }
  driverAccepted.value = false;
}

const editLeadboard = async (id, points) => {
  const newData = {
    ...leadboard.value[id],
    points: points 
  };
  await updateCurrentLeadboard(id, newData);
};

const updateCurrentLeadboard = async (id, newData) => {
  try {
    await updateLeadboard(id, newData);
    leadboard.value = await $fetch("/api/leadboard/listLeadboard");
    
  } catch (error) {
    console.error("Error updating team:", error);
  }
};
function findNewDriver(teamWithoutDriver) {
  let availableDrivers = drivers.value.filter(driver => driver.currentteam == null);
  console.log(availableDrivers, "available drivers");
  console.log(teamWithoutDriver, "team without driver");
  console.log(teamWithoutDriver.aerodynamics, teamWithoutDriver.gearbox, teamWithoutDriver.brakes, teamWithoutDriver.rearwing, teamWithoutDriver.frontwing, teamWithoutDriver.reliability );
  if(availableDrivers.length > 0) {
    let randomIndex = getRandomInteger(0, availableDrivers.length - 1);
    let newDriver = drivers.value.find(driver => driver.ID === availableDrivers[randomIndex].ID);
    let teamStats = teamWithoutDriver.aerodynamics + teamWithoutDriver.gearbox + teamWithoutDriver.brakes + teamWithoutDriver.rearwing + teamWithoutDriver.frontwing + teamWithoutDriver.reliability;
    let driverStats = newDriver.concentration + newDriver.overtaking + newDriver.experience + newDriver.quickness + newDriver.stamina;
    if(driverStats >= (teamStats / 6) * 5) {
      console.log("found suitable new driver:", newDriver);
      return newDriver.ID;
    } else {
      return findNewDriver(teamWithoutDriver);
    }
  } else {
    return null;
  }
}
const { updateTeam } = useTeamsApi();
const { updateDriver } = useDriversApi();
const updateTeamFunc = async (teamID, newData) => {
  try {
    await updateTeam(teamID, newData);
    teams.value = await $fetch("/api/listTeam");
  } catch (error) {
    console.error("Error updating team:", error);
  }
};

const updateDriverFunc = async (driverID, newData) => {
  try {
    await updateDriver(driverID, newData);
    drivers.value = await $fetch("/api/listDriver");
  } catch (error) {
    console.error("Error updating team:", error);
  }
};

// Filtering and sorting logic
const filteredAndSortedDrivers = computed(() => {
  let result = [...drivers.value];
  
  if (searchFilter.value) {
    const search = searchFilter.value.toLowerCase();
    result = result.filter(driver => 
      driver.name.toLowerCase().includes(search) ||
      driver.nationality.toLowerCase().includes(search)
    );
  }
  
  if (teamFilter.value) {
    if (teamFilter.value === 'null') {
      result = result.filter(driver => driver.currentteam == null);
    } else {
      result = result.filter(driver => driver.currentteam === parseInt(teamFilter.value));
    }
  }
  
  if (payedFilter.value) {
    result = result.filter(driver => driver.payeddriver === payedFilter.value);
  }
  
  if (sortBy.value) {
    result.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortBy.value) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'bornyear':
          aVal = a.bornyear;
          bVal = b.bornyear;
          break;
        case 'popularity':
          aVal = a.popularity;
          bVal = b.popularity;
          break;
        case 'ego':
          aVal = a.ego;
          bVal = b.ego;
          break;
        case 'rating':
          aVal = calculateRating(a);
          bVal = calculateRating(b);
          break;
        case 'currentteam':
          aVal = a.currentteam == null ? '' : teams.value.find(team => team.ID === a.currentteam)?.name || '';
          bVal = b.currentteam == null ? '' : teams.value.find(team => team.ID === b.currentteam)?.name || '';
          break;
        default:
          return 0;
      }
      
      if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  return result;
});
function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
}
function clearFilters() {
  searchFilter.value = '';
  teamFilter.value = '';
  payedFilter.value = '';
  sortBy.value = '';
}
definePageMeta({ layout: 'menu' }) 

const switchLayout = inject('switchLayout')

onMounted(() => {
  switchLayout('menu') 
})
</script>

<style scoped>
</style>