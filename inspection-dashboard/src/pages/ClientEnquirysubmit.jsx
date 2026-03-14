import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/quotation.css";

export default function ClientEnquirySubmit() {

  const { token } = useParams();
  const [details, setDetails] = useState(null);
  const [fee, setFee] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `https://inspectionaudit-backend.vercel.app/api/enquiry/${token}`
        );
        setDetails(res.data);
      } catch (err) {
        console.log("Invalid link");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [token]);

  if (loading) return <div className="dark-bg">Loading...</div>;

  return (
    <div className="dark-bg">

      <div className="card">

        <div className="logo">
          FATHOM <span>MARINE</span>
        </div>

        <h2 className="title">INSPECTION DETAILS</h2>

        <div className="details">
          <p><strong>Inspection Date</strong> {details?.inspectionDate}</p>
          <p><strong>Location</strong> {details?.portCountry}</p>
          <p><strong>Inspection Type</strong> {details?.serviceType}</p>
          <p><strong>Vessel Type</strong> {details?.shipType}</p>
        </div>

        <div className="fee-box">
          Recommended fee for this port is <b>$1400</b>
        </div>

        <input
          type="number"
          placeholder="Enter fee here"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="input"
        />

        <button className="confirm">CONFIRM AVAILABILITY</button>

        <div className="or">OR</div>

        <button className="decline">DECLINE</button>

      </div>

    </div>
  );
}