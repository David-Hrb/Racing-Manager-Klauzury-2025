export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);
    const db = useDatabase("myDB");
    const result = await db.sql`
        INSERT INTO calendar (
            track, date, raced, winner, 
            winnerteam, secondplace, secondteam, thirdplace, thirdteam
        ) VALUES (
            ${requestBody.track}, ${requestBody.date}, ${requestBody.raced}, ${requestBody.winner},
            ${requestBody.winnerteam}, ${requestBody.secondplace}, ${requestBody.secondteam},
            ${requestBody.thirdplace}, ${requestBody.thirdteam}
        ) RETURNING *;
    `;
        
        return result;
})
