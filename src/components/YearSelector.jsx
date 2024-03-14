import { useCircuitInfoStore, useQualiStore, useRaceResultStore, useRaceStore, useShowQualiStore, useShowSprintStore, useShowRaceStore, useSprintStore, useYearsStore, useYearStore, useRacePositionsStore, useDriverStore, useConstructorStore, useShowPositionsStore } from "@/store";

const YearSelector = () => {
  
  const years = useYearsStore(store => store.years);
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
 
  return (
    <select className="text-black" value={year} onChange={e => {setYear(e.target.value); resetRace(); resetCircuitInfo(); resetQuali(); resetRaceResult(); resetRacePositions(); resetSprint(); resetDriver(); resetShowQuali(); resetShowSprint(); resetShowRace(); resetConstructor(); resetShowPositions(); }}>
      <option value="" defaultValue hidden>Select a Year</option>
      {years.map(y => <option key={y} value={y}>{y}</option>)}
    </select>
  )
}

export default YearSelector