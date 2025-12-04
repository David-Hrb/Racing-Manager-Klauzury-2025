export default defineEventHandler(async (event) => {
    const db = useDatabase("myDB");

    const manager = await db.sql`SELECT day FROM Manager WHERE id = 1` 
    

    return manager;

})
