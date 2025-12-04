export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
    const db = useDatabase("myDB");
    await db.sql`CREATE TABLE IF NOT EXISTS Manager
    (
        name TEXT NOT NULL,
        surname TEXT NOT NULL,
        nationality TEXT NOT NULL,
        date TEXT NOT NULL,
        lastwork TEXT NOT NULL,
        SelectedGender TEXT NOT NULL,
        selectedAvatar INTEGER,
        team INTEGER
    )
    `;

    const result = await db.sql`INSERT INTO Manager (name, surname, nationality, date, lastwork, SelectedGender, selectedAvatar, team) VALUES (${requestBody.name}, ${requestBody.surname}, ${requestBody.nationality}, ${requestBody.date}, ${requestBody.lastwork}, ${requestBody.SelectedGender}, ${requestBody.selectedAvatar}, ${requestBody.team}) RETURNING *;`;    
})
