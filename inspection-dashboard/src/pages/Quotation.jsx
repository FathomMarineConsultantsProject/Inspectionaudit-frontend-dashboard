import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/quotation.css";

export default function Quotation() {

  const [formData, setFormData] = useState({
    shipType: "",
    serviceType: "",
    portCountry: "",
    inspectionDate: "",
    clientEmail: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendQuotation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://inspectionaudit-backend.vercel.app/api/quotation",
        formData
      );

      alert("Quotation request sent successfully!");

      // reset form
      setFormData({
        shipType: "",
        serviceType: "",
        portCountry: "",
        inspectionDate: "",
        clientEmail: "",
      });

    } catch (error) {
      console.error("Quotation Error:", error);
      alert("Failed to send quotation");
    }

    setLoading(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="content-area">
        <Header />

        <div className="quotation-wrapper">
          <div className="quotation-card">

            <form onSubmit={sendQuotation} className="form-content">

              <div className="input-grid">

                <div className="custom-group">
                  <label>Ship Type</label>
                  <input
                    type="text"
                    name="shipType"
                    value={formData.shipType}
                    onChange={handleChange}
                    placeholder="Enter Ship Type"
                    required
                  />
                </div>

                <div className="custom-group">
                  <label>Service Type</label>
                  <input
                    type="text"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    placeholder="Enter Service Type"
                    required
                  />
                </div>

                <div className="custom-group">
                  <label>Port & Country</label>
                  <input
                    type="text"
                    name="portCountry"
                    value={formData.portCountry}
                    onChange={handleChange}
                    placeholder="Enter Port & Country"
                    required
                  />
                </div>

                <div className="custom-group">
                  <label>Inspection Date</label>
                  <input
                    type="date"
                    name="inspectionDate"
                    value={formData.inspectionDate}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="custom-group full-width">
                <label>Email Address</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  placeholder="Enter Client Email"
                  required
                />
              </div>

              <div className="action-buttons">
                <button
                  type="submit"
                  className="btn-save"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Quotation"}
                </button>
              </div>

            </form>

          </div>
        </div>

      </main>
    </div>
  );
}