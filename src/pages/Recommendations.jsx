// src/pages/Recommendations.jsx
import React, { useEffect, useState } from "react";

function Recommendations() {
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];

    if (Array.isArray(storedProperties) && storedProperties.length > 0) {
      setPropertyData(storedProperties[storedProperties.length - 1]);
    } else if (typeof storedProperties === "object" && Object.keys(storedProperties).length > 0) {
      const locationKeys = Object.keys(storedProperties);
      const latestLocation = locationKeys[locationKeys.length - 1];
      const latestProperty =
        storedProperties[latestLocation][storedProperties[latestLocation].length - 1];
      setPropertyData(latestProperty);
    }
  }, []);

  const generateRecommendations = (data) => {
    let ideas = [];
    const budget = Number(data.budget) || 0;
    const changeArea = data.changes?.trim().toLowerCase();
    const lowBudget = budget < 20000;

    if (changeArea.includes("bedroom")) {
      ideas = lowBudget
        ? [
            "Repaint bedroom walls with calm pastel colors.",
            "Add budget-friendly LED strip lighting.",
            "Install floating wall shelves.",
            "Upgrade curtains to modern fabric design.",
          ]
        : [
            "Install modular wardrobe with sliding doors.",
            "Add designer false ceiling with warm lighting.",
            "Create accent wall with textured panels.",
            "Upgrade to premium wooden flooring.",
            "Add smart lighting control system.",
          ];
    } else if (changeArea.includes("kitchen")) {
      ideas = lowBudget
        ? [
            "Repaint kitchen walls with washable paint.",
            "Upgrade lighting to LED.",
            "Add modular storage racks.",
            "Replace old cabinet handles.",
          ]
        : [
            "Install modular kitchen units.",
            "Add premium countertop material.",
            "Upgrade flooring to tiles.",
            "Install smart lighting and chimney.",
          ];
    } else if (changeArea.includes("garden")) {
      ideas = lowBudget
        ? [
            "Clean and level garden surface.",
            "Plant low-maintenance flowering plants.",
            "Install basic solar garden lights.",
            "Add simple outdoor seating bench.",
          ]
        : [
            "Create landscaped pathway with stone tiles.",
            "Install decorative water fountain.",
            "Add gazebo or pergola seating area.",
            "Install automatic sprinkler system.",
            "Add premium lawn grass installation.",
          ];
    } else if (changeArea.includes("washroom")) {
      ideas = lowBudget
        ? [
            "Replace old taps and shower fittings.",
            "Install modern mirror with LED border.",
            "Add anti-skid floor mats.",
            "Upgrade to water-saving fixtures.",
          ]
        : [
            "Install glass shower partition.",
            "Upgrade to premium wall and floor tiles.",
            "Add floating vanity unit.",
            "Install rain shower system.",
            "Add concealed flush system.",
          ];
    } else if (changeArea.includes("balcony")) {
      ideas = lowBudget
        ? [
            "Add potted plants for greenery.",
            "Install foldable drying rack.",
            "Place a small outdoor chair and table.",
            "Use fairy lights for cozy ambiance.",
          ]
        : [
            "Install wooden deck flooring.",
            "Add premium outdoor seating set.",
            "Create vertical garden wall.",
            "Install retractable awning or canopy.",
            "Add decorative railing planters.",
          ];
    } else {
      // Default fallback
      ideas = lowBudget
        ? [
            "Repaint interior walls.",
            "Upgrade lighting to LED.",
            "Install modular storage units.",
          ]
        : [
            "Install modular kitchen.",
            "Add false ceiling design.",
            "Upgrade flooring.",
            "Install smart lighting system.",
          ];
    }

    return ideas;
  };

  if (!propertyData || !propertyData.propertyType) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No Property Data Found
      </h2>
    );
  }

  const recommendations = generateRecommendations(propertyData);

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
          <h2 style={styles.title}>Recommended Ideas</h2>

          <p><strong>Location:</strong> {propertyData.city}, {propertyData.address}</p>
          <p><strong>Property Type:</strong> {propertyData.propertyType}</p>
          <p><strong>Budget:</strong> ₹{propertyData.budget}</p>
          <p><strong>Changes:</strong> {propertyData.changes}</p>

          <ul style={styles.list}>
            {recommendations.map((idea, index) => (
              <li key={index}>{index + 1}. {idea}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: { display: "flex", height: "100vh", backgroundColor: "#ffffff" },
  leftSide: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
  image: { width: "100%", maxWidth: "510px", height: "auto", borderRadius: "9px", objectFit: "cover", display: "block", margin: "0 auto" },
  rightSide: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
  siteTitle: { fontSize: "38px", fontWeight: "bold", color: "#333", marginBottom: "24px", textAlign: "center" },
  card: { width: "400px", padding: "40px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "left" },
  title: { marginBottom: "20px", textAlign: "center" },
  list: { marginTop: "15px", paddingLeft: "20px" },
};

export default Recommendations;

