import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history, go to dashboard
      if (loggedUser?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  };

  const handleDashboard = () => {
    if (loggedUser?.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <nav style={styles.nav}>
      {loggedUser && (
        <>
          <div style={styles.leftSection}>
            <span onClick={handleBack} style={styles.backLink}>
              ← Back
            </span>
          </div>

          <div style={styles.actions}>
            <span onClick={handleDashboard} style={styles.dashboardLink}>
              Dashboard
            </span>
            <span style={styles.userName}>Welcome, {loggedUser.name}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 25px",
    background: "#ffffff",
    borderBottom: "1px solid #eee",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  backLink: {
    cursor: "pointer",
    color: "black",
    fontWeight: "600",
    fontSize: "18px",
    textDecoration: "none",
  },
  dashboardLink: {
    cursor: "pointer",
    color: "#2563eb",
    fontWeight: "600",
    fontSize: "18px",
    textDecoration: "none",
  },
  actions: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  userName: {
    color: "#555",
    fontWeight: "500",
    fontSize: "16px",
  },
  logoutButton: {
    padding: "6px 14px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Navbar;
