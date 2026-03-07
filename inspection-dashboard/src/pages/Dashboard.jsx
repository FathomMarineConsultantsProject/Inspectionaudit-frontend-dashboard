import { useEffect, useState } from "react";
import { FaUsers, FaClipboardList, FaClock, FaHourglassHalf } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import MonthlyChart from "../components/MonthlyChart";
import LoginChart from "../components/LoginChart";
import RecentLogins from "../components/RecentLogins";
import RecentInspections from "../components/RecentInspections";

// Vercel Backend URL
const BASE_URL = "https://inspectionaudit-backend.vercel.app";

export default function Dashboard() {
  const [stats, setStats] = useState({
    inspectors: 0,
    inspections: 0,
    todayLogins: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inspectorsRes, quotationsRes, loginsRes] = await Promise.all([
        fetch(`${BASE_URL}/api/inspectors`),
        fetch(`${BASE_URL}/api/quotation`), // ✅ 'inspections' ki jagah 'quotations' use karein
        fetch(`${BASE_URL}/api/logins`),
      ]);

      const inspectorsData = await inspectorsRes.json();
      const quotationsData = await quotationsRes.json();
      const loginsData = await loginsRes.json();

      // Standardize data to arrays (Dono formats handle honge: array ya {data: []})
      const inspectorsArray = Array.isArray(inspectorsData) ? inspectorsData : inspectorsData.data || [];
      const quotationsArray = Array.isArray(quotationsData) ? quotationsData : quotationsData.data || [];
      const loginsArray = Array.isArray(loginsData) ? loginsData : loginsData.data || [];

      const today = new Date().toDateString();

      // Filter logins for today
      const todayLoginsCount = loginsArray.filter(
        (login) => login.createdAt && new Date(login.createdAt).toDateString() === today
      ).length;

      // MongoDB screenshot ke hisaab se 'Pending' status filter karein
      const pendingCount = quotationsArray.filter(
        (item) => item.status === "Pending"
      ).length;

      setStats({
        inspectors: inspectorsArray.length,
        inspections: quotationsArray.length, // Screenshot mein 47 documents hain, yahan wahi dikhega
        todayLogins: todayLoginsCount,
        pending: pendingCount,
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      setLoading(false);
    }
  };

  // Loading state handling
  if (loading) return <div style={{padding: '20px'}}>Loading dashboard data...</div>;

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Header />

        <div className="stats">
          <StatCard 
            title="Total Inspectors"
            value={stats.inspectors}
            color="#2563eb"
            icon={<FaUsers />}
          />
          <StatCard 
            title="Total Inspections"
            value={stats.inspections}
            color="#10b981"
            icon={<FaClipboardList />}
          />
          <StatCard 
            title="Today Logins"
            value={stats.todayLogins}
            color="#f97316"
            icon={<FaClock />}
          />
          <StatCard 
            title="Pending Inspections"
            value={stats.pending}
            color="#ef4444"
            icon={<FaHourglassHalf />}
          />
        </div>

        <div className="grid">
          <MonthlyChart />
          <LoginChart />
        </div>

        <div className="grid">
          <RecentLogins />
          <RecentInspections />
        </div>
      </main>
    </div>
  );
}