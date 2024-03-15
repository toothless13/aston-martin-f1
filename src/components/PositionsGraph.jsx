import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, Colors } from "chart.js";
import { useRacePositionsStore } from "@/store";
import autocolors from "chartjs-plugin-autocolors";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, autocolors, Colors);

const PositionsGraph = ({ options }) => {
  
  const racePositions = useRacePositionsStore(store => store.racePositions);
  
  return (
    <div className="mx-4 bg-white rounded-md text-black">
      <Line data={racePositions} options={options.current} ></Line>
    </div>
  )
}

export default PositionsGraph