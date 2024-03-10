const RaceSelector = ({ race, setRace, handleRaceSelect, races }) => {
  return (
        <select className="text-black" value={race} onChange={e => {setRace(e.target.value); handleRaceSelect(e);}}>
          <option value="" defaultValue hidden>Select a Race</option>
          {races.map(r => <option key={r.round} value={r.raceName}>{r.raceName}</option>)}
        </select>
  )
}

export default RaceSelector