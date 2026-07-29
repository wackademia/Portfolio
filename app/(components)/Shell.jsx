'use client';
import dynamic from 'next/dynamic';

import Gate from './Gate';
import Nav from './Nav';
import Hud from './Hud';
import Cursor from './Cursor';
import Telemetry from './Telemetry';
import SmoothScroll from './SmoothScroll';
import Footer from './Footer';

import Index from './sections/Index';
import Manifest from './sections/Manifest';
import Archive from './sections/Archive';
import Research from './sections/Research';
import Stack from './sections/Stack';
import Uplink from './sections/Uplink';

// three.js is ~600kb — keep it out of the initial bundle so the gate paints fast
const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function Shell() {
  return (
    <>
      <Telemetry />
      <SmoothScroll />
      <Scene />

      <div className="fx-vignette" aria-hidden="true" />
      <div className="fx-overlay" aria-hidden="true" />

      <Cursor />
      <Gate />
      <Nav />
      <Hud />

      <main className="relative z-10">
        <Index />
        <Manifest />
        <Archive />
        <Research />
        <Stack />
        <Uplink />
      </main>

      <Footer />
    </>
  );
}
