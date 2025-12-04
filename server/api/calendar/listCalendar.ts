export default defineEventHandler(async (event) => {
    const db = useDatabase("myDB");

    const calendar = await db.sql`SELECT * FROM calendar` 

    return calendar.rows;

})
