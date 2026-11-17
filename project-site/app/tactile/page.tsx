import { assetUrl } from '@/lib/asset-url';
import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '../site-chrome';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Tactile — DextraVerse' };

const CONFIGS = [
  { name: 'No touch', has: [false, false, false] },
  { name: 'Magnitude', has: [true, false, false] },
  { name: 'Magnitude + direction', has: [true, true, false] },
  { name: 'Maps', has: [false, false, true] },
  { name: 'Maps + magnitude', has: [true, false, true] },
  { name: 'All three', has: [true, true, true] },
];
const SIGNALS = [
  { name: 'Force magnitude', shape: 'how hard · 1 value per fingertip' },
  { name: 'Force direction', shape: 'which way · 3D vector per fingertip' },
  { name: 'Deformation map', shape: 'where · 24 × 24 image per fingertip' },
];
const BLOB = [0, 0, 1, 0, 0, 2, 3, 1, 0, 1, 3, 2, 0, 0, 1, 0];

function Glyph({ kind, on }: { kind: number; on: boolean }) {
  const c = on ? '#b65313' : '#ddd5cd';
  if (kind === 0) return <svg viewBox="0 0 40 40" aria-hidden="true">
    <path d="M6 29 A14 14 0 0 1 34 29" fill="none" stroke={c} strokeWidth={3.5} strokeLinecap="round" opacity={on ? 0.35 : 1}/>
    <path d="M6 29 A14 14 0 0 1 29.9 19.1" fill="none" stroke={c} strokeWidth={3.5} strokeLinecap="round"/>
    <path d="M20 29 L25.5 17.5" stroke={c} strokeWidth={2.6} strokeLinecap="round"/>
    <circle cx={20} cy={29} r={3.4} fill={c}/>
  </svg>;
  if (kind === 1) return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M9 31 L28 12" stroke={c} strokeWidth={3.5} strokeLinecap="round"/><path d="M17 10 H30 V23" fill="none" stroke={c} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return <svg viewBox="0 0 40 40" aria-hidden="true">{BLOB.map((v, i) => <rect key={i} x={4 + (i % 4) * 8.2} y={4 + Math.floor(i / 4) * 8.2} width={7} height={7} rx={1.5} fill={c} opacity={on ? [0.18, 0.45, 0.75, 1][v] : 1}/>)}</svg>;
}
// Results from the paper. Imitation: success %, reinforcement: task score %, tool use: goals reached.
const COLUMNS = [
  { group: 'Imitation learning', name: 'Pick-and-place', unit: '%' },
  { group: 'Imitation learning', name: 'Handover', unit: '%' },
  { group: 'Imitation learning', name: 'Cube stacking', unit: '%' },
  { group: 'Reinforcement learning', name: 'Cube grasping', unit: '%' },
  { group: 'Reinforcement learning', name: 'In-hand rotation', unit: '%' },
  { group: 'Reinforcement learning', name: 'Rod lifting', unit: '%' },
  { group: 'Tool use · goals reached', name: 'Best checkpoint', unit: 'goals' },
  { group: 'Tool use · goals reached', name: 'Final checkpoint', unit: 'goals' },
] as const;
const RESULTS = [
  [36.7, 16.7, 1.1, 71.7, 89.5, 40.5, 0.5, 0.61],
  [47.8, 11.1, 3.3, 91.1, 89.4, 23.2, 0.6, 0.41],
  [42.2, 18.9, 2.2, 92.9, 93.6, 68.4, 0.22, 0.29],
  [52.2, 7.8, 0.0, 88.5, 88.2, 45.7, 1.09, 0.94],
  [40.0, 11.1, 3.3, 86.6, 84.5, 66.3, 0.95, 0.46],
  [17.8, 10.0, 11.1, 91.1, 93.8, 77.7, 2.5, 0.48],
];
// Colour scale: change against no touch, saturating at 40 points (%) or 2 goals.
const SCALE = { '%': 40, goals: 2 } as const;
const GROUPS = ['Imitation learning', 'Reinforcement learning', 'Tool use · goals reached'];

function cellStyle(row: number, col: number): React.CSSProperties {
  if (row === 0) return { background: '#f4f0ed' };
  const delta = RESULTS[row][col] - RESULTS[0][col];
  const level = Math.min(Math.abs(delta) / SCALE[COLUMNS[col].unit], 1);
  if (level < 0.02) return {};
  const alpha = 0.1 + 0.75 * level;
  const rgb = delta > 0 ? '182,83,19' : '63,116,168';
  return { background: `rgba(${rgb},${alpha.toFixed(2)})`, color: alpha > 0.5 ? '#fff' : undefined };
}

const TILES = [
  { n: '01', title: 'Force cues help everywhere', stat: '6 / 6', note: 'tasks where magnitude + direction (T2) beats no touch' },
  { n: '02', title: 'Maps are hit or miss', stat: '−19 to +16', note: 'points of imitation success, depending on the task' },
  { n: '03', title: 'All three is the steadiest', stat: '±4', note: 'spread of T5 on rod lifting, against ±16 to ±39 for the rest' },
  { n: '04', title: 'Map gains fade', stat: '2.50 → 0.48', note: 'tool-use goals for T5, best checkpoint to end of training' },
  { n: '05', title: 'Maps cost memory', stat: '+13–33%', note: 'GPU memory for map inputs; force cues add about 1%' },
  { n: '06', title: 'Touch reshapes the grasp', stat: '37% → 94%', note: 'grasps with all four fingers on the object, with a contact reward' },
];

const TOOL_USE = [
  ['T0', '70.0 ± 2.0', '69.0 ± 1.0', '0.50 ± 0.03', '0.61 ± 0.05'],
  ['T1', '67.0 ± 1.0', '54.0 ± 1.0', '0.60 ± 0.03', '0.41 ± 0.03'],
  ['T2', '73.0 ± 2.0', '71.0 ± 1.0', '0.22 ± 0.04', '0.29 ± 0.04'],
  ['T3', '71.0 ± 0.0', '69.0 ± 1.0', '1.09 ± 0.08', '0.94 ± 0.02'],
  ['T4', '72.0 ± 1.0', '66.0 ± 3.0', '0.95 ± 0.02', '0.46 ± 0.01'],
  ['T5', '77.0 ± 1.0', '55.0 ± 1.0', '2.50 ± 0.05', '0.48 ± 0.02'],
];
const TOOL_BEST = [[5], [2], [5], [3]];
const REWARD = [['Episode success', '79.7%', '84.4%'], ['All four fingers touch', '36.8%', '94.4%'], ['Pinky flexion offset', '+0.525', '−0.018'], ['Contact onset spread (steps)', '13.0', '10.5']];

export default function TactilePage() {
  return <><SiteNav active="tactile"/>
    <main id="top">
      <section className="section tactile-page" aria-labelledby="tactile-page-title">
        <h1 id="tactile-page-title">What touch adds. <em>And where it does not.</em></h1>
        <div className="config-matrix-wrap"><table className="config-matrix">
          <caption>Six configurations, T0 to T5: what the policy receives from each fingertip.</caption>
          <thead><tr><td/>{CONFIGS.map((config, i) => <th scope="col" key={config.name}><strong>T{i}</strong><span>{config.name}</span></th>)}</tr></thead>
          <tbody>{SIGNALS.map((signal, row) => <tr key={signal.name}>
            <th scope="row"><strong>{signal.name}</strong><span>{signal.shape}</span></th>
            {CONFIGS.map(config => <td key={config.name} className={config.has[row] ? 'on' : undefined}><Glyph kind={row} on={config.has[row]}/><span className="sr-only">{config.has[row] ? 'included' : 'not included'}</span></td>)}
          </tr>)}</tbody>
        </table></div>

        <h2 className="tactile-sub">Six findings.</h2>
        <ol className="tile-grid">{TILES.map(tile => <li key={tile.n}>
          <span className="tile-title"><b>{tile.n}</b>{tile.title}</span>
          <strong className="tile-stat">{tile.stat}</strong>
          <span className="tile-note">{tile.note}</span>
        </li>)}</ol>
        <p className="tactile-takeaway"><strong>Takeaway.</strong> Use force magnitude and direction by default. Deformation maps are promising but need better encoding to pay off consistently.</p>

        <h2 className="tactile-sub">Every result at a glance.</h2>
        <div className="heat-wrap"><table className="heat">
          <thead>
            <tr><td/>{GROUPS.map(group => <th key={group} scope="colgroup" colSpan={COLUMNS.filter(c => c.group === group).length}>{group}</th>)}</tr>
            <tr><td/>{COLUMNS.map(col => <th key={col.name} scope="col">{col.name}</th>)}</tr>
          </thead>
          <tbody>{RESULTS.map((values, row) => <tr key={row}>
            <th scope="row"><strong>T{row}</strong>{CONFIGS[row].name}</th>
            {values.map((value, col) => <td key={col} style={cellStyle(row, col)}>{COLUMNS[col].unit === '%' ? value.toFixed(1) : value.toFixed(2)}</td>)}
          </tr>)}</tbody>
        </table></div>
        <div className="heat-legend" aria-hidden="true"><span>worse than no touch</span><i/><span>better than no touch</span></div>

        <details className="tactile-details">
          <summary>Full tables</summary>
          <h4>Tool use: lift rate and goals reached</h4>
          <div className="dataset-table-wrap"><table className="dataset-table tool-table">
            <thead>
              <tr><th scope="col" rowSpan={2}>Config.</th><th scope="colgroup" colSpan={2}>Lift rate (%) ↑</th><th scope="colgroup" colSpan={2}>Goals reached ↑</th></tr>
              <tr><th scope="col">Reward-best</th><th scope="col">Final</th><th scope="col">Reward-best</th><th scope="col">Final</th></tr>
            </thead>
            <tbody>{TOOL_USE.map((row, i) => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((value, j) => <td key={j} className={TOOL_BEST[j].includes(i) ? 'policy-best' : undefined}>{value}</td>)}</tr>)}</tbody>
          </table></div>
          <h4>Tactile contact reward on cube grasping</h4>
          <img className="tactile-grasp" src={assetUrl('/media/grasp-comparison.png')} alt="Baseline grasp with two fingers off the cube, and an enclosing grasp with the tactile reward"/>
          <div className="dataset-table-wrap"><table className="dataset-table tool-table">
            <thead><tr><th scope="col">Metric</th><th scope="col">Baseline</th><th scope="col">+ Contact reward</th></tr></thead>
            <tbody>{REWARD.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody>
          </table></div>
          <p>Means across three seeds; standard deviations are in the tables on the <a href={assetUrl('/policy/')}>Policy page</a>.</p>
        </details>
      </section>
    </main>
    <SiteFooter/></>;
}
