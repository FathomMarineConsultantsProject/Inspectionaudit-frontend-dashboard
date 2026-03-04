import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaShip, FaClipboardList, FaGlobe, FaCalendarAlt, FaCamera } from "react-icons/fa";
import "../styles/quotation.css";

export default function Quotation() {

  const [formData, setFormData] = useState({
    shipType: "",
    serviceType: "",
    portCountry: "",
    inspectionDate: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ FUNCTION YAHAN HOGA (RETURN KE UPAR)
  const sendQuotation = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/quotation",
        formData
      );

      alert("Quotation request sent successfully!");

      setFormData({
        shipType: "",
        serviceType: "",
        portCountry: "",
        inspectionDate: "",
        notes: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error sending quotation");
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="content-area">
        <Header />

        <div className="quotation-wrapper">
          <div className="quotation-card">

            <div className="form-content">

              <div className="input-grid">
                <div className="custom-group">
                  <label>Ship Type</label>
                  <input
                    type="text"
                    name="shipType"
                    value={formData.shipType}
                    onChange={handleChange}
                  />
                </div>

                <div className="custom-group">
                  <label>Service Type</label>
                  <input
                    type="text"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                  />
                </div>

                <div className="custom-group">
                  <label>Port & Country</label>
                  <input
                    type="text"
                    name="portCountry"
                    value={formData.portCountry}
                    onChange={handleChange}
                  />
                </div>

                <div className="custom-group">
                  <label>Inspection Date</label>
                  <input
                    type="date"
                    name="inspectionDate"
                    value={formData.inspectionDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="custom-group full-width">
                <label>Notes</label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <div className="action-buttons">
                <button className="btn-save" onClick={sendQuotation}>
                  Submit Quotation Request
                </button>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}