import { useState } from 'react';
import Layout from './components/Layout';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Identity from './components/Identity';
import CreatorSection from './components/CreatorSection';
import ModelSection from './components/ModelSection';
import CoachSection from './components/CoachSection';
import Philosophy from './components/Philosophy';
import Showreel from './components/Showreel';
import Journey from './components/Journey';
import Socials from './components/Socials';
import Contact from './components/Contact';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {!loadingComplete && <Loader onComplete={() => setLoadingComplete(true)} />}
      
      <Layout>
        {/* We mount the components but they only animate their intro when loading is complete */}
        <Hero />
        <Identity />
        <CreatorSection />
        <ModelSection />
        <CoachSection />
        <Philosophy />
        <Showreel />
        <Journey />
        <Socials />
        <Contact />
      </Layout>
    </>
  );
}

export default App;
