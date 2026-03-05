import React, { useEffect, useState } from "react";
import "../styles/inspectors.css";
import { FaFilter, FaPlus, FaUserCheck, FaBriefcase, FaCalendarAlt, FaUserTimes } from "react-icons/fa";

export default function Inspectors() {
  const [inspectors, setInspectors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [available, setAvailable] = useState(0);
  const [busy, setBusy] = useState(0);
  const [leave, setLeave] = useState(0);
  const [unavailable, setUnavailable] = useState(0);

  useEffect(() => {
    const BASE_URL = "https://inspectionaudit-backend.vercel.app";

    fetch(`${BASE_URL}/api/inspectors`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        setInspectors(list);

        // availability calculation
        let a = 0, b = 0, l = 0, u = 0;

        list.forEach((i) => {
          if (i.status === "available") a++;
          else if (i.status === "busy") b++;
          else if (i.status === "leave") l++;
          else u++;
        });

        setAvailable(a);
        setBusy(b);
        setLeave(l);
        setUnavailable(u);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="inspectors-container">

      {/* Availability Cards */}
      <div className="status-cards">

        <div className="status-card">
          <div className="status-icon available">
            <FaUserCheck />
          </div>
          <h2>{available}</h2>
          <p>AVAILABLE</p>
        </div>

        <div className="status-card">
          <div className="status-icon busy">
            <FaBriefcase />
          </div>
          <h2>{busy}</h2>
          <p>BUSY</p>
        </div>

        <div className="status-card">
          <div className="status-icon leave">
            <FaCalendarAlt />
          </div>
          <h2>{leave}</h2>
          <p>ON LEAVE</p>
        </div>

        <div className="status-card">
          <div className="status-icon unavailable">
            <FaUserTimes />
          </div>
          <h2>{unavailable}</h2>
          <p>UNAVAILABLE</p>
        </div>

      </div>

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