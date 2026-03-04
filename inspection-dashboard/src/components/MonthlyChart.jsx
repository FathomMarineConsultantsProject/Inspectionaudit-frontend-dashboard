import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function MonthlyChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://inspectionaudit-backend.vercel.app";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/inspections`);
        const json = await res.json();

        // FIX: Check karein agar data array hai ya json.data array hai
        // Kyunki backend aksar { success: true, data: [] } bhejta hai
        const actualData = Array.isArray(json) ? json : (json.data || json.inspections || []);

        if (!Array.isArray(actualData)) {
          console.error("Data is not an array:", json);
          setLoading(false);
          return;
        }

        const monthlyCounts = new Array(12).fill(0);

        actualData.forEach((item) => {
          // Check for 'createdAt' or 'inspectionDate'
          const dateSource = item.createdAt || item.inspectionDate;
          if (dateSource) {
            const date = new Date(dateSource);
            if (!isNaN(date)) {
              const month = date.getMonth();
              monthlyCounts[month]++;
            }
          }
        });

        setChartData({
          labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          datasets: [
            {
              label: "Monthly Inspections",
              data: monthlyCounts,
              backgroundColor: "#10b981",
              borderRadius: 5,
            }
          ]
        });
      } catch (err) {
        console.error("Monthly Chart Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div style={{padding: "20px", textAlign: "center"}}>Loading Chart...</div>;
  
  if (!chartData) return <div style={{padding: "20px", color: "red"}}>No data available for chart</div>;

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Bar 
        data={chartData} 
        options={{ 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: { legend: { display: true, position: 'top' } }
        }} 
      />
    </div>
  );
}