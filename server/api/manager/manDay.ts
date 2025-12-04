export default defineEventHandler(async (event) => {
    const id = 1;
    const method = event.method;
    
    console.log('Method:', method, 'ID:', id);
    
    const db = useDatabase("myDB");
    if (method === 'PUT' || method === 'PATCH') {
        const requestBody = await readBody(event);
        try {       
            const result = await db.sql`
                UPDATE Manager SET day = 1, season = ${requestBody.season}
                WHERE id = ${id}
                RETURNING *;
            `;
            
            return result;
        } catch (error) {
            throw createError({
                statusCode: 500,
                message: error instanceof Error ? error.message : 'Chyba při aktualizaci'
            });
        }
    }
});