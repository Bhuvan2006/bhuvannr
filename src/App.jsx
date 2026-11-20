import { lazy, Suspense, useEffect, useRef } from 'react';
import { initSmoothScroll, ScrollTrigger, store } from './lib/scroll';
import { watchReveals } from './lib/reveal';
import { initAnalytics, trackSections } from './lib/analytics';
import { usePath, matchRoute } from './lib/router';
import { features } from './content/site';
import Nav from './components/Nav';
import Curtain from './components/Curtain';
import Footer from './components/Footer';
import Link from './components/Link';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import TechStack from './sections/TechStack';
import Achievements from './sections/Achievements';
import Writing from './sections/Writing';
import Contact from './sections/Contact';

// Secondary pages load on demand.
const BlogIndex = lazy(() => import('./pages/BlogIndex.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const Services = lazy(() => import('./sections/Services.jsx'));

function Home() {
  useEffect(() => trackSections(document), []);
  // Arriving via /#section (e.g. from a blog page): land on that section.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (store.lenis) store.lenis.scrollTo(el, { offset: -70, immediate: true, force: true });
      else window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70);
    }, 80);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <TechStack />
      <Achievements />
      <Writing />
      <Contact />
    </>
  );
}

export default function App() {
  const mainRef = useRef(null);
  const route = matchRoute(usePath());

  useEffect(() => {
    initAnalytics();
    const stop = initSmoothScroll();
    const unwatch = watchReveals(mainRef.current);
    document.documentElement.classList.add('is-loaded');
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => { window.removeEventListener('load', refresh); unwatch(); stop(); };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => { store.lenis?.resize(); ScrollTrigger.refresh(); });
    return () => cancelAnimationFrame(id);
  }, [route.name, route.slug]);

  let page;
  if (route.name === 'home') page = <Home />;
  else if (route.name === 'blog') page = <BlogIndex />;
  else if (route.name === 'post') page = <BlogPost key={route.slug} slug={route.slug} />;
  else if (route.name === 'legal') page = <Legal />;
  else if (route.name === 'services' && features.services) page = <Services />;
  else page = (
    <div className="page"><div className="container">
      <h1 className="page-title">Page not <span className="muted">found.</span></h1>
      <Link to="/" className="link">← Back home</Link>
    </div></div>
  );

  return (
    <>
      <Curtain />
      <Nav />
      <main id="main" ref={mainRef}>
        <Suspense fallback={<div className="page" />}>{page}</Suspense>
      </main>
      <Footer />
    </>
  );
}
