import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login({ setAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Mimicking an API call delay for a premium feel
    setTimeout(() => {
      if (email === "fathom@gmail.com" && password === "fathom123") {
        localStorage.setItem("isAuthenticated", "true");
        setAuth(true);
        navigate("/dashboard");
      } else {
        setError("Access Denied: Invalid admin credentials.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-card-wrapper">
        
        {/* Left Panel: Branding */}
        <div className="left-panel">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          
          <div className="welcome-content">
            <div className="logo-badge">SYSTEM SECURE</div>
            <h1>FATHOM</h1>
            <h3>SMART INSPECTION SYSTEM</h3>
            <p>
              Ensuring safety and compliance through real-time data monitoring 
              and advanced administrative control. Your gateway to precision.
            </p>
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="right-panel">
          <div className="form-header">
            <h2>Admin Sign In</h2>
            <p className="subtitle">Secure access to inspection protocols</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon"></span>
              <input 
                type="email" 
                placeholder="Admin Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <span className="input-icon"></span>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Security Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <span 
                className="show-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember this session
              </label>
            </div>

            {error && <div className="error-box">{error}</div>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "AUTHENTICATING..." : "AUTHORIZE ACCESS"}
            </button>
            
    
          </form>

          <p className="footer-note">Authorized Personnel Only</p>
        </div>

      </div>
    </div>
  );
}