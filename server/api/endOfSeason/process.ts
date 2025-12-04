export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    
    const { newSeason, calendarItems, leadboardUpdates, teamUpdates } = body;
    const db = useDatabase("myDB");

    try {
        await db.sql`BEGIN IMMEDIATE TRANSACTION`;

        await db.sql`UPDATE manager SET season = ${newSeason}`;

        await db.sql`UPDATE manager SET day = 1`;

        await db.sql`UPDATE leadboard SET points = 0`;

        await db.sql`DELETE FROM calendar`;
        
        for (const item of calendarItems) {
            await db.sql`
                INSERT INTO calendar (
                    track, date, raced, winner, 
                    winnerteam, secondplace, secondteam, thirdplace, thirdteam
                ) VALUES (
                    ${item.track}, ${item.date}, ${item.raced}, ${item.winner},
                    ${item.winnerteam}, ${item.secondplace}, ${item.secondteam},
                    ${item.thirdplace}, ${item.thirdteam}
                )
            `;
        }

        for (const { id, data } of teamUpdates) {
            if (data.money !== undefined) {
                const ruleKey = Object.keys(data).find((k: string) => k !== 'money');
                const ruleValue = data[ruleKey as string];
                
                await db.sql`
                    UPDATE teams SET 
                        money = ${data.money},
                        aerodynamics = CASE WHEN ${ruleKey} = 'aerodynamics' THEN ${ruleValue} ELSE aerodynamics END,
                        gearbox = CASE WHEN ${ruleKey} = 'gearbox' THEN ${ruleValue} ELSE gearbox END,
                        brakes = CASE WHEN ${ruleKey} = 'brakes' THEN ${ruleValue} ELSE brakes END,
                        frontwing = CASE WHEN ${ruleKey} = 'frontwing' THEN ${ruleValue} ELSE frontwing END,
                        rearwing = CASE WHEN ${ruleKey} = 'rearwing' THEN ${ruleValue} ELSE rearwing END,
                        reliability = CASE WHEN ${ruleKey} = 'reliability' THEN ${ruleValue} ELSE reliability END
                    WHERE ID = ${id}
                `;
            } else {

                await db.sql`
                    UPDATE teams SET 
                        aerodynamics = ${data.aerodynamics},
                        gearbox = ${data.gearbox},
                        brakes = ${data.brakes},
                        frontwing = ${data.frontwing},
                        rearwing = ${data.rearwing},
                        reliability = ${data.reliability}
                    WHERE ID = ${id}
                `;
            }
        }

        await db.sql`COMMIT`;
        
        return { success: true };
        
    } catch (error: any) {
        await db.sql`ROLLBACK`;
        console.error('End of season error:', error);
        
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to process end of season'
        });
    }
});