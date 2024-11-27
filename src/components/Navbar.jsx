import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import Button from "./Button";

const navItems = ["Buy Now", "X", "Telegram"];
const navDict = [
  {
    name: "Buy Now",
    element: (
      <BiDollar />
    ),
  },
  {
    name: "X",
    element: (
      <FaXTwitter />
    ),
  },
  {
    name: "Telegram",
    element: (
      <FaTelegram />
    ),
  },
];

const getIcon = (name) => {
  // Find the object with the matching name and return the element
  const item = navDict.find((el) => el.name === name);
  return item ? item.element : null;
};

// Example usage:
console.log(getIcon("Buy Now"));

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
     <header className="absolute top-1/2 w-full -translate-y-1/2">
  <nav className="flex items-center justify-between p-4">
    {/* Navigation Links and Audio Button */}
    <div className="flex h-full items-center">
      <div className="hidden md:flex flex-row space-x-4">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase()}`}
            className="nav-hover-btn"
          
          >
            {getIcon(item)}
          </a>
        ))}
      </div>

      <button
        onClick={toggleAudioIndicator}
        className="ml-10 flex items-center space-x-0.5"
      >
        <audio
          ref={audioElementRef}
          className="hidden"
          src="/audio/loop.mp3"
          loop
        />
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={clsx("indicator-line", {
              active: isIndicatorActive,
            })}
            style={{
              animationDelay: `${bar * 0.1}s`,
            }}
          />
        ))}
      </button>
    </div>
  </nav>
</header>

    </div>
  );
};

export default NavBar;
