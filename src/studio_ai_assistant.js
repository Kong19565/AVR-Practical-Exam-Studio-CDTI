/**
 * Studio AI Assistant - Offline Local AI Copilot for CDTI Practical Exam
 * Connects directly to Ollama (kts-avr-coder / qwen2.5-coder:7b) via localhost:11434
 */
const STUDIO_AI = (function() {
  let isGenerating = false;
  let attachedCode = "";
  let includeCode = true;
  let chatHistory = [];

  const PRESETS = [
    { title: "🔀 ทำ State Machine 4 ปุ่ม", prompt: "ช่วยดัดแปลงโค้ดนี้ให้เป็น State Machine คุมสถานะการทำงานด้วยสวิตช์ปุ่มกด 4 ปุ่ม (INPUT_PULLUP) พร้อมทำ Debounce ทุกปุ่ม" },
    { title: "⏱️ แปลงเป็น Timer1 CTC 100Hz", prompt: "ช่วยแปลงระบบหน่วงเวลาในโค้ดนี้ให้ใช้ Hardware Timer1 ในโหมด CTC ความถี่ 100 Hz พร้อมฟังก์ชัน ISR(TIMER1_COMPA_vect) สลับสถานะ" },
    { title: "📊 อ่าน Potentiometer (ADC A0)", prompt: "ช่วยเพิ่มการอ่านแรงดันจากตัวต้านทานปรับค่าได้ที่ขา A0 (ADC 10-bit) เพื่อนำค่า 0-1023 มาควบคุมความเร็วหรือสเกลการทำงาน" },
    { title: "📟 ขับจอ LCD 16x2 (4-bit ขนาน)", prompt: "ช่วยเพิ่มการแสดงผลข้อความและค่าตัวแปรออกจอ LCD 16x2 ในโหมด 4-bit ขนาน (RS=12, EN=11, D4=5, D5=4, D6=3, D7=2)" },
    { title: "📟 ขับจอ LCD 16x2 (I2C 0x27)", prompt: "ช่วยเพิ่มการแสดงผลข้อความและค่าตัวแปรออกจอ LCD 16x2 ผ่านโมดูล I2C แอดเดรส 0x27 (SDA=A4, SCL=A5)" },
    { title: "🔢 ขับ 7-Segment (CC 1 หลัก)", prompt: "ช่วยเพิ่มการแสดงผลตัวเลขนับขึ้น/ลงออกหน้าจอ 7-Segment แบบ Common Cathode 1 หลักผ่านรหัสบิต (0b00111111 แทนเลข 0)" },
    { title: "🐞 ตรวจและแก้บั๊กในโค้ดนี้", prompt: "ช่วยตรวจสอบโค้ดนี้อย่างละเอียดว่ามีจุดบั๊กหรือการตั้งค่ารีจิสเตอร์/พินที่ผิดพลาดหรือไม่ และเขียนโค้ดเวอร์ชันที่ถูกต้องสมบูรณ์ให้หน่อย" },
    { title: "⚡ แปลงเป็น Bare-Metal C", prompt: "ช่วยแปลงโค้ดนี้จาก Arduino C++ ไปเป็นภาษา C แบบ Bare-metal AVR-GCC ล้วน (จัดการรีจิสเตอร์ DDRx, PORTx, PINx ตรงๆ ห้ามใช้ฟังก์ชัน Arduino)" }
  ];

  function renderAIPanel() {
    return `
      <div class="ai-panel-container">
        <!-- AI Header & Connection Status -->
        <div class="ai-header-card">
          <div class="ai-header-info">
            <div class="ai-title-row">
              <span class="ai-brand-badge">🤖 KTS Local AI Assistant</span>
              <span id="ai-conn-status" class="ai-status-pill checking">
                <span class="status-dot"></span> กำลังตรวจสอบ Ollama...
              </span>
            </div>
            <p class="ai-desc">ผู้ช่วยเขียนโค้ดและดัดแปลงโจทย์ Embedded Systems ออฟไลน์ 100% สไตล์ อ. KTS (CDTI)</p>
          </div>
          <div class="ai-model-picker">
            <label for="ai-model-select">โมเดล:</label>
            <select id="ai-model-select" class="com-select" onchange="STUDIO_AI.onModelChange()">
              <option value="kts-avr-coder" selected>kts-avr-coder (แนะนำ)</option>
              <option value="qwen2.5-coder:7b">qwen2.5-coder:7b</option>
            </select>
          </div>
        </div>

        <!-- Attached Code Context Bar -->
        <div class="ai-context-card">
          <div class="ai-context-header">
            <label class="ai-checkbox-label">
              <input type="checkbox" id="ai-attach-checkbox" checked onchange="STUDIO_AI.toggleIncludeCode(this.checked)" />
              <span>📎 แนบโค้ดปัจจุบันจากหน้า Editor ไปด้วย (<span id="ai-attached-lab-name">Lab ปัจจุบัน</span>)</span>
            </label>
            <button class="btn-xs-refresh" onclick="STUDIO_AI.refreshAttachedCode()" title="อัปเดตโค้ดล่าสุดจาก Editor">🔄 ดึงโค้ดล่าสุด</button>
          </div>
          <div id="ai-code-preview" class="ai-code-preview-box">
            <pre><code id="ai-attached-snippet">// โค้ดจะแสดงที่นี่</code></pre>
          </div>
        </div>

        <!-- Quick Twist Presets -->
        <div class="ai-presets-card">
          <div class="ai-presets-title">🎯 โจทย์พลิกแพลงยอดฮิตหน้างาน (คลิกเพื่อถามทันที):</div>
          <div class="ai-chips-grid">
            ${PRESETS.map((p, i) => `
              <button class="ai-preset-chip" onclick="STUDIO_AI.usePreset(${i})">
                ${p.title}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Chat History -->
        <div class="ai-chat-thread" id="ai-chat-thread">
          <div class="ai-welcome-msg">
            <div class="ai-avatar">🤖</div>
            <div class="ai-msg-content">
              <strong>สวัสดีครับ! ผมคือผู้ช่วยวิเคราะห์โจทย์สอบปฏิบัติ AVR ATmega328P</strong>
              <p>คุณสามารถคลิกปุ่มลัดด้านบน หรือพิมพ์โจทย์ข้อสอบที่ต้องการพลิกแพลงลงในช่องด้านล่างได้เลยครับ (ระบบจะดึงโค้ดจากหน้าแล็บที่คุณกำลังเปิดอยู่ไปต่อยอดให้ทันที)</p>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="ai-input-card">
          <div class="ai-input-wrapper">
            <textarea id="ai-user-prompt" class="ai-textarea" rows="2" 
              placeholder="พิมพ์คำสั่งหรือเงื่อนไขโจทย์ที่ต้องการพลิกแพลงที่นี่... (กด Ctrl + Enter เพื่อส่งคำถาม)"
              onkeydown="STUDIO_AI.handleKeyDown(event)"></textarea>
            <button id="ai-btn-send" class="ai-btn-send" onclick="STUDIO_AI.sendMessage()">
              <span>🚀 ส่งคำถาม</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async function checkConnection() {
    const pill = document.getElementById("ai-conn-status");
    if (!pill) return;

    try {
      const res = await fetch("http://localhost:11434/api/tags", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        const models = (data.models || []).map(m => m.name.toLowerCase());
        const hasKTS = models.some(m => m.includes("kts-avr-coder"));
        
        pill.className = "ai-status-pill online";
        pill.innerHTML = `<span class="status-dot"></span> พร้อมใช้งาน (${hasKTS ? 'kts-avr-coder' : 'qwen2.5-coder'})`;
      } else {
        throw new Error("Bad status");
      }
    } catch (e) {
      pill.className = "ai-status-pill offline";
      pill.innerHTML = `<span class="status-dot"></span> ออฟไลน์ (เปิด PowerShell พิมพ์ ollama run kts-avr-coder)`;
    }

    refreshAttachedCode();
  }

  function refreshAttachedCode() {
    if (typeof getCurrentCode === 'function') {
      attachedCode = getCurrentCode();
    }
    const snippetEl = document.getElementById("ai-attached-snippet");
    const labNameEl = document.getElementById("ai-attached-lab-name");
    
    if (snippetEl) {
      const preview = attachedCode.split('\n').slice(0, 8).join('\n') + (attachedCode.split('\n').length > 8 ? '\n// ... (โค้ดทั้งหมด ' + attachedCode.split('\n').length + ' บรรทัด)' : '');
      snippetEl.textContent = preview;
    }
    if (labNameEl && state && state.activeLabId) {
      const lab = (typeof LABS_DATA !== 'undefined') ? LABS_DATA.find(l => l.id === state.activeLabId) : null;
      labNameEl.textContent = lab ? lab.title : state.activeLabId;
    }
  }

  function setAttachedCode(code) {
    attachedCode = code;
    refreshAttachedCode();
  }

  function toggleIncludeCode(val) {
    includeCode = val;
    const box = document.getElementById("ai-code-preview");
    if (box) {
      box.style.opacity = val ? "1" : "0.4";
    }
  }

  function usePreset(index) {
    const preset = PRESETS[index];
    if (!preset) return;
    const input = document.getElementById("ai-user-prompt");
    if (input) {
      input.value = preset.prompt;
      sendMessage();
    }
  }

  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  async function sendMessage() {
    if (isGenerating) return;
    const input = document.getElementById("ai-user-prompt");
    if (!input) return;
    const userText = input.value.trim();
    if (!userText) return;

    input.value = "";
    isGenerating = true;
    updateSendButtonState(true);

    // Build Prompt with Context
    let fullPrompt = userText;
    if (includeCode && attachedCode) {
      fullPrompt = `[บริบทโค้ดปัจจุบันในหน้าจอ (${state.codeMode === 'avr' ? 'Bare-metal AVR-GCC' : 'Arduino C++'})]:\n\`\`\`c\n${attachedCode}\n\`\`\`\n\n[คำสั่ง/โจทย์ที่ต้องทำ]:\n${userText}`;
    }

    // Append User Message to Thread
    appendMessage("user", userText);

    // Append Assistant Message Placeholder
    const assistantMsgId = "msg-" + Date.now();
    const assistantContentEl = appendMessage("assistant", "กำลังประมวลผลคำตอบ...", assistantMsgId);

    const modelSelect = document.getElementById("ai-model-select");
    const chosenModel = modelSelect ? modelSelect.value : "kts-avr-coder";

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: chosenModel,
          prompt: fullPrompt,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status + " จาก Ollama");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullResponseText = "";
      assistantContentEl.innerHTML = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line);
            if (parsed.response) {
              fullResponseText += parsed.response;
              renderAssistantText(assistantContentEl, fullResponseText);
            }
          } catch (err) {
            // ignore partial json
          }
        }
      }

      // Final format with Code actions
      renderAssistantFinal(assistantContentEl, fullResponseText);

    } catch (e) {
      assistantContentEl.innerHTML = `
        <div class="ai-error-box">
          ⚠️ <strong>เกิดข้อผิดพลาดในการเชื่อมต่อ Ollama:</strong> ${e.message}<br>
          <span style="font-size: 12px; color: var(--text-muted);">กรุณาตรวจสอบว่าเปิดหน้าต่าง PowerShell และรัน <code>ollama run ${chosenModel}</code> อยู่หรือไม่</span>
        </div>
      `;
    } finally {
      isGenerating = false;
      updateSendButtonState(false);
      scrollChatToBottom();
    }
  }

  function updateSendButtonState(loading) {
    const btn = document.getElementById("ai-btn-send");
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading ? `<span>⏳ กำลังเขียนโค้ด...</span>` : `<span>🚀 ส่งคำถาม</span>`;
  }

  function appendMessage(role, text, id = null) {
    const thread = document.getElementById("ai-chat-thread");
    if (!thread) return null;

    const row = document.createElement("div");
    row.className = "ai-msg-row " + role;
    if (id) row.id = id;

    const avatar = document.createElement("div");
    avatar.className = "ai-avatar";
    avatar.textContent = role === "user" ? "👤" : "🤖";

    const bubble = document.createElement("div");
    bubble.className = "ai-msg-content";
    bubble.textContent = text;

    row.appendChild(avatar);
    row.appendChild(bubble);
    thread.appendChild(row);
    scrollChatToBottom();

    return bubble;
  }

  function renderAssistantText(el, text) {
    // Simple fast live render while streaming
    el.innerText = text;
    scrollChatToBottom();
  }

  function renderAssistantFinal(el, text) {
    el.innerHTML = "";

    // Parse markdown code blocks
    const codeBlockRegex = /```(?:[a-zA-Z0-9_-]+)?\s*([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Preceding text
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText.trim()) {
        const p = document.createElement("div");
        p.className = "ai-text-block";
        p.innerHTML = formatPlainText(beforeText);
        el.appendChild(p);
      }

      // Code Block
      const rawCode = match[1].trim();
      const codeWrapper = document.createElement("div");
      codeWrapper.className = "ai-generated-code-card";

      const codeHeader = document.createElement("div");
      codeHeader.className = "ai-code-header";
      codeHeader.innerHTML = `
        <span class="code-tag">C / C++ (Embedded)</span>
        <div class="code-header-actions">
          <button class="btn-apply-editor" onclick="STUDIO_AI.applyCodeToEditor(this)">
            <span>📥 นำไปใส่ Editor</span>
          </button>
          <button class="btn-copy-code" onclick="STUDIO_AI.copyExtractedCode(this)">
            <span>📋 คัดลอก</span>
          </button>
        </div>
      `;

      const pre = document.createElement("pre");
      pre.className = "ai-code-pre";
      const codeTag = document.createElement("code");
      codeTag.textContent = rawCode;
      pre.appendChild(codeTag);

      codeWrapper.appendChild(codeHeader);
      codeWrapper.appendChild(pre);
      codeWrapper.dataset.code = rawCode;
      el.appendChild(codeWrapper);

      lastIndex = codeBlockRegex.lastIndex;
    }

    // Trailing text
    const afterText = text.substring(lastIndex);
    if (afterText.trim()) {
      const p = document.createElement("div");
      p.className = "ai-text-block";
      p.innerHTML = formatPlainText(afterText);
      el.appendChild(p);
    }
  }

  function formatPlainText(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");
  }

  function applyCodeToEditor(btn) {
    const card = btn.closest(".ai-generated-code-card");
    if (!card || !card.dataset.code) return;
    const newCode = card.dataset.code;

    if (typeof state !== 'undefined') {
      const mode = state.codeMode || 'avr';
      if (!state.customCode[mode]) state.customCode[mode] = {};
      state.customCode[mode][state.activeLabId] = newCode;
      
      if (typeof setEditorMode === 'function') setEditorMode('edit');
      if (typeof setStudioTab === 'function') setStudioTab('code');
      if (typeof renderCode === 'function') renderCode();
      if (typeof showToast === 'function') showToast("✓ นำโค้ดจาก AI ไปใส่ใน Editor สำเร็จแล้ว!");
    }
  }

  function copyExtractedCode(btn) {
    const card = btn.closest(".ai-generated-code-card");
    if (!card || !card.dataset.code) return;
    navigator.clipboard.writeText(card.dataset.code).then(() => {
      btn.innerHTML = "<span>✓ คัดลอกแล้ว</span>";
      setTimeout(() => {
        btn.innerHTML = "<span>📋 คัดลอก</span>";
      }, 1500);
    });
  }

  function scrollChatToBottom() {
    const thread = document.getElementById("ai-chat-thread");
    if (thread) thread.scrollTop = thread.scrollHeight;
  }

  function onModelChange() {
    checkConnection();
  }

  return {
    renderAIPanel,
    checkConnection,
    refreshAttachedCode,
    setAttachedCode,
    toggleIncludeCode,
    usePreset,
    handleKeyDown,
    sendMessage,
    applyCodeToEditor,
    copyExtractedCode,
    onModelChange
  };
})();
