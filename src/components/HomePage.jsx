import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchConstructorStandings, fetchDriverStandings, fetchQualiResults, fetchRaceResults, fetchSprint } from "@/api/requests";
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
import { useCircuitInfoStore, useConstructorStandingsStore, useConstructorStore, useDriverStandingsStore, useDriverStore, useQualiStore, useRacePositionsStore, useRaceResultStore, useRacesStore, useShowPositionsStore, useShowQualiStore, useShowRaceStore, useShowSprintStore, useSprintStore, useYearStore } from "@/store";

const HomePage = () => {

  const year = useYearStore(store => store.year);
  const races = useRacesStore(store => store.races);
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

  const handleRaceSelect = (e) => {
    e.preventDefault();
    const raceName = e.target.value;
    const raceInfo = races.filter(race => race.raceName === raceName);
    setCircuitInfo(raceInfo);
  }

  const qualiQuery = useQuery({
    queryKey: ["quali", year, circuitInfo],
    enabled: circuitInfo != undefined,
    queryFn: () => fetchQualiResults(year, circuitInfo[0].round)
  });

  useEffect(() => {
    if (qualiQuery.data) {
      if (qualiQuery.data.MRData.RaceTable.Races.length > 0) {
        setQuali(qualiQuery.data);
      } else {
        console.log("No quali results for this time period");
      }
    }
  }, [circuitInfo, qualiQuery.data]);

  const raceResultQuery = useQuery({
    queryKey: ["raceResult", year, circuitInfo],
    enabled: circuitInfo != undefined,
    queryFn: () => fetchRaceResults(year, circuitInfo[0].round)
  });

  useEffect(() => {
    if (raceResultQuery.data && raceResultQuery.data.MRData.RaceTable.Races.length > 0) {
      setRaceResult(raceResultQuery.data);
    } else {
      console.log("No race results for this time period");
    }
  }, [circuitInfo, raceResultQuery.data]);

  const sprintQuery = useQuery({
    queryKey: ["sprintResult", year, circuitInfo],
    enabled: circuitInfo != undefined,
    queryFn: () => fetchSprint(year, circuitInfo[0].round)
  });

  useEffect(() => {
    const numYear = Number(year);
    if (numYear > 2020) {
      if (sprintQuery.data?.MRData.RaceTable.Races.length > 0) {
        setSprint(sprintQuery.data);
      } else {
        console.log("No Sprint results for this combination");
      }
    } else {
      console.log("There was no Sprint at this race event");      
    }
  }, [circuitInfo, sprintQuery.data]);

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

  return (
    <div>
      <YearSelector />
        {year !== "" && 
          <RaceSelector handleRaceSelect={handleRaceSelect} />
        }
        {circuitInfo !== undefined && <CircuitInfo /> }
      {qualiQuery.data == null ? (qualiQuery.isFetching ? <div>Loading</div> : null) : quali !== undefined ? <button className="btn mx-2" onClick={() => showQuali ? setShowQuali(false) : setShowQuali(true)}>{showQuali ? "Hide" : "Show"} Qualifying Results</button> : null}
      {sprintQuery.data == null ? (sprintQuery.isFetching ? <div>Loading</div> : null) : sprint !== undefined && <button className="btn mx-2" onClick={() => showSprint ? setShowSprint(false) : setShowSprint(true)}>{showSprint ? "Hide" : "Show"} Sprint Results</button>}  
      {raceResultQuery.data == null ? (raceResultQuery.isFetching ? <div>Loading</div> : null) : <button className="btn mx-2" onClick={() => showRace ? setShowRace(false) : setShowRace(true)}>{showRace ? "Hide" : "Show"} Race Results</button>}
      {racePositions !== undefined && <button className="btn mx-2" onClick={() => showPositions ? setShowPositions(false) : setShowPositions(true)}>{showPositions ? "Hide" : "Show"} Race Positions</button>}
      {(driverStandings !== undefined && driver !== undefined && showRace === true) && <DriverStandingsTable />}
      {(constructorStandings !== undefined && constructor !== undefined && showRace === true) && <ConstructorStandingsTable />}
      {(showQuali && raceResult !== undefined) && <div><h2>Qualifying Results</h2><QualiTable /></div>}
      {(showSprint && raceResult !== undefined) && <div><h2>Sprint Results</h2><SprintTable /></div>}
      {(showRace && raceResult !== undefined) && <div><h2>Race Results</h2><RaceTable /></div>}
      {(showPositions && racePositions !== undefined) && <PositionsGraph options={options} />}
    </div>
  )
}

export default HomePage