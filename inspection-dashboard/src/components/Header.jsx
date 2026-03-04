import { useState, useEffect, useRef } from "react";
import { FaBell, FaSearch, FaChevronDown, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ name: "Admin", avatar: "" });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // User data sync
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    // Bahar click karne par dropdown close karne ke liye
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-title">Inspection Management System</div>

      <div className="header-right">
        <div className="icon-box notification">
          <FaBell />
          <span className="badge">1</span>
        </div>

        {/* Profile Dropdown Section */}
        <div className="profile" ref={dropdownRef}>
          <div className="profile-info" onClick={() => setShowDropdown(!showDropdown)}>
            <img 
              src={user.avatar || "https://www.w3schools.com/howto/img_avatar.png"} 
              alt="Admin" 
            />
            <span>{user.name}</span>
            <FaChevronDown style={{ fontSize: '12px', marginLeft: '5px' }} />
          </div>

          {/* Ye part tabhi dikhega jab showDropdown true hoga */}
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => { navigate("/profile"); setShowDropdown(false); }}>
                <FaUser style={{ marginRight: '10px' }} /> My Profile
              </div>
              <div className="dropdown-item" onClick={() => setShowDropdown(false)}>
                <FaCog style={{ marginRight: '10px' }} /> Settings
              </div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                <FaSignOutAlt style={{ marginRight: '10px' }} /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}