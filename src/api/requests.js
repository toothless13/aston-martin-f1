import axios from "axios";

export function fetchYears()  {
  try {
    return axios.get("https://ergast.com/api/f1/seasons.json?limit=80")
    .then(res => res.data.MRData.SeasonTable.Seasons);
  } catch (error) {
    console.log(error.message);
  }
}

export function fetchRaces(year) {
  // console.log(year);
  if (year) {
    return axios.get(`https://ergast.com/api/f1/${year}.json?limit=30`)
  .then(res => res.data.MRData.RaceTable.Races);
  }
}

export function fetchQualiResults(year, race) {
  // console.log(race);
  if (year && race) {
    return axios.get(`https://ergast.com/api/f1/${year}/${race}/qualifying.json`)
    .then(res => res.data);
  }
}

export function fetchRaceResults(year, race) {
  if (year && race) {
    return axios.get(`https://ergast.com/api/f1/${year}/${race}/results.json`)
    .then(res => res.data);
  }
}

export function fetchSprint(year, race) {
  if (year && race) {
    return axios.get(`https://ergast.com/api/f1/${year}/${race}/sprint.json`)
    .then(res => res.data);
  }
}

export function fetchLaps(year, race, driver) {
  if (year && race && driver) {
    return axios.get(`https://ergast.com/api/f1/${year}/${race}/drivers/${driver}/laps.json?limit=100`)
    .then(res => res.data);
  }
}