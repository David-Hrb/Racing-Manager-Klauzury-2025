export const useRaceSetup = () => {

  const getTeamDrivers = (drivers, teams, teamId) => {
    const team = teams.find(team => Number(team.ID) === Number(teamId));
    if (!team) return [];
    
    const driverIds = [team.driver1, team.driver2].filter(id => id != null);
    console.log(driverIds);
    
    return driverIds.map(driverId => 
      drivers.find(driver => Number(driver.ID) === Number(driverId))
    ).filter(driver => driver != null);
  };

  const getTeamAllDrivers = (drivers, teams, teamId) => {
    const team = teams.find(team => Number(team.ID) === Number(teamId));
    if (!team) return [];
    
    const driverIds = [team.driver1, team.driver2, team.testdriver].filter(id => id != null);
    console.log(driverIds);
    
    return driverIds.map(driverId => 
      drivers.find(driver => Number(driver.ID) === Number(driverId))
    ).filter(driver => driver != null);
  };

  const getCurrentTeam = (teams, teamId) => {
    return teams.find(team => Number(team.ID) === Number(teamId)) || null;
  };

  const getCurrentCircuit = (circuits, circuitId) => {
    return circuits.find(circuit => Number(circuit.ID) === Number(circuitId)) || null;
  };

  const setupRace = ({ drivers, teams, circuits, teamId, circuitId }) => {
    const teamDrivers = getTeamDrivers(drivers, teams, teamId);
    const teamAllDrivers = getTeamAllDrivers(drivers, teams, teamId);
    const currentTeamInfo = getCurrentTeam(teams, teamId);
    const currentCircuitInfo = getCurrentCircuit(circuits, circuitId);
    console.log(teamDrivers)
    return {
      teamDrivers,
      teamAllDrivers,
      currentTeamInfo,
      currentCircuitInfo,
      isValid: teamDrivers.length > 0 && currentTeamInfo !== null && currentCircuitInfo !== null
    };
  };

  return {
    getTeamDrivers,
    getTeamAllDrivers,
    getCurrentTeam,
    getCurrentCircuit,
    setupRace
  };
};