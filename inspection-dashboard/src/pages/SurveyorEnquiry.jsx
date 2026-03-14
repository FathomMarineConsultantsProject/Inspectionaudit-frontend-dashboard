import { useState } from "react";
import axios from "axios";
import "../styles/SurveyorEnquiry.css";

export default function SurveyorEnquiry() {

  const [form, setForm] = useState({
    SurveyorName: "",
        SurveyorEmail:  "",
    shipType: "",
    serviceType: "",
    portCountry: "",
    inspectionFrom: "",
    inspectionTo: "",
    recommendedFee: ""
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

      const res = await axios.post(
        "https://inspectionaudit-backend.vercel.app/api/enquiry",
        form
      );

      console.log("Response:", res.data);

      alert("✅ Enquiry submitted! Invitation email sent.");

      setForm({
        SurveyorName: "",
        SurveyorEmail: "", 
        shipType: "",
        serviceType: "",
        portCountry: "",
        inspectionFrom: "",
        inspectionTo: "",
        recommendedFee: ""
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

        <div className="form-header">
          <span className="brand-logo">FATHOM MARINE</span>
          <h2>Vessel Inspection Request</h2>
        </div>

        <form onSubmit={submitForm}>

          {/* Surveyor Name */}
         <div className="input-group">
  <label>Surveyor / Consultation Name</label>
  <input
    type="text"
    name="surveyorName"
    placeholder="e.g. ABC Shipping Ltd"
    value={form.clientName}
    onChange={handleChange}
    required
  />
</div>
          {/* Surveyor Email */}
         <div className="input-group">
  <label>Surveyor / Consultation Email</label>
  <input
    type="email"
    name="surveyorEmail"
    placeholder="surveyor@example.com"
    value={form.clientEmail}
    onChange={handleChange}
    required
  />
</div>

          {/* Vessel + Inspection */}
          <div className="input-row">

            <div className="input-group">
              <label>Vessel Type</label>
              <input
                type="text"
                name="shipType"
                placeholder="Bulk Carrier"
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
                placeholder="Pre-purchase"
                value={form.serviceType}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Port */}
          <div className="input-group">
            <label>Port / Country</label>
            <input
              type="text"
              name="portCountry"
              placeholder="Baltimore, USA"
              value={form.portCountry}
              onChange={handleChange}
              required
            />
          </div>

          {/* Expected Inspection Date */}
          <div className="input-row">

            <div className="input-group">
              <label>Inspection Date From</label>
              <input
                type="date"
                name="inspectionFrom"
                value={form.inspectionFrom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Inspection Date To</label>
              <input
                type="date"
                name="inspectionTo"
                value={form.inspectionTo}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Recommended Fee */}
          <div className="input-group">
            <label>Recommended Fee (USD)</label>
            <input
              type="number"
              name="recommendedFee"
              placeholder="e.g. 1400"
              value={form.recommendedFee}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "SUBMIT ENQUIRY"}
          </button>

        </form>

      </div>

    </div>

  );
}