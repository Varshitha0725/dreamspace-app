import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PropertyForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    city: "",
    address: "",
    propertyType: "",
    budget: "",
    changes: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "budget") {
      if (value && !/^\d+$/.test(value)) {
        setErrors({ ...errors, budget: "Budget must contain only numbers" });
        return;
      } else {
        const newErrors = { ...errors };
        delete newErrors.budget;
        setErrors(newErrors);
      }
    }
    
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.propertyType) newErrors.propertyType = "Property type is required";
    if (!form.budget.trim()) {
      newErrors.budget = "Budget is required";
    } else if (!/^\d+$/.test(form.budget)) {
      newErrors.budget = "Budget must contain only numbers";
    }
    if (!form.changes.trim()) newErrors.changes = "Please describe what you want to change";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const propertyData = {
      ...form,
      userName: loggedUser?.name || "Unknown",
      userEmail: loggedUser?.email || "",
      submittedAt: new Date().toISOString(),
    };

    const existingProperties = JSON.parse(localStorage.getItem("properties")) || [];
    existingProperties.push(propertyData);
    localStorage.setItem("properties", JSON.stringify(existingProperties));

    navigate("/recommendations");
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
          <h2 style={styles.title}>Submit Property Details</h2>

          <input
            type="text"
            name="city"
            placeholder="Enter City *"
            value={form.city}
            onChange={handleChange}
            style={errors.city ? styles.inputError : styles.input}
          />
          {errors.city && <p style={styles.error}>{errors.city}</p>}

          <input
            type="text"
            name="address"
            placeholder="Enter Address *"
            value={form.address}
            onChange={handleChange}
            style={errors.address ? styles.inputError : styles.input}
          />
          {errors.address && <p style={styles.error}>{errors.address}</p>}

          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            style={errors.propertyType ? styles.inputError : styles.input}
          >
            <option value="">Select Property Type *</option>
            <option value="apartment">Apartment</option>
            <option value="independent house">Independent House</option>
            <option value="villa">Villa</option>
          </select>
          {errors.propertyType && <p style={styles.error}>{errors.propertyType}</p>}

          <input
            type="text"
            name="budget"
            placeholder="Enter Budget (in numbers only) *"
            value={form.budget}
            onChange={handleChange}
            style={errors.budget ? styles.inputError : styles.input}
          />
          {errors.budget && <p style={styles.error}>{errors.budget}</p>}

          <textarea
            name="changes"
            placeholder="What do you want to change? (Kitchen, bedroom, garden, etc) *"
            value={form.changes}
            onChange={handleChange}
            style={errors.changes ? { ...styles.input, ...styles.inputError, height: "80px" } : { ...styles.input, height: "80px" }}
          />
          {errors.changes && <p style={styles.error}>{errors.changes}</p>}

          <button style={styles.button} onClick={handleSubmit}>
            Submit
          </button>
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
  card: { width: "400px", padding: "40px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" },
  title: { marginBottom: "20px" },
  input: { width: "100%", padding: "12px", marginBottom: "5px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" },
  inputError: { width: "100%", padding: "12px", marginBottom: "5px", borderRadius: "6px", border: "2px solid #dc3545", boxSizing: "border-box" },
  error: { color: "#dc3545", fontSize: "12px", marginBottom: "10px", textAlign: "left" },
  button: { width: "100%", padding: "12px", backgroundColor: "#000", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", marginTop: "15px" },
};

export default PropertyForm;
