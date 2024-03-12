import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchQualiResults, fetchRaceResults, fetchRaces, fetchSprint, fetchYears } from "@/api/requests";
import CircuitInfo from "./CircuitInfo";
import YearSelector from "./YearSelector";
import RaceSelector from "./RaceSelector";
import QualiTable from "./QualiTable";
import RaceTable from "./RaceTable";
import SprintTable from "./SprintTable";

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
      // console.log(yearsArr);
      setYears(yearsArr);
    }
  }, [raceYears]);

  const handleRaceSelect = (e) => {
    e.preventDefault();
    const raceName = e.target.value;
    const raceInfo = races.filter(race => race.raceName === raceName);
    // console.log(raceInfo);
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
        console.log("No race results for this combination");
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
    // console.log(quali);
  }, [circuitInfo]);

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
    </div>
  )
}

export default HomePage