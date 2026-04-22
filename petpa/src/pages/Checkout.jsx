import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <h2>📦 Delivery Address</h2>

      <textarea
        placeholder="Enter full address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={styles.input}
      />

      <button
        style={styles.btn}
        onClick={() => navigate("/payment")}
        disabled={!address}
      >
        Continue to Payment
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: 30,
    maxWidth: 400,
    margin: "50px auto",
    background: "#fff",
    borderRadius: 12,
  },
  input: {
    width: "100%",
    height: 80,
    padding: 10,
    marginBottom: 20,
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
  },
};
