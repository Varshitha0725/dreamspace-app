import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UserDashboard() {
  const navigate = useNavigate();
  const [userProperties, setUserProperties] = useState([]);

 useEffect(() => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedUser) {
    navigate("/login");
    return;
  }

  let allProperties =
    JSON.parse(localStorage.getItem("properties")) || [];

  const userHasProperties = allProperties.some(
    (p) =>
      p.userEmail === loggedUser.email ||
      p.userName === loggedUser.name
  );

  if (!userHasProperties) {
    const sampleProperties = [
      {
        city: "Bangalore",
        address: "456 MG Road",
        propertyType: "villa",
        budget: "1200000",
        changes: "Garden landscaping and terrace waterproofing",
        userName: loggedUser.name,
        userEmail: loggedUser.email,
        submittedAt: new Date().toISOString(),
        recommendations: [
          "Install modular kitchen with granite countertops",
          "Add premium bathroom fittings with geyser",
          "Create landscaped garden with pathway stones",
        ],
      },
    ];

    allProperties = [...allProperties, ...sampleProperties];
    localStorage.setItem("properties", JSON.stringify(allProperties));
  }

  const filtered = allProperties.filter(
    (p) =>
      p.userEmail === loggedUser.email ||
      p.userName === loggedUser.name
  );

  setUserProperties(filtered);

}, [navigate]);

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.siteTitle}>DreamSpace: Enhancing Homes</h1>
      </div>

      <div style={styles.content}>
        <div style={styles.actionSection}>
          <button
            onClick={() => navigate("/submit-property")}
            style={styles.submitButton}
          >
            + Submit New Property
          </button>
        </div>

        <h3 style={styles.sectionTitle}>My Submitted Properties</h3>

        {userProperties.length === 0 ? (
          <div style={styles.emptyState}>
            <p>You haven't submitted any properties yet.</p>
            <p>Click the button above to submit your first property!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {userProperties.map((property, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.cardTitle}>{property.city}</h3>
                <p><strong>Address:</strong> {property.address}</p>
                <p><strong>Type:</strong> {property.propertyType}</p>
                <p><strong>Budget:</strong> ₹{property.budget}</p>
                <p><strong>Changes Requested:</strong> {property.changes}</p>
                <p style={styles.date}>
                  Submitted: {new Date(property.submittedAt).toLocaleDateString()}
                </p>
                
                {property.recommendations && property.recommendations.length > 0 && (
                  <div style={styles.recommendations}>
                    <strong>Admin Recommendations:</strong>
                    <ul style={styles.recList}>
                      {property.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <button
                  onClick={() => navigate("/recommendations")}
                  style={styles.viewButton}
                >
                  View Recommendations
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", backgroundColor: "#f5f7fa", minHeight: "100vh" },
  header: { textAlign: "center", marginBottom: "30px" },
  siteTitle: { fontSize: "42px", fontWeight: "bold", color: "#333", marginBottom: "10px" },
  content: { maxWidth: "1200px", margin: "0 auto" },
  actionSection: { textAlign: "center", marginBottom: "30px" },
  submitButton: { padding: "12px 30px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" },
  sectionTitle: { fontSize: "24px", fontWeight: "600", marginBottom: "20px", color: "#333" },
  emptyState: { textAlign: "center", padding: "60px 20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" },
  card: { border: "1px solid #ddd", padding: "20px", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  cardTitle: { fontSize: "20px", fontWeight: "600", marginBottom: "10px", color: "#2563eb" },
  date: { fontSize: "12px", color: "#888", marginTop: "10px" },
  recommendations: { marginTop: "15px", padding: "10px", backgroundColor: "#f0f9ff", borderRadius: "6px" },
  recList: { marginTop: "8px", paddingLeft: "20px" },
  viewButton: { marginTop: "15px", padding: "8px 16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" },
};

export default UserDashboard;
