import React, { useEffect, useState } from "react";


const SplotchEffect = () => {
  const [splotches, setSplotches] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll detected");
      const scrollY = window.scrollY;

      if (scrollY % 100 === 0) {
        const newSplotch = {
          id: splotches.length,
          size: Math.random() * 50 + 50,
          top: Math.random() * window.innerHeight,
          left: Math.random() * window.innerWidth,
        };
        setSplotches((prev) => [...prev, newSplotch]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [splotches]);

  // Debug: Add a default splotch
  useEffect(() => {
    setSplotches([
      {
        id: 0,
        size: 100,
        top: 100,
        left: 100,
      },
    ]);
  }, []);

  return (
    <div className="splotch-container">
        <div className="splotch" style={{ width: "100px", height: "100px", top: "100px", left: "100px" }}></div>

      {splotches.map((splotch) => (
        <div
          key={splotch.id}
          className="splotch"
          style={{
            width: `${splotch.size}px`,
            height: `${splotch.size}px`,
            top: `${splotch.top}px`,
            left: `${splotch.left}px`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default SplotchEffect;
