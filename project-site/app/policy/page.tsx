import type { Metadata } from 'next';
import { PolicyLearning } from '../policy-learning';
import { PageIntro, SiteFooter, SiteNav } from '../site-chrome';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Policy — DextraVerse' };

export default function PolicyPage() {
  return <><SiteNav active="policy"/>
    <main id="top">
      <PageIntro title="Policy." accent="Imitation and Reinforcement." lead="Imitation learning and reinforcement learning share tasks, observation and action interfaces, and evaluation. The tables below compare six tactile configurations (T0–T5) in both; the Tactile page explains what they show."/>
      <PolicyLearning/>
    </main>
    <SiteFooter/></>;
}
