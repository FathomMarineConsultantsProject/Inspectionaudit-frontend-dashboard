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
    const [inspectorsRes, inspectionsRes, loginsRes] = await Promise.all([
      fetch(`${BASE_URL}/api/inspectors`),
      fetch(`${BASE_URL}/api/inspections`),
      fetch(`${BASE_URL}/api/logins`),
    ]);
    // Backend route to fetch data

    const inspectorsData = await inspectorsRes.json();
    const inspectionsData = await inspectionsRes.json();
    const loginsData = await loginsRes.json();

    // 🔥 FIX: Check karein ki data array hai ya object ke andar data hai
    const inspectionsArray = Array.isArray(inspectionsData) ? inspectionsData : inspectionsData.data || [];
    const loginsArray = Array.isArray(loginsData) ? loginsData : loginsData.data || [];
    const inspectorsArray = Array.isArray(inspectorsData) ? inspectorsData : inspectorsData.data || [];

    console.log("Processed Inspections:", inspectionsArray);

    const today = new Date().toDateString();

    // Ab filter function kaam karega kyunki ye Array hai
    const todayLogins = loginsArray.filter(
      (login) => new Date(login.createdAt).toDateString() === today
    );

    const pendingInspections = inspectionsArray.filter(
      (inspection) => inspection.status === "Pending"
    );

    setStats({
      inspectors: inspectorsArray.length,
      inspections: inspectionsArray.length,
      todayLogins: todayLogins.length,
      pending: pendingInspections.length,
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