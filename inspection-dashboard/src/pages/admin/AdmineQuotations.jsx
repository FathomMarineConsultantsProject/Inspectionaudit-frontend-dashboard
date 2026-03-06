import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function AdminQuotations() {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    fetch("https://inspectionaudit-backend.vercel.app/api/quotations")
      .then((res) => res.json())
      .then((data) => setQuotations(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="content-area">
        <Header />

        <h2>All Quotations</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Ship</th>
              <th>Service</th>
              <th>Port</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {quotations.length === 0 && (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No quotations found
                </td>
              </tr>
            )}

            {quotations.map((q) => (
              <tr key={q._id}>
                <td>{q.name || "-"}</td>
                <td>{q.email || "-"}</td>
                <td>{q.shipType}</td>
                <td>{q.serviceType}</td>
                <td>{q.portCountry}</td>
                <td>{new Date(q.inspectionDate).toLocaleDateString()}</td>
                <td>{q.notes || "-"}</td>
                <td>
                  {q.amount ? `₹ ${q.amount}` : "Not Sent"}
                </td>
                <td>
                  <span
                    style={{
                      color: q.status === "Sent" ? "green" : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {q.status}
                  </span>
                </td>
                <td>
                  {q.status === "Pending" ? (
                    <a
                      href={`/submit-quotation/${q._id}`}
                      className="btn-primary"
                    >
                      Send Quotation
                    </a>
                  ) : (
                    <span>✔ Sent</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}