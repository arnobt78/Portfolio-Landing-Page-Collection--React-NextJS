/**
 * Fixed top navigation: logo/name, in-page section links, Resume link,
 * and responsive mobile menu (hamburger + AnimatePresence). Navbar style changes on scroll (e.g. background).
 */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { USER_DETAILS } from "../data/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);

  /* Track scroll position to toggle navbar background (e.g. transparent vs solid); cleanup on unmount. */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  /* Section IDs must match the id attributes on the corresponding sections (e.g. #about, #skills). */
  const navLinks = [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Education", to: "education" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      {/* Scrolled state toggles solid background + border for better contrast over content */}
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 cursor-pointer"
        >
          {USER_DETAILS.names}
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={`#${link.to}`}
                className="text-gray-300 hover:text-white cursor-pointer transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </a>
            </motion.div>
          ))}

          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button ref={menuButtonRef} type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="mobile-menu" className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg overflow-hidden border-b border-white/10"
          >
            <div className="flex flex-col items-center space-y-6 py-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.to}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-gray-300 hover:text-white cursor-pointer transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
