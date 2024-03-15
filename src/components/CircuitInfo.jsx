import { useCircuitInfoStore } from "@/store"

const CircuitInfo = () => {

  const circuitInfo = useCircuitInfoStore(store => store.circuitInfo);

  const date = circuitInfo[0].date;
  const formatDate = date => {
    const dateArray = date.split("-");
    return dateArray.reverse().join("-");
  }

  const newDate = formatDate(date);

  return (
    <div className="p-4 flex flex-col justify-between gap-1">
      <p className="text-2xl font-bold">{circuitInfo[0].raceName}</p>
      <p>{circuitInfo[0].Circuit.circuitName}</p>
      <p>Round: {circuitInfo[0].round}</p>
      <p>Date: {newDate}</p>
    </div>
  )
}

export default CircuitInfo