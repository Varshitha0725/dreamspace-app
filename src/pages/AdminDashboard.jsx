import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser || loggedUser.role !== "admin") {
      navigate("/login");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(stored);
  }, [navigate]);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      const updated = properties.filter((_, i) => i !== index);
      setProperties(updated);
      localStorage.setItem("properties", JSON.stringify(updated));
    }
  };

  const handleAddRecommendation = (index) => {
    setSelectedProperty(index);
    setRecommendation("");
  };

  const submitRecommendation = () => {
    if (!recommendation.trim()) {
      alert("Please enter a recommendation");
      return;
    }

    const updated = [...properties];
    if (!updated[selectedProperty].recommendations) {
      updated[selectedProperty].recommendations = [];
    }
    updated[selectedProperty].recommendations.push(recommendation);
    setProperties(updated);
    localStorage.setItem("properties", JSON.stringify(updated));
    setSelectedProperty(null);
    setRecommendation("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.siteTitle}>DreamSpace: Enhancing Homes</h1>
        <h2 style={styles.subtitle}>Admin Dashboard</h2>
        <p style={styles.count}>Total Properties Submitted: {properties.length}</p>
      </div>

      {properties.length === 0 ? (
        <p style={styles.empty}>No properties submitted yet.</p>
      ) : (
        <div style={styles.grid}>
          {properties.map((property, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{property.city}</h3>
                <span style={styles.badge}>{property.propertyType}</span>
              </div>
              
              <div style={styles.propertyDetails}>
                <p><strong>User:</strong> {property.userName || "Unknown"}</p>
                <p><strong>Email:</strong> {property.userEmail || "N/A"}</p>
                <p><strong>Address:</strong> {property.address}</p>
                <p><strong>Budget:</strong> ₹{property.budget}</p>
                <p><strong>Changes Requested:</strong> {property.changes}</p>
                <p style={styles.date}>
                  Submitted: {new Date(property.submittedAt).toLocaleDateString()}
                </p>
              </div>

              {property.recommendations && property.recommendations.length > 0 && (
                <div style={styles.recommendations}>
                  <strong>Recommendations:</strong>
                  <ul style={styles.recList}>
                    {property.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={styles.actions}>
                <button onClick={() => handleAddRecommendation(index)} style={styles.addButton}>
                  Add Recommendation
                </button>
                <button onClick={() => handleDelete(index)} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProperty !== null && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Add Recommendation</h3>
            <p>Property: {properties[selectedProperty].city}, {properties[selectedProperty].address}</p>
            <textarea
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="Enter your recommendation..."
              style={styles.textarea}
            />
            <div style={styles.modalActions}>
              <button onClick={submitRecommendation} style={styles.submitBtn}>Submit</button>
              <button onClick={() => setSelectedProperty(null)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "2rem", backgroundColor: "#ffffff", minHeight: "100vh" },
  header: { textAlign: "center", marginBottom: "30px" },
  siteTitle: { fontSize: "42px", fontWeight: "bold", color: "#333", marginBottom: "10px" },
  subtitle: { fontSize: "24px", color: "#333", marginBottom: "5px" },
  count: { fontSize: "18px", color: "#555", marginBottom: "15px" },
  empty: { textAlign: "center", fontSize: "18px", color: "#777" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" },
  card: { border: "1px solid #ddd", padding: "20px", borderRadius: "10px", backgroundColor: "#f9f9f9", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
  cardTitle: { fontSize: "20px", fontWeight: "600", color: "#2563eb", margin: 0 },
  badge: { padding: "4px 12px", backgroundColor: "#e3f2fd", color: "#1976d2", borderRadius: "12px", fontSize: "12px", fontWeight: "500" },
  propertyDetails: { marginBottom: "15px", lineHeight: "1.8" },
  date: { fontSize: "12px", color: "#888", marginTop: "10px" },
  recommendations: { marginTop: "15px", padding: "10px", backgroundColor: "#f0f9ff", borderRadius: "6px" },
  recList: { marginTop: "8px", paddingLeft: "20px" },
  actions: { marginTop: "15px", display: "flex", gap: "10px" },
  addButton: { flex: 1, padding: "8px 12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" },
  deleteButton: { flex: 1, padding: "8px 12px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" },
  modal: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modalContent: { backgroundColor: "white", padding: "30px", borderRadius: "10px", width: "500px", maxWidth: "90%" },
  textarea: { width: "100%", height: "120px", padding: "10px", marginTop: "15px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box", fontSize: "14px" },
  modalActions: { marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end" },
  submitBtn: { padding: "10px 20px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" },
  cancelBtn: { padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" },
};

export default AdminDashboard;
