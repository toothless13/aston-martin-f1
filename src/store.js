import { create } from "zustand";
import { fetchYears } from "./api/requests";

export const useYearsStore = create((set) => ({
  years: [],
  fetch: async () => {
    const response = await fetchYears();
    set({years: await response});
  },
  setYears: (years) => set({ years: years })
}));

export const useYearStore = create((set) => ({
  year: "",
  setYear: (year) => set({ year: year })
}));

export const useRacesStore = create((set) => ({
  races: [],
  setRaces: (races) => set({ races: races })
}));

export const useRaceStore = create((set) => ({
  race: "",
  setRace: (race) => set({ race: race}),
  resetRace: () => set({ race: "" })
}));

export const useCircuitInfoStore = create((set) => ({
  circuitInfo : undefined,
  setCircuitInfo: (circuitInfo) => set({ circuitInfo: circuitInfo}),
  resetCircuitInfo: () => set({ circuitInfo: undefined})
}));

export const useQualiStore = create((set) => ({
  quali: undefined,
  setQuali: (quali) => set({ quali: quali }),
  resetQuali: () => set({ quali: undefined })
}));

export const useRaceResultStore = create ((set) => ({
  raceResult: undefined,
  setRaceResult: (raceResult) => set({ raceResult: raceResult }),
  resetRaceResult: () => set({ raceResult: undefined })
}));

export const useSprintStore = create((set) => ({
  sprint: undefined,
  setSprint: (sprint) => set({ sprint: sprint }),
  resetSprint: () => set({ sprint: undefined })
}));

export const useShowQualiStore = create((set) => ({
  showQuali: false,
  // setShowQuali: (showQuali) => { showQuali ? set({ showQuali: false }) : set({ showQuali: true })}
  setShowQuali: (showQuali) => set({ showQuali: showQuali }),
  resetShowQuali: () => set({ showQuali: false })
}));

export const useShowSprintStore = create((set) => ({
  showSprint: false,
  setShowSprint: (showSprint) => set({ showSprint: showSprint }),
  resetShowSprint: () => set({ showSprint: false})
}));

export const useShowRaceStore = create((set) => ({
  showRace: false,
  setShowRace: (showRace) => set({ showRace: showRace }),
  resetShowRace: () => set({ showRace: false})
}));

export const useShowPositionsStore = create((set) => ({
  showPositions: false,
  setShowPositions: (showPositions) => set({ showPositions: showPositions }),
  resetShowPositions: () => set({ showPositions: false})
}));

export const useRacePositionsStore = create((set) => ({
  racePositions: undefined,
  setRacePositions: (racePositions) => set({ racePositions: racePositions }),
  resetRacePositions: () => set({ racePositions: undefined })
}));

export const useDriverStandingsStore = create((set) => ({
  driverStandings: undefined,
  setDriverStandings: (driverStandings) => set({ driverStandings: driverStandings }),
  resetDriverStandings: () => set({ driverStandings: undefined })
}));

export const useDriverStore = create((set) => ({
  driver: undefined,
  setDriver: (driver) => set({ driver: driver }),
  resetDriver: () => set({ driver: undefined })
}));

export const useConstructorStandingsStore = create((set) => ({
  constructorStandings: undefined,
  setConstructorStandings: (constructorStandings) => set({ constructorStandings: constructorStandings }),
  resetConstructorStandings: () => set({ constructorStandings : undefined })
}));

export const useConstructorStore = create((set) => ({
  constructor: undefined,
  setConstructor: (constructor) => set({ constructor: constructor }),
  resetConstructor: () => set({ constructor: undefined })
}));
