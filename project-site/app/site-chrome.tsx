import { assetUrl } from '@/lib/asset-url';
import { ArrowUpRight } from 'lucide-react';

export const PAGES = [
  { id: 'system', label: 'System', href: '/system/', summary: 'A 58-DoF bimanual robot, interchangeable wrist and hand interfaces, and fixed-rate control, image and tactile streams.' },
  { id: 'simulation', label: 'Simulation', href: '/simulation/', summary: 'A matched Isaac Lab model with simulated fingertip sensing, imitation tasks and reinforcement-learning skills.' },
  { id: 'policy', label: 'Policy', href: '/policy/', summary: 'Imitation and reinforcement learning on shared interfaces, with tactile representation benchmarks and tactile rewards.' },
  { id: 'tactile', label: 'Tactile', href: '/tactile/', summary: 'What the tactile studies show so far: six findings across imitation and reinforcement learning, with the numbers behind them.' },
  { id: 'dataset', label: 'Dataset', href: '/dataset/', summary: 'Five open tasks, 617 episodes, with cameras, joints, actions and fingertip tactile maps for both hands.' },
  { id: 'gallery', label: 'Gallery', href: '/gallery/', summary: 'Moments from building the platform, month by month, from the first simulated grasp to the open dataset.' },
  { id: 'papers', label: 'Papers', href: '/papers/', summary: 'The DextraVerse paper and the lab papers whose methods are built into the platform.' },
  { id: 'wiki', label: 'Wiki', href: '/wiki/', summary: 'How the platform is organised: layers, interfaces, recorded data, supported algorithms and AI-assisted development.' },
] as const;

export type PageId = (typeof PAGES)[number]['id'] | 'home';

export function SiteNav({ active }: { active: PageId }) {
  return <header className="site-header">
    <a className="site-brand" href={assetUrl('/')} aria-label="DextraVerse home"><img src={assetUrl('/media/logo-v2.svg')} alt=""/><span>DextraVerse</span></a>
    <nav className="site-nav" aria-label="Sections">
      {PAGES.map(page => <a key={page.id} href={assetUrl(page.href)} aria-current={active === page.id ? 'page' : undefined}>{page.label}</a>)}
    </nav>
    <nav className="site-resources" aria-label="Project resources">
      <a href={assetUrl('/media/DextraVerse.pdf')} target="_blank" rel="noreferrer">Paper <ArrowUpRight size={15}/></a>
      <a href={assetUrl('/media/introduction.mp4')} target="_blank" rel="noreferrer">Video <ArrowUpRight size={15}/></a>
      <a href="https://playreviewer2.com/" target="_blank" rel="noreferrer" title="Reviewer 2, an academic party game">Reviewer 2 <ArrowUpRight size={15}/></a>
    </nav>
  </header>;
}

export function PageIntro({ title, accent, lead }: { title: string; accent: string; lead: string }) {
  return <div className="page-intro"><h1>{title} <em>{accent}</em></h1><p>{lead}</p></div>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-supporters" aria-label="Supported by">
      <span>Supported by</span>
      <img src={assetUrl('/media/partners/nvidia.svg')} alt="NVIDIA" className="logo-nvidia"/>
      <img src={assetUrl('/media/partners/delta.svg')} alt="Delta Electronics" className="logo-delta"/>
    </div>
    <div className="footer-bottom">
    <a className="brand" href={assetUrl('/')}>DextraVerse<span className="brand-dot">.</span></a>
    <span>A unified platform for dexterous manipulation research · MARS Lab, Nanyang Technological University</span>
    <div className="footer-links"><a href="#top">Back to top ↑</a></div>
  </div></footer>;
}
