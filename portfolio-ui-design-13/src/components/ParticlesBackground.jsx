/**
 * ParticlesBackground: canvas-based floating particles (simple 2D animation loop).
 * Used in Contact (and can be reused in other sections). Resizes with window and recreates particles on resize.
 */
import { useEffect, useRef } from "react"; // Import React hooks

export default function ParticleBackground() { // Define a React component
  const canvasRef = useRef(null); // useRef to hold a reference to the canvas element

  useEffect(() => { // Run effect after component mounts
    const canvas = canvasRef.current; // Get the actual canvas DOM element
    const ctx = canvas.getContext("2d"); // Get 2D drawing context for the canvas
    if (!ctx) return;

    let particles = []; // Array to store all particles
    const particleCount = 50; // Total number of particles
    const colors = ["rgba(255, 255, 255, 0.7)"]; // Particle colors (white glow)

    // 🎇 Particle Class → blueprint for creating particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width; // Random X position within canvas width
        this.y = Math.random() * canvas.height; // Random Y position within canvas height
        this.radius = Math.random() * 2 + 1; // Random size between 1–3 pixels
        this.color = colors[Math.floor(Math.random() * colors.length)]; // Pick a random color
        this.speedX = (Math.random() - 0.5) * 0.5; // Small random horizontal speed
        this.speedY = (Math.random() - 0.5) * 0.5; // Small random vertical speed
      }

      draw() {
        ctx.beginPath(); // Start drawing a new shape
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Draw a circle at (x,y) with radius
        ctx.shadowBlur = 10; // Add glow effect around the particle
        ctx.shadowColor = this.color; // Glow color matches particle color
        ctx.fillStyle = this.color; // Fill color for the particle
        ctx.fill(); // Paint the circle on canvas
      }

      update() {
        this.x += this.speedX; // Move particle horizontally
        this.y += this.speedY; // Move particle vertically

        // Wrap-around logic: if particle goes off screen, reappear from opposite side
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw(); // Redraw the particle at its new position
      }
    }

    // 🔄 Function to create all particles
    function createParticles() {
      particles = []; // Reset particles array
      for (let i = 0; i < particleCount; i++) { // Loop particleCount times
        particles.push(new Particle()); // Create and add a new particle
      }
    }

    // ✅ Resize handler → keeps canvas size same as window
    function handleResize() {
      canvas.width = window.innerWidth; // Set canvas width equal to window width
      canvas.height = window.innerHeight; // Set canvas height equal to window height
      createParticles(); // Recreate particles so they fill the resized canvas
    }

    handleResize(); // Initialize canvas size and particles on mount
    window.addEventListener("resize", handleResize); // Update when window is resized

    // Animate only while visible and allowed by the user's motion preference.
    let animationId = null;
    let visible = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
    }
    function animate() {
      draw();
      animationId = requestAnimationFrame(animate);
    }
    function updateAnimation() {
      if (animationId !== null) cancelAnimationFrame(animationId);
      animationId = null;
      if (visible && !document.hidden && !reducedMotion.matches) animate();
      else if (visible) draw();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAnimation();
    });
    observer.observe(canvas);
    window.addEventListener("resize", updateAnimation);
    document.addEventListener("visibilitychange", updateAnimation);
    reducedMotion.addEventListener("change", updateAnimation);

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateAnimation);
      reducedMotion.removeEventListener("change", updateAnimation);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", updateAnimation);
    };
  }, []); // [] → run this effect only once when component mounts

  return (
    <canvas
      ref={canvasRef} // Attach ref so we can access the canvas in JS
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
      // fixed → stays fixed on screen
      // top-0 left-0 → positioned at top-left
      // w-full h-full → covers entire screen
      // pointer-events-none → doesn’t block clicks on UI
      // z-0 → stays in background
    />
  );
}
