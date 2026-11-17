import { assetUrl } from '@/lib/asset-url';
import { ArrowUpRight } from 'lucide-react';

const DATASET_URL = 'https://huggingface.co/datasets/ntumars/DextraVerse';

const TASKS = [
  { file: 'pick_cube_place_box', name: 'Pick cube, place in box', kind: 'Real robot', episodes: 261, frames: '138,382' },
  { file: 'unscrew_bottle_cap', name: 'Unscrew bottle cap', kind: 'Real robot', episodes: 56, frames: '16,417' },
  { file: 'handover', name: 'Handover', kind: 'Simulation', episodes: 100, frames: '57,681' },
  { file: 'pick_and_place', name: 'Pick and place', kind: 'Simulation', episodes: 100, frames: '41,684' },
  { file: 'stack_cube', name: 'Stack cube', kind: 'Simulation', episodes: 100, frames: '36,369' },
];

export function Dataset() {
  return <section className="section dataset" id="dataset" aria-labelledby="dataset-title">
    <div className="dataset-heading">
      <h2 id="dataset-title">Open Dataset. <em>Five Tasks.</em></h2>
      <a className="dataset-link" href={DATASET_URL} target="_blank" rel="noreferrer">Download on Hugging Face <ArrowUpRight size={16}/></a>
    </div>
    <p className="dataset-lead">617 episodes and 290,533 frames with camera images, joint states, actions and fingertip tactile maps for both hands, in the Open-X-Tactile format under CC BY 4.0. Each video plays one episode in real time.</p>
    <div className="dataset-grid">
      {TASKS.map(task => <article key={task.file} className="dataset-card">
        <video autoPlay playsInline muted loop preload="metadata" src={assetUrl(`/media/dataset/${task.file}.mp4`)} poster={assetUrl(`/media/dataset/${task.file}.jpg`)} aria-label={`${task.name}: one episode with its cameras and fingertip tactile maps`}/>
        <div className="dataset-copy">
          <h3>{task.name}</h3>
          <p><span className={task.kind === 'Real robot' ? 'environment real' : 'environment'}>{task.kind}</span>{task.episodes} episodes · {task.frames} frames</p>
        </div>
      </article>)}
    </div>
  </section>;
}
