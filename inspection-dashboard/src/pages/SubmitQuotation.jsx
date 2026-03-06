import { useState } from "react";
import axios from "axios";
import "../styles/submit-quotation.css";

export default function SubmitQuotation() {

  const [quotationData, setQuotationData] = useState({
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setQuotationData({
      ...quotationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://inspectionaudit-backend.vercel.app/api/quotation/submit",
        quotationData
      );

      alert("Quotation submitted successfully!");
      setQuotationData({ amount: "", description: "" });

    } catch (error) {
      console.error(error);
      alert("Error submitting quotation");
    }
  };

  return (
    <div className="submit-quotation-container">
      <div className="submit-quotation-card">
        <h2>Submit Quotation</h2>

        <form onSubmit={handleSubmit}>

          {/* Amount */}
          <div className="form-group">
            <label>Quotation Amount ($)</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={quotationData.amount}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter quotation description..."
              value={quotationData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Finalize Quotation
          </button>

        </form>
      </div>
    </div>
  );
}