'use client';

import { assetUrl } from '@/lib/asset-url';
import { useState } from 'react';

type Step = { when: string; title: string; note: string; video?: string; compare?: { real: string; sim: string } };

const STEPS: Step[] = [
  { when: 'Jul 2026', title: 'A hand on a grid', note: 'Early training scenes: one hand, one object, the default ground.', video: '/media/sim-evolution/1-hand-on-grid' },
  { when: 'Oct 2026', title: 'The full robot at a table', note: 'The cube-to-basket task rebuilt around the whole two-arm robot.', video: '/media/sim-evolution/2-first-twin' },
  { when: 'Oct 2026', title: 'Calibrated to the rig', note: 'Left: PhysX with standard hands. Right: Newton physics with high-fidelity hands, calibrated to the real robot.', video: '/media/sim-evolution/3-fidelity-levels' },
  { when: 'Oct 2026', title: 'Path-traced rendering', note: 'The same scene rendered with Isaac RTX.', video: '/media/sim-evolution/4-rtx' },
  { when: 'Nov 2026', title: 'The real lab, rebuilt', note: 'Table, objects, hands and ceiling lights fitted from one head-camera photo. Drag to compare.', compare: { real: '/media/sim-evolution/5-real.jpg', sim: '/media/sim-evolution/5-render.jpg' } },
  { when: 'Nov 2026', title: 'A twin with the lab’s look', note: 'Lab lighting and table material in a full simulated task, seen from the robot’s head.', video: '/media/sim-evolution/6-lab-twin' },
];

function Compare({ real, sim }: { real: string; sim: string }) {
  const [split, setSplit] = useState(50);
  return <div className="compare">
    <img src={assetUrl(sim)} alt="The rebuilt scene rendered in simulation"/>
    <img src={assetUrl(real)} alt="The real head-camera photo" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}/>
    <span className="compare-line" style={{ left: `${split}%` }} aria-hidden="true"/>
    <span className="compare-tag left">Real photo</span>
    <span className="compare-tag right">Simulation</span>
    <input type="range" min={0} max={100} value={split} onChange={e => setSplit(Number(e.target.value))} aria-label="Move the divider between the real photo and the simulation"/>
  </div>;
}

export function SceneEvolution() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  return <section className="section scene-evolution" aria-labelledby="scene-title">
    <h2 id="scene-title">The Scene, <em>Step by Step.</em></h2>
    <ol className="scene-steps" role="tablist" aria-label="Simulation scene over time">
      {STEPS.map((s, i) => <li key={s.title}>
        <button type="button" role="tab" aria-selected={i === active} onClick={() => setActive(i)}>
          <span className="scene-dot" aria-hidden="true">{i + 1}</span>
          <span className="scene-when">{s.when}</span>
          <strong>{s.title}</strong>
        </button>
      </li>)}
    </ol>
    <div className="scene-stage">
      {step.compare
        ? <Compare real={step.compare.real} sim={step.compare.sim}/>
        : <video key={step.video} autoPlay muted loop playsInline controls preload="metadata" src={assetUrl(`${step.video}.mp4`)} poster={assetUrl(`${step.video}.jpg`)} aria-label={step.title}/>}
    </div>
    <p className="scene-note"><strong>{step.title}.</strong> {step.note}</p>
  </section>;
}
