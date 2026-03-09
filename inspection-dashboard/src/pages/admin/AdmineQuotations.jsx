import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaSearch, FaTrash } from "react-icons/fa";
import "../../styles/AdmineQuotations.css";

export default function AdmineQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "https://inspectionaudit-backend.vercel.app/api/quotation";

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const dataArray = Array.isArray(data) ? data : data.data || [];
      setQuotations(dataArray);
      setFilteredData(dataArray);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  useEffect(() => {
    const results = quotations.filter((q) =>
      q.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, quotations]);

  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this quotation?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
          alert("Quotation deleted!");
          fetchQuotations();
        }
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="content-area">
        <Header />
        <div className="page-header">
          <h2>Quotation Management ({filteredData.length})</h2>
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by client email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ship Type</th>
                <th>Client Email</th>
                <th>Port/Country</th>
                {/* ✅ Amount aur Description headers add kiye */}
                <th>Amount ($)</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="text-center">Loading...</td></tr>
              ) : filteredData.map((q) => (
                <tr key={q._id}>
                  <td>{q.shipType || "N/A"}</td>
                  <td>{q.clientEmail || "N/A"}</td>
                  <td>{q.portCountry || "N/A"}</td>
                  
                  {/* ✅ Amount column logic */}
                  <td className="amount-text">
                    {q.amount ? `$${q.amount}` : "No Bid"}
                  </td>
                  
                  {/* ✅ Description column logic */}
                  <td className="desc-cell">
                    <div className="truncate-text" title={q.description}>
                      {q.description || "No Remarks"}
                    </div>
                  </td>

                  <td>
                    <span className={`status-badge ${q.status?.toLowerCase()}`}>
                      {q.status || "Pending"}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {q.status === "Pending" && (
                      <a href={`/submit-quotation?email=${q.clientEmail}`} className="btn-quote">
                        Create Quote
                      </a>
                    )}
                    <button onClick={() => handleDelete(q._id)} className="btn-delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}