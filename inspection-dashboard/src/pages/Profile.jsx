import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCamera } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Nipun",
    email: "fathom@gmail.com",
    role: "Admin",
    phone: "+1 234 567 890",
    company: "Fathom Inspection Services",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) setProfile(stored);
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    alert("Profile updated successfully ✅");
    window.location.reload(); // Header sync ke liye
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        
        <div className="profile-wrapper">
          <h2 className="section-title">Account Settings</h2>
          
          <div className="profile-grid">
            {/* Left Card: Image display */}
            <div className="profile-card-left">
              <div className="avatar-box">
                <img src={profile.avatar} alt="User" />
                <label className="cam-btn"><FaCamera /><input type="file" hidden /></label>
              </div>
              <h3>{profile.name}</h3>
              <p>{profile.role}</p>
            </div>

            {/* Right Card: Form inputs */}
            <div className="profile-card-right">
              <div className="form-row">
                <div className="input-box">
                  <label>Full Name</label>
                  <div className="inner-field"><FaUser /><input name="name" value={profile.name} onChange={handleChange} /></div>
                </div>
                <div className="input-box">
                  <label>Email</label>
                  <div className="inner-field"><FaEnvelope /><input name="email" value={profile.email} onChange={handleChange} /></div>
                </div>
              </div>

              <div className="form-row">
                <div className="input-box">
                  <label>Phone</label>
                  <div className="inner-field"><FaPhone /><input name="phone" value={profile.phone} onChange={handleChange} /></div>
                </div>
                <div className="input-box">
                  <label>Company</label>
                  <div className="inner-field"><FaBuilding /><input name="company" value={profile.company} onChange={handleChange} /></div>
                </div>
              </div>

              <button className="update-btn" onClick={saveProfile}>Update Profile</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}