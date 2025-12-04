export default defineEventHandler(async (event) => {
    const db = useDatabase("myDB");

    await db.sql`DELETE FROM calendar`;
    await db.sql`DELETE FROM sqlite_sequence WHERE name='calendar'`;
    
    return { message: "All calendar entries deleted successfully." };

})
