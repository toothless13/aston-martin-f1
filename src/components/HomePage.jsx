import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchRaces, fetchYears } from "@/api/requests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const HomePage = () => {

  const [years, setYears] = useState([]);
  const [races, setRaces] = useState([]);
  const [year, setYear] = useState("");

  const { data: raceYears, status: yearsStatus, error: yearsError } = useQuery({
    queryFn: fetchYears,
    queryKey: ["years"],
  });

  const { data: seasonRaces, status: raceStatus, error: raceError } = useQuery({
    queryFn: fetchRaces(year),
    queryKey: ["races", year],
    refetchOnWindowFocus: false,
    enabled: !!year,
  })

  useEffect(() => {
    if (raceYears !== undefined) {
      const yearsArr = raceYears.map(year => year.season);
      // console.log(yearsArr);
      setYears(yearsArr);
    }
  }, [raceYears]);

  useEffect(() => {
    if (seasonRaces !== undefined) {
      const racesArr = seasonRaces.map(race => console.log(race));

    }
  }, [seasonRaces]);

  const handleChange = e => {
    e.preventDefault();
    // console.log(e);
    // setYear(e.target.value);
    const formData = new FormData(e.target);
    // const raceYear = formData.get("race-year");
    const raceYear = formData.values();
    console.log(raceYear);
  }

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
      <form>
      {years !== undefined && <Select className="text-black cursor-pointer" value={year} onChange={e => console.log(e.target.value)}>
        <SelectTrigger className="w-[180px] text-black" onSelect={handleChange}>
          <SelectValue value={year}/>
        </SelectTrigger>
        <SelectContent onSelect={handleChange}>
          {years.map(year => <SelectItem id="race-year" name="race-year" key={year} value={year} className="cursor-pointer" onSelect={handleChange}>{year}</SelectItem>)}
        </SelectContent>
      </Select>}
      <button type="submit">Select Year</button>
      </form>
    </div>
  )
}

export default HomePage