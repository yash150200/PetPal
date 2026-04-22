
// import { useState } from "react";
// import axios from "axios";
// import "./PetAI.css";

// const OPENROUTER_API_KEY =
//   "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";

// export default function PetAI() {
//   const isPremium = localStorage.getItem("petpal_premium") === "true";

//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       text: "🐾 Hi! I’m PetPal AI. Ask me anything about pet care!"
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* =========================
//      🔒 LOCKED VIEW (FREE USER)
//      ========================= */
//   if (!isPremium) {
//     return (
//       <div className="ai-locked">
//         <div className="lock-card glass-card">
//           <h1>🔒 PetPal AI Locked</h1>
//           <p>
//             This feature is available only for
//             <b> Premium members</b>.
//           </p>

//           <ul>
//             <li>🧠 Smart AI pet care advice</li>
//             <li>🐶 Food, health & grooming tips</li>
//             <li>⚡ Instant expert answers</li>
//           </ul>

//           <a href="/subscribe" className="upgrade-btn">
//             Upgrade to Premium 🚀
//           </a>
//         </div>
//       </div>
//     );
//   }

//   /* =========================
//      🤖 ASK AI (PREMIUM)
//      ========================= */
//   const askAI = async () => {
//     if (!input.trim()) return;

//     const userText = input;

//     setMessages((prev) => [...prev, { role: "user", text: userText }]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//           model: "gryphe/mythomax-l2-13b",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are PetPal AI, a friendly pet care assistant. Answer clearly, simply, and safely."
//             },
//             { role: "user", content: userText }
//           ],
//           max_tokens: 200
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//             "Content-Type": "application/json",
//             "HTTP-Referer": window.location.origin,
//             "X-Title": "PetPal AI"
//           }
//         }
//       );

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           text: response.data.choices[0].message.content
//         }
//       ]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           text: "⚠️ AI is temporarily unavailable. Try again."
//         }
//       ]);
//     }

//     setLoading(false);
//   };

//   /* =========================
//      ✅ PREMIUM GLASS UI
//      ========================= */
//   return (
//     <div className="ai-page premium">
//       <div className="ai-card glass-card">
//         <div className="ai-header">
//           🤖 PetPal AI <span className="premium-badge">PREMIUM</span>
//         </div>

//         <div className="ai-chat">
//           {messages.map((msg, i) => (
//             <div key={i} className={`msg ${msg.role}`}>
//               {msg.text}
//             </div>
//           ))}

//           {loading && (
//             <div className="msg assistant typing">
//               Typing<span>.</span><span>.</span><span>.</span>
//             </div>
//           )}
//         </div>

//         <div className="ai-input">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask anything about your pet..."
//             onKeyDown={(e) => e.key === "Enter" && askAI()}
//           />
//           <button onClick={askAI}>➤</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import "./PetAI.css";

// 🔁 Replace with your deployed backend URL
const API_URL = "https://petpal-4-vwvb.onrender.com/api/ai";

export default function PetAI() {
  const isPremium = localStorage.getItem("petpal_premium") === "true";

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "🐾 Hi! I’m PetPal AI. Ask me anything about pet care!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     🔒 LOCKED VIEW (FREE USER)
     ========================= */
  if (!isPremium) {
    return (
      <div className="ai-locked">
        <div className="lock-card glass-card">
          <h1>🔒 PetPal AI Locked</h1>
          <p>
            This feature is available only for
            <b> Premium members</b>.
          </p>

          <ul>
            <li>🧠 Smart AI pet care advice</li>
            <li>🐶 Food, health & grooming tips</li>
            <li>⚡ Instant expert answers</li>
          </ul>

          <a href="/subscribe" className="upgrade-btn">
            Upgrade to Premium 🚀
          </a>
        </div>
      </div>
    );
  }

  /* =========================
     🤖 ASK AI (SECURE BACKEND)
     ========================= */
  const askAI = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        message: userText
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.data.choices?.[0]?.message?.content || "No response"
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ AI is temporarily unavailable. Try again."
        }
      ]);
    }

    setLoading(false);
  };

  /* =========================
     ✅ PREMIUM UI
     ========================= */
  return (
    <div className="ai-page premium">
      <div className="ai-card glass-card">
        <div className="ai-header">
          🤖 PetPal AI <span className="premium-badge">PREMIUM</span>
        </div>

        <div className="ai-chat">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="msg assistant typing">
              Typing<span>.</span><span>.</span><span>.</span>
            </div>
          )}
        </div>

        <div className="ai-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your pet..."
            onKeyDown={(e) => e.key === "Enter" && askAI()}
          />
          <button onClick={askAI}>➤</button>
        </div>
      </div>
    </div>
  );
}
