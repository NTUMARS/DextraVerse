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
// The implemented skills of the harness skill registry (master), with the results its gallery reports.
const RL_TRAINED = [
  { file: 'grasp', name: 'Grasp and lift', body: 'One hand · PPO', text: '92.1% success over 16 objects, wrist tilted 0–90°.' },
  { file: 'skills/closure-assist', name: 'Closure assist', body: 'One hand · PPO', text: 'The operator moves the wrist; the policy closes the fingers.' },
  { file: 'skills/rod-wrap', name: 'Rod wrap', body: 'One hand · PPO', text: 'Fingers wrap around a rod: 91% closure success.' },
  { file: 'skills/inhand-reorient', name: 'In-hand reorientation', body: 'One hand · teacher–student', text: '18.9 rad of rotation per episode with 9.9% drops.' },
  { file: 'policy/rl-pen', name: 'Pen spinning', body: 'One hand · PPO, state-based', text: '3.3 turns per 20 s; 92% of episodes complete a full turn.' },
  { file: 'policy/rl-rod', name: 'Bimanual rod grasp', body: 'Two hands · asymmetric PPO', text: 'Both hands lift a rod, about 2.8 fingers in contact per hand.' },
];
const RL_IN_PROGRESS = [
  { file: 'tool', video: true, name: 'Tool transport', body: 'Arm + hand · SAPG', text: 'Grasp and lift are learned; placing at the goal pose is not yet.' },
  { file: 'skills/load-bearing-wrap', name: 'Load-bearing rod wrap', body: 'One hand', text: 'The rod wrap with its support removed. Not yet trained.' },
  { file: 'skills/symmetric-lift', name: 'Symmetric lift', body: 'Two hands', text: 'A cylinder too wide for one hand. Retraining after reward fixes.' },
  { file: 'skills/unscrew', name: 'Bottle-cap unscrewing', body: 'Two hands', text: 'Not solved yet: the thumb does not oppose the cap.' },
  { file: 'skills/bimanual-tool', name: 'Bimanual tool transport', body: 'Two arms + hands', text: 'Scene and interfaces built. No policy yet.' },
];
const RL_PLANNED = ['Door opening', 'Switch pressing', 'Pouring', 'Lid removal', 'Scissors use', 'Handover', 'Pick and place', 'Stacking', 'Pushing', 'Reorient to a goal pose', 'Insertion', 'Deformable objects', 'Failure recovery'];
const SENSING = [
  { name: 'Force magnitude', text: 'Contact strength at each fingertip.', shape: '1 value / fingertip' },
  { name: 'Force direction', text: 'Direction of the contact force.', shape: '3D vector / fingertip' },
  { name: 'Deformation maps', text: 'Synthetic deformation across the fingertip surface.', shape: '24 × 24 map / fingertip' },
];

type Clip = { file: string; name: string; text: string; body?: string; video?: boolean };

function Clips({ items, compact = false, stills = false }: { items: Clip[]; compact?: boolean; stills?: boolean }) {
  return <div className={compact ? 'sim-grid compact' : 'sim-grid'}>{items.map(item => <article key={item.file} className="sim-card">
    {stills && !item.video
      ? <img src={assetUrl(`/media/${item.file}.jpg`)} alt={`${item.name}: the simulation scene`} loading="lazy"/>
      : <video controls playsInline muted loop preload="none" src={assetUrl(`/media/${item.file}.mp4`)} poster={assetUrl(`/media/${item.file}.jpg`)} aria-label={item.name}/>}
    <div className="sim-copy">{item.body && <span className="sim-body">{item.body}</span>}<h3>{item.name}</h3><p>{item.text}</p></div>
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
        <h2 id="sim-rl-title">Reinforcement Skills. <em>One Shared Library.</em></h2>
        <p className="sim-lead">Each skill pairs a reward objective with its training and evaluation protocol, trained in thousands of parallel environments. Eleven skills are implemented: six trained, five in progress.</p>
        <h3 className="sim-subhead">Trained <span>{RL_TRAINED.length}</span></h3>
        <Clips items={RL_TRAINED}/>
        <h3 className="sim-subhead">In progress <span>{RL_IN_PROGRESS.length}</span></h3>
        <Clips items={RL_IN_PROGRESS} compact stills/>
        <h3 className="sim-subhead">Planned <span>{RL_PLANNED.length}</span></h3>
        <ul className="sim-planned">{RL_PLANNED.map(name => <li key={name}>{name}</li>)}</ul>
      </section>
      <section className="section sim-section" aria-labelledby="sim-sense-title">
        <h2 id="sim-sense-title">Simulated Touch. <em>Same Channels as the Robot.</em></h2>
        <p className="sim-lead">Simulated contact signals approximate the physical fingertip sensors. Calibration and command conversion account for the remaining sensing and control differences when a policy is deployed on the real robot.</p>
        <div className="sim-sensing">{SENSING.map(item => <div key={item.name}><h3>{item.name}</h3><p>{item.text}</p><span>{item.shape}</span></div>)}</div>
      </section>
    </main>
    <SiteFooter/></>;
}
