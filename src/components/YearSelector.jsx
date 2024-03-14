import { useYearsStore, useYearStore } from "@/store";

const YearSelector = ({ seasonRaces, setCircuitInfo, setQuali, setRaceResult, setRacePositions, setSprint, setDriver, setShowQuali, setShowSprint, setShowRace, setConstructor, setShowPositions }) => {
  
  const years = useYearsStore((store) => store.years);
  const year = useYearStore((store) => store.year);
  const setYear = useYearStore((store) => store.setYear);

  const handleYearChange = (e) => {
    e.preventDefault();
    setYear(e.target.value);
  }
  
  return (
    <select className="text-black" value={year} onChange={e => {handleYearChange(e); seasonRaces(e.target.value); setCircuitInfo(undefined); setQuali(undefined); setRaceResult(undefined); setRacePositions(undefined); setSprint(undefined); setDriver(undefined); setShowQuali(false); setShowSprint(false); setShowRace(false); setConstructor(undefined); setShowPositions(false); }}>
      <option value="" defaultValue hidden>Select a Year</option>
      {/* {console.log(years)} */}
      {years.map(y => <option key={y} value={y}>{y}</option>)}
    </select>
  )
}

export default YearSelector