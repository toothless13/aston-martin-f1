import { useCircuitInfoStore } from "@/store"

const CircuitInfo = () => {

  const circuitInfo = useCircuitInfoStore(store => store.circuitInfo);

  return (
    <div>
      <p>{circuitInfo[0].raceName}</p>
      <p>{circuitInfo[0].Circuit.circuitName}</p>
      <p>{circuitInfo[0].round}</p>
      <p>{circuitInfo[0].date}</p>
    </div>
  )
}

export default CircuitInfo