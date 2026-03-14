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

    console.log("Sending token:", token);
    console.log("Sending fee:", fee);

    const res = await axios.post(
      "https://inspectionaudit-backend.vercel.app/api/enquiry/confirm",
      {
        token: token,
        fee: fee
      }
    );

    console.log("Response:", res.data);

    alert("Inspection Confirmed Successfully");

    setShowModal(false);

  } catch (err) {

    console.log("Confirm error:", err.response?.data || err.message);

    alert("Error confirming inspection");

  }

};


  const declineInspection = async () => {

    try {

      await axios.post(
        "https://inspectionaudit-backend.vercel.app/api/enquiry/decline",
        {
          token: token
        }
      );

      alert("Inspection Declined");

    } catch (err) {

      console.log(err);
      alert("Error declining inspection");

    }

  };


  if (loading) return <div className="dark-bg">Loading...</div>;

  return (

    <div className="dark-bg">

      <div className="card">

        <div className="logo">
          FATHOM <span>MARINE</span>
        </div>

        <h2 className="title">INSPECTION DETAILS</h2>

        <div className="details">

          <p>
            <strong>Inspection Date</strong>
            {details?.inspectionDate}
          </p>

          <p>
            <strong>Location</strong>
            {details?.portCountry}
          </p>

          <p>
            <strong>Inspection Type</strong>
            {details?.serviceType}
          </p>

          <p>
            <strong>Vessel Type</strong>
            {details?.shipType}
          </p>

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


        <button
          className="confirm"
          onClick={() => setShowModal(true)}
        >
          CONFIRM AVAILABILITY
        </button>


        <div className="or">OR</div>


        <button
          className="decline"
          onClick={declineInspection}
        >
          DECLINE
        </button>

      </div>



      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>CONFIRM INSPECTION</h3>

            <p>
              Before confirming your availability you must agree to the
              standard <span className="link">Terms and Conditions</span>
              for the Services:
            </p>

            <label className="checkbox">

              <input
                type="checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
              />

              I accept the terms

            </label>


            <div className="modal-buttons">

              <button
                className="yes"
                disabled={!accepted}
                onClick={confirmAvailability}
              >
                YES
              </button>


              <button
                className="no"
                onClick={() => setShowModal(false)}
              >
                NO
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}