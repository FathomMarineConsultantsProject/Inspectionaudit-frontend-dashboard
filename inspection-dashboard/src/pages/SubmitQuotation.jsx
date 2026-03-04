import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/submit-quotation.css";

export default function SubmitQuotation() {
  // ✅ URL se quotation ID lena
  const { id } = useParams();

  const [quotationData, setQuotationData] = useState({
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setQuotationData({ ...quotationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Backend API Call
      await axios.put(
        `http://localhost:5000/api/quotation/submit/${id}`,
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
          {/* Amount Input */}
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

          {/* Description Input */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter quotation description..."
              value={quotationData.description}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-submit">
            Finalize Quotation
          </button>
        </form>
      </div>
    </div>
  );
}