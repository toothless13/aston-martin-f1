import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { fetchDriverStandings, fetchQualiResults, fetchRaceResults, fetchRaces, fetchSprint, fetchYears } from "@/api/requests";
import CircuitInfo from "./CircuitInfo";
import YearSelector from "./YearSelector";
import RaceSelector from "./RaceSelector";
import QualiTable from "./QualiTable";
import RaceTable from "./RaceTable";
import SprintTable from "./SprintTable";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";
import PositionsGraph from "./PositionsGraph";
import DriverStandingsTable from "./DriverStandingsTable";
import { racePositionsData } from "@/functions/racePositionsData";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

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
  const [driverStandings, setDriverStandings] = useState();
  const [driver, setDriver] = useState();

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

  useEffect(() => {
    if (circuitInfo) {
      qualiResults(year, circuitInfo[0].round);
      raceResults(year, circuitInfo[0].round);
      sprintResults(year, circuitInfo[0].round);
    }
  }, [circuitInfo]);

  const options = useRef();

  useEffect(() => {
    const numYear = Number(year);
    if (raceResult && numYear > 1995) {      
      racePositionsData(raceResult).then(res => setRacePositions(res));
      const numOfDrivers = raceResult.MRData.total;

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

  useEffect(() => {
    if (raceResult) {
      const raceNumber = raceResult.MRData.RaceTable.round;
      fetchDriverStandings(year, raceNumber).then(res => setDriverStandings(res));
    }
    // console.log(driverStandings);
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
      <YearSelector year={year} setYear={setYear} seasonRaces={seasonRaces} setCircuitInfo={setCircuitInfo} years={years} setQuali={setQuali} setRaceResult={setRaceResult} setSprint={setSprint} setRacePositions={setRacePositions} setDriver={setDriver} setShowQuali={setShowQuali} setShowSprint={setShowSprint} setShowRace={setShowRace} />
        {year !== "" && 
          <RaceSelector race={race} setRace={setRace} handleRaceSelect={handleRaceSelect} races={races} setQuali={setQuali} circuitInfo={circuitInfo} setRaceResult={setRaceResult} setSprint={setSprint} setRacePositions={setRacePositions} setDriver={setDriver} setShowQuali={setShowQuali} setShowSprint={setShowSprint} setShowRace={setShowRace}/>
        }
        {circuitInfo !== undefined && <CircuitInfo circuitInfo={circuitInfo} /> }
      {quali !== undefined && <button className="btn mx-2" onClick={() => showQuali ? setShowQuali(false) : setShowQuali(true)}>{showQuali ? "Hide" : "Show"} Qualifying Results</button>}
      {sprint !== undefined && <button className="btn mx-2" onClick={() => showSprint ? setShowSprint(false) : setShowSprint(true)}>{showSprint ? "Hide" : "Show"} Sprint Results</button>}
      {raceResult !== undefined && <button className="btn mx-2" onClick={() => showRace ? setShowRace(false) : setShowRace(true)}>{showRace ? "Hide" : "Show"} Race Results</button>}
      {(driverStandings !== undefined && driver !== undefined) && <DriverStandingsTable driverStandings={driverStandings} driver={driver} />}
      {(showQuali && raceResult !== undefined) && <div><h2>Qualifying Results</h2><QualiTable quali={quali} /></div>}
      {(showSprint && raceResult !== undefined) && <div><h2>Sprint Results</h2><SprintTable sprint={sprint} /></div>}
      {(showRace && raceResult !== undefined) && <div><h2>Race Results</h2><RaceTable raceResult={raceResult} setDriver={setDriver} /></div>}
      {racePositions !== undefined && <PositionsGraph racePositions={racePositions} setRacePositions={setRacePositions} raceResult={raceResult} options={options} />}
    </div>
  )
}

export default HomePage