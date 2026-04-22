
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function AddPet() {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [age, setAge] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [pendingRequests, setPendingRequests] = useState([]);

  /* ================= CLOUDINARY UPLOAD ================= */

  const uploadToCloudinary = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "y86u2rvp");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpue0abog/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  /* ================= SUBMIT REQUEST ================= */

  const addPet = async () => {
    if (!name || !price || !age || !quantity || !imageFile) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const imageURL = await uploadToCloudinary();

      await addDoc(collection(db, "petRequests"), {
        name,
        price: Number(price),
        age: Number(age),
        quantity: Number(quantity),
        image: imageURL,
        status: "pending",
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      alert("✅ Request submitted! Waiting for admin approval.");

      setName("");
      setPrice("");
      setAge("");
      setQuantity("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit request");
    }

    setLoading(false);
  };

  /* ================= FETCH USER PENDING REQUESTS ================= */

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "petRequests"),
      where("userId", "==", user.uid),
      where("status", "==", "pending")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPendingRequests(list);
    });

    return () => unsub();
  }, [user]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ===== FORM CARD ===== */}
        <div style={styles.card}>
          <h2 style={styles.title}>Add New Pet 🐾</h2>
          <p style={styles.subtitle}>
            Submit a request for admin approval
          </p>

          <input
            style={styles.input}
            placeholder="Pet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Age (months)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Available Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            style={styles.file}
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <button style={styles.btn} onClick={addPet} disabled={loading}>
            {loading ? "Submitting..." : "Request Approval"}
          </button>
        </div>

        {/* ===== PENDING REQUESTS ===== */}
        {pendingRequests.length > 0 && (
          <div style={styles.pendingBox}>
            <h3 style={styles.pendingTitle}>
              🕒 Your Pending Requests
            </h3>

            {pendingRequests.map((p) => (
              <div key={p.id} style={styles.pendingCard}>
                <img src={p.image} alt={p.name} style={styles.thumb} />
                <div>
                  <b>{p.name}</b>
                  <p style={styles.pendingText}>
                    ₹{p.price} • {p.age} months
                  </p>
                  <span style={styles.pendingTag}>Pending</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= CLEAN & CENTERED STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
    padding: 20,
  },

  container: {
    display: "flex",
    gap: 32,
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  card: {
    background: "#ffffff",
    padding: "32px 28px",
    borderRadius: 20,
    width: 380,
    textAlign: "center",
    boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
  },

  title: {
    marginBottom: 6,
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
  },

  subtitle: {
    marginBottom: 22,
    fontSize: 14,
    color: "#6b7280",
  },

  input: {
    width: "100%",
    padding: 13,
    marginBottom: 14,
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
    outline: "none",
  },

  file: {
    width: "100%",
    marginBottom: 16,
  },

  btn: {
    width: "100%",
    padding: 13,
    background: "#16a34a",
    color: "#ffffff",
    border: "none",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },

  pendingBox: {
    width: 380,
    background: "#ffffff",
    padding: 20,
    borderRadius: 18,
    boxShadow: "0 14px 35px rgba(0,0,0,0.12)",
  },

  pendingTitle: {
    marginBottom: 14,
    fontSize: 16,
    fontWeight: 700,
  },

  pendingCard: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    background: "#f9fafb",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  thumb: {
    width: 54,
    height: 54,
    borderRadius: 10,
    objectFit: "cover",
  },

  pendingText: {
    margin: "4px 0",
    fontSize: 13,
    color: "#374151",
  },

  pendingTag: {
    background: "#fde68a",
    color: "#92400e",
    padding: "3px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
  },
};
