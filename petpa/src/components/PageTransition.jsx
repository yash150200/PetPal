import { useEffect, useState } from "react";
import "./PageTransition.css";

export default function PageTransition({ children }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(false);

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 600); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="transition-wrapper">
      {!showContent && (
        <div className="mini-loader">
          <div className="circle"></div>
        </div>
      )}

      <div className={`page-content ${showContent ? "show" : ""}`}>
        {children}
      </div>
    </div>
  );
}
