
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const amount = state?.total || 299;

  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const qrValue = `upi://pay?pa=petpal@upi&pn=PetPal&am=${amount}&cu=INR`;

  const payNow = () => {
    setProcessing(true);

    setTimeout(() => {
      const txnId = "TXN" + Math.floor(Math.random() * 1000000);
      navigate("/success", {
        state: { amount, txnId },
      });
    }, 2000);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2>🔐 Secure Payment</h2>
        <p>Total Amount: <strong>₹{amount}</strong></p>

        <select
          style={styles.input}
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="card">💳 Credit / Debit Card</option>
          <option value="upi">📱 UPI</option>
          <option value="qr">📷 QR Code</option>
        </select>

        {method === "card" && (
          <>
            <input style={styles.input} placeholder="Card Number" />
            <input style={styles.input} placeholder="Expiry MM/YY" />
            <input style={styles.input} placeholder="CVV" />
          </>
        )}

        {method === "upi" && (
          <input style={styles.input} placeholder="example@upi" />
        )}

        {method === "qr" && (
          <div style={styles.qrBox}>
            <QRCodeCanvas value={qrValue} size={180} />
            <p>Scan using any UPI app</p>
          </div>
        )}

        <button
          style={styles.btn}
          onClick={payNow}
          disabled={processing}
        >
          {processing ? "Processing Payment..." : "Pay ₹" + amount}
        </button>

        <p style={styles.note}>
           {/* This is a demo payment gateway (No real money) */}
        </p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    minHeight: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    padding: 30,
    width: 400,
    borderRadius: 14,
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #d1d5db",
  },
  qrBox: {
    background: "#f3f4f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
  },
  note: {
    fontSize: 12,
    marginTop: 10,
    color: "#6b7280",
  },
};
