import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import BarChart from "../BarChart";
import LineChart from "../LineChart";
import PieChart from "../PieChart";
import { Filter as CubeFilter, TimeDimension } from "@cubejs-client/core";

function Dashboard() {
  const [filters, setFilters] = useState({
    dateRange: { from: "", to: "" },
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const buildCubeFilters = (): CubeFilter[] => {
    const cubeFilters: CubeFilter[] = [];

    if (filters.name) {
      cubeFilters.push({
        dimension: "Metric.name",
        operator: "contains",
        values: [filters.name],
      });
    }

    return cubeFilters;
  };

  const buildTimeDimensions = (): TimeDimension[] => {
    const { from, to } = filters.dateRange;

    if (from && to) {
      return [
        {
          dimension: "Metric.timestamp",
          dateRange: [from, to],
        },
      ];
    }

    return [];
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <FilterBar
        dateRange={filters.dateRange}
        name={filters.name}
        onFilterChange={setFilters}
      />

      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin h-12 w-12 border-4 border-t-transparent border-blue-500 rounded-full mx-auto" />
          <p className="text-gray-600 mt-4">Loading charts...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold py-10">
          {error}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
            <BarChart
              filters={buildCubeFilters()}
              timeDimensions={buildTimeDimensions()}
            />
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
            <LineChart
              filters={buildCubeFilters()}
              timeDimensions={buildTimeDimensions()}
            />
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Pie Chart</h2>
            <PieChart
              filters={buildCubeFilters()}
              timeDimensions={buildTimeDimensions()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
