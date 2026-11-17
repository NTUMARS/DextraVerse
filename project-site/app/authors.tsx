// Author links from the MARS Lab people page (https://marslab.tech/people/).
export const AUTHORS = [
  { name: 'Xiangyu Chen', equal: true, href: 'https://xyc0212.github.io/' },
  { name: 'Chuhao Zhou', equal: true, href: 'https://chuhaozhou99.github.io/Chuhao-Zhou/' },
  { name: 'Jiaxiao Shi', equal: true, href: 'https://jxxsteven7.github.io/' },
  { name: 'Yuxuan Hu', equal: false, href: 'https://scholar.google.com/citations?user=F6HMENYAAAAJ&hl=en' },
  { name: 'Yue Yang', equal: false },
  { name: 'Jianfei Yang', equal: false, corresponding: true, href: 'https://marsyang.site/' },
];

export function AuthorList() {
  return <>{AUTHORS.map((a, i) => <span key={a.name}>
    {a.href ? <a href={a.href} target="_blank" rel="noreferrer">{a.name}</a> : a.name}
    {a.equal && <sup>*</sup>}{'corresponding' in a && <sup>†</sup>}{i < AUTHORS.length - 1 ? ', ' : ''}
  </span>)}</>;
}
