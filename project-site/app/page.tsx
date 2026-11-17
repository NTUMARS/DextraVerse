import { assetUrl } from '@/lib/asset-url';
import { ArrowRight } from 'lucide-react';
import { HeroMedia } from './experiences';
import { AuthorList } from './authors';
import { PAGES, SiteFooter, SiteNav } from './site-chrome';


const FACTS = [
  { value: '58', unit: 'DoF', label: 'two 7-DoF arms and two 22-DoF hands' },
  { value: '~75', unit: 'demos / h', label: 'collected by one operator with RL hand skills' },
  { value: '617', unit: 'episodes', label: 'in the open dataset, real and simulated' },
  { value: '51.3', unit: '%', label: 'fewer repository-inspection calls with retrieval maps' },
];

export default function Home() {
  return <><a className="skip" href="#platform">Skip to content</a>
    <SiteNav active="home"/>
    <main id="top">
      <section className="hero hero-focused" id="platform">
        <div className="hero-copy">
          <img className="hero-logo" src={assetUrl('/media/logo-v2.svg')} alt="DextraVerse"/>
          <h1>A Unified Platform for <span>Tactile-Rich Bimanual Dexterous Manipulation</span></h1>
          <p className="hero-authors"><AuthorList/></p>
          <div className="hero-orgs" aria-label="MARS Lab, Nanyang Technological University">
            <img src={assetUrl('/media/partners/marslab.png')} alt="MARS Lab" className="logo-marslab"/>
            <span className="ntu-mark"><img src={assetUrl('/media/partners/ntu-crest.png')} alt=""/><span>Nanyang Technological<br/>University, Singapore</span></span>
          </div>
          <p className="hero-affiliation"><span><sup>*</sup>Equal contribution · <sup>†</sup>Corresponding author, <a href="mailto:jianfei.yang@ntu.edu.sg">jianfei.yang@ntu.edu.sg</a></span></p>
        </div>
        <div className="hero-visual"><HeroMedia/></div>
      </section>
      <section className="section home-overview" aria-labelledby="overview-title">
        <h2 id="overview-title">One Platform. <em>Shared Interfaces.</em></h2>
        <p className="home-lead">DextraVerse connects teleoperation, multimodal sensing, imitation learning, reinforcement learning and execution in simulation and on real robots through shared control and data interfaces, so that findings can be compared across learning paradigms and components can be combined into new workflows.</p>
        <dl className="home-facts">{FACTS.map(fact => <div key={fact.label}><dt><strong>{fact.value}</strong><span>{fact.unit}</span></dt><dd>{fact.label}</dd></div>)}</dl>
        <div className="home-cards">
          {PAGES.map(page => <a key={page.id} className="home-card" href={assetUrl(page.href)}>
            <h3>{page.label}</h3>
            <p>{page.summary}</p>
            <span className="home-card-link">Open {page.label} <ArrowRight size={16}/></span>
          </a>)}
        </div>
      </section>
    </main>
    <SiteFooter/></>;
}
