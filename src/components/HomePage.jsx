import { useQueries, useQuery } from "@tanstack/react-query";
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
    select: (years) => years.map((year) => year.season),
  });

  const seasonRaces = useQueries({
    queries: raceYears
      ? raceYears.map((year) => {
        return {
          queryKey: ["races", year],
          queryFn: () => fetchRaces(year)
        }
      })
      : [],
  })

  // const { data: seasonRaces, status: raceStatus, error: raceError, refetch } = useQuery({
  //   queryFn: fetchRaces(year),
  //   queryKey: ["races", year],
  //   refetchOnWindowFocus: false,
  //   // enabled: !!year,
  //   enabled: false
  // })



  // const seasonRaces = async (year) => {
  //   const races = await fetchRaces(year);
  //   setRaces(races);
  // }

  useEffect(() => {
    if (raceYears !== undefined) {
      const yearsArr = raceYears.map(year => year.season);
      // console.log(yearsArr);
      setYears(yearsArr);
    }
  }, [raceYears]);

  // const { data: seasonRaces, status: raceStatus, error: raceError, refetch } = useQuery({
  //     queryFn: fetchRaces(year),
  //     queryKey: ["races", year],
  //     refetchOnWindowFocus: false,
  //     // enabled: !!year,
  //     enabled: false
  //   })

  const handleRaceSelect = (e) => {
    e.preventDefault();
    const raceName = e.target.value;
    const raceInfo = races.filter(race => race.raceName === raceName);
    // console.log(raceInfo);
    setCircuitInfo(raceInfo);
  }

  // useEffect(() => {
  //   refetch();
  //   setRaces(seasonRaces);
  // }, [year, seasonRaces, refetch]);

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
      <select className="text-black" value={year} onChange={e => {setYear(e.target.value); setCircuitInfo(undefined)}}>
        <option value="" defaultValue hidden>Select a Year</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
        {/* {year !== undefined && <select className="text-black" value={race} onChange={e => {setRace(e.target.value); handleRaceSelect(e);}}>
          <option value="" defaultValue hidden>Select a Race</option>
          {console.log(races)}
          {races.map(r => <option key={r.round} value={r.raceName}>{r.raceName}</option>)}
        </select>} */}
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