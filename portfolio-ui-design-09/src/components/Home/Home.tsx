'use client';

import Accomplishments from '@/components/Accomplishments/Accomplishments';
import BackgroundAnimation from '@/components/BackgroundAnimation/BackgroundAnimation';
import Hero from '@/components/Hero/Hero';
import Projects from '@/components/Projects/Projects';
import Technologies from '@/components/Technologies/Technologies';
import Timeline from '@/components/TimeLine/TimeLine';
import { Layout } from '@/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <section className="hero-grid">
        <Hero />
        <BackgroundAnimation />
      </section>
      <Projects />
      <Technologies />
      <Timeline />
      <Accomplishments />
    </Layout>
  );
}
