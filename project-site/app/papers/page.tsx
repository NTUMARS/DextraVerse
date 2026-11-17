import { assetUrl } from '@/lib/asset-url';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { AuthorList } from '../authors';
import { SiteFooter, SiteNav } from '../site-chrome';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'Papers — DextraVerse' };

type Paper = {
  title: string;
  authors: string | 'dextraverse';
  venue: string;
  note?: string;
  image?: string;
  links: { label: string; href: string }[];
  bibtex?: string;
};

const SECTIONS: { title: string; papers: Paper[] }[] = [
  { title: 'The platform', papers: [{
    title: 'DextraVerse: A Unified Platform for Tactile-Rich Bimanual Dexterous Manipulation',
    authors: 'dextraverse',
    venue: '2026 · under review',
    note: '* Equal contribution · † Corresponding author (jianfei.yang@ntu.edu.sg)',
    image: '/media/papers/dextraverse.jpg',
    links: [
      { label: 'Paper', href: assetUrl('/media/DextraVerse.pdf') },
      { label: 'Dataset', href: 'https://huggingface.co/datasets/ntumars/DextraVerse' },
      { label: 'Website', href: 'https://ntumars.github.io/DextraVerse/' },
    ],
    bibtex: `@misc{chen2026dextraverse,
  title  = {DextraVerse: A Unified Platform for Tactile-Rich Bimanual Dexterous Manipulation},
  author = {Chen, Xiangyu and Zhou, Chuhao and Shi, Jiaxiao and Hu, Yuxuan and Yang, Yue and Yang, Jianfei},
  year   = {2026},
  url    = {https://ntumars.github.io/DextraVerse/}
}`,
  }] },
  { title: 'Built into DextraVerse', papers: [{
    title: 'Action-to-Action Flow Matching',
    authors: 'Jindou Jia, Gen Li, Xiangyu Chen, Tuo An, Yuxuan Hu, Jingliang Li, Xinying Guo, Jianfei Yang',
    venue: 'RSS 2026',
    note: 'Available as an imitation-learning policy (A2A) in DextraVerse.',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2602.07322' },
      { label: 'Proceedings', href: 'https://www.roboticsproceedings.org/rss22/p209.html' },
    ],
  }] },
];

export default function PapersPage() {
  return <><SiteNav active="papers"/>
    <main id="top">
      <section className="section papers-page" aria-labelledby="papers-title">
        <h1 id="papers-title">Papers. <em>Built on DextraVerse.</em></h1>
        {SECTIONS.map(section => <div className="papers-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.papers.map(paper => <article className={paper.image ? 'paper-card' : 'paper-card no-image'} key={paper.title}>
            {paper.image && <img src={assetUrl(paper.image)} alt="" loading="lazy"/>}
            <div className="paper-body">
              <span className="paper-venue">{paper.venue}</span>
              <h3>{paper.title}</h3>
              <p className="paper-authors">{paper.authors === 'dextraverse' ? <AuthorList/> : paper.authors}</p>
              {paper.note && <p className="paper-note">{paper.note}</p>}
              <div className="paper-links">{paper.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={14}/></a>)}</div>
              {paper.bibtex && <details className="paper-bib"><summary>BibTeX</summary><pre className="dataset-code"><code>{paper.bibtex}</code></pre></details>}
            </div>
          </article>)}
        </div>)}
      </section>
    </main>
    <SiteFooter/></>;
}
