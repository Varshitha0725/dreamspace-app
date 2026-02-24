import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    role: "user",
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = () => {
    if (!form.identifier || !form.password) {
      setError("Please fill all fields");
      return;
    }

    // Accept any credentials for both user and admin
    const userData = {
      role: form.role,
      name: form.identifier,
      email: form.identifier,
      identifier: form.identifier,
    };
    
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    
    if (form.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <img 
          src="/images/imagehouse.jpeg" 
          alt="Home Interior" 
          style={styles.image}
        />
      </div>

      <div style={styles.rightSide}>
        <h1 style={styles.siteTitle}>DreamSpace: Enhancing Homes</h1>

        <div style={styles.card}>
          <h2 style={styles.title}>Login</h2>

          <div style={styles.roleContainer}>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={form.role === "user"}
                onChange={handleChange}
              />
              User
            </label>

            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={handleChange}
              />
              Admin
            </label>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <input
            type="text"
            name="identifier"
            placeholder={form.role === "admin" ? "Enter Admin ID" : "Enter Email/Username"}
            value={form.identifier}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>

          {form.role === "user" && (
            <p style={{ textAlign: "center", marginTop: "15px" }}>
              Don't have an account? <Link to="/signup" style={styles.link}>Signup</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh", backgroundColor: "#ffffff" },
  leftSide: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
  image: { width: "80%", maxWidth: "450px", height: "auto", borderRadius: "8px" },
  rightSide: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
  siteTitle: { fontSize: "42px", fontWeight: "bold", color: "#333", marginBottom: "24px", textAlign: "center" },
  card: { width: "350px", padding: "40px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  title: { textAlign: "center", marginBottom: "20px" },
  roleContainer: { marginBottom: "15px", textAlign: "center" },
  error: { color: "#dc3545", fontSize: "14px", marginBottom: "10px", textAlign: "center" },
  input: { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" },
  button: { width: "100%", padding: "12px", backgroundColor: "#000", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", marginTop: "15px" },
  link: { color: "#2563eb", textDecoration: "none", fontWeight: "bold" },
};

export default Login;
