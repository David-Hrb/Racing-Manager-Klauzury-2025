export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);
    const db = useDatabase("myDB");
    
    await db.sql`CREATE TABLE IF NOT EXISTS circuits
    (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        nationality TEXT NOT NULL,
        town TEXT NOT NULL,
        type INTEGER NOT NULL,
        length INTEGER NOT NULL,
        normallaptime INTEGER NOT NULL,
        lapslength INTEGER NOT NULL,
        numberofturns INTEGER NOT NULL,
        sectors INTEGER NOT NULL,
        minisectors1 INTEGER NOT NULL,
        minisectors2 INTEGER NOT NULL,
        minisectors3 INTEGER NOT NULL,
        pitstoptime INTEGER NOT NULL,
        pitstopspeed INTEGER NOT NULL,
        DRSzones INTEGER NOT NULL,
        overtaking INTEGER NOT NULL,
        besttime INTEGER NOT NULL,
        polepositionvalue INTEGER NOT NULL
    )`;

    const result = await db.sql`
        INSERT INTO circuits (
            name, nationality, town, type, length, normallaptime,
            lapslength, numberofturns, sectors, minisectors1, minisectors2,
            minisectors3, pitstoptime, pitstopspeed, DRSzones, overtaking,
            besttime, polepositionvalue
        ) VALUES (
            ${requestBody.name}, ${requestBody.nationality}, ${requestBody.town},
            ${requestBody.type}, ${requestBody.length}, ${requestBody.normallaptime},
            ${requestBody.lapslength}, ${requestBody.numberofturns}, ${requestBody.sectors},
            ${requestBody.minisectors1}, ${requestBody.minisectors2}, ${requestBody.minisectors3},
            ${requestBody.pitstoptime}, ${requestBody.pitstopspeed}, ${requestBody.DRSzones},
            ${requestBody.overtaking}, ${requestBody.besttime}, ${requestBody.polepositionvalue}
        ) RETURNING *;
    `;
    
    return result;
});
