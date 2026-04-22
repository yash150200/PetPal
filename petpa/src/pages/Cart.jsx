
// import { useNavigate } from "react-router-dom";

// function Cart() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h2>Your Cart</h2>

//       {/* your existing cart items here */}

//       <button
//         style={styles.buyBtn}
//         onClick={() => navigate("/checkout")}
//       >
//         Buy Now
//       </button>
//     </div>
//   );
// }

// const styles = {
//   buyBtn: {
//     padding: 12,
//     background: "#22c55e",
//     color: "#fff",
//     border: "none",
//     borderRadius: 8,
//     fontSize: 16,
//     cursor: "pointer",
//   },
// };

// export default Cart;
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const items = [
    { name: "Dog Food Pack", price: 199 },
    { name: "Pet Vitamins", price: 100 },
  ];

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div style={styles.container}>
      <h2>🛒 Your Cart</h2>

      {items.map((item, i) => (
        <div key={i} style={styles.item}>
          <span>{item.name}</span>
          <span>₹{item.price}</span>
        </div>
      ))}

      <hr />

      <div style={styles.total}>
        <strong>Total:</strong>
        <strong>₹{total}</strong>
      </div>

      <button
        style={styles.buyBtn}
        onClick={() => navigate("/checkout", { state: { total } })}
      >
        Proceed to Checkout →
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 20,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 18,
    marginTop: 10,
  },
  buyBtn: {
    width: "100%",
    marginTop: 20,
    padding: 12,
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
  },
};
