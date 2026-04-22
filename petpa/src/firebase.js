// // src/firebase.js

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBw9N3HsvlSpZThmGbKvc0mW_Mgbd9frc0",
//   authDomain: "petpa-96809.firebaseapp.com",
//   projectId: "petpa-96809",
//   storageBucket: "petpa-96809.firebasestorage.app",
//   messagingSenderId: "253872659156",
//   appId: "1:253872659156:web:4684a273543cd8ea4c3941",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // ✅ EXPORT THESE (VERY IMPORTANT)
// export const auth = getAuth(app);
// export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBw9N3HsvlSpZThmGbKvc0mW_Mgbd9frc0",
  authDomain: "petpa-96809.firebaseapp.com",
  projectId: "petpa-96809",
  storageBucket: "petpa-96809.firebasestorage.app",
  messagingSenderId: "253872659156",
  appId: "1:253872659156:web:4684a273543cd8ea4c3941",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence); // ✅ IMPORTANT

export const db = getFirestore(app);
