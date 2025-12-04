export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);
    const db = useDatabase("myDB");
    
    await db.sql`CREATE TABLE IF NOT EXISTS drivers
    (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        nationality TEXT NOT NULL,
        bornyear INTEGER NOT NULL,
        avatar INTEGER,
        currentteam INTEGER,
        championshipplace INTEGER,
        racestart INTEGER,
        concentration INTEGER,
        overtaking INTEGER,
        experience INTEGER,
        quickness INTEGER,
        stamina INTEGER,
        formerteams TEXT,
        contractexp INTEGER,
        fee INTEGER,
        payeddriver TEXT,
        contractrequirements INTEGER,
        championship INTEGER,
        wins INTEGER,
        podiums INTEGER,
        bestcarfinish INTEGER,
        popularity INTEGER,
        ego INTEGER,
        prmanagement INTEGER,
        injured TEXT
    )`;

    const result = await db.sql`
        INSERT INTO drivers (
            name, nationality, bornyear, avatar, currentteam, championshipplace,
            racestart, concentration, overtaking, experience, quickness, stamina,
            formerteams, contractexp, fee, payeddriver, contractrequirements,
            championship, wins, podiums, bestcarfinish, popularity, ego,
            prmanagement, injured
        ) VALUES (
            ${requestBody.name}, ${requestBody.nationality}, ${requestBody.bornyear},
            ${requestBody.avatar}, ${requestBody.currentteam}, ${requestBody.championshipplace},
            ${requestBody.racestart}, ${requestBody.concentration}, ${requestBody.overtaking},
            ${requestBody.experience}, ${requestBody.quickness}, ${requestBody.stamina},
            ${requestBody.formerteams}, ${requestBody.contractexp}, ${requestBody.fee},
            ${requestBody.payeddriver}, ${requestBody.contractrequirements},
            ${requestBody.championship}, ${requestBody.wins}, ${requestBody.podiums},
            ${requestBody.bestcarfinish}, ${requestBody.popularity}, ${requestBody.ego},
            ${requestBody.prmanagement}, ${requestBody.injured}
        ) RETURNING *;
    `;
    
    return result;
});