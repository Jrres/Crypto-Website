import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RandomImageScroll = () => {
  const imageLayerRef = useRef(null); // Layer for floating images

  useEffect(() => {
    const imgSrc = "/img/CoomerHead.png"; // Path to your image

    // Function to create a random position
    const getRandomPosition = () => ({
      top: Math.random() * window.innerHeight,
      left: Math.random() * window.innerWidth,
    });

    // Function to create an image element and animate it
    const createImage = () => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.style.position = "absolute";
      img.style.opacity = 0;
      img.style.transform = "scale(0)"; // Start small
      img.style.pointerEvents = "none";

      const { top, left } = getRandomPosition();
      img.style.top = `${top}px`;
      img.style.left = `${left}px`;

      imageLayerRef.current.appendChild(img);

      // Animate the image
      gsap.to(img, {
        opacity: 1,
        scale: Math.random() * 1.5 + 0.5, // Random scale
        duration: 1,
        onComplete: () => {
          // Remove image after animation
          setTimeout(() => {
            img.remove();
          }, 1000);
        },
      });
    };

    // Set up ScrollTrigger to trigger the animation only after scrolling past 90% of the page height
    ScrollTrigger.create({
      trigger: document.body, // Use the body as the scroll trigger
      start: "top 90%", // Trigger when 90% of the page has been scrolled
      end: "bottom bottom",
      onUpdate: (self) => {
        // Check if we've scrolled past the 90% threshold
        if (self.progress > 0.9 && self.direction > 0) {
          // Only trigger on downward scroll and after 90% scroll progress
          createImage();
        }
      },
    });

    return () => {
      ScrollTrigger.killAll(); // Clean up
    };
  }, []);

  return (
    <>
      <div
        ref={imageLayerRef}
        style={{
          position: "fixed", // Fixed layer on top of the layout
          top: 0,
          left: 0,
          width: "50vw",
          height: "50vh",
          pointerEvents: "none", // Ensure it doesn't block interactions with other elements
          zIndex: 9999, // Layer above everything
        }}
      />
    </>
  );
};

export default RandomImageScroll;
