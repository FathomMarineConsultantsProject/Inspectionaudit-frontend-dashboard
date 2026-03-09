import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaSearch, FaTrash, FaSync, FaFilter } from "react-icons/fa";
import "../../styles/AdmineQuotations.css";

export default function AdmineQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const API_URL = "https://inspectionaudit-backend.vercel.app/api/quotation";

  // Fetch data function
  const fetchQuotations = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      // Accessing data from the 'data' key as per your backend controller
      const dataArray = result.data || [];
      setQuotations(dataArray);
      setFilteredData(dataArray);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and 30-second auto-refresh
  useEffect(() => {
    fetchQuotations();
    const interval = setInterval(() => fetchQuotations(false), 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter Logic: Runs whenever search, status dropdown, or raw data changes
  useEffect(() => {
    let results = quotations;

    if (statusFilter !== "All") {
      results = results.filter((q) => q.status === statusFilter);
    }

    if (searchTerm) {
      results = results.filter((q) =>
        q.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.shipType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(results);
  }, [searchTerm, statusFilter, quotations]);

  const handleDelete = async (id) => {
    if (!id || !window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        alert("Deleted successfully!");
        fetchQuotations();
      }
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="content-area">
        <Header />
        
        <div className="page-header">
          <div className="header-left">
            <h2>Management ({filteredData.length})</h2>
            <button className="btn-refresh" onClick={() => fetchQuotations()}>
              <FaSync className={loading ? "spin" : ""} /> Refresh
            </button>
          </div>
          
          <div className="header-right">
            <div className="filter-wrapper">
              <FaFilter className="filter-icon" />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Quoted">Quoted</option>
              </select>
            </div>

            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search email or ship..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ship Type</th>
                <th>Client Email</th>
                <th>Port/Country</th>
                <th>Amount ($)</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && quotations.length === 0 ? (
                <tr><td colSpan="7" className="text-center">Loading Data...</td></tr>
              ) : filteredData.map((q) => (
                <tr key={q._id}>
                  <td>{q.shipType || "N/A"}</td>
                  <td>{q.clientEmail || "N/A"}</td>
                  <td>{q.portCountry || "N/A"}</td>
                  <td className="amount-text">
                    {q.amount ? `$${q.amount}` : <span className="text-muted">Waiting...</span>}
                  </td>
                  <td className="desc-cell">
                    <div className="truncate-text" title={q.description}>
                      {q.description || "—"}
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
                        Invite Bid
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