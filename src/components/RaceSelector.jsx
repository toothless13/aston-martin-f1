const RaceSelector = ({ race, setRace, handleRaceSelect, races, setQuali, setRaceResult, setRacePositions, setSprint, setDriver }) => {
  return (
        <select className="text-black" value={race} onChange={e => {setRace(e.target.value); handleRaceSelect(e); setQuali(undefined); setRaceResult(undefined); setRacePositions(undefined); setSprint(undefined); setDriver(undefined); }}>
          <option value="" defaultValue hidden>Select a Race</option>
          {races.map(r => <option key={r.round} value={r.raceName}>{r.raceName}</option>)}
        </select>
  )
}

export default RaceSelector