// Frontend interaction, Hardware Pinout, Filter, and Code rendering logic
// App State
const state = {
  activeLabId: "tier1_button_hold_1sw_1led",
  viewMode: "single",
  activeComponent: "led",
  codeMode: "arduino", // 'arduino' or 'avr'
  editorMode: "view", // 'view' or 'edit'
  customCode: {
    arduino: {},
    avr: {}
  },
  targetPort: "COM11",
  activePinId: null,
  activeTab: "all",
  activeStudioTab: "code", // 'code', 'flowchart', 'calc', 'cgram', 'datasheet', 'ai'
  inventory: {
    uno: 1,
    proto: 1,
    led: 8,
    btn: 4,
    seg7: 2,
    pot: 2,
    lcd: 1,
    res: 12
  }
};

// Initialize App
function initApp() {
  if (typeof LABS_DATA !== 'undefined' && LABS_DATA.length > 0) {
    state.activeLabId = LABS_DATA[0].id;
  }
  renderInventoryControls();
  renderLabCards();
  setupEventListeners();
  selectLab(state.activeLabId);
}

// Stubs for backward compatibility
function reset3DView() {}
function setViewMode(mode) {}
function set3DFullCircuit(labId) {
  renderCircuitDeepDive(labId);
}
function set3DComponent(type, pinToHighlight = null) {
  selectComponent(type, pinToHighlight);
}
function highlightPinIn3D(pinId) {}

// Render Hardware Cheatsheet Card (Matches 7-Segment Screenshot + All 8 Components)
function renderHardwareCheatsheet(compType) {
  const container = document.getElementById("circuit-deep-dive-container");
  if (!container) return;
  if (typeof STUDIO_CHEATSHEET_RENDERER !== 'undefined') {
    STUDIO_CHEATSHEET_RENDERER.renderCheatsheet(compType, container);
  }
}

function renderCircuitDeepDive(labId) {
  const lab = LABS_DATA.find(l => l.id === labId);
  const comp = (lab && lab.activeComponent) || state.activeComponent || "seg7";
  renderHardwareCheatsheet(comp);
}

// Select Component for Pinout Details & Cheatsheet
function selectComponent(type, pinToHighlight = null) {
  state.activeComponent = type;
  const compSelect = document.getElementById("component-select");
  if (compSelect) compSelect.value = type;

  // Sync active state in lab-comp-tabs and all-comp-tabs
  document.querySelectorAll(".lab-comp-tab, .all-comp-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.comp === type);
  });

  renderHardwareCheatsheet(type);
  renderPinoutPanel(type, pinToHighlight);
}

// Render Pinout Chips & Details
function renderPinoutPanel(compType, highlightPinId = null) {
  const comp = COMPONENTS_DATA[compType];
  const chipsContainer = document.getElementById("pin-chips");
  const detailBox = document.getElementById("pin-detail-box");
  const compTitle = document.getElementById("comp-info-title");

  compTitle.textContent = comp.name + " (" + comp.sub + ")";
  chipsContainer.innerHTML = "";

  comp.pins.forEach((p, idx) => {
    const chip = document.createElement("button");
    chip.className = "pin-chip";
    chip.textContent = p.name;
    chip.onclick = () => selectPin(p.id);
    if ((highlightPinId && p.id === highlightPinId) || (!highlightPinId && idx === 0)) {
      chip.classList.add("active");
      showPinDetail(p);
    }
    chipsContainer.appendChild(chip);
  });
}

function selectPin(pinId) {
  state.activePinId = pinId;
  const comp = COMPONENTS_DATA[state.activeComponent];
  const pin = comp.pins.find(p => p.id === pinId);
  if (!pin) return;

  // Update UI active chip
  document.querySelectorAll(".pin-chip").forEach(c => {
    c.classList.toggle("active", c.textContent === pin.name);
  });

  showPinDetail(pin);
}

function showPinDetail(pin) {
  const detailBox = document.getElementById("pin-detail-box");
  detailBox.innerHTML = `
    <div class="pin-detail-name">${pin.name}</div>
    <div><strong>หน้าที่:</strong> ${pin.role}</div>
    <div style="margin-top: 3px; color: var(--text-muted);"><strong>จุดเชื่อมต่อในวงจร:</strong> ${pin.note}</div>
  `;
}

// Render Inventory Controls
function renderInventoryControls() {
  const grid = document.getElementById("equip-grid");
  const items = [
    { id: "uno", name: "Arduino Uno R3", sub: "บอร์ดหลัก + สาย USB", lock: true, qty: 1 },
    { id: "proto", name: "Protoboard", sub: "บอร์ดทดลอง", lock: true, qty: 1 },
    { id: "led", name: "หลอดไฟ LED 5mm", sub: "คละสี", opts: [1, 2, 4, 6, 8], def: 8 },
    { id: "btn", name: "ปุ่มกด Tactile", sub: "สวิตช์ 4 ขา", opts: [1, 2, 3, 4], def: 4 },
    { id: "seg7", name: "7-Segment 1 หลัก", sub: "Common Cathode (0.56\\\")", opts: [1, 2], def: 2 },
    { id: "pot", name: "Potentiometer", sub: "1kΩ หรือ 10kΩ ปรับค่าได้", opts: [1, 2], def: 2 },
    { id: "lcd", name: "จอ LCD 16x2", sub: "Parallel 4-bit (16 ขา)", def: 1 },
    { id: "res", name: "ตัวต้านทาน 470Ω/1kΩ", sub: "จำกัดกระแส/Pull-up", opts: [4, 6, 10, 12, 15], def: 12 }
  ];

  grid.innerHTML = "";
  items.forEach(it => {
    const isChecked = state.inventory[it.id] > 0;
    const div = document.createElement("div");
    div.className = "equip-item" + (isChecked ? " checked" : "");
    div.id = "equip-card-" + it.id;

    let qtyHtml = "";
    if (it.opts) {
      qtyHtml = `<select class="equip-qty-select" onchange="updateQty('${it.id}', this.value)" onclick="event.stopPropagation()">
        ${it.opts.map(q => `<option value="${q}" ${state.inventory[it.id] == q ? 'selected' : ''}>${q} ชิ้น</option>`).join('')}
      </select>`;
    }

    div.innerHTML = `
      <input type="checkbox" ${isChecked ? 'checked' : ''} ${it.lock ? 'disabled' : ''} onchange="toggleEquip('${it.id}', this.checked)" onclick="event.stopPropagation()">
      <div class="equip-item-label" onclick="document.querySelector('#equip-card-${it.id} input').click()">
        <div class="equip-item-name">${it.name}</div>
        <div class="equip-item-sub">${it.sub}</div>
      </div>
      ${qtyHtml}
    `;
    grid.appendChild(div);
  });

  updateFilterStats();
}

function toggleEquip(id, checked) {
  if (checked) {
    state.inventory[id] = (id === 'led') ? 6 : (id === 'btn') ? 4 : (id === 'res') ? 10 : 1;
  } else {
    state.inventory[id] = 0;
  }
  const card = document.getElementById("equip-card-" + id);
  if (card) card.classList.toggle("checked", checked);

  updateFilterStats();
  renderLabCards();
}

function updateQty(id, val) {
  state.inventory[id] = parseInt(val, 10);
  updateFilterStats();
  renderLabCards();
}

function isLabUnlocked(lab) {
  const req = lab.req;
  for (let key in req) {
    if ((state.inventory[key] || 0) < req[key]) {
      return false;
    }
  }
  return true;
}

function updateFilterStats() {
  const total = LABS_DATA.length;
  const unlocked = LABS_DATA.filter(isLabUnlocked).length;
  const statEl = document.getElementById("stat-unlocked");
  if (statEl) statEl.textContent = `ปลดล็อกได้ ${unlocked} / ${total} แล็บ`;
  updateEquipCompactSummary(unlocked, total);
}

function updateEquipCompactSummary(unlocked, total) {
  const summary = document.getElementById("equip-compact-summary");
  if (!summary) return;
  const activeItems = [];
  const mapName = { uno: "Uno", proto: "Breadboard", led: "LED", btn: "ปุ่มกด", seg7: "7-Seg", pot: "Pot", lcd: "LCD", res: "ตัวต้านทาน" };
  Object.keys(state.inventory).forEach(k => {
    if (state.inventory[k] > 0) {
      activeItems.push(`${mapName[k] || k}${state.inventory[k] > 1 ? ' x' + state.inventory[k] : ''}`);
    }
  });
  summary.textContent = `เลือกแล้ว: ${activeItems.join(', ')} (${unlocked}/${total} แล็บ)`;
}

// Toggle Collapsible Sections (Equip, Labs, Wiring, Trouble)
function toggleSection(sectionId) {
  const section = document.getElementById("section-" + sectionId);
  const body = document.getElementById("body-" + sectionId);
  const icon = document.getElementById("collapse-icon-" + sectionId);
  const btn = document.getElementById("btn-toggle-" + sectionId);

  if (!body) return;

  const isCollapsed = section ? section.classList.contains("collapsed") : (body.style.display === "none");

  if (isCollapsed) {
    // Expand
    body.style.display = "";
    if (section) section.classList.remove("collapsed");
    if (icon) icon.textContent = "▼";
    if (btn) btn.innerHTML = "<span>▲</span> ย่อเก็บ";
    
    const summary = document.getElementById(sectionId + "-compact-summary");
    if (summary) summary.style.display = "none";
  } else {
    // Collapse
    body.style.display = "none";
    if (section) section.classList.add("collapsed");
    if (icon) icon.textContent = "▼";
    if (btn) btn.innerHTML = "<span>▼</span> ขยาย";

    const summary = document.getElementById(sectionId + "-compact-summary");
    if (summary) summary.style.display = "inline-block";
  }
}


// Render Lab Cards
function renderLabCards() {
  const grid = document.getElementById("lab-grid");
  grid.innerHTML = "";

  const filtered = LABS_DATA.filter(lab => {
    if (state.activeTab === "all") return true;
    return lab.level === parseInt(state.activeTab, 10) || lab.level === state.activeTab;
  });

  filtered.forEach(lab => {
    const ready = isLabUnlocked(lab);
    const card = document.createElement("div");
    card.className = "lab-card" + (lab.id === state.activeLabId ? " active" : "") + (ready ? "" : " locked");
    card.onclick = () => selectLab(lab.id);

    const levelBadge = `<span class="lab-badge badge-tier${lab.level}">Tier ${lab.level}</span>`;

    const statusBadge = ready ? '<span class="lab-status-badge status-ready">✓ พร้อมทำ</span>' :
                                '<span class="lab-status-badge status-missing">✗ ขาดอุปกรณ์</span>';

    // Chips
    const chips = [];
    if (lab.req.led > 0) chips.push(`LED x${lab.req.led}`);
    if (lab.req.btn > 0) chips.push(`ปุ่ม x${lab.req.btn}`);
    if (lab.req.seg7 > 0) chips.push("7-Seg");
    if (lab.req.pot > 0) chips.push("Potentiometer");
    if (lab.req.lcd > 0) chips.push("LCD 16x2");

    card.innerHTML = `
      <div class="lab-card-header">
        ${levelBadge}
        ${statusBadge}
      </div>
      <div class="lab-card-title">${lab.title}</div>
      <div class="lab-card-desc">${lab.desc}</div>
      <div class="lab-card-chips">
        ${chips.map(c => `<span class="equip-chip">${c}</span>`).join('')}
      </div>
    `;
    grid.appendChild(card);
  });
}

function setTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab == tab);
  });
  renderLabCards();
}

// Get list of component IDs used in a specific Lab
function getLabComponents(lab) {
  const comps = [];
  const add = (k) => {
    const key = k === 'uno' ? 'arduino' : k;
    if (COMPONENTS_DATA[key] && !comps.includes(key)) {
      comps.push(key);
    }
  };

  // Primary component first
  if (lab.activeComponent) {
    add(lab.activeComponent);
  }

  // Then lab peripherals based on requirements
  const order = ['lcd', 'pot', 'seg7', 'btn', 'led', 'res'];
  order.forEach(k => {
    if (lab.req && lab.req[k] > 0) {
      add(k);
    }
  });

  // Always include Arduino and Protoboard
  add('arduino');
  add('proto');

  return comps;
}

// Render Lab Component Switcher Tabs
function renderLabComponentTabs(lab) {
  const container = document.getElementById("lab-comp-tabs");
  const allContainer = document.getElementById("all-comp-tabs");
  if (!container) return;

  const comps = getLabComponents(lab);
  container.innerHTML = "";

  const icons = {
    led: "💡",
    btn: "🔘",
    seg7: "🔢",
    pot: "🎛",
    lcd: "📟",
    res: "⚡",
    arduino: "🔌",
    proto: "📋"
  };

  comps.forEach(compKey => {
    const comp = COMPONENTS_DATA[compKey];
    if (!comp) return;

    const btn = document.createElement("button");
    btn.className = "lab-comp-tab" + (state.activeComponent === compKey ? " active" : "");
    btn.dataset.comp = compKey;
    const icon = icons[compKey] || "🔹";
    const shortName = comp.name.split(' (')[0];
    btn.innerHTML = `<span>${icon}</span> <span>${shortName}</span>`;

    btn.onclick = () => {
      selectComponent(compKey);
    };

    container.appendChild(btn);
  });

  // Render all 8 components tabs
  if (allContainer) {
    allContainer.innerHTML = "";
    const allList = [
      { key: "seg7", name: "7-Segment 5161AS" },
      { key: "lcd", name: "LCD 1602 (4-bit)" },
      { key: "led", name: "หลอดไฟ LED" },
      { key: "btn", name: "สวิตช์ปุ่มกด" },
      { key: "pot", name: "Potentiometer" },
      { key: "res", name: "ตัวต้านทาน" },
      { key: "proto", name: "Breadboard" },
      { key: "arduino", name: "Arduino Uno" }
    ];

    allList.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "lab-comp-tab all-comp-tab" + (state.activeComponent === item.key ? " active" : "");
      btn.dataset.comp = item.key;
      const icon = icons[item.key] || "🔹";
      btn.innerHTML = `<span>${icon}</span> <span>${item.name}</span>`;

      btn.onclick = () => {
        selectComponent(item.key);
      };

      allContainer.appendChild(btn);
    });
  }
}

// Select a Lab
function selectLab(labId) {
  state.activeLabId = labId;
  const lab = LABS_DATA.find(l => l.id === labId);
  if (!lab) return;

  // Highlight active lab card
  document.querySelectorAll(".lab-card").forEach(c => {
    c.classList.remove("active");
  });
  renderLabCards();

  // Set titles
  document.getElementById("active-lab-title").textContent = lab.title;
  document.getElementById("active-lab-desc").textContent = lab.desc;
  document.getElementById("active-lab-badge").textContent = lab.levelName;

  const miniBadge = document.getElementById("active-lab-mini-badge");
  if (miniBadge) {
    miniBadge.textContent = `กำลังทำ: ${lab.title.split(' (')[0]}`;
  }

  // Set default active component from the selected lab
  state.activeComponent = lab.activeComponent || "led";
  const compSelect = document.getElementById("component-select");
  if (compSelect) compSelect.value = state.activeComponent;

  // Update component tabs, pinout panel, and deep-dive
  renderLabComponentTabs(lab);
  renderPinoutPanel(state.activeComponent);
  renderCircuitDeepDive(lab.id);

  // Render wiring table
  renderWiringTable(lab.wiring);

  // Render checklist
  renderChecklist(lab.checklist);

  // Render code
  renderCode();

  // If flowchart or report tab is currently active, refresh for new lab
  if (state.activeStudioTab === 'flowchart') {
    const el = document.getElementById("studio-tab-flowchart");
    if (el && typeof STUDIO_FLOWCHARTS !== 'undefined') {
      el.innerHTML = STUDIO_FLOWCHARTS.renderFlowchartViewer(state.activeLabId);
    }
  } else if (state.activeStudioTab === 'report') {
    const el = document.getElementById("studio-tab-report");
    if (el && typeof STUDIO_REPORT !== 'undefined') {
      el.innerHTML = STUDIO_REPORT.renderReportPanel(state.activeLabId);
    }
  }

  // Toggle Quick LCD Customizer button for LCD-related labs
  const isLcdLab = lab.id.toLowerCase().includes("lcd") || lab.title.toLowerCase().includes("lcd") || (lab.wiring && lab.wiring.some(w => w.comp.toLowerCase().includes("lcd")));
  const quickLcdBtn = document.getElementById("btn-quick-lcd-customizer");
  if (quickLcdBtn) {
    quickLcdBtn.style.display = isLcdLab ? "inline-flex" : "none";
  }
}

function openLcdCustomizerForActiveLab() {
  const lab = LABS_DATA.find(l => l.id === state.activeLabId);
  if (!lab) return;

  if (lab.avrCode && typeof STUDIO_CGRAM !== 'undefined') {
    const matches = [...lab.avrCode.matchAll(/lcd_puts\s*\(\s*"([^"]+)"\s*\)/g)];
    if (matches.length >= 2) {
      STUDIO_CGRAM.line1 = matches[0][1];
      STUDIO_CGRAM.line2 = matches[1][1];
    } else if (matches.length === 1) {
      STUDIO_CGRAM.line1 = matches[0][1];
    }
  }

  setStudioTab('cgram');
  if (typeof STUDIO_CGRAM !== 'undefined') {
    STUDIO_CGRAM.switchSubTab('customizer');
  }
}

// Switch Right Studio Workspace Sub-Tabs
function setStudioTab(tabId) {
  state.activeStudioTab = tabId;

  // Update Studio Tab Buttons
  document.querySelectorAll(".studio-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  // Toggle Visibility of Studio Panels
  const tabs = ['code', 'flowchart', 'calc', 'cgram', 'datasheet', 'ai', 'report'];
  tabs.forEach(t => {
    const panel = document.getElementById("studio-tab-" + t);
    if (panel) {
      panel.classList.toggle("active", t === tabId);
    }
  });

  // Lazy Render / Initialize Tool on Demand
  if (tabId === 'flowchart') {
    const el = document.getElementById("studio-tab-flowchart");
    if (el && typeof STUDIO_FLOWCHARTS !== 'undefined') {
      el.innerHTML = STUDIO_FLOWCHARTS.renderFlowchartViewer(state.activeLabId);
    }
  } else if (tabId === 'calc') {
    const el = document.getElementById("studio-tab-calc");
    if (el && typeof STUDIO_CALCULATIONS !== 'undefined') {
      el.innerHTML = STUDIO_CALCULATIONS.renderCalculationsPanel();
      STUDIO_CALCULATIONS.recalcTimer();
    }
  } else if (tabId === 'cgram') {
    const el = document.getElementById("studio-tab-cgram");
    if (el && typeof STUDIO_CGRAM !== 'undefined') {
      el.innerHTML = STUDIO_CGRAM.renderEditor();
    }
  } else if (tabId === 'datasheet') {
    const el = document.getElementById("studio-tab-datasheet");
    if (el && typeof STUDIO_DATASHEETS !== 'undefined') {
      el.innerHTML = STUDIO_DATASHEETS.renderDatasheetPanel();
    }
  } else if (tabId === 'ai') {
    const el = document.getElementById("studio-tab-ai");
    if (el && typeof STUDIO_AI !== 'undefined') {
      el.innerHTML = STUDIO_AI.renderAIPanel();
      STUDIO_AI.checkConnection();
    }
  } else if (tabId === 'report') {
    const el = document.getElementById("studio-tab-report");
    if (el && typeof STUDIO_REPORT !== 'undefined') {
      el.innerHTML = STUDIO_REPORT.renderReportPanel(state.activeLabId);
    }
  }
}

function quickAskAI() {
  setStudioTab('ai');
  if (typeof STUDIO_AI !== 'undefined') {
    STUDIO_AI.refreshAttachedCode();
  }
}


// Render Wiring Table
function renderWiringTable(wiring) {
  const tbody = document.getElementById("wiring-table-body");
  tbody.innerHTML = "";
  wiring.forEach(w => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${w.comp}</strong></td>
      <td><span class="wire-badge">${w.pin}</span></td>
      <td><strong style="color: var(--primary);">${w.target}</strong></td>
      <td style="color: var(--text-muted);">${w.note}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Checklist
function renderChecklist(checklist) {
  const ul = document.getElementById("body-trouble") || document.getElementById("trouble-list");
  if (!ul) return;
  ul.innerHTML = "";
  (checklist || []).forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = item;
    ul.appendChild(li);
  });
}

// Set Code Mode (arduino / avr)
function setCodeMode(mode) {
  state.codeMode = mode;
  document.querySelectorAll(".mode-toggle-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
  renderCode();
}


// Get Current Code (custom if edited, otherwise template)
function getCurrentCode() {
  const lab = LABS_DATA.find(l => l.id === state.activeLabId);
  if (!lab) return "";
  if (state.customCode[state.codeMode] && state.customCode[state.codeMode][state.activeLabId] !== undefined) {
    return state.customCode[state.codeMode][state.activeLabId];
  }
  return state.codeMode === "arduino" ? lab.arduinoCode : lab.avrCode;
}

// Switch Editor Mode ('view' or 'edit')
function setEditorMode(mode) {
  state.editorMode = mode;
  const btnTemplate = document.getElementById("btn-view-template");
  const btnEdit = document.getElementById("btn-view-edit");
  if (btnTemplate) btnTemplate.classList.toggle("active", mode === "view");
  if (btnEdit) btnEdit.classList.toggle("active", mode === "edit");

  const pre = document.getElementById("code-display");
  const editor = document.getElementById("code-editor");
  const twistBar = document.getElementById("twist-bar");

  if (mode === "view") {
    if (pre) pre.style.display = "block";
    if (editor) editor.style.display = "none";
  } else {
    if (pre) pre.style.display = "none";
    if (editor) {
      editor.style.display = "block";
      editor.value = getCurrentCode();
      editor.focus();
    }
  }
  if (twistBar) {
    twistBar.style.display = mode === "edit" ? "flex" : "none";
  }
}

// Custom code input event
function onCustomCodeInput() {
  const editor = document.getElementById("code-editor");
  if (!editor) return;
  if (!state.customCode[state.codeMode]) {
    state.customCode[state.codeMode] = {};
  }
  state.customCode[state.codeMode][state.activeLabId] = editor.value;

  const pre = document.getElementById("code-display");
  if (pre) pre.textContent = editor.value;

  const customBadge = document.getElementById("code-custom-badge");
  if (customBadge) customBadge.style.display = "inline-block";
}

// Reset code to original lab template
function resetToTemplate() {
  if (confirm("ต้องการรีเซ็ตโค้ดกลับเป็นโค้ดต้นแบบของ Lab หรือไม่?")) {
    if (state.customCode[state.codeMode]) {
      delete state.customCode[state.codeMode][state.activeLabId];
    }
    const customBadge = document.getElementById("code-custom-badge");
    if (customBadge) customBadge.style.display = "none";
    renderCode();
    showToast("✓ คืนค่าโค้ดต้นแบบเรียบร้อย");
  }
}

// Apply Exam Twist Preset
function applyTwist(type) {
  let code = getCurrentCode();

  if (type === "invert_logic") {
    if (state.codeMode === "arduino") {
      code = code.replace(/\bHIGH\b/g, "__TEMP_H__")
                 .replace(/\bLOW\b/g, "HIGH")
                 .replace(/__TEMP_H__/g, "LOW");
      if (code.includes("INPUT_PULLUP")) {
        code = code.replace(/INPUT_PULLUP/g, "INPUT");
      } else if (code.includes("INPUT")) {
        code = code.replace(/\bINPUT\b/g, "INPUT_PULLUP");
      }
      showToast("✓ สลับตรรกะ Active-HIGH ⇄ Active-LOW เรียบร้อย");
    } else {
      code = code.replace(/PORT([B-D])\s*\|=\s*\((1\s*<<\s*PORT[B-D]\d)\);/g, "__TEMP_SET__$1;$2")
                 .replace(/PORT([B-D])\s*&=\s*~\((1\s*<<\s*PORT[B-D]\d)\);/g, "PORT$1 |= ($2);")
                 .replace(/__TEMP_SET__([B-D]);([^\n]+)/g, "PORT$1 &= ~($2);");
      showToast("✓ สลับบิต Register Set/Clear เรียบร้อย");
    }
  } else if (type === "change_delay") {
    const newDelay = prompt("ระบุเวลาหน่วง Delay ใหม่ที่ต้องการ (หน่วย ms):", "150");
    if (!newDelay || isNaN(newDelay)) return;
    if (state.codeMode === "arduino") {
      code = code.replace(/delay\(\s*\d+\s*\);/g, "delay(" + newDelay + ");");
    } else {
      code = code.replace(/_delay_ms\(\s*\d+\s*\);/g, "_delay_ms(" + newDelay + ");");
    }
    showToast("✓ ปรับเวลา Delay เป็น " + newDelay + " ms เรียบร้อย");
  } else if (type === "remap_pins") {
    const input = prompt("ระบุพินเดิมและพินใหม่ที่ต้องการสลับ (คั่นด้วยจุลภาค เช่น 13,8 หรือ 2,8):", "13,8");
    if (!input) return;
    const parts = input.split(",").map(s => s.trim());
    if (parts.length >= 2) {
      const [oldPin, newPin] = parts;
      const re = new RegExp("\\b" + oldPin + "\\b", 'g');
      code = code.replace(re, newPin);
      showToast("✓ สลับพิน " + oldPin + " เป็นพิน " + newPin + " เรียบร้อย");
    }
  } else if (type === "change_lcd_text") {
    const newText = prompt("ระบุข้อความใหม่สำหรับบรรทัด LCD (สูงสุด 16 ตัวอักษร):", "APISAK K. 2569");
    if (newText === null) return;
    const trimmed = newText.substring(0, 16);
    if (code.includes('lcd.print(')) {
      code = code.replace(/lcd\.print\("[^"]*"\);/, 'lcd.print("' + trimmed + '");');
      showToast('✓ เปลี่ยนข้อความ LCD เป็น "' + trimmed + '" เรียบร้อย');
    } else {
      alert("แล็บนี้ไม่มีคำสั่ง lcd.print()");
      return;
    }
  } else if (type === "invert_counter") {
    if (code.includes("count++")) {
      code = code.replace(/count\+\+/g, "count--");
      code = code.replace(/count\s*>\s*9/g, "count < 0");
      code = code.replace(/count\s*=\s*0/g, "count = 9");
      showToast("✓ เปลี่ยนทิศทางเป็นนับถอยหลัง (Down-Counter 9 -> 0)");
    } else if (code.includes("count--")) {
      code = code.replace(/count--/g, "count++");
      code = code.replace(/count\s*<\s*0/g, "count > 9");
      code = code.replace(/count\s*=\s*9/g, "count = 0");
      showToast("✓ เปลี่ยนทิศทางเป็นนับขึ้น (Up-Counter 0 -> 9)");
    } else if (code.includes("for (int i = 0; i < 6; i++)")) {
      code = code.replace("for (int i = 0; i < 6; i++)", "for (int i = 5; i >= 0; i--)");
      showToast("✓ สลับทิศทางลูปไฟวิ่งย้อนกลับ (5 -> 0)");
    } else {
      alert("ไม่พบลูปหรือตัวแปร count ในโค้ดของแล็บนี้");
      return;
    }
  } else if (type === "adc_scaling") {
    if (code.includes("(potValue * 5.0) / 1023.0")) {
      code = code.replace("(potValue * 5.0) / 1023.0", "map(potValue, 0, 1023, 0, 100)");
      code = code.replace('" V"', '" %"');
      showToast("✓ ปรับสเกล ADC จาก 0-5.0V เป็น 0-100% เรียบร้อย");
    } else if (code.includes("map(potValue, 0, 1023, 0, 100)")) {
      code = code.replace("map(potValue, 0, 1023, 0, 100)", "(potValue * 5.0) / 1023.0");
      code = code.replace('" %"', '" V"');
      showToast("✓ ปรับสเกล ADC กลับเป็นแรงดัน 0-5.0V เรียบร้อย");
    } else {
      alert("แล็บนี้ไม่มีการคำนวณสเกล ADC potValue");
      return;
    }
  }

  if (!state.customCode[state.codeMode]) {
    state.customCode[state.codeMode] = {};
  }
  state.customCode[state.codeMode][state.activeLabId] = code;
  setEditorMode("edit");
  renderCode();
}

// Handle COM Port Change
function onComPortChange() {
  const select = document.getElementById("com-port-select");
  const customInput = document.getElementById("custom-com-input");
  if (!select) return;
  if (select.value === "CUSTOM") {
    if (customInput) {
      customInput.style.display = "inline-block";
      customInput.focus();
      state.targetPort = customInput.value.trim() || "COM3";
    }
  } else {
    if (customInput) customInput.style.display = "none";
    state.targetPort = select.value;
  }
}

function onCustomComInput() {
  const customInput = document.getElementById("custom-com-input");
  if (customInput) {
    state.targetPort = customInput.value.trim() || "COM3";
  }
}

// Download code as .ino or .c
function downloadCodeFile() {
  const code = getCurrentCode();
  const ext = state.codeMode === "arduino" ? ".ino" : ".c";
  const filename = state.activeLabId + "_code" + ext;
  const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("✓ บันทึกไฟล์ " + filename + " สำเร็จ");
}

// Download .sim1 circuit file for SimulIDE directly
function downloadSimulideCircuit() {
  const lab = LABS_DATA.find(l => l.id === state.activeLabId);
  if (!lab || !lab.sim1Base64) {
    showToast("⚠️ ไม่พบไฟล์วงจรจำลอง SimulIDE สำหรับโจทย์นี้");
    return;
  }
  try {
    let xmlText = "";
    try {
      xmlText = decodeURIComponent(escape(atob(lab.sim1Base64)));
    } catch (e) {
      xmlText = atob(lab.sim1Base64);
    }
    const blob = new Blob([xmlText], { type: "text/xml;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = state.activeLabId + "_circuit.sim1";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("✓ บันทึกไฟล์วงจร SimulIDE " + a.download + " สำเร็จ");
  } catch (err) {
    showToast("⚠️ เกิดข้อผิดพลาดในการดาวน์โหลดวงจร");
  }
}

// Download .bat flash/sim runner script
function downloadFlashBat() {
  // Prioritize Bare-metal AVR C code for avr-gcc
  let code = "";
  if (state.customCode['avr'] && state.customCode['avr'][state.activeLabId] !== undefined) {
    code = state.customCode['avr'][state.activeLabId];
  } else if (state.codeMode === 'avr') {
    code = getCurrentCode();
  } else {
    const lab = LABS_DATA.find(l => l.id === state.activeLabId);
    code = (lab && lab.avrCode) ? lab.avrCode : getCurrentCode();
  }

  const b64 = btoa(unescape(encodeURIComponent(code)));
  const port = state.targetPort || "AUTO";
  const lab = LABS_DATA.find(l => l.id === state.activeLabId);
  const labTitle = lab ? lab.title : state.activeLabId;
  const sim1B64 = (lab && lab.sim1Base64) ? lab.sim1Base64 : "";

  const lines = [
    "@echo off",
    "chcp 65001 >nul",
    "title AVR-GCC Flash & SimulIDE Runner - " + labTitle,
    "color 0b",
    "",
    "echo ===============================================================================",
    "echo      AVR-GCC BARE-METAL & SIMULIDE RUNNER - CDTI PRACTICAL EXAM 2569",
    "echo      Lab: " + labTitle,
    "echo ===============================================================================",
    "echo.",
    "",
    ":: 1. Locate AVR Toolchain and SimulIDE",
    'set "AVR_BIN=D:\\My_server\\My_work\\arduino-1.8.19\\hardware\\tools\\avr\\bin"',
    'set "AVR_ETC=D:\\My_server\\My_work\\arduino-1.8.19\\hardware\\tools\\avr\\etc"',
    'set "SIMULIDE_EXE=D:\\My_server\\University\\3rd year\\Term_1\\Embedded_system\\Simulide\\SimulIDE_1.1.0-SR2_Win64\\simulide.exe"',
    "",
    'if not exist "%SIMULIDE_EXE%" (',
    '    if exist "%~dp0..\\Simulide\\SimulIDE_1.1.0-SR2_Win64\\simulide.exe" set "SIMULIDE_EXE=%~dp0..\\Simulide\\SimulIDE_1.1.0-SR2_Win64\\simulide.exe"',
    '    if exist "C:\\Simulide\\simulide.exe" set "SIMULIDE_EXE=C:\\Simulide\\simulide.exe"',
    ')',
    "",
    'if not exist "%AVR_BIN%\\avr-gcc.exe" (',
    '    if exist "%LOCALAPPDATA%\\Arduino15\\packages\\arduino\\tools\\avr-gcc\\7.3.0-atmel3.6.1-arduino7\\bin\\avr-gcc.exe" (',
    '        set "AVR_BIN=%LOCALAPPDATA%\\Arduino15\\packages\\arduino\\tools\\avr-gcc\\7.3.0-atmel3.6.1-arduino7\\bin"',
    '        set "AVR_ETC=%LOCALAPPDATA%\\Arduino15\\packages\\arduino\\tools\\avrdude\\6.3.0-arduino17\\etc"',
    '    ) else if exist "C:\\Program Files (x86)\\Arduino\\hardware\\tools\\avr\\bin\\avr-gcc.exe" (',
    '        set "AVR_BIN=C:\\Program Files (x86)\\Arduino\\hardware\\tools\\avr\\bin"',
    '        set "AVR_ETC=C:\\Program Files (x86)\\Arduino\\hardware\\tools\\avr\\etc"',
    '    ) else if exist "C:\\Program Files\\Arduino\\hardware\\tools\\avr\\bin\\avr-gcc.exe" (',
    '        set "AVR_BIN=C:\\Program Files\\Arduino\\hardware\\tools\\avr\\bin"',
    '        set "AVR_ETC=C:\\Program Files\\Arduino\\hardware\\tools\\avr\\etc"',
    '    )',
    ')',
    "",
    'set "CC=%AVR_BIN%\\avr-gcc.exe"',
    'set "OBJCOPY=%AVR_BIN%\\avr-objcopy.exe"',
    'set "SIZE=%AVR_BIN%\\avr-size.exe"',
    'set "AVRDUDE=%AVR_BIN%\\avrdude.exe"',
    'set "AVRDUDE_CONF=%AVR_ETC%\\avrdude.conf"',
    "",
    'if not exist "%CC%" (',
    '    where avr-gcc.exe >nul 2>&1',
    '    if not errorlevel 1 (',
    '        set "CC=avr-gcc.exe"',
    '        set "OBJCOPY=avr-objcopy.exe"',
    '        set "SIZE=avr-size.exe"',
    '        set "AVRDUDE=avrdude.exe"',
    '    ) else (',
    '        color 0c',
    '        echo [ERROR] ไม่พบ avr-gcc.exe ในเครื่อง',
    '        echo กรุณาตรวจสอบว่ามี AVR-GCC หรือ Arduino IDE ติดตั้งอยู่ในเครื่องหรือไม่',
    '        echo.',
    '        pause',
    '        exit /b 1',
    '    )',
    ')',
    "",
    'echo [✓] พบคอมไพเลอร์ AVR-GCC: "%CC%"',
    'echo [✓] พบโปรแกรมเมอร์ AVRDUDE: "%AVRDUDE%"',
    'if exist "%SIMULIDE_EXE%" (echo [✓] พบโปรแกรมจำลองวงจร SimulIDE: "%SIMULIDE_EXE%")',
    'echo.',
    "",
    ":: 2. Resolve Target COM Port",
    "set TARGET_PORT=" + port,
    "",
    'if "%1" neq "" (',
    "    set TARGET_PORT=%1",
    "    echo [i] ใช้พอร์ตจากคำสั่ง: %TARGET_PORT%",
    ")",
    "",
    'if "%TARGET_PORT%"=="AUTO" (',
    "    echo [i] กำลังค้นหาพอร์ต Arduino Uno ที่เสียบอยู่อัตโนมัติ...",
    '    for /f "usebackq tokens=*" %%p in (`powershell -NoProfile -Command "$port = (Get-CimInstance Win32_PnPEntity | Where-Object { $_.Caption -match \'Arduino|CH340|CP210|FTDI|USB Serial\' } | Select-Object -First 1).Caption; if ($port -match \'\\((COM\\d+)\\)\') { $matches[1] } else { [System.IO.Ports.SerialPort]::GetPortNames()[0] }"`) do set TARGET_PORT=%%p',
    ")",
    "",
    'if "%TARGET_PORT%"=="" (',
    "    echo [!] ตรวจไม่พบพอร์ตอัตโนมัติ กรุณาระบุพอร์ต เช่น COM3, COM4",
    '    set /p TARGET_PORT="ระบุหมายเลขพอร์ต COM: "',
    ")",
    "",
    "echo [✓] เลือกใช้พอร์ต: %TARGET_PORT%",
    "echo.",
    "",
    ":: 3. Create Source Directory, Extract C Code and SimulIDE Circuit",
    'set "BUILD_DIR=%~dp0build_' + state.activeLabId + '"',
    'set "SRC_FILE=%BUILD_DIR%\\main.c"',
    'set "ELF_FILE=%BUILD_DIR%\\main.elf"',
    'set "HEX_FILE=%BUILD_DIR%\\main.hex"',
    'set "SIM_HEX=%BUILD_DIR%\\main_c.hex"',
    'set "SIM_FILE=%BUILD_DIR%\\circuit.sim1"',
    "",
    'if not exist "%BUILD_DIR%" mkdir "%BUILD_DIR%"',
    "",
    "echo [i] กำลังเตรียมซอร์สโค้ดภาษา C (Bare-metal AVR)...",
    "powershell -NoProfile -Command \"[System.IO.File]::WriteAllText('%SRC_FILE%', [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('" + b64 + "')))\"",
    "",
    'if not exist "%SRC_FILE%" (',
    "    color 0c",
    "    echo [ERROR] ไม่สามารถสร้างไฟล์ซอร์สโค้ดได้",
    "    pause",
    "    exit /b 1",
    ")",
    "",
    'echo [✓] ซอร์สโค้ดพร้อมคอมไพล์: "%SRC_FILE%"',
  ];

  if (sim1B64) {
    lines.push(
      "echo [i] กำลังสร้างไฟล์วงจรจำลอง SimulIDE (circuit.sim1)...",
      "powershell -NoProfile -Command \"[System.IO.File]::WriteAllBytes('%SIM_FILE%', [System.Convert]::FromBase64String('" + sim1B64 + "'))\"",
      'if exist "%SIM_FILE%" echo [✓] ไฟล์วงจรจำลองพร้อมใช้งาน: "%SIM_FILE%"'
    );
  }

  lines.push(
    "echo.",
    "",
    ":: 4. Compile with avr-gcc",
    "echo [i] เริ่มคอมไพล์ด้วย avr-gcc [ATmega328P @ 16 MHz]...",
    "echo -------------------------------------------------------------------------------",
    '"%CC%" -mmcu=atmega328p -DF_CPU=16000000UL -Os -Wall -o "%ELF_FILE%" "%SRC_FILE%"',
    "if errorlevel 1 goto ERR_COMPILE",
    'echo [✓] คอมไพล์ผ่านเรียบร้อย [Build ELF Success]',
    "",
    ":: 5. Convert to HEX with avr-objcopy and sync for SimulIDE",
    '"%OBJCOPY%" -O ihex -R .eeprom "%ELF_FILE%" "%HEX_FILE%"',
    "if errorlevel 1 goto ERR_HEX",
    'copy /y "%HEX_FILE%" "%SIM_HEX%" >nul',
    'echo [✓] แปลงไฟล์ HEX สำเร็จ: "%HEX_FILE%"',
    "",
    ":: 6. Show Memory Usage with avr-size",
    "echo.",
    '"%SIZE%" --format=avr --mcu=atmega328p "%ELF_FILE%"',
    "echo.",
    "",
    ":: 7. Interactive Action Menu: SimulIDE Sim vs Real Board Flash",
    "echo ===============================================================================",
    "echo   เลือกรูปแบบการทำงาน:",
    "echo   [1] แฟลชลงบอร์ดจริง Arduino Uno (พอร์ต %TARGET_PORT%)",
    "echo   [2] จำลองการทำงานใน SimulIDE ทันที (Auto-Load Circuit & HEX)",
    "echo   [3] ทำทั้งสองอย่าง (Flash บอร์ดจริง + เปิด SimulIDE พร้อมกัน)",
    "echo ===============================================================================",
    'set "ACTION_CHOICE=2"',
    'set /p ACTION_CHOICE="เลือก [1, 2, 3] (กด Enter เพื่อเลือก [2] จำลองก่อน): "',
    'if "%ACTION_CHOICE%"=="2" goto DO_SIMULIDE',
    'if "%ACTION_CHOICE%"=="3" goto DO_BOTH',
    "goto DO_FLASH",
    "",
    ":DO_BOTH",
    'set "WANT_SIM_AFTER=1"',
    "goto DO_FLASH",
    "",
    ":DO_FLASH",
    'echo [i] กำลังอัปโหลด HEX ลงชิป ATmega328P ผ่าน avrdude [%TARGET_PORT% @ 115200 baud]...',
    "echo -------------------------------------------------------------------------------",
    "",
    'if exist "%AVRDUDE_CONF%" (',
    '    "%AVRDUDE%" -C "%AVRDUDE_CONF%" -v -p m328p -c arduino -P %TARGET_PORT% -b 115200 -D -U flash:w:"%HEX_FILE%":i',
    ") else (",
    '    "%AVRDUDE%" -v -p m328p -c arduino -P %TARGET_PORT% -b 115200 -D -U flash:w:"%HEX_FILE%":i',
    ")",
    "if errorlevel 1 goto ERR_FLASH",
    "",
    "color 0a",
    "echo.",
    "echo ===============================================================================",
    "echo   [SUCCESS] ✓ แฟลชโค้ด AVR-GCC ลงบอร์ด Arduino Uno สำเร็จสมบูรณ์!",
    "echo ===============================================================================",
    'if "%WANT_SIM_AFTER%"=="1" goto DO_SIMULIDE',
    "goto SCRIPT_END",
    "",
    ":DO_SIMULIDE",
    'if exist "%SIM_FILE%" (',
    '    echo [i] กำลังเปิดโปรแกรม SimulIDE พร้อมโหลดวงจรและไฟล์ HEX...',
    '    if exist "%SIMULIDE_EXE%" (',
    '        start "" "%SIMULIDE_EXE%" "%SIM_FILE%"',
        "        color 0a",
        "        echo.",
        "        echo ===============================================================================",
        "        echo   [SUCCESS] ✓ เปิด SimulIDE สำเร็จ! วงจรพร้อมจำลองแล้ว",
        "        echo   (คลิกปุ่มสีแดง Power ใน SimulIDE เพื่อเริ่มรันการจำลอง)",
        "        echo ===============================================================================",
    '    ) else (',
    '        color 0e',
    '        echo [!] ไม่พบพาธ simulide.exe อัตโนมัติ กรุณาลากไฟล์ "%SIM_FILE%" ไปเปิดใน SimulIDE เอง',
    '    )',
    ') else (',
    '    color 0e',
    '    echo [!] ไม่พบไฟล์วงจรจำลอง .sim1 สำหรับแล็บนี้',
    ')',
    "goto SCRIPT_END",
    "",
    ":ERR_COMPILE",
    "color 0c",
    "echo.",
    "echo [ERROR] คอมไพล์ด้วย avr-gcc ไม่ผ่าน กรุณาตรวจสอบซอร์สโค้ด",
    "goto SCRIPT_END",
    "",
    ":ERR_HEX",
    "color 0c",
    "echo.",
    "echo [ERROR] แปลงไฟล์ HEX ด้วย avr-objcopy ไม่สำเร็จ",
    "goto SCRIPT_END",
    "",
    ":ERR_FLASH",
    "color 0c",
    "echo.",
    "echo ===============================================================================",
    "echo   [FAILED] ✗ แฟลชไม่สำเร็จผ่าน avrdude",
    "echo   ข้อแนะนำการแก้ไขหน้างาน:",
    "echo    1. ตรวจสอบว่าพอร์ต %TARGET_PORT% ตรงกับบอร์ด Arduino จริงหรือไม่",
    "echo    2. ตรวจสอบว่าปิดหน้าต่าง Serial Monitor ของโปรแกรมอื่นแล้วหรือยัง",
    "echo    3. ถอดสาย USB แล้วเสียบใหม่ หรือกดปุ่ม Reset สีแดงบนบอร์ด",
    "echo    4. ตรวจสอบว่าไม่มีสายไฟจัมเปอร์ต่อค้างที่ขา D0 [RX] หรือ D1 [TX] ขณะแฟลช",
    "echo ===============================================================================",
    "goto SCRIPT_END",
    "",
    ":SCRIPT_END",
    "echo.",
    "echo กดปุ่มใดๆ เพื่อสิ้นสุดการทำงาน...",
    "pause >nul"
  );

  const batContent = lines.join("\r\n");
  const blob = new Blob([batContent], { type: "application/x-bat" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "flash_" + state.activeLabId + "_avrgcc.bat";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("✓ สร้างและดาวน์โหลดไฟล์ flash_" + state.activeLabId + "_avrgcc.bat สำเร็จ");
}

// Render Code
function renderCode() {
  const lab = LABS_DATA.find(l => l.id === state.activeLabId);
  if (!lab) return;

  const currentCode = getCurrentCode();
  const pre = document.getElementById("code-display");
  const editor = document.getElementById("code-editor");

  if (pre) pre.textContent = currentCode;
  if (editor) editor.value = currentCode;

  const isCustom = state.customCode[state.codeMode] && state.customCode[state.codeMode][state.activeLabId] !== undefined;
  const statusBadge = document.getElementById("code-custom-badge");
  if (statusBadge) {
    statusBadge.style.display = isCustom ? "inline-block" : "none";
  }

  const label = document.getElementById("code-mode-label");
  if (label) {
    label.textContent = state.codeMode === "arduino" 
      ? "Arduino IDE Standard C++ (.ino)" 
      : "Bare-metal Register-level AVR C (avr-gcc)";
  }
}

// Copy Code
function copyCode() {
  const currentCode = getCurrentCode();

  navigator.clipboard.writeText(currentCode).then(() => {
    showToast("✓ คัดลอกโค้ดเรียบร้อย พร้อมวางใน Arduino IDE");
  }).catch(() => {
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = currentCode;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast("✓ คัดลอกโค้ดเรียบร้อย");
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Theme Toggle
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
}

// Setup Event Listeners
function setupEventListeners() {
  const compSelect = document.getElementById("component-select");
  if (compSelect) {
    compSelect.addEventListener("change", (e) => {
      selectComponent(e.target.value);
    });
  }

  const editor = document.getElementById("code-editor");
  if (editor) {
    editor.addEventListener("keydown", function(e) {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "  " + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 2;
        onCustomCodeInput();
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
