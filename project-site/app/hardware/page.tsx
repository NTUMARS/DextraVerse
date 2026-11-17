import type { Metadata } from 'next';
import { HardwareAndData } from '../hardware';
import { PageIntro, SiteFooter, SiteNav } from '../site-chrome';
import { Streams } from '../streams';
import { Teleoperation } from '../teleoperation';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Hardware — DextraVerse' };

export default function HardwarePage() {
  return <><SiteNav active="hardware"/>
    <main id="top">
      <PageIntro title="Hardware." accent="Robot, Interfaces and Streams." lead="DextraVerse runs on a Dexmate Vega with two 7-DoF arms and two 22-DoF Sharpa hands with fingertip visual-tactile sensing. Wrist and hand control are separate, so tracking devices, data gloves and learned hand skills can be combined in one control pipeline."/>
      <HardwareAndData/>
      <Streams/>
      <Teleoperation/>
    </main>
    <SiteFooter/></>;
}
