import { assetUrl } from '@/lib/asset-url';
import type { LucideIcon } from 'lucide-react';
import { Activity, ArrowDown, ArrowRight, BrainCircuit, Database, Fingerprint, Grab, Images, Move3D, SlidersHorizontal } from 'lucide-react';
import { MODALITY_ACTIONS, MODALITY_POSE } from './modality-data';

const media = assetUrl('/media/hardware/');

type Source = { label: string; image?: string; icon?: LucideIcon };
const SOURCES: { group: string; learned?: boolean; items: Source[] }[] = [
  { group: 'Wrist', items: [{ label: 'Vive Tracker', image: 'vive-tracker' }, { label: 'SpaceMouse', image: 'spacemouse' }] },
  { group: 'Fingers', items: [{ label: 'VR hand tracking', image: 'vr-headset' }, { label: 'Data gloves', image: 'glove' }] },
  { group: 'Learned', learned: true, items: [{ label: 'RL hand skill', icon: Grab }, { label: 'IL policy', icon: BrainCircuit }] },
];

/** The right wrist's path over the clip (older parts fainter), seen from the front, with its frame now. */
function PoseView() {
  const { view: [w, h], segments, now, axes } = MODALITY_POSE;
  return <svg className="sc-pose" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
    {segments.map((s, i) => <path key={i} className="sc-path" d={s.d} style={{ opacity: s.o }}/>)}
    {axes.map((end, i) => <line key={i} className={`sc-axis a${i}`} x1={now[0]} y1={now[1]} x2={end[0]} y2={end[1]}/>)}
    <circle className="sc-dot" cx={now[0]} cy={now[1]} r="3"/>
  </svg>;
}

const BLUE = [42, 120, 214], NEUTRAL = [241, 236, 231], ORANGE = [182, 83, 19];
/** Diverging colour: blue for negative, a warm grey at zero, orange for positive. */
function diverging(v: number) {
  const end = v < 0 ? BLUE : ORANGE, t = Math.min(Math.abs(v), 1);
  return `rgb(${NEUTRAL.map((n, i) => Math.round(n + (end[i] - n) * t)).join(',')})`;
}

/** The 58 joint targets at the snapshot moment: arms on top, hands below, each group scaled to its largest magnitude. */
function ActionCells() {
  const W = 212, GAP = 8, H = 13;
  const rows = [MODALITY_ACTIONS.slice(0, 2), MODALITY_ACTIONS.slice(2)];
  const names: Record<string, string> = { 'L arm': 'Left arm', 'R arm': 'Right arm', 'L hand': 'Left hand', 'R hand': 'Right hand' };
  return <svg className="sc-actions" viewBox={`0 0 ${W} 54`} aria-hidden="true">
    {rows.map((groups, r) => {
      const n = groups.reduce((sum, g) => sum + g.values.length, 0);
      const cell = (W - GAP) / n;
      const y = 10 + r * 27;
      let x = 0;
      return groups.map(g => {
        const x0 = x;
        x += g.values.length * cell + GAP;
        return <g key={g.label}>
          <text x={x0} y={y - 3}>{names[g.label]}</text>
          {g.values.map((v, i) => <rect key={i} x={x0 + i * cell} y={y} width={Math.max(cell - 0.8, 0.8)} height={H} rx="0.8" fill={diverging(v)}/>)}
        </g>;
      });
    })}
  </svg>;
}

const STREAMS: { key: string; icon: LucideIcon; title: string; text: string }[] = [
  { key: 'vision', icon: Images, title: 'Vision', text: 'head + two wrist cameras' },
  { key: 'touch', icon: Fingerprint, title: 'Touch', text: '10 fingertips: force, direction, deformation' },
  { key: 'proprio', icon: Activity, title: 'Proprio\u00ADception', text: 'joint angles' },
  { key: 'pose', icon: Move3D, title: 'Pose', text: '6-DoF wrist' },
  { key: 'actions', icon: SlidersHorizontal, title: 'Actions', text: '58 joint targets' },
];

function StreamVisual({ kind }: { kind: string }) {
  if (kind === 'vision') return <img className="sc-thumb" src={`${media}modality-vision.jpg`} alt="" loading="lazy"/>;
  if (kind === 'touch') return <img className="sc-thumb touch" src={`${media}modality-tactile.png`} alt="" loading="lazy"/>;
  if (kind === 'proprio') return <img className="sc-thumb robot" src={`${media}modality-robot.jpg`} alt="" loading="lazy"/>;
  if (kind === 'pose') return <PoseView/>;
  return <ActionCells/>;
}

function Step({ n, title }: { n: string; title: string }) {
  return <p className="sc-step"><span>{n}</span>{title}</p>;
}

function Link() {
  return <div className="sc-link" aria-hidden="true"><ArrowRight className="sc-link-right" size={18}/><ArrowDown className="sc-link-down" size={18}/></div>;
}

/** The platform as one chart: many command sources, one control interface, two embodiments, one record. */
export function SystemChart() {
  return <figure className="sc" aria-label="System chart: wrist, finger and learned command sources drive the real robot or its Isaac Lab twin through one control interface; vision, touch, proprioception, pose and actions are recorded together in one format and train new policies.">
    <div className="sc-flow">
      <div className="sc-col sources">
        <Step n="01" title="Command sources"/>
        {SOURCES.map(group => <div key={group.group} className={group.learned ? 'sc-group learned' : 'sc-group'}>
          <h4>{group.group}</h4>
          <div className="sc-items">{group.items.map(item => <div key={item.label} className="sc-item">
            {item.image ? <img src={`${media}${item.image}.png`} alt="" loading="lazy"/> : item.icon && <item.icon size={30} strokeWidth={1.4} aria-hidden="true"/>}
            <span>{item.label}</span>
          </div>)}</div>
        </div>)}
      </div>
      <Link/>
      <div className="sc-col">
        <Step n="02" title="One control interface"/>
        <div className="sc-hub">
          <div className="sc-lane"><strong>Wrist pose</strong><small>6-DoF per arm</small><em>inverse kinematics</em><strong>Arm joint targets</strong><small>2 × 7</small></div>
          <div className="sc-lane"><strong>Finger pose</strong><small>per hand</small><em>retargeting</em><strong>Hand joint targets</strong><small>2 × 22</small></div>
          <p>Wrist and fingers are separate channels: any wrist source pairs with any finger source or learned skill.</p>
        </div>
      </div>
      <Link/>
      <div className="sc-col exec">
        <Step n="03" title="Execution"/>
        <div className="sc-body">
          <img className="cutout" src={`${media}vega-cube-cutout.png`} alt="" loading="lazy"/>
          <div><strong>Real robot</strong><small>Vega + two Sharpa hands, 58 DoF</small></div>
        </div>
        <p className="sc-same">same interface</p>
        <div className="sc-body">
          <img src={`${media}vega-sim.jpg`} alt="" loading="lazy"/>
          <div><strong>Isaac Lab twin</strong><small>Matched geometry and kinematics</small></div>
        </div>
      </div>
      <Link/>
      <div className="sc-col obs">
        <Step n="04" title="Multimodal observations"/>
        <div className="sc-multi">
          <ul className="sc-streams">{STREAMS.map(s => <li key={s.key} className={`sc-m-${s.key}`}>
            <div className="sc-stream-head"><s.icon size={16} strokeWidth={1.5} aria-hidden="true"/><strong>{s.title}</strong><small>{s.text}</small></div>
            <StreamVisual kind={s.key}/>
          </li>)}</ul>
          <p>Real data from one demonstration, all at the same moment.</p>
        </div>
      </div>
      <Link/>
      <div className="sc-col learn">
        <Step n="05" title="Record and learn"/>
        <div className="sc-record">
          <Database size={26} strokeWidth={1.4} aria-hidden="true"/>
          <strong>One recording format</strong>
          <small>Teleoperation, policy rollouts and human corrections, in <span className="sc-nowrap">Open-X-Tactile</span></small>
        </div>
        <div className="sc-learn">
          <div><strong>Imitation learning</strong><small>Diffusion Policy, Flow Matching</small></div>
          <div><strong>Reinforcement learning</strong><small>PPO, asymmetric PPO, SAPG, teacher–student</small></div>
        </div>
      </div>
      <div className="sc-loop" aria-hidden="true"><span>Trained policies return as command sources</span></div>
    </div>
  </figure>;
}
