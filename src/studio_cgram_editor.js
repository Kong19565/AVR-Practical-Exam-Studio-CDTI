// studio_cgram_editor.js - LCD CGRAM 5x8 Custom Character Designer
// Provides interactive 5x8 matrix grid, 8 memory slots, presets, C array generator, and direct editor insertion

const STUDIO_CGRAM = {
  activeSlot: 0,
  slots: [
    [0x00, 0x0A, 0x1F, 0x1F, 0x0E, 0x04, 0x00, 0x00], // slot 0: Heart
    [0x1C, 0x14, 0x1C, 0x00, 0x00, 0x00, 0x00, 0x00], // slot 1: Degree
    [0x00, 0x0A, 0x00, 0x04, 0x00, 0x11, 0x0E, 0x00], // slot 2: Smiley
    [0x04, 0x0E, 0x15, 0x04, 0x04, 0x04, 0x04, 0x00], // slot 3: Up Arrow
    [0x04, 0x04, 0x04, 0x04, 0x15, 0x0E, 0x04, 0x00], // slot 4: Down Arrow
    [0x04, 0x0E, 0x0E, 0x0E, 0x1F, 0x00, 0x04, 0x00], // slot 5: Bell
    [0x04, 0x0A, 0x0A, 0x0E, 0x0E, 0x1F, 0x1F, 0x0E], // slot 6: Thermo
    [0x04, 0x04, 0x0A, 0x0A, 0x11, 0x11, 0x0E, 0x00]  // slot 7: Drop
  ],

  presets: {
    heart: { name: "❤️ หัวใจ", data: [0x00, 0x0A, 0x1F, 0x1F, 0x0E, 0x04, 0x00, 0x00] },
    degree: { name: "🌡️ องศา (°)", data: [0x1C, 0x14, 0x1C, 0x00, 0x00, 0x00, 0x00, 0x00] },
    smiley: { name: "😊 หน้ายิ้ม", data: [0x00, 0x0A, 0x00, 0x04, 0x00, 0x11, 0x0E, 0x00] },
    up_arrow: { name: "⬆️ ลูกศรขึ้น", data: [0x04, 0x0E, 0x15, 0x04, 0x04, 0x04, 0x04, 0x00] },
    down_arrow: { name: "⬇️ ลูกศรลง", data: [0x04, 0x04, 0x04, 0x04, 0x15, 0x0E, 0x04, 0x00] },
    bell: { name: "🔔 กระดิ่ง", data: [0x04, 0x0E, 0x0E, 0x0E, 0x1F, 0x00, 0x04, 0x00] },
    thermo: { name: "🌡️ ปรอท", data: [0x04, 0x0A, 0x0A, 0x0E, 0x0E, 0x1F, 0x1F, 0x0E] },
    drop: { name: "💧 หยดน้ำ", data: [0x04, 0x04, 0x0A, 0x0A, 0x11, 0x11, 0x0E, 0x00] },
    block: { name: "⬛ สี่เหลี่ยมเต็ม", data: [0x1F, 0x1F, 0x1F, 0x1F, 0x1F, 0x1F, 0x1F, 0x1F] }
  },

  renderEditor: function() {
    let presetButtons = '';
    Object.keys(this.presets).forEach(k => {
      const p = this.presets[k];
      presetButtons += `<button class="cgram-preset-btn" onclick="STUDIO_CGRAM.applyPreset('${k}')">${p.name}</button>`;
    });

    let slotButtons = '';
    for (let s = 0; s < 8; s++) {
      const activeClass = (this.activeSlot === s) ? 'active' : '';
      slotButtons += `<button class="cgram-slot-btn ${activeClass}" id="cgram-slot-${s}" onclick="STUDIO_CGRAM.selectSlot(${s})">Slot {${s}}</button>`;
    }

    // Render cells HTML
    let cellsHtml = '';
    const currentData = this.slots[this.activeSlot];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 5; c++) {
        const bitMask = 1 << (4 - c);
        const isSet = (currentData[r] & bitMask) !== 0;
        const activeClass = isSet ? 'active' : '';
        cellsHtml += `<div class="cgram-cell ${activeClass}" id="cgram-cell-${r}-${c}" onclick="STUDIO_CGRAM.togglePixel(${r}, ${c})" title="แถว ${r}, คอลัมน์ ${c}"></div>`;
      }
    }

    setTimeout(() => {
      this.updatePreviewAndCode();
    }, 0);

    return `
      <div class="cgram-container">
        <div class="calc-section-intro">
          <h3>📟 เครื่องมือออกแบบตัวอักษรพิเศษ LCD 1602A (CGRAM 5&times;8 Matrix Designer)</h3>
          <p>วาดพิกเซล 5&times;8 จุดเพื่อสร้างอักขระพิเศษ (เช่น ไอคอนหัวใจ, องศา, ปรอทวัดไข้) บันทึกลงหน่วยความจำ CGRAM ได้ 8 ช่อง (Slot {0} ถึง {7})</p>
        </div>

        <!-- Slots Bar -->
        <div class="cgram-slots-bar">
          ${slotButtons}
        </div>

        <!-- Workspace: Left = Grid & Presets, Right = Preview & Generated C Code -->
        <div class="cgram-workspace-row">
          
          <!-- Left: 5x8 Grid & Tool Buttons -->
          <div class="cgram-grid-box">
            <div style="font-weight: 600; font-size: 13px; margin-bottom: 8px; color: var(--text-main); display: flex; justify-content: space-between; width: 100%;">
              <span>กระดานวาดพิกเซล (5&times;8 Dots)</span>
              <span style="font-size: 11px; color: var(--text-muted);">คลิกเพื่อสลับ เปิด/ปิด</span>
            </div>

            <div class="cgram-pixel-grid" id="cgram-pixel-grid">
              ${cellsHtml}
            </div>

            <div style="display: flex; gap: 8px; margin-top: 10px; width: 100%;">
              <button class="btn-action btn-sm" onclick="STUDIO_CGRAM.invertGrid()" style="flex: 1;">🌓 กลับสี (Invert)</button>
              <button class="btn-action btn-sm" onclick="STUDIO_CGRAM.clearGrid()" style="flex: 1;">🔄 ล้าง (Clear)</button>
            </div>

            <div style="margin-top: 12px; width: 100%;">
              <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
                🎨 พรีเซ็ตสำเร็จรูปยอดนิยม:
              </div>
              <div class="cgram-presets-grid">
                ${presetButtons}
              </div>
            </div>
          </div>

          <!-- Right: Preview, Hex array, and C Function Generator -->
          <div class="cgram-code-view">
            <div>
              <div style="font-weight: 600; font-size: 13px; margin-bottom: 8px; color: var(--text-main);">
                🔍 พรีวิวการแสดงผลจริงบนจอ LCD 1602 (Pixel Preview)
              </div>
              <div class="cgram-preview-box">
                <div id="cgram-preview-svg"></div>
                <div>
                  <div class="cgram-mini-lcd" id="cgram-mini-lcd-preview">
                    Slot {${this.activeSlot}}
                  </div>
                  <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 6px;">
                    ขนาดมาตรฐาน 5&times;8 ดอต • คอนโทรลเลอร์ HD44780
                  </div>
                </div>
              </div>

              <div style="font-weight: 600; font-size: 13px; margin-bottom: 6px; color: var(--text-main); display: flex; justify-content: space-between;">
                <span>💻 ซอร์สโค้ดภาษา C (สำหรับ Bare-metal / Arduino):</span>
                <span style="font-size: 11px; color: var(--primary);">พร้อมคอมเมนต์พิกเซล binary</span>
              </div>
              <pre class="code-display" id="cgram-code-box" style="height: 200px; font-size: 12px; margin: 0; overflow-y: auto;"></pre>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="btn-action btn-flash" onclick="STUDIO_CGRAM.insertIntoEditor()" style="flex: 1;">
                <span>✏️</span> แทรกลงในตัวแก้ไขโค้ดทันที
              </button>
              <button class="btn-action btn-download" onclick="STUDIO_CGRAM.copyCode()" style="flex: 1;">
                <span>📋</span> คัดลอกโค้ด C
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  selectSlot: function(slot) {
    this.activeSlot = slot;
    const panel = document.getElementById('studio-tab-cgram');
    if (panel) {
      panel.innerHTML = this.renderEditor();
    }
  },

  togglePixel: function(r, c) {
    const bitMask = 1 << (4 - c);
    this.slots[this.activeSlot][r] ^= bitMask;
    const cell = document.getElementById(`cgram-cell-${r}-${c}`);
    if (cell) {
      const isSet = (this.slots[this.activeSlot][r] & bitMask) !== 0;
      cell.classList.toggle('active', isSet);
    }
    this.updatePreviewAndCode();
  },

  applyPreset: function(presetKey) {
    const p = this.presets[presetKey];
    if (!p) return;
    this.slots[this.activeSlot] = [...p.data];
    const panel = document.getElementById('studio-tab-cgram');
    if (panel) {
      panel.innerHTML = this.renderEditor();
    }
    if (typeof showToast === 'function') {
      showToast(`✓ โหลดพรีเซ็ต: ${p.name}`);
    }
  },

  clearGrid: function() {
    this.slots[this.activeSlot] = [0, 0, 0, 0, 0, 0, 0, 0];
    const panel = document.getElementById('studio-tab-cgram');
    if (panel) {
      panel.innerHTML = this.renderEditor();
    }
  },

  invertGrid: function() {
    for (let r = 0; r < 8; r++) {
      this.slots[this.activeSlot][r] = (~this.slots[this.activeSlot][r]) & 0x1F;
    }
    const panel = document.getElementById('studio-tab-cgram');
    if (panel) {
      panel.innerHTML = this.renderEditor();
    }
  },

  updatePreviewAndCode: function() {
    const slot = this.activeSlot;
    const data = this.slots[slot];

    // 1. Update Preview SVG
    const previewSvg = document.getElementById("cgram-preview-svg");
    if (previewSvg) {
      let svgContent = `<svg width="70" height="90" viewBox="0 0 50 80">`;
      svgContent += `<rect width="50" height="80" rx="4" fill="#022c22" stroke="#059669" stroke-width="1.5"/>`;

      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 5; c++) {
          const bitMask = 1 << (4 - c);
          const isSet = (data[r] & bitMask) !== 0;
          const color = isSet ? "#34d399" : "#064e3b";
          svgContent += `<rect x="${c * 9.5 + 2.5}" y="${r * 9.5 + 3.5}" width="7.5" height="7.5" rx="1.5" fill="${color}"/>`;
        }
      }
      svgContent += `</svg>`;
      previewSvg.innerHTML = svgContent;
    }

    // 2. Generate C Code Array
    const binaryRows = data.map((v, i) => {
      const bin = (v & 0x1F).toString(2).padStart(5, '0');
      const visual = bin.replace(/0/g, '.').replace(/1/g, '#');
      return `  0b${bin}, // [${visual}] แถวที่ ${i}`;
    }).join("\n");

    const cCode = `// --- นิยามอักขระพิเศษสำหรับ LCD CGRAM Slot {${slot}} ---
const uint8_t customChar_${slot}[8] = {
${binaryRows}
};

// ฟังก์ชันโหลดเข้า CGRAM (Address: 0x40 + (slot * 8))
void lcd_load_custom_char_${slot}(void) {
  lcd_send_cmd(0x40 + (${slot} * 8)); // ชี้ไปยัง CGRAM ช่องที่ ${slot}
  for (uint8_t i = 0; i < 8; i++) {
    lcd_send_data(customChar_${slot}[i]);
  }
  lcd_send_cmd(0x80); // เลื่อนเคอร์เซอร์กลับสู่ DDRAM บรรทัดที่ 1
}

// วิธีเรียกใช้งานในโปรแกรม:
// lcd_load_custom_char_${slot}();
// lcd_send_data(${slot}); // หรือส่ง '\\${(slot === 0 ? "010" : slot)}' ในข้อความ`;

    const codeBox = document.getElementById("cgram-code-box");
    if (codeBox) {
      codeBox.textContent = cCode;
    }
  },

  copyCode: function() {
    const codeBox = document.getElementById("cgram-code-box");
    if (!codeBox) return;

    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(codeBox.textContent).then(() => {
        if (typeof showToast === 'function') {
          showToast("✓ คัดลอกโค้ด C ของ Custom Character เรียบร้อย");
        }
      });
    }
  },

  insertIntoEditor: function() {
    if (typeof setStudioTab === 'function') {
      setStudioTab('code');
    }
    if (typeof setEditorMode === 'function') {
      setEditorMode('edit');
    }
    const editor = document.getElementById("code-editor");
    if (!editor) return;

    const slot = this.activeSlot;
    const data = this.slots[slot];
    const hexStr = data.map(v => "0x" + v.toString(16).toUpperCase().padStart(2, '0')).join(", ");

    const snippet = `\n// [CGRAM Slot ${slot}] อักขระพิเศษที่สร้างจาก CGRAM Designer\nconst uint8_t customChar_${slot}[8] = { ${hexStr} };\n`;

    editor.value += snippet;
    if (typeof onCustomCodeInput === 'function') {
      onCustomCodeInput();
    }
    if (typeof showToast === 'function') {
      showToast(`✓ แทรก customChar_${slot} ลงในตัวแก้ไขโค้ดเรียบร้อย!`);
    }
  }
};
