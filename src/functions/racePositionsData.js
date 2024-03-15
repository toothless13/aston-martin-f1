import { fetchLaps } from "@/api/requests";

export const racePositionsData = async (raceResult) => {
  const year = raceResult.MRData.RaceTable.season;
  const race = raceResult.MRData.RaceTable.round;
  const drivers = raceResult.MRData.RaceTable.Races[0].Results;
  const driversInfoArray = drivers.map(driver => {
    return {
      position: driver.position,
      grid: driver.grid > 0 ? driver.grid : drivers.length.toString(),
      positionText: driver.positionText,
      status: driver.status,
      driverId: driver.Driver.driverId,
      name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      constructor: driver.Constructor.name,
      completedLaps: driver.laps
    }
  });

  const totalLaps = driversInfoArray[0].completedLaps;
  const lapsArray = [];
  for (let i = 0; i <= totalLaps; i++) {
    lapsArray.push(i);
  }

  const getWithForOf = async () => {
    const data = [];
    for (const driver of driversInfoArray) {
      let dataLaps = await fetchLaps(year, race, driver.driverId);
      if (dataLaps.MRData.RaceTable.Races.length > 0)
      data.push(dataLaps.MRData.RaceTable.Races[0].Laps);
    }
    return data;
  }
  const data = await getWithForOf();
  // const allDriverLaps = [{label: "Hide All", data: []}, {label: "Show All", data: []}];
  const allDriverLaps = [];
  data.forEach(driver => {
    const individualDriverLaps = driver.map(lap => lap.Timings[0].position ? lap.Timings[0].position : "0");
    const driverIndex = driversInfoArray.findIndex(driverInfo => driverInfo.driverId === driver[0].Timings[0].driverId ? driverInfo.name : "");
    const name = driversInfoArray[driverIndex].name;
    const gridPosition = driversInfoArray[driverIndex].grid;
    individualDriverLaps.unshift(gridPosition);
    const driverData = {
      label: name,
      data: individualDriverLaps,
      tension: 0.3
    }
    allDriverLaps.push(driverData);
    });

    return await {
      labels: lapsArray,
      datasets: allDriverLaps
    }
}