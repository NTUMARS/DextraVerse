import type { Metadata } from 'next';
import { Dataset } from '../dataset';
import { PageIntro, SiteFooter, SiteNav } from '../site-chrome';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Dataset — DextraVerse' };

const CONTENTS = [
  ['Cameras', 'Head and both wrist cameras, 320 × 240', 'Front, top and head cameras, 224 × 224'],
  ['Fingertip tactile', 'Sensor maps for all ten fingertips, 24 × 24', 'Synthetic deformation maps, 24 × 24'],
  ['Contact force', 'Force vector per fingertip', 'Simulated contact force per fingertip'],
  ['Robot state', 'Arm and hand joints, end-effector poses', 'Arm and hand joints, end-effector and object poses'],
  ['Actions', 'Joint targets', 'Joint targets'],
];

export default function DatasetPage() {
  return <><SiteNav active="dataset"/>
    <main id="top">
      <PageIntro title="Dataset." accent="Real and Simulated, One Format." lead="Two real-robot tasks and three simulated tasks from the same bimanual embodiment, released together so that tactile learning can be studied across both."/>
      <Dataset/>
      <section className="section dataset-details" aria-labelledby="dataset-contents-title">
        <h2 id="dataset-contents-title">What an Episode Holds.</h2>
        <div className="dataset-table-wrap"><table className="dataset-table">
          <thead><tr><th scope="col">Channel</th><th scope="col">Real robot</th><th scope="col">Simulation</th></tr></thead>
          <tbody>{CONTENTS.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody>
        </table></div>
        <p className="dataset-note">The real and simulated parts share the robot, the hand-joint order and the wrist-frame convention. They differ in sensors, cameras and tactile group names; the dataset card on Hugging Face lists every array and the known limitations.</p>
        <h2 className="dataset-download-title">Download.</h2>
        <pre className="dataset-code"><code>{`pip install -U huggingface_hub
hf download ntumars/DextraVerse --repo-type dataset --local-dir DextraVerse
cd DextraVerse && sha256sum -c SHA256SUMS.txt
unzip DextraVerse/stack_cube.zarr.zip        # 3.5 GB, the smallest archive`}</code></pre>
        <p className="dataset-note">Each task is one zarr archive in the Open-X-Tactile layout. The archives range from 3.5 GB to 42 GB. Licensed under CC BY 4.0.</p>
      </section>
    </main>
    <SiteFooter/></>;
}
