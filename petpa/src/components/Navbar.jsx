

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🌟 GLOBAL PREMIUM THEME
  const { isPremium } = useTheme();

  // 🔥 Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // 🔐 ADMIN CHECK
  const isAdmin = user?.email === "admin1@petpal.com";

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  /* ================= HOVER EFFECT ================= */

  const hoverIn = (e) => {
    e.currentTarget.style.transform = "scale(1.18)";
    e.currentTarget.style.textShadow = `
      0 0 6px #fff,
      0 0 14px gold,
      0 0 28px rgba(255,215,0,1),
      0 0 55px rgba(255,190,0,0.95)
    `;
  };

  const hoverOut = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.textShadow = "none";
  };

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <h2 style={styles.logo}>
        🐾 PetPal {isPremium && <span style={styles.badge}>PREMIUM</span>}
      </h2>

      {/* LINKS */}
      <div style={styles.links}>
        {[
          { to: "/", label: "Home" },
          { to: "/pets", label: "Pets" },
          { to: "/services", label: "Services" },
          { to: "/subscribe", label: "Subscribe" },
          { to: "/about", label: "About" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            {item.label}
          </Link>
        ))}

        {/* 🤖 AI — PREMIUM ONLY */}
        {isPremium && (
          <Link
            to="/pet-ai"
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            🤖 AI
          </Link>
        )}

        {/* 🔓 LOGGED-IN USER (USER + ADMIN) */}
        {user && (
          <Link
            to="/admin/add-pet"
            style={styles.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Add Pet
          </Link>
        )}

        {/* 👑 ADMIN ONLY */}
        {user && isAdmin && (
          <>
            <Link
              to="/admin"
              style={styles.link}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              Admin
            </Link>

            <Link
              to="/admin/users"
              style={styles.link}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              Users
            </Link>
          </>
        )}

        {/* AUTH */}
        {!user && (
          <Link
            to="/login"
            style={styles.loginBtn}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Login
          </Link>
        )}

        {user && (
          <button
            onClick={logout}
            style={styles.logoutBtn}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

/* ================= STYLES ================= */

const baseHover = {
  transition: "0.35s cubic-bezier(.22,1.61,.36,1)",
  display: "inline-block",
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 30px",
    background: "var(--primary)",
  },

  logo: {
    color: "#fff",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  badge: {
    background: "linear-gradient(135deg,#fff1a8,#ffd700,#ffae00)",
    color: "#000",
    padding: "3px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "bold",
    boxShadow:
      "0 0 12px rgba(255,215,0,0.9), 0 0 28px rgba(255,200,0,0.7)",
  },

  links: {
    display: "flex",
    gap: 18,
    alignItems: "center",
  },

  link: {
    ...baseHover,
    color: "#fff",
    textDecoration: "none",
    fontWeight: 600,
    padding: "4px 6px",
  },

  loginBtn: {
    ...baseHover,
    background: "linear-gradient(135deg,#2563eb,#1e40af)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: "bold",
  },

  logoutBtn: {
    ...baseHover,
    background: "linear-gradient(135deg,#dc2626,#991b1b)",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },
};
