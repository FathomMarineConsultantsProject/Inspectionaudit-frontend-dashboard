import React, { useEffect, useState } from "react";
// CSS file ka path sahi karein
import "../styles/inspectors.css"; 
// Agar aap icons use karna chahte hain (npm install react-icons)
import { FaFilter, FaPlus } from "react-icons/fa"; 

export default function Inspectors() {
  const [inspectors, setInspectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = "https://inspectionaudit-backend.vercel.app";

    fetch(`${BASE_URL}/api/inspectors`)
      .then((res) => res.json())
      .then((data) => {
        // API response ke structure ke hisaab se (agar .data mein hai)
        setInspectors(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="inspectors-container">
      {/* Page Header */}
      <div className="page-header">
        <h2 className="page-title">Employees</h2>
        <div className="header-actions">
          <button className="btn-icon">
            <FaFilter />
          </button>
          <button className="btn-primary">
            <FaPlus /> View Subscription
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="table-card">
        {loading ? (
          <p className="loading-text">Loading data...</p>
        ) : inspectors.length === 0 ? (
          <p className="loading-text">No employees found.</p>
        ) : (
          <table className="employees-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Emp id</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {inspectors.map((inspector) => (
                <tr key={inspector._id}>
                  <td className="name-cell">
                    <img 
                      src={inspector.avatar || "https://via.placeholder.com/40"} 
                      alt={inspector.fullName} 
                      className="avatar"
                    />
                    <div>
                      <div className="cell-main">{inspector.fullName || "N/A"}</div>
                      <div className={`cell-sub ${inspector.isProfileComplete ? "online" : "offline"}`}>
                        {inspector.isProfileComplete ? "Online" : "Offline"}
                      </div>
                    </div>
                  </td>
                  <td>{inspector.empId || "---"}</td>
                  <td>{inspector.age || "---"}</td>
                  <td>{inspector.email}</td>
                  <td>{inspector.phone || "---"}</td>
                  <td>{inspector.title || "---"}</td>
                  <td>{inspector.company || "---"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}