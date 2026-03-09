import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaShip, FaMapMarkerAlt, FaClipboardList, FaCalendarAlt, FaEnvelope, FaUser } from "react-icons/fa";
import "../styles/quotation.css";

export default function Quotation() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    vesselType: "",
    inspectionType: "",
    location: "",
    inspectionDate: "",
    clientEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendQuotation = async () => {
    if (!formData.clientEmail || !formData.vesselType) {
      alert("Required fields missing!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        shipType: formData.vesselType,
        serviceType: formData.inspectionType,
        portCountry: formData.location,
        inspectionDate: formData.inspectionDate,
        clientEmail: formData.clientEmail,
        clientName: formData.clientName,
      };

      await axios.post("https://inspectionaudit-backend.vercel.app/api/quotation", payload);
      
      alert("🚀 Enquiry Created Successfully!");
      setFormData({ clientName: "", vesselType: "", inspectionType: "", location: "", inspectionDate: "", clientEmail: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="content-area">
        <Header />
        <div className="quotation-wrapper">
          <div className="quotation-card">
            <h2 className="form-title">Create New Inspection Enquiry</h2>
            <div className="form-content">
              <div className="input-grid">
                <div className="custom-group">
                  <label><FaUser /> Client Name</label>
                  <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Nipun Chatrath" />
                </div>
                <div className="custom-group">
                  <label><FaShip /> Vessel Type</label>
                  <input type="text" name="vesselType" value={formData.vesselType} onChange={handleChange} placeholder="Bulk Carrier" />
                </div>
                <div className="custom-group">
                  <label><FaClipboardList /> Inspection Type</label>
                  <input type="text" name="inspectionType" value={formData.inspectionType} onChange={handleChange} placeholder="Pre-purchase" />
                </div>
                <div className="custom-group">
                  <label><FaMapMarkerAlt /> Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Baltimore, USA" />
                </div>
                <div className="custom-group">
                  <label><FaCalendarAlt /> Date</label>
                  <input type="date" name="inspectionDate" value={formData.inspectionDate} onChange={handleChange} />
                </div>
                <div className="custom-group">
                  <label><FaEnvelope /> Client Email</label>
                  <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} placeholder="client@mail.com" />
                </div>
              </div>
              <button className="btn-save" onClick={sendQuotation} disabled={loading}>
                {loading ? "Processing..." : "Create Enquiry"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}