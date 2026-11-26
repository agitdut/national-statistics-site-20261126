// NusaStat charts — small hand-rolled SVG charts, no library. Every chart is a
// pure function of its data: the same input always draws the same SVG, so the
// site renders identically on every load. Colours come from the site palette;
// nothing here fetches anything.

const PALETTE = ['#0e6b5c', '#c98a1b', '#2f6fb2', '#b3543f', '#6a4fa3', '#4d8a3f', '#8a5a2b', '#3f7d8c'];

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const start = Math.ceil(min / size) * size;
  const ticks = [];
  for (let v = start; v <= max + 1e-9; v += size) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

// Line chart with labelled axes, gridlines and a dot on every point.
export function lineChart({ labels, values, unit = '', height = 260, color = '#0e6b5c' }) {
  const w = 720;
  const h = height;
  const padL = 56;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = min < 0 ? Math.min(0, min - (max - min) * 0.15) : Math.max(0, min - (max - min) * 0.15);
  const hi = max + (max - min) * 0.15;
  const x = (i) => padL + (i * (w - padL - padR)) / (labels.length - 1);
  const y = (v) => padT + ((hi - v) * (h - padT - padB)) / (hi - lo);
  const ticks = niceTicks(lo, hi, 4);
  const grid = ticks
    .map(
      (t) =>
        `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e3e7e4" stroke-width="1"/><text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5c6b66">${t}${unit}</text>`,
    )
    .join('');
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  // Value labels sit above their dot. The first and last labels are pushed
  // sideways so they never collide with the y-axis tick labels.
  const dots = values
    .map((v, i) => {
      const anchor = i === 0 ? 'start' : i === values.length - 1 ? 'end' : 'middle';
      const lx = i === 0 ? x(i) + 8 : i === values.length - 1 ? x(i) - 8 : x(i);
      return (
        `<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="${color}"><title>${esc(labels[i])}: ${v}${unit}</title></circle>` +
        `<text x="${lx}" y="${y(v) - 10}" text-anchor="${anchor}" font-size="11" font-weight="600" fill="#243b35">${v}${unit}</text>`
      );
    })
    .join('');
  const xlabels = labels
    .map((l, i) => `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#5c6b66">${esc(l)}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Grafik garis" style="width:100%;height:auto;display:block">${grid}<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${xlabels}</svg>`;
}

// Vertical bar chart with a value label on every bar.
export function barChart({ labels, values, unit = '', height = 260, color = '#0e6b5c' }) {
  const w = 720;
  const h = height;
  const padL = 56;
  const padR = 16;
  const padT = 24;
  const padB = 34;
  const max = Math.max(...values);
  const hi = max * 1.15;
  const slot = (w - padL - padR) / labels.length;
  const bw = Math.min(46, slot * 0.62);
  const y = (v) => padT + ((hi - v) * (h - padT - padB)) / hi;
  const ticks = niceTicks(0, hi, 4);
  const grid = ticks
    .map(
      (t) =>
        `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="#e3e7e4" stroke-width="1"/><text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5c6b66">${t}${unit}</text>`,
    )
    .join('');
  const bars = values
    .map((v, i) => {
      const cx = padL + slot * i + slot / 2;
      return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${bw}" height="${(h - padB - y(v)).toFixed(1)}" rx="3" fill="${PALETTE[i % PALETTE.length]}"><title>${esc(labels[i])}: ${v}${unit}</title></rect><text x="${cx}" y="${y(v) - 7}" text-anchor="middle" font-size="11" font-weight="600" fill="#243b35">${v}${unit}</text><text x="${cx}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#5c6b66">${esc(labels[i])}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Grafik batang" style="width:100%;height:auto;display:block">${grid}${bars}</svg>`;
}

// Donut chart with a legend column beside it.
export function donutChart({ items, height = 260 }) {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 88;
  const inner = 58;
  const total = items.reduce((s, it) => s + it.value, 0);
  let angle = -Math.PI / 2;
  const slices = items
    .map((it, i) => {
      const frac = it.value / total;
      const a0 = angle;
      angle += frac * Math.PI * 2;
      const a1 = angle;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + inner * Math.cos(a1);
      const yi1 = cy + inner * Math.sin(a1);
      const xi0 = cx + inner * Math.cos(a0);
      const yi0 = cy + inner * Math.sin(a0);
      return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${PALETTE[i % PALETTE.length]}"><title>${esc(it.label)}: ${it.value}%</title></path>`;
    })
    .join('');
  const legend = items
    .map(
      (it, i) =>
        `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span><span class="leg-label">${esc(it.label)}</span><strong>${it.value}%</strong></li>`,
    )
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Diagram donat" style="width:${size}px;max-width:100%;height:auto">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="#123c33">100%</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="#5c6b66">terhadap PDB</text></svg><ul class="legend">${legend}</ul></div>`;
}

// Horizontal bars, used for province comparisons and age bands.
export function hbarChart({ items, unit = '', maxValue = null }) {
  const max = maxValue ?? Math.max(...items.map((it) => it.value));
  const rows = items
    .map(
      (it, i) =>
        `<div class="hbar-row"><span class="hbar-label">${esc(it.label)}</span><div class="hbar-track"><div class="hbar-fill" style="width:${((it.value / max) * 100).toFixed(1)}%;background:${it.color || PALETTE[i % PALETTE.length]}"></div></div><strong class="hbar-value">${it.display ?? `${it.value}${unit}`}</strong></div>`,
    )
    .join('');
  return `<div class="hbar-chart">${rows}</div>`;
}
