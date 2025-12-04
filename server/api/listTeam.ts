export default defineEventHandler( async(event) =>{
    
    const db = useDatabase("myDB");

    const team = await db.sql`SELECT * FROM teams`

    return team.rows;

   
})