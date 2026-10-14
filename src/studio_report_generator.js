// =========================================================================
// Academic Lab Report Generator Module (CDTI Format A4 & Markdown)
// =========================================================================

const ENGINEERING_DICTIONARY = [
  { term: "DDRx", full: "Data Direction Register (DDRB, DDRC, DDRD)", def: "รีจิสเตอร์กำหนดทิศทางขาพอร์ต: บิตเป็น 1 = OUTPUT, บิตเป็น 0 = INPUT" },
  { term: "PORTx", full: "Port Output / Pull-Up Register (PORTB, PORTC, PORTD)", def: "เขียน 1 ขณะเป็น Output ให้ไฟออก 5V, เขียน 1 ขณะเป็น Input เพื่อเปิด Internal Pull-Up" },
  { term: "PINx", full: "Port Input Pins Address Register (PINB, PINC, PIND)", def: "รีจิสเตอร์สำหรับอ่านระดับลอจิกดิจิทัลจริงจากขาภายนอก (Physical Voltage Level)" },
  { term: "sbi / cbi", full: "Set Bit in I/O / Clear Bit in I/O", def: "คำสั่ง Assembly สำหรับตั้งค่าบิตรีจิสเตอร์ I/O เป็น 1 (sbi) หรือเคลียร์เป็น 0 (cbi) ใน 1-2 Cycles" },
  { term: "sbis / sbic", full: "Skip if Bit in I/O is Set / Cleared", def: "คำสั่งตรวจสอบสถานะลอจิกพิน หากตรงตามเงื่อนไขจะข้ามคำสั่งถัดไป ใช้ตรวจจับปุ่มกดทันที" },
  { term: "F_CPU", full: "CPU Clock Frequency", def: "ความถี่สัญญาณนาฬิกาของซีพียู กำหนดเป็น 16000000UL (16 MHz คริสตัลภายนอก) สำหรับฟังก์ชันหน่วงเวลา" },
  { term: "ISR", full: "Interrupt Service Routine", def: "ฟังก์ชันตอบสนองเหตุการณ์แทรกแซงฮาร์ดแวร์ (External INT0/INT1 หรือ Timer Overflow) ทำงานแบบเรียลไทม์" },
  { term: "ADC", full: "Analog-to-Digital Converter", def: "โมดูลแปลงสัญญาณแรงดันแอนะล็อก (0-5V) เป็นตัวเลขดิจิทัลความละเอียด 10 บิต (0-1023)" },
  { term: "Fast PWM", full: "Fast Pulse Width Modulation", def: "การสร้างสัญญาณพัลส์ความถี่คงที่ ปรับความกว้างช่วงบวก (Duty Cycle) เพื่อควบคุมความสว่างหลอดไฟหรือความเร็วมอเตอร์" },
  { term: "CTC Mode", full: "Clear Timer on Compare Match", def: "โหมดนับเวลาของฮาร์ดแวร์ไทเมอร์ โดยตัวนับจะรีเซ็ตกลับเป็นศูนย์ทันทีเมื่อมีค่าเท่ากับรีจิสเตอร์ OCRnx" },
  { term: "HD44780", full: "Hitachi Dot Matrix Liquid Crystal Display Controller", def: "ไอซีคอนโทรลเลอร์มาตรฐานของจอ LCD 16x2 รองรับการส่งคำสั่งและข้อมูลทั้งโหมด 8-Bit และ 4-Bit" },
  { term: "CGRAM", full: "Character Generator RAM", def: "หน่วยความจำสำหรับสร้างและจัดเก็บฟอนต์อักขระหรือไอคอนพิเศษขนาด 5x8 พิกเซลได้ 8 ตัวอักษรบนจอ LCD" },
  { term: "Active-Low", full: "Active-Low Logic Convention", def: "ระบบลอจิกที่ทำงานเมื่อสัญญาณทางไฟฟ้าเป็น '0' (0V หรือ GND) นิยมใช้กับสวิตช์ปุ่มกด Pull-up" },
  { term: "Active-High", full: "Active-High Logic Convention", def: "ระบบลอจิกที่ทำงานเมื่อสัญญาณทางไฟฟ้าเป็น '1' (+5V) นิยมใช้กับวงจรขับหลอด LED แบบจำกัดกระแส" },
  { term: "Debounce", full: "Switch Contact Bounce Suppression", def: "เทคนิคขจัดสัญญาณกระดอนของหน้าสัมผัสทางกลในสวิตช์ด้วยซอฟต์แวร์หน่วงเวลา (20 ms)" }
];

const STUDIO_REPORT = {
  student: {
    name: "นายอภิสักก์ คงภักดี",
    id: "6710301009",
    dept: "สาขาวิชาวิศวกรรมคอมพิวเตอร์ สถาบันเทคโนโลยีจิตรลดา (CDTI)",
    course: "311-3303 การออกแบบระบบสมองกลฝังตัว (Embedded System Design)",
    date: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
  },

  getAcronymsForLab: function(lab) {
    const list = [
      ENGINEERING_DICTIONARY[0], // DDRx
      ENGINEERING_DICTIONARY[1], // PORTx
      ENGINEERING_DICTIONARY[2], // PINx
      ENGINEERING_DICTIONARY[3], // sbi/cbi
      ENGINEERING_DICTIONARY[4], // sbis/sbic
      ENGINEERING_DICTIONARY[5]  // F_CPU
    ];

    if (lab.req.lcd > 0 || lab.id.includes("lcd")) {
      list.push(ENGINEERING_DICTIONARY[10]); // HD44780
      list.push(ENGINEERING_DICTIONARY[11]); // CGRAM
    }
    if (lab.req.pot > 0 || lab.id.includes("adc")) {
      list.push(ENGINEERING_DICTIONARY[7]);  // ADC
      list.push(ENGINEERING_DICTIONARY[8]);  // Fast PWM
    }
    if (lab.id.includes("interrupt") || lab.id.includes("timer")) {
      list.push(ENGINEERING_DICTIONARY[6]);  // ISR
      list.push(ENGINEERING_DICTIONARY[9]);  // CTC Mode
    }
    list.push(ENGINEERING_DICTIONARY[12]);   // Active-Low
    list.push(ENGINEERING_DICTIONARY[13]);   // Active-High
    list.push(ENGINEERING_DICTIONARY[14]);   // Debounce
    return list;
  },

  renderReportPanel: function(labId) {
    const lab = LABS_DATA.find(l => l.id === labId) || LABS_DATA[0];
    const acronyms = this.getAcronymsForLab(lab);

    return `
      <div class="report-panel-container">
        <!-- Control Header & Metadata Form -->
        <div class="report-control-card">
          <div class="report-control-header">
            <div>
              <h3>📝 สร้างรายงานผลการสอบปฏิบัติการ (Academic Lab Report Generator)</h3>
              <p>ระบบรวบรวมข้อมูลโจทย์, ตารางพิน, ผังงาน, โค้ด C และ Assembly ออกเป็นเล่มรายงาน A4 ตามมาตรฐาน CDTI</p>
            </div>
            <div class="report-action-buttons">
              <button class="btn btn-primary" onclick="STUDIO_REPORT.printReport('${lab.id}')">🖨️ พิมพ์รายงาน A4 / PDF</button>
              <button class="btn btn-secondary" onclick="STUDIO_REPORT.downloadHtml('${lab.id}')">💾 บันทึก Report.html</button>
              <button class="btn btn-secondary" onclick="STUDIO_REPORT.copyMarkdown('${lab.id}')">📋 คัดลอก Markdown</button>
              <button class="btn btn-secondary" onclick="STUDIO_REPORT.downloadText('${lab.id}')">📄 ดาวน์โหลด .txt</button>
            </div>
          </div>

          <!-- Student & Exam Details Form -->
          <div class="report-form-grid">
            <div class="form-group">
              <label>👤 ชื่อ-นามสกุล ผู้ทำการทดลอง:</label>
              <input type="text" id="rep-student-name" class="form-input" value="${this.student.name}" oninput="STUDIO_REPORT.updateField('name', this.value)">
            </div>
            <div class="form-group">
              <label>🆔 รหัสนักศึกษา:</label>
              <input type="text" id="rep-student-id" class="form-input" value="${this.student.id}" oninput="STUDIO_REPORT.updateField('id', this.value)">
            </div>
            <div class="form-group">
              <label>🏛️ สาขาวิชา / สถาบัน:</label>
              <input type="text" id="rep-student-dept" class="form-input" value="${this.student.dept}" oninput="STUDIO_REPORT.updateField('dept', this.value)">
            </div>
            <div class="form-group">
              <label>📅 วันที่ทำการทดลอง:</label>
              <input type="text" id="rep-exam-date" class="form-input" value="${this.student.date}" oninput="STUDIO_REPORT.updateField('date', this.value)">
            </div>
          </div>
        </div>

        <!-- Live Report Document A4 Preview -->
        <div class="report-paper-wrapper">
          <div class="report-paper" id="printable-report-area">

            <!-- Institutional Header -->
            <div class="report-inst-header">
              <div class="inst-logo-badge">CDTI</div>
              <div class="inst-text">
                <h2>สถาบันเทคโนโลยีจิตรลดา (Chitralada Technology Institute)</h2>
                <h3>คณะเทคโนโลยีดิจิทัล • สาขาวิชาวิศวกรรมคอมพิวเตอร์และนวัตกรรม</h3>
                <p>รายงานผลการสอบปฏิบัติการ วิชา 311-3303 การออกแบบระบบสมองกลฝังตัว (Embedded System Design)</p>
              </div>
            </div>

            <hr class="report-divider-double">

            <!-- Meta Information Table -->
            <table class="report-meta-table">
              <tr>
                <td style="width: 20%; font-weight: bold; background: var(--bg-card);">หัวข้อการทดลอง:</td>
                <td style="width: 80%; font-weight: bold; color: var(--primary);">${lab.title}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background: var(--bg-card);">ผู้ทำการทดลอง:</td>
                <td><span id="preview-student-name">${this.student.name}</span> (รหัสนักศึกษา: <span id="preview-student-id">${this.student.id}</span>)</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background: var(--bg-card);">สาขาวิชา / ภาคเรียน:</td>
                <td><span id="preview-student-dept">${this.student.dept}</span> • ภาคเรียนที่ 1 ปีการศึกษา 2569</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background: var(--bg-card);">ฮาร์ดแวร์เป้าหมาย:</td>
                <td>บอร์ด Arduino Uno R3 (ไมโครคอนโทรลเลอร์ Microchip ATmega328P @ 16 MHz)</td>
              </tr>
            </table>

            <!-- Section 1: Objectives -->
            <div class="report-section">
              <h3 class="report-section-title">1. วัตถุประสงค์การเรียนรู้เชิงลึก (In-depth Objectives)</h3>
              <ol class="report-list">
                <li>เข้าใจการจัดสรรพอร์ต I/O และกำหนดทิศทางข้อมูลผ่านรีจิสเตอร์ DDRx (DDRB, DDRC, DDRD)</li>
                <li>ศึกษาการประมวลผลอินพุตแบบ Active-Low ร่วมกับตัวต้านทาน Internal Pull-Up ผ่านรีจิสเตอร์ PINx และ PORTx</li>
                <li>วิเคราะห์และเปรียบเทียบการทำงานระหว่างภาษา Embedded C (Register-level) และภาษา AVR Assembly</li>
                <li>พิสูจน์การทำงานของวงจรฮาร์ดแวร์จริงบนแผงต่อวงจร (Breadboard) และจำลองบนโปรแกรม SimulIDE</li>
              </ol>
            </div>

            <!-- Section 2: Hardware Pinout Matrix -->
            <div class="report-section">
              <h3 class="report-section-title">2. ตารางกำหนดขาฮาร์ดแวร์และการเชื่อมต่อจริง (Hardware Pinout & Wiring Table)</h3>
              <table class="report-data-table">
                <thead>
                  <tr>
                    <th style="width: 25%;">อุปกรณ์ต่อพ่วง</th>
                    <th style="width: 20%;">ขาอุปกรณ์</th>
                    <th style="width: 25%;">ต่อเข้ากับขา Arduino Uno</th>
                    <th style="width: 30%;">หน้าที่และข้อควรระวังในวงจร</th>
                  </tr>
                </thead>
                <tbody>
                  ${lab.wiring.map(w => `
                    <tr>
                      <td><strong>${w.comp}</strong></td>
                      <td><code>${w.pin}</code></td>
                      <td><strong style="color: var(--primary);">${w.target}</strong></td>
                      <td>${w.note}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Section 3: Engineering Acronyms Dictionary -->
            <div class="report-section">
              <h3 class="report-section-title">3. พจนานุกรมคำศัพท์ ตัวย่อ และชุดคำสั่งทางวิศวกรรม (Engineering Dictionary)</h3>
              <table class="report-data-table">
                <thead>
                  <tr>
                    <th style="width: 18%;">ตัวย่อ (Term)</th>
                    <th style="width: 32%;">ชื่อเต็มภาษาอังกฤษ (Full Name)</th>
                    <th style="width: 50%;">ความหมายและบทบาทหน้าที่ทางวิศวกรรม</th>
                  </tr>
                </thead>
                <tbody>
                  ${acronyms.map(a => `
                    <tr>
                      <td><strong>${a.term}</strong></td>
                      <td><em>${a.full}</em></td>
                      <td>${a.def}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Section 4: Algorithm Flowchart -->
            <div class="report-section">
              <h3 class="report-section-title">4. ผังงานกระบวนการทำงานของระบบ (System Algorithm Flowchart)</h3>
              <div class="report-flowchart-box" style="text-align: center; margin: 15px 0; background: var(--bg-main, #0b1120); border: 1px solid var(--border); border-radius: 8px; padding: 18px 10px; overflow-x: auto; display: flex; justify-content: center; align-items: center;">
                ${typeof STUDIO_FLOWCHARTS !== 'undefined' ? STUDIO_FLOWCHARTS.generateSvg(lab.id) : ''}
              </div>
            </div>

            <!-- Section 5: Source Code (C & Assembly) -->
            <div class="report-section">
              <h3 class="report-section-title">5. ซอร์สโค้ดภาษาซีและภาษาแอสเซมบลีฉบับสมบูรณ์ (Source Code)</h3>
              
              <h4 style="margin: 10px 0 4px 0; color: var(--primary);">5.1 ซอร์สโค้ดภาษาซีระดับรีจิสเตอร์ (Embedded C / AVR-GCC):</h4>
              <pre class="report-code-block"><code>${this.escapeHtml(lab.avrCode || lab.arduinoCode || '// ไม่มีข้อมูลโค้ด C')}</code></pre>

              <h4 style="margin: 16px 0 4px 0; color: var(--primary);">5.2 ซอร์สโค้ดภาษาแอสเซมบลี (AVR Assembly GNU Syntax):</h4>
              <pre class="report-code-block"><code>${this.escapeHtml(lab.asmCode || '; ไม่มีข้อมูลโค้ด Assembly')}</code></pre>
            </div>

            <!-- Section 6: Observation & Discussion -->
            <div class="report-section">
              <h3 class="report-section-title">6. สรุปและอภิปรายผลการทดลอง (Conclusion & Engineering Discussion)</h3>
              <div style="margin-bottom: 8px;">
                <label style="font-size: 11.5px; color: var(--text-muted);">บันทึกผลการสังเกตจริง (สามารถพิมพ์แก้ไขได้โดยตรง):</label>
                <textarea id="rep-observation-text" class="form-textarea" rows="4" style="width: 100%; margin-top: 4px; padding: 8px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg-surface); font-family: 'Sarabun', sans-serif; font-size: 12.5px;">1. วงจรฮาร์ดแวร์จริงสามารถทำงานได้ถูกต้องตรงตามข้อกำหนดของแล็บ ${lab.title} ทุกประการ
2. สัญญาณอินพุตตอบสนองแม่นยำ ไม่พบปัญหาสัญญาณกระดอนอันเนื่องมาจากการใช้เทคนิค Software Debounce 20 ms
3. โค้ดภาษา C และ Assembly ให้ผลการทำงานเทียบเคียงกัน โดยภาษา Assembly มีรอบเวลาการประมวลผลที่แน่นอน (Deterministic Timing) ในขณะที่ภาษา C พัฒนาและดูแลรักษาได้สะดวกกว่า
4. กระแสไฟฟ้าที่ไหลผ่านหลอด LED อยู่ในเกณฑ์ปลอดภัย (~6-10 mA) จากการใช้ตัวต้านทานจำกัดกระแส 470 โอห์ม</textarea>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  updateField: function(field, val) {
    this.student[field] = val;
    const nameEl1 = document.getElementById("preview-student-name");
    const idEl = document.getElementById("preview-student-id");
    const deptEl = document.getElementById("preview-student-dept");
    if (field === 'name' && nameEl1) {
      nameEl1.textContent = val;
    }
    if (field === 'id' && idEl) {
      idEl.textContent = val;
    }
    if (field === 'dept' && deptEl) {
      deptEl.textContent = val;
    }
  },

  escapeHtml: function(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  buildFullHtmlDocument: function(labId) {
    const lab = LABS_DATA.find(l => l.id === labId) || LABS_DATA[0];
    const acronyms = this.getAcronymsForLab(lab);
    const svgContent = typeof STUDIO_FLOWCHARTS !== 'undefined' ? STUDIO_FLOWCHARTS.generateSvg(lab.id) : '';
    const obsText = document.getElementById("rep-observation-text") ? document.getElementById("rep-observation-text").value : "ระบบทำงานถูกต้องตามข้อกำหนดวิศวกรรม";

    return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<title>รายงานปฏิบัติการ - ${lab.title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
@page {
  size: A4 portrait;
  margin: 12mm 15mm 15mm 15mm;
}
@media print {
  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .no-print { display: none !important; }
}
body {
  font-family: 'Sarabun', 'Leelawadee UI', sans-serif;
  font-size: 11pt;
  line-height: 1.5;
  color: #0f172a;
  background-color: #ffffff;
  margin: 0;
  padding: 15px;
}
h1, h2, h3, h4 {
  font-family: 'Sarabun', sans-serif;
  color: #0f172a;
  margin-top: 0;
}
h1 { font-size: 16pt; border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-bottom: 6px; }
h2 { font-size: 13pt; margin-bottom: 4px; }
h3 { font-size: 11.5pt; color: #0369a1; margin-top: 14px; margin-bottom: 6px; page-break-after: avoid; }
h4 { font-size: 10.5pt; color: #0f766e; margin-top: 8px; margin-bottom: 4px; page-break-after: avoid; }
table {
  border-collapse: collapse;
  width: 100%;
  margin: 8px 0 12px 0;
  font-size: 9.5pt;
  break-inside: avoid;
  page-break-inside: avoid;
}
th, td {
  border: 1px solid #94a3b8;
  padding: 5px 8px;
  text-align: left;
  vertical-align: top;
}
th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #0f172a;
}
table tr {
  break-inside: avoid;
  page-break-inside: avoid;
}
pre {
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 8px 10px;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  font-size: 8pt;
  line-height: 1.35;
  color: #0f172a;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 6px 0 12px 0;
  break-inside: avoid;
  page-break-inside: avoid;
}
.report-header-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.badge-cdti {
  background: #0284c7;
  color: #ffffff;
  font-weight: 700;
  font-size: 14pt;
  padding: 6px 12px;
  border-radius: 6px;
}
.report-flowchart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 14px 10px;
  margin: 14px 0;
  overflow-x: auto;
  break-inside: avoid;
  page-break-inside: avoid;
}
.report-flowchart-container svg,
.report-flowchart-box svg {
  max-width: 100% !important;
  height: auto !important;
  display: block;
  margin: 0 auto;
}
@media print {
  .report-flowchart-container {
    background: #0f172a !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    padding: 10px 0 !important;
    margin: 10px 0 !important;
    border: 1px solid #475569 !important;
  }
  .report-flowchart-container svg {
    max-width: 88% !important;
    height: auto !important;
  }
}
</style>
</head>
<body>
  <div class="report-header-banner">
    <div class="badge-cdti">CDTI</div>
    <div>
      <h2 style="margin: 0; color: #0284c7;">สถาบันเทคโนโลยีจิตรลดา (Chitralada Technology Institute)</h2>
      <p style="margin: 2px 0; font-size: 9.5pt; color: #475569;">คณะเทคโนโลยีดิจิทัล • สาขาวิชาวิศวกรรมคอมพิวเตอร์และนวัตกรรม</p>
      <p style="margin: 0; font-size: 9pt; font-weight: 600;">รายงานผลการสอบปฏิบัติการ วิชา 311-3303 การออกแบบระบบสมองกลฝังตัว</p>
    </div>
  </div>

  <hr style="border: 0; border-top: 1.5px solid #0284c7; margin: 8px 0 12px 0;">

  <table>
    <tr>
      <td style="width: 22%; font-weight: bold; background: #f8fafc;">หัวข้อการทดลอง:</td>
      <td style="width: 78%; font-weight: bold; color: #0369a1;">${lab.title}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; background: #f8fafc;">ผู้ทำการทดลอง:</td>
      <td>${this.student.name} (รหัสนักศึกษา: ${this.student.id})</td>
    </tr>
    <tr>
      <td style="font-weight: bold; background: #f8fafc;">สาขาวิชา / วันที่:</td>
      <td>${this.student.dept} • วันที่ทำการทดลอง: ${this.student.date}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; background: #f8fafc;">ฮาร์ดแวร์เป้าหมาย:</td>
      <td>บอร์ด Arduino Uno R3 (ไมโครคอนโทรลเลอร์ Microchip ATmega328P @ 16 MHz)</td>
    </tr>
  </table>

  <h3>1. วัตถุประสงค์การเรียนรู้เชิงลึก (Objectives)</h3>
  <ol style="margin: 4px 0 10px 20px; padding: 0;">
    <li>เข้าใจการกำหนดทิศทางของพอร์ต (I/O Direction) ด้วยรีจิสเตอร์ DDRx (DDRB, DDRD)</li>
    <li>ศึกษาการใช้งานตัวต้านทานพูลอัปภายใน (Internal Pull-Up Resistor) ผ่านรีจิสเตอร์ PORTx แบบ Active-Low</li>
    <li>วิเคราะห์เปรียบเทียบการพัฒนาโปรแกรมระหว่างภาษา Embedded C และ AVR Assembly</li>
    <li>พิสูจน์การทำงานของวงจรฮาร์ดแวร์จริงบนเบรดบอร์ดร่วมกับโปรแกรม SimulIDE ให้ถูกต้องตามข้อกำหนด</li>
  </ol>

  <h3>2. ตารางกำหนดขาฮาร์ดแวร์และการเชื่อมต่อจริง (Hardware Pinout & Wiring Table)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">อุปกรณ์ต่อพ่วง</th>
        <th style="width: 20%;">ขาอุปกรณ์</th>
        <th style="width: 25%;">ต่อเข้ากับขา Arduino Uno</th>
        <th style="width: 30%;">หน้าที่และข้อควรระวังในวงจร</th>
      </tr>
    </thead>
    <tbody>
      ${lab.wiring.map(w => `
        <tr>
          <td><strong>${w.comp}</strong></td>
          <td><code>${w.pin}</code></td>
          <td><strong style="color: #0284c7;">${w.target}</strong></td>
          <td>${w.note}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h3>3. พจนานุกรมคำศัพท์ ตัวย่อ และชุดคำสั่งทางวิศวกรรม (Engineering Dictionary)</h3>
  <table>
    <thead>
      <tr>
        <th style="width: 18%;">ตัวย่อ (Term)</th>
        <th style="width: 32%;">ชื่อเต็มภาษาอังกฤษ (Full Name)</th>
        <th style="width: 50%;">ความหมายและบทบาทหน้าที่ทางวิศวกรรม</th>
      </tr>
    </thead>
    <tbody>
      ${acronyms.map(a => `
        <tr>
          <td><strong>${a.term}</strong></td>
          <td><em>${a.full}</em></td>
          <td>${a.def}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h3>4. ผังงานกระบวนการทำงานของระบบ (System Algorithm Flowchart)</h3>
  <div class="report-flowchart-container">
    ${svgContent}
  </div>

  <h3>5. ซอร์สโค้ดภาษาซีและภาษาแอสเซมบลีฉบับสมบูรณ์ (Source Code)</h3>
  <h4>5.1 ซอร์สโค้ดภาษาซีระดับรีจิสเตอร์ (Embedded C / AVR-GCC):</h4>
  <pre><code>${this.escapeHtml(lab.avrCode || lab.arduinoCode || '// ไม่มีข้อมูลโค้ด C')}</code></pre>

  <h4>5.2 ซอร์สโค้ดภาษาแอสเซมบลี (AVR Assembly GNU Syntax):</h4>
  <pre><code>${this.escapeHtml(lab.asmCode || '; ไม่มีข้อมูลโค้ด Assembly')}</code></pre>

  <h3>6. สรุปและอภิปรายผลการทดลอง (Conclusion & Discussion)</h3>
  <p style="white-space: pre-wrap; margin: 4px 0 12px 0; padding: 8px 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px;">${this.escapeHtml(obsText)}</p>
</body>
</html>`;
  },

  printReport: function(labId) {
    const html = this.buildFullHtmlDocument(labId);
    const win = window.open('', '_blank');
    if (!win) {
      alert("กรุณาอนุญาต Pop-up บนเบราว์เซอร์เพื่อเปิดหน้าต่างพิมพ์รายงาน A4");
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
    }, 600);
  },

  downloadHtml: function(labId) {
    const lab = LABS_DATA.find(l => l.id === labId) || LABS_DATA[0];
    const html = this.buildFullHtmlDocument(labId);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Report_${lab.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  downloadText: function(labId) {
    const lab = LABS_DATA.find(l => l.id === labId) || LABS_DATA[0];
    const obsText = document.getElementById("rep-observation-text") ? document.getElementById("rep-observation-text").value : "ระบบทำงานถูกต้องตามข้อกำหนด";

    const text = `================================================================================
รายงานผลการปฏิบัติการสอบ Embedded System Design Lab (311-3303)
สถาบันเทคโนโลยีจิตรลดา (Chitralada Technology Institute)
================================================================================

หัวข้อการทดลอง: ${lab.title}
ผู้ทำการทดลอง : ${this.student.name} (รหัสนักศึกษา: ${this.student.id})
สาขาวิชา      : ${this.student.dept}
วันที่ทำการทดลอง: ${this.student.date}
ฮาร์ดแวร์เป้าหมาย: บอร์ด Arduino Uno R3 (ATmega328P @ 16 MHz)

--------------------------------------------------------------------------------
1. วัตถุประสงค์ของการทดลอง (Objectives)
--------------------------------------------------------------------------------
1. เข้าใจการกำหนดทิศทางพอร์ต I/O (DDRx) และการเปิดใช้ Internal Pull-up (PORTx)
2. ศึกษาการประมวลผลอินพุตแบบ Active-Low และการกำจัดสัญญาณกระดอน (Debounce)
3. เปรียบเทียบซอร์สโค้ดระหว่างภาษา Embedded C และภาษา AVR Assembly
4. พิสูจน์การทำงานของวงจรฮาร์ดแวร์จริงบน Breadboard และโปรแกรม SimulIDE

--------------------------------------------------------------------------------
2. ตารางจุดต่อสาย Pin-to-Pin ประจำ Lab
--------------------------------------------------------------------------------
${lab.wiring.map(w => `- ${w.comp} [${w.pin}] -> ${w.target} (${w.note})`).join('\n')}

--------------------------------------------------------------------------------
3. สรุปและอภิปรายผลการทดลอง (Conclusion & Results)
--------------------------------------------------------------------------------
${obsText}
================================================================================`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Report_${lab.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  copyMarkdown: function(labId) {
    const lab = LABS_DATA.find(l => l.id === labId) || LABS_DATA[0];
    const acronyms = this.getAcronymsForLab(lab);
    const obsText = document.getElementById("rep-observation-text") ? document.getElementById("rep-observation-text").value : "ระบบทำงานถูกต้องตามข้อกำหนด";

    const md = `# รายงานปฏิบัติการ ${lab.title}
**วิชา:** การออกแบบระบบสมองกลฝังตัว (Embedded System Design) | **สถาบัน:** สถาบันเทคโนโลยีจิตรลดา (CDTI)  
**ผู้ทำการทดลอง:** ${this.student.name} (รหัสนักศึกษา: ${this.student.id})  
**วันที่:** ${this.student.date} | **ฮาร์ดแวร์:** Arduino Uno R3 (ATmega328P @ 16 MHz)  

---

## 1. วัตถุประสงค์การเรียนรู้เชิงลึก (Objectives)
1. เข้าใจการกำหนดทิศทางพอร์ต I/O (DDRB, DDRC, DDRD)
2. ศึกษาการใช้งานตัวต้านทานพูลอัปภายใน (Internal Pull-Up) ผ่านรีจิสเตอร์ PORTx แบบ Active-Low
3. เปรียบเทียบการพัฒนาโปรแกรมระหว่างภาษา Embedded C และ AVR Assembly
4. ตรวจสอบการทำงานของวงจรฮาร์ดแวร์จริงและซิมูเลชันบน SimulIDE

---

## 2. ตารางกำหนดขาฮาร์ดแวร์และการเชื่อมต่อจริง (Hardware Pinout & Wiring Table)

| อุปกรณ์ต่อพ่วง | ขาอุปกรณ์ | ต่อเข้ากับขา Arduino Uno | หน้าที่และคำอธิบายในวงจร |
|:---|:---:|:---:|:---|
${lab.wiring.map(w => `| **${w.comp}** | \`${w.pin}\` | \`${w.target}\` | ${w.note} |`).join('\n')}

---

## 3. พจนานุกรมคำศัพท์ ตัวย่อ และชุดคำสั่งวิศวกรรม (Engineering Dictionary)

| ตัวย่อ (Term) | คำเต็มภาษาอังกฤษ (Full Name) | ความหมายและบทบาทหน้าที่ทางวิศวกรรม |
|:---|:---|:---|
${acronyms.map(a => `| **${a.term}** | *${a.full}* | ${a.def} |`).join('\n')}

---

## 4. ซอร์สโค้ดภาษาซีระดับรีจิสเตอร์ (Embedded C / AVR-GCC)

\`\`\`c
${lab.avrCode || lab.arduinoCode || '// โค้ด C'}
\`\`\`

---

## 5. ซอร์สโค้ดภาษาแอสเซมบลี (AVR Assembly GNU Syntax)

\`\`\`assembly
${lab.asmCode || '; โค้ด Assembly'}
\`\`\`

---

## 6. สรุปและอภิปรายผลการทดลอง (Conclusion & Discussion)

${obsText}
`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(md).then(() => {
        alert("คัดลอกรายงานผลการทดลองแบบ Markdown เรียบร้อยแล้ว!");
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = md;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      alert("คัดลอกรายงานผลการทดลองแบบ Markdown เรียบร้อยแล้ว!");
    }
  }
};
