export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);
    const db = useDatabase("myDB");

    await db.sql`CREATE TABLE IF NOT EXISTS leadboard
    (
        driverID INTEGER PRIMARY KEY AUTOINCREMENT,
        points INTEGER NOT NULL

    )`;

    const result = await db.sql`
        INSERT INTO leadboard (
            points
        ) VALUES (
            ${requestBody.points}
        ) RETURNING *;
    `;

    return result;
});
