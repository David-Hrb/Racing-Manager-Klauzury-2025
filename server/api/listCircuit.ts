export default defineEventHandler( async(event) =>{
    
    const db = useDatabase("myDB");

    const team = await db.sql`SELECT * FROM circuits`

    return team.rows;

   
})