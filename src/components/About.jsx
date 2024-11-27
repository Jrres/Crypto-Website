import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-3 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-[50px] uppercase ">
          Welcome to FAP
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> best meme coin on Solana"
          containerClass="mt-5 !text-black text-center"
        />
        
        <div className="about-subtext" style={{
       
          }}>
          <p className="mb-4">Dont miss out on the next big rally. The Balkin Flickergoon awaits us all</p>
          <p className="text-gray-500">
          Fellow kings have long awaited the end, for the dreaded month of November. Now, It's time to celebrate the transcending soul-touching nut, after all. So, Let's make some bags from this group goon sesh.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/wojack.jpg"
            alt="Background"
            className="absolute left-0 top-0 size-full  object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
