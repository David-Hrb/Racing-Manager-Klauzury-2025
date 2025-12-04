export default defineEventHandler(async (event) => {
    const db = useDatabase("myDB");

    const leadboard = await db.sql`SELECT * FROM leadboard`; 

    return leadboard.rows;

})
