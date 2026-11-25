/**
 * OverlayMenu: full-screen menu opened from navbar. AnimatePresence handles mount/unmount;
 * clipPath circle() animates from the menu button area (origin) to cover the screen on open, reverse on close.
 * Links use hash (#about, #skills, etc.) for in-page navigation.
 */
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const closeRef = useRef(null);

  // Keep keyboard focus inside the open menu and restore it without changing scroll position.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    const handleKey = (event) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab") return;
      const items = menuRef.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKey);
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  /* Clip-path origin: mobile = near top-right (hamburger); desktop = center-top for circle expand. */
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024; // lg breakpoint
  const origin = isMobile ? "95% 8%" : "50% 8%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="portfolio-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Navigation menu"
          className="fixed inset-0 flex items-center justify-center overflow-y-auto z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
        >
          {/* Close Button */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          {/* Menu Links */}
          <ul className="space-y-4 sm:space-y-6 text-center py-16">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Testimonials",
              "Contact",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-2xl sm:text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
