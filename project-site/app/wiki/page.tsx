import type { Metadata } from 'next';
import { AICoding } from '../ai-coding';
import { SiteFooter, SiteNav } from '../site-chrome';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Wiki — DextraVerse' };

const TOC = [
  ['overview', 'Overview'],
  ['hardware', 'Hardware'],
  ['control', 'Control interfaces'],
  ['data', 'Recorded data'],
  ['imitation', 'Imitation learning'],
  ['reinforcement', 'Reinforcement learning'],
  ['ai-development', 'AI-assisted development'],
  ['release', 'Release status'],
  ['citation', 'Citation'],
];
const CONFIGS = [
  ['Vive Tracker', 'Data gloves', 'Full human control of wrist and fingers'],
  ['Vive Tracker', 'VR hand tracking', 'No gloves; fingers tracked by the headset'],
  ['Vive Tracker', 'RL hand skill', 'Operator moves the wrist, a learned skill grasps and releases'],
  ['SpaceMouse', 'RL hand skill', 'Desk-side collection, about 75 demonstrations per hour'],
];
const RELEASE = [
  ['Paper', 'Available', 'Linked at the top of every page'],
  ['Dataset', 'Available', 'Hugging Face, ntumars/DextraVerse, CC BY 4.0'],
  ['Project website', 'Available', 'This site'],
  ['Platform code', 'In preparation', 'Will be released in the NTUMARS/DextraVerse repository'],
];
const BIBTEX = `@misc{chen2026dextraverse,
  title  = {DextraVerse: A Unified Platform for Tactile-Rich Bimanual Dexterous Manipulation},
  author = {Chen, Xiangyu and Zhou, Chuhao and Shi, Jiaxiao and Hu, Yuxuan and Yang, Yue and Yang, Jianfei},
  year   = {2026},
  note   = {MARS Lab, Nanyang Technological University},
  url    = {https://ntumars.github.io/DextraVerse/}
}`;

export default function WikiPage() {
  return <><SiteNav active="wiki"/>
    <main id="top"><div className="wiki">
      <aside className="wiki-toc" aria-label="On this page"><p>On this page</p><ul>{TOC.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul></aside>
      <article className="wiki-body">
        <h1>DextraVerse Wiki</h1>
        <p className="wiki-lead">A reference for how the platform is organised. It follows the paper and will grow with the code release.</p>

        <h2 id="overview">Overview</h2>
        <p>DextraVerse has three layers. The <strong>control interface</strong> generates commands through teleoperation or policy inference. <strong>Robot execution</strong> applies those commands in simulation or on hardware and returns multimodal observations. <strong>Policy learning</strong> trains imitation-learning policies and reinforcement-learning skills for control.</p>
        <p>Shared data structures and control interfaces connect the layers, so a sensing, control or learning component built for one workflow can be reused in another.</p>

        <h2 id="hardware">Hardware</h2>
        <ul>
          <li><strong>Robot:</strong> Dexmate Vega with two 7-DoF arms.</li>
          <li><strong>Hands:</strong> two 22-DoF Sharpa dexterous hands with fingertip visual-tactile sensing.</li>
          <li><strong>Cameras:</strong> a head camera and one camera on each wrist.</li>
          <li><strong>Simulation:</strong> an Isaac Lab model that preserves the robot geometry and kinematics.</li>
        </ul>

        <h2 id="control">Control interfaces</h2>
        <p>Teleoperation is split into wrist control and hand control. Six-DoF wrist targets come from Vive trackers or from incremental Cartesian commands of a 3D SpaceMouse, and are converted to arm joint targets by inverse kinematics. Hand targets come from VR hand tracking or data gloves retargeted to the robot fingers, or from a learned hand skill.</p>
        <div className="wiki-table-wrap"><table>
          <thead><tr><th scope="col">Wrist</th><th scope="col">Hand</th><th scope="col">Use</th></tr></thead>
          <tbody>{CONFIGS.map(row => <tr key={row[0] + row[1]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody>
        </table></div>
        <p>Because the arm and the hand can be assigned to separate pipelines, an operator can correct the arm while a learned controller keeps control of the hand.</p>

        <h2 id="data">Recorded data</h2>
        <p>Every supported teleoperation device records through one interface. An episode holds multi-view RGB images, arm and hand proprioception, end-effector poses and the configured fingertip tactile inputs: force magnitude, force direction and deformation maps. Actions are stored as joint targets under the control conventions that teleoperation and policy execution share.</p>
        <p>Data validity is checked during collection. Embodiment, action and sensing configurations are verified for compatibility before demonstrations are merged. Human corrections made during policy deployment are recorded through the same interface, next to the policy actions they replace.</p>

        <h2 id="imitation">Imitation learning</h2>
        <p>The imitation-learning framework pairs a task suite with configurable algorithms and sensory inputs. Supported policy families:</p>
        <ul>
          <li>Diffusion Policy (DP)</li>
          <li>Flow Matching (FM) policies</li>
          <li>Action Chunking with Transformers (ACT)</li>
          <li>MeanFlow-based policies</li>
          <li>Action-to-Action flow matching (A2A)</li>
        </ul>
        <p>Shared data and evaluation interfaces allow algorithms to be compared on one task, and sensory inputs to be varied within one algorithm. Trained policies run through the shared control interface in simulation and on the robot.</p>

        <h2 id="reinforcement">Reinforcement learning</h2>
        <p>Dexterous skills are trained in simulation with configurable tactile observations and modular rewards. Each reward term has three attributes:</p>
        <ul>
          <li>a <strong>semantic identity</strong>: the behaviour or condition being rewarded;</li>
          <li>a <strong>reward role</strong>: shaping, terminal or penalty;</li>
          <li>a reusable <strong>mathematical kernel</strong> that defines its computation.</li>
        </ul>
        <p>The skill library covers grasping, in-hand manipulation and bimanual manipulation. A skill specification links a reward objective to its training protocol and evaluation settings: curricula, randomisation, seeds and task metrics. Learned controllers are available to the other components through the shared control interface.</p>
      </article>
    </div>
    <AICoding/>
    <div className="wiki wiki-tail">
      <div className="wiki-toc" aria-hidden="true"/>
      <article className="wiki-body">
        <p>Repository Retrieval Maps guide a coding agent from a global package index to subsystem maps that name the relevant implementations, interfaces and tests. Interface definitions specify observation shapes, coordinate frames and joint orderings. Machine-readable configurations, automated checks and run metadata support validation and reproduction.</p>

        <h2 id="release">Release status</h2>
        <div className="wiki-table-wrap"><table>
          <thead><tr><th scope="col">Item</th><th scope="col">Status</th><th scope="col">Where</th></tr></thead>
          <tbody>{RELEASE.map(row => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody>
        </table></div>

        <h2 id="citation">Citation</h2>
        <pre className="dataset-code"><code>{BIBTEX}</code></pre>
      </article>
    </div></main>
    <SiteFooter/></>;
}
