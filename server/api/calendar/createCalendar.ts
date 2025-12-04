export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);
    const db = useDatabase("myDB");

    await db.sql`CREATE TABLE IF NOT EXISTS calendar
    (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        track INTEGER NOT NULL,
        date INTEGER NOT NULL,
        raced INTEGER NOT NULL,
        poleposition INTEGER,
        polepositionteam INTEGER,
        winner INTEGER,
        winnerteam INTEGER,
        secondplace INTEGER,
        secondteam INTEGER,
        thirdplace INTEGER,
        thirdteam INTEGER
    )`;

    const result = await db.sql`
    INSERT INTO calendar (
        track, date, raced, poleposition, polepositionteam, winner, 
        winnerteam, secondplace, secondteam, thirdplace, thirdteam
    ) VALUES (
        ${requestBody.track}, ${requestBody.date}, ${requestBody.raced},
        ${requestBody.poleposition}, ${requestBody.polepositionteam}, ${requestBody.winner},
        ${requestBody.winnerteam}, ${requestBody.secondplace}, ${requestBody.secondteam},
        ${requestBody.thirdplace}, ${requestBody.thirdteam}
    ) RETURNING *;
`;
    
    return result;
});
