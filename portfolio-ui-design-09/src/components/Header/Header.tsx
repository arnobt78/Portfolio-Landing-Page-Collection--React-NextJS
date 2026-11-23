'use client';

import Link from 'next/link';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { DiCssdeck } from 'react-icons/di';

const navLink: React.CSSProperties = { fontSize: '2rem', lineHeight: '32px', color: 'rgba(255,255,255,0.75)', textDecoration: 'none' };
const socialIcon: React.CSSProperties = { color: 'white', borderRadius: 50, display: 'inline-flex', transition: '0.3s ease' };

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-brand">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'white', textDecoration: 'none', gap: 4 }}>
          <DiCssdeck size={48} /> <span>Portfolio</span>
        </Link>
      </div>
      <nav className="header-nav" aria-label="Main navigation">
        <a href="#projects" style={navLink}>Projects</a>
        <a href="#tech" style={navLink}>Technologies</a>
        <a href="#about" style={navLink}>About</a>
      </nav>
      <div className="header-social">
        <a href="https://github.com" target="_blank" rel="noreferrer" style={socialIcon} aria-label="GitHub"><AiFillGithub size={48} /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={socialIcon} aria-label="LinkedIn"><AiFillLinkedin size={48} /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={socialIcon} aria-label="Instagram"><AiFillInstagram size={48} /></a>
      </div>
    </header>
  );
}
