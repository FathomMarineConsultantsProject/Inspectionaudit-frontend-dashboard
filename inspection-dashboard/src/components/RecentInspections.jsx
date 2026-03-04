import { useEffect, useState } from "react";

export default function RecentInspections() {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://inspectionaudit-backend.vercel.app";

  useEffect(() => {
    fetch(`${BASE_URL}/api/inspections`)
      .then(res => res.json())
      .then(data => {
        // --- SAFE DATA EXTRACTION ---
        // Agar data khud array hai to theek, nahi to data.data ya data.inspections check karo
        const actualData = Array.isArray(data) ? data : (data.data || data.inspections || []);

        if (!Array.isArray(actualData)) {
          console.error("Invalid API response format:", data);
          setLoading(false);
          return;
        }

        // Sorting by Date
        const sorted = actualData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setInspections(sorted.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching inspections:", err);
        setLoading(false);
      });
  }, []);

  const getStatusClass = (status) => {
    // Normalize status to lowercase to avoid "Pending" vs "pending" issues
    const s = status?.toLowerCase();
    if (s === "completed") return "status completed";
    if (s === "in progress" || s === "progress") return "status progress";
    if (s === "pending") return "status pending";
    return "status";
  };

  return (
    <div className="card">
      <h3>Recent Inspections</h3>

      {loading ? (
        <p style={{ padding: "20px" }}>Loading inspections...</p>
      ) : (
        <div className="table-responsive">
          <table className="inspections-table">
            <thead>
              <tr>
                <th>Inspector</th>
                <th>Vessel</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {inspections.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No inspection data found
                  </td>
                </tr>
              ) : (
                inspections.map(item => (
                  <tr key={item._id || Math.random()}>
                    <td>{item.inspectorName || "N/A"}</td>
                    <td>{item.vesselName || item.shipType || "N/A"}</td>
                    <td>
                      <span className={getStatusClass(item.status)}>
                        {item.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}