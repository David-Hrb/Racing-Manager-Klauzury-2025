export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);
    const db = useDatabase("myDB");
    

    await db.sql`CREATE TABLE IF NOT EXISTS teams
    (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        nationality TEXT NOT NULL,
        color1 TEXT NOT NULL,
        color2 TEXT NOT NULL,
        color3 TEXT NOT NULL,
        creationyear INTEGER NOT NULL,
        logo INTEGER SECUNDARY KEY,
        driverpolitics INTEGER,
        driver1 INTEGER,
        driver2 INTEGER,
        testdriver INTEGER,
        sponzor1 INTEGER,
        sponzor2 INTEGER,
        sponzor3 INTEGER,
        championshipplace INTEGER,
        aerodynamics INTEGER,
        gearbox INTEGER,
        brakes INTEGER,
        rearwing INTEGER,
        frontwing INTEGER,
        reliability INTEGER,
        historytitles INTEGER,
        historywins INTEGER,
        historypodiums INTEGER,
        fanspopularity INTEGER
    )`;


    const result = await db.sql`
        INSERT INTO teams (
            name, nationality, color1, color2, color3, creationyear, logo, 
            driverpolitics, driver1, driver2, testdriver, sponzor1, sponzor2, sponzor3,
            championshipplace, aerodynamics, gearbox, brakes, rearwing, frontwing, 
            reliability, historytitles, historywins, historypodiums, fanspopularity
        ) VALUES (
            ${requestBody.name}, ${requestBody.nationality}, ${requestBody.color1}, 
            ${requestBody.color2}, ${requestBody.color3}, ${requestBody.creationyear}, 
            ${requestBody.logo}, ${requestBody.driverpolitics}, ${requestBody.driver1}, 
            ${requestBody.driver2}, ${requestBody.testdriver}, ${requestBody.sponzor1}, 
            ${requestBody.sponzor2}, ${requestBody.sponzor3}, ${requestBody.championshipplace}, 
            ${requestBody.aerodynamics}, ${requestBody.gearbox}, ${requestBody.brakes}, 
            ${requestBody.rearwing}, ${requestBody.frontwing}, ${requestBody.reliability}, 
            ${requestBody.historytitles}, ${requestBody.historywins}, ${requestBody.historypodiums}, 
            ${requestBody.fanspopularity}
        ) RETURNING *;
    `;
    
    return result
});