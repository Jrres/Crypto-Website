import React, { useState, useEffect } from "react";


const RotateImage = () => {
  const [rotate, setRotate] = useState({ rotateX: 0, rotateY: 0, rotateZ: 0 });

  // This function will update the rotation angles every 0.1 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotate((prevRotate) => ({
        rotateX: prevRotate.rotateX + 5, // Rotate by 5 degrees on X axis
        rotateY: prevRotate.rotateY + 5, // Rotate by 5 degrees on Y axis
        rotateZ: prevRotate.rotateZ + 5, // Rotate by 5 degrees on Z axis
      }));
    }, 100); // Rotate every 0.1 second

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once after mount

  return (
    <div >
      <img
        src="img/coin.png" // Replace with your image path
        alt="Rotating 3D image"
        width="250px" height="100px"
        style={{
          transform: `rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg) rotateZ(${rotate.rotateZ}deg)`,
        }}
      />
    </div>
  );
};

export default RotateImage;
