// NusaStat views — HTML for every page, built from the data in data.js. Every
// value is escaped before it goes into the page, and every figure is shown with
// its source and year. Links are hash routes, so every page is reachable and
// bookmarkable without a server round-trip.

import { AGE_BANDS, HEADLINE, INDICATORS, PEERS, PROVINCES, RELEASES, SECTORS, SERIES, SITE, SOURCES, TRADE, YEARS } from './data.js';
import { barChart, donutChart, hbarChart, lineChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n, d = 2) => n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });
const TOTAL_POP = PROVINCES.reduce((s, p) => s + p.pop, 0);

function kpiCards() {
  return `<section class="kpis" aria-label="Indikator utama">${HEADLINE.map(
    (k) => `<article class="kpi"><p class="kpi-label">${esc(k.label)}</p><p class="kpi-value">${esc(k.value)}</p><p class="kpi-detail">${esc(k.detail)}</p><p class="kpi-change">${esc(k.change)}</p><p class="kpi-source">Sumber: ${esc(k.source)}</p></article>`,
  ).join('')}</section>`;
}

function provinceRows(provinces) {
  return provinces
    .map((p, i) => {
      const density = Math.round((p.pop * 1e6) / p.area);
      return `<tr><td>${i + 1}</td><td><a href="#/provinsi/${p.slug}">${esc(p.name)}</a></td><td>${esc(p.capital)}</td><td class="num">${fmt(p.pop)}</td><td class="num">${fmt((p.pop / 283.5) * 100, 1)}%</td><td class="num">${density.toLocaleString('id-ID')}</td></tr>`;
    })
    .join('');
}

export function home() {
  const top5 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return `<section class="hero">
  <p class="eyebrow">Statistik resmi · diperbarui ${esc(SITE.updated)}</p>
  <h1>Indonesia dalam angka</h1>
  <p class="lede">Penduduk, ekonomi, dan kesejahteraan 283,5 juta orang — dirangkum dari rilis resmi BPS, World Bank, dan IMF, lengkap dengan sumber dan tahun setiap angka.</p>
  <p class="hero-links"><a class="btn" href="#/penduduk">Lihat penduduk</a> <a class="btn btn-ghost" href="#/ekonomi">Lihat ekonomi</a> <a class="btn btn-ghost" href="#/bandingkan">Bandingkan daerah</a></p>
</section>
${kpiCards()}
<section class="grid-2">
  <article class="card"><h2>Pertumbuhan ekonomi, 2015–2024</h2><p class="card-sub">PDB riil, % per tahun · Sumber: BPS</p>${lineChart({ labels: YEARS.map(String), values: SERIES.pertumbuhanPdb, unit: '%' })}</article>
  <article class="card"><h2>Penduduk, 2015–2024</h2><p class="card-sub">Juta jiwa · Sumber: World Bank WDI</p>${barChart({ labels: YEARS.map(String), values: SERIES.penduduk, unit: ' jt' })}</article>
</section>
<section class="grid-2">
  <article class="card"><h2>Provinsi terpadat</h2><p class="card-sub">Lima provinsi berpenduduk terbanyak · Estimasi BPS, pertengahan 2024</p>${hbarChart({ items: top5.map((p) => ({ label: p.name, value: p.pop, display: `${fmt(p.pop)} jt jiwa` })) })}<p class="more"><a href="#/penduduk">Lihat semua provinsi &rarr;</a></p></article>
  <article class="card"><h2>Rilis terbaru</h2><p class="card-sub">Dari Badan Pusat Statistik</p><ul class="releases">${RELEASES.slice(0, 4).map((r) => `<li><time>${esc(r.date)}</time><strong>${esc(r.title)}</strong><span>${esc(r.body)}</span></li>`).join('')}</ul></article>
</section>
<section class="card"><h2>Indonesia dibanding tetangga ASEAN</h2><p class="card-sub">2024 · Sumber: World Bank WDI</p><div class="table-wrap"><table><thead><tr><th>Negara</th><th class="num">Penduduk (jt)</th><th class="num">PDB/kapita (US$)</th><th class="num">Harapan hidup (thn)</th><th class="num">Pertumbuhan PDB (%)</th></tr></thead><tbody>${PEERS.map((p) => `<tr><td><strong>${esc(p.country)}</strong></td><td class="num">${fmt(p.pop, 1)}</td><td class="num">${p.gdpCap.toLocaleString('id-ID')}</td><td class="num">${fmt(p.life, 1)}</td><td class="num">${fmt(p.growth, 1)}</td></tr>`).join('')}</tbody></table></div><p class="more"><a href="#/bandingkan">Bandingkan provinsi &rarr;</a></p></section>`;
}

export function penduduk() {
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  return `<p class="crumb"><a href="#/">Beranda</a> / Penduduk</p>
<h1>Penduduk &amp; demografi</h1>
<p class="lede">283,5 juta jiwa pada 2024 — negara berpenduduk terbesar keempat di dunia. Lebih dari separuh penduduk tinggal di Pulau Jawa.</p>
<section class="grid-2">
  <article class="card"><h2>Struktur umur, 2024</h2><p class="card-sub">% penduduk · Sumber: World Bank WDI</p>${hbarChart({ items: AGE_BANDS.map((a) => ({ label: `${a.band} — ${a.note}`, value: a.share, display: `${fmt(a.share, 1)}%` })), maxValue: 100 })}<p class="note">Rasio ketergantungan: setiap 100 penduduk usia kerja menanggung sekitar 47 penduduk usia non-kerja.</p></article>
  <article class="card"><h2>Pertumbuhan penduduk, 2015–2024</h2><p class="card-sub">Juta jiwa · Sumber: World Bank WDI</p>${lineChart({ labels: YEARS.map(String), values: SERIES.penduduk, unit: ' jt' })}</article>
</section>
<section class="card"><h2>Sepuluh provinsi berpenduduk terbanyak</h2><p class="card-sub">Estimasi pertengahan tahun 2024 · Sumber: BPS. Klik nama provinsi untuk halaman detailnya. Klik judul kolom untuk mengurutkan.</p>
<div class="table-wrap"><table id="prov-table"><thead><tr><th><button class="sort" data-key="rank">#</button></th><th><button class="sort" data-key="name">Provinsi</button></th><th>Ibu kota</th><th><button class="sort" data-key="pop">Penduduk (jt)</button></th><th><button class="sort" data-key="share">% nasional</button></th><th><button class="sort" data-key="density">Kepadatan (jiwa/km²)</button></th></tr></thead><tbody>${provinceRows(sorted)}</tbody></table></div>
<p class="note">Kesepuluh provinsi ini menampung ${fmt(TOTAL_POP)} juta jiwa — ${fmt((TOTAL_POP / 283.5) * 100, 1)}% dari seluruh penduduk Indonesia. Jawa Barat, Jawa Timur, dan Jawa Tengah saja sudah 130,05 juta jiwa.</p></section>`;
}

export function ekonomi() {
  return `<p class="crumb"><a href="#/">Beranda</a> / Ekonomi</p>
<h1>Ekonomi</h1>
<p class="lede">PDB US$ 1,40 triliun pada 2024 — ekonomi terbesar ke-16 di dunia dan terbesar di Asia Tenggara — dengan pertumbuhan 5,03%.</p>
<section class="grid-2">
  <article class="card"><h2>Pertumbuhan PDB riil, 2015–2024</h2><p class="card-sub">% per tahun · Sumber: BPS</p>${lineChart({ labels: YEARS.map(String), values: SERIES.pertumbuhanPdb, unit: '%' })}<p class="note">Kontraksi 2020 (−2,07%) adalah dampak pandemi COVID-19; ekonomi pulih ke 5,31% pada 2022 dan bertahan di atas 5% sejak itu.</p></article>
  <article class="card"><h2>PDB menurut lapangan usaha, 2023</h2><p class="card-sub">% terhadap PDB · Sumber: BPS</p>${donutChart({ items: SECTORS.map((s) => ({ label: s.sector, value: s.share })) })}</article>
</section>
<section class="grid-2">
  <article class="card"><h2>Inflasi, 2015–2024</h2><p class="card-sub">Desember, y-on-y, % · Sumber: BPS</p>${lineChart({ labels: YEARS.map(String), values: SERIES.inflasi, unit: '%', color: '#c98a1b' })}<p class="note">Lonjakan 2022 (5,51%) mengikuti penyesuaian harga BBM bersubsidi; inflasi kembali ke 1,57% pada 2024.</p></article>
  <article class="card"><h2>Pengangguran terbuka, 2015–2024</h2><p class="card-sub">Agustus, % · Sumber: BPS</p>${lineChart({ labels: YEARS.map(String), values: SERIES.pengangguran, unit: '%', color: '#b3543f' })}<p class="note">Pengangguran Agustus 2024 sebesar 4,91% — terendah dalam satu dekade — dengan angkatan kerja 147,1 juta orang.</p></article>
</section>
<section class="grid-2">
  <article class="card"><h2>Perdagangan luar negeri, 2024</h2><p class="card-sub">Barang, miliar US$ · Sumber: BPS</p><dl class="stats"><div><dt>Ekspor</dt><dd>US$ ${fmt(TRADE.exports, 1)} miliar</dd></div><div><dt>Impor</dt><dd>US$ ${fmt(TRADE.imports, 1)} miliar</dd></div><div><dt>Surplus</dt><dd>US$ ${fmt(TRADE.surplus, 1)} miliar</dd></div></dl><h3>Ekspor terbesar</h3>${hbarChart({ items: TRADE.topExports.map((t) => ({ label: t.product, value: t.share, display: `${fmt(t.share, 1)}%` })), maxValue: 100 })}<h3>Impor terbesar</h3>${hbarChart({ items: TRADE.topImports.map((t) => ({ label: t.product, value: t.share, display: `${fmt(t.share, 1)}%` })), maxValue: 100 })}</article>
  <article class="card"><h2>Kemiskinan, 2015–2024</h2><p class="card-sub">% penduduk, September · Sumber: BPS</p>${lineChart({ labels: YEARS.map(String), values: SERIES.kemiskinan, unit: '%', color: '#2f6fb2' })}<p class="note">8,57% pada September 2024 — 24,06 juta jiwa — adalah angka kemiskinan terendah sejak BPS pertama kali mencatatnya pada 1960. Garis kemiskinan: Rp595.242 per kapita per bulan.</p><h3>IPM 2024: 75,02</h3><p class="note">Harapan lama sekolah 13,41 tahun; rata-rata lama sekolah 9,05 tahun. Sumber: BPS.</p></article>
</section>`;
}

export function bandingkan() {
  const options = PROVINCES.map((p) => `<option value="${p.slug}">${esc(p.name)}</option>`).join('');
  return `<p class="crumb"><a href="#/">Beranda</a> / Bandingkan</p>
<h1>Bandingkan daerah</h1>
<p class="lede">Pilih dua provinsi dan lihat penduduk, luas, dan kepadatannya berdampingan. Semua angka estimasi BPS pertengahan 2024.</p>
<section class="card"><form id="compare-form" class="compare-form">
<label>Provinsi pertama <select id="cmp-a">${options}</select></label>
<label>Provinsi kedua <select id="cmp-b">${options}</select></label>
<button class="btn" type="submit">Bandingkan</button></form>
<div id="compare-result"></div></section>
<section class="card"><h2>Indonesia dibanding negara ASEAN, 2024</h2><p class="card-sub">Sumber: World Bank WDI</p><div class="table-wrap"><table><thead><tr><th>Negara</th><th class="num">Penduduk (jt)</th><th class="num">PDB/kapita (US$)</th><th class="num">Harapan hidup (thn)</th><th class="num">Pertumbuhan PDB (%)</th></tr></thead><tbody>${PEERS.map((p) => `<tr><td><strong>${esc(p.country)}</strong></td><td class="num">${fmt(p.pop, 1)}</td><td class="num">${p.gdpCap.toLocaleString('id-ID')}</td><td class="num">${fmt(p.life, 1)}</td><td class="num">${fmt(p.growth, 1)}</td></tr>`).join('')}</tbody></table></div><p class="note">Singapura memimpin PDB per kapita (US$ 90.674) dan harapan hidup (84,1 tahun); Indonesia memimpin jumlah penduduk dan termasuk tiga besar pertumbuhan ekonomi di kawasan.</p></section>`;
}

export function indikator() {
  const cats = [...new Set(INDICATORS.map((i) => i.category))];
  return `<p class="crumb"><a href="#/">Beranda</a> / Indikator</p>
<h1>Semua indikator</h1>
<p class="lede">${INDICATORS.length} indikator nasional beserta nilai, tahun, dan sumbernya. Ketik untuk mencari, atau saring berdasarkan kategori.</p>
<section class="card"><div class="filter-bar"><input id="ind-search" type="search" placeholder="Cari indikator, mis. “penduduk” atau “PDB”…" aria-label="Cari indikator"><div class="cat-btns" role="group" aria-label="Saring kategori">${['Semua', ...cats].map((c) => `<button class="cat-btn${c === 'Semua' ? ' active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}</div></div>
<p class="note"><span id="ind-count">${INDICATORS.length}</span> indikator ditampilkan. <button class="linklike" id="ind-csv" type="button">Unduh sebagai CSV</button></p>
<div class="table-wrap"><table id="ind-table"><thead><tr><th>Indikator</th><th>Nilai</th><th>Tahun</th><th>Kategori</th><th>Sumber</th></tr></thead><tbody>${INDICATORS.map((i) => `<tr data-cat="${esc(i.category)}"><td><strong>${esc(i.name)}</strong></td><td>${esc(i.value)}</td><td class="num">${i.year}</td><td>${esc(i.category)}</td><td>${esc(i.source)}</td></tr>`).join('')}</tbody></table></div></section>`;
}

export function sumber() {
  return `<p class="crumb"><a href="#/">Beranda</a> / Sumber &amp; metodologi</p>
<h1>Sumber &amp; metodologi</h1>
<p class="lede">Setiap angka di situs ini berasal dari publikasi resmi. Berikut sumbernya, apa yang diambil dari masing-masing, dan cara kami menyajikannya.</p>
<section class="card"><h2>Sumber data</h2><ul class="sources">${SOURCES.map((s) => `<li><strong>${esc(s.name)}</strong> <span class="src-url">${esc(s.url)}</span><span>${esc(s.what)}</span></li>`).join('')}</ul></section>
<section class="grid-2">
<article class="card"><h2>Cara membaca angka</h2><ul class="bullets"><li><strong>Tahun</strong> di samping setiap angka adalah tahun data, bukan tahun publikasi.</li><li><strong>y-on-y</strong> berarti dibandingkan dengan periode yang sama tahun sebelumnya.</li><li><strong>PDB harga berlaku</strong> memakai harga tahun berjalan; <strong>PDB riil</strong> sudah memperhitungkan inflasi.</li><li>Angka dibulatkan ke satu atau dua desimal; total persentase dapat berbeda 0,1 poin karena pembulatan.</li><li><strong>Garis kemiskinan</strong> BPS memakai pendekatan kebutuhan dasar (makanan + non-makanan).</li></ul></article>
<article class="card"><h2>Tentang NusaStat</h2><p>NusaStat adalah situs statistik independen yang merangkum data resmi Indonesia dalam satu tempat: beranda untuk gambaran cepat, halaman per topik untuk seri waktu, dan alat banding untuk membandingkan daerah dan negara. Situs ini statis — seluruh data tersimpan di berkasnya sendiri dan tidak mengambil apa pun dari internet saat dibuka.</p><p>Nama “NusaStat” adalah merek asli situs ini dan tidak berafiliasi dengan Badan Pusat Statistik, World Bank, IMF, atau Bank Indonesia.</p><p class="note">Terakhir diperbarui: ${esc(SITE.updated)}.</p></article>
</section>`;
}

export function provinsi(slug) {
  const p = PROVINCES.find((x) => x.slug === slug);
  if (!p) return missing();
  const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.slug === slug) + 1;
  const density = Math.round((p.pop * 1e6) / p.area);
  const share = (p.pop / 283.5) * 100;
  const others = [...PROVINCES].sort((a, b) => b.pop - a.pop).filter((x) => x.slug !== slug).slice(0, 4);
  return `<p class="crumb"><a href="#/">Beranda</a> / <a href="#/penduduk">Penduduk</a> / ${esc(p.name)}</p>
<h1>${esc(p.name)}</h1>
<p class="lede">Provinsi berpenduduk terbanyak ke-${rank} di Indonesia · Pulau ${esc(p.islands)} · Ibu kota ${esc(p.capital)}.</p>
<section class="kpis">${[
    { label: 'Penduduk', value: `${fmt(p.pop)} jt`, detail: 'estimasi 2024', change: `${fmt(share, 1)}% penduduk nasional`, source: 'BPS, 2024' },
    { label: 'Luas daratan', value: `${p.area.toLocaleString('id-ID')} km²`, detail: 'luas wilayah', change: `${fmt((p.area / 1890000) * 100, 1)}% luas Indonesia`, source: 'BPS, 2024' },
    { label: 'Kepadatan', value: `${density.toLocaleString('id-ID')} jiwa/km²`, detail: 'penduduk per km²', change: density > 1000 ? 'termasuk provinsi terpadat' : 'di bawah rata-rata Jawa', source: 'Dihitung dari data BPS' },
  ].map((k) => `<article class="kpi"><p class="kpi-label">${esc(k.label)}</p><p class="kpi-value">${esc(k.value)}</p><p class="kpi-detail">${esc(k.detail)}</p><p class="kpi-change">${esc(k.change)}</p><p class="kpi-source">Sumber: ${esc(k.source)}</p></article>`).join('')}</section>
<section class="grid-2">
<article class="card"><h2>${esc(p.name)} dibanding provinsi lain</h2><p class="card-sub">Penduduk, juta jiwa · BPS 2024</p>${hbarChart({ items: [{ label: p.name, value: p.pop, display: `${fmt(p.pop)} jt`, color: '#0e6b5c' }, ...others.map((o) => ({ label: o.name, value: o.pop, display: `${fmt(o.pop)} jt` }))] })}</article>
<article class="card"><h2>Catatan</h2><p>${esc(p.name)} adalah salah satu dari 38 provinsi Indonesia. Angka di halaman ini adalah estimasi penduduk pertengahan tahun 2024 dari BPS; kepadatan dihitung dengan membagi jumlah penduduk dengan luas daratan provinsi. Untuk perbandingan antarprovinsi, kembali ke <a href="#/penduduk">halaman penduduk</a> atau gunakan <a href="#/bandingkan">alat banding</a>.</p><p class="more"><a href="#/penduduk">&larr; Semua provinsi</a></p></article>
</section>`;
}

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1><p class="lede">Tidak ada halaman di alamat ini. <a href="#/">Kembali ke beranda</a> atau pilih salah satu bagian di atas.</p>`;
}
