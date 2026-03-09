import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaSearch, FaTrash, FaSync, FaFilter } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../styles/AdmineQuotations.css";

export default function AdmineQuotations() {

  const [quotations, setQuotations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const API_URL = "https://inspectionaudit-backend.vercel.app/api/quotation";

  /* ================= FETCH ================= */

  const fetchQuotations = async () => {

    setLoading(true);

    try {

      const res = await fetch(API_URL);
      const result = await res.json();

      const data = result.data || [];

      setQuotations(data);
      setFilteredData(data);

    } catch (error) {

      console.log(error);
      toast.error("Failed to load data");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchQuotations();

    const interval = setInterval(fetchQuotations, 30000);

    return () => clearInterval(interval);

  }, []);

  /* ================= FILTER ================= */

  useEffect(() => {

    let results = quotations;

    if (statusFilter !== "All") {

      results = results.filter(
        (q) => q.status?.toLowerCase() === statusFilter.toLowerCase()
      );

    }

    if (searchTerm) {

      results = results.filter((q) =>
        q.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.shipType?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    }

    setFilteredData(results);

  }, [searchTerm, statusFilter, quotations]);

  /* ================= DELETE ================= */

  const confirmDelete = async () => {

    try {

      const res = await fetch(`${API_URL}/${deleteId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {

        const updated = quotations.filter((q) => q._id !== deleteId);

        setQuotations(updated);
        setFilteredData(updated);

        toast.success("Quotation deleted");

      }

    } catch (error) {

      toast.error("Delete failed");

    }

    setDeleteId(null);

  };

  /* ================= EXPORT EXCEL ================= */

  const exportExcel = () => {

    const ws = XLSX.utils.json_to_sheet(filteredData);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Quotations");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array"
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });

    saveAs(blob, "quotations.xlsx");

  };

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="content-area">

        <Header />

        <ToastContainer />

        {/* HEADER */}

        <div className="page-header">

          <div className="header-left">

            <h2>Quotation Management ({filteredData.length})</h2>

            <button className="btn-refresh" onClick={fetchQuotations}>
              <FaSync /> Refresh
            </button>

            <button className="btn-export" onClick={exportExcel}>
              Export Excel
            </button>

          </div>

          <div className="header-right">

            <div className="filter-wrapper">

              <FaFilter />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >

                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Quoted">Quoted</option>

              </select>

            </div>

            <div className="search-wrapper">

              <FaSearch />

              <input
                placeholder="Search email or ship..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="table-container">

          <table className="table">

            <thead>

              <tr>
                <th>Ship Type</th>
                <th>Email</th>
                <th>Port/Country</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>

              ) : filteredData.length === 0 ? (

                <tr>
                  <td colSpan="7">No data found</td>
                </tr>

              ) : (

                filteredData.map((q) => (

                  <tr key={q._id}>

                    <td>{q.shipType || "N/A"}</td>

                    <td>{q.clientEmail || "N/A"}</td>

                    <td>{q.portCountry || "N/A"}</td>

                    <td>{q.amount ? `$${q.amount}` : "Waiting"}</td>

                    <td>{q.description || "-"}</td>

                    <td>
                      <span className={`status-badge ${q.status?.toLowerCase()}`}>
                        {q.status}
                      </span>
                    </td>

                    <td>

                      <button
                        className="btn-delete"
                        onClick={() => setDeleteId(q._id)}
                      >
                        <FaTrash />
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </main>

      {/* DELETE MODAL */}

      {deleteId && (

        <div className="delete-modal">

          <div className="delete-box">

            <h3>Delete Quotation?</h3>

            <p>This action cannot be undone</p>

            <div className="modal-buttons">

              <button onClick={confirmDelete} className="btn-confirm">
                Yes Delete
              </button>

              <button onClick={() => setDeleteId(null)} className="btn-cancel">
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}