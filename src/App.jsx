import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CVSection from './components/CVSection';

function App() {
  return (
    <Layout>
      <Hero />
      <CVSection />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  );
}

export default App
