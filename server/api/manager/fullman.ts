export default defineEventHandler(async (event) => {
    const id = 1; 
    const method = event.method;
    
    console.log('Method:', method, 'ID:', id);
    
    const db = useDatabase("myDB");
    
    if (method === 'PUT' || method === 'PATCH') {
        try {
            const requestBody = await readBody(event);
            
            const result = await db.sql`
                UPDATE Manager SET 
                    name = ${requestBody.name},
                    surname = ${requestBody.surname},
                    nationality = ${requestBody.nationality},
                    date = ${requestBody.date},
                    lastwork = ${requestBody.lastwork},
                    SelectedGender = ${requestBody.SelectedGender},
                    selectedAvatar = ${requestBody.selectedAvatar},
                    day = ${requestBody.day},
                    NumLimit = ${requestBody.NumLimit}
                WHERE id = ${id}
                RETURNING *;
            `;
            
            return result;
        } catch (error) {
            throw createError({
                statusCode: 500,
                message: error instanceof Error ? error.message : 'Chyba při aktualizaci profilu'
            });
        }
    }

    throw createError({
        statusCode: 405,
        message: `Metoda ${method} není podporována`
    });
});