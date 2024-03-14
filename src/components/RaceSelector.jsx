import { useRacesStore } from "@/store";

const RaceSelector = ({ race, setRace, handleRaceSelect, setQuali, setRaceResult, setRacePositions, setSprint, setDriver, setShowQuali, setShowSprint, setShowRace, setConstructor, setShowPositions }) => {
  
  const races = useRacesStore(store => store.races);

  return (
        <select className="text-black" value={race} onChange={e => {setRace(e.target.value); handleRaceSelect(e); setQuali(undefined); setRaceResult(undefined); setRacePositions(undefined); setSprint(undefined); setDriver(undefined); setShowQuali(false); setShowSprint(false); setShowRace(false); setConstructor(undefined); setShowPositions(false); }}>
          <option value="" defaultValue hidden>Select a Race</option>
          {races.map(r => <option key={r.round} value={r.raceName}>{r.raceName}</option>)}
        </select>
  )
}

export default RaceSelector