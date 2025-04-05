import "chart.js/auto";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { PivotConfig, ResultSet } from "@cubejs-client/core";
import { type ChartType } from "./types";

interface ChartViewerProps {
  resultSet: ResultSet;
  pivotConfig: PivotConfig;
  chartType: ChartType;
}

export function ChartViewer(props: ChartViewerProps) {
  const { resultSet, pivotConfig, chartType } = props;

  const data = {
    labels: resultSet.chartPivot(pivotConfig).map((row) => row.x),
    datasets: resultSet.series(pivotConfig).map((item) => {
      return {
        fill: chartType === "area",
        label: item.title,
        data: item.series.map(({ value }) => value),
      };
    }),
  };

  const ChartElement = {
    area: Line,
    bar: Bar,
    doughnut: Doughnut,
    line: Line,
    pie: Pie,
  }[chartType as Exclude<ChartType, "table">];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      x: {
        ticks: { autoSkip: true, maxTicksLimit: 10 },
        title: {
          display: true,
          text: "X Axis",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Y Axis",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
      <ChartElement data={data} options={options} />
    </div>
  );
}
