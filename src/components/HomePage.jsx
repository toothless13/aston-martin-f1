import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, CSSProperties } from "react";
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
import { useCircuitInfoStore, useConstructorStandingsStore, useConstructorStore, useDriverStandingsStore, useDriverStore, useQualiStore, useRacePositionsStore, useRaceResultStore, useRacesStore, useShowConstructorStandingsStore, useShowDriverStandingsStore, useShowPositionsStore, useShowQualiStore, useShowRaceStore, useShowSprintStore, useSprintStore, useYearStore } from "@/store";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PulseLoader from "react-spinners/PulseLoader";

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
  const showDriverStandings = useShowDriverStandingsStore(store => store.showDriverStandings);
  const showConstructorStandings = useShowConstructorStandingsStore(store => store.showConstructorStandings);
  const resetShowDriverStandings = useShowDriverStandingsStore(store => store.resetShowDriverStandings);
  const resetShowConstructorStandings = useShowConstructorStandingsStore(store => store.resetShowConstructorStandings);

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
        onHover: function(event, chartElement) {
          event.native.target.style.cursor = chartElement[0] ? "pointer" : "default";
        },
        plugins: {
          tooltip: {
            callbacks: {
              beforeTitle: function(context) {
                return context[0].dataset.label;
              },
              title: function(context) {
                return `Lap ${context[0].label}`
              },
              label: function(context) {
                return ` Position: ${context.formattedValue}`
              }
            },
          },
          legend: {
            display: true,
            labels: {
              color: "black"
            }
          },
          colors: {
            enabled: true
          }
        },
        scales: {
          y: {
            min: 0,
            max: Number(numOfDrivers),
            reverse: true,
            position: "left",
            title: {
              text: "Race Position",
              display: true,
              color: "black"
            },
            ticks: {
              color: "black",
              stepSize: 1,
              autoSkip: false,
              callback: function(value) {
                return value === 0 ? "" : this.getLabelForValue(value) 
              }
            }
          },
          right: {
            min: 0,
            max: Number(numOfDrivers),
            reverse: true,
            display: true,
            position: "right",
            title: {
              text: "Race Position",
              display: true,
              color: "black"
            },
            ticks: {
              color: "black",
              stepSize: 1,
              autoSkip: false,
              callback: function(value) {
                return value === 0 ? "" : this.getLabelForValue(value)
              }
            }
          },
          top: {
            position: "top",
            title: {
              text: "Laps",
              display: true,
              color: "black"
            },
            ticks: {
              color: "black",
              stepSize: 1,
              autoSkip: false
            }
          },
          x: {
            title: {
              text: "Laps",
              display: true,
              color: "black"
            },
            ticks: {
              color: "black",
              stepSize: 1,
              autoSkip: false
            }
          }
        },
        layout: {
          padding: 10,
        },
      }
    }
  }, [raceResult]);

  useEffect(() => {
    if (raceResult) {
      const raceNumber = raceResult.MRData.RaceTable.round;
      fetchDriverStandings(year, raceNumber).then(res => { setDriverStandings(res)});
      fetchConstructorStandings(year, raceNumber).then(res => setConstructorStandings(res));
    }
  }, [raceResult]);

  return (
    <div>
      <div className="mx-auto w-1/3 flex justify-center">
        <YearSelector />
          {year !== "" && 
            <RaceSelector handleRaceSelect={handleRaceSelect} />
          }
      </div>
      <div className="grid gap-y-4 row-start-1 grid-cols-7 row-auto xl:grid-cols-11">
          <div className="flex grid-rows-1 lg:flex-row xl:flex-col col-span-7 xl:col-span-2">
            <div className="col-span-2">
              {circuitInfo !== undefined && <CircuitInfo /> }
            </div>
            <div className="flex flex-row h-fit col-start-3 col-span-4 p-4 justify-center xl:grid  xl:grid-rows-4 xl:gap-14 xl:flex-col xl:justify-between xl:h-40 xl:items-start xl:p-2">
              {qualiQuery.data == null ? 
                (qualiQuery.isFetching ? 
                  <div className="px-2"><PulseLoader color="white" /></div> : null) : 
                    quali !== undefined ? 
                      <button 
                        className="btn mx-2 text-gray-900 bg-gradient-to-r from-lime-200 to-amlime hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4 xl:w-[200px] w-40 box-border" 
                          onClick={() => {showQuali ? setShowQuali(false) : setShowQuali(true); setShowSprint(false); setShowRace(false);}}>
                            {showQuali ? "Hide" : "Show"} Qualifying Results
                      </button> : null}
            {raceResultQuery.data == null ?
             (raceResultQuery.isFetching ? 
              <div className="px-2"><PulseLoader color="white" /></div> : null) : 
              raceResult !== undefined ?
                <button 
                  className="btn mx-2 text-gray-900 bg-gradient-to-r from-lime-200 to-amlime hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4 xl:w-[200px] w-40 box-border" 
                  onClick={() => {showRace ? setShowRace(false) : setShowRace(true); setShowQuali(false); setShowSprint(false); resetShowDriverStandings(); resetShowConstructorStandings();}}>
                    {showRace ? "Hide" : "Show"} Race Results
                </button> : <div className="px-2 font-medium">No Race Results for this combination</div>}
            {sprintQuery.data == null ?
             (sprintQuery.isFetching ? 
              <div className="px-2"><PulseLoader color="white" /></div> : null) : 
                sprint !== undefined && 
                  <button 
                    className="btn mx-2 text-gray-900 bg-gradient-to-r from-lime-200 to-amlime hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4 xl:w-[200px] w-40 box-border" 
                    onClick={() => {showSprint ? setShowSprint(false) : setShowSprint(true); setShowQuali(false); setShowRace(false);}}>
                      {showSprint ? "Hide" : "Show"} Sprint Results
                  </button>}  
            {racePositions !== undefined && 
              <button 
                className="btn mx-2 text-gray-900 bg-gradient-to-r from-lime-200 to-amlime hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4 xl:w-[200px] w-40 box-border" 
                onClick={() => showPositions ? setShowPositions(false) : setShowPositions(true)}>
                  {showPositions ? "Hide" : "Show"} Race Positions
              </button>}
            </div>
          </div>
          <div className="px-4 items-center row-start-2 col-start-1 col-span-9 lg:col-span-4 xl:row-span-2 xl:row-start-1 xl:col-start-4 xl:col-span-5">
          {(showQuali && raceResult !== undefined) && <div className="w-3/4 h-1/2"><h2 className="text-lg font-medium pb-2">Qualifying Results</h2><ScrollArea className="h-[600px] w-full lg:w-fit rounded-md border p-4"><QualiTable /><ScrollBar orientation="horizontal"/></ScrollArea></div>}
          {(showSprint && raceResult !== undefined) && <div className="w-3/4 h-1/2"><h2 className="text-lg font-medium pb-2">Sprint Results</h2><ScrollArea className="h-[600px] w-full lg:w-fit rounded-md border p-4"><SprintTable /><ScrollBar orientation="horizontal"/></ScrollArea></div>}
          {(showRace && raceResult !== undefined) && <div className="w-3/4 h-1/2"><h2 className="text-lg font-medium pb-2">Race Results</h2><p className="pb-2">Click on Driver Name or Constructor to see their position in Driver and Constructor Standings</p><ScrollArea className="h-[600px] w-full lg:w-fit rounded-md border p-4"><RaceTable /><ScrollBar orientation="horizontal"/></ScrollArea></div>}
          </div>
          <div className=" col-span-3 h-fit space-y-2 xl:z-auto xl:bg-inherit xl:mt-14 xl:col-start-1 xl:col-span-4 xl:row-start-2 px-4 flex flex-col justify-center">
            {(driverStandings !== undefined && driver !== undefined && showDriverStandings === true) && <ScrollArea className="w-full xl:w-3/4 border-black border-2 rounded-md z-10 bg-amlime xl:bg-transparent xl:border-none bg-opacity-90" ><DriverStandingsTable /><ScrollBar orientation="horizontal" /></ScrollArea>}
            {(constructorStandings !== undefined && constructor !== undefined && showConstructorStandings === true) && <ScrollArea className="w-full xl:w-3/4 rounded-md z-10 bg-black xl:bg-transparent xl:border-none bg-opacity-80 border-2 border-amlime"><ConstructorStandingsTable /><ScrollBar orientation="horizontal" /></ScrollArea>}
          </div>
        </div>
      {(showPositions && racePositions !== undefined) && <div className="py-10 flex flex-col items-center"><h2 className="text-lg font-medium pb-2">Race Positions</h2><p>Click on a driver to see their race positions throughout the race</p><p>Hovering over a point on the graph will show the lap number and position</p><PositionsGraph options={options} /></div>}
    </div>
  )
}

export default HomePage