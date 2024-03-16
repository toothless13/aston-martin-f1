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
    <div className="p-4 flex flex-col col-span-2 gap-2 xl:justify-between xl:gap-1">
      <p className="text-2xl font-bold">{circuitInfo[0].raceName}</p>
      <p className="text-lg font-medium">Circuit: <span className="font-normal text-base">{circuitInfo[0].Circuit.circuitName}</span></p>
      <p className="text-lg font-medium">Round: <span className="font-normal text-base">{circuitInfo[0].round}</span></p>
      <p className="text-lg font-medium">Date: <span className="font-normal text-base">{newDate}</span></p>
    </div>
  )
}

export default CircuitInfo