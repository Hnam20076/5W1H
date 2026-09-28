/**
 * Module tương tác chính cho Trang 2: "AI & Nguy Cơ Mất Việc Làm"
 * Quản lý: SVG Mindmap tự động vẽ, Thu gọn/Mở nhánh, Zoom/Pan affine, Hero KPI Counters, Chart.js Charts, Drawer chi tiết.
 */

const NS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('mm');
const world = document.createElementNS(NS, 'g'); world.id = 'world'; svg.appendChild(world);
const gLinks = document.createElementNS(NS, 'g'); world.appendChild(gLinks);
const gNodes = document.createElementNS(NS, 'g'); world.appendChild(gNodes);

const CX = 850, CY = 490, ROOT_W = 300, ROOT_H = 74;
const BX = { right: 1160, left: 540 }, CHX = { right: 1460, left: 240 };
const SLOT_Y = [190, 490, 790], CH_GAP = 86;

/**
 * Tạo một phần tử SVG kèm thuộc tính
 * @param {string} tag - Tên thẻ SVG (rect, text, path...)
 * @param {Object} attrs - Thuộc tính gán cho phần tử
 * @returns {SVGElement}
 */
function el(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

/**
 * Ngắt một chuỗi văn bản thành mảng các dòng với độ dài tối đa mỗi dòng
 * @param {string} str - Chuỗi văn bản đầu vào
 * @param {number} max - Số ký tự tối đa trên một dòng
 * @returns {string[]} Mảng các dòng văn bản đã ngắt
 */
function wrapText(str, max) {
  const words = str.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = (cur ? cur + ' ' : '') + w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/**
 * Chuyển đổi mã màu Hex sang định dạng chuỗi RGBA
 * @param {string} hex - Mã màu hex (dạng #RRGGBB)
 * @param {number} a - Độ trong suốt alpha (0 đến 1)
 * @returns {string} Chuỗi rgba(r,g,b,a)
 */
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`;
}

const nodeEls = [], linkEls = [], branchMeta = {};

/* ---- 1. Vẽ Node Gốc (Root Node) ---- */
const ROOT = window.ROOT;
const rootG = el('g', { class: 'node pre' });
rootG.style.setProperty('--c', '#38bdf8');
rootG.appendChild(el('rect', { x: CX - ROOT_W / 2, y: CY - ROOT_H / 2, width: ROOT_W, height: ROOT_H, rx: 22, fill: '#0e1a33', stroke: '#38bdf8', 'stroke-width': 2 }));
rootG.appendChild(el('rect', { x: CX - ROOT_W / 2 + 6, y: CY - ROOT_H / 2 + 6, width: ROOT_W - 12, height: ROOT_H - 12, rx: 17, fill: 'rgba(56,189,248,.08)', stroke: 'none' }));

const rt = el('text', { 'text-anchor': 'middle', x: CX, y: CY - 2, fill: '#ffffff', 'font-size': 17, 'font-weight': 800 });
rt.textContent = 'AI & NGUY CƠ MẤT VIỆC LÀM';
rootG.appendChild(rt);

const rs = el('text', { 'text-anchor': 'middle', x: CX, y: CY + 20, fill: '#7dd3fc', 'font-size': 11, 'font-weight': 600, 'letter-spacing': 2 });
rs.textContent = 'SƠ ĐỒ TƯ DUY 5W1H';
rootG.appendChild(rs);

rootG.addEventListener('click', () => {
  if (moved > 5) return;
  openDrawer(ROOT.detail, ROOT.tag, ROOT.title, ROOT.color);
});
gNodes.appendChild(rootG);
nodeEls.push(rootG);

/* ---- 2. Vẽ Các Nhánh (Branches) & Các Node Con (Children) ---- */
const BRANCHES = window.BRANCHES;
BRANCHES.forEach(b => {
  const by = SLOT_Y[b.slot], bx = BX[b.side];
  const tLines = wrapText(b.title, 20);
  const bw = Math.max(196, Math.max(...tLines.map(l => l.length)) * 7.6 + 40);
  const bh = 30 + tLines.length * 17 + 14;
  const meta = { b, by, bx, bw, bh, collapsed: false, childNodes: [], childLinks: [], badgeTxt: null };
  branchMeta[b.id] = meta;

  /* Đường nối từ Root tới Branch */
  const rx = b.side === 'right' ? CX + ROOT_W / 2 : CX - ROOT_W / 2;
  const bEdge = b.side === 'right' ? bx - bw / 2 : bx + bw / 2;
  const lk = el('path', {
    class: 'link pre',
    d: `M ${rx} ${CY} C ${(rx + bEdge) / 2} ${CY}, ${(rx + bEdge) / 2} ${by}, ${bEdge} ${by}`,
    stroke: hexA(b.color, 0.55),
    'stroke-width': 2.2
  });
  gLinks.appendChild(lk);
  linkEls.push(lk);

  /* Thẻ nhánh chính (Branch Node) */
  const g = el('g', { class: 'node pre' });
  g.style.setProperty('--c', b.color);
  g.appendChild(el('rect', { x: bx - bw / 2, y: by - bh / 2, width: bw, height: bh, rx: 16, fill: '#0f1a30', stroke: b.color, 'stroke-width': 1.8 }));

  const tag = el('text', { x: bx, y: by - bh / 2 + 21, 'text-anchor': 'middle', fill: b.color, 'font-size': 11, 'font-weight': 800, 'letter-spacing': 3 });
  tag.textContent = b.tag;
  g.appendChild(tag);

  tLines.forEach((ln, i) => {
    const t = el('text', { x: bx, y: by - bh / 2 + 39 + i * 17, 'text-anchor': 'middle', fill: '#f1f5fd', 'font-size': 13, 'font-weight': 700 });
    t.textContent = ln;
    g.appendChild(t);
  });

  /* Nút thu gọn / mở rộng nhánh (+ / −) */
  const bdx = b.side === 'right' ? bx + bw / 2 + 14 : bx - bw / 2 - 14;
  const badge = el('g', { class: 'badge-g', style: 'cursor:pointer' });
  badge.appendChild(el('circle', { cx: bdx, cy: by, r: 11, fill: '#0f1a30', stroke: b.color, 'stroke-width': 1.5 }));
  const btxt = el('text', { x: bdx, y: by + 4.5, 'text-anchor': 'middle', fill: b.color, 'font-size': 14, 'font-weight': 800 });
  btxt.textContent = '−';
  badge.appendChild(btxt);
  meta.badgeTxt = btxt;

  badge.addEventListener('click', e => {
    e.stopPropagation();
    if (moved > 5) return;
    toggleBranch(b.id);
  });
  g.appendChild(badge);

  g.addEventListener('click', () => {
    if (moved > 5) return;
    openDrawer(b.detail, b.tag, b.title, b.color);
  });
  gNodes.appendChild(g);
  nodeEls.push(g);

  /* Các node con cấp 2 (Children) */
  const n = b.children.length;
  b.children.forEach((c, i) => {
    const cy = by + (i - (n - 1) / 2) * CH_GAP;
    const lines = wrapText(c.label, 30);
    const cw = Math.min(252, Math.max(...lines.map(l => l.length)) * 6.7 + 46);
    const ch = lines.length * 16 + 22;
    const ccx = CHX[b.side];
    const x1 = b.side === 'right' ? bx + bw / 2 : bx - bw / 2;
    const x2 = b.side === 'right' ? ccx - cw / 2 : ccx + cw / 2;

    const cl = el('path', {
      class: 'link pre',
      d: `M ${x1} ${by} C ${(x1 + x2) / 2} ${by}, ${(x1 + x2) / 2} ${cy}, ${x2} ${cy}`,
      stroke: hexA(b.color, 0.4),
      'stroke-width': 1.6
    });
    gLinks.appendChild(cl);
    linkEls.push(cl);
    meta.childLinks.push(cl);

    const cg = el('g', { class: 'node pre' });
    cg.style.setProperty('--c', b.color);
    cg.appendChild(el('rect', { x: ccx - cw / 2, y: cy - ch / 2, width: cw, height: ch, rx: 13, fill: '#0b1526', stroke: hexA(b.color, 0.65), 'stroke-width': 1.4 }));
    cg.appendChild(el('circle', { cx: ccx - cw / 2 + 13, cy: cy, r: 3.6, fill: b.color }));

    lines.forEach((ln, j) => {
      const t = el('text', { x: ccx + 4, y: cy + (j - (lines.length - 1) / 2) * 16 + 4, 'text-anchor': 'middle', fill: '#dbe7f8', 'font-size': 12, 'font-weight': 600 });
      t.textContent = ln;
      cg.appendChild(t);
    });

    cg.addEventListener('click', () => {
      if (moved > 5) return;
      openDrawer(c.detail, b.tag, c.label, b.color);
    });
    gNodes.appendChild(cg);
    nodeEls.push(cg);
    meta.childNodes.push(cg);
  });
});

/* Hiệu ứng hoạt ảnh khi tải trang (Entry Animation) */
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    [...linkEls, ...nodeEls].forEach((e, i) => {
      e.style.transitionDelay = (i * 38) + 'ms';
      e.classList.remove('pre');
    });
    setTimeout(() => {
      [...linkEls, ...nodeEls].forEach(e => e.style.transitionDelay = '0ms');
    }, 2200);
  });
});

/**
 * Đóng hoặc mở một nhánh trong sơ đồ cây SVG
 * @param {string} id - Mã định danh nhánh (what, why, who...)
 */
function toggleBranch(id) {
  const m = branchMeta[id];
  if (!m) return;
  m.collapsed = !m.collapsed;
  m.childNodes.forEach(n => n.classList.toggle('off', m.collapsed));
  m.childLinks.forEach(l => l.classList.toggle('off', m.collapsed));
  m.badgeTxt.textContent = m.collapsed ? '+' : '−';
}

document.getElementById('btnExpand')?.addEventListener('click', () => {
  Object.keys(branchMeta).forEach(id => {
    if (branchMeta[id].collapsed) toggleBranch(id);
  });
});

document.getElementById('btnCollapse')?.addEventListener('click', () => {
  Object.keys(branchMeta).forEach(id => {
    if (!branchMeta[id].collapsed) toggleBranch(id);
  });
});

/* ---- 3. Thu phóng & Di chuyển (Pan & Zoom) ---- */
let view = { s: 1, tx: 0, ty: 0 }, moved = 0;

function applyView() {
  world.setAttribute('transform', `translate(${view.tx},${view.ty}) scale(${view.s})`);
}

function svgPoint(evt) {
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

/**
 * Thu phóng quanh tâm trỏ chuột (affine zoom)
 * @param {number} px - Tọa độ X tương đối
 * @param {number} py - Tọa độ Y tương đối
 * @param {number} f - Hệ số nhân scale
 */
function zoomAt(px, py, f) {
  const ns = Math.min(3, Math.max(0.45, view.s * f));
  const k = ns / view.s;
  view.tx = px - k * (px - view.tx);
  view.ty = py - k * (py - view.ty);
  view.s = ns;
  applyView();
}

document.getElementById('mmWrap')?.addEventListener('wheel', e => {
  e.preventDefault();
  const p = svgPoint(e);
  zoomAt(p.x, p.y, e.deltaY < 0 ? 1.12 : 0.89);
}, { passive: false });

let drag = false, last = null;

svg.addEventListener('pointerdown', e => {
  drag = true;
  moved = 0;
  last = svgPoint(e);
  svg.setPointerCapture(e.pointerId);
});

svg.addEventListener('pointermove', e => {
  if (!drag) return;
  const p = svgPoint(e);
  const dx = p.x - last.x, dy = p.y - last.y;
  moved += Math.abs(dx) + Math.abs(dy);
  view.tx += dx;
  view.ty += dy;
  last = p;
  applyView();
});

svg.addEventListener('pointerup', () => {
  drag = false;
  setTimeout(() => moved = 0, 0);
});

svg.addEventListener('pointercancel', () => {
  drag = false;
});

document.getElementById('btnZoomIn')?.addEventListener('click', () => zoomAt(850, 490, 1.2));
document.getElementById('btnZoomOut')?.addEventListener('click', () => zoomAt(850, 490, 1 / 1.2));
document.getElementById('btnReset')?.addEventListener('click', () => {
  view = { s: 1, tx: 0, ty: 0 };
  applyView();
});

/* ---- 4. Khởi tạo Legend & Hero Chips ---- */
const legend = document.getElementById('legend');
const chips = document.getElementById('heroChips');

BRANCHES.forEach(b => {
  if (legend) {
    const lg = document.createElement('span');
    lg.className = 'lg';
    lg.setAttribute('role', 'button');
    lg.setAttribute('tabindex', '0');
    lg.innerHTML = `<i style="background:${b.color}"></i><b>${b.tag}</b>· ${b.q}`;
    lg.onclick = () => openDrawer(b.detail, b.tag, b.title, b.color);
    legend.appendChild(lg);
  }

  if (chips) {
    const cp = document.createElement('span');
    cp.className = 'chip';
    cp.style.color = b.color;
    cp.setAttribute('role', 'button');
    cp.setAttribute('tabindex', '0');
    cp.innerHTML = `<i style="background:${b.color}"></i><span style="color:#dbe7f8">${b.tag} — ${b.q}</span>`;
    cp.onclick = () => openDrawer(b.detail, b.tag, b.title, b.color);
    chips.appendChild(cp);
  }
});

/* ---- 5. Drawer Quản Lý Chi Tiết Nhánh ---- */
const drawer = document.getElementById('drawer');
const scrim = document.getElementById('scrim');
const SRC = window.SRC;

function openDrawer(d, tag, title, color) {
  if (!drawer || !scrim) return;

  const drTag = document.getElementById('drTag');
  drTag.textContent = tag;
  drTag.style.cssText = `background:${hexA(color, 0.15)};color:${color};border:1px solid ${hexA(color, 0.45)}`;

  document.getElementById('drTitle').textContent = title;
  document.getElementById('drDesc').textContent = d.desc || '';

  const st = document.getElementById('drStats');
  st.innerHTML = '';
  (d.stats || []).forEach(s => {
    const div = document.createElement('div');
    div.className = 'dr-stat';
    div.style.setProperty('--ac', color);
    div.innerHTML = `<div class="v">${s.v}</div><div class="l">${s.l}</div>`;
    st.appendChild(div);
  });

  const sw = document.getElementById('drSrcWrap');
  const sl = document.getElementById('drSrc');
  sl.innerHTML = '';
  (d.sources || []).forEach(k => {
    if (SRC[k]) {
      const a = document.createElement('a');
      a.href = SRC[k].u;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = '↗ ' + SRC[k].t;
      sl.appendChild(a);
    }
  });
  sw.style.display = (d.sources && d.sources.length) ? 'block' : 'none';

  drawer.classList.add('on');
  scrim.classList.add('on');
}

function closeDrawer() {
  if (!drawer || !scrim) return;
  drawer.classList.remove('on');
  scrim.classList.remove('on');
}

document.getElementById('drClose')?.addEventListener('click', closeDrawer);
scrim?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

/* ---- 6. Hiệu Ứng Số Nhảy Hero KPI Counters ---- */
document.querySelectorAll('.kpi .num').forEach(elm => {
  const target = +elm.dataset.val, suf = elm.dataset.suf || '';
  const t0 = performance.now(), dur = 1600;
  (function tick(t) {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    elm.textContent = Math.round(target * e) + suf;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
});

/* ---- 7. Vẽ 4 Biểu Đồ Chart.js ---- */
Chart.defaults.font.family = "'Be Vietnam Pro',sans-serif";
Chart.defaults.color = '#8fa3c0';
Chart.defaults.borderColor = 'rgba(148,163,184,.12)';
const tip = {
  backgroundColor: '#0f1a30',
  borderColor: 'rgba(148,163,184,.3)',
  borderWidth: 1,
  titleColor: '#fff',
  bodyColor: '#cbd9ee',
  padding: 10,
  cornerRadius: 10
};

// Biểu đồ 1: Việc làm mất đi vs tạo mới
const ch1Elem = document.getElementById('ch1');
if (ch1Elem) {
  new Chart(ch1Elem, {
    type: 'bar',
    data: {
      labels: ['Việc làm mất đi', 'Việc làm tạo mới', 'Thay đổi ròng'],
      datasets: [{
        data: [92, 170, 78],
        backgroundColor: ['#f87171', '#34d399', '#38bdf8'],
        borderRadius: 10,
        maxBarThickness: 64
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tip, callbacks: { label: c => ` ${c.parsed.y} triệu việc làm đến 2030` } }
      },
      scales: {
        y: { grid: { color: 'rgba(148,163,184,.08)' }, ticks: { callback: v => v + ' tr' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// Biểu đồ 2: Mức phơi nhiễm việc làm theo nhóm nền kinh tế
const ch2Elem = document.getElementById('ch2');
if (ch2Elem) {
  new Chart(ch2Elem, {
    type: 'bar',
    data: {
      labels: ['Nền KT phát triển (IMF)', 'Toàn cầu (IMF)', 'Nền KT mới nổi (IMF)', 'Thu nhập thấp (IMF)', 'Việt Nam – GenAI (ILO)'],
      datasets: [{
        data: [60, 40, 40, 26, 20.8],
        backgroundColor: ['#a78bfa', '#38bdf8', '#f472b6', '#fbbf24', '#34d399'],
        borderRadius: 8,
        maxBarThickness: 26
      }]
    },
    options: {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tip, callbacks: { label: c => ` ${c.parsed.x}% việc làm phơi nhiễm AI` } }
      },
      scales: {
        x: { max: 70, grid: { color: 'rgba(148,163,184,.08)' }, ticks: { callback: v => v + '%' } },
        y: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

// Biểu đồ 3: Tốc độ phổ cập người dùng 100M
const ch3Elem = document.getElementById('ch3');
if (ch3Elem) {
  new Chart(ch3Elem, {
    type: 'bar',
    data: {
      labels: ['ChatGPT', 'TikTok', 'Instagram', 'Facebook'],
      datasets: [{
        data: [2, 9, 30, 54],
        backgroundColor: ['#e11d48', '#475569', '#475569', '#475569'],
        borderRadius: 10,
        maxBarThickness: 56
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tip, callbacks: { label: c => ` ${c.parsed.y} tháng để đạt 100 triệu người dùng` } }
      },
      scales: {
        y: { grid: { color: 'rgba(148,163,184,.08)' }, ticks: { callback: v => v + ' tháng' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// Biểu đồ 4: Lao động cần đào tạo lại kỹ năng trước 2030 (Doughnut kèm text trung tâm)
const centerText = {
  id: 'centerText',
  afterDraw(chart) {
    if (chart.config.type !== 'doughnut') return;
    const { ctx } = chart;
    const m = chart.getDatasetMeta(0).data[0];
    if (!m) return;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fbbf24';
    ctx.font = "800 30px 'Be Vietnam Pro'";
    ctx.fillText('59%', m.x, m.y - 8);
    ctx.fillStyle = '#8fa3c0';
    ctx.font = "600 11px 'Be Vietnam Pro'";
    ctx.fillText('cần đào tạo lại', m.x, m.y + 14);
    ctx.restore();
  }
};

const ch4Elem = document.getElementById('ch4');
if (ch4Elem) {
  new Chart(ch4Elem, {
    type: 'doughnut',
    data: {
      labels: ['Cần reskilling / upskilling', 'Không cần đào tạo lớn'],
      datasets: [{
        data: [59, 41],
        backgroundColor: ['#fbbf24', '#1c2a44'],
        borderColor: '#0d1526',
        borderWidth: 3,
        cutout: '66%'
      }]
    },
    plugins: [centerText],
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 11.5 } }
        },
        tooltip: { ...tip, callbacks: { label: c => ` ${c.parsed}% lực lượng lao động (trong 100 người)` } }
      }
    }
  });
}
