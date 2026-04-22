// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Welcome to PETPAL 🐾</h1>
          <p style={styles.subtitle}>
            Your trusted platform for pet care, food, grooming & accessories
          </p>

          <div style={styles.buttons}>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/services")}
            >
              Explore Services
            </button>
            <button
              style={styles.secondaryBtn}
              onClick={() => navigate("/pets")}
            >
              View Pets
            </button>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Choose PETPAL?</h2>

        <div style={styles.featureGrid}>
          <div style={styles.card}>
            <h3>🐶 Pet Products</h3>
            <p>High-quality food, medicines & accessories for your pets.</p>
          </div>

          <div style={styles.card}>
            <h3>🧼 Grooming Services</h3>
            <p>Professional grooming tools & hygiene care.</p>
          </div>

          <div style={styles.card}>
            <h3>💳 Easy Checkout</h3>
            <p>Simple cart system with quick checkout experience.</p>
          </div>

          <div style={styles.card}>
            <h3>⭐ Premium Membership</h3>
            <p>Exclusive offers, discounts & priority support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    minHeight: "70vh",
    background:
      "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://picsum.photos/seed/pets-home/1400/700')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
    padding: 20
  },
  heroContent: {
    maxWidth: 700
  },
  title: {
    fontSize: "3rem",
    marginBottom: 15
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: 25,
    color: "#f3f4f6"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
    flexWrap: "wrap"
  },
  primaryBtn: {
    padding: "12px 22px",
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "bold"
  },
  secondaryBtn: {
    padding: "12px 22px",
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: "#f97316",
    color: "#fff",
    fontWeight: "bold"
  },
  features: {
    padding: 50,
    background: "#f9fafb"
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: "2rem"
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 25,
    maxWidth: 1000,
    margin: "auto"
  },
  card: {
    background: "#fff",
    padding: 25,
    borderRadius: 14,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  }
};
