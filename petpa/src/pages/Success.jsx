
import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>✅ Payment Successful</h1>
        <p>Thank you for shopping with PetPal 🐾</p>

        <p><strong>Amount:</strong> ₹{state?.amount}</p>
        <p><strong>Transaction ID:</strong> {state?.txnId}</p>

        <button
          style={styles.btn}
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#dcfce7",
  },
  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 14,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  btn: {
    marginTop: 20,
    padding: 10,
    border: "none",
    background: "#22c55e",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
  },
};
