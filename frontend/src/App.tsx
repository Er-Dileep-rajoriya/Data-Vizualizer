import Navbar from "./components/Navbar/Navbar.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PieChart from "./components/PieChart.tsx";
import BarChart from "./components/BarChart.tsx";
import LineChart from "./components/LineChart.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <BarChart filters={[]} timeDimensions={[]} />,
      },
      {
        path: "/line",
        element: <LineChart filters={[]} timeDimensions={[]} />,
      },
      {
        path: "/pie",
        element: <PieChart filters={[]} timeDimensions={[]} />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
