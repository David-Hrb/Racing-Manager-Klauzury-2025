export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const method = event.method;
    
    console.log('Method CALENDAR:', method, 'ID:', id);
    
    const db = useDatabase("myDB");

    if (method === 'GET') {
        const result = await db.sql`SELECT * FROM calendar WHERE ID = ${id}`;
        return result;
    }

    if (method === 'PUT' || method === 'PATCH') {
        try {
            const requestBody = await readBody(event);
            
            //console.log('Request body:', requestBody);
            
            const current = await db.sql`SELECT * FROM calendar WHERE ID = ${id}`;
            
            //console.log('Current data:', current);
            
            let currentData;
            if (Array.isArray(current) && current.length > 0) {
                currentData = current[0];
            } else if (current.rows && current.rows.length > 0) {
                currentData = current.rows[0];
            } else {
                currentData = current;
            }

            //console.log('Parsed current data:', currentData);
            
            if (!currentData || !currentData.ID) {
                throw createError({
                    statusCode: 404,
                    message: 'Záznam nebyl nalezen'
                });
            }

            const updated = { ...currentData, ...requestBody };
            
            //console.log('Updated data:', updated);

            const result = await db.sql`
                UPDATE calendar SET
                    track = ${updated.track},
                    date = ${updated.date},
                    raced = ${updated.raced},
                    winner = ${updated.winner},
                    winnerteam = ${updated.winnerteam},
                    secondplace = ${updated.secondplace},
                    secondteam = ${updated.secondteam},
                    thirdplace = ${updated.thirdplace},
                    thirdteam = ${updated.thirdteam}
                WHERE ID = ${id}
                RETURNING *
            `;
            
            //console.log('Update result:', result);

            return result;
        } catch (error) {
            console.error('Update error:', error);
        }
    }

});