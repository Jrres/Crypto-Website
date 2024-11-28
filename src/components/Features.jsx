import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Phantom from "./PhantomConnect";
import ConvertStep from "./ConvertStep";
import SplotchEffect from "./Splotch";
export const Steps = () => {
  const steps = [
    {
      id: 1,
      icon: "fa-wallet",
      title: "Step 1",
      description: "Link your Phantom wallet on Dexscreener.",
      element: <Phantom/>
    },
    {
      id: 2,
      icon: "fa-coins",
      title: "Step 2",
      description: "Buy Solana token.",
      element: <img src="img/solana.svg"/>
    },
    {
      id: 3,
      icon: "fa-arrow-right-arrow-left",
      title: "Step 3",
      description: "Convert Solana token to Fap token.",
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
    <ul className="steps-list flex-center flex flex-col">
      {steps.map((step) => (
        <li key={step.id} className="card text-white w-1/2 ">
          
          <div className="p-6 flex justify-between">

            <div class="w-[20px]">
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
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);
  
  
  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      
      <img
        src={src}
        
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
      <AnimatedTitle
            title="How To Buy?"
            containerClass="mt-5 p-5 pointer-events-none mix-blend-difference relative z-10"
          />
      <Steps />
      </div>
      <div >
      <AnimatedTitle
            title="Invest Securely"
            containerClass="p-6  mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
      </div>          
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="img/hardongif.gif"
          title={
            <>
              liquidity pool burned
            </>
          }
          description="Not mintable or freezable either. Your position is as rock solid as you are ;3"
          
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-2 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="img/gooner.gif"
            title={
              <>
                Pump your b<b>a</b>gs dump your nads
              </>
            }
            description="Go ham on this coin like you would on your dick. What goes around cums around."
            
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="img/chart.gif"
            title={
              <>
                Unlimited Potential
              </>
            }
            description="The market cap is enough to pick up all the prostitutes."
            
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="img/shrek.jpg"
            title={
              <>
                Don't Miss Out On The Pump
              </>
            }
            description="At launch, there will be millions of dollars poured in. Be one of the first to milk this opportunity"
            
          />
        </BentoTilt>

        

      </div>
      
    </div>
  </section>
);

export default Features;
