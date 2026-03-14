import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/SurveyorEnquirysubmit.css";

export default function SuryeyorEnquirySubmit() {
  const { token } = useParams();
  const [details, setDetails] = useState(null);
  const [fee, setFee] = useState(""); // This holds the user-entered fee
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `https://inspectionaudit-backend.vercel.app/api/enquiry/${token}`
        );
        setDetails(res.data);
      } catch (err) {
        console.log("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [token]);

  const confirmAvailability = async () => {
    if (!fee) {
      alert("Please enter your fee first");
      return;
    }
    try {
      // We send the 'fee' variable which is updated by the input field
      await axios.post(
        "https://inspectionaudit-backend.vercel.app/api/enquiry/confirm",
        { 
          token: token, 
          fee: fee // Actual fee from input
        }
      );
      alert("Inspection Confirmed Successfully with fee: $" + fee);
      setShowModal(false);
    } catch (err) {
      alert("Error confirming inspection");
    }
  };

  const declineInspection = async () => {
    try {
      await axios.post(
        "https://inspectionaudit-backend.vercel.app/api/enquiry/decline",
        { token: token }
      );
      alert("Inspection Declined");
    } catch (err) {
      alert("Error declining inspection");
    }
  };

  if (loading) return <div className="dark-bg">Loading Data...</div>;

  return (
    <div className="dark-bg">
      <div className="content-wrapper">
        <div className="logo-text">FATHOM <span>MARINE</span></div>
        <h2 className="title-text">Inspection Details</h2>

        <div className="details-container">
          <div className="info-row">
            <strong>Inspection Date</strong>
            {/* Fix: Added check for inspectionDate. If it's undefined, it shows 'To be confirmed' */}
            <span>{details?.inspectionDate || "To be confirmed"}</span>
          </div>
          <div className="info-row">
            <strong>Location</strong>
            <span>{details?.portCountry || "N/A"}</span>
          </div>
          <div className="info-row">
            <strong>Inspection Type</strong>
            <span>{details?.serviceType || "N/A"}</span>
          </div>
          <div className="info-row">
            <strong>Vessel Type</strong>
            <span>{details?.shipType || "N/A"}</span>
          </div>
        </div>

        {/* Removed the hardcoded $1400 text as requested */}
        <div className="fee-info">
          Please enter your proposed fee for this inspection.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>$</span>
            <input
            type="number"
            placeholder="0.00"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="fee-input"
            />
        </div>

        <button className="btn-confirm" onClick={() => setShowModal(true)}>
          CONFIRM AVAILABILITY
        </button>

        <div className="or-text">OR</div>

        <button className="btn-decline" onClick={declineInspection}>
          DECLINE
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>CONFIRM INSPECTION</h3>
            <p>
              By clicking yes, you agree to perform this service for <b>${fee || "0"}</b>.
            </p>

            <label className="modal-checkbox">
              <input
                type="checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
              />
              I accept the terms & conditions
            </label>

            <div className="modal-actions">
              <button
                className="btn-yes"
                disabled={!accepted}
                onClick={confirmAvailability}
              >
                YES, CONFIRM
              </button>
              <button className="btn-no" onClick={() => setShowModal(false)}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}