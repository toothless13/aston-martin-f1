import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { fetchLaps, fetchQualiResults, fetchRaceResults, fetchRaces, fetchSprint, fetchYears } from "@/api/requests";
import CircuitInfo from "./CircuitInfo";
import YearSelector from "./YearSelector";
import RaceSelector from "./RaceSelector";
import QualiTable from "./QualiTable";
import RaceTable from "./RaceTable";
import SprintTable from "./SprintTable";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const HomePage = () => {

  const [years, setYears] = useState([]);
  const [races, setRaces] = useState([]);
  const [year, setYear] = useState("");
  const [race, setRace] = useState("");
  const [circuitInfo, setCircuitInfo] = useState();
  const [quali, setQuali] = useState();
  const [raceResult, setRaceResult] = useState();
  const [sprint, setSprint] = useState();
  const [showQuali, setShowQuali] = useState(false);
  const [showSprint, setShowSprint] = useState(false);
  const [showRace, setShowRace] = useState(false);
  const [racePositions, setRacePositions] = useState();

  const { data: raceYears, status: yearsStatus, error: yearsError } = useQuery({
    queryFn: fetchYears,
    queryKey: ["years"],
  });

  const seasonRaces = async (year) => {
    const races = await fetchRaces(year);
    setRaces(races);
  }

  useEffect(() => {
    if (raceYears !== undefined) {
      const yearsArr = raceYears.map(year => year.season);
      setYears(yearsArr);
    }
  }, [raceYears]);

  const handleRaceSelect = (e) => {
    e.preventDefault();
    const raceName = e.target.value;
    const raceInfo = races.filter(race => race.raceName === raceName);
    setCircuitInfo(raceInfo);
  }

  const qualiResults = async (year, race) => {
    const quali = await fetchQualiResults(year, race);
    if (quali.MRData.RaceTable.Races.length > 0) {
      setQuali(quali);
    } else {
      console.log("No quali results for this time period");
    }
  }

  const raceResults = async (year, race) => {
    const raceResults = await fetchRaceResults(year, race);
    if (raceResults.MRData.RaceTable.Races.length > 0) {
      setRaceResult(raceResults);
    } else {
      console.log("No race results for this combination");
    }
  }

  const sprintResults = async (year, race) => {
    const numYear = Number(year);
    if (numYear > 2020) {
      const sprint = await fetchSprint(year, race);
      if (sprint.MRData.RaceTable.Races.length > 0) {
        setSprint(sprint);
      } else {
        console.log("No Sprint results for this combination");
      }
    } else {
      console.log("There was no Sprint at this race event");
    }
  }

  // const racePositionsData = async raceResult => {
  //   // const laps = raceResult.MRData.RaceTable.Races[0].Results[0].laps;
  //   const year = raceResult.MRData.RaceTable.season;
  //   const race = raceResult.MRData.RaceTable.round;
  //   const driverId = raceResult.MRData.RaceTable.Races[0].Results[0].Driver.driverId;
  //   const driverName = `${raceResult.MRData.RaceTable.Races[0].Results[0].Driver.givenName} ${raceResult.MRData.RaceTable.Races[0].Results[0].Driver.familyName}`
  //   const driverStartPosition = raceResult.MRData.RaceTable.Races[0].Results[0].grid;
  //   const testDriverStartPosition = raceResult.MRData.RaceTable.Races[0].Results[10].grid;
    
  //   // const lapsArray = [];
  //   // for (let i = 0; i < laps; i++) {
  //   //   lapsArray.push(i + 1);
  //   // }
  //   // console.log(lapsArray);
  //   // console.log(raceResult.MRData.RaceTable.Races[0].Results)

  //   const tempDriverPositions = await fetchLaps(year, race, driverId);
  //   const totalLaps = tempDriverPositions.MRData.RaceTable.Races[0].Laps.length;

  //   const drivers = raceResult.MRData.RaceTable.Races[0].Results;
  //   // console.log(drivers);
  //   // console.log(drivers);
  //   const driverPositionsInfo = [];
  //   drivers.forEach(async driver => {
  //     const driverId = driver.Driver.driverId;
  //     const driverName = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
  //     const startPosition = driver.grid > 0 ? driver.grid : drivers.length;
  //     // console.log(driverName + " " + startPosition);
  //     const driverPositions = await fetchLaps(year, race, driverId);
  //     // console.log(driverPositions);
  //     // console.log(totalLaps);
  //     // const laps = driverPositions.MRData.RaceTable.Races[0].Laps;
  //     // const raceInfo = driverPositions.MRData.RaceTable.Races[0];
  //     // console.log(raceInfo.Laps);
  //     // const laps = [1,2,3];
  //     // console.log(laps.length);
  //     let laps = [];
  //     for (let i = 0; i < totalLaps; i++) {
  //       if (driverPositions.MRData.RaceTable.Races[0].Laps[i]) {
  //         laps.push(Number(driverPositions.MRData.RaceTable.Races[0].Laps[i]));
  //       } else {
  //         laps.push(Number(driverPositions.MRData.RaceTable.Races[0].Laps[i - 1]));
  //       } 
  //     }
  //     // console.log(laps);
  //     // const laps = driverPositions?.MRData.RaceTable.Races[0].Laps;
  //     const positionsArray = [startPosition];
  //     laps.forEach(lap => positionsArray.push(Number(lap.Timings[0].position)));
  //     console.log(positionsArray);
  //     // for (let i = 0; i < totalLaps; i++) {
  //     //   if (driverPositions.MRData.RaceTable.Races[0].Laps[i]) {
  //     //     positionsArray.push(driverPositions.MRData.RaceTable.Races[0].Laps[i])
  //     //   } else {
  //     //     positionsArray.push("");
  //     //   }
  //     // }
  //     driverPositionsInfo.push({
  //       label: driverName,
  //       data: positionsArray,
  //       backgroundColor: "#CEDC00",
  //       borderColor: "black",
  //       pointBorderColor: "#CEDC00",
  //       tension: 0.3
  //     });
  //   });
  //   // console.log(driverPositionsInfo);

  //   const driverPositions = await fetchLaps(year, race, driverId);
  //   const laps = driverPositions.MRData.RaceTable.Races[0].Laps;
  //   const driverId2 = raceResult.MRData.RaceTable.Races[0].Results[1].Driver.driverId;
  //   const driverPositions2 = await fetchLaps(year, race, driverId2);
  //   const laps2 = driverPositions2.MRData.RaceTable.Races[0].Laps;
  //   // console.log(laps);
  //   const lapsArray = ["0"];
  //   const positionsArray = [driverStartPosition];
  //   const positionsArray2 = [testDriverStartPosition];
  //   laps.forEach(lap => lapsArray.push(lap.number));
  //   laps.forEach(lap => {
  //     // lapsArray.push(lap.number);
  //     positionsArray.push(lap.Timings[0].position);
  //   });
  //   laps2.forEach(lap => {
  //     // lapsArray.push(lap.number);
  //     positionsArray2.push(lap.Timings[0].position);
  //   });
  //   // console.log(lapsArray);
  //   // console.log(positionsArray);
  //   // setRacePositions({
  //   //   labels: lapsArray,
  //   //   datasets: [
  //   //     {
  //   //       label: driverName,
  //   //       data: positionsArray,
  //   //       backgroundColor: "#CEDC00",
  //   //       borderColor: "black",
  //   //       pointBorderColor: "#CEDC00",
  //   //       tension: 0.3
  //   //     },
  //   //     {
  //   //       label: driverId2,
  //   //       data: positionsArray2,
  //   //       borderColor: "white",
  //   //       pointBorderColor: "black",
  //   //       tension: 0.3
  //   //     }
  //   //   ]
  //   // })
  //   setRacePositions({
  //     labels: lapsArray,
  //     datasets: driverPositionsInfo,
  //   });
  // }

  const racePositionsData = async raceResult => {
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
    // console.log(driversInfo);
    const totalLaps = driversInfoArray[0].completedLaps;
    const lapsArray = [];
    for (let i = 0; i <= totalLaps; i++) {
      lapsArray.push(i);
    }
    // driversInfoArray.forEach(driver => console.log(driver.driverId));
    // const driversDataArray = driversInfoArray.map(driver => {
      // Do the await fetchLaps in here and then add an object with label, data, backgroundColor etc to the array
    // })
    // const data = [];
    const getWithForOf = async () => {
      const data = [];
      for (const driver of driversInfoArray) {
        let dataLaps = await fetchLaps(year, race, driver.driverId);
        // console.log(dataLaps);
        if (dataLaps.MRData.RaceTable.Races.length > 0)
        data.push(dataLaps.MRData.RaceTable.Races[0].Laps);
        // console.log(data);
      }
      return data;
    }
    const data = await getWithForOf();
    // console.log(data);
    const driverLaps = [];
    const allDriverLaps = [];
    data.forEach(driver => {
      // console.log(driver);
      const individualDriverLaps = driver.map(lap => lap.Timings[0].position ? lap.Timings[0].position : "0");
      const driverIndex = driversInfoArray.findIndex(driverInfo => driverInfo.driverId === driver[0].Timings[0].driverId ? driverInfo.name : "");
      const name = driversInfoArray[driverIndex].name; 
      const driverData = {
        label: name,
        data: individualDriverLaps
      }
      allDriverLaps.push(driverData);
      });

    setRacePositions({
      labels: lapsArray,
      datasets: allDriverLaps
    });
}

  useEffect(() => {
    if (circuitInfo) {
      qualiResults(year, circuitInfo[0].round);
      raceResults(year, circuitInfo[0].round);
      sprintResults(year, circuitInfo[0].round);
    }
  }, [circuitInfo]);

  const options = useRef();

  useEffect(() => {
    if (raceResult) {
      console.log("called");
      // console.log(raceResult);
      
      racePositionsData(raceResult);
      const numOfDrivers = raceResult.MRData.total;
      // console.log(numOfDrivers);
      options.current = {
        plugins: {
          legend: true,
        },
        scales: {
          y: {
            min: 1,
            max: Number(numOfDrivers),
            reverse: true,
          }
        }
      }
    }
  }, [raceResult]);

  if (yearsStatus === "loading") {
    console.log(yearsStatus)
    return <div>Loading...</div>
  }

  if (yearsStatus === "error") {
    return <div>{JSON.stringify(yearsError)}</div>
  }

  return (
    <div>
      <YearSelector year={year} setYear={setYear} seasonRaces={seasonRaces} setCircuitInfo={setCircuitInfo} years={years} setQuali={setQuali} setRaceResult={setRaceResult}/>
        {year !== "" && 
          <RaceSelector race={race} setRace={setRace} handleRaceSelect={handleRaceSelect} races={races} setQuali={setQuali} circuitInfo={circuitInfo} setRaceResult={setRaceResult}/>
        }
        {circuitInfo !== undefined && <CircuitInfo circuitInfo={circuitInfo} /> }
      {quali !== undefined && <button className="btn mx-2" onClick={() => showQuali ? setShowQuali(false) : setShowQuali(true)}>{showQuali ? "Hide" : "Show"} Qualifying Results</button>}
      {sprint !== undefined && <button className="btn mx-2" onClick={() => showSprint ? setShowSprint(false) : setShowSprint(true)}>{showSprint ? "Hide" : "Show"} Sprint Results</button>}
      {raceResult !== undefined && <button className="btn mx-2" onClick={() => showRace ? setShowRace(false) : setShowRace(true)}>{showRace ? "Hide" : "Show"} Race Results</button>}
      {showQuali && <div><h2>Qualifying Results</h2><QualiTable quali={quali} /></div>}
      {showSprint && <div><h2>Sprint Results</h2><SprintTable sprint={sprint} /></div>}
      {showRace && <div><h2>Race Results</h2><RaceTable raceResult={raceResult} /></div>}
      {racePositions !== undefined && <Line data={racePositions} options={options.current} ></Line>}
    </div>
  )
}

export default HomePage