import axios from "axios";

export function fetchYears()  {
  return axios.get("https://ergast.com/api/f1/seasons.json?limit=80")
  .then(res => res.data.MRData.SeasonTable.Seasons);
}

export function fetchRaces(year) {
  console.log(year);
  if (year) {
    return axios.get(`https://ergast.com/api/f1/${year}.json?limit=30`)
  .then(res => res.data.MRData.RaceTable.Races);
  }
}

export function fetchQualiResults(year, race) {
  console.log(race);
  if (year && race) {
    return axios.get(`https://ergast.com/api/f1/${year}/${race}/qualifying.json`)
    .then(res => res.data);
  }
}