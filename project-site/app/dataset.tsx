'use client';

import { assetUrl } from '@/lib/asset-url';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const DATASET_URL = 'https://huggingface.co/datasets/ntumars/DextraVerse';

const TASKS = [
  { id: 'pick_cube_place_box', name: 'Pick cube, place in box', kind: 'Real robot', episodes: 261, frames: '138,382', text: 'Pick up a cube and place it in a box.' },
  { id: 'unscrew_bottle_cap', name: 'Unscrew bottle cap', kind: 'Real robot', episodes: 56, frames: '16,417', text: 'Hold a bottle with one hand and unscrew its cap with the other.' },
  { id: 'handover', name: 'Handover', kind: 'Simulation', episodes: 100, frames: '57,681', text: 'Pass a wooden frame from one hand to the other.' },
  { id: 'pick_and_place', name: 'Pick and place', kind: 'Simulation', episodes: 100, frames: '41,684', text: 'Grasp an object and place it in a box.' },
  { id: 'stack_cube', name: 'Stack cube', kind: 'Simulation', episodes: 100, frames: '36,369', text: 'Place one cube on top of another.' },
] as const;

const VIEWS = [
  { id: 'cameras', label: 'Cameras', text: 'The three camera views recorded in every frame.' },
  { id: 'tactile', label: 'Fingertip tactile', text: 'Pressure map and contact force for the ten fingertips.' },
  { id: 'end_effector', label: 'End-effector', text: 'Both wrist poses: the path in 3D and x, y, z over time.' },
] as const;

type TaskId = (typeof TASKS)[number]['id'];
type ViewId = (typeof VIEWS)[number]['id'];

export function Dataset() {
  const [task, setTask] = useState<TaskId>(TASKS[0].id);
  const [view, setView] = useState<ViewId>('cameras');
  const video = useRef<HTMLVideoElement>(null);
  const resumeAt = useRef(0);
  const current = TASKS.find(t => t.id === task)!;
  const currentView = VIEWS.find(v => v.id === view)!;

  // The three views of a task show the same episode, so keep the playback position when the view changes.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const at = resumeAt.current;
    const start = () => {
      if (at > 0 && at < el.duration) el.currentTime = at;
      el.play().catch(() => {});
    };
    el.addEventListener('loadedmetadata', start, { once: true });
    el.load();
    return () => el.removeEventListener('loadedmetadata', start);
  }, [task, view]);

  const chooseTask = (id: TaskId) => { resumeAt.current = 0; setTask(id); };
  const chooseView = (id: ViewId) => { resumeAt.current = video.current?.currentTime ?? 0; setView(id); };

  return <section className="section dataset" id="dataset" aria-labelledby="dataset-title">
    <div className="dataset-heading">
      <h2 id="dataset-title">Open Dataset. <em>Five Tasks.</em></h2>
      <a className="dataset-link" href={DATASET_URL} target="_blank" rel="noreferrer">Download on Hugging Face <ArrowUpRight size={16}/></a>
    </div>
    <p className="dataset-lead">617 episodes and 290,533 frames with camera images, joint states, end-effector poses, actions and fingertip tactile maps for both hands, in the Open-X-Tactile format under CC BY 4.0. Choose a task, then the data to preview.</p>
    <div className="dataset-explorer">
      <div className="dataset-tasks" role="tablist" aria-label="Task">
        {TASKS.map(t => <button key={t.id} type="button" role="tab" aria-selected={t.id === task} onClick={() => chooseTask(t.id)}>
          <strong>{t.name}</strong><span>{t.kind} · {t.episodes} episodes</span>
        </button>)}
      </div>
      <div className="dataset-player">
        <div className="dataset-views" role="tablist" aria-label="Data to preview">
          {VIEWS.map(v => <button key={v.id} type="button" role="tab" aria-selected={v.id === view} onClick={() => chooseView(v.id)}>{v.label}</button>)}
        </div>
        <video ref={video} playsInline muted loop controls preload="metadata" src={assetUrl(`/media/dataset/${task}_${view}.mp4`)} poster={view === 'cameras' ? assetUrl(`/media/dataset/${task}_cameras.jpg`) : undefined} aria-label={`${current.name}: ${currentView.label}`}/>
        <div className="dataset-copy">
          <h3>{current.name}</h3>
          <p><span className={current.kind === 'Real robot' ? 'environment real' : 'environment'}>{current.kind}</span>{current.text} {current.episodes} episodes · {current.frames} frames.</p>
          <p className="dataset-view-note">{currentView.text} One episode, played in real time; the three previews are the same episode.</p>
        </div>
      </div>
    </div>
  </section>;
}
