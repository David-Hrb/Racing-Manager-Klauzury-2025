export default defineEventHandler( async(event) =>{
    
    const db = useDatabase("myDB");

    const drivers = await db.sql`SELECT * FROM drivers`

    return drivers.rows;

   
})