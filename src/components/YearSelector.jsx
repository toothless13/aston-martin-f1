import { useCircuitInfoStore, useQualiStore, useRaceResultStore, useRaceStore, useShowQualiStore, useShowSprintStore, useShowRaceStore, useSprintStore, useYearStore, useRacePositionsStore, useDriverStore, useConstructorStore, useShowPositionsStore } from "@/store";
import { fetchYears } from "@/api/requests";
import { useQuery } from "@tanstack/react-query";

const YearSelector = () => {
  
  const year = useYearStore(store => store.year);
  const setYear = useYearStore(store => store.setYear);
  const resetRace = useRaceStore(store => store.resetRace);
  const resetCircuitInfo = useCircuitInfoStore(store => store.resetCircuitInfo);
  const resetQuali = useQualiStore(store => store.resetQuali);
  const resetRaceResult = useRaceResultStore(store => store.resetRaceResult);
  const resetSprint = useSprintStore(store => store.resetSprint);
  const resetShowQuali = useShowQualiStore(store => store.resetShowQuali);
  const resetShowSprint = useShowSprintStore(store => store.resetShowSprint);
  const resetShowRace = useShowRaceStore(store => store.resetShowRace);
  const resetRacePositions = useRacePositionsStore(store => store.resetRacePositions);
  const resetDriver = useDriverStore(store => store.resetDriver);
  const resetConstructor = useConstructorStore(store => store.resetConstructor);
  const resetShowPositions = useShowPositionsStore(store => store.resetShowPositions);

  const { data: raceYears, status: yearsStatus, error: yearsError } = useQuery({
    queryFn: fetchYears,
    queryKey: ["years"],
  });

  if (yearsStatus === "loading") {
    console.log(yearsStatus)
    return <div>Loading...</div>
  }

  if (yearsStatus === "error") {
    return <div>{JSON.stringify(yearsError)}</div>
  }

 
  return (
    <select className="text-black" value={year} onChange={e => {setYear(e.target.value); resetRace(); resetCircuitInfo(); resetQuali(); resetRaceResult(); resetRacePositions(); resetSprint(); resetDriver(); resetShowQuali(); resetShowSprint(); resetShowRace(); resetConstructor(); resetShowPositions(); }}>
      <option value="" defaultValue hidden>Select a Year</option>
      {raceYears !== undefined && raceYears.map(y => <option key={y.season} value={y.season}>{y.season}</option>)}
    </select>
  )
}

export default YearSelector