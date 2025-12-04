export function useRaceEvents() {
  function createEvent(eventType, data) {
    const raceinfo = {
        "overtake": {
            "0": "Jezdec",
            "1": 0,
            "2": "z týmu",
            "3": 1,
            "4": "předjíždí jezdce",
            "5": 2,
            "6": "z týmu",
            "7": 3
        },
        "leading": {
            "0": "Jezdec",
            "1": 0,
            "2": "z týmu",
            "3": 1,
            "4": "nyní vede závod!"
        },
        "pitstop": {
            "0": "Jezdec",
            "1": 0,
            "2": "z týmu",
            "3": 1,
            "4": "zajíždí do boxů",
            "5": "a v boxech vyměnil pneumatiky na",
            "6": 2,
            "7": "tyre"
        },
        "retirement_engine": {
            "0": "Jezdec",
            "1": 0,
            "2": "z týmu",
            "3": 1,
            "4": "končí díky poruše motoru"
        },
        "retirement_crash": {
            "0": "Jezdec",
            "1": 0,
            "2": "z týmu",
            "3": 1,
            "4": "havaroval a musí odstoupit ze závodu"
        },
        "fastest_lap": {
            "0": "Jezdec",
            "1": 0,
            "2": "z týmu",
            "3": 1,
            "4": "zajel nejrychlejší kolo v čase",
            "5": 2
        },
        "position_gain": {
            "0": "Jezdec",
            "1": 0,
            "2": "poskočil na",
            "3": 2,
            "4": "pozici"
        },
        "battle": {
            "0": "Jezdec",
            "1": 0,
            "2": "a",
            "3": 1,
            "4": "bojují o",
            "5": 2,
            "6": "místo"
        },

        "final_lap": {
            "0": "Poslední kolo! Jezdec",
            "1": 0,
            "2": "vede před",
            "3": 1
        },
        "contact": {
            "0": "Kontakt mezi jezdcem",
            "1": 0,
            "2": "a",
            "3": 1,
            "4": "v zatáčce",
            "5": 2
        }
    }
    
    const template = raceinfo[eventType];
    if (!template) {
      console.log(`Event type '${eventType}' not found in raceinfo`);
      return [];
    }

    const eventMessage = [];
    
    for (let i = 0; i < Object.keys(template).length; i++) {
      const key = i.toString();
      const value = template[key];
      
      if (isNaN(value)) {
        eventMessage.push(value);
      } else {
        switch(value) {
          case 0:
            eventMessage.push(data.driver1Name || data.driver1Id || '');
            break;
          case 1:
            eventMessage.push(data.driver1Team || data.driver2Name || data.driver2Id || '');
            break;
          case 2:
            eventMessage.push(data.driver2Name || data.driver2Id || data.position || data.time || data.tyre || data.corner || '');
            break;
          case 3:
            eventMessage.push(data.driver2Team || data.reason || '');
            break;
          default:
            eventMessage.push('');
        }
      }
    }
    
    return eventMessage;
  }

  return {
    createEvent
  };
}