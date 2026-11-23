import React from 'react';
import { MotionConfig } from 'framer-motion';

import { About, Footer, Header, Skills, Testimonial, Work } from './container';
import { Navbar } from './components';
import './App.scss';

// Main app layout: fixed navbar + scrollable sections (each section has its own id for #hash navigation).
const App = () => (
  <MotionConfig reducedMotion="user">
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  </MotionConfig>
);

export default App;
