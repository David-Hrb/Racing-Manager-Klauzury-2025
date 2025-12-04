<template>
  <div class="parent">
    <div class="drivers">
      <h2 class="section-title">Vaši hlavní jezdci</h2>
      <div 
      v-for="(driver, index) in teamDrivers" 
      :key="index" 
      :class="`driver-item driver-${driver.name.replace(/\s+/g, '-').toLowerCase()}`"
      >
        <div class="driver-maininfo">
          <img :src="`/images/avatars/${giveavatar(driver.avatar)}.svg`" class="avatar" alt="avatar">
          <div class="person">
              <span class="fi" :class="`fi-${driver.nationality}`" aria-hidden="true"></span>
              <div class="name">{{ driver.name }}</div>
          </div>
        </div>   
        <div class="driver-content">  
          <div class="driver-stats">
            <div class="stat-row">
              <span class="label">Narozen:</span>
              <span class="value">{{ driver.bornyear }}</span>
            </div>
            <div class="stat-row">
              <span class="label">Pořadí:</span>
              <span class="value">{{ driver.championshipplace }}</span>
            </div>
            <div class="stat-row">
              <span class="label">Popularity:</span>
              <span class="value">{{ driver.popularity }}</span>
            </div>
            <div class="stat-row">
              <span class="label">Ego:</span>
              <span class="value">{{ driver.ego }}</span>
            </div>
            <div class="stat-row">
              <span class="label">Kontrakt do:</span>
              <span class="value">{{ driver.contractexp }}</span>
            </div>
            <div class="stat-row">
              <span class="label">Pr Management:</span>
              <span class="value">{{ driver.prmanagement }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="div2">
      <h2 class="section-title">Váš tým</h2>  
        <div 
        v-if="currentTeamInfo"
        :class="`team-content team-${currentTeamInfo.name.replace(/\s+/g, '-').toLowerCase()}`"
        >
          <div class="team-header">
            <img class="logo" :src="logoroad" alt="Team Logo">
            <div class="team-identity">
              <div class="person">
                <span class="fi" :class="`fi-${currentTeamInfo.nationality}`" aria-hidden="true"></span>
                <div class="name">{{ currentTeamInfo.name }}</div>
              </div>
              <div class="team-meta">
                <span>Založeno: {{ currentTeamInfo.creationyear }}</span>
                <span>Pořadí: {{ currentTeamInfo.championshipplace }}</span>
              </div>
            </div>
          </div>

          <div class="team-details">
            <div class="colors-section">
              <span class="label">Barvy týmu:</span>
              <div class="colors">
                <div class="circlecolor" :style="`background-color:${currentTeamInfo.color1}`"></div>
                <div class="circlecolor" :style="`background-color:${currentTeamInfo.color2}`"></div>
                <div class="circlecolor" :style="`background-color:${currentTeamInfo.color3}`"></div>
              </div>
            </div>

            <div class="sponsors-section">
              <span class="label">Sponzoři:</span>
              <div class="sponzors">
                <div class="sponzor">
                  <span class="fi" :class="`fi-${sponsornationality1}`" aria-hidden="true"></span> 
                  <span class="sponsor-name">{{ sponsor1 }}</span>
                  <span class="sponsor-money">{{ formatMoney(sponsormoney1) }} €</span>
                </div>
                <div class="sponzor">
                  <span class="fi" :class="`fi-${sponsornationality2}`" aria-hidden="true"></span> 
                  <span class="sponsor-name">{{ sponsor2 }}</span>
                  <span class="sponsor-money">{{ formatMoney(sponsormoney2) }} €</span>
                </div>
                <div class="sponzor">
                  <span class="fi" :class="`fi-${sponsornationality3}`" aria-hidden="true"></span> 
                  <span class="sponsor-name">{{ sponsor3 }}</span>
                  <span class="sponsor-money">{{ formatMoney(sponsormoney3) }} €</span>
                </div>      
              </div>
            </div>

            <div class="fans-section">
              <span class="label">Počet fanoušků:</span>
              <span class="fans-value">{{ currentTeamInfo.fanspopularity }}</span>
            </div>
          </div>
        </div>
    </div>

    <div class="div3">
      <h2 class="section-title">Další trať</h2> 
      <div v-if="currentCircuitInfo" class="circuitinfo">
        <div class="circuit-header">
          <span class="fi fi-large" :class="`fi-${currentCircuitInfo.nationality.toLowerCase()}`" aria-hidden="true"></span>
          <div class="circuit-names">
            <h3>{{ currentCircuitInfo.name }}</h3>
            <span class="town">{{ currentCircuitInfo.town }}</span>
          </div>
        </div>
        <div class="circuit-specs">
          <div class="spec-item">
            <span class="label">Typ:</span>
            <span class="value">{{ cirtype(currentCircuitInfo.type) }}</span>
          </div>
          <div class="spec-item">
            <span class="label">Délka:</span>
            <span class="value">{{ currentCircuitInfo.length }} m</span>
          </div>
          <div class="spec-item">
            <span class="label">Kola:</span>
            <span class="value">{{ currentCircuitInfo.lapslength }}</span>
          </div>
          <div class="spec-item">
            <span class="label">Zatáčky:</span>
            <span class="value">{{ currentCircuitInfo.numberofturns }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="div4">
      <div class="manager-wrapper" v-for="(manager) in manager" :key="manager.name">
        <h2 class="section-title">Manažer</h2>
        <div class="managerinfo">
          <img :src="`/images/icons/${manager.SelectedGender}/${String(manager.selectedAvatar).padStart(2, 0)}.svg`" class="manager-avatar" alt="Manager">
          <div class="manager-details">
            <div class="manager-name">{{ manager.name }} {{ manager.surname }}</div>
            <div class="manager-char">Váš charakter</div>
            <div class="manager-stats">
              <div class="stat-row">
                <span class="label">Národnost:</span>
                <span>
                  <span class="fi" :class="`fi-${manager.nationality.toLowerCase()}`" aria-hidden="true"></span>
                  {{ ManagerNationality }}
                </span>
              </div>
              <div class="stat-row">
                <span class="label">Narození:</span>
                <span>{{ manager.date }}</span>
              </div>
              <div class="stat-row">
                <span class="label">Pohlaví:</span>
                <span>{{ manager.SelectedGender }}</span>
              </div>
              <div class="stat-row">
                <span class="label">Poslední práce:</span>
                <span>{{ manager.lastwork }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="endOfSeason" class="endseason-overlay">
    <button class="next endseason-button" style="z-index: 500;" @click="nextSeason">
      Pokračovat
    </button>
    <div class="endseason-content">
      <div class="endseason-calendar">
        <h2>Výsledky velkých cen</h2>
        <div class="circuit-navigation">
          <button 
            @click="previousCalendarEntry" 
            :disabled="isFirstCalendarEntry"
            class="endseason-button"
          >
            ← Předchozí
          </button>
          <span class="current-circuit">
            {{ currentCalendarCircuitName }}
          </span>
          <button 
            @click="nextCalendarEntry" 
            :disabled="isLastCalendarEntry"
            class="endseason-button"
          >
            Další →
          </button>
        </div>

        <div class="calendar-entries">
          <div 
            v-if="currentCalendarEntry"
            class="calendar-entry"
          >
            <div class="event-info">
              <div class="event-track">
                {{ circuits.find(circuit => circuit.ID === currentCalendarEntry.track)?.name || 'Unknown Track' }}
              </div>
              <div class="event-date">{{ daycount(currentCalendarEntry.date) }}</div>
              <div class="podium">
                <div class="secondplace">
                  <span class="position-label">2.</span>
                  <img 
                    :src="`/images/avatars/${giveavatar(drivers.find(driver => driver.ID === currentCalendarEntry.secondplace)?.avatar)}.svg`" 
                    class="kvalimg" 
                    alt="avatar" 
                    style="width: 3rem; height: 3rem;"
                  >
                  <span class="driver-name" v-if="currentCalendarEntry.secondplace !== 0">
                    {{ drivers.find(driver => driver.ID === currentCalendarEntry.secondplace)?.name || 'Unknown' }} 
                    ({{ teams.find(team => team.ID === currentCalendarEntry.secondteam)?.name || 'Unknown Team' }})
                  </span>
                  <span class="driver-name" v-else>-</span>
                </div>
                <div class="winner">
                  <span class="position-label">1.</span>
                  <img 
                    :src="`/images/avatars/${giveavatar(drivers.find(driver => driver.ID === currentCalendarEntry.winner)?.avatar)}.svg`" 
                    class="kvalimg" 
                    alt="avatar" 
                    style="width: 4rem; height: 4rem;"
                  >
                  <span class="driver-name" v-if="currentCalendarEntry.winner !== 0">
                    {{ drivers.find(driver => driver.ID === currentCalendarEntry.winner)?.name || 'Unknown' }} 
                    ({{ teams.find(team => team.ID === currentCalendarEntry.winnerteam)?.name || 'Unknown Team' }})
                  </span>
                  <span class="driver-name" v-else>-</span>
                </div>
                <div class="thirdplace">
                  <span class="position-label">3.</span>
                  <img 
                    :src="`/images/avatars/${giveavatar(drivers.find(driver => driver.ID === currentCalendarEntry.thirdplace)?.avatar)}.svg`" 
                    class="kvalimg" 
                    alt="avatar" 
                    style="width: 2rem; height: 2rem;"
                  >
                  <span class="driver-name" v-if="currentCalendarEntry.thirdplace !== 0">
                    {{ drivers.find(driver => driver.ID === currentCalendarEntry.thirdplace)?.name || 'Unknown' }} 
                    ({{ teams.find(team => team.ID === currentCalendarEntry.thirdteam)?.name || 'Unknown Team' }})
                  </span>
                  <span class="driver-name" v-else>-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
      <div class="endseason-statistics">
        <h2>Historické a sezónní statistiky</h2>
        <div class="statistics-content">
          <div class="main-toggle">
            <button 
              class="endseason-button"
              :class="{ active: viewType === 'drivers' }" 
              @click="viewType = 'drivers'; sound.play()">
              Jezdci
            </button>
            <button 
              class="endseason-button"
              :class="{ active: viewType === 'teams' }" 
              @click="viewType = 'teams'; sound.play()">
              Týmy
            </button>
          </div>

          <div class="stat-toggle">
            <button 
              class="endseason-button smaller-button"
              :class="{ active: statType === 'points' }" 
              @click="statType = 'points'; sound2.play()">
              Body
            </button>
            <button 
              class="endseason-button smaller-button"
              :class="{ active: statType === 'wins' }" 
              @click="statType = 'wins'; sound2.play()">
              Vítězství
            </button>
            <button 
              class="endseason-button smaller-button"
              :class="{ active: statType === 'podiums' }" 
              @click="statType = 'podiums'; sound2.play()">
              Pódia
            </button>
          </div>

          <div class="table-wrapper" v-if="viewType === 'drivers'">
            <table class="leaderboard-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>Národnost</th>
                  <th>Jezdec</th>
                  <th>Tým</th>
                  <th>{{ statLabel }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(entry, index) in currentDriverList" :key="entry.driverID || entry.ID">
                  <td class="driver-rank">{{ index + 1 }}</td>
                  <td>
                    <img 
                      :src="`/images/avatars/${giveavatar(entry.driver?.avatar || entry.avatar)}.svg`" 
                      class="kvalimg" 
                      alt="avatar" 
                      style="width: 50px; height: 50px;"
                    >
                  </td>
                  <td class="driver-nationality">
                    <span 
                      class="fi" 
                      :class="`fi-${entry.driver?.nationality || entry.nationality}`" 
                      aria-hidden="true">
                    </span>
                    {{ entry.driver?.nationality || entry.nationality }}
                  </td>
                  <td class="drivername">{{ entry.driver?.name || entry.name }}</td>
                  <td class="currentteam">
                    {{ getTeamName(entry.driver?.currentteam || entry.currentteam) }}
                  </td>
                  <td class="career-points">
                    {{ getDriverStatValue(entry) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-wrapper" v-if="viewType === 'teams'">
            <table class="leaderboard-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Národnost</th>
                  <th>Tým</th>
                  <th>Jezdec 1</th>
                  <th>Jezdec 2</th>
                  <th>{{ statLabel }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(team, index) in currentTeamList" :key="team.ID">
                  <td class="driver-rank">{{ index + 1 }}</td>
                  <td>
                    <img 
                      :src="`/images/logo/teams/${String(team.logo).padStart(2, '0')}.svg`"
                      class="kvalimg" 
                      alt="team logo"
                      style="width: 50px; height: auto; border: none; border-radius: 0%; background: none;"
                    >
                  </td>
                  <td class="driver-nationality">
                    <span class="fi" :class="`fi-${team.nationality}`" aria-hidden="true"></span>
                    {{ team.nationality }}
                  </td>
                  <td class="drivername">{{ team.name }}</td>
                  <td>{{ getDriverName(team.driver1) }}</td>
                  <td>{{ getDriverName(team.driver2) }}</td>
                  <td class="career-points">
                    {{ getTeamStatValue(team) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="startOfNewSeason" class="endseason-overlay">
    <div class="endseason-content">
      <h1>Začátek nové sezóny</h1>
      <h2>Došlo ke změnám pravidel: {{ changes.join(" ") }}</h2>
      <h2>Jezdci, kterým vám končí smlouva:</h2>
      <div class="driverexp">
        <div class="driverexp-conteiner" v-for="driver in driverTeamExpires" :key="driver.ID">
          <img 
            :src="`/images/avatars/${giveavatar(driver.avatar)}.svg`" 
            class="avatar" 
            alt="avatar" 
            style="width: 50px; height: 50px;"
          >
          <div class="nationality">
            <span class="fi" :class="`fi-${driver.nationality}`" aria-hidden="true"></span>
            {{ driver.nationality }}
          </div>
          <div class="driver-name">
            {{ driver.name }} 
          </div>
          <div class="expire">
            smlouva tohoto jezdce skončila prodlužte ji nebo ho vyměnte.
          </div>

          <button @click="openExtendNegotiation(driver)">Prodloužit</button>
          <button @click="openReplaceDriver(driver)">Vyměnit Jezdce</button>
        </div>
      </div>
      <button v-if="driverTeamExpires.length == 0" @click="startNewSeasonFunc()">Pokračujte na novou sezónu</button>
    </div>
  </div>

  <div class="driver-negonation" style="top: 0; left:0;" v-if="extendNegotiation">
    <div class="driver-negonation-cont">
      <button class="settings-btn settings-close-btn" @click="closeExtendNegotiation()">
        <svg width="2rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve">
          <path fill="currentcolor" d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
        </svg>
      </button>
      <h2>Prodloužení smlouvy s {{ selectedDriverForExtend?.name }}</h2>
      <h3>Nabídněte podmínky smlouvy</h3>
      <div class="negonation-inputs">
        <div class="negonation-input">
          <span>Vyberte délku smlouvy:</span>
          <select v-model="yearsOfContract">
            <option :value="1">1 rok</option>
            <option :value="2">2 roky</option>
            <option :value="3">3 roky</option>
            <option :value="4">4 roky</option>
            <option :value="5">5 roků</option>
          </select>
        </div>
        <div class="negonation-input">
          <span>Nabídněte plat:</span>
          <div class="money">
            <button @click="currentSalaryIndex <= 0 ?currentSalaryIndex = 0 : currentSalaryIndex -= 1">-</button>
            <div class="money-text">{{ formatMoney(salaryPrices[currentSalaryIndex]) }} €</div>
            <button @click="currentSalaryIndex >= salaryPrices.length - 1 ?currentSalaryIndex = salaryPrices.length - 1 : currentSalaryIndex += 1">+</button>
          </div>
        </div>
        <button style="padding: 1.5rem 3rem;" class="settings-btn driver-negonation-btn" @click="tryExtendContract()">Potvrdit</button>
      </div>
    </div>
  </div>

  <div class="driver-negonation" style="top: 0; left:0;" v-if="replaceDriverModal">
    <div class="driver-negonation-cont">
      <button class="settings-btn settings-close-btn" @click="closeReplaceDriver()">
        <svg width="2rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve">
          <path fill="currentcolor" d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
        </svg>
      </button>
      <h2>Nahrazení jezdce {{ selectedDriverForReplace?.name }}</h2>
      <h3>Vyberte nového jezdce</h3>
      
      <div class="table-wrapper">
        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Národnost</th>
              <th>Jméno</th>
              <th>Popularita</th>
              <th>Ego</th>
              <th>Aktuální tým</th>
              <th>Konec smlouvy</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="driver in availableDriversForReplace" :key="driver.ID">
              <td>
                <img 
                  :src="`/images/avatars/${giveavatar(driver.avatar)}.svg`" 
                  class="avatar" 
                  alt="avatar" 
                  style="width: 50px; height: 50px;"
                >
              </td>
              <td class="driver-nationality">
                <span class="fi" :class="`fi-${driver.nationality}`" aria-hidden="true"></span>
                {{ driver.nationality }}
              </td>
              <td class="drivername">{{ driver.name }}</td>
              <td>{{ driver.popularity }}</td>
              <td>{{ driver.ego }}</td>
              <td>{{ driver.currentteam == null ?  "bez týmu" : teams.find(team => team.ID === driver.currentteam)?.name }}</td>
              <td>{{ driver.contractexp == null ? "nemá" : driver.contractexp }}</td>
              <td>
                <button class="driver-negonation-btn" @click="selectNewDriver(driver)">Vybrat</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>   
      <button class="driver-negonation-btn" @click="closeReplaceDriver()">Zpět</button>
    </div>
  </div>

  <div class="driver-negonation" style="top: 0; left:0;" v-if="newDriverNegotiation">
    <div class="driver-negonation-cont">
      <button class="settings-btn settings-close-btn" @click="closeNewDriverNegotiation()">
        <svg width="2rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve">
          <path fill="currentcolor" d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
        </svg>
      </button>
      <h2>Nabídka pro {{ selectedNewDriver?.name }}</h2>
      <h3>Nabídněte podmínky smlouvy</h3>
      <div class="negonation-inputs">
        <div class="negonation-input">
          <span>Vyberte délku smlouvy:</span>
          <select v-model="yearsOfContract">
            <option :value="1">1 rok</option>
            <option :value="2">2 roky</option>
            <option :value="3">3 roky</option>
            <option :value="4">4 roky</option>
            <option :value="5">5 roků</option>
          </select>
        </div>
        <div class="negonation-input">
          <span>Nabídněte plat:</span>
          <div class="money">
            <button @click="currentSalaryIndex <= 0 ?currentSalaryIndex = 0 : currentSalaryIndex -= 1">-</button>
            <div class="money-text">{{ formatMoney(salaryPrices[currentSalaryIndex]) }} €</div>
            <button @click="currentSalaryIndex >= salaryPrices.length - 1 ?currentSalaryIndex = salaryPrices.length - 1 : currentSalaryIndex += 1">+</button>
          </div>
        </div>
        <div class="negonation-input" v-if="buyoutPrice > 0">
          <span>Cena za výkup:</span>
          <span>{{ formatMoney(buyoutPrice) }} €</span>
        </div>
        <button style="padding: 1.5rem 3rem;" class="settings-btn driver-negonation-btn" @click="tryReplaceContract()">Potvrdit</button>
      </div>
    </div>
  </div>

  <div class="driver-negonation" style="top: 0; left:0;" v-if="driverAccepted">
    <div class="driver-negonation-cont">
      <h2>Jezdec přijal vaši nabídku! </h2>
      <button class="driver-negonation-btn" @click="driverAccepted = false">Pokračovat</button>
    </div>
  </div>

  <div class="driver-negonation"  style="top: 0; left:0;"v-if="driverDeclined">
    <div class="driver-negonation-cont">
      <h2>Jezdec odmítl vaši nabídku.</h2>
      <button class="driver-negonation-btn" @click="driverDeclined = false">Pokračovat</button>
    </div>
  </div>
</template>

<script setup>
import avatars from '~/assets/json/avatars.json'

const { daycount } = useDayCount()
const sound = useClickSound();
const sound2 = useClickSound();
const { getRandomInteger } = UseInteger();
const { refreshManager } = useManagerDay();

let drivers = ref([]);
let teams = ref([]);
const circuits = ref([]);
const manager = ref([]);
const allCalendar = ref([]);
const leadboard = ref([]);

drivers.value = await $fetch("/api/listDriver");
teams.value = await $fetch("/api/listTeam");
circuits.value = await $fetch("/api/listCircuit");
manager.value = await $fetch("/api/manager/listManager");
allCalendar.value = await $fetch("/api/calendar/listCalendar");
leadboard.value = await $fetch("/api/leadboard/listLeadboard") || [];

const gender = ref(manager.value[0].SelectedGender);
const { currentcircuit } = await useGetNextRace()
console.log(currentcircuit)
let currentteam = manager.value[0].team;

const { setupRace } = useRaceSetup();
const { teamDrivers, teamAllDrivers, currentTeamInfo, currentCircuitInfo, isValid } = setupRace({
  drivers: drivers.value,
  teams: teams.value,
  circuits: circuits.value,
  teamId: currentteam,
  circuitId: currentcircuit
});

const { calendar } = useCreateCalendar();
const { triggerEndOfSeason, changes, manTeamExp } = await useEndOfSeason();
const { getSponsor } = useSponsors();
const { manteam } = await useManager();
const { logoroad } = await useLogos(manteam - 1);
const ManagerNationality = useNationality(manager.value[0].nationality);
console.log(ManagerNationality)

console.log(allCalendar.value)
let endOfSeason = ref(allCalendar.value.every(item => item.raced === 1));
let startOfNewSeason = ref(false);
console.log(endOfSeason.value);

const extendNegotiation = ref(false);
const replaceDriverModal = ref(false);
const newDriverNegotiation = ref(false);
const driverAccepted = ref(false);
const driverDeclined = ref(false);

const selectedDriverForExtend = ref(null);
const selectedDriverForReplace = ref(null);
const selectedNewDriver = ref(null);

const yearsOfContract = ref(1);
const salaryIdeal = ref(0);
const salaryPrices = ref([]);
const currentSalaryIndex = ref(0);
const buyoutPrice = ref(0);

const { updateDriver } = useDriversApi();
const { updateTeam } = useTeamsApi();
const { updateLeadboard } = useLeadBoardsApi();

const { sponsorsname: sponsor1, sponsormoney: sponsormoney1, sponsornationality: sponsornationality1 } = getSponsor(currentTeamInfo.sponzor1);
const { sponsorsname: sponsor2, sponsormoney: sponsormoney2, sponsornationality: sponsornationality2 } = getSponsor(currentTeamInfo.sponzor2);
const { sponsorsname: sponsor3, sponsormoney: sponsormoney3, sponsornationality: sponsornationality3 } = getSponsor(currentTeamInfo.sponzor3);

function giveavatar(num) {
  if (num === undefined || num === null) {
    return 'default' 
  }
  return avatars[num.toString()] 
}

function formatMoney(num) {
  if (num === undefined || num === null) return '0';
  return (String(num).split(/(?=(?:\d{3})+(?!\d))/)).join(' ');
}

function startNewSeasonFunc() {
  endOfSeason.value = false;
  startOfNewSeason.value = false;
  refreshManager();
}

function cirtype(num) {
  switch(num) {
    case 0:
      return "závodní okruh" 
    case 1:
      return "městský okruh"
    case 2:
      return "ovál"
    default:
      return "error"
  }
}

const currentCalendarIndex = ref(0);

const currentCalendarEntry = computed(() => {
  if (! allCalendar.value || ! allCalendar.value.length) return null;
  return allCalendar.value[currentCalendarIndex.value] || null;
});

const currentCalendarCircuitName = computed(() => {
  if (!currentCalendarEntry.value || !circuits.value?.length) {
    return 'Žádné závody';
  }
  return circuits.value.find(
    circuit => circuit.ID === currentCalendarEntry.value.track
  )?.name || 'Unknown Track';
});

const isFirstCalendarEntry = computed(() => currentCalendarIndex.value === 0);
const isLastCalendarEntry = computed(() => {
  if (!allCalendar.value?.length) return true;
  return currentCalendarIndex.value === allCalendar.value.length - 1;
});

const nextCalendarEntry = () => {
  if (allCalendar.value && currentCalendarIndex.value < allCalendar.value.length - 1) {
    currentCalendarIndex.value++;
  }
};

const previousCalendarEntry = () => {
  if (currentCalendarIndex.value > 0) {
    currentCalendarIndex.value--;
  }
};

const viewType = ref('drivers'); 
const statType = ref('points'); 

const statLabel = computed(() => {
  switch (statType.value) {
    case 'points': return 'Body';
    case 'wins': return 'Vítězství';
    case 'podiums': return 'Pódia';
    default: return 'Body';
  }
});

function getTeamName(teamId) {
  if (teamId == null) return 'bez týmu';
  return teams.value.find(team => team.ID === teamId)?.name || 'bez týmu';
}

function getDriverName(driverId) {
  if (driverId == null) return '-';
  return drivers.value.find(driver => driver.ID === driverId)?.name || '-';
}

const teamDriverIds = computed(() => {
  const ids = new Set();
  teams.value.slice(0, 10).forEach(team => { 
    if (team.driver1) ids.add(Number(team.driver1));
    if (team.driver2) ids.add(Number(team.driver2));
    if (leadboard.value.find(entry => Number(entry.driverID) === Number(team.testdriver))?.points > 0) {
      ids.add(Number(team.testdriver));
    }
  });
  return ids;
});

const fullLeaderboard = computed(() => {
  return drivers.value.filter(driver => teamDriverIds.value.has(Number(driver.ID)));
});

const driverLeaderboard = computed(() => {
  return leadboard.value
    .map(entry => {
      const driver = fullLeaderboard.value.find(d => Number(d.ID) === Number(entry.driverID));
      return driver ?{ ...entry, driver } : null;
    })
    .filter(entry => entry !== null);
});

const teamLeaderboard = computed(() => {
  return teams.value.slice(0, 10).map(team => {
    const driver1Entry = driverLeaderboard.value.find(
      entry => Number(entry.driverID) === Number(team.driver1)
    );
    const driver2Entry = driverLeaderboard.value.find(
      entry => Number(entry.driverID) === Number(team.driver2)
    );
    const driver3Entry = driverLeaderboard.value.find(
      entry => Number(entry.driverID) === Number(team.testdriver)
    );

    return {
      ...team,
      points: (driver1Entry?.points || 0) + (driver2Entry?.points || 0) + (driver3Entry?.points || 0),
      wins: (driver1Entry?.wins || 0) + (driver2Entry?.wins || 0) + (driver3Entry?.wins || 0),
      podiums: (driver1Entry?.podiums || 0) + (driver2Entry?.podiums || 0) + (driver3Entry?.podiums || 0)
    };
  });
});

function getDriverStatValue(entry) {
  switch (statType.value) {
    case 'points': return `${entry.points || 0} pts`;
    case 'wins': return entry.wins || entry.driver?.wins || 0;
    case 'podiums': return entry.podiums || entry.driver?.podiums || 0;
    default: return entry.points || 0;
  }
}

function getTeamStatValue(team) {
  switch (statType.value) {
    case 'points': return `${team.points || 0} pts`;
    case 'wins': return team.historywins || 0;
    case 'podiums': return team.historypodiums || 0;
    default: return team.points || 0;
  }
}

const currentDriverList = computed(() => {
  const list = [...driverLeaderboard.value];
  switch (statType.value) {
    case 'points':
      return list.sort((a, b) => (b.points || 0) - (a.points || 0));
    case 'wins':
      return list.sort((a, b) => (b.wins || b.driver?.wins || 0) - (a.wins || a.driver?.wins || 0));
    case 'podiums':
      return list.sort((a, b) => (b.podiums || b.driver?.podiums || 0) - (a.podiums || a.driver?.podiums || 0));
    default:
      return list;
  }
});

const currentTeamList = computed(() => {
  const list = [...teamLeaderboard.value];
  switch (statType.value) {
    case 'points':
      return list.sort((a, b) => (b.points || 0) - (a.points || 0));
    case 'wins':
      return list.sort((a, b) => (b.wins || 0) - (a.wins || 0));
    case 'podiums':
      return list.sort((a, b) => (b.podiums || 0) - (a.podiums || 0));
    default:
      return list;
  }
});

const driverTeamExpires = computed(() => {
  const driverTeam = ref([]);
  console.log(manTeamExp.value);
  console.log(teamAllDrivers.value)
  drivers.value.forEach(driver => {
    if (manTeamExp.value.includes(driver.ID)) {
      driverTeam.value.push(driver);
    }
  });
  console.log(driverTeam);
  return driverTeam.value;
});

function openExtendNegotiation(driver) {
  selectedDriverForExtend.value = driver;
  calculateSalaryPrices(driver);
  extendNegotiation.value = true;
}

function closeExtendNegotiation() {
  extendNegotiation.value = false;
  selectedDriverForExtend.value = null;
  resetNegotiationValues();
}

function calculateSalaryPrices(driver) {
  let priceFactor = (driver.prmanagement + driver.ego) / 200;
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
  currentSalaryIndex.value = 0; 
}

async function tryExtendContract() {
  let offeredSalary = salaryPrices.value[currentSalaryIndex.value];
  
  if (offeredSalary >= salaryIdeal.value) {
    
    let contractExp = manager.value[0].season + yearsOfContract.value;
    
    try {
      await updateDriver(selectedDriverForExtend.value.ID, {
        contractexp: contractExp
      });
      drivers.value = await $fetch("/api/listDriver");
      
      driverAccepted.value = true;
      manTeamExp.value = (manTeamExp.value || []).filter(driverId => driverId !== selectedDriverForExtend.value.ID);

    } catch (error) {
      console.error("Error extending contract:", error);
    }
  } else {
    driverDeclined.value = true;
  }
  
  closeExtendNegotiation();
}

function openReplaceDriver(driver) {
  selectedDriverForReplace.value = driver;
  replaceDriverModal.value = true;
}

function closeReplaceDriver() {
  replaceDriverModal.value = false;
  selectedDriverForReplace.value = null;
}

const availableDriversForReplace = computed(() => {
  return drivers.value.filter(driver => {
    return driver.currentteam === null || driver.currentteam !== currentteam;
  });
});

function selectNewDriver(driver) {
  selectedNewDriver.value = driver;
  replaceDriverModal.value = false;
  calculateSalaryPrices(driver);
  
  if (driver.currentteam !== null) {
    let priceFactor = (driver.prmanagement + driver.ego) / 200;
    buyoutPrice.value = Math.floor((getRandomInteger(1000000, 5000000) * priceFactor) / 1000) * 1000;
  } else {
    buyoutPrice.value = 0;
  }
  
  newDriverNegotiation.value = true;
}

function closeNewDriverNegotiation() {
  newDriverNegotiation.value = false;
  selectedNewDriver.value = null;
  resetNegotiationValues();
}

async function tryReplaceContract() {
  let offeredSalary = salaryPrices.value[currentSalaryIndex.value];
  
  if (selectedNewDriver.value.currentteam !== null) {
    let driverTeam = teams.value.find(team => team.ID === selectedNewDriver.value.currentteam);
    let currTeamStats = currentTeamInfo.aerodynamics + currentTeamInfo.gearbox + currentTeamInfo.brakes + currentTeamInfo.rearwing + currentTeamInfo.frontwing + currentTeamInfo.reliability;
    let driverTeamStats = driverTeam.aerodynamics + driverTeam.gearbox + driverTeam.brakes + driverTeam.rearwing + driverTeam.frontwing + driverTeam.reliability;
    let teamDifference = currTeamStats - driverTeamStats;
    
    if (teamDifference <= -8) {
      driverDeclined.value = true;
      closeNewDriverNegotiation();
      return;
    }
  }
  
  if (offeredSalary >= salaryIdeal.value) {
    let contractExp = manager.value[0].season + yearsOfContract.value;
    
    try {
      const team = teams.value.find(t => t.ID === currentteam);
      const driverFields = ['driver1', 'driver2', 'testdriver'];
      let driverPosition = driverFields.findIndex(field => team[field] === selectedDriverForReplace.value.ID);
      
      if (driverPosition !== -1) {
        const fieldToUpdate = driverFields[driverPosition];
        
        await updateTeam(currentteam, { 
          [fieldToUpdate]: selectedNewDriver.value.ID,
          money: team.money - (offeredSalary + buyoutPrice.value)
        });
        
        const oldDriverPoints = leadboard.value.find(entry => entry.driverID === selectedDriverForReplace.value.ID)?.points || 0;
        const newDriverPoints = leadboard.value.find(entry => entry.driverID === selectedNewDriver.value.ID)?.points || 0;
        
        await updateLeadboard(selectedNewDriver.value.ID, { points: oldDriverPoints });
        await updateLeadboard(selectedDriverForReplace.value.ID, { points: newDriverPoints });
        
        await updateDriver(selectedNewDriver.value.ID, {
          currentteam: currentteam,
          contractexp: contractExp
        });
        
        await updateDriver(selectedDriverForReplace.value.ID, {
          currentteam: null,
          contractexp: null
        });
        
        drivers.value = await $fetch("/api/listDriver");
        teams.value = await $fetch("/api/listTeam");
        leadboard.value = await $fetch("/api/leadboard/listLeadboard");
        
        driverAccepted.value = true;
        manTeamExp.value = manTeamExp.value.filter(driverId => driverId !== selectedDriverForReplace.value.ID);
      }
    } catch (error) {
      console.error("Error replacing driver:", error);
    }
  } else {
    driverDeclined.value = true;
  }
  
  closeNewDriverNegotiation();
}

function resetNegotiationValues() {
  yearsOfContract.value = 1;
  salaryIdeal.value = 0;
  salaryPrices.value = [];
  currentSalaryIndex.value = 0;
  buyoutPrice.value = 0;
}

async function nextSeason() {
  sound.play()
  endOfSeason.value = false;
  startOfNewSeason.value = true;
  await triggerEndOfSeason();
}

const switchLayout = inject('switchLayout')

onMounted(() => {
  switchLayout('menu') 
})

const switchToDefaut = () => {
  navigateTo('../kvalification')
} 

definePageMeta({
  layout: 'menu'
})
</script>