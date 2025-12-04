<template>
    <div class="center">
    <div class="char-options">
    <h2>Vytvořte si Postavu</h2>
      <div class="inputs">
        <div class="inputsleft">
          <h3>Jméno</h3>
          <input
            type="text"
            v-model="name"
            @input="filterLettersOnly('name')"
            title="Jméno musí obsahovat pouze písmena a mezery"
            required
          >
          <h3>Příjmení</h3>
          <input
            type="text"
            v-model="surname"
            @input="filterLettersOnly('surname')"
            title="Příjmení musí obsahovat pouze písmena a mezery"
            required
          >
          <h3>Národnost</h3>
          <select id="nationality" v-model="nationality" name="nationality" required>
              <option value="nothing">-- Vyberte národnost --</option>
              <option value="AF" data-flag="fi-cz">🇦🇫 Afghánistán</option>
              <option value="AL" data-flag="al">🇦🇱 Albánie</option>
              <option value="DZ" data-flag="dz">🇩🇿 Alžírsko</option>
              <option value="AD" data-flag="ad">🇦🇩 Andorra</option>
              <option value="AO" data-flag="ao">🇦🇴 Angola</option>
              <option value="AG" data-flag="ag">🇦🇬 Antigua a Barbuda</option>
              <option value="AR" data-flag="ar">🇦🇷 Argentina</option>
              <option value="AM" data-flag="am">🇦🇲 Arménie</option>
              <option value="AU" data-flag="au">🇦🇺 Austrálie</option>
              <option value="AT" data-flag="at">🇦🇹 Rakousko</option>
              <option value="AZ" data-flag="az">🇦🇿 Ázerbájdžán</option>
              <option value="BS" data-flag="bs">🇧🇸 Bahamy</option>
              <option value="BH" data-flag="bh">🇧🇭 Bahrajn</option>
              <option value="BD" data-flag="bd">🇧🇩 Bangladéš</option>
              <option value="BB" data-flag="bb">🇧🇧 Barbados</option>
              <option value="BY" data-flag="by">🇧🇾 Bělorusko</option>
              <option value="BE" data-flag="be">🇧🇪 Belgie</option>
              <option value="BZ" data-flag="bz">🇧🇿 Belize</option>
              <option value="BJ" data-flag="bj">🇧🇯 Benin</option>
              <option value="BT" data-flag="bt">🇧🇹 Bhútán</option>
              <option value="BO" data-flag="bo">🇧🇴 Bolívie</option>
              <option value="BA" data-flag="ba">🇧🇦 Bosna a Hercegovina</option>
              <option value="BW" data-flag="bw">🇧🇼 Botswana</option>
              <option value="BR" data-flag="br">🇧🇷 Brazílie</option>
              <option value="BN" data-flag="bn">🇧🇳 Brunej</option>
              <option value="BG" data-flag="bg">🇧🇬 Bulharsko</option>
              <option value="BF" data-flag="bf">🇧🇫 Burkina Faso</option>
              <option value="BI" data-flag="bi">🇧🇮 Burundi</option>
              <option value="KH" data-flag="kh">🇰🇭 Kambodža</option>
              <option value="CM" data-flag="cm">🇨🇲 Kamerun</option>
              <option value="CA" data-flag="ca">🇨🇦 Kanada</option>
              <option value="CV" data-flag="cv">🇨🇻 Kapverdy</option>
              <option value="CF" data-flag="cf">🇨🇫 Středoafrická republika</option>
              <option value="TD" data-flag="td">🇹🇩 Čad</option>
              <option value="CL" data-flag="cl">🇨🇱 Chile</option>
              <option value="CN" data-flag="cn">🇨🇳 Čína</option>
              <option value="CO" data-flag="co">🇨🇴 Kolumbie</option>
              <option value="KM" data-flag="km">🇰🇲 Komory</option>
              <option value="CG" data-flag="cg">🇨🇬 Konžská republika</option>
              <option value="CD" data-flag="cd">🇨🇩 Demokratická republika Kongo</option>
              <option value="CR" data-flag="cr">🇨🇷 Kostarika</option>
              <option value="CI" data-flag="ci">🇨🇮 Pobřeží slonoviny</option>
              <option value="HR" data-flag="hr">🇭🇷 Chorvatsko</option>
              <option value="CU" data-flag="cu">🇨🇺 Kuba</option>
              <option value="CY" data-flag="cy">🇨🇾 Kypr</option>
              <option value="CZ" data-flag="cz">🇨🇿 Česko</option>
              <option value="DK" data-flag="dk">🇩🇰 Dánsko</option>
              <option value="DJ" data-flag="dj">🇩🇯 Džibutsko</option>
              <option value="DM" data-flag="dm">🇩🇲 Dominika</option>
              <option value="DO" data-flag="do">🇩🇴 Dominikánská republika</option>
              <option value="EC" data-flag="ec">🇪🇨 Ekvádor</option>
              <option value="EG" data-flag="eg">🇪🇬 Egypt</option>
              <option value="SV" data-flag="sv">🇸🇻 Salvador</option>
              <option value="GQ" data-flag="gq">🇬🇶 Rovníková Guinea</option>
              <option value="ER" data-flag="er">🇪🇷 Eritrea</option>
              <option value="EE" data-flag="ee">🇪🇪 Estonsko</option>
              <option value="SZ" data-flag="sz">🇸🇿 Eswatini</option>
              <option value="ET" data-flag="et">🇪🇹 Etiopie</option>
              <option value="FJ" data-flag="fj">🇫🇯 Fidži</option>
              <option value="FI" data-flag="fi">🇫🇮 Finsko</option>
              <option value="FR" data-flag="fr">🇫🇷 Francie</option>
              <option value="GA" data-flag="ga">🇬🇦 Gabon</option>
              <option value="GM" data-flag="gm">🇬🇲 Gambie</option>
              <option value="GE" data-flag="ge">🇬🇪 Gruzie</option>
              <option value="DE" data-flag="de">🇩🇪 Německo</option>
              <option value="GH" data-flag="gh">🇬🇭 Ghana</option>
              <option value="GR" data-flag="gr">🇬🇷 Řecko</option>
              <option value="GD" data-flag="gd">🇬🇩 Grenada</option>
              <option value="GT" data-flag="gt">🇬🇹 Guatemala</option>
              <option value="GN" data-flag="gn">🇬🇳 Guinea</option>
              <option value="GW" data-flag="gw">🇬🇼 Guinea-Bissau</option>
              <option value="GY" data-flag="gy">🇬🇾 Guyana</option>
              <option value="HT" data-flag="ht">🇭🇹 Haiti</option>
              <option value="HN" data-flag="hn">🇭🇳 Honduras</option>
              <option value="HU" data-flag="hu">🇭🇺 Maďarsko</option>
              <option value="IS" data-flag="is">🇮🇸 Island</option>
              <option value="IN" data-flag="in">🇮🇳 Indie</option>
              <option value="ID" data-flag="id">🇮🇩 Indonésie</option>
              <option value="IR" data-flag="ir">🇮🇷 Írán</option>
              <option value="IQ" data-flag="iq">🇮🇶 Irák</option>
              <option value="IE" data-flag="ie">🇮🇪 Irsko</option>
              <option value="IL" data-flag="il">🇮🇱 Izrael</option>
              <option value="IT" data-flag="it">🇮🇹 Itálie</option>
              <option value="JM" data-flag="jm">🇯🇲 Jamajka</option>
              <option value="JP" data-flag="jp">🇯🇵 Japonsko</option>
              <option value="JO" data-flag="jo">🇯🇴 Jordánsko</option>
              <option value="KZ" data-flag="kz">🇰🇿 Kazachstán</option>
              <option value="KE" data-flag="ke">🇰🇪 Keňa</option>
              <option value="KI" data-flag="ki">🇰🇮 Kiribati</option>
              <option value="KP" data-flag="kp">🇰🇵 Severní Korea</option>
              <option value="KR" data-flag="kr">🇰🇷 Jižní Korea</option>
              <option value="KW" data-flag="kw">🇰🇼 Kuvajt</option>
              <option value="KG" data-flag="kg">🇰🇬 Kyrgyzstán</option>
              <option value="LA" data-flag="la">🇱🇦 Laos</option>
              <option value="LV" data-flag="lv">🇱🇻 Lotyšsko</option>
              <option value="LB" data-flag="lb">🇱🇧 Libanon</option>
              <option value="LS" data-flag="ls">🇱🇸 Lesotho</option>
              <option value="LR" data-flag="lr">🇱🇷 Libérie</option>
              <option value="LY" data-flag="ly">🇱🇾 Libye</option>
              <option value="LI" data-flag="li">🇱🇮 Lichtenštejnsko</option>
              <option value="LT" data-flag="lt">🇱🇹 Litva</option>
              <option value="LU" data-flag="lu">🇱🇺 Lucembursko</option>
              <option value="MG" data-flag="mg">🇲🇬 Madagaskar</option>
              <option value="MW" data-flag="mw">🇲🇼 Malawi</option>
              <option value="MY" data-flag="my">🇲🇾 Malajsie</option>
              <option value="MV" data-flag="mv">🇲🇻 Maledivy</option>
              <option value="ML" data-flag="ml">🇲🇱 Mali</option>
              <option value="MT" data-flag="mt">🇲🇹 Malta</option>
              <option value="MH" data-flag="mh">🇲🇭 Marshallovy ostrovy</option>
              <option value="MR" data-flag="mr">🇲🇷 Mauritánie</option>
              <option value="MU" data-flag="mu">🇲🇺 Mauricius</option>
              <option value="MX" data-flag="mx">🇲🇽 Mexiko</option>
              <option value="FM" data-flag="fm">🇫🇲 Mikronésie</option>
              <option value="MD" data-flag="md">🇲🇩 Moldavsko</option>
              <option value="MC" data-flag="mc">🇲🇨 Monako</option>
              <option value="MN" data-flag="mn">🇲🇳 Mongolsko</option>
              <option value="ME" data-flag="me">🇲🇪 Černá Hora</option>
              <option value="MA" data-flag="ma">🇲🇦 Maroko</option>
              <option value="MZ" data-flag="mz">🇲🇿 Mosambik</option>
              <option value="MM" data-flag="mm">🇲🇲 Myanmar</option>
              <option value="NA" data-flag="na">🇳🇦 Namibie</option>
              <option value="NR" data-flag="nr">🇳🇷 Nauru</option>
              <option value="NP" data-flag="np">🇳🇵 Nepál</option>
              <option value="NL" data-flag="nl">🇳🇱 Nizozemsko</option>
              <option value="NZ" data-flag="nz">🇳🇿 Nový Zéland</option>
              <option value="NI" data-flag="ni">🇳🇮 Nikaragua</option>
              <option value="NE" data-flag="ne">🇳🇪 Niger</option>
              <option value="NG" data-flag="ng">🇳🇬 Nigérie</option>
              <option value="MK" data-flag="mk">🇲🇰 Severní Makedonie</option>
              <option value="NO" data-flag="no">🇳🇴 Norsko</option>
              <option value="OM" data-flag="om">🇴🇲 Omán</option>
              <option value="PK" data-flag="pk">🇵🇰 Pákistán</option>
              <option value="PW" data-flag="pw">🇵🇼 Palau</option>
              <option value="PS" data-flag="ps">🇵🇸 Palestina</option>
              <option value="PA" data-flag="pa">🇵🇦 Panama</option>
              <option value="PG" data-flag="pg">🇵🇬 Papua-Nová Guinea</option>
              <option value="PY" data-flag="py">🇵🇾 Paraguay</option>
              <option value="PE" data-flag="pe">🇵🇪 Peru</option>
              <option value="PH" data-flag="ph">🇵🇭 Filipíny</option>
              <option value="PL" data-flag="pl">🇵🇱 Polsko</option>
              <option value="PT" data-flag="pt">🇵🇹 Portugalsko</option>
              <option value="QA" data-flag="qa">🇶🇦 Katar</option>
              <option value="RO" data-flag="ro">🇷🇴 Rumunsko</option>
              <option value="RU" data-flag="ru">🇷🇺 Rusko</option>
              <option value="RW" data-flag="rw">🇷🇼 Rwanda</option>
              <option value="KN" data-flag="kn">🇰🇳 Svatý Kryštof a Nevis</option>
              <option value="LC" data-flag="lc">🇱🇨 Svatá Lucie</option>
              <option value="VC" data-flag="vc">🇻🇨 Svatý Vincenc a Grenadiny</option>
              <option value="WS" data-flag="ws">🇼🇸 Samoa</option>
              <option value="SM" data-flag="sm">🇸🇲 San Marino</option>
              <option value="ST" data-flag="st">🇸🇹 Svatý Tomáš a Princův ostrov</option>
              <option value="SA" data-flag="sa">🇸🇦 Saúdská Arábie</option>
              <option value="SN" data-flag="sn">🇸🇳 Senegal</option>
              <option value="RS" data-flag="rs">🇷🇸 Srbsko</option>
              <option value="SC" data-flag="sc">🇸🇨 Seychely</option>
              <option value="SL" data-flag="sl">🇸🇱 Sierra Leone</option>
              <option value="SG" data-flag="sg">🇸🇬 Singapur</option>
              <option value="SK" data-flag="sk">🇸🇰 Slovensko</option>
              <option value="SI" data-flag="si">🇸🇮 Slovinsko</option>
              <option value="SB" data-flag="sb">🇸🇧 Šalamounovy ostrovy</option>
              <option value="SO" data-flag="so">🇸🇴 Somálsko</option>
              <option value="ZA" data-flag="za">🇿🇦 Jihoafrická republika</option>
              <option value="SS" data-flag="ss">🇸🇸 Jižní Súdán</option>
              <option value="ES" data-flag="es">🇪🇸 Španělsko</option>
              <option value="LK" data-flag="lk">🇱🇰 Srí Lanka</option>
              <option value="SD" data-flag="sd">🇸🇩 Súdán</option>
              <option value="SR" data-flag="sr">🇸🇷 Surinam</option>
              <option value="SE" data-flag="se">🇸🇪 Švédsko</option>
              <option value="CH" data-flag="ch">🇨🇭 Švýcarsko</option>
              <option value="SY" data-flag="sy">🇸🇾 Sýrie</option>
              <option value="TJ" data-flag="tj">🇹🇯 Tádžikistán</option>
              <option value="TZ" data-flag="tz">🇹🇿 Tanzanie</option>
              <option value="TH" data-flag="th">🇹🇭 Thajsko</option>
              <option value="TL" data-flag="tl">🇹🇱 Východní Timor</option>
              <option value="TG" data-flag="tg">🇹🇬 Togo</option>
              <option value="TO" data-flag="to">🇹🇴 Tonga</option>
              <option value="TT" data-flag="tt">🇹🇹 Trinidad a Tobago</option>
              <option value="TN" data-flag="tn">🇹🇳 Tunisko</option>
              <option value="TR" data-flag="tr">🇹🇷 Turecko</option>
              <option value="TM" data-flag="tm">🇹🇲 Turkmenistán</option>
              <option value="TV" data-flag="tv">🇹🇻 Tuvalu</option>
              <option value="UG" data-flag="ug">🇺🇬 Uganda</option>
              <option value="UA" data-flag="ua">🇺🇦 Ukrajina</option>
              <option value="AE" data-flag="ae">🇦🇪 Spojené arabské emiráty</option>
              <option value="GB" data-flag="gb">🇬🇧 Velká Británie</option>
              <option value="US" data-flag="us">🇺🇸 Spojené státy americké</option>
              <option value="UY" data-flag="uy">🇺🇾 Uruguay</option>
              <option value="UZ" data-flag="uz">🇺🇿 Uzbekistán</option>
              <option value="VU" data-flag="vu">🇻🇺 Vanuatu</option>
              <option value="VA" data-flag="va">🇻🇦 Vatikán</option>
              <option value="VE" data-flag="ve">🇻🇪 Venezuela</option>
              <option value="VN" data-flag="vn">🇻🇳 Vietnam</option>
              <option value="YE" data-flag="ye">🇾🇪 Jemen</option>
              <option value="ZM" data-flag="zm">🇿🇲 Zambie</option>
              <option value="ZW" data-flag="zw">🇿🇼 Zimbabwe</option>
          </select>
    
          <h3>Datum Narození</h3>
          <input
            type="date"
            v-model="date"
            min="1945-01-01"
            max="2007-12-31"
            required
          >
          <h3>Bývalé Zaměstnání</h3>
          <select id="lastwork" v-model="lastwork" name="lastwork" required>
              <option value="nothing">-- Vyberte zkušenosti --</option>
              <option value="none">Žádné</option>
              <option value="manager">Manažer</option>
              <option value="mechanik">Mechanik</option>
              <option value="zavodnik">Závodník</option>
              <option value="inzenyr">Závodní inženýr</option>
              <option value="strategr">Stratég týmu</option>
              <option value="analytik">Datový analytik</option>
              <option value="pitcrew">Člen pit stop týmu</option>
              <option value="pr">PR / Média manažer</option>
              <option value="scout">Talent scout</option>
              <option value="trenér">Trenér jezdců</option>
          </select>
        </div>
        <div class="inputsright">
          <h3>Avatar</h3>
           <select id="gender" name="gender" v-model="selectedGender" required>
            <option value="nothing">-- Vyberte pohlaví --</option>
            <option value="men">Muž</option>
            <option value="women">Žena</option>
          </select>
          <h3>Vyberte avatara</h3>
          <div class="avatarchooser">

              <div class="avatarchooseicon"   
                  v-for="(males) in righticon" 
                  :key="males.type">
                  <input type="radio" :name="`avatar`" :value="`${males.type}`" :id="`${males.type}`" v-model="avatar">
                  <label :for="`${males.type}`" ><img :src="`${males.road}`" :alt="`${males.type}`"></label>
              </div>
          </div>
        
         
        </div>
      </div>

  
      
      <button @click="switchToTeams" class="menu-button next">
        Vyberte Team
      </button>
      

  </div>
  </div>

</template>

<script setup>
const sound = useClickSound(); 
const name = ref('');
const surname = ref('');
const nationality = ref('nothing');
const date = ref('');

const lastwork = ref('nothing');
const avatar = ref('');

const selectedGender = ref('nothing')
const selectedAvatar = ref('')

const filterLettersOnly = (field) => {
  if (field === 'name') {
    name.value = name.value.replace(/[^A-Za-zÁ-Žá-žůŮ ]/g, '')
  } else if (field === 'surname') {
    surname.value = surname.value.replace(/[^A-Za-zÁ-Žá-žůŮ ]/g, '')
  }
}

const men = ref([
  {road: "/images/icons/men/01.svg", type: 1},
  {road: "/images/icons/men/02.svg", type: 2},
  {road: "/images/icons/men/03.svg", type: 3},
  {road: "/images/icons/men/04.svg", type: 4},
  {road: "/images/icons/men/05.svg", type: 5}
  //{road: "/images/icons/men/06.svg", type: 6}
])

const women = ref([
  {road: "/images/icons/women/06.svg", type: 6},
  {road: "/images/icons/women/07.svg", type: 7},
  {road: "/images/icons/women/08.svg", type: 8},
  {road: "/images/icons/women/09.svg", type: 9},
  {road: "/images/icons/women/10.svg", type: 10},
])

const righticon = computed(() => {
  if (selectedGender.value === 'men') {
    return men.value  
  } else if (selectedGender.value === 'women') {
    return women.value 
  }
  return [] 
})

watch(selectedGender, () => {
  selectedAvatar.value = ''
})





const switchLayout = inject('switchLayout')

onMounted(() => {
  switchLayout('charcreate')
})

const switchToTeams = () => { 
  sound.play()
  if(name.value === '' || surname.value === '' || nationality.value === 'nothing' || date.value === '' ||  lastwork.value === 'nothing' || selectedGender.value === 'nothing' || avatar.value === '') {
    alert('Vyplňte prosím všechna pole!')
    return;
  }
  
  $fetch("/api/manager/fullman", {
    method: "PATCH",
    body: {
      name: name.value,
      surname: surname.value,
      nationality: nationality.value,
      date: date.value,
      lastwork: lastwork.value,
      SelectedGender: selectedGender.value,
      selectedAvatar: avatar.value,
      team: 'NULL',
      day: 1,
      NumLimit: 1
    }
  });
  
  navigateTo('teams')
}
</script>
