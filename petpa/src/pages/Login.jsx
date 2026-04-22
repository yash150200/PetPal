
// import { useState } from "react";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { auth } from "../firebase";
// import { db } from "../firebase";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const signup = async () => {
//     setMessage("");
//     try {
//       setLoading(true);

//       // 1️⃣ Create user in Firebase Auth
//       const res = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // 2️⃣ Save user in Firestore (THIS WAS MISSING ❌)
//       await setDoc(doc(db, "users", res.user.uid), {
//         uid: res.user.uid,
//         email: res.user.email,
//         createdAt: serverTimestamp(),
//       });

//       setMessage("✅ Account created successfully. Please login.");
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       setMessage(err.message);
//     }
//     setLoading(false);
//   };

//   const login = async () => {
//     setMessage("");
//     try {
//       setLoading(true);
//       await signInWithEmailAndPassword(auth, email, password);
//       setMessage("✅ Login successful!");
//     } catch (err) {
//       setMessage(err.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h1 style={styles.title}>🐾 PetPal</h1>
//         <p style={styles.subtitle}>Login or create your account</p>

//         <input
//           type="email"
//           placeholder="Email address"
//           style={styles.input}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password (min 6 characters)"
//           style={styles.input}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           style={styles.primaryBtn}
//           onClick={login}
//           disabled={loading}
//         >
//           {loading ? "Please wait..." : "Login"}
//         </button>

//         <button
//           style={styles.secondaryBtn}
//           onClick={signup}
//           disabled={loading}
//         >
//           Create Account
//         </button>

//         {message && <p style={styles.message}>{message}</p>}

//         <p style={styles.note}>
//           Secure authentication powered by Firebase 🔐
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ===================== STYLES ===================== */

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #ff9a8b, #ff6a88, #ff99ac)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   card: {
//     background: "#ffffff",
//     padding: 32,
//     borderRadius: 18,
//     width: "100%",
//     maxWidth: 380,
//     textAlign: "center",
//     boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
//   },
//   title: {
//     marginBottom: 6,
//     color: "#111827",
//   },
//   subtitle: {
//     marginBottom: 22,
//     color: "#6b7280",
//   },
//   input: {
//     width: "100%",
//     padding: 12,
//     marginBottom: 14,
//     borderRadius: 8,
//     border: "1px solid #d1d5db",
//     fontSize: 14,
//     outline: "none",
//   },
//   primaryBtn: {
//     width: "100%",
//     padding: 12,
//     borderRadius: 10,
//     border: "none",
//     background: "linear-gradient(90deg, #22c55e, #16a34a)",
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//     cursor: "pointer",
//     marginBottom: 10,
//   },
//   secondaryBtn: {
//     width: "100%",
//     padding: 12,
//     borderRadius: 10,
//     border: "none",
//     background: "#2563eb",
//     color: "#ffffff",
//     fontSize: 15,
//     fontWeight: "bold",
//     cursor: "pointer",
//   },
//   message: {
//     marginTop: 12,
//     fontSize: 14,
//     color: "#16a34a",
//     wordBreak: "break-word",
//   },
//   note: {
//     marginTop: 16,
//     fontSize: 12,
//     color: "#6b7280",
//   },
// // };
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signup = async () => {
    setMessage("");
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email: res.user.email,
        createdAt: serverTimestamp(),
      });

      setMessage("✅ Account created successfully. Please login.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  const login = async () => {
    setMessage("");
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Login successful!");
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🐾 PetPal</h1>
        <p style={styles.subtitle}>Login or create your account</p>

        <input
          type="email"
          placeholder="Email address"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.primaryBtn}
          onClick={login}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={signup}
          disabled={loading}
        >
          Create Account
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.note}>
          Secure authentication powered by Firebase 🔐
        </p>
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #ffb703, #ff7a18, #ff006e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(18px)",
    padding: 36,
    borderRadius: 22,
    width: "100%",
    maxWidth: 390,
    textAlign: "center",
    boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
    animation: "fadeIn 0.7s ease",
  },

  title: {
    marginBottom: 6,
    color: "#111827",
    fontSize: 30,
    fontWeight: 800,
  },

  subtitle: {
    marginBottom: 24,
    color: "#374151",
    fontSize: 15,
  },

  input: {
    width: "100%",
    padding: 14,
    marginBottom: 16,
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 15,
    outline: "none",
    transition: "all 0.25s ease",
  },

  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(90deg, #22c55e, #16a34a)",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: 12,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 10px 25px rgba(34,197,94,0.4)",
  },

  secondaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
  },

  message: {
    marginTop: 14,
    fontSize: 14,
    color: "#16a34a",
    wordBreak: "break-word",
    fontWeight: 600,
  },

  note: {
    marginTop: 18,
    fontSize: 12,
    color: "#4b5563",
  },
 };
