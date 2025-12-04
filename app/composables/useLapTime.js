export const useLapTime = () => {

  
  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getRandomFloat = (min, max) => {
    return Math.random() * (max - min) + min;
  }


  const calculateLapTime = (stats) => {
    const {
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
      tyretype
    } = stats;

    let basespeed = quickness + concentration + stamina * 1.8;
    let cornerspeed = turns * (aerodynamics + frontwing + brakes) * 2.7;
    let straightspeed = drszones * (gearbox + rearwing) * 3.5;
    let overtakefactor = 0;
    let mistakemultiplier = 0;
    let pneudegradation = degradation;
    let crash = false;
    switch(tyretype) {
      case 0:
        basespeed = basespeed * 1;
        cornerspeed = cornerspeed * 1.25;
        straightspeed = straightspeed * 1.1;
        break;
      case 1:
        basespeed = basespeed * 1;
        cornerspeed = cornerspeed * 1.1;
        straightspeed = straightspeed * 1.1;
        break;
      case 2:
        basespeed = basespeed * 1;
        cornerspeed = cornerspeed * 0.9;
        straightspeed = straightspeed * 1;
        break;
      case 3:
        basespeed = basespeed * 0.8;
        cornerspeed = cornerspeed * 0.8;
        straightspeed = straightspeed * 0.8;
        break;
      case 4:
        basespeed = basespeed * 0.7;
        cornerspeed = cornerspeed * 0.7;
        straightspeed = straightspeed * 0.7;
        break;
    }

    const randomnum = getRandomInteger(0, 100);

    if (randomnum < 30) {
      mistakemultiplier = getRandomFloat(0, 1);
    } else if (randomnum < 60) {
      mistakemultiplier = getRandomFloat(1, 2);
    } else if (randomnum < 80) {
      mistakemultiplier = getRandomFloat(2, 3);
    } else if (randomnum < 90) {
      mistakemultiplier = getRandomFloat(3, 4);
    } else if (randomnum < 98) {
      mistakemultiplier = getRandomFloat(4, 5);
    } else {
      mistakemultiplier = getRandomFloat(5, 10);
      const crashchance = getRandomInteger(0, 100);
      console.log(crashchance);
      if (crashchance < 10) {crash = true};
    }

    const mistake = Math.round((mistakemultiplier / experience) * 1000);

    const laptime =
      basetime -
      basespeed / 300 -
      cornerspeed / 3500 -
      straightspeed / 800 +
      overtakefactor +
      mistake / 50 +
      pneudegradation / 100 ;

    return {
      laptime,
      crash,
      mistake,
      mistakemultiplier,
      details: {
        basespeed,
        cornerspeed,
        straightspeed,
        pneudegradation
      }
    };
  };
  console.log(calculateLapTime, "composables");
  return {
    calculateLapTime
  };
};
