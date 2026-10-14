// studio_calculations.js - Engineering Calculation Breakdown for AVR Practical Exam Studio
// Provides interactive Calculators for: Timer Prescaler, ADC Quantization, UART Baud Rate, Double-Dabble BCD

const STUDIO_CALCULATIONS = {
  renderCalculationsPanel: function() {
    return `
      <div class="calc-panel-inner">
        <div class="calc-section-intro">
          <h3>🧮 เครื่องคิดคำนวณและสูตรทางวิศวกรรมฝังตัว (Embedded Math)</h3>
          <p>รวมสูตรคำนวณที่ออกสอบปฏิบัติบ่อยที่สุด พร้อมระบบคำนวณสดและตารางเปรียบเทียบค่าความคลาดเคลื่อน (Error %)</p>
        </div>

        <!-- Tool Navigation Bar -->
        <div class="calc-nav-tabs">
          <button class="calc-nav-btn active" onclick="STUDIO_CALCULATIONS.switchCalcTab('timer')">⏱️ Timer & CTC Prescaler</button>
          <button class="calc-nav-btn" onclick="STUDIO_CALCULATIONS.switchCalcTab('adc')">📊 ADC Quantization & โวลต์</button>
          <button class="calc-nav-btn" onclick="STUDIO_CALCULATIONS.switchCalcTab('uart')">📡 UART Baud Rate & UBRR</button>
          <button class="calc-nav-btn" onclick="STUDIO_CALCULATIONS.switchCalcTab('doubledabble')">🔀 Double-Dabble (Binary to BCD)</button>
        </div>

        <!-- 1. Timer Calculator -->
        <div id="calc-tab-timer" class="calc-tool-body">
          <div class="calc-card">
            <h4>⏱️ คำนวณค่าบันทึก Timer CTC Register (OCR1A / OCR0A)</h4>
            <p class="calc-card-desc">คำนวณค่า OCRx และอัตราทด Prescaler ($N$) ให้ได้ความถี่หรือหน่วงเวลาตามที่โจทย์สอบต้องการ</p>
            
            <div class="calc-formula-banner">
              <strong>สูตร CTC Mode:</strong> 
              <code>OCR = (F_CPU / (2 &times; N &times; f_target)) - 1</code> (สำหรับ Toggle I/O) หรือ 
              <code>OCR = (F_CPU &times; T_target / N) - 1</code> (สำหรับ Interrupt Period)
            </div>

            <div class="calc-inputs-grid">
              <div class="calc-input-group">
                <label>Clock MCU (F_CPU):</label>
                <select id="timer-fcpu" onchange="STUDIO_CALCULATIONS.recalcTimer()">
                  <option value="16000000" selected>16.00 MHz (Arduino Uno R3 / ATmega328P)</option>
                  <option value="8000000">8.00 MHz (Internal RC / ATmega32 8MHz)</option>
                  <option value="12000000">12.00 MHz</option>
                  <option value="20000000">20.00 MHz</option>
                </select>
              </div>
              <div class="calc-input-group">
                <label>ประเภท Timer:</label>
                <select id="timer-type" onchange="STUDIO_CALCULATIONS.recalcTimer()">
                  <option value="16" selected>Timer1 (16-bit: OCR สูงสุด 65,535)</option>
                  <option value="8">Timer0 / Timer2 (8-bit: OCR สูงสุด 255)</option>
                </select>
              </div>
              <div class="calc-input-group">
                <label>เวลาที่ต้องการหน่วง (Target Time):</label>
                <div style="display: flex; gap: 8px;">
                  <input type="number" id="timer-target-val" value="100" min="0.001" step="any" oninput="STUDIO_CALCULATIONS.recalcTimer()" style="flex: 1;" />
                  <select id="timer-target-unit" onchange="STUDIO_CALCULATIONS.recalcTimer()" style="width: 80px;">
                    <option value="ms" selected>ms (มิลลิ)</option>
                    <option value="us">&mu;s (ไมโคร)</option>
                    <option value="s">s (วินาที)</option>
                    <option value="hz">Hz (ความถี่)</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="calc-result-box" id="timer-results">
              <!-- Dynamically populated table -->
            </div>

            <div class="calc-code-sample">
              <strong>ตัวอย่าง C Code การตั้งค่า Register (อิงค่าที่เหมาะสมที่สุด):</strong>
              <pre id="timer-code-snippet">// เลือกค่าจากตารางด้านบน</pre>
            </div>
          </div>
        </div>

        <!-- 2. ADC Calculator -->
        <div id="calc-tab-adc" class="calc-tool-body" style="display: none;">
          <div class="calc-card">
            <h4>📊 คำนวณการแปลงสัญญาณอนาล็อก (10-bit ADC Quantization)</h4>
            <p class="calc-card-desc">จำลองการอ่านค่าพิน A0-A5 ผ่านสูตรความละเอียดขั้นบันได $V_{step}$ และคำนวณเป็นแรงดันจริง</p>

            <div class="calc-formula-banner">
              <strong>สูตรคำนวณ ADC:</strong>
              <code>V_step = V_REF / 1024</code> &nbsp;|&nbsp; 
              <code>V_in = (ADC_value &times; V_REF) / 1024</code> &nbsp;|&nbsp;
              <code>ADC_value = round((V_in &times; 1024) / V_REF)</code>
            </div>

            <div class="calc-inputs-grid">
              <div class="calc-input-group">
                <label>แรงดันอ้างอิง (V_REF):</label>
                <select id="adc-vref" onchange="STUDIO_CALCULATIONS.recalcADC()">
                  <option value="5.0" selected>5.0V (Default VCC - Arduino Uno)</option>
                  <option value="3.3">3.3V (3.3V System)</option>
                  <option value="1.1">1.1V (Internal Bandgap Reference)</option>
                  <option value="2.56">2.56V (ATmega32 Internal VREF)</option>
                </select>
              </div>
              <div class="calc-input-group">
                <label>ความละเอียด Step Size ($V_{step}$):</label>
                <div id="adc-step-size-display" class="stat-highlight">4.8828 mV / Step</div>
              </div>
            </div>

            <!-- Interactive Slider -->
            <div class="adc-slider-container">
              <label style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 6px;">
                <span>ลากปรับค่า ADC Raw (0 - 1023):</span>
                <span id="adc-slider-val-badge" class="badge-accent">512</span>
              </label>
              <input type="range" id="adc-slider" min="0" max="1023" value="512" class="slider-full" oninput="STUDIO_CALCULATIONS.onAdcSliderChange(this.value)" />
            </div>

            <!-- ADC Stats Grid -->
            <div class="adc-stats-grid">
              <div class="adc-stat-card">
                <div class="stat-title">แรงดันอินพุต ($V_{in}$)</div>
                <div class="stat-big-val" id="adc-calc-volt">2.500 V</div>
                <div class="stat-sub" id="adc-calc-mv">2500.00 mV</div>
              </div>
              <div class="adc-stat-card">
                <div class="stat-title">เลขฐานสิบหก (Hex)</div>
                <div class="stat-big-val" id="adc-calc-hex">0x0200</div>
                <div class="stat-sub">ADCL + ADCH (10-bit)</div>
              </div>
              <div class="adc-stat-card">
                <div class="stat-title">เลขฐานสอง (Binary 10-bit)</div>
                <div class="stat-big-val" id="adc-calc-bin" style="font-size: 13px; font-family: var(--font-mono);">00 0000 0000</div>
                <div class="stat-sub">บิต 9 ถึง บิต 0</div>
              </div>
            </div>

            <div class="calc-code-sample">
              <strong>ตัวอย่าง C Code อ่านและแปลงค่าเป็นมิลลิโวลต์ (Fixed-Point หลีกเลี่ยง float):</strong>
              <pre>// อ่านค่า ADC 10-bit
uint16_t adc_val = ADC; 

// คำนวณแรงดันระดับมิลลิโวลต์ (mV) โดยไม่ใช้ float (ประหยัดหน่วยความจำ Flash & CPU cycle)
uint32_t milli_volts = ((uint32_t)adc_val * 5000UL) >> 10; // หรือ / 1024UL

// แยกหลักตัวเลขแสดงผลบน LCD หรือ 7-Segment
uint8_t volt_int = milli_volts / 1000;
uint16_t volt_dec = milli_volts % 1000;</pre>
            </div>
          </div>
        </div>

        <!-- 3. UART Calculator -->
        <div id="calc-tab-uart" class="calc-tool-body" style="display: none;">
          <div class="calc-card">
            <h4>📡 คำนวณค่ารีจิสเตอร์ UBRR สำหรับสื่อสาร UART / Serial</h4>
            <p class="calc-card-desc">ตรวจสอบค่ารีจิสเตอร์ UBRR0 และเปอร์เซ็นต์ความคลาดเคลื่อน (Baud Rate Error %) ของบอร์ดที่ความถี่ต่างๆ</p>

            <div class="calc-formula-banner">
              <strong>สูตรคำนวณ UBRR:</strong>
              <code>UBRR = (F_CPU / (16 &times; Baud)) - 1</code> (Normal Speed, U2X=0) &nbsp;|&nbsp;
              <code>UBRR = (F_CPU / (8 &times; Baud)) - 1</code> (Double Speed, U2X=1)
            </div>

            <div class="calc-inputs-grid">
              <div class="calc-input-group">
                <label>Clock MCU (F_CPU):</label>
                <select id="uart-fcpu" onchange="STUDIO_CALCULATIONS.recalcUART()">
                  <option value="16000000" selected>16.00 MHz (Uno / Nano)</option>
                  <option value="8000000">8.00 MHz (Internal RC / ATmega32)</option>
                  <option value="11059200">11.0592 MHz (Standard Crystal for 0% Error)</option>
                  <option value="12000000">12.00 MHz</option>
                  <option value="20000000">20.00 MHz</option>
                </select>
              </div>
              <div class="calc-input-group">
                <label>โหมดความเร็ว (Speed Mode):</label>
                <select id="uart-u2x" onchange="STUDIO_CALCULATIONS.recalcUART()">
                  <option value="0" selected>Normal Speed (U2X = 0, ตัวหาร 16)</option>
                  <option value="1">Double Speed (U2X = 1, ตัวหาร 8)</option>
                </select>
              </div>
            </div>

            <div class="calc-result-box" id="uart-results">
              <!-- Dynamically populated table -->
            </div>

            <div class="alert-box-info" style="margin-top: 12px; font-size: 13px; line-height: 1.5;">
              💡 <strong>เกณฑ์ความปลอดภัยวิศวกรรม:</strong> ค่า Error % ที่ยอมรับได้ในการสื่อสารอนุกรมมาตรฐานต้อง <strong>ไม่เกิน &plusmn;2.0%</strong> หาก Error เกิน 3.5% (เช่น 115200 bps บน 16MHz ที่ U2X=0) จะเริ่มเกิด Frame Error และข้อมูลตัวอักษรจะอ่านไม่ออกหรือเพี้ยนเป็นสัญลักษณ์ประหลาด ให้เปิดใช้โหมด Double Speed (U2X=1) ทันที
            </div>
          </div>
        </div>

        <!-- 4. Double-Dabble Calculator -->
        <div id="calc-tab-doubledabble" class="calc-tool-body" style="display: none;">
          <div class="calc-card">
            <h4>🔀 ขั้นตอนวิธี Double-Dabble (Shift-and-Add-3) สำหรับแปลง Binary เป็น BCD</h4>
            <p class="calc-card-desc">อัลกอริทึมยอดนิยมของข้อสอบระดับลึก สำหรับแปลงเลขฐานสอง (ADC/Counter) เป็นหลักหน่วย สิบ ร้อย พัน เพื่อยิงขึ้น 7-Segment หรือ LCD โดยไม่ใช้คำสั่งหาร (/) และ Modulo (%)</p>

            <div class="calc-formula-banner">
              <strong>กฎของ Double-Dabble:</strong>
              1. เลื่อนบิตไปทางซ้าย (Shift Left 1 bit) เข้าสู่คอลัมน์ BCD ทีละบิต<br/>
              2. หลังเลื่อน ถ้าหลัก BCD ใดมีค่า &ge; 5 ให้บวกด้วย 3 (Add 3)<br/>
              3. ทำซ้ำจนครบจำนวนบิตของเลขต้นฉบับ
            </div>

            <div class="calc-inputs-grid">
              <div class="calc-input-group">
                <label>ตัวเลขฐานสิบที่ต้องการจำลอง (0 - 255 หรือ 0 - 1023):</label>
                <div style="display: flex; gap: 8px;">
                  <input type="number" id="dd-input-num" value="245" min="0" max="1023" oninput="STUDIO_CALCULATIONS.recalcDoubleDabble()" style="flex: 1;" />
                  <button class="btn-action btn-sm" onclick="STUDIO_CALCULATIONS.loadDDExample(179)">ตัวอย่าง 179</button>
                  <button class="btn-action btn-sm" onclick="STUDIO_CALCULATIONS.loadDDExample(255)">ตัวอย่าง 255</button>
                  <button class="btn-action btn-sm" onclick="STUDIO_CALCULATIONS.loadDDExample(1023)">ตัวอย่าง 1023</button>
                </div>
              </div>
            </div>

            <div class="dd-trace-container" id="dd-trace-results">
              <!-- Dynamically populated step trace -->
            </div>
          </div>
        </div>

      </div>
    `;
  },

  switchCalcTab: function(tabId) {
    const tabs = ['timer', 'adc', 'uart', 'doubledabble'];
    tabs.forEach(t => {
      const el = document.getElementById('calc-tab-' + t);
      if (el) el.style.display = (t === tabId) ? 'block' : 'none';
    });
    const btns = document.querySelectorAll('.calc-nav-btn');
    btns.forEach(b => {
      if (b.getAttribute('onclick').includes(tabId)) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    if (tabId === 'timer') this.recalcTimer();
    if (tabId === 'adc') this.recalcADC();
    if (tabId === 'uart') this.recalcUART();
    if (tabId === 'doubledabble') this.recalcDoubleDabble();
  },

  recalcTimer: function() {
    const fcpu = parseFloat(document.getElementById('timer-fcpu')?.value || 16000000);
    const bits = parseInt(document.getElementById('timer-type')?.value || 16);
    const maxOCR = (bits === 16) ? 65535 : 255;
    const targetVal = parseFloat(document.getElementById('timer-target-val')?.value || 100);
    const unit = document.getElementById('timer-target-unit')?.value || 'ms';

    let targetSeconds = 0;
    if (unit === 's') targetSeconds = targetVal;
    else if (unit === 'ms') targetSeconds = targetVal / 1000.0;
    else if (unit === 'us') targetSeconds = targetVal / 1000000.0;
    else if (unit === 'hz') targetSeconds = 1.0 / targetVal;

    const prescalers = [1, 8, 64, 256, 1024];
    let html = `
      <table class="calc-table">
        <thead>
          <tr>
            <th>Prescaler (N)</th>
            <th>Tick Resolution</th>
            <th>ค่า OCR ที่คำนวณได้</th>
            <th>ค่าลง Register (Integer)</th>
            <th>เวลาที่เกิดขึ้นจริง</th>
            <th>Error %</th>
            <th>สถานะความเหมาะสม</th>
          </tr>
        </thead>
        <tbody>
    `;

    let bestPrescaler = null;
    let minError = 999999;

    prescalers.forEach(N => {
      const tick = N / fcpu;
      const exactOCR = (targetSeconds * fcpu / N) - 1.0;
      const regOCR = Math.round(exactOCR);
      const actualSec = (regOCR + 1) * N / fcpu;
      const errorPct = (targetSeconds > 0) ? Math.abs((actualSec - targetSeconds) / targetSeconds) * 100 : 0;

      let status = '';
      let statusClass = '';
      let isFeasible = false;

      if (regOCR < 0) {
        status = 'Underflow (ความถี่สูงเกินไป)';
        statusClass = 'status-err';
      } else if (regOCR > maxOCR) {
        status = `Overflow (> ${maxOCR})`;
        statusClass = 'status-err';
      } else {
        isFeasible = true;
        if (errorPct < minError) {
          minError = errorPct;
          bestPrescaler = { N, regOCR, errorPct, bits };
        }
        status = `ใช้งานได้ (${errorPct.toFixed(3)}% err)`;
        statusClass = 'status-ok';
      }

      html += `
        <tr class="${(bestPrescaler && bestPrescaler.N === N) ? 'row-highlight' : ''}">
          <td><strong>${N}</strong></td>
          <td>${(tick * 1000000).toFixed(2)} &mu;s</td>
          <td>${exactOCR.toFixed(2)}</td>
          <td><code>${(regOCR >= 0 && regOCR <= maxOCR) ? regOCR : '-'}</code></td>
          <td>${(actualSec * 1000).toFixed(3)} ms</td>
          <td>${isFeasible ? errorPct.toFixed(3) + '%' : '-'}</td>
          <td><span class="calc-status-badge ${statusClass}">${status}</span></td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    const resBox = document.getElementById('timer-results');
    if (resBox) resBox.innerHTML = html;

    // Update Code Snippet
    const codeSnippet = document.getElementById('timer-code-snippet');
    if (codeSnippet && bestPrescaler) {
      if (bestPrescaler.bits === 16) {
        let csBits = '0';
        if (bestPrescaler.N === 1) csBits = '(1 << CS10)';
        else if (bestPrescaler.N === 8) csBits = '(1 << CS11)';
        else if (bestPrescaler.N === 64) csBits = '(1 << CS11) | (1 << CS10)';
        else if (bestPrescaler.N === 256) csBits = '(1 << CS12)';
        else if (bestPrescaler.N === 1024) csBits = '(1 << CS12) | (1 << CS10)';

        codeSnippet.textContent = `// กำหนด Timer1 ในโหมด CTC สำหรับเวลา ${targetVal} ${unit} (Prescaler = ${bestPrescaler.N})
TCCR1A = 0;              // โหมดปกติ CTC (WGM11=0, WGM10=0)
TCCR1B = 0;
TCNT1  = 0;              // ล้างตัวนับเริ่มต้น
OCR1A  = ${bestPrescaler.regOCR};          // ค่าเปรียบเทียบเทียบเท่าเวลาเป้าหมาย (Error: ${bestPrescaler.errorPct.toFixed(3)}%)
TCCR1B |= (1 << WGM12);  // เปิดโหมด CTC (Clear Timer on Compare Match)
TCCR1B |= ${csBits}; // ตั้งค่า Prescaler = ${bestPrescaler.N}
TIMSK1 |= (1 << OCIE1A); // เปิดใช้งาน Interrupt เมื่อตรงกับ OCR1A
sei();                   // เปิด Global Interrupt`;
      } else {
        let csBits = '0';
        if (bestPrescaler.N === 1) csBits = '(1 << CS00)';
        else if (bestPrescaler.N === 8) csBits = '(1 << CS01)';
        else if (bestPrescaler.N === 64) csBits = '(1 << CS01) | (1 << CS00)';
        else if (bestPrescaler.N === 256) csBits = '(1 << CS02)';
        else if (bestPrescaler.N === 1024) csBits = '(1 << CS02) | (1 << CS00)';

        codeSnippet.textContent = `// กำหนด Timer0 ในโหมด CTC สำหรับเวลา ${targetVal} ${unit} (Prescaler = ${bestPrescaler.N})
TCCR0A = (1 << WGM01);   // โหมด CTC (WGM01=1, WGM00=0)
TCCR0B = 0;
TCNT0  = 0;
OCR0A  = ${bestPrescaler.regOCR};           // ค่าเปรียบเทียบ (Error: ${bestPrescaler.errorPct.toFixed(3)}%)
TCCR0B |= ${csBits}; // ตั้งค่า Prescaler = ${bestPrescaler.N}
TIMSK0 |= (1 << OCIE0A); // เปิด Interrupt OCR0A
sei();`;
      }
    }
  },

  recalcADC: function() {
    const vref = parseFloat(document.getElementById('adc-vref')?.value || 5.0);
    const stepMv = (vref / 1024.0) * 1000.0;
    const stepDisplay = document.getElementById('adc-step-size-display');
    if (stepDisplay) {
      stepDisplay.textContent = `${stepMv.toFixed(4)} mV / Step (${(vref/1024.0).toFixed(6)} V)`;
    }
    const slider = document.getElementById('adc-slider');
    if (slider) this.onAdcSliderChange(slider.value);
  },

  onAdcSliderChange: function(val) {
    const raw = isNaN(parseInt(val)) ? 512 : parseInt(val);
    const vrefVal = document.getElementById('adc-vref')?.value;
    const vref = isNaN(parseFloat(vrefVal)) ? 5.0 : parseFloat(vrefVal);
    const badge = document.getElementById('adc-slider-val-badge');
    if (badge) badge.textContent = `${raw} / 1023`;

    const vIn = (raw * vref) / 1024.0;
    const vMv = vIn * 1000.0;

    const elVolt = document.getElementById('adc-calc-volt');
    if (elVolt) elVolt.textContent = `${vIn.toFixed(3)} V`;

    const elMv = document.getElementById('adc-calc-mv');
    if (elMv) elMv.textContent = `${vMv.toFixed(2)} mV`;

    const elHex = document.getElementById('adc-calc-hex');
    if (elHex) elHex.textContent = '0x' + raw.toString(16).toUpperCase().padStart(4, '0');

    const elBin = document.getElementById('adc-calc-bin');
    if (elBin) {
      const bStr = raw.toString(2).padStart(10, '0');
      elBin.textContent = bStr.substring(0, 2) + ' ' + bStr.substring(2, 6) + ' ' + bStr.substring(6, 10);
    }
  },

  recalcUART: function() {
    const fcpu = parseFloat(document.getElementById('uart-fcpu')?.value || 16000000);
    const u2x = parseInt(document.getElementById('uart-u2x')?.value || 0);
    const divisor = (u2x === 1) ? 8.0 : 16.0;

    const standardBauds = [2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200];
    let html = `
      <table class="calc-table">
        <thead>
          <tr>
            <th>Baud Rate (bps)</th>
            <th>ค่า UBRR คำนวณ</th>
            <th>ค่า UBRR (Register)</th>
            <th>Baud Rate ที่เกิดขึ้นจริง</th>
            <th>Error %</th>
            <th>สถานะความน่าเชื่อถือ</th>
          </tr>
        </thead>
        <tbody>
    `;

    standardBauds.forEach(baud => {
      const exactUBRR = (fcpu / (divisor * baud)) - 1.0;
      const regUBRR = Math.round(exactUBRR);
      const actualBaud = fcpu / (divisor * (regUBRR + 1));
      const errorPct = ((actualBaud - baud) / baud) * 100.0;
      const absErr = Math.abs(errorPct);

      let status = '';
      let statusClass = '';
      if (regUBRR < 0) {
        status = 'ไม่รองรับ (ความเร็วสูงเกินไป)';
        statusClass = 'status-err';
      } else if (absErr <= 0.5) {
        status = 'ยอดเยี่ยม (ความคลาดเคลื่อนต่ำมาก)';
        statusClass = 'status-ok';
      } else if (absErr <= 2.0) {
        status = 'ใช้งานได้ดีตามมาตรฐาน (&le; 2%)';
        statusClass = 'status-ok';
      } else {
        status = 'อันตราย (Error สูง ข้อมูลอาจเพี้ยน)';
        statusClass = 'status-err';
      }

      html += `
        <tr>
          <td><strong>${baud.toLocaleString()}</strong></td>
          <td>${exactUBRR.toFixed(2)}</td>
          <td><code>${regUBRR >= 0 ? regUBRR : '-'}</code></td>
          <td>${regUBRR >= 0 ? Math.round(actualBaud).toLocaleString() + ' bps' : '-'}</td>
          <td><strong>${regUBRR >= 0 ? ((errorPct >= 0 ? '+' : '') + errorPct.toFixed(2) + '%') : '-'}</strong></td>
          <td><span class="calc-status-badge ${statusClass}">${status}</span></td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    const resBox = document.getElementById('uart-results');
    if (resBox) resBox.innerHTML = html;
  },

  loadDDExample: function(val) {
    const inp = document.getElementById('dd-input-num');
    if (inp) {
      inp.value = val;
      this.recalcDoubleDabble();
    }
  },

  recalcDoubleDabble: function() {
    const num = parseInt(document.getElementById('dd-input-num')?.value || 0);
    const container = document.getElementById('dd-trace-results');
    if (!container) return;

    if (isNaN(num) || num < 0 || num > 65535) {
      container.innerHTML = '<p class="status-err">กรุณากรอกตัวเลขระหว่าง 0 ถึง 65535</p>';
      return;
    }

    // Determine bit length
    let bitLen = 8;
    if (num > 255) bitLen = 10;
    if (num > 1023) bitLen = 16;

    const binStr = num.toString(2).padStart(bitLen, '0');
    
    // Simulate step by step
    let thousands = 0;
    let hundreds = 0;
    let tens = 0;
    let ones = 0;

    let steps = [];

    for (let i = 0; i < bitLen; i++) {
      const currentBit = parseInt(binStr[i]);

      // Check >= 5 rule before shift (from step 1 onwards)
      let adjusted = false;
      let adjNotes = [];
      if (thousands >= 5) { thousands += 3; adjNotes.push('พัน +3'); adjusted = true; }
      if (hundreds >= 5) { hundreds += 3; adjNotes.push('ร้อย +3'); adjusted = true; }
      if (tens >= 5) { tens += 3; adjNotes.push('สิบ +3'); adjusted = true; }
      if (ones >= 5) { ones += 3; adjNotes.push('หน่วย +3'); adjusted = true; }

      if (adjusted) {
        steps.push({
          step: `ก่อนรอบที่ ${i+1}: กฎ &ge; 5`,
          thousands, hundreds, tens, ones,
          remainingBin: binStr.substring(i),
          note: adjNotes.join(', ')
        });
      }

      // Shift left 1 bit
      thousands = (thousands << 1) & 0x0F;
      if (hundreds & 0x08) thousands |= 1;

      hundreds = (hundreds << 1) & 0x0F;
      if (tens & 0x08) hundreds |= 1;

      tens = (tens << 1) & 0x0F;
      if (ones & 0x08) tens |= 1;

      ones = ((ones << 1) & 0x0F) | currentBit;

      steps.push({
        step: `รอบที่ ${i+1}: เลื่อนบิต [${currentBit}]`,
        thousands, hundreds, tens, ones,
        remainingBin: binStr.substring(i+1),
        note: `ดึงบิตที่ ${bitLen - 1 - i} เข้าหลักหน่วย`
      });
    }

    let html = `
      <div style="margin-bottom: 10px; font-size: 13px;">
        <strong>ผลลัพธ์สุดท้าย:</strong> ${thousands}${hundreds}${tens}${ones} BCD (ค่าฐานสิบดั้งเดิมคือ <strong>${num}</strong>)
      </div>
      <table class="calc-table" style="font-size: 12px;">
        <thead>
          <tr>
            <th>ขั้นตอน</th>
            <th>หลักพัน (Thousands)</th>
            <th>หลักร้อย (Hundreds)</th>
            <th>หลักสิบ (Tens)</th>
            <th>หลักหน่วย (Ones)</th>
            <th>บิตคงเหลือ</th>
            <th>คำอธิบาย</th>
          </tr>
        </thead>
        <tbody>
    `;

    steps.forEach(s => {
      html += `
        <tr>
          <td><strong>${s.step}</strong></td>
          <td><code>${s.thousands} (${s.thousands.toString(2).padStart(4, '0')})</code></td>
          <td><code>${s.hundreds} (${s.hundreds.toString(2).padStart(4, '0')})</code></td>
          <td><code>${s.tens} (${s.tens.toString(2).padStart(4, '0')})</code></td>
          <td><code>${s.ones} (${s.ones.toString(2).padStart(4, '0')})</code></td>
          <td><code style="color: var(--primary);">${s.remainingBin || '-'}</code></td>
          <td><span style="font-size: 11px; color: var(--text-muted);">${s.note}</span></td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  }
};
