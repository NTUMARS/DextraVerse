import { SystemChart } from './system-chart';

export function HardwareAndData() {
  return <section className="section hardware-data" id="multimodal-sensing" aria-labelledby="hardware-title">
    <h2 id="hardware-title">Modular Hardware. <em>Shared Interfaces.</em></h2>
    <p className="hardware-lead">Every command source drives the robot through the same control interface, in simulation or on the real robot. Every episode records <strong>vision, touch, proprioception and actions</strong> together, in one format.</p>
    <SystemChart/>
  </section>;
}
