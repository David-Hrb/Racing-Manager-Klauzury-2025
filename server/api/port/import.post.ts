export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDatabase("myDB");

  try {
    await db.sql`BEGIN TRANSACTION`;

    await db.sql`DELETE FROM drivers`;
    await db.sql`DELETE FROM calendar`;
    await db.sql`DELETE FROM circuits`;
    await db.sql`DELETE FROM manager`;
    await db.sql`DELETE FROM teams`;
    await db.sql`DELETE FROM leadboard`;

    for (const driver of body.drivers || []) {
      await db.sql`INSERT INTO drivers (
        id, name, nationality, bornyear, avatar, currentteam, championshipplace,
        racestart, concentration, overtaking, experience, quickness, stamina,
        formerteams, contractexp, fee, payeddriver, contractrequirements,
        championship, wins, podiums, bestcarfinish, popularity, ego, prmanagement, injured
      ) VALUES (
        ${driver.ID}, ${driver.name}, ${driver.nationality}, ${driver.bornyear},
        ${driver.avatar}, ${driver.currentteam}, ${driver.championshipplace},
        ${driver.racestart}, ${driver.concentration}, ${driver.overtaking},
        ${driver.experience}, ${driver.quickness}, ${driver.stamina},
        ${driver.formerteams}, ${driver.contractexp}, ${driver.fee},
        ${driver.payeddriver}, ${driver.contractrequirements}, ${driver.championship},
        ${driver.wins}, ${driver.podiums}, ${driver.bestcarfinish},
        ${driver.popularity}, ${driver.ego}, ${driver.prmanagement}, ${driver.injured}
      )`;
    }

    for (const team of body.teams || []) {
      await db.sql`INSERT INTO teams (
        id, name, nationality, color1, color2, color3, creationyear, logo,
        driverpolitics, driver1, driver2, testdriver, sponzor1, sponzor2, sponzor3,
        championshipplace, aerodynamics, gearbox, brakes, rearwing, frontwing,
        reliability, historytitles, historywins, historypodiums, fanspopularity, money
      ) VALUES (
        ${team.ID}, ${team.name}, ${team.nationality}, ${team.color1},
        ${team.color2}, ${team.color3}, ${team.creationyear}, ${team.logo},
        ${team.driverpolitics}, ${team.driver1}, ${team.driver2}, ${team.testdriver},
        ${team.sponzor1}, ${team.sponzor2}, ${team.sponzor3}, ${team.championshipplace},
        ${team.aerodynamics}, ${team.gearbox}, ${team.brakes}, ${team.rearwing},
        ${team.frontwing}, ${team.reliability}, ${team.historytitles},
        ${team.historywins}, ${team.historypodiums}, ${team.fanspopularity}, ${team.money}
      )`;
    }

    for (const circuit of body.circuits || []) {
      await db.sql`INSERT INTO circuits (
        id, name, nationality, town, type, length, normallaptime, lapslength,
        numberofturns, sectors, minisectors1, minisectors2, minisectors3,
        pitstoptime, pitstopspeed, DRSzones, overtaking, besttime, polepositionvalue
      ) VALUES (
        ${circuit.ID}, ${circuit.name}, ${circuit.nationality}, ${circuit.town},
        ${circuit.type}, ${circuit.length}, ${circuit.normallaptime}, ${circuit.lapslength},
        ${circuit.numberofturns}, ${circuit.sectors}, ${circuit.minisectors1},
        ${circuit.minisectors2}, ${circuit.minisectors3}, ${circuit.pitstoptime},
        ${circuit.pitstopspeed}, ${circuit.DRSzones}, ${circuit.overtaking},
        ${circuit.besttime}, ${circuit.polepositionvalue}
      )`;
    }

    for (const calEvent of body.calendar || []) {
      await db.sql`INSERT INTO calendar (
        id, track, date, raced, winner, winnerteam, secondplace, secondteam, thirdplace, thirdteam
      ) VALUES (
        ${calEvent.ID}, ${calEvent.track}, ${calEvent.date}, ${calEvent.raced},
        ${calEvent.winner}, ${calEvent.winnerteam}, ${calEvent.secondplace},
        ${calEvent.secondteam}, ${calEvent.thirdplace}, ${calEvent.thirdteam}
      )`;
    }

    for (const entry of body.leadboard || []) {
      await db.sql`INSERT INTO leadboard (driverID, points) 
        VALUES (${entry.driverID}, ${entry.points})`;
    }

    const managerData = Array.isArray(body.manager) ?  body.manager[0] : body.manager;
    if (managerData) {
      await db.sql`INSERT INTO manager (
        name, surname, nationality, date, lastwork, SelectedGender, selectedAvatar, team, id, season, day, NumLimit
      ) VALUES (
        ${managerData.name}, ${managerData.surname}, ${managerData.nationality},
        ${managerData.date}, ${managerData.lastwork}, ${managerData.SelectedGender},
        ${managerData.selectedAvatar}, ${managerData.team}, ${managerData.id}, ${managerData.season}, ${managerData.day}, ${managerData.NumLimit}
      )`;
    }

    await db.sql`COMMIT`;

    return { success: true };

  } catch (error) {
    await db.sql`ROLLBACK`;
    console.error('Import error:', error);
    throw createError({
      statusCode: 500,
      message: 'Import se nezdařil: ' 
    });
  }
});