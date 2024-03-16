import { useLoadingStore } from "@/store"

export const useLoading = status => {
  const setLoading = useLoadingStore(store => store.setLoading);
  setLoading(status);
}