
// import { useParams, useNavigate } from "react-router-dom";
// import { foodItems } from "../data/food";
// import { medicineItems } from "../data/medicines";
// import { groomingItems } from "../data/grooming";
// import { accessoryItems } from "../data/accessories";
// import { useCart } from "../context/CartContext";

// export default function ServiceItems() {
//   const { type } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   let items = [];

//   if (type === "food") items = foodItems;
//   else if (type === "medicines") items = medicineItems;
//   else if (type === "grooming") items = groomingItems;
//   else if (type === "accessories") items = accessoryItems;

//   if (!items || items.length === 0) {
//     return (
//       <div style={{ padding: 40 }}>
//         <h2>No products found</h2>
//         <button onClick={() => navigate("/services")}>
//           Back to Services
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.page}>
//       <div style={styles.grid}>
//         {items.map((item) => (
//           <div
//             className="product-card"
//             key={item.id}
//             style={styles.card}
//           >
//             {/* IMAGE */}
//             <div style={{ overflow: "hidden" }}>
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="product-img"
//                 style={styles.image}
//               />
//             </div>

//             {/* DETAILS */}
//             <h3 style={styles.name}>{item.name}</h3>
//             <p style={styles.price}>₹{item.price}</p>

//             {/* BUTTONS */}
//             <div style={styles.btnGroup}>
//               <button
//                 style={styles.cartBtn}
//                 onClick={() => addToCart(item)}
//               >
//                 Add to Cart
//               </button>

//               <button
//                 style={styles.buyBtn}
//                 onClick={() => {
//                   addToCart(item);
//                   navigate("/cart");
//                 }}
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* HOVER EFFECT */}
//       <style>
//         {`
//           .product-card:hover {
//             transform: translateY(-8px);
//             box-shadow: 0 18px 35px rgba(0, 0, 0, 0.25);
//           }

//           .product-card:hover .product-img {
//             transform: scale(1.12);
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const styles = {
//   page: {
//     width: "100%",
//     padding: "30px 40px"
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//     gap: 24
//   },

//   card: {
//     background: "#ffffff",
//     borderRadius: 16,
//     padding: 16,
//     transition: "all 0.35s ease",
//     display: "flex",
//     flexDirection: "column"
//   },

//   image: {
//     width: "100%",
//     height: 200,
//     objectFit: "cover",
//     borderRadius: 12,
//     transition: "transform 0.4s ease"
//   },

//   name: {
//     marginTop: 12,
//     marginBottom: 6
//   },

//   price: {
//     fontWeight: "bold",
//     marginBottom: 12
//   },

//   btnGroup: {
//     marginTop: "auto",
//     display: "flex",
//     gap: 10
//   },

//   cartBtn: {
//     flex: 1,
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #22c55e",
//     background: "#ffffff",
//     color: "#22c55e",
//     cursor: "pointer",
//     fontWeight: 600
//   },

//   buyBtn: {
//     flex: 1,
//     padding: 10,
//     borderRadius: 8,
//     border: "none",
//     background: "#22c55e",
//     color: "#ffffff",
//     cursor: "pointer",
//     fontWeight: 600
//   }
// };


import { useParams, useNavigate } from "react-router-dom";
import { foodItems } from "../data/food";
import { medicineItems } from "../data/medicines";
import { groomingItems } from "../data/grooming";
import { accessoryItems } from "../data/accessories";
import { useCart } from "../context/CartContext";
import { useMemo } from "react";

export default function ServiceItems() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const items = useMemo(() => {
    if (type === "food") return foodItems;
    if (type === "medicines") return medicineItems;
    if (type === "grooming") return groomingItems;
    if (type === "accessories") return accessoryItems;
    return [];
  }, [type]);

  if (!items || items.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h2>No products found</h2>
        <button onClick={() => navigate("/services")}>
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.grid}>
        {items.map((item) => (
          <div
            className="product-card"
            key={item.id}
            style={styles.card}
          >
            {/* IMAGE */}
            <div style={styles.imgWrap}>
              <img
                src={item.image}
                alt={item.name}
                className="product-img"
                style={styles.image}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* DETAILS */}
            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.price}>₹{item.price}</p>

            {/* BUTTONS */}
            <div style={styles.btnGroup}>
              <button
                style={styles.cartBtn}
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>

              <button
                style={styles.buyBtn}
                onClick={() => {
                  addToCart(item);
                  navigate("/cart");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ STATIC CSS (NO RE-CREATION PER RENDER) */}
      <style>
        {`
          .product-card {
            will-change: transform;
            transform: translateZ(0);
          }

          .product-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 14px 28px rgba(0,0,0,0.18);
          }

          .product-card:hover .product-img {
            transform: scale(1.08);
          }

          .product-img {
            backface-visibility: hidden;
          }
        `}
      </style>
    </div>
  );
}

/* ================= OPTIMIZED STYLES ================= */

const styles = {
  page: {
    width: "100%",
    padding: "30px 40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 260px))",
    gap: 28
  },

  card: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },

  imgWrap: {
    overflow: "hidden",
    borderRadius: 12
  },

  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    transition: "transform 0.35s ease",
    display: "block"
  },

  name: {
    marginTop: 12,
    marginBottom: 6
  },

  price: {
    fontWeight: "bold",
    marginBottom: 12
  },

  btnGroup: {
    marginTop: "auto",
    display: "flex",
    gap: 10
  },

  cartBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #22c55e",
    background: "#ffffff",
    color: "#22c55e",
    cursor: "pointer",
    fontWeight: 600
  },

  buyBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#22c55e",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: 600
  }
};