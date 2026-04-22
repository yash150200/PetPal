
// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isPremium, setIsPremium] = useState(false);

//   useEffect(() => {
//     const premium = localStorage.getItem("petpal_premium") === "true";
//     setIsPremium(premium);
//   }, []);

//   const activatePremium = () => {
//     localStorage.setItem("petpal_premium", "true");
//     setIsPremium(true);
//   };

//   return (
//     <ThemeContext.Provider value={{ isPremium, activatePremium }}>
//       <div className={isPremium ? "theme-premium" : "theme-free"}>
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(
    localStorage.getItem("petpal_premium") === "true"
  );

  // 🔁 Sync UI + localStorage
  useEffect(() => {
    if (isPremium) {
      localStorage.setItem("petpal_premium", "true");
      document.body.classList.add("theme-premium");
      document.body.classList.remove("theme-free");
    } else {
      localStorage.removeItem("petpal_premium");
      document.body.classList.add("theme-free");
      document.body.classList.remove("theme-premium");
    }
  }, [isPremium]);

  // ✅ Subscribe
  const activatePremium = () => {
    setIsPremium(true);
  };

  // ❌ Unsubscribe (THIS WAS MISSING)
  const deactivatePremium = () => {
    setIsPremium(false);
  };

  return (
    // <ThemeContext.Provider
    //   value={{
    //     isPremium,
    //     activatePremium,
    //     deactivatePremium
    //   }}
    // >
    //   {children}
    // </ThemeContext.Provider>
     <ThemeContext.Provider
    value={{
      isPremium,
      activatePremium,
      deactivatePremium,
      colors: isPremium
        ? {
            bg: "#020617",
            card: "#020617",
            text: "rgb(185,178,134)",
            primary: "#000",
          }
        : {
            bg: "#ffffff",
            card: "#f9fafb",
            text: "#111827",
            primary: "#ff914d",
          },
    }}
  >
    {children}
  </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

 