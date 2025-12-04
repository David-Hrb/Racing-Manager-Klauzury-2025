<template>
  <div class="maincont">
    <div class="upgrade-header">
      <h2>Vylepšete svoje auto</h2>
      <div class="upgrade-subtitle">
        <p>Vaše peníze: {{ (String(team.money).split(/(?=(?:\d{3})+(?!\d))/)).join(' ')}} €</p>
      </div>
      <div class="upgrade-info">
        <h3>Aktuální úroveň vylepšení:</h3>
        <div class="upgrade-levels">
          <p>Aerodynamika: {{ team.aerodynamics }}</p>
          <p>Převodovka: {{ team.gearbox }}</p>
          <p>Brzdy: {{ team.brakes }}</p>
          <p>Přední křídlo: {{ team.frontwing }}</p>
          <p>Zadní křídlo: {{ team.rearwing }}</p>
          <p>Spolehlivost: {{ team.reliability }}</p>
        </div>
      </div>
    </div>

    <div v-if="limit > 0" class="upgrade-buttons">
      <button @click="openUpgrade(0)" class="aerodynamics">Aerodynamika</button>
      <button @click="openUpgrade(1)" class="gearbox">Převodovka</button>
      <button @click="openUpgrade(2)" class="brakes">Brzdy</button>
      <button @click="openUpgrade(3)" class="frontwing">Přední křídlo</button>
      <button @click="openUpgrade(4)" class="rearwing">Zadní křídlo</button>
      <button @click="openUpgrade(5)" class="reliability">Spolehlivost</button>
    </div>

    <div v-else class="no-upgrades">
      <h3>Nemáte povoleny žádné upgrady do dalšího závodu.</h3>
    </div>

    <div v-if="upgradeChooser" class="upgrade-choose">
      <div class="upgrade-choose-cont">
        <button class="settings-btn settings-close-btn" @click="closeUpgrade()">
          <svg width="2rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve">
            <path fill="currentcolor" d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
          </svg>
        </button>
        
        <div class="upgrade-limit">
          <h2 class="upgrade-title">Vylepšení pro {{ 
            upgradenum === 0 ? "Aerodynamiku" : 
            upgradenum === 1 ? "Převodovku" : 
            upgradenum === 2 ? "Brzdy" : 
            upgradenum === 3 ? "Přední křídlo" : 
            upgradenum === 4 ? "Zadní křídlo" : 
            upgradenum === 5 ? "Spolehlivost" :
            "vylepšení"
          }}</h2>
          
          <div class="upgrade-subtitle-info">
            <p>Počet povolených vylepšení: <strong>{{ limit }}</strong></p>
          </div>

          <h3 class="choose-title">Vyberte úroveň rizika</h3>
          
          <div class="upgrade-choose-buttons">
            <div 
              class="choose-card" 
              :class="{ 'active': risklevel === 0 }"
              @click="risklevel = 0; sound2.play()"
            >
              <div class="card-header low-risk">
                <h4>Malý Risk</h4>
              </div>
              <div class="card-body">
                <div class="risk-info">
                  <span class="risk-label">Šance neúspěchu:</span>
                  <span class="risk-value">20%</span>
                </div>
                <div class="price-info">
                  <span class="price-label">Dodatečná cena:</span>
                  <span class="price-value">0 €</span>
                </div>
                <div class="upgrade-info">
                  <span class="upgrade-label">Posun ve vylepšení:</span>
                  <span class="upgrade-value">+ 0.5</span>
                </div>
              </div>
            </div>

            <div 
              class="choose-card" 
              :class="{ 'active': risklevel === 1 }"
              @click="risklevel = 1; sound2.play()"
            >
              <div class="card-header medium-risk">
                <h4>Střední Risk</h4>
              </div>
              <div class="card-body">
                <div class="risk-info">
                  <span class="risk-label">Šance neúspěchu:</span>
                  <span class="risk-value">50%</span>
                </div>
                <div class="price-info">
                  <span class="price-label">Dodatečná cena:</span>
                  <span class="price-value">500 000 €</span>
                </div>
                <div class="upgrade-info">
                  <span class="upgrade-label">Posun ve vylepšení:</span>
                  <span class="upgrade-value">+ 1</span>
                </div>
              </div>
            </div>

            <div 
              class="choose-card" 
              :class="{ 'active': risklevel === 2 }"
              @click="risklevel = 2; sound2.play()"
            >
              <div class="card-header high-risk">
                <h4>Vysoký Risk</h4>
              </div>
              <div class="card-body">
                <div class="risk-info">
                  <span class="risk-label">Šance neúspěchu:</span>
                  <span class="risk-value">80%</span>
                </div>
                <div class="price-info">
                  <span class="price-label">Dodatečná cena:</span>
                  <span class="price-value">1 000 000 €</span>
                </div>
                <div class="upgrade-info">
                  <span class="upgrade-label">Posun ve vylepšení:</span>
                  <span class="upgrade-value">+ 2</span>
                </div>
              </div>
            </div>
          </div>

          <div class="price-summary">
            <div class="summary-row">
              <span class="summary-label">Cena za {{ risklevel === 0 ? "Malý risk" : risklevel === 1 ? "Střední risk" : risklevel === 2 ? "Vysoký risk" : "nevybraný risk" }}:</span>
              <span class="summary-value">{{ risklevel === 0 ? "0 €" : risklevel === 1 ? "500 000 €" : risklevel === 2 ? "1 000 000 €" : "Nevybráno" }}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Základní cena upgradu:</span>
              <span class="summary-value">{{ (String(priceUpgrade).split(/(?=(?:\d{3})+(?!\d))/)).join(' ') }} €</span>
            </div>
            <div class="summary-row total">
              <span class="summary-label">Celková cena:</span>
              <span class="summary-value">{{ (String(risklevel === 0 ? priceUpgrade : risklevel === 1 ? priceUpgrade + 500000 : risklevel === 2 ? priceUpgrade + 1000000 : 0).split(/(?=(?:\d{3})+(?!\d))/)).join(' ') }} €</span>
            </div>
          </div>

          <button class="confirm-upgrade-btn" @click="upgradeCentral(upgradenum, risklevel, priceUpgrade + (risklevel === 1 ? 500000 : risklevel === 2 ? 1000000 : 0))">
            Potvrdit vylepšení
          </button>
        </div>
      </div> 
    </div>
    <div v-if="upgradeSuccess" class="upgrade-choose">
      <div class="upgrade-choose-cont">
        <div class="upgrade-limit">
          <h2 class="upgrade-title">Upgrade vyšel</h2>
          <div class="upgrade-subtitle-info">
            <p>Zaplatili jste: <strong>{{ (String(finalprice).split(/(?=(?:\d{3})+(?!\d))/)).join(' ')}} €</strong></p>
            <p>Počet povolených vylepšení: <strong>{{ limit }}</strong></p>
            <h3>Nové statistiky</h3>
            <div class="upgrade-levels">
              <p>Aerodynamika: {{ team.aerodynamics }}</p>
              <p>Převodovka: {{ team.gearbox }}</p>
              <p>Brzdy: {{ team.brakes }}</p>
              <p>Přední křídlo: {{ team.frontwing }}</p>
              <p>Zadní křídlo: {{ team.rearwing }}</p>
              <p>Spolehlivost: {{ team.reliability }}</p>
            </div>
          </div>
        </div>
        
        <button class="confirm-upgrade-btn" @click="upgradeSuccess = false">
            Pokračovat
        </button>
        
            
      </div>
    </div>
    <div v-if="upgradeFail" class="upgrade-choose">
      <div class="upgrade-choose-cont">
        <div class="upgrade-limit">
          <h2 class="upgrade-title">Upgrade nevyšel</h2>
          <div class="upgrade-subtitle-info">
            <p>Zaplatili jste: <strong>{{ (String(finalprice).split(/(?=(?:\d{3})+(?!\d))/)).join(' ')}} €</strong></p>
            <p>Počet povolených vylepšení: <strong>{{ limit }}</strong></p>
          </div>
        </div>   
        <button class="confirm-upgrade-btn" @click="upgradeFail = false">
            Pokračovat
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import price from '~/assets/json/upgrademoney.json'
const sound = useClickSound(); 
const sound2 = useClickSoundNext();
const manager = ref([]);
const teams = ref([]);

manager.value = await $fetch("/api/manager/listManager");
teams.value = await $fetch("/api/listTeam");

const { getRandomInteger } = UseInteger();
const { getTeam } = useTeamsApi();
let limit = ref(manager.value[0].NumLimit);
let teamValue = await getTeam(manager.value[0].team);
let team = ref(teamValue.rows[0]);
const { updateTeam } = useTeamsApi();
const currentTeamId = manager.value[0].team;
let upgradeChooser = ref(false);
let upgradenum = ref(0);
let risklevel = ref(0);
let priceUpgrade = ref(0);
let upgradeSuccess = ref(false);
let upgradeFail = ref(false);
var finalprice = ref(0);

function openUpgrade(num) {
  sound.play();
  upgradeChooser.value = true;
  upgradenum.value = num; 
  switch(num) {
    case 0:
      if (team.value.aerodynamics >= 100){ upgradeChooser.value = false; return alert("Maximální úroveň dosažena"); }
      priceUpgrade.value = price[team.value.aerodynamics];
      break;
    case 1:
      if (team.value.gearbox >= 100) {upgradeChooser.value = false; return alert("Maximální úroveň dosažena");}
      priceUpgrade.value = price[team.value.gearbox];
      break;
    case 2:
      if (team.value.brakes >= 100) {upgradeChooser.value = false; return alert("Maximální úroveň dosažena");}
      priceUpgrade.value = price[team.value.brakes];
      break;
    case 3:
      if (team.value.frontwing >= 100){upgradeChooser.value = false; return alert("Maximální úroveň dosažena");}
      priceUpgrade.value = price[team.value.frontwing];
      break;
    case 4:
      if (team.value.rearwing >= 100) {upgradeChooser.value = false; return alert("Maximální úroveň dosažena");}
      priceUpgrade.value = price[team.value.rearwing];
      break;
    case 5:
      if (team.value.reliability >= 100) {upgradeChooser.value = false; return alert("Maximální úroveň dosažena");}
      priceUpgrade.value = price[team.value.reliability];
      break;
    default:
      console.log("Neplatné číslo vylepšení");
  }
}

function closeUpgrade() {
  upgradeChooser.value = false;
}

function upgradeCentral(num, pick, price) {
  upgradeChooser.value = false;
  finalprice.value = price;
  console.log(finalprice.value);
  let passValue = getRandomInteger(0, 100);
  switch (pick) {
    case 0:
      if (passValue >= 80) return upgradeFail.value = true, upgradeFailed();
      break;
    case 1:
      if (passValue >= 50) return upgradeFail.value = true, upgradeFailed();
      break;
    case 2:
      if (passValue >= 20) return upgradeFail.value = true, upgradeFailed();   
      break;
    default:
      console.log("Neplatné číslo výběru");
  }
  upgradeSuccess.value = true;

  switch (num) {
    case 0:
      aerodynamics();
      break;
    case 1:
      gearbox();
      break;
    case 2:
      brakes();
      break;
    case 3:
      frontwing();
      break;
    case 4:
      rearwing();
      break;
    case 5:
      reliability();
      break;
    default:
      console.log("Neplatné číslo vylepšení");
  }
}
const updateCurrentTeam = async (newData) => {
  try {
    await updateTeam(currentTeamId, newData);
    teamValue = await getTeam(manager.value[0].team);
    team.value = teamValue.rows[0];
    upgradeLimit(limit.value - 1);
  } catch (error) {
    console.error("Error updating team:", error);
  }
};

const aerodynamics = async () => {
  console.log(team.value.aerodynamics + (risklevel.value === 0 ? 0.5 : risklevel.value === 1 ? 1 : 2), team.value.aerodynamics, risklevel.value);
  const newData = {
    aerodynamics: team.value.aerodynamics + (risklevel.value === 0 ? 0.5 : risklevel.value === 1 ? 1 : 2), 
    money: team.value.money - finalprice.value,
  };
  console.log(team.value);
  await updateCurrentTeam(newData);
};

const gearbox = async () => {
  const newData = {
    ...team.value,
    gearbox: team.value.gearbox + (risklevel.value === 0 ? 0.5 : risklevel.value === 1 ? 1 : 2), 
    money: team.value.money - finalprice.value,
  };
  await updateCurrentTeam(newData);
};

const brakes = async () => {
  const newData = {
    ...team.value,
    brakes: team.value.brakes + (risklevel.value === 0 ? 0.5 : risklevel.value === 1 ? 1 : 2),
    money: team.value.money - finalprice.value, 
  };
  await updateCurrentTeam(newData);
};

const frontwing = async () => {
  const newData = {
    ...team.value,
    frontwing: team.value.frontwing + (risklevel.value === 0 ? 0.5 : risklevel.value === 1 ? 1 : 2), 
    money: team.value.money - finalprice.value,
  };
  await updateCurrentTeam(newData);
};

const rearwing = async () => {
  const newData = {
    ...team.value,
    rearwing: team.value.rearwing + (risklevel.value === 0 ? 0.5 : risklevel.value === 1 ? 1 : 2), 
    money: team.value.money - finalprice.value,
  };
  await updateCurrentTeam(newData);
};

const reliability = async () => {
  const newData = {
    ...team.value,
    reliability: team.value.reliability + (risklevel.value === 0 ? 0.5 : risklevel.value === 1 ? 1 : 2), 
    money: team.value.money - finalprice.value,
  };
  await updateCurrentTeam(newData);
};

const upgradeFailed = async () => {
  const newData = {
    ...team.value, 
    money: team.value.money - finalprice.value,
  };
  await updateCurrentTeam(newData);
};

const upgradeLimit = async (newLimit) => {
  try {
    await $fetch("/api/manager/limit", {
      method: "PUT",
      body: {
        NumLimit: newLimit,
      },
    });
    limit.value = newLimit;
  } catch (error) {
    console.error("Error updating limit:", error);
  }
};

//layout
definePageMeta({ layout: 'menu' }) 
const switchLayout = inject('switchLayout')

onMounted(() => {
  switchLayout('menu') 
})
</script>

<style>

</style>