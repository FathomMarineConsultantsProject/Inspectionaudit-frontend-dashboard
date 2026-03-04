import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function LoginChart() {
  const [chartData, setChartData] = useState(null);

  const BASE_URL = "https://inspectionaudit-backend.vercel.app";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/logins`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Invalid API response");
          return;
        }

        const last7Days = [];
        const counts = [];

        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const formatted = date.toDateString();

          last7Days.push(
            date.toLocaleDateString("en-US", { weekday: "short" })
          );

          const count = data.filter((item) =>
            new Date(item.createdAt).toDateString() === formatted
          ).length;

          counts.push(count);
        }

        setChartData({
          labels: last7Days,
          datasets: [
            {
              label: "Last 7 Days Logins",
              data: counts,
              borderColor: "#2563eb",
              backgroundColor: "#93c5fd",
              tension: 0.4
            }
          ]
        });

      } catch (err) {
        console.error("Login Chart Error:", err);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <div>Loading Chart...</div>;

  return <Line data={chartData} />;
}