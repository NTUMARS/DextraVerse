import { Fingerprint, Hand, Images, Move3D } from 'lucide-react';

const STREAMS = [
  {
    icon: Move3D,
    name: 'Arm control stream',
    rate: '100',
    unit: 'Hz',
    description: 'Joint setpoints for both 7-DoF arms, smoothed from the 60 Hz teleoperation loop.',
    evidence: 'Measured: 99th-percentile interval 10.9 ms or better in four rig runs',
  },
  {
    icon: Hand,
    name: 'Hand control stream',
    rate: '200',
    unit: 'Hz',
    description: 'Joint targets streamed to each 22-DoF hand in impedance mode.',
    evidence: 'Measured: 5.0 ms median interval, 167–181 Hz delivered',
  },
  {
    icon: Images,
    name: 'Image stream',
    rate: '30',
    unit: 'fps',
    description: 'Head stereo camera and both wrist cameras.',
    evidence: 'Measured: 29.9 fps on all four camera streams',
  },
  {
    icon: Fingerprint,
    name: 'Tactile stream',
    rate: '30',
    unit: 'Hz',
    description: 'Fingertip tactile frames from both hands.',
    evidence: 'Measured: 26–30 Hz per hand across seven demonstrations',
  },
];

export function Streams() {
  return <section className="section streams" id="streams" aria-labelledby="streams-title">
    <h2 id="streams-title">Stable Streams. <em>Real-Time Control.</em></h2>
    <p className="streams-lead">Arm control, hand control, images and tactile sensing each run in their own process at a fixed rate, so recording, visualisation or a slow sensor does not hold the robot back.</p>
    <div className="stream-grid">
      {STREAMS.map(stream => <article key={stream.name} className="stream-card">
        <div className="stream-name"><stream.icon size={22} strokeWidth={1.5} aria-hidden="true"/><h3>{stream.name}</h3></div>
        <p className="stream-rate"><strong>{stream.rate}</strong><span>{stream.unit}</span></p>
        <p className="stream-description">{stream.description}</p>
        <p className="stream-evidence">{stream.evidence}</p>
      </article>)}
    </div>
    <p className="streams-note">Measured on the robot in November 2026. The 60 Hz teleoperation loop held 60.0 Hz with a 99th-percentile interval under 19 ms over 161,000 cycles. Recording runs at 30 Hz and every sample carries its own timestamp.</p>
  </section>;
}
