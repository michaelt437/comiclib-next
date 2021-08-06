import { useRef } from "react";
import { Chart, BarElement, BarController, ChartItem } from "chart.js";
Chart.register(BarElement, BarController);

export default function PublisherBarGraph () {
  const chartRef = useRef<HTMLCanvasElement>(null);
  return (
    <div id="chart-container" className="col-auto row-auto">
      <canvas id="chart" ref={chartRef}></canvas>
    </div>
  );
}