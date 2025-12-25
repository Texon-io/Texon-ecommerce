import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300
      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }
      group`}
    >
      {/* Tooltip */}
      <div
        className="
          absolute right-14 top-1/2 -translate-y-1/2
          whitespace-nowrap rounded-md bg-black px-3 py-1.5
          text-xs text-white opacity-0 translate-x-2
          transition-all duration-200
          group-hover:opacity-100 group-hover:translate-x-0
          shadow-lg
        "
      >
        Back to top
        {/* Arrow */}
        <span
          className="
            absolute -right-1.5 top-1/2 -translate-y-1/2
            h-2 w-2 rotate-45 bg-black
          "
        />
      </div>

      {/* Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="
        cursor-pointer
          rounded-full bg-primary p-3 text-white shadow-lg
          transition-all duration-300 ease-out
          hover:bg-primary/90 hover:scale-105
        "
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
