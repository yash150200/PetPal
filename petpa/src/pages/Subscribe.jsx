
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("monthly");
  const [animate, setAnimate] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const { isPremium, activatePremium, deactivatePremium } = useTheme();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const price = plan === "monthly" ? 299 : 2999;

  /* =========================
     💳 OPEN PAYMENT MODAL
     ========================= */
  const handleSubscribe = () => {
    setShowPayment(true);
  };

  /* =========================
     ✅ PAYMENT SUCCESS
     ========================= */
  const handlePaymentSuccess = () => {
    setLoading(true);

    setTimeout(() => {
      activatePremium(); // 🔥 premium ON
      setLoading(false);
      setShowPayment(false);
      alert("🎉 Payment Successful! Premium Activated.");
    }, 1200);
  };

  /* =========================
     ❌ CANCEL PREMIUM
     ========================= */
  const handleUnsubscribe = () => {
    if (!window.confirm("Cancel Premium subscription?")) return;
    deactivatePremium();
    alert("Premium cancelled. AI locked again.");
  };

  return (
    <div style={styles.page}>
      <div style={{ ...styles.card, ...(animate ? styles.cardShow : {}) }}>
        <h1 style={styles.title}>🐾 PetPal Premium</h1>

        <p style={styles.subtitle}>
          {isPremium
            ? "You are a Premium Member 🎉"
            : "Unlock AI-powered pet care"}
        </p>

        {/* PLAN SELECT */}
        {!isPremium && (
          <div style={styles.toggle}>
            <button
              style={{
                ...styles.toggleBtn,
                ...(plan === "monthly" ? styles.activeToggle : {})
              }}
              onClick={() => setPlan("monthly")}
            >
              Monthly
            </button>
            <button
              style={{
                ...styles.toggleBtn,
                ...(plan === "yearly" ? styles.activeToggle : {})
              }}
              onClick={() => setPlan("yearly")}
            >
              Yearly 🔥
            </button>
          </div>
        )}

        {/* FEATURES */}
        <ul style={styles.list}>
          <li>🤖 Premium AI Assistant</li>
          <li>👨‍⚕️ Vet Consultation</li>
          <li>✂️ Grooming Offers</li>
          <li>💊 Medicine Discounts</li>
          <li>⚡ Priority Support</li>
        </ul>

        {/* PRICE */}
        {!isPremium && (
          <div style={styles.priceBox}>
            <span style={styles.price}>₹{price}</span>
            <span style={styles.duration}>
              {plan === "monthly" ? " / month" : " / year"}
            </span>
          </div>
        )}

        {/* ACTION */}
        {!isPremium ? (
          <button style={styles.button} onClick={handleSubscribe}>
            Proceed to Pay 💳
          </button>
        ) : (
          <>
            <div style={styles.success}>✅ Premium Active</div>
            <button style={styles.unsubscribeBtn} onClick={handleUnsubscribe}>
              Cancel Premium ❌
            </button>
          </>
        )}
      </div>

      {/* =========================
         💳 PAYMENT MODAL
         ========================= */}
      {showPayment && (
        <div style={styles.overlay}>
          <div style={styles.paymentCard}>
            <h2>💳 Secure Payment</h2>
            <p>Amount to Pay</p>
            <h1>₹{price}</h1>

            <div style={styles.payOptions}>
              <div>💳 Card</div>
              <div>📱 UPI</div>
              <div>👛 Wallet</div>
            </div>

            <button
              style={styles.payBtn}
              onClick={handlePaymentSuccess}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${price}`}
            </button>

            <button
              style={styles.cancelBtn}
              onClick={() => setShowPayment(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 30,
    maxWidth: 420,
    width: "100%",
    textAlign: "center",
    opacity: 0,
    transform: "translateY(40px)",
    transition: "0.6s"
  },
  cardShow: { opacity: 1, transform: "translateY(0)" },
  title: { marginBottom: 8 },
  subtitle: { color: "#6b7280", marginBottom: 20 },

  toggle: { display: "flex", gap: 10, marginBottom: 20 },
  toggleBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    cursor: "pointer"
  },
  activeToggle: { background: "#22c55e", color: "#fff" },

  list: { textAlign: "left", marginBottom: 20 },
  priceBox: { marginBottom: 20 },
  price: { fontSize: 32, fontWeight: "bold", color: "#16a34a" },
  duration: { color: "#6b7280" },

  button: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },

  unsubscribeBtn: {
    marginTop: 12,
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "bold"
  },

  success: {
    padding: 12,
    background: "#dcfce7",
    borderRadius: 8,
    fontWeight: "bold"
  },

  /* PAYMENT MODAL */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paymentCard: {
    background: "#fff",
    padding: 30,
    borderRadius: 16,
    width: 320,
    textAlign: "center"
  },
  payOptions: {
    display: "flex",
    justifyContent: "space-around",
    margin: "15px 0",
    fontWeight: "bold"
  },
  payBtn: {
    width: "100%",
    padding: 12,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    marginBottom: 8
  },
  cancelBtn: {
    background: "transparent",
    border: "none",
    color: "#ef4444",
    cursor: "pointer"
  }
};



// import { useEffect, useState } from "react";
// import { useTheme } from "../context/ThemeContext";

// export default function Subscribe() {
//   const [loading, setLoading] = useState(false);
//   const [plan, setPlan] = useState("monthly");
//   const [animate, setAnimate] = useState(false);
//   const [showPayment, setShowPayment] = useState(false);

//   const { isPremium, activatePremium, deactivatePremium } = useTheme();

//   useEffect(() => {
//     setAnimate(true);
//   }, []);

//   const price = plan === "monthly" ? 299 : 2999;

//   const handleSubscribe = () => setShowPayment(true);

//   const handlePaymentSuccess = () => {
//     setLoading(true);
//     setTimeout(() => {
//       activatePremium();
//       setLoading(false);
//       setShowPayment(false);
//       alert("🎉 Payment Successful! Premium Activated.");
//     }, 1200);
//   };

//   const handleUnsubscribe = () => {
//     if (!window.confirm("Cancel Premium subscription?")) return;
//     deactivatePremium();
//     alert("Premium cancelled. AI locked again.");
//   };

//   return (
//     <div style={styles.page}>
//       {/* Soft Background Accents */}
//       <div style={styles.lightBlob1}></div>
//       <div style={styles.lightBlob2}></div>

//       <div style={{ ...styles.card, ...(animate ? styles.cardShow : {}) }}>
//         <h1 style={styles.title}>🐾 PetPal Premium</h1>

//         <p style={styles.subtitle}>
//           {isPremium
//             ? "You are a Premium Member 🎉"
//             : "Unlock AI-powered pet care"}
//         </p>

//         {!isPremium && (
//           <div style={styles.toggleContainer}>
//             <button
//               style={{
//                 ...styles.toggleBtn,
//                 ...(plan === "monthly" ? styles.activeToggle : {})
//               }}
//               onClick={() => setPlan("monthly")}
//             >
//               Monthly
//             </button>
//             <button
//               style={{
//                 ...styles.toggleBtn,
//                 ...(plan === "yearly" ? styles.activeToggle : {})
//               }}
//               onClick={() => setPlan("yearly")}
//             >
//               Yearly 🔥
//             </button>
//           </div>
//         )}

//         <ul style={styles.list}>
//           <li style={styles.listItem}><span>🤖</span> Premium AI Assistant</li>
//           <li style={styles.listItem}><span>👨‍⚕️</span> Vet Consultation</li>
//           <li style={styles.listItem}><span>✂️</span> Grooming Offers</li>
//           <li style={styles.listItem}><span>💊</span> Medicine Discounts</li>
//           <li style={styles.listItem}><span>⚡</span> Priority Support</li>
//         </ul>

//         {!isPremium && (
//           <div style={styles.priceBox}>
//             <span style={styles.price}>₹{price}</span>
//             <span style={styles.duration}>
//               {plan === "monthly" ? " / month" : " / year"}
//             </span>
//           </div>
//         )}

//         {!isPremium ? (
//           <button style={styles.button} onClick={handleSubscribe}>
//             Proceed to Pay 💳
//           </button>
//         ) : (
//           <>
//             <div style={styles.successBadge}>✅ Premium Active</div>
//             <button style={styles.unsubscribeBtn} onClick={handleUnsubscribe}>
//               Cancel Premium ❌
//             </button>
//           </>
//         )}
//       </div>

//       {showPayment && (
//         <div style={styles.overlay}>
//           <div style={styles.paymentCard}>
//             <h2 style={{color: '#1e293b', marginBottom: '10px'}}>💳 Secure Payment</h2>
//             <p style={{color: '#64748b', fontSize: '14px'}}>Amount to Pay</p>
//             <h1 style={{fontSize: '2.5rem', margin: '10px 0', color: '#16a34a'}}>₹{price}</h1>

//             <div style={styles.payOptions}>
//               <div style={styles.payOptionItem}>💳 Card</div>
//               <div style={styles.payOptionItem}>📱 UPI</div>
//               <div style={styles.payOptionItem}>👛 Wallet</div>
//             </div>

//             <button
//               style={styles.payBtn}
//               onClick={handlePaymentSuccess}
//               disabled={loading}
//             >
//               {loading ? "Processing..." : `Pay ₹${price}`}
//             </button>

//             <button
//               style={styles.cancelBtn}
//               onClick={() => setShowPayment(false)}
//             >
//               Back to plans
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)", // Light elegant gradient
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//     fontFamily: "'Segoe UI', Roboto, sans-serif",
//     position: 'relative',
//     overflow: 'hidden'
//   },
//   // Soft pastel background elements for 3D feel
//   lightBlob1: {
//     position: 'absolute', width: '500px', height: '500px', background: 'rgba(251, 194, 235, 0.4)',
//     filter: 'blur(100px)', borderRadius: '50%', top: '-10%', left: '-10%'
//   },
//   lightBlob2: {
//     position: 'absolute', width: '500px', height: '500px', background: 'rgba(166, 193, 238, 0.4)',
//     filter: 'blur(100px)', borderRadius: '50%', bottom: '-10%', right: '-10%'
//   },
//   card: {
//     background: "rgba(255, 255, 255, 0.7)",
//     backdropFilter: "blur(20px)",
//     borderRadius: 30,
//     border: "1px solid rgba(255, 255, 255, 0.8)",
//     padding: 40,
//     maxWidth: 420,
//     width: "100%",
//     textAlign: "center",
//     boxShadow: "0 20px 40px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)",
//     opacity: 0,
//     transform: "translateY(30px) scale(0.95)",
//     transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
//     zIndex: 5
//   },
//   cardShow: { opacity: 1, transform: "translateY(0) scale(1)" },
  
//   title: { fontSize: '2rem', color: '#1e293b', marginBottom: 10, fontWeight: '800' },
//   subtitle: { color: "#64748b", marginBottom: 30, fontSize: '1.1rem' },

//   toggleContainer: {
//     display: "flex",
//     background: "#f1f5f9",
//     padding: 6,
//     borderRadius: 16,
//     marginBottom: 30,
//     boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
//   },
//   toggleBtn: {
//     flex: 1,
//     padding: "12px",
//     borderRadius: 12,
//     border: "none",
//     cursor: "pointer",
//     background: "transparent",
//     color: "#64748b",
//     fontWeight: "600",
//     transition: "0.3s"
//   },
//   activeToggle: { 
//     background: "#fff", 
//     color: "#22c55e", 
//     boxShadow: "0 4px 12px rgba(0,0,0,0.08)" 
//   },

//   list: { textAlign: "left", marginBottom: 30, padding: 0, listStyle: 'none' },
//   listItem: { 
//     display: 'flex', 
//     alignItems: 'center', 
//     gap: 12, 
//     marginBottom: 15, 
//     color: '#475569',
//     fontSize: '1.05rem'
//   },

//   priceBox: { marginBottom: 30 },
//   price: { fontSize: 48, fontWeight: "900", color: "#1e293b", letterSpacing: '-1px' },
//   duration: { color: "#94a3b8", fontSize: '1.2rem' },

//   button: {
//     width: "100%",
//     padding: "18px",
//     borderRadius: 16,
//     border: "none",
//     background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: "1.1rem",
//     cursor: "pointer",
//     boxShadow: "0 10px 20px rgba(34, 197, 94, 0.3)",
//     transition: "0.3s transform, 0.3s box-shadow",
//   },

//   successBadge: {
//     padding: 15,
//     background: "#dcfce7",
//     color: "#166534",
//     borderRadius: 12,
//     fontWeight: "bold",
//     marginBottom: 15
//   },

//   unsubscribeBtn: {
//     width: "100%",
//     padding: 12,
//     background: "transparent",
//     border: "1px solid #fee2e2",
//     color: "#ef4444",
//     borderRadius: 12,
//     cursor: "pointer",
//     fontWeight: "600"
//   },

//   /* Payment Modal Styles */
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(255,255,255,0.4)",
//     backdropFilter: "blur(12px)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 100
//   },
//   paymentCard: {
//     background: "#fff",
//     padding: 35,
//     borderRadius: 30,
//     width: 360,
//     textAlign: "center",
//     boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
//     border: "1px solid #f1f5f9"
//   },
//   payOptions: {
//     display: "flex",
//     gap: 10,
//     margin: "25px 0"
//   },
//   payOptionItem: {
//     flex: 1,
//     padding: "10px 5px",
//     background: "#f8fafc",
//     borderRadius: 10,
//     fontSize: "12px",
//     fontWeight: "700",
//     color: "#64748b",
//     border: "1px solid #f1f5f9"
//   },
//   payBtn: {
//     width: "100%",
//     padding: 16,
//     background: "#1e293b",
//     color: "#fff",
//     border: "none",
//     borderRadius: 14,
//     fontWeight: "bold",
//     marginBottom: 10,
//     cursor: "pointer"
//   },
//   cancelBtn: {
//     background: "transparent",
//     border: "none",
//     color: "#94a3b8",
//     cursor: "pointer",
//     fontSize: "14px"
//   }
// };