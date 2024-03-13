import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const PositionsGraph = ({ racePositions, options }) => {

  return (
    <div className="mx-4">
      <Line data={racePositions} options={options.current} ></Line>
    </div>
  )
}

export default PositionsGraph