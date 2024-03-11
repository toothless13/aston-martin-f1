const YearSelector = ({ year, setYear, seasonRaces, setCircuitInfo, years, setQuali }) => {
  return (
    <select className="text-black" value={year} onChange={e => {setYear(e.target.value); seasonRaces(e.target.value); setCircuitInfo(undefined); setQuali(undefined);}}>
      <option value="" defaultValue hidden>Select a Year</option>
      {years.map(y => <option key={y} value={y}>{y}</option>)}
    </select>
  )
}

export default YearSelector