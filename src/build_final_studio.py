import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, DIR)

# Import sub-modules
from studio_css import CSS_CONTENT
from studio_components_data import COMPONENTS_DATA_JS

def read_file(name):
    with open(os.path.join(DIR, name), 'r', encoding='utf-8') as f:
        return f.read()

labs_data_js = f"const LABS_DATA = {read_file('studio_labs_data.json')};"
cgram_js = read_file('studio_cgram_editor.js')
flowcharts_js = read_file('studio_flowcharts.js')
calc_js = read_file('studio_calculations.js')
datasheets_js = read_file('studio_datasheets.js')
ai_assistant_js = read_file('studio_ai_assistant.js')
report_js = read_file('studio_report_generator.js')
cheatsheets_js = read_file('studio_component_cheatsheets.js')
app_logic_js = read_file('studio_app_logic.js')

html_content = f"""<!DOCTYPE html>
<html lang="th" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AVR Practical Exam Studio - ระบบเตรียมสอบปฏิบัติ CDTI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
{CSS_CONTENT}
  </style>
</head>
<body>

  <!-- App Header -->
  <header class="app-header">
    <div class="brand-wrapper">
      <div class="brand-icon">⚡</div>
      <div class="brand-info">
        <h1>AVR Practical Exam Studio <span class="equip-badge">CDTI 2569</span></h1>
        <p>ห้องปฏิบัติการเสมือนจริง • Pinout & Wiring Table • SimulIDE Integration • Flowchart • เครื่องคิดเลขวิศวกรรม • CGRAM • Datasheet</p>
      </div>
    </div>
    <div class="header-controls">
      <button class="btn-icon" onclick="toggleTheme()" title="สลับธีม สว่าง / มืด">🌓</button>
    </div>
  </header>

  <div class="app-container">

    <!-- Step 1: Equipment Checklist & Filter (Collapsible - Collapsed by Default) -->
    <section class="equipment-section card collapsible-section collapsed" id="section-equip">
      <div class="collapsible-header" onclick="toggleSection('equip')">
        <div class="equip-title">
          <span class="collapse-icon" id="collapse-icon-equip">▼</span>
          <span>📦 1. ติ๊กเลือกอุปกรณ์ที่มีในมือ</span>
          <span class="equip-badge" id="stat-unlocked">ปลดล็อกได้ 80 / 80 แล็บ</span>
        </div>
        <div class="collapsible-actions">
          <span class="compact-summary" id="equip-compact-summary">เลือกแล้ว: Uno, Breadboard, LED x8, สวิตช์ x4... (80/80 แล็บ)</span>
          <button class="btn-toggle-collapse" id="btn-toggle-equip" onclick="event.stopPropagation(); toggleSection('equip');">
            <span>▼</span> ขยาย
          </button>
        </div>
      </div>
      <div class="collapsible-body" id="body-equip" style="margin-top: 12px; display: none;">
        <div class="equip-grid" id="equip-grid">
          <!-- Dynamically rendered -->
        </div>
      </div>
    </section>

    <!-- Step 2: Lab Selector (Collapsible - Collapsed by Default) -->
    <section class="labs-section card collapsible-section collapsed" id="section-labs">
      <div class="collapsible-header" onclick="toggleSection('labs')">
        <div class="equip-title">
          <span class="collapse-icon" id="collapse-icon-labs">▼</span>
          <span>🎯 2. เลือกโจทย์ข้อสอบและวงจรจำลอง (80 แนวโจทย์ คัดไม่ซ้ำ ครอบคลุม 7 Tiers)</span>
          <span class="lab-badge badge-tier1" id="active-lab-mini-badge" style="font-size: 11px;">กำลังทำ: Tier 1 - 01</span>
        </div>
        <div class="collapsible-actions">
          <button class="btn-toggle-collapse" id="btn-toggle-labs" onclick="event.stopPropagation(); toggleSection('labs');">
            <span>▼</span> ขยายโจทย์
          </button>
        </div>
      </div>
      <div class="collapsible-body" id="body-labs" style="margin-top: 10px; display: none;">
        <div class="lab-tabs">
          <button class="tab-btn active" data-tab="all" onclick="setTab('all'); event.stopPropagation();">ทั้งหมด (80)</button>
          <button class="tab-btn" data-tab="1" onclick="setTab(1); event.stopPropagation();">Tier 1: I/O (20)</button>
          <button class="tab-btn" data-tab="2" onclick="setTab(2); event.stopPropagation();">Tier 2: Patterns (10)</button>
          <button class="tab-btn" data-tab="3" onclick="setTab(3); event.stopPropagation();">Tier 3: 7-Seg (10)</button>
          <button class="tab-btn" data-tab="4" onclick="setTab(4); event.stopPropagation();">Tier 4: Timers/ADC (10)</button>
          <button class="tab-btn" data-tab="5" onclick="setTab(5); event.stopPropagation();">Tier 5: LCD1602 (12)</button>
          <button class="tab-btn" data-tab="6" onclick="setTab(6); event.stopPropagation();">Tier 6: Schedulers (8)</button>
          <button class="tab-btn" data-tab="7" onclick="setTab(7); event.stopPropagation();">Tier 7: Master (10)</button>
        </div>
        <div class="lab-grid" id="lab-grid">
          <!-- Dynamically rendered -->
        </div>
      </div>
    </section>

    <!-- Step 3: Main Studio Workspace -->
    <div class="studio-layout">
      
      <!-- Left Column: 3D Component Viewer & Pinout & Wiring Table -->
      <div class="viewer-card card">
        <div class="viewer-header-row">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: 8px;">
            <div style="font-weight: 700; font-size: 15px; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
              <span>🔌 3. ข้อมูลอุปกรณ์และจุดต่อขาพิน (Hardware & Pinout)</span>
            </div>
            <div style="font-size: 12px; color: var(--accent); background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.25); padding: 4px 10px; border-radius: 999px;">
              <span>💡 เลือกอุปกรณ์ด้านล่างเพื่อดูหน้าที่ของแต่ละขาพิน</span>
            </div>
          </div>
          <select class="select-component" id="component-select" style="display: none;">
            <option value="arduino">Arduino Uno R3</option>
            <option value="led">หลอดไฟ LED 5 mm</option>
            <option value="seg7">7-Segment (1 หลัก CC)</option>
            <option value="lcd">จอ LCD 16x2 (Parallel 4-bit)</option>
            <option value="pot">ตัวต้านทานปรับค่าได้ (Potentiometer)</option>
            <option value="btn">สวิตช์ปุ่มกด Tactile (4 ขา)</option>
            <option value="res">ตัวต้านทาน (Resistor 470Ω/1kΩ)</option>
            <option value="proto">บอร์ดทดลอง (Breadboard)</option>
          </select>
        </div>

        <!-- Component Switcher Tabs (Lab Components + All 8 Components) -->
        <div class="component-nav-section" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 6px;">
          <div class="lab-comp-tabs-wrapper" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span class="lab-comp-tabs-label" style="font-size: 12px; font-weight: 700; color: var(--accent);">📌 อุปกรณ์ในแล็บนี้:</span>
            <div id="lab-comp-tabs" style="display: inline-flex; gap: 6px; flex-wrap: wrap;"></div>
          </div>
          <div class="all-comp-tabs-wrapper" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding-top: 6px; border-top: 1px dashed var(--border);">
            <span style="font-size: 11.5px; color: var(--text-muted); font-weight: 600;">🗂️ อุปกรณ์ทั้งหมด (8 ชิ้น):</span>
            <div id="all-comp-tabs" style="display: inline-flex; gap: 5px; flex-wrap: wrap;"></div>
          </div>
        </div>

        <!-- Hardware Cheatsheet Card (Matches 7-Segment Screenshot + All 8 Components) -->
        <div id="circuit-deep-dive-container"></div>

        <!-- Pinout Details & Chips -->
        <div class="pinout-panel">
          <div class="pinout-header">
            <span id="comp-info-title">รายละเอียดขาอุปกรณ์</span>
            <span style="font-size: 11px; color: var(--text-muted); font-weight: 400;">คลิกที่ชื่อขาเพื่อดูหน้าที่และจุดเชื่อมต่อ</span>
          </div>
          <div class="pin-chips-wrapper" id="pin-chips">
            <!-- Pin buttons -->
          </div>
          <div class="pin-detail-box" id="pin-detail-box">
            <!-- Pin info -->
          </div>
        </div>

        <!-- Pin-to-Pin Circuit Table (Collapsible) -->
        <div style="margin-top: 6px;" class="collapsible-section" id="section-wiring">
          <div class="card-title collapsible-header" onclick="toggleSection('wiring')" style="font-size: 13.5px; margin-bottom: 6px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="collapse-icon" id="collapse-icon-wiring">▼</span>
              <span>🔌 ตารางจุดต่อสาย Pin-to-Pin ประจำ Lab นี้</span>
            </div>
            <button class="btn-toggle-collapse" id="btn-toggle-wiring" onclick="event.stopPropagation(); toggleSection('wiring');">
              <span>▲</span> ย่อเก็บ
            </button>
          </div>
          <div class="collapsible-body" id="body-wiring">
            <div class="wiring-table-wrapper">
              <table class="wiring-table">
                <thead>
                  <tr>
                    <th>อุปกรณ์</th>
                    <th>ขาอุปกรณ์</th>
                    <th>ต่อเข้ากับ</th>
                    <th>หน้าที่ / ข้อควรระวัง</th>
                  </tr>
                </thead>
                <tbody id="wiring-table-body">
                  <!-- Wiring rows -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Studio Multi-Tab Workspace -->
      <div class="code-card card">
        
        <!-- Studio Workspace Sub-Tabs -->
        <div class="studio-tab-bar">
          <button class="studio-tab-btn active" data-tab="code" onclick="setStudioTab('code')" title="ตัวแก้ไขโค้ด & แฟลชบอร์ด">
            <span>💻</span> โค้ด & แฟลช
          </button>
          <button class="studio-tab-btn" data-tab="flowchart" onclick="setStudioTab('flowchart')" title="ผังงานโปรแกรมแบบเวกเตอร์ SVG">
            <span>📊</span> ผังงาน (Flowchart)
          </button>
          <button class="studio-tab-btn" data-tab="calc" onclick="setStudioTab('calc')" title="สูตรการคำนวณวิศวกรรมฝังตัว">
            <span>🧮</span> สูตรคำนวณ
          </button>
          <button class="studio-tab-btn" data-tab="cgram" onclick="setStudioTab('cgram')" title="ปรับแต่งข้อความ LCD 16x2, จำลองหน้าจอ และออกแบบ CGRAM/ฟอนต์ไทย">
            <span>📟</span> จอ LCD & CGRAM
          </button>
          <button class="studio-tab-btn" data-tab="datasheet" onclick="setStudioTab('datasheet')" title="คู่มือสเปกและ Pinout อุปกรณ์">
            <span>📖</span> Datasheet
          </button>
          <button class="studio-tab-btn" data-tab="ai" onclick="setStudioTab('ai')" title="ผู้ช่วย AI ประจำตัว (KTS Coder Offline)">
            <span>🤖</span> ผู้ช่วย AI
          </button>
          <button class="studio-tab-btn" data-tab="report" onclick="setStudioTab('report')" title="สร้างรายงานผลการสอบปฏิบัติการมาตรฐาน CDTI A4">
            <span>📝</span> ทำรายงาน (Report)
          </button>
          <button class="studio-expand-btn" id="studio-expand-btn" onclick="toggleStudioFullscreen()" title="ขยายพื้นที่ทำงานเต็มหน้าจอ / ย่อกลับ">
            <span>⛶</span> ขยายเต็มจอ
          </button>
        </div>

        <!-- Panel 1: Code Viewer, Editor & Flasher (Active by Default) -->
        <div id="studio-tab-code" class="studio-panel-view active">
          <div class="code-header-row">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="lab-badge badge-easy" id="active-lab-badge">ระดับ</span>
              <strong id="active-lab-title" style="font-size: 15px;">ชื่อ Lab</strong>
              <span id="code-custom-badge" class="editor-badge-active" style="display: none;">✏️ ปรับแต่งแล้ว</span>
            </div>
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
              <!-- Language Mode (Arduino vs AVR) -->
              <div class="code-mode-toggles">
                <button class="mode-toggle-btn active" data-mode="arduino" onclick="setCodeMode('arduino')">Arduino C++</button>
                <button class="mode-toggle-btn" data-mode="avr" onclick="setCodeMode('avr')">Bare-metal C</button>
              </div>
              <!-- Editor View Mode (Template vs Playground) -->
              <div class="code-mode-toggles">
                <button id="btn-view-template" class="mode-toggle-btn active" onclick="setEditorMode('view')">🔒 ต้นแบบ</button>
                <button id="btn-view-edit" class="mode-toggle-btn" onclick="setEditorMode('edit')">✏️ ปรับแต่งเอง</button>
              </div>
              <button class="btn-copy" onclick="copyCode()">
                <span>📋</span> คัดลอก
              </button>
              <button class="btn-copy" style="background: linear-gradient(135deg, #0284c7, #10b981); color: white; border: none; font-weight: 600;" onclick="quickAskAI()" title="ส่งโค้ดนี้ให้ AI ช่วยวิเคราะห์หรือดัดแปลง">
                <span>🤖</span> ถาม AI ให้ช่วยโค้ดนี้
              </button>
              <button id="btn-quick-lcd-customizer" class="btn-copy" style="display: none; background: #0f766e; color: white; border: none; font-weight: 600;" onclick="openLcdCustomizerForActiveLab()" title="เปิดเครื่องมือปรับแต่งข้อความ LCD 16x2 ของแล็บนี้">
                <span>📟</span> ปรับแต่งข้อความ LCD
              </button>
            </div>
          </div>

          <p id="active-lab-desc" style="font-size: 13px; color: var(--text-muted); line-height: 1.45;">คำอธิบาย</p>

          <!-- Flash Runner & COM Port Control Toolbar -->
          <div class="flash-runner-toolbar">
            <div class="flash-port-group">
              <span class="flash-label">🔌 พอร์ต COM:</span>
              <select id="com-port-select" class="com-select" onchange="onComPortChange()">
                <option value="AUTO">🔍 ค้นหาอัตโนมัติ (Auto-Detect)</option>
                <option value="COM1">COM1</option>
                <option value="COM2">COM2</option>
                <option value="COM3">COM3</option>
                <option value="COM4">COM4</option>
                <option value="COM5">COM5</option>
                <option value="COM6">COM6</option>
                <option value="COM7">COM7</option>
                <option value="COM8">COM8</option>
                <option value="COM9">COM9</option>
                <option value="COM10">COM10</option>
                <option value="COM11">COM11 (Arduino Uno)</option>
                <option value="COM12">COM12</option>
                <option value="COM13">COM13</option>
                <option value="COM14">COM14</option>
                <option value="COM15">COM15</option>
                <option value="CUSTOM">ระบุพอร์ตเอง...</option>
              </select>
              <input type="text" id="custom-com-input" class="custom-com-input" placeholder="เช่น COM4" oninput="onCustomComInput()" style="display: none;" />
            </div>

            <div class="flash-actions-group">
              <button class="btn-action btn-flash" onclick="downloadFlashBat()" title="สร้างไฟล์ .bat สำหรับ Flash ลงบอร์ดจริง หรือเปิดจำลองใน SimulIDE อัตโนมัติ">
                <span>⚡</span> สร้างไฟล์ Flash / Sim (.bat)
              </button>
              <button class="btn-action btn-download" style="background: #0284c7; color: white;" onclick="downloadSimulideCircuit()" title="ดาวน์โหลดไฟล์วงจร .sim1 สำหรับเปิดใน SimulIDE โดยตรง">
                <span>🔌</span> โหลดวงจร SimulIDE (.sim1)
              </button>
              <button class="btn-action btn-download" onclick="downloadCodeFile()" title="บันทึกไฟล์โค้ด (.ino / .c) สำหรับเปิดใน Arduino IDE">
                <span>💾</span> ดาวน์โหลดโค้ด (.ino / .c)
              </button>
            </div>
          </div>

          <!-- Twist Assistant Bar (Quick Modification Presets) -->
          <div id="twist-bar" class="twist-bar" style="display: none;">
            <div class="twist-header">
              <span>🎯 ปุ่มลัดพลิกแพลงโจทย์หน้างาน (คลิกเพื่อแก้ไขโค้ดทันที):</span>
              <button class="twist-reset-btn" onclick="resetToTemplate()">🔄 คืนค่าโค้ดต้นแบบ</button>
            </div>
            <div class="twist-chips">
              <button class="twist-chip" onclick="applyTwist('invert_logic')">⚡ สลับ Active-LOW ⇄ HIGH</button>
              <button class="twist-chip" onclick="applyTwist('change_delay')">⏱️ เปลี่ยนความเร็ว Delay</button>
              <button class="twist-chip" onclick="applyTwist('remap_pins')">🔀 สลับขาพิน I/O</button>
              <button class="twist-chip" onclick="applyTwist('change_lcd_text')">🔡 แก้ข้อความ LCD</button>
              <button class="twist-chip" onclick="applyTwist('invert_counter')">🔄 สลับนับขึ้น ⇄ นับลง</button>
              <button class="twist-chip" onclick="applyTwist('adc_scaling')">📊 ปรับสเกลโวลต์ ADC</button>
            </div>
          </div>

          <!-- Code Block / Editor -->
          <div class="code-block-container">
            <div class="code-info-bar">
              <span id="code-mode-label">Arduino IDE Standard C++ (.ino)</span>
              <span id="editor-hint">UTF-8 • Ready to Flash</span>
            </div>
            <pre class="code-display" id="code-display">// โค้ดจะแสดงที่นี่</pre>
            <textarea class="code-editor" id="code-editor" style="display: none;" spellcheck="false" placeholder="พิมพ์หรือปรับแต่งโค้ดที่นี่..." oninput="onCustomCodeInput()"></textarea>
          </div>

          <!-- Troubleshooting & Inspection Checklist (Collapsible) -->
          <div class="troubleshooting-card collapsible-section" id="section-trouble">
            <div class="trouble-title collapsible-header" onclick="toggleSection('trouble')" style="cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="collapse-icon" id="collapse-icon-trouble">▼</span>
                <span>⚠️ เช็กลิสต์ตรวจวงจรและข้อควรระวังหน้างาน</span>
              </div>
              <button class="btn-toggle-collapse" id="btn-toggle-trouble" onclick="event.stopPropagation(); toggleSection('trouble');">
                <span>▲</span> ย่อเก็บ
              </button>
            </div>
            <ul class="trouble-list collapsible-body" id="body-trouble" style="margin-top: 6px;">
              <!-- Trouble items -->
            </ul>
          </div>
        </div>

        <!-- Panel 2: Flowchart Viewer -->
        <div id="studio-tab-flowchart" class="studio-panel-view">
          <!-- Flowchart rendered dynamically -->
        </div>

        <!-- Panel 3: Engineering Math Calculations -->
        <div id="studio-tab-calc" class="studio-panel-view">
          <!-- Calculations rendered dynamically -->
        </div>

        <!-- Panel 4: LCD CGRAM Character Designer -->
        <div id="studio-tab-cgram" class="studio-panel-view">
          <!-- CGRAM Editor rendered dynamically -->
        </div>

        <!-- Panel 5: Datasheets & Pinouts -->
        <div id="studio-tab-datasheet" class="studio-panel-view">
          <!-- Datasheet rendered dynamically -->
        </div>

        <!-- Panel 6: Local AI Assistant (KTS Coder Offline) -->
        <div id="studio-tab-ai" class="studio-panel-view">
          <!-- AI Assistant rendered dynamically -->
        </div>

        <!-- Panel 7: Academic Lab Report Generator (CDTI A4 & Markdown) -->
        <div id="studio-tab-report" class="studio-panel-view">
          <!-- Report Generator rendered dynamically -->
        </div>

      </div>

    </div>

  </div>

  <!-- Toast Notification -->
  <div class="toast" id="toast">ข้อความแจ้งเตือน</div>

  <!-- Scripts -->
  <script>
{COMPONENTS_DATA_JS}
  </script>
  <script>
{labs_data_js}
  </script>
  <script>
{cgram_js}
  </script>
  <script>
{flowcharts_js}
  </script>
  <script>
{calc_js}
  </script>
  <script>
{datasheets_js}
  </script>
  <script>
{ai_assistant_js}
  </script>
  <script>
{report_js}
  </script>
  <script>
{cheatsheets_js}
  </script>
  <script>
{app_logic_js}
  </script>
</body>
</html>
"""

output_path = os.path.join(DIR, "..", "Practical_Exam", "My_AVR_Practical_Studio.html")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Successfully generated {output_path} (File size: {len(html_content)} bytes)")
