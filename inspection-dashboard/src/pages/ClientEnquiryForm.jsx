import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ClientEnquiryForm.css";
import shipBg from "../assets/ship.png";

export default function Quotation() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    pic: "",
    email: "",
    phone: "",
    inspectionType: "",
    shipType: "",
    portCountry: "",
    dateFrom: "",
    dateTo: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.shipType) {
      alert("Please fill in the required fields (Email and Ship Type)!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        clientName: formData.companyName,
        clientEmail: formData.email,
        shipType: formData.shipType,
        serviceType: formData.inspectionType,
        portCountry: formData.portCountry,
        // Combining date range for backend compatibility
        inspectionDate: `${formData.dateFrom} to ${formData.dateTo}`,
        phone: formData.phone,
        pic: formData.pic
      };

      await axios.post("https://inspectionaudit-backend.vercel.app/api/quotation", payload);
      alert("🚀 Enquiry Created Successfully! Sent to FMC.");
      navigate("/admin-quotations"); // Move to management view
    } catch (error) {
      alert("Failed to create enquiry. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-container">
      <img src={shipBg} className="hero-bg" alt="ship" />
      <div className="glass-card">
        <h2>Create Inspection Enquiry</h2>
        <div className="form-grid">
          <input name="companyName" placeholder="Company Name" onChange={handleChange} />
          <input name="pic" placeholder="P I C" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email ID" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          
          {/* Surveyor Visible Fields (Red in your diagram) */}
          <input name="inspectionType" placeholder="Inspection Type" className="highlight" onChange={handleChange} />
          <input name="shipType" placeholder="Ship Type" className="highlight" onChange={handleChange} />
          <input name="portCountry" placeholder="Port & Country" className="highlight" onChange={handleChange} />
          
          <div className="date-range highlight">
            <input type="date" name="dateFrom" onChange={handleChange} />
            <span>to</span>
            <input type="date" name="dateTo" onChange={handleChange} />
          </div>
        </div>
        <button className="submit-btn" onClick={submitForm} disabled={loading}>
          {loading ? "Creating..." : "Create Enquiry"}
        </button>
      </div>
    </div>
  );
}