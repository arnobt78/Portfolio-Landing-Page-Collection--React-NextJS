import heroImg from "../assets/hero.svg";
import { FaGithubSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

// Hero: intro block + optional illustration; I&apos;m avoids unescaped apostrophe in JSX
const Hero = () => {
  return (
    <div id="home" className="bg-emerald-100 py-24">
      <div className="align-element grid md:grid-cols-2 items-center gap-8">
        <article>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-wider">
            I&apos;m
            <span className="text-emerald-600"> John Doe</span>
          </h1>
          <p className="mt-4 text-3xl text-slate-700 capitalize tracking-wide">
            Front-End Developer
          </p>
          <p className="mt-2 text-lg text-slate-700 capitalize tracking-wide">
            turning ideas into interactive reality
          </p>
          <div className="flex gap-x-4 mt-4">
            <a href="#" aria-label="GitHub (demo link)" className="inline-flex min-h-11 min-w-11 items-center justify-center">
              <FaGithubSquare className="h-8 w-8 text-slate-500 hover:text-black duration-300" />
            </a>
            <a href="#" aria-label="LinkedIn (demo link)" className="inline-flex min-h-11 min-w-11 items-center justify-center">
              <FaLinkedin className="h-8 w-8 text-slate-500 hover:text-black duration-300" />
            </a>
            <a href="#" aria-label="Twitter (demo link)" className="inline-flex min-h-11 min-w-11 items-center justify-center">
              <FaTwitterSquare className="h-8 w-8 text-slate-500 hover:text-black duration-300" />
            </a>
          </div>
        </article>
        {/* Hero image: hidden on small screens, shown from md breakpoint up */}
        <article className="hidden md:block">
          <img src={heroImg} alt="" className="h-80 lg:h-96" />
        </article>
      </div>
    </div>
  );
};
export default Hero;
