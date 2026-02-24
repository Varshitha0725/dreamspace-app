import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    role: "user",   // 👈 force role to always be user
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    // Accept any signup without validation
    const userData = {
      role: form.role,
      name: form.name,
      email: form.email,
      identifier: form.email,
    };
    
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    alert("Signup Successful!");
    
    if (form.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <div style={styles.container}>
      {/* Left side with image */}
      <div style={styles.leftSide}>
        <img 
          src="/images/imagehouse.jpeg"   // 👈 same photo as login
          alt="Property" 
          style={styles.image}
        />
      </div>

      {/* Right side with title + form */}
      <div style={styles.rightSide}>
        <h1 style={styles.siteTitle}>DreamSpace: Enhancing Homes</h1>

        <div style={styles.card}>
          <h2 style={styles.title}>Signup</h2>

          {/* Role Selection - only User */}
          <div style={styles.roleContainer}>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={form.role === "user"}
                readOnly   // 👈 no change allowed
              />
              User
            </label>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button onClick={handleSignup} style={styles.button}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#ffffff",
  },
  leftSide: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "400%",
    maxWidth: "490px",
    height: "auto",
    borderRadius: "8px",
  },
  rightSide: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  siteTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "24px",
    textAlign: "center",
  },
  card: {
    width: "350px",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  roleContainer: {
    marginBottom: "15px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#000",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "15px",
  },
};

export default Signup;

