import { fetchRaces } from "@/api/requests";
import { useRaceStore, useRacesStore, useQualiStore, useRaceResultStore, useSprintStore, useShowQualiStore, useShowSprintStore, useShowRaceStore, useRacePositionsStore, useDriverStore, useConstructorStore, useShowPositionsStore, useYearStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const RaceSelector = ({ handleRaceSelect }) => {
  
  const races = useRacesStore(store => store.races);
  const race = useRaceStore(store => store.race);
  const setRace = useRaceStore(store => store.setRace);
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
  const year = useYearStore(store => store.year);
  const setRaces = useRacesStore(store => store.setRaces);

  const racesQuery = useQuery({
    queryKey: ["races", year],
    enabled: year !== undefined,
    queryFn: () => fetchRaces(year)
  });

  useEffect(() => {
    if (racesQuery.data) {
      setRaces(racesQuery.data)
    }
  }, [racesQuery]);

  return (
        <select className="text-black border-amlime border-2 rounded-md m-4 h-8" value={race} onChange={e => {setRace(e.target.value); handleRaceSelect(e); resetQuali(); resetRaceResult(); resetRacePositions(); resetSprint(); resetDriver(); resetShowQuali(); resetShowSprint(); resetShowRace(); resetConstructor(); resetShowPositions(); }}>
          <option value="" defaultValue hidden>Select a Race</option>
          {races.map(r => <option key={r.round} value={r.raceName}>{r.raceName}</option>)}
        </select>
  )
}

export default RaceSelector