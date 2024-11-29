import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);
const screenSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const diff = {
  width: screenSize.width - 1980,
  height: screenSize.height - 1080
}

// Each item will be placed in the wojack picture
// Items will desc each piece of the picture
// Descs
// Enlarged testes caused by intense jerk off sessions during a bullrun
// Swole Arm formed through a strict pump and dump regiment
// Sea of tissues resembling an addiction to crypto trading while watching hentai
// Pea Bottles used to never take bathroom breaks and continue to trade
// Gun Just In Case i yeet all my lifes saving into this one and lose it all
// Pocket pussy not as good as tissues. 

// items is array of objects
// name: string -- name of object on screen
// desc: string -- desc of object
// pos : object of nums -- pos on the screen to place desc and name 
const items = [
  {
    name:"Enlarged Testes",
    desc:"Caused by intense jerk off sessions during a bullrun",
    pos: {
      x: 600+diff.width,
      y: 750+diff.height,
    }
  },
  {
    name:"Swole Arm",
    desc:"Formed through a strict pump and dump regiment",
    pos: {
      x: 300+diff.width,
      y: 300+diff.height,
    }
  },
  {
    name:"Sea Of Tissues",
    desc:"Resembles an addiction to crypto trading while watching hentai",
    pos: {
      x: 0+diff.width,
      y: 700+diff.height,
    }
  },
  {
    name:"Pee Bottles",
    desc:"Solution to not having to use the toilet ever just to watch crypto all day",
    pos: {
      x: 1000+diff.width,
      y: 700+diff.height,
    }
  },
  {
    name:"Cum Splotch",
    desc:"Better than a fresh coat of paint!",
    pos: {
      x: 1200+diff.width,
      y: 200+diff.height,
    }
  },

];
const Descriptions = () => {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${item.pos.y}px`,
            left: `${item.pos.x}px`,
            padding: "8px",
            background: "rgba(0, 0, 0, 1)",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "14px",
            zIndex: 2,
          }}
        >
          <h3 style={{ margin: "0", fontSize: "1rem", fontWeight: "bold" }}>
            {item.name}
          </h3>
          <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

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

    // Mask animation
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    // Reveal descriptions
    clipAnimation.to(
      ".description-item",
      {
        opacity: 1,
        duration: 1, // Adjust duration as needed
        stagger: 0.2, // Optionally stagger the reveal of each description
      },
      ">-0.5" // Start this animation slightly before the timeline ends
    );
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-3 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-[50px] uppercase">Welcome to FAP</p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> best meme coin on Solana"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p className="mb-4">
            Don't miss out on the next big rally. The Balkan Flickergoon awaits us all.
          </p>
          <p className="text-gray-500">
            Fellow kings have long awaited the end, for the dreaded month of
            November. Now, It's time to celebrate the transcending soul-touching nut,
            after all. So, Let's make some bags from this group goon sesh.
          </p>
        </div>
      </div>

      {/* Wojack Image with Descriptions */}
      <div className="h-dvh w-screen relative" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/wojack.jpg"
            alt="Wojack"
            className="z-1 absolute left-0 top-0 w-full h-full object-cover"
          />
          <div className="relative">
            {items.map((item, index) => (
              <div
                key={index}
                className="description-item"
                style={{
                  position: "absolute",
                  top: `${item.pos.y}px`,
                  left: `${item.pos.x}px`,
                  padding: "8px",
                  background: "rgba(0, 0, 0, 1)",
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "30px",
                  zIndex: 2,
                  opacity: 0, // Initially hidden
                }}
              >
                <h3 style={{ margin: "0", fontSize: "1rem", fontWeight: "bold" }}>
                  {item.name}
                </h3>
                <p style={{ margin: "5px 0", fontSize: "0.85rem" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

