import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";
import { useRacePositionsStore } from "@/store";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const PositionsGraph = ({ options }) => {
  
  const racePositions = useRacePositionsStore(store => store.racePositions);

  return (
    <div className="mx-4">
      <Line data={racePositions} options={options.current} ></Line>
    </div>
  )
}

export default PositionsGraph