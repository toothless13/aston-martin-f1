import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchConstructorStandings, fetchDriverStandings, fetchQualiResults, fetchRaceResults, fetchRaces, fetchSprint, fetchYears } from "@/api/requests";
import CircuitInfo from "./CircuitInfo";
import YearSelector from "./YearSelector";
import RaceSelector from "./RaceSelector";
import QualiTable from "./QualiTable";
import RaceTable from "./RaceTable";
import SprintTable from "./SprintTable";
import PositionsGraph from "./PositionsGraph";
import DriverStandingsTable from "./DriverStandingsTable";
import { racePositionsData } from "@/functions/racePositionsData";
import ConstructorStandingsTable from "./ConstructorStandingsTable";
import { useCircuitInfoStore, useConstructorStandingsStore, useConstructorStore, useDriverStandingsStore, useDriverStore, useQualiStore, useRacePositionsStore, useRaceResultStore, useRacesStore, useShowPositionsStore, useShowQualiStore, useShowRaceStore, useShowSprintStore, useSprintStore, useYearStore, useYearsStore } from "@/store";

const HomePage = () => {

  const setYears = useYearsStore(store => store.setYears);
  const year = useYearStore(store => store.year);
  const races = useRacesStore(store => store.races);
  const setRaces = useRacesStore(store => store.setRaces);
  const circuitInfo = useCircuitInfoStore(store => store.circuitInfo);
  const setCircuitInfo = useCircuitInfoStore(store => store.setCircuitInfo);
  const quali = useQualiStore(store => store.quali);
  const setQuali = useQualiStore(store => store.setQuali);
  const raceResult = useRaceResultStore(store => store.raceResult);
  const setRaceResult = useRaceResultStore(store => store.setRaceResult);
  const sprint = useSprintStore(store => store.sprint);
  const setSprint = useSprintStore(store => store.setSprint);
  const showQuali = useShowQualiStore(store => store.showQuali);
  const setShowQuali = useShowQualiStore(store => store.setShowQuali);
  const showSprint = useShowSprintStore(store => store.showSprint);
  const setShowSprint = useShowSprintStore(store => store.setShowSprint);
  const showRace = useShowRaceStore(store => store.showRace);
  const setShowRace = useShowRaceStore(store => store.setShowRace);
  const showPositions = useShowPositionsStore(store => store.showPositions);
  const setShowPositions = useShowPositionsStore(store => store.setShowPositions);
  const racePositions = useRacePositionsStore(store => store.racePositions);
  const setRacePositions = useRacePositionsStore(store => store.setRacePositions);
  const driverStandings = useDriverStandingsStore(store => store.driverStandings);
  const setDriverStandings = useDriverStandingsStore(store => store.setDriverStandings);
  const driver = useDriverStore(store => store.driver);
  const constructorStandings = useConstructorStandingsStore(store => store.constructorStandings);
  const setConstructorStandings = useConstructorStandingsStore(store => store.setConstructorStandings);
  const constructor = useConstructorStore(store => store.constructor);

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
      fetchConstructorStandings(year, raceNumber).then(res => setConstructorStandings(res));
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
      <YearSelector seasonRaces={seasonRaces} />
        {year !== "" && 
          <RaceSelector handleRaceSelect={handleRaceSelect} />
        }
        {circuitInfo !== undefined && <CircuitInfo /> }
      {quali !== undefined && <button className="btn mx-2" onClick={() => showQuali ? setShowQuali(false) : setShowQuali(true)}>{showQuali ? "Hide" : "Show"} Qualifying Results</button>}
      {sprint !== undefined && <button className="btn mx-2" onClick={() => showSprint ? setShowSprint(false) : setShowSprint(true)}>{showSprint ? "Hide" : "Show"} Sprint Results</button>}
      {raceResult !== undefined && <button className="btn mx-2" onClick={() => showRace ? setShowRace(false) : setShowRace(true)}>{showRace ? "Hide" : "Show"} Race Results</button>}
      {racePositions !== undefined && <button className="btn mx-2" onClick={() => showPositions ? setShowPositions(false) : setShowPositions(true)}>{showPositions ? "Hide" : "Show"} Race Positions</button>}
      {(driverStandings !== undefined && driver !== undefined) && <DriverStandingsTable />}
      {(constructorStandings !== undefined && constructor !== undefined) && <ConstructorStandingsTable />}
      {(showQuali && raceResult !== undefined) && <div><h2>Qualifying Results</h2><QualiTable /></div>}
      {(showSprint && raceResult !== undefined) && <div><h2>Sprint Results</h2><SprintTable /></div>}
      {(showRace && raceResult !== undefined) && <div><h2>Race Results</h2><RaceTable /></div>}
      {(showPositions && racePositions !== undefined) && <PositionsGraph options={options} />}
    </div>
  )
}

export default HomePage