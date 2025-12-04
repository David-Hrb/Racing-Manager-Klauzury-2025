export default defineEventHandler(async (event) => {
    const db = useDatabase("myDB");

    const manager = await db.sql`SELECT * FROM Manager WHERE id = 1` 

    return manager.rows;

})
