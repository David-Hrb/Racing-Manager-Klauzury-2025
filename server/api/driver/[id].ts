export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const method = event.method;
    
    console.log('Method DRIVER:', method, 'ID:', id);
    
    const db = useDatabase("myDB");

    if (method === 'GET') {
        const result = await db.sql`SELECT * FROM drivers WHERE ID = ${id}`;
        return result;
    }

    if (method === 'PUT' || method === 'PATCH') {
        try {
            const requestBody = await readBody(event);
            
            //console.log('Request body:', requestBody);
            
            const current = await db.sql`SELECT * FROM drivers WHERE ID = ${id}`;
            
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
                    message: 'Jezdec nebyl nalezen'
                });
            }

            const updated = { ...currentData, ...requestBody };
            
           //console.log('Updated data:', updated);

            const result = await db.sql`
                UPDATE drivers SET
                    name = ${updated.name},
                    nationality = ${updated.nationality},
                    bornyear = ${updated.bornyear},
                    avatar = ${updated.avatar},
                    currentteam = ${updated.currentteam},
                    championshipplace = ${updated.championshipplace},
                    racestart = ${updated.racestart},
                    concentration = ${updated.concentration},
                    overtaking = ${updated.overtaking},
                    experience = ${updated.experience},
                    quickness = ${updated.quickness},
                    stamina = ${updated.stamina},
                    formerteams = ${updated.formerteams},
                    contractexp = ${updated.contractexp},
                    fee = ${updated.fee},
                    payeddriver = ${updated.payeddriver},
                    contractrequirements = ${updated.contractrequirements},
                    championship = ${updated.championship},
                    wins = ${updated.wins},
                    podiums = ${updated.podiums},
                    bestcarfinish = ${updated.bestcarfinish},
                    popularity = ${updated.popularity},
                    ego = ${updated.ego},
                    prmanagement = ${updated.prmanagement},
                    injured = ${updated.injured}
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