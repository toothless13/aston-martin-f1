import axios from "axios";

export function fetchYears()  {
    return axios.get("https://ergast.com/api/f1/seasons.json?limit=80")
    .then(res => res.data.MRData.SeasonTable.Seasons.reverse())
    .catch(error => window.alert(error.message));
}

export function fetchRaces(year) {
  if (year) {
    return axios.get(`https://ergast.com/api/f1/${year}.json?limit=30`)
    .then(res => res.data.MRData.RaceTable.Races)
    .catch(error => window.alert(error.message));
  } 
}

export function fetchQualiResults(year, race) {
  if (year && race) {
      return axios.get(`https://ergast.com/api/f1/${year}/${race}/qualifying.json`)
      .then(res => res.data)
      .catch(error => window.alert(error.message));
  }
}

export function fetchRaceResults(year, race) {
  if (year && race) {
      return axios.get(`https://ergast.com/api/f1/${year}/${race}/results.json`)
      .then(res => res.data)
      .catch(error => window.alert(error.message));
  }
}

export function fetchSprint(year, race) {
  if (year && race) {
    return axios.get(`https://ergast.com/api/f1/${year}/${race}/sprint.json`)
    .then(res => res.data)
    .catch(error => window.alert(error.message));
  }
}

export function fetchLaps(year, race, driver) {
  if (year && race && driver) {
    return axios.get(`https://ergast.com/api/f1/${year}/${race}/drivers/${driver}/laps.json?limit=100`)
    .then(res => res.data)
    .catch(error => window.alert(error.message));
  }
}

export function fetchDriverStandings(year, race) {
  if (year && race) {
    return axios.get(`https://ergast.com/api/f1/${year}/${race}/driverStandings.json?limit=40`)
    .then(res => res.data.MRData.StandingsTable)
    .catch(error => window.alert(error.message));
  }
}

export function fetchConstructorStandings(year, race) {
  if (year && race) {
    return axios.get(`https://ergast.com/api/f1/${year}/${race}/constructorStandings.json?limit=40`)
    .then(res => res.data.MRData.StandingsTable)
    .catch(error => window.alert(error.message));
  }
}