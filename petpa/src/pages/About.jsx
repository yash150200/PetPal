
import { useEffect, useState } from "react";

import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";

const sliderImages = [slider1, slider2, slider3];

const teamMembers = [
  {
    name: "Oliver Smith",
    role: "Founder & CEO",
    img: "https://fastly.picsum.photos/id/375/200/200.jpg?hmac=A1gXQqzqNEhroMUd97Taqu13iN0muhMXBAeJOzBTASI",
  },
  {
    name: "Emily Johnson",
    role: "Veterinary Expert",
    img: "https://picsum.photos/seed/team2/200",
  },
  {
    name: "William Brown",
    role: "Grooming Specialist",
    img: "https://picsum.photos/seed/team3/200",
  },
  {
    name: "Sophia Davis",
    role: "Customer Support",
    img: "https://picsum.photos/seed/team4/200",
  },
];

export default function About() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: "#f8fafc" }}>
      {/* SLIDER */}
      <div style={{ position: "relative" }}>
        <img
          src={sliderImages[index]}
          alt="About PetPal"
          style={{ width: "100%", height: 400, objectFit: "cover" }}
        />
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            background: "rgba(0,0,0,0.6)",
            padding: "12px 20px",
            borderRadius: 10,
          }}
        >
          About PetPal 🐾
        </h1>
      </div>

      {/* CONTENT */}
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Who We Are</h2>
        <p>
          PetPal is a modern pet-care platform providing trusted services,
          quality products, and premium support for pet lovers.
        </p>
      </div>

      {/* TEAM */}
      <div style={{ padding: 40 }}>
        <h2 style={{ textAlign: "center" }}>Our Team</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 25,
            marginTop: 30,
          }}
        >
          {teamMembers.map((member, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 16,
                textAlign: "center",
                cursor: "pointer",
                transform: hovered === i ? "scale(1.12)" : "scale(1)",
                transition: "all 0.35s ease",
                boxShadow:
                  hovered === i
                    ? "0 20px 40px rgba(0,0,0,0.25)"
                    : "0 8px 20px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={member.img}
                alt={member.name}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  marginBottom: 10,
                }}
              />
              <h3>{member.name}</h3>
              <p style={{ color: "#6b7280" }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
