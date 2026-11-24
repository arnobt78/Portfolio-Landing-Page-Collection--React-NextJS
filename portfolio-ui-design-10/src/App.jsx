import About from './components/About';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';

// App: root component; composes the single-page layout (order defines scroll flow)
const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <About />
        <Projects />
      </main>
    </>
  );
};
export default App;
