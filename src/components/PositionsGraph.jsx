import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, Colors } from "chart.js";
import { useRacePositionsStore } from "@/store";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, Colors);

const PositionsGraph = ({ options }) => {
  
  const racePositions = useRacePositionsStore(store => store.racePositions);
  
  return (
    <div className="mt-5 mx-auto bg-white rounded-md text-black w-11/12">
      <Line data={racePositions} options={options.current} ></Line>
    </div>
  )
}

export default PositionsGraph