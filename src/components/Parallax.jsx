import React, { useState, useEffect, useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Phantom from "./PhantomConnect";
import ConvertStep from "./ConvertStep";

const Steps = () => {
    const steps = [
      {
        id: 1,
        icon: "fa-wallet",
        title: "Step 1",
        description: "Link your wallet on DexScreener or go to Raydium exchange. We recommend Phantom Wallet.",
        element: <Phantom/>
      },
      {
        id: 2,
        icon: "fa-coins",
        title: "Step 2",
        description: "Get Solana token.",
        element: <img src="img/solana.svg"/>
      },
      {
        id: 3,
        icon: "fa-arrow-right-arrow-left",
        title: "Step 3",
        description: "Convert Solana token to $Fap token.",
        element: <ConvertStep/>
      },
      {
        id: 4,
        icon: "fa-rocket",
        title: "Step 4",
        description: "Ride it out to the moon.",
        element: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
      </svg>
      },
    ];
  
    return (
      <ul className="steps-list flex-center flex flex-col ">
        {steps.map((step) => (
          <li key={step.id} className="card  text-white w-1/2 ">
            
            <div className="p-6 flex justify-between text-xl">
  
              <div class="">
              <i className={`fa-solid ${step.icon} icon`}></i>
              </div>
              <div>
              <span className="content">{step.description}</span>
              </div>
              <div className="w-[50px] h-[200px]">
                {step.element}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
};
const ParallaxEffect = () => {
  const [isInView, setIsInView] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isInView) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const progress = Math.max(0, Math.min(1, -sectionTop / window.innerHeight));
        setScrollY(progress); // Progress between 0 and 1
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate transformations based on scroll progress (0 to 1)
  const rotate = scrollY * 90; // Rotate up to 90 degrees
  const scale = 1 + scrollY * 0.5; // Scale up to 1.5
  const translateY = (1 - scrollY) * 100; // Move from bottom to center

  return (
    <>
    <div className="px-5 py-32 content-section" ref={sectionRef}>
      <AnimatedTitle
            title="How To Buy?"
            containerClass="mt-5 p-5 pointer-events-none mix-blend-difference relative z-10"
          />
      <Steps />
      </div>
      <div
        className="floating-parallax-object"
        style={{
          transform: `translateX(200px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
        }}
      >
        {scrollY >= 0.2 && (
            <div className="gif-overlay">
              <img src="img/cum.gif" alt="GIF Overlay" />
            </div>
          )}
        <img src="img/penis.png" />
      </div>
      <div
        className="floating-parallax-object"
        style={{
          transform: `translateX(-800px) translateY(${translateY}px) rotate(-${rotate}deg) scalex(-${scale})`,
        }}
      >
        {scrollY >= 0.2 && (
            <div className="gif-overlay">
              <img src="img/cum.gif" alt="GIF Overlay" />
            </div>
          )}
        <img src="img/penis.png" />
      </div>
      
    </>
  );
};

export default ParallaxEffect;
