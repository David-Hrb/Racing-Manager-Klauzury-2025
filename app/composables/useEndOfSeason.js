export const useEndOfSeason = () => {
    const { updateLeadboard } = useLeadBoardsApi();
    const { updateTeam } = useTeamsApi();
    const { getRandomInteger } = UseInteger();
    const { getSponsor } = useSponsors();
    
    const changeRules = ["aerodynamics", "gearbox", "brakes", "frontwing", "rearwing", "reliability"];
    const changes = ref([]);
    let manTeamExp = ref([]);

    async function checkTeamsOverLimit() {
        let teamsList = await $fetch('/api/listTeam');
        let updates = [];

        for (const team of teamsList) {
            let updateNeeded = false;
            const keys = ["aerodynamics", "gearbox", "brakes", "frontwing", "rearwing", "reliability"];
            const updatedTeam = { ...team };

            for (const key of keys) {
                if (updatedTeam[key] > 100) {
                    updatedTeam[key] = 100;
                    updateNeeded = true;
                }
            }

            if (updateNeeded) {
                updates.push(
                    $fetch(`/api/teams/${team.ID}`, {
                        method: "PUT",
                        body: updatedTeam,
                    })
                );
            }
        }

        if (updates.length > 0) {
            await Promise.all(updates);
        }
        
        return await $fetch('/api/listTeam');
    }

    async function checkDriverContractExp() {
        const [drivers, manager, teams] = await Promise.all([
            $fetch('/api/listDriver'),
            $fetch('/api/manager/listManager'),
            $fetch('/api/listTeam')
        ]);
        
        function calculateTeamRating(team) {
            const teamRatings = [
                team.aerodynamics,
                team.gearbox,
                team.brakes,
                team.frontwing,
                team.rearwing,
                team.reliability
            ];
            return teamRatings.reduce((sum, rating) => sum + rating, 0) / teamRatings.length;
        }
        
        function calculateDriverRating(driver) {
            const driverRatings = [
                driver.concentration,
                driver.overtaking,
                driver.experience,
                driver.quickness,
                driver.stamina
            ];
            return driverRatings.reduce((sum, rating) => sum + rating, 0) / driverRatings.length;
        }
        
        function findSuitableCandidateRandom(teamRating, excludeDriverId, allDrivers, usedDriverIds) {
       
            const tolerance = 15;
            
            const suitableCandidates = allDrivers.filter(candidate => {
                if (candidate.ID === excludeDriverId) return false;
                if (usedDriverIds.has(candidate.ID)) return false;
                if (candidate.currentteam === manager[0].team) return false;
                
                const candidateRating = calculateDriverRating(candidate);
                const difference = Math.abs(teamRating - candidateRating);
                
                return difference <= tolerance;
            });
            
            if (suitableCandidates.length === 0) {
                const allAvailable = allDrivers.filter(candidate => {
                    if (candidate.ID === excludeDriverId) return false;
                    if (usedDriverIds.has(candidate.ID)) return false;
                    if (candidate.currentteam === manager[0].team) return false;
                    return true;
                });
                
                if (allAvailable.length === 0) return null;
                
                const randomIndex = Math.floor(Math.random() * allAvailable.length);
                return allAvailable[randomIndex];
            }
            
            const randomIndex = Math.floor(Math.random() * suitableCandidates.length);
            return suitableCandidates[randomIndex];
        }
        
        const usedDriverIds = new Set();
        
        for (const driver of drivers) {
            if (driver.contractexp <= manager[0].season) {
                const [drivers, manager, teams] = await Promise.all([
                    $fetch('/api/listDriver'),
                    $fetch('/api/manager/listManager'),
                    $fetch('/api/listTeam')
                ]);
                
                const driverTeam = teams.find(team => team.ID === driver.currentteam);
                
                if (driverTeam) {
                    const teamRating = calculateTeamRating(driverTeam);
                    const candidate = findSuitableCandidateRandom(teamRating, driver.ID, drivers, usedDriverIds);
                    
                    if (driver.currentteam === manager[0].team) {
                        manTeamExp.value.push(driver.ID);
                    } else if (candidate) {
                        usedDriverIds.add(candidate.ID);
                        
                        const candidateOldTeam = teams.find(team => team.ID === candidate.currentteam);
                        
                        let driverPosition = null;
                        if (driverTeam.driver1 === driver.ID) {
                            driverPosition = 'driver1';
                        } else if (driverTeam.driver2 === driver.ID) {
                            driverPosition = 'driver2';
                        } else if (driverTeam.testdriver === driver.ID) {
                            driverPosition = 'testdriver';
                        }
                        
                        let candidateOldPosition = null;
                        if (candidateOldTeam) {
                            if (candidateOldTeam.driver1 === candidate.ID) {
                                candidateOldPosition = 'driver1';
                            } else if (candidateOldTeam.driver2 === candidate.ID) {
                                candidateOldPosition = 'driver2';
                            } else if (candidateOldTeam.testdriver === driver.ID) {
                                candidateOldPosition = 'testdriver';
                            }
                        }
                        
                        const { currentteam: _oldTeam, ... driverWithoutTeam } = driver;
                        await $fetch(`/api/driver/${driver.ID}`, {
                            method: "PUT",
                            body: { 
                                ...driverWithoutTeam,
                                contractexp: manager[0].season + 3,
                                currentteam: candidate.currentteam
                            },
                        });

                        const { currentteam: _oldCandidateTeam, ...candidateWithoutTeam } = candidate;
                        await $fetch(`/api/driver/${candidate.ID}`, {
                            method: "PUT",
                            body: {
                                ...candidateWithoutTeam,
                                contractexp: manager[0].season + 3,
                                currentteam: driver.currentteam  
                            },
                        });
                        
                        if (driverPosition) {
                            const currentDriverTeam = await $fetch(`/api/teams/${driverTeam.ID}`);
                            await $fetch(`/api/teams/${driverTeam.ID}`, {
                                method: "PUT",
                                body: {
                                    ...currentDriverTeam,
                                    [driverPosition]: candidate.ID
                                },
                            });
                        }

                        if (candidateOldTeam && candidateOldPosition) {
                            const currentCandidateTeam = await $fetch(`/api/teams/${candidateOldTeam.ID}`);
                            await $fetch(`/api/teams/${candidateOldTeam. ID}`, {
                                method: "PUT",
                                body: {
                                    ...currentCandidateTeam,
                                    [candidateOldPosition]: driver.ID
                                },
                            });
                        }
                        
                    } else {
                        await $fetch(`/api/driver/${driver.ID}`, {
                            method: "PUT",
                            body: { 
                                ...driver, 
                                contractexp: manager[0].season + 3,
                            },
                        });
                    }
                }
            }
        }
    }
    async function triggerEndOfSeason() {
        const [leadboard, manager, teams, drivers] = await Promise.all([
            $fetch('/api/leadboard/listLeadboard'),
            $fetch('/api/manager/listManager'),
            $fetch('/api/listTeam'),
            $fetch('/api/listDriver')
        ]);

        const playerTeam = teams.find(team => team.ID === manager[0].team);
        const sponsorMoney = ['sponzor1', 'sponzor2', 'sponzor3']
            .map(key => getSponsor(playerTeam?.[key])?.sponsormoney || 0)
            .reduce((sum, money) => sum + money, 0);

        const randomChange = changeRules[getRandomInteger(0, changeRules.length - 1)];
        changes.value.push(randomChange);

        const { calendar } = useCreateCalendar();
        let championDriverID = null;
        let championTeamId = null;
        const teamDriverIds = new Set();
        teams.slice(0, 10).forEach(team => { 
            if (team.driver1) teamDriverIds.add(Number(team.driver1));
            if (team.driver2) teamDriverIds.add(Number(team.driver2));
            if (leadboard.find(entry => Number(entry.driverID) === Number(team.testdriver))?.points > 0) {
            teamDriverIds.add(Number(team.testdriver));
            }
        });

        // Filtruj jezdce, kteří jsou v týmech
        const fullLeaderboard = drivers.filter(driver => 
        teamDriverIds.has(Number(driver.ID))
        );

        // Spoj data z leadboardu s daty jezdců
        const driverLeaderboard = leadboard
        .map(entry => {
        const driver = fullLeaderboard.find(d => Number(d.ID) === Number(entry.driverID));
        return driver ? { ...entry, driver } : null;
        })
        .filter(entry => entry !== null);

        // Vytvoř leadboard týmů se součtem bodů jejich jezdců
        const teamLeaderboard = teams.slice(0, 10).map(team => {
        const driver1Points = driverLeaderboard.find(
            entry => Number(entry.driverID) === Number(team.driver1)
        )?.points || 0;
        
        const driver2Points = driverLeaderboard.find(
            entry => Number(entry.driverID) === Number(team.driver2)
        )?.points || 0;

        const driver3Points = driverLeaderboard.find(
            entry => Number(entry.driverID) === Number(team.testdriver)
        )?.points || 0;

        return {
            ...team,
            points: driver1Points + driver2Points + driver3Points
        };
        });

        const sortedDriverLeaderboard = driverLeaderboard.sort((a, b) => b.points - a.points);
        const sortedTeamLeaderboard = teamLeaderboard.sort((a, b) => b.points - a.points);

        if (leadboard.length > 0) {
            console.log("Champion Driver:", sortedDriverLeaderboard[0]);
            championDriverID = sortedDriverLeaderboard[0].driver.ID;
            console.log("Champion DRIVER IDDDDDDDDD:", championDriverID);
            championTeamId = sortedTeamLeaderboard[0].ID;
        }

        await $fetch(`/api/driver/${championDriverID}`, {
            method: "PUT",
            body: { 
                ...sortedDriverLeaderboard[0], 
                championship: (sortedDriverLeaderboard[0].championship || 0) + 1
            },
        });

        await $fetch(`/api/teams/${championTeamId}`, {
            method: "PUT",
            body: { 
                ...sortedTeamLeaderboard[0], 
                historytitles: (sortedTeamLeaderboard[0].historytitles || 0) + 1
            },
        });



        const calendarItems = calendar.value.map(item => ({
            track: item.i,
            date: item.date,
            raced: 0,
            winner: 0,
            winnerteam: 0,
            secondplace: 0,
            secondteam: 0,
            thirdplace: 0,
            thirdteam: 0
        }));
        
        
        const leadboardUpdates = leadboard.map((_, index) => ({
            id: index,
            data: { points: 0 }
        }));

        const teamUpdates = teams.map(team => {
            const isPlayerTeam = team.ID === manager[0].team;
            
            const data = isPlayerTeam 
                ? {
                    [randomChange]: team[randomChange] + getRandomInteger(-7, 0),
                    money: team.money + sponsorMoney
                }
                : {
                    aerodynamics: team.aerodynamics + getRandomInteger(0, 3),
                    gearbox: team.gearbox + getRandomInteger(0, 3),
                    brakes: team.brakes + getRandomInteger(0, 3),
                    frontwing: team.frontwing + getRandomInteger(0, 3),
                    rearwing: team.rearwing + getRandomInteger(0, 3),
                    reliability: team.reliability + getRandomInteger(0, 3),
                    [randomChange]: team[randomChange] + getRandomInteger(-7, 0)
                };

            return { id: team.ID, data };
        });
        
        await $fetch('/api/endOfSeason/process', {
            method: 'POST',
            body: {
                newSeason: manager[0].season + 1,
                calendarItems,
                leadboardUpdates,
                teamUpdates
            }
        });

        checkTeamsOverLimit();
        checkDriverContractExp()
    }

    return { triggerEndOfSeason, changes, manTeamExp };
};