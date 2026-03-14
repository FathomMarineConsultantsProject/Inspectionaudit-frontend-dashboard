import { useState } from "react";
import axios from "axios";
import "../styles/ClientEnquiryForm.css";

export default function ClientEnquiryForm() {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    shipType: "",
    serviceType: "",
    portCountry: "",
    inspectionDate: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend endpoint jo Image 1 wala email bhejega
      const res = await axios.post(
        "https://inspectionaudit-backend.vercel.app/api/enquiry",
        form
      );

      console.log("Response:", res.data);
      alert("✅ Enquiry submitted! Invitation email sent to surveyor.");

      // Form clear karna
      setForm({
        clientName: "",
        clientEmail: "",
        shipType: "",
        serviceType: "",
        portCountry: "",
        inspectionDate: ""
      });

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-container">
      <div className="enquiry-card">
        {/* Idwal jaisa clean heading */}
        <div className="form-header">
           <span className="brand-logo">IDWAL</span>
           <h2>Vessel Inspection Request</h2>
        </div>

        <form onSubmit={submitForm}>
          <div className="input-group">
            <label>Company / Client Name</label>
            <input
              type="text"
              name="clientName"
              placeholder="e.g. Sinotech Marine"
              value={form.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Surveyor / Client Email</label>
            <input
              type="email"
              name="clientEmail"
              placeholder="surveyor@example.com"
              value={form.clientEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Vessel Type</label>
              <input
                type="text"
                name="shipType"
                placeholder="e.g. Bulk Carrier"
                value={form.shipType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Inspection Type</label>
              <input
                type="text"
                name="serviceType"
                placeholder="e.g. Pre-purchase"
                value={form.serviceType}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Port / Country</label>
            <input
              type="text"
              name="portCountry"
              placeholder="e.g. Baltimore, USA"
              value={form.portCountry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Inspection Date</label>
            <input
              type="date"
              name="inspectionDate"
              value={form.inspectionDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="spinner"></span>
            ) : (
              "SUBMIT ENQUIRY"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}