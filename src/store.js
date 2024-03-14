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