```javascript
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendQuotation = async (e) => {
    e.preventDefault(); // ✅ prevent page refresh

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

            <form onSubmit={sendQuotation} className="form-content">

              <div className="input-grid">

                <div className="custom-group">
                  <label>Ship Type</label>
                  <input
                    type="text"
                    name="shipType"
                    value={formData.shipType}
                    onChange={handleChange}
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
                  required
                />
              </div>

              <div className="action-buttons">
                <button type="submit" className="btn-save">
                  Send Quotation
                </button>
              </div>

            </form>

          </div>
        </div>

      </main>
    </div>
  );
}
```
