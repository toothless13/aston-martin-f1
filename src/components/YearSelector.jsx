const YearSelector = ({ year, setYear, seasonRaces, setCircuitInfo, years, setQuali, setRaceResult, setRacePositions, setSprint, setDriver, setShowQuali, setShowSprint, setShowRace, setConstructor, setShowPositions }) => {
  return (
    <select className="text-black" value={year} onChange={e => {setYear(e.target.value); seasonRaces(e.target.value); setCircuitInfo(undefined); setQuali(undefined); setRaceResult(undefined); setRacePositions(undefined); setSprint(undefined); setDriver(undefined); setShowQuali(false); setShowSprint(false); setShowRace(false); setConstructor(undefined); setShowPositions(false); }}>
      <option value="" defaultValue hidden>Select a Year</option>
      {/* {console.log(years)} */}
      {years.map(y => <option key={y.season} value={y.season}>{y.season}</option>)}
    </select>
  )
}

export default YearSelector