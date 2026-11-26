// NusaStat router — hash routes, one page per route, every control working.
//   #/                home
//   #/penduduk        population & demography
//   #/ekonomi         economy
//   #/bandingkan      compare provinces and ASEAN peers
//   #/indikator       searchable indicator table
//   #/sumber          sources & methodology
//   #/provinsi/<slug> one province
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { AGE_BANDS, HEADLINE, INDICATORS, PEERS, PROVINCES, RELEASES, SECTORS, SERIES, SOURCES, TRADE, YEARS } from './data.js';
import { bandingkan, ekonomi, home, indikator, missing, penduduk, provinsi, sumber } from './views.js';
import { hbarChart } from './charts.js';

const app = document.getElementById('app');
const fmt = (n, d = 2) => n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

function setActive(route) {
  document.querySelectorAll('nav a').forEach((a) => {
    const href = a.getAttribute('href');
    const base = href.replace(/#\//, '').split('/')[0];
    a.classList.toggle('active', base === route || (route === '' && href === '#/'));
  });
}

function renderCompare(a, b) {
  const box = document.getElementById('compare-result');
  if (!box) return;
  const pa = PROVINCES.find((p) => p.slug === a);
  const pb = PROVINCES.find((p) => p.slug === b);
  if (!pa || !pb) return;
  const da = Math.round((pa.pop * 1e6) / pa.area);
  const db = Math.round((pb.pop * 1e6) / pb.area);
  const bigger = pa.pop >= pb.pop ? pa : pb;
  box.innerHTML = `<h2>${pa.name} vs ${pb.name}</h2>
  <div class="table-wrap"><table><thead><tr><th></th><th class="num">${pa.name}</th><th class="num">${pb.name}</th></tr></thead><tbody>
  <tr><td>Penduduk (2024)</td><td class="num">${fmt(pa.pop)} jt</td><td class="num">${fmt(pb.pop)} jt</td></tr>
  <tr><td>Luas daratan</td><td class="num">${pa.area.toLocaleString('id-ID')} km²</td><td class="num">${pb.area.toLocaleString('id-ID')} km²</td></tr>
  <tr><td>Kepadatan</td><td class="num">${da.toLocaleString('id-ID')} jiwa/km²</td><td class="num">${db.toLocaleString('id-ID')} jiwa/km²</td></tr>
  <tr><td>% penduduk nasional</td><td class="num">${fmt((pa.pop / 283.5) * 100, 1)}%</td><td class="num">${fmt((pb.pop / 283.5) * 100, 1)}%</td></tr>
  </tbody></table></div>
  <h3>Penduduk</h3>
  ${hbarChart({ items: [
    { label: pa.name, value: pa.pop, display: `${fmt(pa.pop)} jt`, color: '#0e6b5c' },
    { label: pb.name, value: pb.pop, display: `${fmt(pb.pop)} jt`, color: '#c98a1b' },
  ] })}
  <p class="note">${bigger.name} berpenduduk lebih banyak — ${fmt(Math.abs(pa.pop - pb.pop))} juta jiwa lebih banyak dari ${bigger === pa ? pb.name : pa.name}. Sumber: BPS, estimasi pertengahan 2024.</p>`;
}

function wirePage(route) {
  // Sortable province table.
  const table = document.getElementById('prov-table');
  if (table) {
    const body = table.querySelector('tbody');
    const original = [...PROVINCES].sort((a, b) => b.pop - a.pop);
    let dir = 1;
    table.querySelectorAll('button.sort').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        dir = btn.dataset.dir === 'asc' ? -1 : 1;
        btn.dataset.dir = dir === 1 ? 'asc' : 'desc';
        const rows = [...original];
        const val = (p) =>
          key === 'rank' ? original.indexOf(p)
          : key === 'name' ? p.name
          : key === 'pop' ? p.pop
          : key === 'share' ? p.pop
          : Math.round((p.pop * 1e6) / p.area);
        rows.sort((x, y) => (val(x) < val(y) ? -1 : val(x) > val(y) ? 1 : 0) * dir);
        body.innerHTML = rows
          .map((p, i) => {
            const density = Math.round((p.pop * 1e6) / p.area);
            return `<tr><td>${original.indexOf(p) + 1}</td><td><a href="#/provinsi/${p.slug}">${p.name}</a></td><td>${p.capital}</td><td class="num">${fmt(p.pop)}</td><td class="num">${fmt((p.pop / 283.5) * 100, 1)}%</td><td class="num">${density.toLocaleString('id-ID')}</td></tr>`;
          })
          .join('');
      });
    });
  }

  // Compare form.
  const form = document.getElementById('compare-form');
  if (form) {
    const a = document.getElementById('cmp-a');
    const b = document.getElementById('cmp-b');
    a.value = 'jawa-barat';
    b.value = 'jawa-timur';
    renderCompare(a.value, b.value);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      renderCompare(a.value, b.value);
    });
    a.addEventListener('change', () => renderCompare(a.value, b.value));
    b.addEventListener('change', () => renderCompare(a.value, b.value));
  }

  // Indicator search + category filter + CSV download.
  const search = document.getElementById('ind-search');
  if (search) {
    const rows = [...document.querySelectorAll('#ind-table tbody tr')];
    const count = document.getElementById('ind-count');
    let cat = 'Semua';
    const apply = () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      rows.forEach((row) => {
        const ok = (cat === 'Semua' || row.dataset.cat === cat) && row.textContent.toLowerCase().includes(q);
        row.style.display = ok ? '' : 'none';
        if (ok) shown += 1;
      });
      count.textContent = shown;
    };
    search.addEventListener('input', apply);
    document.querySelectorAll('.cat-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach((x) => x.classList.remove('active'));
        btn.classList.add('active');
        cat = btn.dataset.cat;
        apply();
      });
    });
    document.getElementById('ind-csv').addEventListener('click', () => {
      const lines = [['Indikator', 'Nilai', 'Tahun', 'Kategori', 'Sumber'].join(';')];
      INDICATORS.forEach((i) => lines.push([i.name, i.value, i.year, i.category, i.source].join(';')));
      const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nusastat-indikator.csv';
      link.click();
      URL.revokeObjectURL(url);
    });
  }
  // Whole-dataset JSON download on the Sources page.
  const srcJson = document.getElementById('src-json');
  if (srcJson) {
    srcJson.addEventListener('click', () => {
      const dataset = {
        site: 'NusaStat — Portal Statistik Nasional Indonesia',
        updated: '26 November 2026',
        headline: HEADLINE,
        years: YEARS,
        series: SERIES,
        ageBands: AGE_BANDS,
        sectors: SECTORS,
        provinces: PROVINCES,
        trade: TRADE,
        peers: PEERS,
        releases: RELEASES,
        indicators: INDICATORS,
        sources: SOURCES,
      };
      const blob = new Blob([JSON.stringify(dataset, null, 2)], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nusastat-dataset.json';
      link.click();
      URL.revokeObjectURL(url);
    });
  }
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);
  const route = parts[0] || '';
  let html;
  let title;
  if (route === '') { html = home(); title = 'NusaStat — Portal Statistik Nasional Indonesia'; }
  else if (route === 'penduduk') { html = penduduk(); title = 'Penduduk & Demografi | NusaStat'; }
  else if (route === 'ekonomi') { html = ekonomi(); title = 'Ekonomi | NusaStat'; }
  else if (route === 'bandingkan') { html = bandingkan(); title = 'Bandingkan Daerah | NusaStat'; }
  else if (route === 'indikator') { html = indikator(); title = 'Semua Indikator | NusaStat'; }
  else if (route === 'sumber') { html = sumber(); title = 'Sumber & Metodologi | NusaStat'; }
  else if (route === 'provinsi') { html = provinsi(decodeURIComponent(parts[1] || '')); title = 'Provinsi | NusaStat'; }
  else { html = missing(); title = 'Tidak ditemukan | NusaStat'; }
  document.title = title;
  app.innerHTML = html;
  setActive(route);
  wirePage(route);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
