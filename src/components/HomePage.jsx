import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchQualiResults, fetchRaceResults, fetchRaces, fetchYears } from "@/api/requests";
import CircuitInfo from "./CircuitInfo";
import YearSelector from "./YearSelector";
import RaceSelector from "./RaceSelector";
import QualiTable from "./QualiTable";
import RaceTable from "./RaceTable";

const HomePage = () => {

  const [years, setYears] = useState([]);
  const [races, setRaces] = useState([]);
  const [year, setYear] = useState("");
  const [race, setRace] = useState("");
  const [circuitInfo, setCircuitInfo] = useState();
  const [quali, setQuali] = useState();
  const [raceResult, setRaceResult] = useState();

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

  // const qualiResults = async (year, race) => {
  //   const numYear = Number(year);
  //   if (numYear > 1993) {
  //     const quali = await fetchQualiResults(year, race);
  //     setQuali(quali);
  //   } else {
  //     console.log("No quali results for this time period");
  //   }
  // }

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

  useEffect(() => {
    if (circuitInfo) {
      qualiResults(year, circuitInfo[0].round);
      raceResults(year, circuitInfo[0].round);
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
      {/* {quali !== undefined  && console.log(quali)} */}
      {/* {quali !== undefined && <div>{quali.MRData.RaceTable.Races[0].QualifyingResults[0].Driver.driverId}</div>}
      {quali !== undefined && <div>{console.log(quali.MRData.RaceTable)}</div>}
      {quali !== undefined && <div>{quali.MRData.RaceTable.Races[0].QualifyingResults.map(driver => <p key={driver.position}>{driver.position} - {driver.Driver.givenName} {driver.Driver.familyName} Constructor: {driver.Constructor.name}</p>)}</div>} */}
      {quali !== undefined && <QualiTable quali={quali} />}
      {raceResult !== undefined && <RaceTable raceResult={raceResult} />}
    </div>
  )
}

export default HomePage