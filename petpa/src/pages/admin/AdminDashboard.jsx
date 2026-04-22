
// import { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "../../firebase";

// export default function AdminDashboard() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH PENDING REQUESTS ================= */

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const snap = await getDocs(
//           collection(db, "pet_requests") // ✅ SAME AS EXPO
//         );

//         setRequests(
//           snap.docs.map((d) => ({
//             id: d.id,
//             ...d.data(),
//           }))
//         );
//       } catch (err) {
//         console.error("Failed to fetch requests", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   /* ================= APPROVE PET ================= */

//   const approvePet = async (pet) => {
//     try {
//       // ✅ ADD PET WITH createdAt (CRITICAL FIX)
//       await addDoc(collection(db, "pets"), {
//         name: pet.name,
//         price: pet.price,
//         image: pet.image,
//         sold: false,
//         createdAt: serverTimestamp(), // 🔥 REQUIRED
//       });

//       // ✅ REMOVE REQUEST
//       await deleteDoc(doc(db, "pet_requests", pet.id));

//       // ✅ UPDATE UI
//       setRequests((prev) => prev.filter((p) => p.id !== pet.id));
//     } catch (err) {
//       console.error("Approve failed", err);
//       alert("Failed to approve pet");
//     }
//   };

//   /* ================= REJECT PET ================= */

//   const rejectPet = async (id) => {
//     try {
//       await deleteDoc(doc(db, "pet_requests", id));
//       setRequests((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       console.error("Reject failed", err);
//       alert("Failed to reject pet");
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>🛠 Admin Dashboard</h1>
//       <h3>Pending Pet Requests</h3>

//       {loading && <p>Loading...</p>}

//       {!loading && requests.length === 0 && (
//         <p>No pending requests 🎉</p>
//       )}

//       {requests.map((pet) => (
//         <div key={pet.id} style={card}>
//           <img
//             src={pet.image}
//             alt={pet.name}
//             width="120"
//             style={{ borderRadius: 8 }}
//           />

//           <h3>{pet.name}</h3>
//           <p>₹{pet.price}</p>

//           <div style={{ display: "flex", gap: 10 }}>
//             <button onClick={() => approvePet(pet)}>
//               ✅ Approve
//             </button>

//             <button onClick={() => rejectPet(pet.id)}>
//               ❌ Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const card = {
//   background: "#fff",
//   padding: 20,
//   borderRadius: 12,
//   marginBottom: 20,
//   boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
// };


import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const snap = await getDocs(
          collection(db, "petRequests") // ✅ FIXED
        );

        setRequests(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  /* ================= APPROVE ================= */
  const approvePet = async (pet) => {
    try {
      await addDoc(collection(db, "pets"), {
        name: pet.name,
        price: pet.price,
        image: pet.image,
        sold: false,
        createdAt: serverTimestamp(),
      });

      await deleteDoc(doc(db, "petRequests", pet.id)); // ✅ FIXED

      setRequests((prev) => prev.filter((p) => p.id !== pet.id));
    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  /* ================= REJECT ================= */
  const rejectPet = async (id) => {
    await deleteDoc(doc(db, "petRequests", id)); // ✅ FIXED
    setRequests((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🛠 Admin Dashboard</h1>

      {loading && <p>Loading...</p>}

      {requests.map((pet) => (
        <div key={pet.id} style={card}>
          <img src={pet.image} width="120" />

          <h3>{pet.name}</h3>
          <p>₹{pet.price}</p>

          <button onClick={() => approvePet(pet)}>
            ✅ Approve
          </button>

          <button onClick={() => rejectPet(pet.id)}>
            ❌ Reject
          </button>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  marginBottom: 20,
};