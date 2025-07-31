import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import gsap from "gsap";

const Header = () => {
   useEffect(() => {
    gsap.from(".nav-link", {
      opacity: 0,
      y: -10,
      stagger: 0.1,
      duration: 0.5,
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-neutral-950 bg-opacity-80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-neutral-800">
      <div className="font-bold text-lg text-white tracking-wide">Elyan Labs</div>
      <nav className="hidden md:flex gap-6">
        {["About", "SophiaCore", "Sophia Elya", "Integrate", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
            className="nav-link text-neutral-300 hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>
      <Button className="ml-4">Talk to Sophia</Button>
    </header>
  );
}

export default Header