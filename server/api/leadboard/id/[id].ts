export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const method = event.method;
    const db = useDatabase("myDB");

    if (method === 'PUT' || method === 'PATCH') {
        try {
            const requestBody = await readBody(event);
            
            const result = await db.sql`
                UPDATE leadboard SET points = ${requestBody.points}
                WHERE driverID = ${id}
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

    throw createError({
        statusCode: 405,
        message: `Metoda ${method} není podporována`
    });

});