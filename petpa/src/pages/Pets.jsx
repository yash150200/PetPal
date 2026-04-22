
// // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // import {
// // // // // // // //   collection,
// // // // // // // //   getDocs,
// // // // // // // //   query,
// // // // // // // //   orderBy,
// // // // // // // //   updateDoc,
// // // // // // // //   deleteDoc,
// // // // // // // //   doc,
// // // // // // // // } from "firebase/firestore";
// // // // // // // // import { db } from "../firebase";
// // // // // // // // import "./Pets.css";

// // // // // // // // /* ================= FALLBACK IMAGES ================= */

// // // // // // // // const fallbackDog =
// // // // // // // //   "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=60";

// // // // // // // // const fallbackCat =
// // // // // // // //   "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=60";

// // // // // // // // /* ================= STATIC IMAGES ================= */

// // // // // // // // const dogImages = [
// // // // // // // //   "https://images.unsplash.com/photo-1517849845537-4d257902454a",
// // // // // // // //   "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
// // // // // // // //   "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
// // // // // // // //   "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6",
// // // // // // // //   "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
// // // // // // // //   "https://www.freepik.com/free-ai-image/3d-rendering-cartoon-like-dog_65630624.htm#fromView=keyword&page=1&position=4&uuid=76053570-ee8c-4d53-a132-4dbf9d52aa9b&query=Ai+generated+dog",
// // // // // // // //   "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
// // // // // // // //   "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
// // // // // // // // ];

// // // // // // // // const catImages = [
// // // // // // // //   "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
// // // // // // // //   "https://images.unsplash.com/photo-1529778873920-4da4926a72c2",
// // // // // // // //   "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
// // // // // // // //   "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
// // // // // // // //   "https://up.yimg.com/ib/th/id/OIP.p6e-4OsdWKTMq2n-TCmZQwHaEh?pid=Api&rs=1&c=1&qlt=95&w=160&h=97",
// // // // // // // //   "https://images.unsplash.com/photo-1534361960057-19889db9621e",
// // // // // // // // ];

// // // // // // // // /* ================= STATIC PETS (DOGS + CATS) ================= */

// // // // // // // // const staticPets = [
// // // // // // // //   ...dogImages.map((img, i) => ({
// // // // // // // //     name: `Dog ${i + 1}`,
// // // // // // // //     img,
// // // // // // // //     type: "dog",
// // // // // // // //   })),
// // // // // // // //   ...catImages.map((img, i) => ({
// // // // // // // //     name: `Cat ${i + 1}`,
// // // // // // // //     img,
// // // // // // // //     type: "cat",
// // // // // // // //   })),
// // // // // // // // ];

// // // // // // // // /* ================= COMPONENT ================= */

// // // // // // // // export default function Pets() {
// // // // // // // //   const [addedPets, setAddedPets] = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [selectedPet, setSelectedPet] = useState(null);

// // // // // // // //   /* 🔄 FETCH FIREBASE PETS */
// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchPets = async () => {
// // // // // // // //       const q = query(collection(db, "pets"), orderBy("createdAt", "desc"));
// // // // // // // //       const snap = await getDocs(q);

// // // // // // // //       const list = snap.docs.map((d) => ({
// // // // // // // //         id: d.id,
// // // // // // // //         ...d.data(),
// // // // // // // //       }));

// // // // // // // //       setAddedPets(list);
// // // // // // // //       setLoading(false);
// // // // // // // //     };

// // // // // // // //     fetchPets();
// // // // // // // //   }, []);

// // // // // // // //   /* 💳 FAKE PAYMENT */
// // // // // // // //   const completePayment = async () => {
// // // // // // // //     await updateDoc(doc(db, "pets", selectedPet.id), {
// // // // // // // //       sold: true,
// // // // // // // //     });

// // // // // // // //     setAddedPets((prev) =>
// // // // // // // //       prev.map((p) =>
// // // // // // // //         p.id === selectedPet.id ? { ...p, sold: true } : p
// // // // // // // //       )
// // // // // // // //     );

// // // // // // // //     setSelectedPet(null);
// // // // // // // //     alert("🎉 Payment Successful! Pet Purchased.");
// // // // // // // //   };

// // // // // // // //   /* ❌ REMOVE PET */
// // // // // // // //   const removePet = async (id) => {
// // // // // // // //     if (!window.confirm("Remove this pet?")) return;

// // // // // // // //     await deleteDoc(doc(db, "pets", id));
// // // // // // // //     setAddedPets((prev) => prev.filter((p) => p.id !== id));
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <>
// // // // // // // //       {/* ===== STATIC PETS ===== */}
// // // // // // // //       <h2 className="section-title">Available Pets 🐾</h2>

// // // // // // // //       <div className="card-grid">
// // // // // // // //         {staticPets.map((pet, i) => (
// // // // // // // //           <div className="card" key={i}>
// // // // // // // //             <img
// // // // // // // //               src={pet.img}
// // // // // // // //               alt={pet.name}
// // // // // // // //               onError={(e) => {
// // // // // // // //                 e.target.src =
// // // // // // // //                   pet.type === "dog" ? fallbackDog : fallbackCat;
// // // // // // // //               }}
// // // // // // // //             />
// // // // // // // //             <h3>{pet.name}</h3>
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </div>

// // // // // // // //       {/* ===== ADDED PETS ===== */}
// // // // // // // //       <h2 className="section-title">Newly Added Pets 🆕</h2>

// // // // // // // //       {loading && <p style={{ marginLeft: 20 }}>Loading...</p>}

// // // // // // // //       <div className="card-grid">
// // // // // // // //         {addedPets.map((pet) => (
// // // // // // // //           <div
// // // // // // // //             className={`card ${pet.sold ? "sold" : ""}`}
// // // // // // // //             key={pet.id}
// // // // // // // //           >
// // // // // // // //             <img
// // // // // // // //               src={pet.image}
// // // // // // // //               alt={pet.name}
// // // // // // // //               onError={(e) => {
// // // // // // // //                 e.target.src = fallbackDog;
// // // // // // // //               }}
// // // // // // // //             />

// // // // // // // //             <h3>{pet.name}</h3>
// // // // // // // //             <p className="price">₹{pet.price}</p>

// // // // // // // //             {!pet.sold ? (
// // // // // // // //               <button onClick={() => setSelectedPet(pet)}>
// // // // // // // //                 Buy Pet 💳
// // // // // // // //               </button>
// // // // // // // //             ) : (
// // // // // // // //               <span className="sold-badge">SOLD</span>
// // // // // // // //             )}

// // // // // // // //             <button
// // // // // // // //               className="remove-btn"
// // // // // // // //               onClick={() => removePet(pet.id)}
// // // // // // // //             >
// // // // // // // //               Remove ❌
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </div>

// // // // // // // //       {/* ===== PAYMENT MODAL ===== */}
// // // // // // // //       {selectedPet && (
// // // // // // // //         <div className="overlay">
// // // // // // // //           <div className="payment-box">
// // // // // // // //             <h2>💳 Buy {selectedPet.name}</h2>
// // // // // // // //             <h1>₹{selectedPet.price}</h1>

// // // // // // // //             <div className="pay-options">
// // // // // // // //               <div>💳 Card</div>
// // // // // // // //               <div>📱 UPI</div>
// // // // // // // //               <div>👛 Wallet</div>
// // // // // // // //             </div>

// // // // // // // //             <button className="pay-btn" onClick={completePayment}>
// // // // // // // //               Pay Now
// // // // // // // //             </button>

// // // // // // // //             <button
// // // // // // // //               className="cancel-btn"
// // // // // // // //               onClick={() => setSelectedPet(null)}
// // // // // // // //             >
// // // // // // // //               Cancel
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import {
// // // // // // //   collection,
// // // // // // //   getDocs,
// // // // // // //   query,
// // // // // // //   orderBy,
// // // // // // //   updateDoc,
// // // // // // //   deleteDoc,
// // // // // // //   doc,
// // // // // // //   where, // 🆕 added
// // // // // // // } from "firebase/firestore";
// // // // // // // import { db } from "../firebase";
// // // // // // // import "./Pets.css";

// // // // // // // /* ================= FALLBACK IMAGES ================= */

// // // // // // // const fallbackDog =
// // // // // // //   "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=60";

// // // // // // // const fallbackCat =
// // // // // // //   "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=60";

// // // // // // // /* ================= STATIC IMAGES ================= */

// // // // // // // const dogImages = [
// // // // // // //   "https://images.unsplash.com/photo-1517849845537-4d257902454a",
// // // // // // //   "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
// // // // // // //   "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
// // // // // // //   "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6",
// // // // // // //   "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
// // // // // // //   "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
// // // // // // //   "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
// // // // // // // ];

// // // // // // // const catImages = [
// // // // // // //   "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
// // // // // // //   "https://images.unsplash.com/photo-1529778873920-4da4926a72c2",
// // // // // // //   "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
// // // // // // //   "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
// // // // // // //   "https://images.unsplash.com/photo-1534361960057-19889db9621e",
// // // // // // // ];

// // // // // // // /* ================= STATIC PETS ================= */

// // // // // // // const staticPets = [
// // // // // // //   ...dogImages.map((img, i) => ({
// // // // // // //     name: `Dog ${i + 1}`,
// // // // // // //     img,
// // // // // // //     type: "dog",
// // // // // // //   })),
// // // // // // //   ...catImages.map((img, i) => ({
// // // // // // //     name: `Cat ${i + 1}`,
// // // // // // //     img,
// // // // // // //     type: "cat",
// // // // // // //   })),
// // // // // // // ];

// // // // // // // /* ================= COMPONENT ================= */

// // // // // // // export default function Pets() {
// // // // // // //   const [addedPets, setAddedPets] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [selectedPet, setSelectedPet] = useState(null);

// // // // // // //   /* 🔄 FETCH ONLY APPROVED PETS */
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchPets = async () => {
// // // // // // //       const q = query(
// // // // // // //         collection(db, "pets"),
// // // // // // //         where("approved", "==", true), // ✅ IMPORTANT
// // // // // // //         orderBy("createdAt", "desc")
// // // // // // //       );

// // // // // // //       const snap = await getDocs(q);

// // // // // // //       const list = snap.docs.map((d) => ({
// // // // // // //         id: d.id,
// // // // // // //         ...d.data(),
// // // // // // //       }));

// // // // // // //       setAddedPets(list);
// // // // // // //       setLoading(false);
// // // // // // //     };

// // // // // // //     fetchPets();
// // // // // // //   }, []);

// // // // // // //   /* 💳 FAKE PAYMENT */
// // // // // // //   const completePayment = async () => {
// // // // // // //     await updateDoc(doc(db, "pets", selectedPet.id), {
// // // // // // //       sold: true,
// // // // // // //     });

// // // // // // //     setAddedPets((prev) =>
// // // // // // //       prev.map((p) =>
// // // // // // //         p.id === selectedPet.id ? { ...p, sold: true } : p
// // // // // // //       )
// // // // // // //     );

// // // // // // //     setSelectedPet(null);
// // // // // // //     alert("🎉 Payment Successful! Pet Purchased.");
// // // // // // //   };

// // // // // // //   /* ❌ REMOVE PET */
// // // // // // //   const removePet = async (id) => {
// // // // // // //     if (!window.confirm("Remove this pet?")) return;

// // // // // // //     await deleteDoc(doc(db, "pets", id));
// // // // // // //     setAddedPets((prev) => prev.filter((p) => p.id !== id));
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <>
// // // // // // //       {/* ===== STATIC PETS ===== */}
// // // // // // //       <h2 className="section-title">Available Pets 🐾</h2>

// // // // // // //       <div className="card-grid">
// // // // // // //         {staticPets.map((pet, i) => (
// // // // // // //           <div className="card" key={i}>
// // // // // // //             <img
// // // // // // //               src={pet.img}
// // // // // // //               alt={pet.name}
// // // // // // //               onError={(e) => {
// // // // // // //                 e.target.src =
// // // // // // //                   pet.type === "dog" ? fallbackDog : fallbackCat;
// // // // // // //               }}
// // // // // // //             />
// // // // // // //             <h3>{pet.name}</h3>
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* ===== ADDED PETS ===== */}
// // // // // // //       <h2 className="section-title">Newly Added Pets 🆕</h2>

// // // // // // //       {loading && <p style={{ marginLeft: 20 }}>Loading...</p>}

// // // // // // //       <div className="card-grid">
// // // // // // //         {addedPets.map((pet) => (
// // // // // // //           <div
// // // // // // //             className={`card ${pet.sold ? "sold" : ""}`}
// // // // // // //             key={pet.id}
// // // // // // //           >
// // // // // // //             <img
// // // // // // //               src={pet.image}
// // // // // // //               alt={pet.name}
// // // // // // //               onError={(e) => {
// // // // // // //                 e.target.src = fallbackDog;
// // // // // // //               }}
// // // // // // //             />

// // // // // // //             <h3>{pet.name}</h3>
// // // // // // //             <p className="price">₹{pet.price}</p>

// // // // // // //             {!pet.sold ? (
// // // // // // //               <button onClick={() => setSelectedPet(pet)}>
// // // // // // //                 Buy Pet 💳
// // // // // // //               </button>
// // // // // // //             ) : (
// // // // // // //               <span className="sold-badge">SOLD</span>
// // // // // // //             )}

// // // // // // //             <button
// // // // // // //               className="remove-btn"
// // // // // // //               onClick={() => removePet(pet.id)}
// // // // // // //             >
// // // // // // //               Remove ❌
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* ===== PAYMENT MODAL ===== */}
// // // // // // //       {selectedPet && (
// // // // // // //         <div className="overlay">
// // // // // // //           <div className="payment-box">
// // // // // // //             <h2>💳 Buy {selectedPet.name}</h2>
// // // // // // //             <h1>₹{selectedPet.price}</h1>

// // // // // // //             <div className="pay-options">
// // // // // // //               <div>💳 Card</div>
// // // // // // //               <div>📱 UPI</div>
// // // // // // //               <div>👛 Wallet</div>
// // // // // // //             </div>

// // // // // // //             <button className="pay-btn" onClick={completePayment}>
// // // // // // //               Pay Now
// // // // // // //             </button>

// // // // // // //             <button
// // // // // // //               className="cancel-btn"
// // // // // // //               onClick={() => setSelectedPet(null)}
// // // // // // //             >
// // // // // // //               Cancel
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </>
// // // // // // //   );
// // // // // // // }

// import { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import "./Pets.css";

// /* ================= FALLBACK IMAGES ================= */

// const fallbackDog =
//   "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=60";

// const fallbackCat =
//   "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=60";

// /* ================= STATIC IMAGES ================= */

// const dogImages = [
//   "https://images.unsplash.com/photo-1517849845537-4d257902454a",
//   "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
//   "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
//   "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6",
//   "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
//   "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
//   "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
// ];

// const catImages = [
//   "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
//   "https://images.unsplash.com/photo-1529778873920-4da4926a72c2",
//   "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
//   "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
//   "https://images.unsplash.com/photo-1534361960057-19889db9621e",
// ];

// /* ================= STATIC PETS ================= */

// const staticPets = [
//   ...dogImages.map((img, i) => ({
//     name: `Dog ${i + 1}`,
//     img,
//     type: "dog",
//   })),
//   ...catImages.map((img, i) => ({
//     name: `Cat ${i + 1}`,
//     img,
//     type: "cat",
//   })),
// ];

// /* ================= COMPONENT ================= */

// export default function Pets() {
//   const [addedPets, setAddedPets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedPet, setSelectedPet] = useState(null);

//   /* 🔄 FETCH PETS (NO INDEX REQUIRED) */
//   useEffect(() => {
//     const fetchPets = async () => {
//       const q = query(
//         collection(db, "pets"),
//         orderBy("createdAt", "desc")
//       );

//       const snap = await getDocs(q);

//       const list = snap.docs
//         .map((d) => ({
//           id: d.id,
//           ...d.data(),
//         }))
//         // ✅ SHOW OLD PETS + NEW APPROVED PETS
//         .filter(
//           (pet) =>
//             pet.approved === true || pet.approved === undefined
//         );

//       setAddedPets(list);
//       setLoading(false);
//     };

//     fetchPets();
//   }, []);

//   /* 💳 FAKE PAYMENT */
//   const completePayment = async () => {
//     await updateDoc(doc(db, "pets", selectedPet.id), {
//       sold: true,
//     });

//     setAddedPets((prev) =>
//       prev.map((p) =>
//         p.id === selectedPet.id ? { ...p, sold: true } : p
//       )
//     );

//     setSelectedPet(null);
//     alert("🎉 Payment Successful! Pet Purchased.");
//   };

//   /* ❌ REMOVE PET */
//   const removePet = async (id) => {
//     if (!window.confirm("Remove this pet?")) return;

//     await deleteDoc(doc(db, "pets", id));
//     setAddedPets((prev) => prev.filter((p) => p.id !== id));
//   };

//   return (
//     <>
//       {/* ===== STATIC PETS ===== */}
//       <h2 className="section-title">Available Pets 🐾</h2>

//       <div className="card-grid">
//         {staticPets.map((pet, i) => (
//           <div className="card" key={i}>
//             <img
//               src={pet.img}
//               alt={pet.name}
//               onError={(e) => {
//                 e.target.src =
//                   pet.type === "dog" ? fallbackDog : fallbackCat;
//               }}
//             />
//             <h3>{pet.name}</h3>
//           </div>
//         ))}
//       </div>

//       {/* ===== ADDED PETS (CLOUDINARY) ===== */}
//       <h2 className="section-title">Newly Added Pets 🆕</h2>

//       {loading && <p style={{ marginLeft: 20 }}>Loading...</p>}

//       <div className="card-grid">
//         {addedPets.map((pet) => (
//           <div
//             className={`card ${pet.sold ? "sold" : ""}`}
//             key={pet.id}
//           >
//             <img
//               src={pet.image}
//               alt={pet.name}
//               onError={(e) => {
//                 e.target.src = fallbackDog;
//               }}
//             />

//             <h3>{pet.name}</h3>
//             <p className="price">₹{pet.price}</p>

//             {!pet.sold ? (
//               <button onClick={() => setSelectedPet(pet)}>
//                 Buy Pet 💳
//               </button>
//             ) : (
//               <span className="sold-badge">SOLD</span>
//             )}

//             <button
//               className="remove-btn"
//               onClick={() => removePet(pet.id)}
//             >
//               Remove ❌
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ===== PAYMENT MODAL ===== */}
//       {selectedPet && (
//         <div className="overlay">
//           <div className="payment-box">
//             <h2>💳 Buy {selectedPet.name}</h2>
//             <h1>₹{selectedPet.price}</h1>

//             <div className="pay-options">
//               <div>💳 Card</div>
//               <div>📱 UPI</div>
//               <div>👛 Wallet</div>
//             </div>

//             <button className="pay-btn" onClick={completePayment}>
//               Pay Now
//             </button>

//             <button
//               className="cancel-btn"
//               onClick={() => setSelectedPet(null)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import "./Pets.css";

/* ================= FALLBACK ================= */

const fallbackDog =
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=60";

const fallbackCat =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=60";

/* ================= STATIC IMAGES ================= */

const dogImages = [
  "https://images.unsplash.com/photo-1517849845537-4d257902454a",
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
  "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
];

const catImages = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
  "https://images.unsplash.com/photo-1529778873920-4da4926a72c2",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
  "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
  "https://images.unsplash.com/photo-1534361960057-19889db9621e",
];

const staticPets = [
  ...dogImages.map((img, i) => ({ name: `Dog ${i + 1}`, img, type: "dog" })),
  ...catImages.map((img, i) => ({ name: `Cat ${i + 1}`, img, type: "cat" })),
];

export default function Pets() {
  const [addedPets, setAddedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);

  /* PAYMENT STATES */
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("upi");
  const [inputValue, setInputValue] = useState("");
  const [address, setAddress] = useState("");
  const [receipt, setReceipt] = useState(null);

  /* FETCH */
  useEffect(() => {
    const fetchPets = async () => {
      const q = query(collection(db, "pets"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);

      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setAddedPets(list);
      setLoading(false);
    };

    fetchPets();
  }, []);

  /* DELIVERY DATE */
  const getDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + Math.floor(Math.random() * 5) + 3);
    return d.toDateString();
  };

  /* STEP 1 */
  const handlePayment = () => {
    if (!inputValue) {
      alert("Enter payment details");
      return;
    }
    setStep(2);
  };

  /* STEP 2 */
  const confirmOrder = async () => {
    if (!address) {
      alert("Enter address");
      return;
    }

    try {
      const ref = doc(db, "pets", selectedPet.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        await updateDoc(ref, { sold: true });
      }

      setAddedPets((prev) =>
        prev.map((p) =>
          p.id === selectedPet.id ? { ...p, sold: true } : p
        )
      );

      setReceipt({
        id: "ORD" + Math.floor(Math.random() * 100000),
        name: selectedPet.name,
        price: selectedPet.price,
        delivery: getDeliveryDate(),
        address,
      });

      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Payment processed (demo mode)");
      setStep(3);
    }
  };

  /* DOWNLOAD RECEIPT */
  const downloadReceipt = () => {
    const text = `
PET STORE RECEIPT
-----------------------
Order ID: ${receipt.id}
Product: ${receipt.name}
Price: ₹${receipt.price}
Delivery: ${receipt.delivery}

Address:
${receipt.address}

Status: PAID
`;

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "receipt.txt";
    link.click();
  };

  /* REMOVE */
  const removePet = async (id) => {
    await deleteDoc(doc(db, "pets", id));
    setAddedPets((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <h2 className="section-title">Available Pets 🐾</h2>

      <div className="card-grid">
        {staticPets.map((pet, i) => (
          <div className="card" key={i}>
            <img
              src={pet.img}
              alt={pet.name}
              onError={(e) =>
                (e.target.src =
                  pet.type === "dog" ? fallbackDog : fallbackCat)
              }
            />
            <h3>{pet.name}</h3>
          </div>
        ))}
      </div>

      <h2 className="section-title">Newly Added Pets 🆕</h2>

      {loading && <p>Loading...</p>}

      <div className="card-grid">
        {addedPets.map((pet) => (
          <div className={`card ${pet.sold ? "sold" : ""}`} key={pet.id}>
            <img src={pet.image} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p className="price">₹{pet.price}</p>

            {!pet.sold ? (
              <button
                onClick={() => {
                  setSelectedPet(pet);
                  setStep(1);
                  setInputValue("");
                }}
              >
                Buy Pet 💳
              </button>
            ) : (
              <span className="sold-badge">SOLD</span>
            )}

            <button className="remove-btn" onClick={() => removePet(pet.id)}>
              Remove ❌
            </button>
          </div>
        ))}
      </div>

      {selectedPet && (
        <div className="overlay">
          <div className="payment-box">

            {step === 1 && (
              <>
                <h2>💳 Payment</h2>
                <h3>₹{selectedPet.price}</h3>

                <div className="pay-options">
                  <button onClick={() => setMethod("upi")}>UPI</button>
                  <button onClick={() => setMethod("card")}>Card</button>
                  <button onClick={() => setMethod("bank")}>Bank</button>
                </div>

                <input
                  placeholder={`Enter ${method} details`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <button className="pay-btn" onClick={handlePayment}>
                  Pay Now
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2>🏠 Address</h2>
                <textarea
                  placeholder="Enter full address"
                  onChange={(e) => setAddress(e.target.value)}
                />

                <button className="pay-btn" onClick={confirmOrder}>
                  Confirm Order
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <h2>✅ Payment Successful</h2>
                <p>Delivery: {receipt.delivery}</p>

                <button className="pay-btn" onClick={downloadReceipt}>
                  Download Receipt
                </button>
              </>
            )}

            <button className="cancel-btn" onClick={() => setSelectedPet(null)}>
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}