
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 🔥 Query users collection
        const q = query(
          collection(db, "users"),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);

        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(list);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Registered Users 👥</h2>

      {loading && <p>Loading users...</p>}

      {!loading && users.length === 0 && (
        <p>No registered users found</p>
      )}

      {users.map((user) => (
        <div key={user.id} style={card}>
          <p><strong>Email:</strong> {user.email}</p>
          <p style={{ fontSize: 12, color: "#6b7280" }}>
            UID: {user.uid}
          </p>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#ffffff",
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
};
