# ⚡ AVR Practical Exam Studio (CDTI 2569)

ห้องปฏิบัติการเสมือนจริงและระบบเตรียมความพร้อมสอบปฏิบัติการ รายวิชา **311-3303 การออกแบบระบบสมองกลฝังตัว (Embedded System Design)**  
หลักสูตรวิศวกรรมคอมพิวเตอร์ คณะเทคโนโลยีร่วม มหาวิทยาลัยเทคโนโลยีจิตรลดา (CDTI)

**ผู้พัฒนา:** นายอภิสักก์ คงภักดี (รหัสนักศึกษา: `6710301009`)  
**สาขาวิชา:** สาขาวิชาวิศวกรรมคอมพิวเตอร์ สถาบันเทคโนโลยีจิตรลดา (CDTI)

---

## 🎯 จุดเด่นและฟังก์ชันการทำงานหลัก (Core Features)

### 1. คลังแนวข้อสอบปฏิบัติการครบ 80 ข้อ (Comprehensive 7 Tiers)
* **Tier 1: Digital I/O Basics (20 แล็บ)** — สวิตช์ปุ่มกด Hold-to-Activate, Toggle, Debounce, Staircase 2-Way, Active-High External Pull-Down, Dual AND Logic, Press Accumulator
* **Tier 2: Patterns & State Machines (10 แล็บ)** — ไฟวิ่ง Knight Rider (Ping-Pong), ม่านไฟ LED Expand/Contract, LED Stacker, ไฟจราจรคนข้าม FSM, รหัสมอร์ส SOS
* **Tier 3: 7-Segment Displays (10 แล็บ)** — ตัวนับอัตโนมัติ 0-9 พร้อมไฟกะพริบจุดทศนิยม DP, ตัวนับขึ้น/ลง Up-Down, นับถอยหลังแจ้งเตือน, ตัวนับฐานสิบหก (Hex 0-F), วงล้อรูเล็ตต์, ลูกเต๋าดิจิทัล, นาฬิกาจับเวลา Hardware Timer1
* **Tier 4: Timers, Interrupts & ADC (10 แล็บ)** — External Interrupt INT0/INT1, Timer1 CTC Mode Precision 1Hz Clock, อ่านค่าแอนะล็อกปรับความถี่ไฟกะพริบ, Schmitt Trigger Hysteresis, Battery Voltage Monitor, PWM Dimmer ควบคุมมอเตอร์
* **Tier 5: LCD 1602 Interactive Systems (12 แล็บ)** — สถาปัตยกรรมขนาน 4-บิต (HD44780), สร้างอักขระพิเศษ CGRAM, ระบบสลับข้อความ, ตัวนับดิจิทัล, โวลต์มิเตอร์วัดแรงดันไฟฟ้า, ระบบเมนู 4 ปุ่ม, ตู้เซฟรหัสผ่าน PIN Lock
* **Tier 6: Multitasking Cooperative Schedulers (8 แล็บ)** — การขจัด `_delay_ms()` ด้วย Elapsed Time Polling, สถาปัตยกรรมเวลาจริง (Time-Triggered Architecture) ด้วย System Tick 1 ms, งานสแกนปุ่มและไฟวิ่งคู่ขนาน, สเกดจูลเลอร์แบบ Round-Robin
* **Tier 7: Full System Integration & Industrial Masters (10 แล็บ)** — โครงงานขนาดใหญ่ระดับอุตสาหกรรม: เครื่องกวนสารเคมีอัตโนมัติ (Chemical Mixer), เครื่องชั่งดิจิทัลและระบบจ่ายสาร (Batch Doser), มอนิเตอร์สัญญาณชีพทางการแพทย์ (Vital Signs Monitor), ระบบควบคุมคิวลิฟต์อัจฉริยะ (Smart Elevator Dispatcher), ตู้นิรภัยความปลอดภัยสูง (Security Vault), ระบบควบคุมสภาพอากาศเรือนกระจก (Greenhouse HVAC), และด่านเก็บค่าผ่านทางอัตโนมัติ (Highway Toll Gate)

---

### 2. ไดอะแกรมอุปกรณ์และจุดต่อขาพินกายภาพ (Hardware Cheatsheet & Pinout)
* **แสดงผล 8 อุปกรณ์จริง**: หลอดไฟ LED, สวิตช์ปุ่มกด Tactile, หน้าจอ 7-Segment 5161AS (CC), จอ LCD 1602, ตัวต้านทานปรับค่าได้ (Potentiometer), ตัวต้านทานจำกัดกระแส, บอร์ดทดลอง (Breadboard), และบอร์ด Arduino Uno R3
* แสดงมุมมองคู่: **สเกมัตติกวงจร (Circuit Schematic)** ควบคู่กับ **ภาพจำลองมุมมองด้านหน้า/ทางกายภาพ (Physical Pinout View)** สัดส่วนสมมาตร ชัดเจน ไม่ซ้อนทับ
* ตารางแจกแจงสเปกทางวิศวกรรม ค่าแรงดันตกคร่อม ($V_f$), กระแสพิกัด ($I_f$), สูตรคำนวณค่าตัวต้านทานจำกัดกระแส ($R$), และตารางแรงดันตกคร่อม ADC

---

### 3. การเชื่อมต่อโปรแกรมจำลองวงจร (SimulIDE Integration)
* ทุกข้อสอบมีไฟล์วงจรจำลอง `.sim1` แนบมาในตัว สามารถคลิกปุ่ม **"โหลดวงจร SimulIDE (.sim1)"** เพื่อนำไปเปิดรันและทดสอบการทำงานเสมือนจริงได้ทันที 100%

---

### 4. สคริปต์คอมไพล์และแฟลชลงบอร์ดจริงในคลิกเดียว (Flash Board Runner)
* ไฟล์ `Flash_Board_Runner.bat` ทำหน้าที่:
  1. ค้นหาชุดคอมไพเลอร์ `avr-gcc`, `avr-objcopy`, `avr-size` และโปรแกรมเมอร์ `avrdude` ในเครื่องอัตโนมัติ (ตรวจจับได้ทั้งจาก Arduino IDE 1.8.x, Arduino 2.x, หรือ System Path)
  2. สแกนพอร์ต USB Serial / CH340 / FTDI ที่เชื่อมต่ออยู่จริงโดยอัตโนมัติ
  3. คอมไพล์ซอร์สโค้ดภาษา C เป็นไฟล์ไบนารี `.elf` และ `.hex`
  4. ทำการแฟลชลงบอร์ด Arduino Uno ผ่านอินเทอร์เฟซ Serial โดยตรง

---

### 5. ผังงานอัลกอริทึมแบบเวกเตอร์ (SVG Flowcharts)
* มีผังงานระบบแสดงลำดับขั้นตอนการทำงานครบทั้ง 80 แล็บ
* รองรับการดาวน์โหลดไฟล์ภาพผังงานความละเอียดสูงเป็นนามสกุล `.svg` ไปใช้งานในรายงานวิชาการได้ทันที

---

### 6. ระบบสร้างรายงานผลแล็บอัตโนมัติ (Academic Lab Report Generator)
* ดึงข้อมูลการทดลอง, วัตถุประสงค์เชิงลึก, ตารางการต่อขาพินฮาร์ดแวร์ (Hardware Pinout & Wiring Table), พจนานุกรมคำศัพท์/รีจิสเตอร์สถาปัตยกรรม AVR (DDR, PORT, PIN, TCCR, ADCSRA), บันทึกผล และสรุปผลการทดลอง
* ฝังข้อมูลผู้ทำการทดลอง: **นายอภิสักก์ คงภักดี** รหัส **6710301009**
* ส่งออกเอกสารได้ 3 รูปแบบ:
  1. **HTML Report**: เอกสารจัดหน้ารองรับการสั่งพิมพ์ (Print to PDF) ด้วยขนาด A4 มาตรฐาน
  2. **Markdown Report (`.md`)**: สำหรับจัดเก็บลงคลังเอกสารหรือ GitHub
  3. **Plain Text (`.txt`)**: ข้อความสรุปแบบเรียบง่าย

---

### 7. ผู้ช่วยอัจฉริยะออฟไลน์ (Local AI Assistant Integration)
* เชื่อมต่อกับเครื่องยนต์ LLM ออฟไลน์ผ่าน Ollama API (`http://127.0.0.1:11434`)
* มีโมเดลจำเพาะ `kts-avr-coder` (ปรับแต่งผ่าน `Modelfile` สำหรับงานภาษา Embedded C และ AVR Register สถาปัตยกรรม ATmega328P โดยเฉพาะ)
* พร้อมโหมดผู้ช่วยอธิบายโค้ด, ตรวจสอบจุดต่อสายไฟ, และช่วยดีบักข้อผิดพลาดหน้างาน

---

## 📦 สิ่งที่ต้องมีและโปรแกรมที่ต้องดาวน์โหลด (Prerequisites & Downloads)

| รายการโปรแกรม | วัตถุประสงค์การใช้งาน | ลิงก์ดาวน์โหลดอย่างเป็นทางการ |
|:---|:---|:---|
| **Google Chrome หรือ Microsoft Edge** | ใช้งานระบบสตูดิโอแบบ Single-Page Application (SPA) ออฟไลน์ 100% | ติดตั้งมาพร้อมกับระบบปฏิบัติการ Windows หรือ [ดาวน์โหลด Chrome](https://www.google.com/chrome/) |
| **SimulIDE** *(แนะนำ v1.0.0 หรือ v1.1.0)* | จำลองการทำงานของวงจรอิเล็กทรอนิกส์, สวิตช์, LED, 7-Segment, จอ LCD และชิปไมโครคอนโทรลเลอร์ | [ดาวน์โหลด SimulIDE](https://simulide.com/p/downloads/) |
| **Arduino IDE หรือ WinAVR** | เพื่อใช้งานคอมไพเลอร์ `avr-gcc` และเครื่องมือแฟลชบอร์ด `avrdude` สำหรับสคริปต์ `Flash_Board_Runner.bat` | [ดาวน์โหลด Arduino IDE](https://www.arduino.cc/en/software) |
| **Ollama** *(ทางเลือก - สำหรับฟังก์ชัน AI)* | ติดตั้งเพื่อเปิดใช้งาน Local AI Assistant สำหรับช่วยเขียนโค้ดและดีบักแบบไม่ต้องต่ออินเทอร์เน็ต | [ดาวน์โหลด Ollama for Windows](https://ollama.ai/download) |

---

## 🚀 ขั้นตอนการเปิดใช้งานระบบ (Quick Start Guide)

### 1. การเปิดใช้งานสตูดิโอ
1. เข้าไปที่โฟลเดอร์ `Practical_Exam/`
2. ดับเบิลคลิกเปิดไฟล์ **`My_AVR_Practical_Studio.html`** ด้วย Google Chrome หรือ Microsoft Edge
3. หน้าต่างสตูดิโอจะทำงานได้ทันทีแบบ Standalone โดยไม่ต้องติดตั้ง Node.js หรือรันเว็บเซิร์ฟเวอร์ใดๆ

### 2. การทดสอบวงจรจำลองบน SimulIDE
1. ในหน้าต่างสตูดิโอ ให้เลือกแล็บที่ต้องการทดสอบจากขั้นตอนที่ 2
2. คลิกปุ่ม **"โหลดวงจร SimulIDE (.sim1)"** เบราว์เซอร์จะบันทึกไฟล์วงจรของแล็บนั้นลงในเครื่อง
3. เปิดโปรแกรม SimulIDE ➔ ไปที่เมนู `File` ➔ `Open Circuit` ➔ เลือกไฟล์ `.sim1` ที่เพิ่งดาวน์โหลด
4. คลิกขวาที่บอร์ด Arduino Uno ใน SimulIDE ➔ เลือก `Load firmware` ➔ เลือกไฟล์ `.hex` หรือใช้โค้ดจากหน้าเว็บ
5. กดปุ่ม **Power Circuit** (รูปสวิตช์สีแดงด้านบน) เพื่อเริ่มการจำลอง

### 3. การคอมไพล์และแฟลชลงบอร์ด Arduino Uno จริง
1. เสียบสาย USB บอร์ด Arduino Uno R3 เข้ากับเครื่องคอมพิวเตอร์
2. กดปุ่ม **"สร้างไฟล์ Flash / Sim (.bat)"** จากหน้าสตูดิโอ หรือดับเบิลคลิกเปิดไฟล์ `Flash_Board_Runner.bat` ในโฟลเดอร์ `Practical_Exam/`
3. โปรแกรมจะตรวจจับพอร์ต COM และคอมไพล์โค้ดด้วย `avr-gcc` พร้อมแฟลชลงบอร์ดทันที

### 4. การเปิดใช้งาน Local AI Assistant ด้วย Ollama (Optional)
หากต้องการใช้งานแท็บ "ผู้ช่วย AI" ด้วยโมเดลในเครื่อง:
1. เปิด Command Prompt หรือ PowerShell ในโฟลเดอร์โปรเจกต์
2. สั่งสร้างโมเดลจำเพาะจาก `Modelfile`:
   ```bash
   ollama create kts-avr-coder -f Modelfile
   ```
3. สั่งรันโมเดล:
   ```bash
   ollama run kts-avr-coder
   ```
4. ในหน้าสตูดิโอ ให้เปิดแท็บ **"ผู้ช่วย AI"** และกดส่งคำถามได้ทันที

---

## 📁 โครงสร้างโปรเจกต์ (Repository File Structure)

```text
├── Modelfile                           # นิยามโมเดล Ollama ประจำตัว (kts-avr-coder)
├── README.md                           # เอกสารคู่มือการใช้งานฉบับสมบูรณ์
├── .gitignore                          # รายการไฟล์ขนาดใหญ่และไบนารีที่ไม่รวมเข้าสู่กิต
│
├── Practical_Exam/                     # โฟลเดอร์หลักสำหรับเปิดใช้งาน
│   ├── My_AVR_Practical_Studio.html    # สตูดิโอฉบับรวมสมบูรณ์แบบไฟล์เดียว (Standalone 1.88 MB)
│   ├── Flash_Board_Runner.bat          # เครื่องมือคอมไพล์ avr-gcc และแฟลช avrdude อัตโนมัติ
│   ├── AVR_Code_Builder.html           # เครื่องมือสร้างโค้ดแบบแยกส่วน
│   └── Component_List/                 # เอกสารรายการอุปกรณ์สอบปฏิบัติการทางการ (PDF)
│
└── src/                                # ซอร์สโค้ดต้นฉบับสำหรับการพัฒนาและคอมไพล์
    ├── studio_labs_data.json           # คลังข้อมูลข้อสอบ 80 แล็บ ครบทั้ง 7 Tiers
    ├── studio_flowcharts.js            # อัลกอริทึมและโมดูลเรนเดอร์ SVG Flowchart ทั้ง 80 แล็บ
    ├── studio_report_generator.js      # เอนจินสร้างรายงานผลปฏิบัติการวิชาการ (Academic Report)
    ├── studio_component_cheatsheets.js # ไดอะแกรมและสเปกอุปกรณ์ฮาร์ดแวร์ทั้ง 8 ชนิด
    ├── studio_app_logic.js             # ลอจิกการทำงานเบื้องหน้า (UI Interaction & Filters)
    ├── studio_css.py                   # โมดูลสไตล์ชีต CSS ทั้งระบบพร้อมธีม Dark/Light
    ├── studio_datasheets.js            # คลังข้อมูล Datasheet ฉบับสรุป
    ├── studio_calculations.js          # เครื่องคำนวณวิศวกรรมฝังตัว (Timer, ADC, Baud)
    ├── studio_cgram_editor.js          # เครื่องมือวาดอักขระพิเศษจอ LCD 1602
    ├── studio_ai_assistant.js          # โมดูลเชื่อมต่อ Local AI Ollama API
    └── build_final_studio.py           # สคริปต์รวมโค้ดเป็น My_AVR_Practical_Studio.html
```

---

## 🎓 สถาบันการศึกษาและหลักสูตร
* **วิชา:** 311-3303 Embedded System Design
* **สถาบัน:** สาขาวิชาวิศวกรรมคอมพิวเตอร์ สถาบันเทคโนโลยีจิตรลดา (CDTI)
* **ภาคเรียน/ปีการศึกษา:** ภาคเรียนที่ 1 ปีการศึกษา 2569
