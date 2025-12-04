export default defineEventHandler( async(event) =>{
    
    const db = useDatabase("myDB");

    const logos = await db.sql`SELECT * FROM logo`

    return logos.rows;

   
})