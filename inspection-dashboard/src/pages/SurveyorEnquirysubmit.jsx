import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/SurveyorEnquirysubmit.css";

export default function SuryeyorEnquirySubmit() {
  const { token } = useParams();
  const [details, setDetails] = useState(null);
  const [fee, setFee] = useState("");
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
        console.log("Invalid link");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [token]);

  const confirmAvailability = async () => {
    if (!fee) {
      alert("Please enter fee");
      return;
    }
    try {
      await axios.post(
        "https://inspectionaudit-backend.vercel.app/api/enquiry/confirm",
        { token: token, fee: fee }
      );
      alert("Inspection Confirmed Successfully");
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
            <span>{details?.inspectionDate || "TBA"}</span>
          </div>
          <div className="info-row">
            <strong>Location</strong>
            <span>{details?.portCountry || "TBA"}</span>
          </div>
          <div className="info-row">
            <strong>Inspection Type</strong>
            <span>{details?.serviceType || "TBA"}</span>
          </div>
          <div className="info-row">
            <strong>Vessel Type</strong>
            <span>{details?.shipType || "TBA"}</span>
          </div>
        </div>

        <div className="fee-info">
          Recommended fee for this port is <b>$1400</b>
        </div>

        <input
          type="number"
          placeholder="Enter fee here"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="fee-input"
        />

        <button className="btn-confirm" onClick={() => setShowModal(true)}>
          CONFIRM AVAILABILITY
        </button>

        <div className="or-text">OR</div>

        <button className="btn-decline" onClick={declineInspection}>
          DECLINE
        </button>
      </div>

      {/* MODAL SECTION */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>CONFIRM INSPECTION</h3>
            <p>
              Before confirming your availability you must agree to the
              standard Terms and Conditions for the Services.
            </p>

            <label className="modal-checkbox">
              <input
                type="checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
              />
              I accept the terms
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
                NO, BACK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}