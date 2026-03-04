import { useEffect, useState } from "react";

export default function Inspections() {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vercel Backend URL
  const BASE_URL = "https://inspectionaudit-backend.vercel.app";

  useEffect(() => {
    const fetchInspections = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/api/inspections`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // 🔍 DEBUG: Log the API structure
        console.log("API Response:", data);

        // ✅ FIX: Normalize data structure.
        // If the object has a nested 'data' or 'inspections' array, extract it.
        // Based on the console log showing 'Object', we likely need to dig deeper.
        const normalizedData = Array.isArray(data) 
          ? data 
          : (data.inspections || data.data || []);
        
        setInspections(normalizedData);
      } catch (err) {
        console.error("Error fetching inspections:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInspections();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inspections List</h2>

      {loading && <p>Loading data...</p>}
      
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && inspections.length === 0 && (
        <p>No inspections found.</p>
      )}

      {!loading && !error && inspections.length > 0 && (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th>Ship Name</th>
              <th>Port</th>
              <th>Date</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((item) => (
              <tr key={item._id}>
                <td>{item.shipName || "N/A"}</td>
                <td>{item.portName || "N/A"}</td>
                <td>{item.dateText || "N/A"}</td>
                <td>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}