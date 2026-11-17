import { assetUrl } from '@/lib/asset-url';
import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '../site-chrome';
import { GalleryVideo } from './gallery-video';
import { SceneEvolution } from './scene-evolution';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Gallery — DextraVerse' };

type Item = { id: string; title: string; note: string; image?: boolean; contain?: boolean; src?: string };

const MONTHS: { when: string; items: Item[] }[] = [
  { when: 'July 2026', items: [
    { id: 'gallery/2026-07-tool-use', title: 'Thousands of robots, one tool', note: 'Tool use learned in parallel simulations.' },
    { id: 'gallery/2026-07-first-touch', title: 'First touch', note: 'The first fingertip contact signals from simulation.', contain: true },
    { id: 'gallery/2026-07-grasp-angles', title: 'Grasping from every angle', note: 'Grasp closure from many wrist orientations.' },
  ] },
  { when: 'August 2026', items: [
    { id: 'gallery/2026-08-first-images', title: 'The robot opens its eyes', note: 'An early frame from the head camera.', image: true },
    { id: 'gallery/2026-08-cube-grasp', title: 'Learning to grasp', note: 'A PPO grasp policy on the SharpaWave hand.' },
    { id: 'gallery/2026-08-first-real-grasp', title: 'First real grasp', note: 'The real robot lifts a cube, seen from its wrist.' },
  ] },
  { when: 'September 2026', items: [
    { id: 'gallery/2026-09-inhand-rotation', title: 'Turning a cube in hand', note: 'Filmed for the paper submission.' },
    { id: 'gallery/2026-09-rod', title: 'Two hands, one rod', note: 'Bimanual rod lifting for the paper.' },
    { id: 'gallery/2026-09-hifi-hand', title: 'A more detailed hand', note: 'The high-fidelity hand model becomes the default.' },
  ] },
  { when: 'October 2026', items: [
    { id: 'gallery/2026-10-pose-change', title: 'Re-posing a held object', note: 'Changing the object pose without losing the grasp.' },
    { id: 'gallery/2026-10-soft-cup', title: 'Squeezing a soft cup', note: 'Fingertip deformation maps on a soft cup.', contain: true },
    { id: 'hero-v2', title: 'Unscrewing a bottle cap', note: 'Real-robot demonstrations for the open dataset.' },
  ] },
  { when: 'In the lab', items: [
    { id: 'gallery/teleop-in-lab', title: 'Driving the robot', note: 'An operator controls both arms and hands.' },
    { id: 'teleoperation/tracker-vr', title: 'Hands from a headset', note: 'Wrist trackers with VR hand tracking.' },
    { id: 'teleoperation/spacemouse-rl', title: 'A SpaceMouse and a learned hand', note: 'The operator moves the wrist; an RL skill grasps.' },
  ] },
];

export default function GalleryPage() {
  return <><SiteNav active="gallery"/>
    <main id="top">
      <section className="section gallery-page gallery-head" aria-labelledby="gallery-title">
        <h1 id="gallery-title">Gallery. <em>How we got here.</em></h1>
        <p className="gallery-lead">Moments from building DextraVerse, from the first simulated grasp to the open dataset.</p>
      </section>
      <SceneEvolution/>
      <section className="section gallery-months" aria-label="Moments by month">
        {MONTHS.map(month => <div className="gallery-month" key={month.when}>
          <h2>{month.when}</h2>
          <div className="gallery-grid">{month.items.map(item => <figure key={item.id} className="gallery-card">
            <div className="gallery-media">
              {item.image
                ? <img src={assetUrl(`/media/${item.id}.jpg`)} alt={item.title} loading="lazy"/>
                : <GalleryVideo src={assetUrl(`/media/${item.id}.mp4`)} poster={assetUrl(`/media/${item.id}.jpg`)} label={item.title} fit={item.contain ? 'contain' : 'cover'}/>}
            </div>
            <figcaption><strong>{item.title}</strong><span>{item.note}</span></figcaption>
          </figure>)}</div>
        </div>)}
      </section>
    </main>
    <SiteFooter/></>;
}
