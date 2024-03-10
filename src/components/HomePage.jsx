import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchRaces, fetchYears } from "@/api/requests";

const HomePage = () => {

  const [years, setYears] = useState([]);
  const [races, setRaces] = useState([]);
  const [year, setYear] = useState("");
  const [race, setRace] = useState("");
  const [circuitInfo, setCircuitInfo] = useState(
  //   {
  //   raceName: "",
  //   circuitName: "",
  //   round: "",
  //   date: "",
  // }
  );

  const { data: raceYears, status: yearsStatus, error: yearsError } = useQuery({
    queryFn: fetchYears,
    queryKey: ["years"],
  });

  // const { data: seasonRaces, status: raceStatus, error: raceError, refetch } = useQuery({
  //   queryFn: fetchRaces(year),
  //   queryKey: ["races", year],
  //   refetchOnWindowFocus: false,
  //   // enabled: !!year,
  //   enabled: false
  // })

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

  // useEffect(() => {
  //   // if (year !== undefined) {
  //     // refetch();
  //     // const racesArr = seasonRaces.map(race => console.log(race));
  //     seasonRaces(year);
      
  //   // }
  // }, [year]);

  if (yearsStatus === "loading") {
    console.log(yearsStatus)
    return <div>Loading...</div>
  }

  if (yearsStatus === "error") {
    return <div>{JSON.stringify(yearsError)}</div>
  }

  return (
    <div>
      HomePage
      <select className="text-black" value={year} onChange={e => {setYear(e.target.value); seasonRaces(e.target.value); setCircuitInfo(undefined)}}>
        <option value="" default selected hidden>Select a Year</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
        {year !== undefined && <select className="text-black" value={race} onChange={e => {setRace(e.target.value); handleRaceSelect(e);}}>
          <option value="" default selected hidden>Select a Race</option>
          {races.map(r => <option key={r.round} value={r.raceName}>{r.raceName}</option>)}
        </select>}
        {circuitInfo !== undefined && <div>
          <p>{circuitInfo[0].raceName}</p>
          <p>{circuitInfo[0].Circuit.circuitName}</p>
          <p>{circuitInfo[0].round}</p>
          <p>{circuitInfo[0].date}</p>
        </div>}
    </div>
  )
}

export default HomePage