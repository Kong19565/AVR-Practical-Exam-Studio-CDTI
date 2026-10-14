# CSS styles for My AVR Practical Studio
CSS_CONTENT = """
:root {
  --bg-main: #0f172a;
  --bg-surface: #1e293b;
  --bg-card: #182234;
  --bg-elevated: #243247;
  --border: #334155;
  --border-focus: #38bdf8;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  --primary: #0284c7;
  --primary-hover: #0369a1;
  --accent: #10b981;
  --accent-soft: rgba(16, 185, 129, 0.15);
  --warning: #f59e0b;
  --warning-soft: rgba(245, 158, 11, 0.15);
  --danger: #ef4444;
  --danger-soft: rgba(239, 68, 68, 0.15);
  --code-bg: #0b1120;
  --code-header: #131d31;
  --code-text: #e2e8f0;
  --font-main: 'Sarabun', 'TH Sarabun New', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', Consolas, Monaco, monospace;
}

[data-theme="light"] {
  --bg-main: #f1f5f9;
  --bg-surface: #ffffff;
  --bg-card: #f8fafc;
  --bg-elevated: #e2e8f0;
  --border: #cbd5e1;
  --border-focus: #0284c7;
  --text-main: #0f172a;
  --text-muted: #475569;
  --text-dim: #94a3b8;
  --primary: #0284c7;
  --primary-hover: #0369a1;
  --accent: #059669;
  --accent-soft: rgba(5, 150, 105, 0.12);
  --warning: #d97706;
  --warning-soft: rgba(217, 119, 6, 0.12);
  --danger: #dc2626;
  --danger-soft: rgba(220, 38, 38, 0.12);
  --code-bg: #1e293b;
  --code-header: #0f172a;
  --code-text: #f8fafc;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-main);
  background-color: var(--bg-main);
  color: var(--text-main);
  line-height: 1.5;
  font-size: 14.5px;
  overflow-x: hidden;
}

/* Header */
header.app-header {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  padding: 12px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.brand-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #0284c7, #10b981);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 20px;
  color: white;
}

.brand-info h1 {
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-info p {
  font-size: 12px;
  color: var(--text-muted);
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-icon {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-main);
  width: 34px;
  height: 34px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon:hover {
  border-color: var(--border-focus);
}

/* App Container */
.app-container {
  max-width: 1540px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Card Common */
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.card-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Collapsible Sections */
.collapsible-section {
  transition: all 0.25s ease;
}

.collapsible-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 10px;
  flex-wrap: wrap;
}

.collapsible-header:hover .equip-title {
  color: #38bdf8;
}

.collapse-icon {
  display: inline-block;
  font-size: 11px;
  transition: transform 0.2s ease;
  color: var(--text-dim);
  width: 14px;
  text-align: center;
}

.collapsible-section.collapsed .collapse-icon {
  transform: rotate(-90deg);
}

.collapsible-section.collapsed .collapsible-body {
  display: none !important;
}

.collapsible-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-toggle-collapse {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.btn-toggle-collapse:hover {
  background: var(--bg-surface);
  color: var(--text-main);
  border-color: var(--border-focus);
}

.compact-summary {
  font-size: 12px;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: 6px;
  max-width: 450px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Step 1: Equipment Checklist */
.equipment-section {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;
}

.equip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}

.equip-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
}

.equip-badge {
  background: var(--accent-soft);
  color: var(--accent);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.equip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 10px;
}

.equip-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.equip-item:hover {
  border-color: var(--border-focus);
  background: var(--bg-elevated);
}

.equip-item.checked {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.equip-item input[type="checkbox"] {
  width: 17px;
  height: 17px;
  cursor: pointer;
  accent-color: var(--accent);
}

.equip-item-label {
  flex: 1;
}

.equip-item-name {
  font-weight: 600;
  font-size: 13.5px;
}

.equip-item-sub {
  font-size: 11.5px;
  color: var(--text-muted);
}

.equip-qty-select {
  background: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  font-family: var(--font-mono);
}

/* Step 2: Lab Selector Tabs */
.labs-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lab-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
  flex-wrap: wrap;
}

.tab-btn {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--text-main);
  border-color: var(--border-focus);
}

.tab-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.lab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 12px;
}

.lab-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s;
  position: relative;
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.lab-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-focus);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.lab-card.active {
  border-color: var(--accent);
  background: var(--bg-elevated);
  box-shadow: 0 0 0 2px var(--accent);
}

.lab-card.locked {
  opacity: 0.6;
  border-style: dashed;
}

.lab-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.lab-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  flex-shrink: 0;
}

.badge-easy, .badge-tier1 { background: var(--accent-soft); color: var(--accent); border: 1px solid rgba(16,185,129,0.3); }
.badge-tier2 { background: rgba(6, 182, 212, 0.15); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.3); }
.badge-tier3 { background: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); }
.badge-medium, .badge-tier4 { background: var(--warning-soft); color: var(--warning); border: 1px solid rgba(245,158,11,0.3); }
.badge-hard, .badge-tier5 { background: rgba(236, 72, 153, 0.15); color: #ec4899; border: 1px solid rgba(236, 72, 153, 0.3); }
.badge-tier6 { background: rgba(168, 85, 247, 0.15); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3); }
.badge-tier7 { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }

.lab-status-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}
.status-ready { background: var(--accent-soft); color: var(--accent); }
.status-missing { background: var(--danger-soft); color: var(--danger); }

.lab-card-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.35;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.lab-card-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: anywhere;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.lab-card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: auto;
}

.equip-chip {
  background: var(--bg-card);
  border: 1px solid var(--border);
  font-size: 10.5px;
  font-family: var(--font-mono);
  padding: 1px 5px;
  border-radius: 4px;
  color: var(--text-muted);
}

/* Two-Column Studio Layout */
.studio-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 16px;
  width: 100%;
  align-items: start;
}

@media (max-width: 1024px) {
  .studio-layout {
    grid-template-columns: 1fr;
  }
}

.studio-layout > div,
.viewer-card,
.code-card {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}

/* 3D Component Viewer Column */
.viewer-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.viewer-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.select-component {
  background: var(--bg-card);
  color: var(--text-main);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
}

/* Hardware & Pinout Section */
.hardware-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

/* Pinout Panel */
.pinout-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lab-comp-tabs-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--border);
}

.lab-comp-tabs-label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

.lab-comp-tab {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.lab-comp-tab:hover {
  border-color: var(--border-focus);
  background: rgba(56, 189, 248, 0.08);
}

.lab-comp-tab.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.35);
}

.pinout-header {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pin-chips-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 180px;
  overflow-y: auto;
  padding: 4px 0;
}

.pin-chip {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 11.5px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: var(--font-mono);
}

.pin-chip:hover {
  border-color: var(--border-focus);
}

.pin-chip.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  font-weight: 700;
}

.pin-detail-box {
  background: var(--bg-surface);
  border-left: 3px solid var(--border-focus);
  padding: 8px 12px;
  border-radius: 0 4px 4px 0;
  font-size: 12.5px;
  line-height: 1.45;
}

.pin-detail-name {
  font-weight: 700;
  color: var(--border-focus);
  margin-bottom: 2px;
}

/* Wiring Table */
.wiring-table-wrapper {
  overflow-x: auto;
  border-radius: 6px;
  border: 1px solid var(--border);
}

table.wiring-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
  text-align: left;
}

table.wiring-table th {
  background: var(--bg-elevated);
  padding: 8px 10px;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

table.wiring-table td {
  padding: 7px 10px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

table.wiring-table tr:last-child td {
  border-bottom: none;
}

table.wiring-table tr:hover {
  background: var(--bg-card);
}

.wire-badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 3px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
}

/* Code Column */
.code-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.code-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

.code-header-row > div:first-child {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 220px;
  min-width: 0;
}

#active-lab-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

#active-lab-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.45;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.code-mode-toggles {
  display: inline-flex;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2px;
}

.mode-toggle-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.mode-toggle-btn.active {
  background: var(--primary);
  color: white;
}

.btn-copy {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-main);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-copy:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.code-block-container {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  position: relative;
}

.code-info-bar {
  background: var(--code-header);
  border-bottom: 1px solid var(--border);
  padding: 6px 12px;
  font-size: 11.5px;
  color: var(--text-dim);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

pre.code-display {
  padding: 12px;
  overflow-x: auto;
  max-height: 480px;
  color: var(--code-text);
  margin: 0;
}

/* Syntax Highlighting */
.c-kw { color: #f472b6; font-weight: 600; }
.c-fn { color: #38bdf8; font-weight: 600; }
.c-type { color: #4ade80; }
.c-num { color: #fb923c; }
.c-str { color: #facc15; }
.c-cm { color: #64748b; font-style: italic; }
.c-reg { color: #a78bfa; font-weight: 600; }

/* Checklist & Pitfalls */
.troubleshooting-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.trouble-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--warning);
  display: flex;
  align-items: center;
  gap: 6px;
}

.trouble-list {
  padding-left: 20px;
  font-size: 12.5px;
  color: var(--text-main);
  line-height: 1.5;
}

.trouble-list li {
  margin-bottom: 4px;
}

.trouble-list strong {
  color: var(--border-focus);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--accent);
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13.5px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1000;
}

.toast.show {
  transform: translateY(0);
  opacity: 1;
}

/* View Mode Switcher */
.view-mode-toggles {
  display: flex;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
}

.view-mode-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 5px 12px;
  font-size: 12.5px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.view-mode-btn:hover {
  color: var(--text-main);
}

.view-mode-btn.active {
  background: var(--primary);
  color: white;
}

/* Circuit Deep-Dive Card */
.circuit-deep-dive-card {
  background: var(--bg-card);
  border: 1px solid rgba(6, 182, 212, 0.4);
  border-left: 4px solid #06b6d4;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.08);
  margin-top: 6px;
}

.deep-dive-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-main);
  flex-wrap: wrap;
}

.deep-dive-badge {
  background: rgba(6, 182, 212, 0.15);
  color: #06b6d4;
  border: 1px solid rgba(6, 182, 212, 0.3);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  text-transform: uppercase;
}

.pot-pin-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.pot-pin-box {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 12.5px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s;
}

.pot-pin-box.active-v0 {
  border-color: #06b6d4;
  background: rgba(6, 182, 212, 0.1);
  box-shadow: 0 0 0 1px #06b6d4;
}

.badge-cyan {
  background: #06b6d4;
  color: #0f172a;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 11px;
  display: inline-block;
  width: fit-content;
}

.badge-red {
  background: #ef4444;
  color: white;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 11px;
  display: inline-block;
  width: fit-content;
}

.badge-blue {
  background: #3b82f6;
  color: white;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 11px;
  display: inline-block;
  width: fit-content;
}

.deep-dive-explain {
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.5;
  background: var(--bg-surface);
  padding: 8px 12px;
  border-radius: 6px;
}

.deep-dive-explain p {
  margin: 0;
}

/* Flash Runner & Toolbar */
.flash-runner-toolbar {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}

.flash-port-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1 1 auto;
}

.flash-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-main);
  white-space: nowrap;
}

.com-select {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-main);
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  max-width: 200px;
  transition: all 0.2s;
}

.com-select:focus {
  border-color: var(--accent);
}

.custom-com-input {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-main);
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 12px;
  width: 80px;
  outline: none;
}

.flash-actions-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.btn-action {
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
  border: 1px solid transparent;
  white-space: nowrap;
}

.btn-flash {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: white;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.25);
}

.btn-flash:hover {
  background: linear-gradient(135deg, #047857 0%, #059669 100%);
  transform: translateY(-1px);
}

.btn-download {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-main);
}

.btn-download:hover {
  background: var(--bg-surface);
  border-color: var(--border-focus);
}

/* Twist Bar */
.twist-bar {
  background: rgba(30, 41, 59, 0.5);
  border: 1px dashed rgba(56, 189, 248, 0.35);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.twist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12.5px;
  font-weight: 700;
  color: #38bdf8;
}

.twist-reset-btn {
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #ef4444;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.twist-reset-btn:hover {
  background: rgba(239, 68, 68, 0.15);
}

.twist-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.twist-chip {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-main);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11.5px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.twist-chip:hover {
  border-color: #38bdf8;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  transform: translateY(-1px);
}

/* Code Editor Textarea */
.code-editor {
  width: 100%;
  height: 480px;
  background: #06090e;
  color: #38bdf8;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.55;
  border: none;
  padding: 14px;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  tab-size: 2;
  white-space: pre;
  word-wrap: normal;
  overflow-x: auto;
}

.code-editor:focus {
  background: #04070b;
}

.editor-badge-active {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

/* Studio Sub-Tab Bar */
.studio-tab-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 12px;
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
}

.studio-tab-btn {
  flex: 1 1 auto;
  min-width: fit-content;
  padding: 6px 10px;
  font-family: var(--font-main);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  white-space: nowrap;
}

.studio-tab-btn:hover {
  color: var(--text-main);
  background: var(--bg-elevated);
}

.studio-tab-btn.active {
  background: var(--primary);
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.studio-panel-view {
  display: none;
}

.studio-panel-view.active {
  display: block;
}

/* CGRAM Editor */
.cgram-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cgram-slots-bar {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.cgram-slot-btn {
  padding: 6px 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-main);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-family: var(--font-mono);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.cgram-slot-btn:hover {
  border-color: #38bdf8;
}
.cgram-slot-btn.active {
  background: #0284c7;
  color: white;
  border-color: #38bdf8;
}
.cgram-workspace-row {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 16px;
}
@media (max-width: 768px) {
  .cgram-workspace-row {
    grid-template-columns: 1fr;
  }
}
.cgram-grid-box {
  background: #06090e;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cgram-pixel-grid {
  display: grid;
  grid-template-columns: repeat(5, 32px);
  grid-template-rows: repeat(8, 32px);
  gap: 4px;
  background: #111827;
  padding: 8px;
  border-radius: 6px;
  border: 2px solid #374151;
}
.cgram-cell {
  background: #1f2937;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.1s;
}
.cgram-cell:hover {
  background: #4b5563;
}
.cgram-cell.active {
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}
.cgram-presets-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.cgram-preset-btn {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-main);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.cgram-preset-btn:hover {
  border-color: #38bdf8;
  color: #38bdf8;
}
.cgram-code-view {
  background: #06090e;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cgram-preview-box {
  background: #1b382b;
  border: 2px solid #10b981;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.cgram-mini-lcd {
  background: #064e3b;
  color: #34d399;
  font-family: var(--font-mono);
  padding: 8px 12px;
  border-radius: 4px;
  letter-spacing: 2px;
  font-size: 15px;
  font-weight: 700;
  border: 1px solid #059669;
}

/* Flowchart Viewer */
.flowchart-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.flowchart-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  background: var(--bg-surface);
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
}
.flowchart-svg-wrap {
  background: #0b1120;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  min-height: 400px;
}
.flowchart-svg-wrap svg {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}

/* Calculations Panel */
.calc-panel-inner {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.calc-section-intro {
  margin-bottom: 4px;
}
.calc-section-intro h3 {
  font-size: 16px;
  color: var(--text-main);
}
.calc-section-intro p {
  font-size: 13px;
  color: var(--text-muted);
}
.calc-nav-tabs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.calc-nav-btn {
  padding: 7px 14px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-muted);
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.calc-nav-btn:hover {
  color: var(--text-main);
  background: var(--bg-elevated);
}
.calc-nav-btn.active {
  background: var(--primary);
  color: white;
  border-color: #38bdf8;
}
.calc-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
}
.calc-card h4 {
  font-size: 15px;
  margin-bottom: 4px;
  color: var(--text-main);
}
.calc-card-desc {
  font-size: 12.5px;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.calc-formula-banner {
  background: rgba(2, 132, 199, 0.1);
  border-left: 4px solid #0284c7;
  padding: 8px 12px;
  border-radius: 0 6px 6px 0;
  font-size: 12.5px;
  margin-bottom: 14px;
  color: var(--text-main);
}
.calc-formula-banner code {
  font-family: var(--font-mono);
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  color: #38bdf8;
}
.calc-inputs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.calc-input-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.calc-input-group select, .calc-input-group input {
  width: 100%;
  padding: 8px 10px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-main);
  font-size: 13px;
  outline: none;
}
.calc-input-group select:focus, .calc-input-group input:focus {
  border-color: #38bdf8;
}
.calc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 10px;
}
.calc-table th {
  background: var(--bg-surface);
  color: var(--text-muted);
  font-weight: 600;
  text-align: left;
  padding: 8px 10px;
  border-bottom: 2px solid var(--border);
}
.calc-table td {
  padding: 8px 10px;
  border-bottom: 1px solid var(--border);
  color: var(--text-main);
}
.calc-table tr:hover {
  background: rgba(255, 255, 255, 0.03);
}
.row-highlight {
  background: rgba(16, 185, 129, 0.1) !important;
  border-left: 3px solid #10b981;
}
.calc-status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}
.status-ok {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
}
.status-err {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.4);
}
.calc-code-sample {
  margin-top: 16px;
  background: #06090e;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px;
}
.calc-code-sample strong {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.calc-code-sample pre {
  font-family: var(--font-mono);
  font-size: 12px;
  color: #38bdf8;
  line-height: 1.5;
  white-space: pre-wrap;
  margin: 0;
}
.adc-slider-container {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 14px;
  border-radius: 8px;
  margin-bottom: 14px;
}
.slider-full {
  width: 100%;
  accent-color: #0284c7;
  cursor: pointer;
}
.adc-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}
.adc-stat-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}
.adc-stat-card .stat-title {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.adc-stat-card .stat-big-val {
  font-size: 20px;
  font-weight: 700;
  color: #10b981;
}
.adc-stat-card .stat-sub {
  font-size: 11px;
  color: var(--text-dim);
  margin-top: 2px;
}
.stat-highlight {
  font-size: 15px;
  font-weight: 700;
  color: #38bdf8;
  padding: 6px 0;
}
.badge-accent {
  background: #0284c7;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-family: var(--font-mono);
}
.alert-box-info {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 10px 14px;
  border-radius: 6px;
  color: var(--text-main);
}

/* Datasheet Panel */
.ds-panel-inner {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.ds-device-bar {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 6px;
}
.ds-device-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-main);
  border-radius: 6px;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.ds-device-btn:hover {
  border-color: #38bdf8;
  color: #38bdf8;
}
.ds-device-btn.active {
  background: #0284c7;
  color: white;
  border-color: #38bdf8;
  font-weight: 600;
}
.ds-main-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
}
.ds-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.ds-icon-box {
  width: 44px;
  height: 44px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.ds-summary-text {
  font-size: 13.5px;
  color: var(--text-main);
  line-height: 1.6;
  margin-bottom: 16px;
}
.ds-sub-title {
  font-size: 14px;
  color: var(--text-main);
  margin-bottom: 8px;
  font-weight: 700;
}
.pin-name-code {
  font-family: var(--font-mono);
  font-size: 12px;
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  padding: 2px 6px;
  border-radius: 4px;
}
.pin-type-badge {
  font-size: 11px;
  background: var(--bg-elevated);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text-muted);
}
.ds-pitfall-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 6px;
}
.ds-pitfall-list li {
  font-size: 13px;
  line-height: 1.5;
  background: rgba(239, 68, 68, 0.08);
  border-left: 3px solid #ef4444;
  padding: 8px 12px;
  border-radius: 0 4px 4px 0;
  color: var(--text-main);
}

/* ==========================================================================
   AI Assistant Panel Styles
   ========================================================================== */
.ai-panel-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ai-header-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.ai-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.ai-brand-badge {
  font-size: 15px;
  font-weight: 700;
  color: #38bdf8;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ai-status-pill {
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.ai-status-pill.online {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.ai-status-pill.online .status-dot { background: #10b981; }
.ai-status-pill.offline {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
.ai-status-pill.offline .status-dot { background: #ef4444; }
.ai-status-pill.checking {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}
.ai-status-pill.checking .status-dot { background: #f59e0b; }
.ai-desc {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}
.ai-model-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-main);
}
.ai-context-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
}
.ai-context-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ai-checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
}
.btn-xs-refresh {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.btn-xs-refresh:hover {
  border-color: var(--border-focus);
  color: var(--text-main);
}
.ai-code-preview-box {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 10px;
  margin-top: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--code-text);
  max-height: 55px;
  overflow-y: auto;
  transition: opacity 0.2s;
}
.ai-presets-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
}
.ai-presets-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 8px;
}
.ai-chips-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.ai-preset-chip {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-main);
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.ai-preset-chip:hover {
  border-color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  color: #38bdf8;
}
.ai-chat-thread {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  min-height: 140px;
  max-height: 250px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ai-welcome-msg, .ai-msg-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.ai-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
}
.ai-msg-content {
  flex: 1;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--text-main);
}
.ai-msg-row.user .ai-msg-content {
  background: var(--bg-elevated);
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 3px solid #38bdf8;
}
.ai-generated-code-card {
  margin: 10px 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--code-bg);
}
.ai-code-header {
  background: var(--code-header);
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
}
.code-tag {
  font-size: 11px;
  font-family: var(--font-mono);
  color: #38bdf8;
  font-weight: 600;
}
.code-header-actions {
  display: flex;
  gap: 6px;
}
.btn-apply-editor {
  background: #0284c7;
  color: white;
  border: none;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-apply-editor:hover {
  background: #0369a1;
}
.btn-copy-code {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-main);
  font-size: 11.5px;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.btn-copy-code:hover {
  border-color: var(--border-focus);
}
.ai-code-pre {
  margin: 0;
  padding: 12px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--code-text);
  overflow-x: auto;
  line-height: 1.5;
}
.ai-input-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px;
}
.ai-input-wrapper {
  display: flex;
  gap: 8px;
}
.ai-textarea {
  flex: 1;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 12px;
  color: var(--text-main);
  font-family: var(--font-main);
  font-size: 13.5px;
  resize: vertical;
  min-height: 48px;
}
.ai-textarea:focus {
  outline: none;
  border-color: var(--border-focus);
}
.ai-btn-send {
  background: linear-gradient(135deg, #0284c7, #10b981);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0 16px;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transition: opacity 0.2s;
}
.ai-btn-send:hover {
  opacity: 0.9;
}
.ai-btn-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.ai-error-box {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  padding: 10px 12px;
  border-radius: 6px;
  color: #ef4444;
  font-size: 13px;
}

/* =========================================================================
   Academic Lab Report Generator Styles & A4 Paper Preview
   ========================================================================= */
.report-panel-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.report-control-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
}

.report-control-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}

.report-control-header h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: var(--text-main);
}

.report-control-header p {
  margin: 0;
  font-size: 12.5px;
  color: var(--text-muted);
}

.report-action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.report-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.report-paper-wrapper {
  background: var(--bg-main);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
  overflow-x: auto;
}

.report-paper {
  background: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border);
  border-radius: 6px;
  max-width: 860px;
  margin: 0 auto;
  padding: 32px 36px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Sarabun', 'Leelawadee UI', sans-serif;
  font-size: 13.5px;
  line-height: 1.6;
}

.report-inst-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.inst-logo-badge {
  background: linear-gradient(135deg, #0284c7, #2563eb);
  color: white;
  font-weight: 800;
  font-size: 20px;
  padding: 10px 16px;
  border-radius: 8px;
  letter-spacing: 1px;
}

.inst-text h2 {
  margin: 0;
  font-size: 17px;
  color: var(--primary);
}

.inst-text h3 {
  margin: 2px 0;
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

.inst-text p {
  margin: 2px 0 0 0;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-main);
}

.report-divider-double {
  border: 0;
  border-top: 2px solid var(--primary);
  margin: 16px 0;
}

.report-meta-table,
.report-data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0 18px 0;
  font-size: 13px;
}

.report-meta-table td,
.report-data-table th,
.report-data-table td {
  border: 1px solid var(--border);
  padding: 8px 10px;
}

.report-data-table th {
  background: var(--bg-card);
  font-weight: 700;
  color: var(--text-main);
}

.report-section {
  margin: 20px 0;
}

.report-section-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--primary);
  border-bottom: 1.5px solid var(--border);
  padding-bottom: 4px;
  margin: 0 0 10px 0;
}

.report-list {
  margin: 6px 0 12px 20px;
  padding: 0;
}

.report-list li {
  margin-bottom: 4px;
}

.report-code-block {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px 12px;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  font-size: 11px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 280px;
  overflow-y: auto;
}

/* ==========================================================================
   Hardware Component Cheatsheet Cards (7-Segment, LCD, LED, Buttons, etc.)
   ========================================================================== */
.hw-cheatsheet-card {
  background: #0b1322;
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  max-width: 100%;
  overflow: hidden;
}

.hw-cheatsheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
  padding-bottom: 10px;
}

.hw-title-box h4 {
  font-size: 14.5px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
  letter-spacing: -0.2px;
}

.hw-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 0.3px;
}
.hw-badge.badge-cyan { background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3); }
.hw-badge.badge-green { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
.hw-badge.badge-red { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
.hw-badge.badge-amber { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
.hw-badge.badge-purple { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
.hw-badge.badge-blue { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
.hw-badge.badge-teal { background: rgba(20, 184, 166, 0.15); color: #2dd4bf; border: 1px solid rgba(20, 184, 166, 0.3); }
.hw-badge.badge-accent { background: rgba(59, 130, 246, 0.2); color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.4); }

.hw-top-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

@media (min-width: 1400px) {
  .hw-top-grid {
    display: grid;
    grid-template-columns: minmax(280px, 0.95fr) minmax(300px, 1.05fr);
    gap: 16px;
    align-items: stretch;
  }
}

.hw-visual-box {
  background: #0f172a;
  border: 1px solid rgba(51, 65, 85, 0.6);
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 135px;
  width: 100%;
  box-sizing: border-box;
}

.hw-visual-dual-container {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap;
}

.hw-graphic-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hw-seg7-box {
  width: 90px;
  height: 130px;
}
.hw-7seg-svg {
  width: 100%;
  height: 100%;
}
.hw-seg {
  fill: #3b0f0f;
  stroke: #450a0a;
  stroke-width: 1.5;
  transition: fill 0.15s ease, filter 0.15s ease;
}
.hw-seg.active {
  fill: #ef4444;
  stroke: #f87171;
  filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.9));
}
.hw-seg-dp {
  fill: #3b0f0f;
  transition: fill 0.15s ease;
}
.hw-seg-dp.active {
  fill: #ef4444;
  filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.9));
}

.hw-chip-diagram-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}
.hw-chip-pin-row {
  display: flex;
  gap: 10px;
  justify-content: space-around;
  width: 100%;
  min-width: 120px;
}
.hw-pin-label-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  color: #cbd5e1;
}
.hw-pin-label-group span {
  font-weight: 700;
  font-size: 10.5px;
}
.hw-pin-label-group small {
  color: #64748b;
  font-size: 8.5px;
}
.hw-pin-label-group.com span {
  color: #38bdf8;
}
.hw-pin-leg {
  width: 2px;
  height: 8px;
  background: #94a3b8;
  margin: 1px 0;
}
.hw-chip-body {
  min-width: 120px;
  width: auto;
  padding: 6px 12px;
  height: 48px;
  background: #1e293b;
  border: 1px solid #475569;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1f5f9;
  font-size: 11.5px;
  font-weight: 600;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.4);
  box-sizing: border-box;
}

/* LCD Visual Elements */
.lcd-container {
  width: 100%;
}
.hw-lcd-screen-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.hw-lcd-bezel {
  width: 95%;
  background: #022c22;
  border: 4px solid #14532d;
  border-radius: 6px;
  padding: 8px 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
.hw-lcd-glass {
  background: #064e3b;
  border-radius: 4px;
  padding: 6px 10px;
  font-family: 'JetBrains Mono', monospace;
  color: #6ee7b7;
  font-size: 12px;
  line-height: 1.4;
  letter-spacing: 2px;
  text-shadow: 0 0 4px rgba(110, 231, 183, 0.6);
}
.hw-lcd-pinout-bar {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 9.5px;
  color: #cbd5e1;
}
.hw-lcd-pinout-bar span {
  background: #1e293b;
  padding: 2px 5px;
  border-radius: 3px;
  border: 1px solid #334155;
}
.hw-lcd-pinout-bar .pin-hi { color: #f59e0b; border-color: rgba(245, 158, 11, 0.4); }
.hw-lcd-pinout-bar .pin-nc { color: #64748b; }
.hw-lcd-pinout-bar .pin-data { color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); }

.hw-circuit-mini-box {
  background: #1e293b;
  border-radius: 6px;
  padding: 10px 12px;
  border-left: 3px solid #38bdf8;
  width: 100%;
}
.hw-mini-title {
  font-size: 11.5px;
  font-weight: 700;
  color: #38bdf8;
  display: block;
  margin-bottom: 4px;
}
.hw-mini-flow {
  font-size: 11px;
  color: #cbd5e1;
  line-height: 1.6;
}
.hw-mini-flow code {
  background: #0f172a;
  padding: 2px 5px;
  border-radius: 3px;
  color: #a7f3d0;
  font-size: 10.5px;
}

/* Specs Table */
.hw-specs-box {
  width: 100%;
}
.hw-specs-table {
  width: 100%;
  border-collapse: collapse;
}
.hw-specs-table tr {
  border-bottom: 1px solid rgba(51, 65, 85, 0.4);
}
.hw-specs-table tr:last-child {
  border-bottom: none;
}
.hw-specs-table td {
  padding: 6px 8px;
  font-size: 12px;
  line-height: 1.45;
  vertical-align: top;
}
.hw-specs-table .spec-label {
  width: 125px;
  color: #94a3b8;
  font-weight: 600;
}
.hw-specs-table .spec-val {
  color: #f1f5f9;
}

/* Bottom Lookup Table */
.hw-bottom-section {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(51, 65, 85, 0.5);
}
.hw-table-header {
  font-size: 12.5px;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.hw-table-scroll {
  overflow-x: auto;
  max-width: 100%;
  border-radius: 6px;
  border: 1px solid rgba(51, 65, 85, 0.5);
}
.hw-lookup-table {
  width: 100%;
  border-collapse: collapse;
  background: #0f172a;
  font-size: 12px;
}
.hw-lookup-table th {
  padding: 7px 12px;
  background: #1e293b;
  color: #94a3b8;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px solid #334155;
  white-space: nowrap;
}
.hw-lookup-table td {
  padding: 5px 12px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  font-family: 'JetBrains Mono', monospace;
  color: #f1f5f9;
  white-space: nowrap;
}
.hw-lookup-table tr:hover {
  background: rgba(56, 189, 248, 0.08);
  cursor: pointer;
}
.hw-lookup-table tr.selected-row {
  background: rgba(239, 68, 68, 0.18) !important;
  border-left: 3px solid #ef4444;
}
.col-num { color: #38bdf8; font-weight: bold; width: 40px; }
.col-bin { letter-spacing: 2px; color: #e2e8f0; }
.col-hex.cc { color: #22c55e; font-weight: bold; }
.col-hex.ca { color: #f59e0b; font-weight: bold; }
.col-hi { color: #38bdf8; font-weight: bold; }

/* Warnings Box */
.hw-warnings-box {
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.06);
  border-left: 3px solid #ef4444;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.hw-warning-line {
  font-size: 12px;
  color: #fca5a5;
  line-height: 1.5;
  display: flex;
  gap: 6px;
}
.hw-warn-bullet {
  color: #ef4444;
  font-weight: bold;
}
"""
print("studio_css.py written.")

