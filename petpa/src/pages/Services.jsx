
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const services = [
  {
    name: "Food",
    type: "food",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.J_Uj5dgGRHXcl8BGUm4-PwHaE7?pid=Api&P=0&h=180",
  },
  {
    name: "Medicines",
    type: "medicines",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.LQBYxfHX8WM_xYKpkfZvmgHaEK?pid=Api&P=0&h=180",
  },
  {
    name: "Grooming",
    type: "grooming",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.snEMgukeegaANqRlVxjhCwHaHa?pid=Api&P=0&h=180",
  },
  {
    name: "Accessories",
    type: "accessories",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.8KLovy4x0bgSipoLMBDHwgHaE7?pid=Api&P=0&h=180",
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div style={styles.page}>
        <div style={styles.grid}>
          {services.map((s) => (
            <div
              key={s.type}
              className="service-card"
              onClick={() => navigate(`/services/${s.type}`)}
              style={styles.card}
            >
              {/* IMAGE */}
              <img
                src={s.image}
                alt={s.name}
                className="service-img"
                style={styles.image}
              />

              {/* TITLE */}
              <h3 style={styles.title}>{s.name}</h3>
            </div>
          ))}
        </div>

        {/* Hover only */}
        <style>
          {`
            .service-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 14px 28px rgba(0,0,0,0.25);
            }

            .service-card:hover .service-img {
              transform: scale(1.08);
            }
          `}
        </style>
      </div>
    </PageTransition>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    height: "calc(100vh - 120px)", // 🔥 FITS BETWEEN NAVBAR + FOOTER
    padding: "20px 40px",
    overflow: "hidden", // 🚫 NO SCROLL
    display: "flex",
    alignItems: "center",
   
  },

  grid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // exactly 4 cards
    gap: 24,
  },

  card: {
    background: "#ffffff",
    borderRadius: 18,
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  image: {
    width: "100%",
    height: 160, // 🔥 REDUCED HEIGHT → NO SCROLL
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },

  title: {
    padding: "12px",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
  },
};
