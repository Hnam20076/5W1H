/**
 * Module tương tác chính cho Trang 1: "AI và Tương Lai Việc Làm"
 * Quản lý: Canvas Pan/Zoom, kết nối SVG Bezier, Chuyển 3 View, Search, Slide Mode, Drawer & Clipboard.
 */

// Thứ tự trình chiếu các nhánh trong Slide Mode
const PRES_ORDER = ['center', 'what', 'why', 'where', 'who', 'when', 'how'];
let currentPresIndex = 0;
let isPresentationActive = false;

// Trạng thái Canvas Pan / Zoom
let zoomLevel = 1;
let panX = 0;
let panY = 0;
let isPanning = false;
let startX = 0;
let startY = 0;

let currentDrawerNodeId = null;

document.addEventListener('DOMContentLoaded', () => {
  initMindmapConnections();
  initCanvasPanZoom();
  initViewSwitching();
  initDrawerInteractions();
  initSearchFilter();
  initPresentationMode();
  renderTreeView();
  initCopySummary();

  // Tự động tính toán lại đường cong SVG khi thay đổi kích thước cửa sổ
  window.addEventListener('resize', () => {
    requestAnimationFrame(updateSvgConnections);
  });
});

/**
 * Hiển thị Toast thông báo trạng thái tạm thời (thay thế alert popup)
 * @param {string} message - Nội dung thông báo
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.remove('translate-y-3');

  setTimeout(() => {
    toast.classList.add('translate-y-3');
    setTimeout(() => toast.classList.add('hidden'), 250);
  }, 2800);
}

/**
 * Khởi tạo kết nối SVG Bezier giữa node trung tâm và các node con
 */
function initMindmapConnections() {
  updateSvgConnections();
}

/**
 * Tính toán tọa độ và vẽ đường cong Bezier cubic mượt mà giữa các node
 */
function updateSvgConnections() {
  const svgGroup = document.getElementById('svg-connections');
  const centerNode = document.getElementById('node-center');
  if (!svgGroup || !centerNode) return;

  const nodes = ['what', 'why', 'where', 'who', 'when', 'how'];
  const centerRect = centerNode.getBoundingClientRect();
  const world = document.getElementById('mindmap-world');
  const worldRect = world.getBoundingClientRect();

  // Tọa độ tương đối của node trung tâm trong thế giới canvas (tính theo tỷ lệ zoom)
  const cX = (centerRect.left + centerRect.width / 2 - worldRect.left) / zoomLevel;
  const cY = (centerRect.top + centerRect.height / 2 - worldRect.top) / zoomLevel;

  let pathsHtml = '';

  nodes.forEach(nodeId => {
    const targetNode = document.getElementById(`node-${nodeId}`);
    if (!targetNode) return;

    const targetRect = targetNode.getBoundingClientRect();
    const tX = (targetRect.left + targetRect.width / 2 - worldRect.left) / zoomLevel;
    const tY = (targetRect.top + targetRect.height / 2 - worldRect.top) / zoomLevel;

    // Tính toán điểm điều khiển cho đường cong Bezier bậc 3
    const dx = tX - cX;
    const dy = tY - cY;
    const ctrlX1 = cX + dx * 0.45;
    const ctrlY1 = cY;
    const ctrlX2 = cX + dx * 0.55;
    const ctrlY2 = tY;

    let strokeColor = '#2e4c69';
    if (nodeId === 'what') strokeColor = '#38bdf8';
    if (nodeId === 'why') strokeColor = '#fbbf24';
    if (nodeId === 'where') strokeColor = '#a78bfa';
    if (nodeId === 'who') strokeColor = '#34d399';
    if (nodeId === 'when') strokeColor = '#fb7185';
    if (nodeId === 'how') strokeColor = '#38bdf8';

    pathsHtml += `
      <path 
        id="path-${nodeId}"
        class="branch-line" 
        d="M ${cX} ${cY} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${tX} ${tY}" 
        fill="none" 
        stroke="${strokeColor}" 
        stroke-width="2.5" 
        stroke-opacity="0.65"
      />
    `;
  });

  svgGroup.innerHTML = pathsHtml;
}

/**
 * Xử lý kéo thả canvas (Pan) và cuộn chuột thu phóng (Zoom)
 */
function initCanvasPanZoom() {
  const viewport = document.getElementById('mindmap-viewport');
  const world = document.getElementById('mindmap-world');
  if (!viewport || !world) return;

  function applyTransform() {
    world.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
  }

  // Kéo chuột để di chuyển canvas
  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('.node-card')) return;
    isPanning = true;
    viewport.classList.remove('canvas-grab');
    viewport.classList.add('canvas-grabbing');
    startX = e.clientX - panX;
    startY = e.clientY - panY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isPanning) {
      isPanning = false;
      viewport.classList.remove('canvas-grabbing');
      viewport.classList.add('canvas-grab');
    }
  });

  // Thu phóng bằng con lăn chuột (Wheel Zoom)
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.08 : -0.08;
    zoomLevel = Math.min(Math.max(0.55, zoomLevel + zoomDelta), 1.6);
    applyTransform();
  }, { passive: false });

  // Các nút bấm điều khiển Zoom trên Toolbar
  document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
    zoomLevel = Math.min(1.6, zoomLevel + 0.15);
    applyTransform();
  });

  document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
    zoomLevel = Math.max(0.55, zoomLevel - 0.15);
    applyTransform();
  });

  document.getElementById('btn-zoom-reset')?.addEventListener('click', () => {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    applyTransform();
  });

  // Nút mở tất cả các nhánh
  document.getElementById('btn-expand-all')?.addEventListener('click', () => {
    const nodes = document.querySelectorAll('.node-card:not(#node-center)');
    nodes.forEach(n => n.classList.remove('opacity-20', 'scale-90'));
    document.querySelectorAll('.branch-line').forEach(p => p.setAttribute('stroke-opacity', '0.7'));
    showToast('Đã mở toàn bộ các nhánh trong sơ đồ');
  });

  // Nút thu gọn các nhánh phụ
  document.getElementById('btn-collapse-all')?.addEventListener('click', () => {
    const nodes = document.querySelectorAll('.node-card:not(#node-center)');
    nodes.forEach(n => n.classList.add('opacity-20', 'scale-90'));
    document.querySelectorAll('.branch-line').forEach(p => p.setAttribute('stroke-opacity', '0.15'));
    showToast('Đã thu gọn các nhánh phụ');
  });
}

/**
 * Chuyển đổi giữa 3 chế độ xem: Mindmap, Ma trận 6 nhánh, Cây phân cấp
 */
function initViewSwitching() {
  const btnInteractive = document.getElementById('view-interactive-btn');
  const btnMatrix = document.getElementById('view-matrix-btn');
  const btnTree = document.getElementById('view-tree-btn');

  const containerInteractive = document.getElementById('interactive-mindmap-container');
  const containerMatrix = document.getElementById('matrix-view-container');
  const containerTree = document.getElementById('tree-view-container');

  if (!btnInteractive || !btnMatrix || !btnTree) return;

  function setActiveView(view) {
    [btnInteractive, btnMatrix, btnTree].forEach(b => {
      b.className = 'px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white transition flex items-center gap-1.5';
    });

    containerInteractive?.classList.add('hidden');
    containerMatrix?.classList.add('hidden');
    containerTree?.classList.add('hidden');

    if (view === 'interactive') {
      btnInteractive.className = 'px-2.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold transition flex items-center gap-1.5';
      containerInteractive?.classList.remove('hidden');
      requestAnimationFrame(updateSvgConnections);
    } else if (view === 'matrix') {
      btnMatrix.className = 'px-2.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold transition flex items-center gap-1.5';
      containerMatrix?.classList.remove('hidden');
    } else if (view === 'tree') {
      btnTree.className = 'px-2.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold transition flex items-center gap-1.5';
      containerTree?.classList.remove('hidden');
    }
  }

  btnInteractive.addEventListener('click', () => setActiveView('interactive'));
  btnMatrix.addEventListener('click', () => setActiveView('matrix'));
  btnTree.addEventListener('click', () => setActiveView('tree'));
}

/**
 * Quản lý Drawer trượt hiển thị chi tiết từng nhánh
 */
function initDrawerInteractions() {
  const drawer = document.getElementById('node-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close-btn');

  // Lắng nghe sự kiện click trên các node
  document.querySelectorAll('.node-card').forEach(node => {
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      const nodeId = node.getAttribute('data-id');
      if (nodeId) openDrawer(nodeId);
    });
  });

  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  // Hỗ trợ phím tắt Escape đóng Drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });

  // Nút chuyển nhánh tiếp theo trong Drawer
  document.getElementById('drawer-next-btn')?.addEventListener('click', () => {
    if (!currentDrawerNodeId) return;
    const currentIndex = PRES_ORDER.indexOf(currentDrawerNodeId);
    const nextIndex = (currentIndex + 1) % PRES_ORDER.length;
    openDrawer(PRES_ORDER[nextIndex]);
  });

  // Nút sao chép nội dung nhánh hiện tại vào Clipboard
  document.getElementById('drawer-copy-btn')?.addEventListener('click', () => {
    if (!currentDrawerNodeId) return;
    const data = window.MINDMAP_DATA[currentDrawerNodeId];
    if (!data) return;

    let textToCopy = `[${data.badge}] ${data.title}\n`;
    textToCopy += `${data.subtitle}\n\n`;
    textToCopy += `Tóm tắt: ${data.summary}\n\n`;
    data.sections.forEach(s => {
      textToCopy += `* ${s.heading}:\n`;
      s.points.forEach(p => textToCopy += `  - ${p.replace(/<[^>]*>/g, '')}\n`);
    });

    copyToClipboard(textToCopy);
    showToast('Đã sao chép nội dung nhánh vào clipboard!');
  });
}

/**
 * Mở Drawer chi tiết của node được chọn
 * @param {string} nodeId - Mã định danh node (center, what, why...)
 */
function openDrawer(nodeId) {
  const data = window.MINDMAP_DATA?.[nodeId];
  if (!data) return;

  currentDrawerNodeId = nodeId;
  const drawer = document.getElementById('node-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;

  const badgeElem = document.getElementById('drawer-badge');
  const titleElem = document.getElementById('drawer-title');
  if (badgeElem) badgeElem.textContent = data.badge;
  if (titleElem) titleElem.textContent = data.title;

  let html = `
    <div class="space-y-4">
      <p class="text-cyan-200 font-semibold text-xs">${data.subtitle}</p>
      <div class="p-3.5 rounded-xl bg-brand-surface border border-brand-border/70 text-slate-300 italic">
        ${data.quote}
      </div>
      <div class="text-xs leading-relaxed text-slate-200 bg-brand-card/60 p-3.5 rounded-xl border border-brand-border/40">
        <b>Đánh giá cốt lõi:</b> ${data.summary}
      </div>
    </div>
  `;

  data.sections.forEach(sec => {
    html += `
      <div class="space-y-2 pt-2 border-t border-brand-border/60">
        <h5 class="font-bold text-white text-xs uppercase tracking-wide text-cyan-300">${sec.heading}</h5>
        <ul class="space-y-2">
          ${sec.points.map(pt => `
            <li class="flex items-start gap-2 text-slate-300">
              <span class="text-cyan-400 font-bold mt-0.5">•</span>
              <span class="leading-relaxed">${pt}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  });

  const contentElem = document.getElementById('drawer-content');
  if (contentElem) contentElem.innerHTML = html;

  backdrop.classList.remove('hidden');
  drawer.classList.remove('translate-x-full');

  // Kích hoạt animation nét đứt trên đường nối SVG tương ứng
  document.querySelectorAll('.branch-line').forEach(line => line.classList.remove('active'));
  const activeLine = document.getElementById(`path-${nodeId}`);
  if (activeLine) activeLine.classList.add('active');
}

/**
 * Đóng Drawer chi tiết
 */
function closeDrawer() {
  const drawer = document.getElementById('node-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;

  drawer.classList.add('translate-x-full');
  backdrop.classList.add('hidden');
  document.querySelectorAll('.branch-line').forEach(line => line.classList.remove('active'));
}

/**
 * Bộ tìm kiếm và lọc từ khóa trên toàn bộ dữ liệu Mindmap
 */
function initSearchFilter() {
  const searchInput = document.getElementById('mindmap-search');
  const clearBtn = document.getElementById('clear-search');
  if (!searchInput || !clearBtn) return;

  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      clearBtn.classList.add('hidden');
      document.querySelectorAll('.node-card').forEach(n => {
        n.classList.remove('highlight-match', 'opacity-25');
      });
      return;
    }

    clearBtn.classList.remove('hidden');

    Object.keys(window.MINDMAP_DATA || {}).forEach(key => {
      const item = window.MINDMAP_DATA[key];
      const nodeElem = document.getElementById(`node-${key}`);
      const textCorpus = (
        item.title + ' ' + 
        item.subtitle + ' ' + 
        item.summary + ' ' + 
        JSON.stringify(item.sections)
      ).toLowerCase();

      if (textCorpus.includes(query)) {
        if (nodeElem) {
          nodeElem.classList.add('highlight-match');
          nodeElem.classList.remove('opacity-25');
        }
      } else {
        if (nodeElem) {
          nodeElem.classList.remove('highlight-match');
          nodeElem.classList.add('opacity-25');
        }
      }
    });
  }

  searchInput.addEventListener('input', performSearch);
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    performSearch();
  });
}

/**
 * Chế độ trình chiếu từng bước (Slide Show Mode)
 */
function initPresentationMode() {
  const presBtn = document.getElementById('presentation-btn');
  const presBanner = document.getElementById('presentation-banner');
  const presExitBtn = document.getElementById('pres-exit-btn');
  const presPrevBtn = document.getElementById('pres-prev-btn');
  const presNextBtn = document.getElementById('pres-next-btn');

  if (!presBtn || !presBanner) return;

  function updatePresStep() {
    const nodeId = PRES_ORDER[currentPresIndex];
    const data = window.MINDMAP_DATA?.[nodeId];
    if (!data) return;

    const stepTitle = document.getElementById('pres-step-title');
    const stepCounter = document.getElementById('pres-step-counter');
    if (stepTitle) stepTitle.textContent = `Đang xem: ${data.badge} - ${data.title}`;
    if (stepCounter) stepCounter.textContent = `(${currentPresIndex + 1}/${PRES_ORDER.length})`;

    document.querySelectorAll('.node-card').forEach(n => {
      n.classList.remove('ring-4', 'ring-cyan-400', 'scale-105');
      n.classList.add('opacity-40');
    });

    const activeNode = document.getElementById(`node-${nodeId}`);
    if (activeNode) {
      activeNode.classList.remove('opacity-40');
      activeNode.classList.add('ring-4', 'ring-cyan-400', 'scale-105');

      // Tự động căn giữa viewport vào node đang trình bày
      const world = document.getElementById('mindmap-world');
      const viewport = document.getElementById('mindmap-viewport');
      if (world && viewport) {
        const nodeRect = activeNode.getBoundingClientRect();
        const vpRect = viewport.getBoundingClientRect();

        const targetX = (vpRect.left + vpRect.width / 2) - (nodeRect.left + nodeRect.width / 2);
        const targetY = (vpRect.top + vpRect.height / 2) - (nodeRect.top + nodeRect.height / 2);

        panX += targetX;
        panY += targetY;
        world.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
      }
    }

    openDrawer(nodeId);
  }

  presBtn.addEventListener('click', () => {
    isPresentationActive = true;
    presBanner.classList.remove('hidden');
    currentPresIndex = 0;
    updatePresStep();
    showToast('Đã bắt đầu chế độ Thuyết trình 5W1H');
  });

  presExitBtn?.addEventListener('click', () => {
    isPresentationActive = false;
    presBanner.classList.add('hidden');
    document.querySelectorAll('.node-card').forEach(n => {
      n.classList.remove('ring-4', 'ring-cyan-400', 'scale-105', 'opacity-40');
    });
    closeDrawer();
  });

  presPrevBtn?.addEventListener('click', () => {
    currentPresIndex = (currentPresIndex - 1 + PRES_ORDER.length) % PRES_ORDER.length;
    updatePresStep();
  });

  presNextBtn?.addEventListener('click', () => {
    currentPresIndex = (currentPresIndex + 1) % PRES_ORDER.length;
    updatePresStep();
  });
}

/**
 * Tạo danh sách accordion phân cấp (Tree View)
 */
function renderTreeView() {
  const container = document.getElementById('tree-root-nodes');
  if (!container || !window.MINDMAP_DATA) return;

  const keys = ['what', 'why', 'where', 'who', 'when', 'how'];
  let treeHtml = '';

  keys.forEach(key => {
    const item = window.MINDMAP_DATA[key];
    if (!item) return;

    treeHtml += `
      <div class="border border-brand-border rounded-xl bg-brand-surface/60 overflow-hidden">
        <button 
          type="button"
          onclick="toggleTreeBranch('${key}')" 
          class="w-full text-left p-3 flex items-center justify-between hover:bg-brand-card transition text-xs font-bold text-white"
          aria-expanded="true"
        >
          <div class="flex items-center gap-2">
            <span id="tree-icon-${key}" class="text-cyan-400 font-mono transition-transform" aria-hidden="true">▼</span>
            <span class="text-cyan-400 font-black tracking-wide">${item.badge}</span>
            <span>— ${item.title}</span>
          </div>
          <span class="text-[10px] text-slate-400 hidden sm:inline">Nhấp để đóng/mở</span>
        </button>

        <div id="tree-branch-${key}" class="p-3.5 bg-brand-card/30 border-t border-brand-border/60 space-y-3 text-xs text-slate-300">
          <p class="italic text-cyan-200">${item.summary}</p>
          ${item.sections.map(sec => `
            <div class="space-y-1.5 pl-3 border-l-2 border-brand-border">
              <div class="font-bold text-white text-[11px]">${sec.heading}</div>
              <ul class="space-y-1 pl-2">
                ${sec.points.map(pt => `<li class="list-disc list-inside text-slate-400">${pt}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = treeHtml;
}

/**
 * Đóng hoặc mở nhánh trong Tree View
 * @param {string} key - Tên nhánh (what, why...)
 */
function toggleTreeBranch(key) {
  const branch = document.getElementById(`tree-branch-${key}`);
  const icon = document.getElementById(`tree-icon-${key}`);
  if (!branch || !icon) return;

  if (branch.classList.contains('hidden')) {
    branch.classList.remove('hidden');
    icon.style.transform = 'rotate(0deg)';
  } else {
    branch.classList.add('hidden');
    icon.style.transform = 'rotate(-90deg)';
  }
}

/**
 * Hàm sao chép văn bản vào clipboard an toàn (hỗ trợ cả môi trường không có HTTPS)
 * @param {string} text - Văn bản cần sao chép
 */
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => {
      fallbackCopyText(text);
    });
  } else {
    fallbackCopyText(text);
  }
}

/**
 * Phương thức fallback sao chép thông qua textarea ẩn
 * @param {string} text - Văn bản cần sao chép
 */
function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed', err);
  }
  document.body.removeChild(textArea);
}

/**
 * Khởi tạo nút sao chép toàn bộ tóm tắt Mindmap vào Clipboard
 */
function initCopySummary() {
  const copyBtn = document.getElementById('copy-summary-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    let summaryText = `MINDMAP 5W1H: AI VÀ TƯƠNG LAI VIỆC LÀM (Dữ liệu ILO 2025, WEF 2025, IMF 2024)\n\n`;
    summaryText += `1. CÂU HỎI TRUNG TÂM: AI có làm mất việc làm không?\n`;
    summaryText += `   -> Có mất ở một số nhiệm vụ chuẩn hóa, nhưng bản chất là "chuyển đổi nhiệm vụ và hợp tác người-máy".\n\n`;
    summaryText += `2. WHAT: Mất nhiệm vụ lặp lại (nhập liệu, tóm tắt cơ bản), phát triển nhiệm vụ kiểm chứng, sáng tạo và đạo đức.\n`;
    summaryText += `3. WHY: Doanh nghiệp muốn tối ưu năng suất, xử lý big data và vận hành 24/7.\n`;
    summaryText += `4. WHERE: Khối nghề hành chính/văn phòng (clerical) và các quốc gia phát triển chịu tác động mạnh nhất.\n`;
    summaryText += `5. WHO: Lao động, doanh nghiệp (77% reskilling), trường đại học và chính phủ cùng vào cuộc.\n`;
    summaryText += `6. WHEN: Đang diễn ra và tăng tốc trong giai đoạn bản lề 2025 - 2030.\n`;
    summaryText += `7. HOW: 3 cơ chế: Tự động hóa (Automation) + Tăng cường (Augmentation) + Tái phân bổ (Reallocation).\n`;

    copyToClipboard(summaryText);
    showToast('Đã sao chép toàn bộ tóm tắt Mindmap vào Clipboard!');
  });
}
