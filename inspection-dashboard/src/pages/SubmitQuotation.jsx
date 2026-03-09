import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // To get email from URL
import axios from "axios";
import "../styles/submit-quotation.css";

export default function SubmitQuotation() {
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [quotationData, setQuotationData] = useState({
    clientEmail: emailFromUrl,
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // Update state if URL parameter changes
  useEffect(() => {
    if (emailFromUrl) {
      setQuotationData((prev) => ({ ...prev, clientEmail: emailFromUrl }));
    }
  }, [emailFromUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotationData({ ...quotationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend now expects clientEmail to find and update the correct record
      await axios.post(
        "https://inspectionaudit-backend.vercel.app/api/quotation/submit",
        quotationData
      );

      alert("Quotation updated and linked successfully!");
      
      // Clear form except email
      setQuotationData({ ...quotationData, amount: "", description: "" });

    } catch (error) {
      console.error("Submit Error:", error);
      alert(error.response?.data?.message || "Enquiry not found for this email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-quotation-container">
      <div className="submit-quotation-card">
        <h2>Submit Quotation</h2>
        <form onSubmit={handleSubmit}>
          {/* Client Email - Made ReadOnly if coming from URL to prevent errors */}
          <div className="form-group">
            <label>Client Email</label>
            <input
              type="email"
              name="clientEmail"
              placeholder="Enter client email"
              value={quotationData.clientEmail}
              onChange={handleChange}
              required
              readOnly={!!emailFromUrl} 
              style={emailFromUrl ? { backgroundColor: "#f0f0f0" } : {}}
            />
          </div>

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

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Updating..." : "Finalize & Link Quotation"}
          </button>
        </form>
      </div>
    </div>
  );
}