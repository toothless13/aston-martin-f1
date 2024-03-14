import { create } from "zustand";
import { fetchYears } from "./api/requests";

export const useYearsStore = create((set) => ({
  years: [],
  fetch: async () => {
    const response = await fetchYears();
    // console.log(response);
    // set({ years: await response });
    set({years: await response});
  },
  setYears: (years) => set({years: years})
}));