import { FaHome, FaUser, FaClipboard,FaFileInvoiceDollar, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">INSPECTION ADMIN</h2>

      <nav>

        <NavLink 
          to="/dashboard"
          className={({ isActive }) => 
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaHome /> <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/inspectors"
          className={({ isActive }) => 
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaUser /> <span>Inspectors</span>
        </NavLink>

        <NavLink to="/quotation"
        className={({ isActive }) => 
            isActive ? "nav-item active" : "nav-item"
          }>
          <FaFileInvoiceDollar /> Quotation
        </NavLink>
    
         <NavLink 
       to="/SurveyorEnquiry" // New route for the second quotation page
     className={({ isActive }) => 
      isActive ? "nav-item active" : "nav-item"
           }
       >
      <FaFileInvoiceDollar /> SurveyorEnquiry
        </NavLink>

<NavLink 
  to="/admine-quotation" // 👈 App.jsx ke path se exact match hona chahiye
  className={({ isActive }) => 
    isActive ? "nav-item active" : "nav-item"
  }
>
  <FaFileInvoiceDollar /> AdmineQuotation
</NavLink>


        

        <div className="nav-item logout" onClick={handleLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </div>

      </nav>
    </aside>
  );
}