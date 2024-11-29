import gsap from "gsap";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";


const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
   
        {/* added the chart details here */}
        
        <div className="relative size-full">
          <AnimatedTitle
            title="C<b>u</b>rrent m<b>o</b>ney sh<b>o</b>t"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          

          <div className="d-flex flex-center">
            
          
          <iframe id="dextswap-aggregator-widget"
    title="DEXTswap Aggregator"
    width="600" height="420"
    src="https://www.dextools.io/widget-aggregator/en/swap/solana/Fn1nCj9HVKa2H8BWcY9NScyGCAQWy8LkgsW5rv2dpump"></iframe>
            {/* for the rounded corner */}
            
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default FloatingImage;
