import { assetUrl } from '@/lib/asset-url';
import type { Metadata } from 'next';
import { PageIntro, SiteFooter, SiteNav } from '../site-chrome';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Simulation — DextraVerse' };

const IL_TASKS = [
  { file: 'policy/il-pick-place', name: 'Pick-and-place', text: 'Grasp a hammer and place it in a basket: grasp acquisition and maintenance.' },
  { file: 'policy/il-handover', name: 'Handover', text: 'Pass a wooden frame from one hand to the other: bimanual coordination and contact stability.' },
  { file: 'policy/il-stacking', name: 'Cube stacking', text: 'Place a red cube on a blue cube: grasp control, alignment and placement precision.' },
];
const RL_SKILLS = [
  { file: 'grasp', name: 'Cube grasping', text: 'PPO · 8,192 environments · 300M steps' },
  { file: 'policy/rl-rotation', name: 'In-hand rotation', text: 'PPO · 8,192 environments · 300M steps' },
  { file: 'policy/rl-rod', name: 'Bimanual rod lifting', text: 'Asymmetric PPO · 4,096 environments · 300M steps' },
  { file: 'tool', name: 'Tool use', text: 'Asymmetric PPO · 6,144 environments · 5B steps' },
  { file: 'policy/rl-pen', name: 'Pen spinning', text: 'In-hand skill from the shared skill library' },
];
const SENSING = [
  { name: 'Force magnitude', text: 'Contact strength at each fingertip.', shape: '1 value / fingertip' },
  { name: 'Force direction', text: 'Direction of the contact force.', shape: '3D vector / fingertip' },
  { name: 'Deformation maps', text: 'Synthetic deformation across the fingertip surface.', shape: '24 × 24 map / fingertip' },
];

function Clips({ items }: { items: { file: string; name: string; text: string }[] }) {
  return <div className="sim-grid">{items.map(item => <article key={item.file} className="sim-card">
    <video controls playsInline muted loop preload="none" src={assetUrl(`/media/${item.file}.mp4`)} poster={assetUrl(`/media/${item.file}.jpg`)} aria-label={item.name}/>
    <div className="sim-copy"><h3>{item.name}</h3><p>{item.text}</p></div>
  </article>)}</div>;
}

export default function SimulationPage() {
  return <><SiteNav active="simulation"/>
    <main id="top">
      <PageIntro title="Simulation." accent="A Matched Model in Isaac Lab." lead="The simulated robot preserves the geometry and kinematics of the real one and exposes the same observation and action interfaces. Policies trained here are evaluated through the same control interface that drives the real robot."/>
      <section className="section sim-section" aria-labelledby="sim-il-title">
        <h2 id="sim-il-title">Imitation Tasks. <em>Three Kinds of Dexterity.</em></h2>
        <p className="sim-lead">Demonstrations for these tasks are collected by teleoperation in simulation with the same recording interface as on the robot. All three are released in the open dataset.</p>
        <Clips items={IL_TASKS}/>
      </section>
      <section className="section sim-section" aria-labelledby="sim-rl-title">
        <h2 id="sim-rl-title">Reinforcement Skills. <em>Trained in Parallel.</em></h2>
        <p className="sim-lead">Hand skills are trained with thousands of parallel environments. Each skill pairs a reward objective with its training protocol and evaluation settings in a shared skill library.</p>
        <Clips items={RL_SKILLS}/>
      </section>
      <section className="section sim-section" aria-labelledby="sim-sense-title">
        <h2 id="sim-sense-title">Simulated Touch. <em>Same Channels as the Robot.</em></h2>
        <p className="sim-lead">Simulated contact signals approximate the physical fingertip sensors. Calibration and command conversion account for the remaining sensing and control differences when a policy is deployed on the real robot.</p>
        <div className="sim-sensing">{SENSING.map(item => <div key={item.name}><h3>{item.name}</h3><p>{item.text}</p><span>{item.shape}</span></div>)}</div>
      </section>
    </main>
    <SiteFooter/></>;
}
