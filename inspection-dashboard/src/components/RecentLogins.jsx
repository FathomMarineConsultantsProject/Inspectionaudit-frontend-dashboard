import { useEffect, useState } from "react";

export default function RecentLogins() {

  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://inspectionaudit-backend.vercel.app";

  useEffect(() => {
    fetch(`${BASE_URL}/api/logins`)
      .then(res => res.json())
      .then(data => {

        if (!Array.isArray(data)) {
          console.error("Invalid API response");
          setLoading(false);
          return;
        }

        // newest first
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setLogins(sorted.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching logins:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card">
      <h3>Recent Logins</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Inspector</th>
              <th>Login Time</th>
            </tr>
          </thead>

          <tbody>
            {logins.length === 0 ? (
              <tr>
                <td colSpan="2">No login data found</td>
              </tr>
            ) : (
              logins.map(login => (
                <tr key={login._id}>
                  <td>{login.inspectorName || "N/A"}</td>
                  <td>
                    {login.createdAt
                      ? new Date(login.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}