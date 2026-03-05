import React, { useEffect, useState } from "react";
import "../styles/inspectors.css";
import {
  FaFilter,
  FaPlus,
  FaUser,
  FaBriefcase,
  FaCalendarAlt,
  FaUserTimes
} from "react-icons/fa";

export default function Inspectors() {
  const [inspectors, setInspectors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    available: 0,
    busy: 0,
    leave: 0,
    unavailable: 0
  });

  useEffect(() => {
    const BASE_URL = "https://inspectionaudit-backend.vercel.app";

    fetch(`${BASE_URL}/api/inspectors`)
      .then((res) => res.json())
      .then((data) => {
        const inspectorsData = Array.isArray(data) ? data : data.data || [];

        setInspectors(inspectorsData);

        let available = 0;
        let busy = 0;
        let leave = 0;
        let unavailable = 0;

        inspectorsData.forEach((emp) => {
          switch (emp.status) {
            case "busy":
              busy++;
              break;
            case "leave":
              leave++;
              break;
            case "unavailable":
              unavailable++;
              break;
            default:
              available++;
          }
        });

        setStats({
          available,
          busy,
          leave,
          unavailable
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="inspectors-container">

      {/* STATUS CARDS */}
    
<div className="status-cards">

  <div className="status-card">
    <div className="status-icon available">
      <FaUser />
    </div>
    <h2>{stats.available}</h2>
    <p>AVAILABLE</p>
  </div>

  <div className="status-card">
    <div className="status-icon busy">
      <FaBriefcase />
    </div>
    <h2>{stats.busy}</h2>
    <p>BUSY</p>
  </div>

  <div className="status-card">
    <div className="status-icon leave">
      <FaCalendarAlt />
    </div>
    <h2>{stats.leave}</h2>
    <p>ON LEAVE</p>
  </div>

  <div className="status-card">
    <div className="status-icon unavailable">
      <FaUserTimes />
    </div>
    <h2>{stats.unavailable}</h2>
    <p>UNAVAILABLE</p>
  </div>

</div>

      {/* PAGE HEADER */}
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

      {/* TABLE CARD */}
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
                      <div className="cell-main">
                        {inspector.fullName || "N/A"}
                      </div>

                      <div
                        className={`cell-sub ${
                          inspector.isProfileComplete ? "online" : "offline"
                        }`}
                      >
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