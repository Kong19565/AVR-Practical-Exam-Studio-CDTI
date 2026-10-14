/**
 * studio_component_cheatsheets.js
 * Hardware Component Cheatsheet Cards & Interactive Pinout Inspector
 * Clean, spacious, un-squeezed design matching CDTI academic examination standards.
 */

const COMPONENT_CHEATSHEETS = {
  seg7: {
    id: "seg7",
    name: "7-Segment 5161AS (Common Cathode, 0.56 นิ้ว)",
    subtitle: "Common Cathode (COM ต่อ GND, segment ติดเมื่อ = 1) · รุ่น CA คือ 5161BS",
    badge: "Common Cathode",
    badgeClass: "badge-cyan",
    visualType: "seg7",
    specs: [
      { label: "ชนิด", val: "Common Cathode (COM ต่อ GND, segment ติดเมื่อ = 1) · รุ่น CA คือ 5161BS" },
      { label: "ขา COM", val: "ขา 3 และ 8 (ต่อกันข้างใน)" },
      { label: "LED แต่ละ segment", val: "Vf ≈ 1.8–2.2 V (สีแดง), ใช้ 10–20 mA" },
      { label: "R ต่อ segment", val: "(5 − 2) ÷ 470 Ω ≈ 6 mA ต่อ segment → ชุดสอบใช้ R 470 Ω ทุก segment (8 ตัว) · 1 kΩ ก็ได้แต่หรี่ลง" }
    ],
    tableTitle: "ตารางถอดรหัสเซกเมนต์ (Truth Table & Hex Code):",
    headers: ["เลข", "dp g f e d c b a", "CC (hex)", "CA (hex)"],
    rows: [
      { num: "0", bin: "0 0 1 1 1 1 1 1", cc: "0x3F", ca: "0xC0", segs: ["a","b","c","d","e","f"] },
      { num: "1", bin: "0 0 0 0 0 1 1 0", cc: "0x06", ca: "0xF9", segs: ["b","c"] },
      { num: "2", bin: "0 1 0 1 1 0 1 1", cc: "0x5B", ca: "0xA4", segs: ["a","b","d","e","g"] },
      { num: "3", bin: "0 1 0 0 1 1 1 1", cc: "0x4F", ca: "0xB0", segs: ["a","b","c","d","g"] },
      { num: "4", bin: "0 1 1 0 0 1 1 0", cc: "0x66", ca: "0x99", segs: ["b","c","f","g"] },
      { num: "5", bin: "0 1 1 0 1 1 0 1", cc: "0x6D", ca: "0x92", segs: ["a","c","d","f","g"] },
      { num: "6", bin: "0 1 1 1 1 1 0 1", cc: "0x7D", ca: "0x82", segs: ["a","c","d","e","f","g"] },
      { num: "7", bin: "0 0 0 0 0 1 1 1", cc: "0x07", ca: "0xF8", segs: ["a","b","c"] },
      { num: "8", bin: "0 1 1 1 1 1 1 1", cc: "0x7F", ca: "0x80", segs: ["a","b","c","d","e","f","g"] },
      { num: "9", bin: "0 1 1 0 1 1 1 1", cc: "0x6F", ca: "0x90", segs: ["a","b","c","d","f","g"] }
    ],
    warnings: [
      "ห้ามต่อ segment ตรงเข้าขาชิปโดยไม่มี R (กระแสเกิน อาจทำให้พอร์ตหรือหลอดเสียหาย)",
      "เสียบคร่อมร่องกลาง Protoboard เพื่อแยกขาฝั่งบน (6-10) และฝั่งล่าง (1-5) ออกจากกัน"
    ]
  },

  led: {
    id: "led",
    name: "หลอดไฟ LED 5 mm (Light Emitting Diode)",
    subtitle: "ไดโอดเปล่งแสง แสดงสถานะดิจิทัล 5 mm Diffused",
    badge: "แสดงผลดิจิทัล",
    badgeClass: "badge-red",
    visualType: "led",
    specs: [
      { label: "ชนิด", val: "หลอดไฟ LED ขนาด 5 mm แบบ Round Diffused (สีแดง/เขียว/เหลือง/น้ำเงิน)" },
      { label: "ขั้วไฟฟ้า", val: "Anode (+) ขายาวกว่า / ขอบโค้งมน · Cathode (-) ขาสั้นกว่า / ขอบบากเรียบที่ฐาน" },
      { label: "แรงดันตกคร่อม (Vf)", val: "สีแดง 1.8–2.0 V · เขียว/เหลือง 2.0–2.2 V · น้ำเงิน/ขาว 3.0–3.2 V" },
      { label: "กระแสพิกัด (If)", val: "10–20 mA (ชุดสอบทำงานที่ ~6–8 mA กำลังสว่างและถนอมชิป)" },
      { label: "R จำกัดกระแส", val: "(5 − 2.0) ÷ 0.0064 A ≈ 470 Ω → ชุดสอบใช้ R 470 Ω (ปลอดภัยสำหรับบอร์ด Uno)" },
      { label: "การต่อวงจรแนะนำ", val: "Active-High: Anode ต่อพอร์ต MCU · Cathode ต่อผ่าน R 470 Ω ลง GND" }
    ],
    tableTitle: "ตารางเปรียบเทียบวงจรขับ LED (Active-High vs Active-Low):",
    headers: ["โหมดวงจร", "การต่อสายฮาร์ดแวร์", "ลอจิกสั่งติดไฟ", "โค้ดภาษา C (AVR-GCC)", "โค้ดภาษา Assembly"],
    rows: [
      { col1: "Active-High (แนะนำ)", col2: "Anode ต่อพอร์ต MCU, Cathode ต่อ R 470Ω ลง GND", col3: "HIGH (1)", col4: "PORTD |= (1 << PD2);", col5: "sbi PORTD, 2" },
      { col1: "Active-Low", col2: "Anode ต่อ 5V ผ่าน R 470Ω, Cathode ต่อพอร์ต MCU", col3: "LOW (0)", col4: "PORTD &= ~(1 << PD2);", col5: "cbi PORTD, 2" },
      { col1: "สั่งดับไฟ (Active-High)", col2: "ตัดกระแสไฟฟ้าออกจากพอร์ต", col3: "LOW (0)", col4: "PORTD &= ~(1 << PD2);", col5: "cbi PORTD, 2" },
      { col1: "สั่งดับไฟ (Active-Low)", col2: "จ่ายไฟ 5V เสมอกันทั้งสองฝั่ง", col3: "HIGH (1)", col4: "PORTD |= (1 << PD2);", col5: "sbi PORTD, 2" }
    ],
    warnings: [
      "ห้ามต่อหลอด LED เข้ากับไฟเลี้ยง +5V หรือขาพอร์ต MCU ตรงๆ โดยไม่มีตัวต้านทาน 470 Ω หรือ 1 kΩ เด็ดขาด (หลอดขาดทันที)",
      "ขีดจำกัด ATmega328P: จ่ายกระแสสูงสุดไม่เกิน 20 mA ต่อขาพิน (ห้ามเกิน 40 mA) รวมทั้งชิปไม่เกิน 200 mA"
    ]
  },

  lcd: {
    id: "lcd",
    name: "จอ LCD 1602 Display (HD44780 Standard, โหมด 4 บิต)",
    subtitle: "Monochrome Character LCD 16x2 • HD44780 Controller Standard",
    badge: "โหมด 4 บิตขนาน",
    badgeClass: "badge-green",
    visualType: "lcd",
    specs: [
      { label: "ชนิด", val: "Monochrome Character LCD (16 ตัวอักษร x 2 แถว, มาตรฐาน HD44780)" },
      { label: "โหมดเชื่อมต่อ", val: "โหมดขนาน 4 บิต (ใช้สายข้อมูลเพียง D4–D7 เพื่อประหยัดขา I/O บน Uno)" },
      { label: "ขา V0 (Contrast)", val: "ต้องต่อกับขากลางของ Potentiometer (แรงดันปรับช่วง 0.5–1.0 V หากต่อผิดจะขึ้นแถบสี่เหลี่ยมดำทึบ)" },
      { label: "ไฟแบล็กไลต์", val: "ขา 15 (A) ต่อ +5V ผ่าน R 470 Ω (หรือ 220 Ω) · ขา 16 (K) ต่อตรงลง GND" },
      { label: "การต่อขา RW", val: "ต่อลง GND ถาวร (Write Only) เพื่อให้อยู่ในโหมดเขียนข้อมูลเข้าจอเสมอ" }
    ],
    tableTitle: "ตารางคำสั่งควบคุมจอมาตรฐาน HD44780 (Instruction Set):",
    headers: ["คำสั่ง (Hex)", "ชื่อคำสั่ง (Instruction)", "หน้าที่และการทำงานในวงจร", "เวลาหน่วงขั้นต่ำ"],
    rows: [
      { col1: "0x33, 0x32", col2: "4-bit Init Sequence", col3: "ลำดับคำสั่งบังคับ 2 จังหวะเพื่อรีเซ็ตชิปเข้าสู่โหมด 4 บิต", col4: "> 4.1 ms" },
      { col1: "0x28", col2: "Function Set", col3: "กำหนดโหมด 4 บิต, แสดงผล 2 บรรทัด, ฟอนต์ 5x8 ดอต", col4: "37 μs" },
      { col1: "0x0C", col2: "Display ON (Hide Cursor)", col3: "เปิดหน้าจอแสดงผล ซ่อนเคอร์เซอร์ ไม่กะพริบ", col4: "37 μs" },
      { col1: "0x0E", col2: "Display ON + Cursor", col3: "เปิดหน้าจอพร้อมแสดงเส้นเคอร์เซอร์ใต้ตัวอักษร", col4: "37 μs" },
      { col1: "0x01", col2: "Clear Display", col3: "ล้างตัวอักษรทั้งหมดบนจอ และย้ายเคอร์เซอร์กลับบรรทัด 1 ช่อง 0", col4: "1.52 ms" },
      { col1: "0x06", col2: "Entry Mode Set", col3: "ให้เคอร์เซอร์เลื่อนไปทางขวาอัตโนมัติ 1 ตำแหน่งเมื่อพิมพ์ข้อมูล", col4: "37 μs" },
      { col1: "0x80", col2: "Set DDRAM Row 1", col3: "ย้ายตำแหน่ง Cursor ไปยังบรรทัดที่ 1 คอลัมน์ที่ 0 (ที่อยู่ 0x80..0x8F)", col4: "37 μs" },
      { col1: "0xC0", col2: "Set DDRAM Row 2", col3: "ย้ายตำแหน่ง Cursor ไปยังบรรทัดที่ 2 คอลัมน์ที่ 0 (ที่อยู่ 0xC0..0xCF)", col4: "37 μs" },
      { col1: "0x40", col2: "Set CGRAM Address", col3: "ย้ายไปหน่วยความจำสำหรับสร้างไอคอนพิเศษขนาด 5x8 จุด 8 ตัว", col4: "37 μs" }
    ],
    warnings: [
      "ห้ามต่อขา D10 (PB2) สลับกับปุ่มกดสวิตช์ เพราะ D10 ใช้เป็นขา Enable (E) ของจอ LCD 1602",
      "ขา 7–10 (D0–D3) ให้ปล่อยว่าง (NC) ห้ามต่อลงกราวด์ในโหมด 4 บิต",
      "หากจอขึ้นแถบดำทึบเต็มแถวบน แสดงว่าคำสั่งหน่วงเวลาในการ Initialize ยังไม่พอ หรือยังไม่ได้เรียกฟังก์ชัน init"
    ]
  },

  btn: {
    id: "btn",
    name: "สวิตช์ปุ่มกด Tactile 6x6 mm (Push Button, Active-Low)",
    subtitle: "Momentary Push Button Switch • Active-Low with Internal Pull-Up",
    badge: "อินพุตดิจิทัล",
    badgeClass: "badge-amber",
    visualType: "btn",
    specs: [
      { label: "ชนิด", val: "Tactile Momentary Push Button Switch 6x6 mm (กดติด–ปล่อยดับ แบบ 4 ขา)" },
      { label: "พิกัดไฟฟ้า", val: "DC 12V 50 mA, ความต้านทานหน้าสัมผัส < 100 mΩ" },
      { label: "วงจรที่แนะนำ", val: "Active-Low + Internal Pull-Up (ไม่ต้องใช้ตัวต้านทานภายนอก ประหยัดพื้นที่บอร์ด)" },
      { label: "ขาเชื่อมต่อภายใน", val: "ขา 1 กับ 2 ต่อถึงกันตลอดเวลา, ขา 3 กับ 4 ต่อถึงกันตลอดเวลา เมื่อกดปุ่มจะเชื่อมสองคู่เข้าหากัน" },
      { label: "สัญญาณกระดอน (Debounce)", val: "หน้าสัมผัสสปริงจะสั่นกระดอนช่วง 5–10 ms แรกหลังกด ต้องแก้ด้วย Software Debounce 20 ms" }
    ],
    tableTitle: "ตารางสถานะสวิตช์และรีจิสเตอร์พอร์ต (Switch Logic Table):",
    headers: ["สถานะปุ่ม", "สภาพวงจรไฟฟ้า", "ระดับลอจิก (PINx)", "คำสั่งตรวจเช็ค (C)", "คำสั่งตรวจเช็ค (Assembly)"],
    rows: [
      { col1: "ปล่อยปุ่ม (Released)", col2: "สวิตช์เปิดวงจร ถูกดึงขึ้นไฟ 5V ผ่าน Pull-up", col3: "HIGH (1)", col4: "(PIND & (1 << PD2))", col5: "sbis PIND, 2 (ข้ามถ้าปล่อย=1)" },
      { col1: "กดปุ่ม (Pressed)", col2: "สวิตช์ลัดวงจรดึงขาพอร์ตลงกราวด์ GND", col3: "LOW (0)", col4: "!(PIND & (1 << PD2))", col5: "sbic PIND, 2 (ข้ามถ้ากด=0)" }
    ],
    warnings: [
      "เสียบสวิตช์คร่อมร่องกลาง Protoboard เพื่อไม่ให้ขาคู่ตรงข้ามลัดวงจรกันเอง",
      "ห้ามต่อสวิตช์เข้าขา D10 (PB2) เมื่อในวงจรมีจอ LCD เพราะ D10 เป็นขา Enable (E) ของจอ ให้ย้ายไปใช้ขา A0 (PC0)"
    ]
  },

  pot: {
    id: "pot",
    name: "ตัวต้านทานปรับค่าได้ (Potentiometer 1kΩ / 10kΩ แบบ 3 ขา)",
    subtitle: "Rotary Linear Carbon Potentiometer • Voltage Divider & ADC Input",
    badge: "อนาล็อกอินพุต",
    badgeClass: "badge-purple",
    visualType: "pot",
    specs: [
      { label: "ชนิด", val: "Rotary Carbon Film Potentiometer (แบบปรับค่าเชิงเส้น Linear B10K หรือ B1K)" },
      { label: "ความต้านทานคงที่", val: "ระหว่างขาริม 1 กับขาริม 3 วัดได้ 10 kΩ (หรือ 1 kΩ) คงที่เสมอ" },
      { label: "ขากลาง (Wiper 2)", val: "แรงดันเปลี่ยนแปลงได้ต่อเนื่อง 0.0 V ถึง 5.0 V ตามมุมการหมุน" },
      { label: "สูตรแบ่งแรงดัน", val: "Vout = 5V × (R2 ÷ R_total)" },
      { label: "กระแสสิ้นเปลือง", val: "I = 5V ÷ 10,000 Ω = 0.5 mA (ประหยัดพลังงานมาก ไม่มีความร้อนสะสม)" }
    ],
    tableTitle: "ตารางแปลงค่าแรงดันแอนะล็อกสู่ค่าดิจิทัล 10 บิต (ADC Table):",
    headers: ["ตำแหน่งการหมุน", "แรงดันที่ขากลาง (Vout)", "ค่าดิจิทัล ADC (10-bit)", "Hex Value", "การนำไปใช้งานในแล็บ"],
    rows: [
      { col1: "หมุนซ้ายสุด (0%)", col2: "0.00 V", col3: "0", col4: "0x000", col5: "หรี่ไฟดับสนิท / ปิดพัดลม / ต่ำสุด" },
      { col1: "หมุน 25%", col2: "1.25 V", col3: "256", col4: "0x100", col5: "สว่าง 25% (PWM OCRnx = 64)" },
      { col1: "หมุนกึ่งกลาง (50%)", col2: "2.50 V", col3: "512", col4: "0x200", col5: "ความสว่าง 50% (PWM OCRnx = 128)" },
      { col1: "หมุน 75%", col2: "3.75 V", col3: "768", col4: "0x300", col5: "ความสว่าง 75% (PWM OCRnx = 192)" },
      { col1: "หมุนขวาสุด (100%)", col2: "5.00 V", col3: "1023", col4: "0x3FF", col5: "สว่างเต็มที่ 100% (PWM OCRnx = 255)" }
    ],
    warnings: [
      "ขาริม 1 และ 3 ให้ต่อเข้า +5V และ GND ส่วนขากลาง (2) เป็นสัญญาณเอาต์พุต",
      "ห้ามต่อขากลางเข้า +5V และขาริมลง GND ตรงๆ โดยไม่มีโหลด เพราะหากหมุนสุดจะทำให้ไฟ 5V ช็อตลงกราวด์ทันที!",
      "เมื่อใช้กับจอ LCD ให้ต่อขากลาง (2) เข้าขา 3 (V0) ของจอ เพื่อปรับ Contrast"
    ]
  },

  res: {
    id: "res",
    name: "ตัวต้านทานค่าคงที่ (Carbon Film Resistors 1/4 Watt)",
    subtitle: "Through-Hole Carbon Film Resistors 470Ω, 1kΩ, 10kΩ (±5%)",
    badge: "จำกัดกระแส / พูลอัป",
    badgeClass: "badge-blue",
    visualType: "res",
    specs: [
      { label: "ชนิด", val: "Carbon Film Resistor แบบ Through-Hole 0.25W (1/4 วัตต์) ความเผื่อ ±5%" },
      { label: "คุณสมบัติทางไฟฟ้า", val: "ไม่มีขั้ว (Non-Polarized) สามารถต่อสลับทิศทางไปมาได้อย่างอิสระ" },
      { label: "กำลังไฟฟ้า", val: "P = V² ÷ R → ที่ไฟ 5V: 470 Ω เกิดความร้อนเพียง 0.05 วัตต์ ปลอดภัยไม่ร้อน" },
      { label: "การใช้งานหลัก", val: "จำกัดกระแส LED/7-Seg (470 Ω), ดึงสัญญาณ Pull-Up/Down (1 kΩ / 10 kΩ)" }
    ],
    tableTitle: "ตารางรหัสแถบสีและการประยุกต์ใช้งานในข้อสอบ:",
    headers: ["ค่าความต้านทาน", "แถบ 1 (สิบ)", "แถบ 2 (หน่วย)", "แถบ 3 (ตัวคูณ)", "แถบ 4 (ความเผื่อ)", "บทบาทหน้าที่ในชุดสอบ"],
    rows: [
      { col1: "470 Ω", col2: "เหลือง (4)", col3: "ม่วง (7)", col4: "น้ำตาล (x10)", col5: "ทอง (±5%)", col6: "จำกัดกระแส LED 5mm และ 7-Segment ทุกเซกเมนต์ (~6 mA)" },
      { col1: "1 kΩ", col2: "น้ำตาล (1)", col3: "ดำ (0)", col4: "แดง (x100)", col5: "ทอง (±5%)", col6: "จำกัดกระแส LED (หรี่ลง), วงจรดึงสัญญาณภายนอก" },
      { col1: "10 kΩ", col2: "น้ำตาล (1)", col3: "ดำ (0)", col4: "ส้ม (x1,000)", col5: "ทอง (±5%)", col6: "วงจร External Pull-Up สำหรับสวิตช์ / ป้องกันขาลอย" }
    ],
    warnings: [
      "ในวันสอบต้องเตรียมตัวต้านทาน 470 Ω ไว้อย่างน้อย 8-10 ตัว เพื่อใช้กับ 7-Segment ครบทุกขา a-g, dp",
      "สังเกตแถบสีให้ชัดเจน อย่าหยิบผิดเอา 10 kΩ ไปต่ออนุกรมกับ LED เพราะหลอดจะสว่างริบหรี่จนมองไม่ออก"
    ]
  },

  proto: {
    id: "proto",
    name: "บอร์ดทดลองวงจร (Solderless Breadboard 830 รู)",
    subtitle: "830 Tie-Point Solderless Breadboard with Dual Power Rails",
    badge: "โครงสร้างวงจร",
    badgeClass: "badge-teal",
    visualType: "proto",
    specs: [
      { label: "โครงสร้าง", val: "แผ่นสปริงโลหะ Phosphor Bronze ชุบนิกเกิล รองรับสายเบอร์ 20–29 AWG" },
      { label: "รางไฟ (Power Rails)", val: "แถบแนวนอน 2 แถวบนและล่าง เชื่อมต่อกันตลอดแนว (แดง = +5V, น้ำเงิน = GND)" },
      { label: "ช่องเสียบอุปกรณ์", val: "รู 5 รูในแนวตั้งเดียวกัน (เช่น 1a–1e) เชื่อมถึงกันเป็นโหนดไฟฟ้าเดียวกัน" },
      { label: "ร่องฉนวนตรงกลาง", val: "กว้างมาตรฐาน 0.3 นิ้ว ออกแบบมาสำหรับเสียบคร่อมไอซี DIP และ 7-Segment พอดี" }
    ],
    tableTitle: "ตารางโครงสร้างการนำกระแสและการใช้งานโซนต่างๆ บนบอร์ด:",
    headers: ["บริเวณบนบอร์ด", "ทิศทางการนำกระแส", "บทบาทหน้าที่ในวงจร", "ข้อควรระวังสำคัญ"],
    rows: [
      { col1: "รางสีแดง (+)", col2: "แนวนอนยาวตลอดแนว", col3: "จ่ายไฟบวก +5V จากบอร์ด Arduino Uno", col4: "อย่าต่อลัดวงจรข้ามไปรางสีน้ำเงิน" },
      { col1: "รางสีน้ำเงิน (-)", col2: "แนวนอนยาวตลอดแนว", col3: "กราวด์ร่วม (Common GND) สำหรับทุกวงจร", col4: "ต้องต่อสายจากขา GND ของ Arduino Uno เข้ามาเสมอ" },
      { col1: "รูแนวตั้ง 5 รู (a–e, f–j)", col2: "แนวตั้ง 5 จุดเชื่อมถึงกัน", col3: "จุดเชื่อมต่อขาอุปกรณ์และสายไฟเข้าหากัน", col4: "ห้ามเสียบขา 2 ขาของอุปกรณ์ชิ้นเดียวกันในแถวเดียวกัน" },
      { col1: "ร่องตรงกลาง (Center Divider)", col2: "แยกฉนวนทางไฟฟ้า", col3: "สำหรับวางคร่อม 7-Segment, IC, และสวิตช์", col4: "ต้องกดขาอุปกรณ์ให้มิดบอร์ด ไม่ให้หลุดหลวม" }
    ],
    warnings: [
      "เสียบสายไฟและขาอุปกรณ์ให้แน่นหนา หากสายหลวมอาจเกิดปัญหาสัญญาณรบกวนทำให้การทดลองผิดพลาด",
      "ต่อสายกราวด์ (GND) จาก Arduino เข้ามาที่รางสีน้ำเงินก่อนเสมอ"
    ]
  },

  arduino: {
    id: "arduino",
    name: "บอร์ดไมโครคอนโทรลเลอร์ Arduino Uno R3 (ATmega328P 16 MHz)",
    subtitle: "ATmega328P DIP-28 • 16 MHz Crystal • 20 I/O Pins • AVR-GCC Native",
    badge: "บอร์ดประมวลผลหลัก",
    badgeClass: "badge-accent",
    visualType: "arduino",
    specs: [
      { label: "ชิปประมวลผล", val: "Microchip ATmega328P (8-bit AVR RISC Architecture) @ 16 MHz" },
      { label: "หน่วยความจำ", val: "Flash 32 KB (ใช้เก็บโค้ด), SRAM 2 KB, EEPROM 1 KB" },
      { label: "พอร์ตดิจิทัล I/O", val: "20 ขา (D0–D13 และ A0–A5 ที่ตั้งเป็นดิจิทัลพอร์ตได้)" },
      { label: "รีจิสเตอร์ประจำพอร์ต", val: "DDRx (ทิศทาง: 1=Out, 0=In), PORTx (เขียนค่า/เปิด Pull-up), PINx (อ่านค่าจริง)" },
      { label: "ขีดจำกัดกระแส", val: "พิกัดแนะนำ ≤ 20 mA ต่อขา (สูงสุดห้ามเกิน 40 mA) รวมทั้งชิปห้ามเกิน 200 mA" }
    ],
    tableTitle: "ตารางจับคู่ขาพินบอร์ด Uno สู่พอร์ตชิป ATmega328P (Pinout Mapping):",
    headers: ["ขาบน Arduino", "ขาพอร์ต ATmega", "ขาชิป DIP-28", "ฟังก์ชันพิเศษทางฮาร์ดแวร์", "บทบาทในข้อสอบปฏิบัติ CDTI"],
    rows: [
      { col1: "D2", col2: "PD2", col3: "Pin 4", col4: "External INT0", col5: "ปุ่มกดอินเทอร์รัปต์ภายนอก INT0 / 7-Seg ขา a / LCD D7" },
      { col1: "D3", col2: "PD3", col3: "Pin 5", col4: "External INT1 / PWM (Timer2)", col5: "อินเทอร์รัปต์ INT1 / ขับไฟ PWM / 7-Seg ขา b / LCD D6" },
      { col1: "D4", col2: "PD4", col3: "Pin 6", col4: "GPIO (Port D บิต 4)", col5: "7-Seg ขา c / สวิตช์ปุ่มกด / LCD D5" },
      { col1: "D5", col2: "PD5", col3: "Pin 11", col4: "PWM (Timer0)", col5: "7-Seg ขา d / LCD D4" },
      { col1: "D6", col2: "PD6", col3: "Pin 12", col4: "PWM (Timer0)", col5: "7-Seg ขา e / สวิตช์ปุ่มกด" },
      { col1: "D7", col2: "PD7", col3: "Pin 13", col4: "GPIO (Port D บิต 7)", col5: "7-Seg ขา f / สวิตช์ปุ่มกด" },
      { col1: "D8", col2: "PB0", col3: "Pin 14", col4: "GPIO (Port B บิต 0)", col5: "7-Seg ขา g / สวิตช์ปุ่มกด SW1" },
      { col1: "D9", col2: "PB1", col3: "Pin 15", col4: "PWM (Timer1 16-bit)", col5: "PWM หรี่ไฟ LED / สวิตช์ปุ่มกด SW2" },
      { col1: "D10", col2: "PB2", col3: "Pin 16", col4: "PWM / SPI SS", col5: "ขา Enable (E) ของจอ LCD 1602 (ห้ามต่อสวิตช์ชน)" },
      { col1: "D11", col2: "PB3", col3: "Pin 17", col4: "PWM / SPI MOSI", col5: "ขา RW จอ LCD หรือสวิตช์" },
      { col1: "D12", col2: "PB4", col3: "Pin 18", col4: "SPI MISO", col5: "ขา RS (Register Select) ของจอ LCD 1602" },
      { col1: "D13", col2: "PB5", col3: "Pin 19", col4: "SCK / Built-in LED", col5: "ไฟ LED บนบอร์ด Uno" },
      { col1: "A0", col2: "PC0", col3: "Pin 23", col4: "ADC Channel 0", col5: "รับแรงดันแอนะล็อก 0–5V จาก Potentiometer / สวิตช์ SW3" }
    ],
    warnings: [
      "ขา D0 (RX) และ D1 (TX) ใช้สื่อสารกับคอมพิวเตอร์ผ่าน USB หากต่อวงจรชนจะทำให้แฟลชโค้ดไม่เข้า",
      "อย่าลืมเชื่อมต่อกราวด์ (GND) ระหว่างบอร์ด Uno กับ Breadboard ร่วมกันเสมอ"
    ]
  }
};

const STUDIO_CHEATSHEET_RENDERER = {
  activeSegDigit: "8",

  generateVisualSvg: function(visualType) {
    if (visualType === 'seg7') {
      return `
        <div class="hw-visual-dual-container">
          <!-- 7-Segment Display SVG -->
          <div class="hw-seg7-box">
            <svg class="hw-7seg-svg" viewBox="0 0 140 200" id="hw-live-7seg">
              <!-- a -->
              <polygon id="hw-seg-a" class="hw-seg active" points="30,16 40,8 100,8 110,16 100,24 40,24" />
              <!-- b -->
              <polygon id="hw-seg-b" class="hw-seg active" points="112,18 120,26 120,90 112,98 104,90 104,26" />
              <!-- c -->
              <polygon id="hw-seg-c" class="hw-seg active" points="112,102 120,110 120,174 112,182 104,174 104,110" />
              <!-- d -->
              <polygon id="hw-seg-d" class="hw-seg active" points="30,184 40,176 100,176 110,184 100,192 40,192" />
              <!-- e -->
              <polygon id="hw-seg-e" class="hw-seg active" points="28,102 36,110 36,174 28,182 20,174 20,110" />
              <!-- f -->
              <polygon id="hw-seg-f" class="hw-seg active" points="28,18 36,26 36,90 28,98 20,90 20,26" />
              <!-- g -->
              <polygon id="hw-seg-g" class="hw-seg active" points="30,100 40,92 100,92 110,100 100,108 40,108" />
              <!-- dp -->
              <circle id="hw-seg-dp" class="hw-seg-dp" cx="126" cy="184" r="5" fill="#ef4444" />
              
              <!-- Segment Labels -->
              <text x="70" y="20" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">a</text>
              <text x="112" y="58" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">b</text>
              <text x="112" y="142" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">c</text>
              <text x="70" y="188" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">d</text>
              <text x="28" y="142" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">e</text>
              <text x="28" y="58" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">f</text>
              <text x="70" y="104" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">g</text>
              <text x="126" y="172" fill="#fff" font-size="9" text-anchor="middle">dp</text>
            </svg>
          </div>

          <!-- Physical 10-Pin DIP Pinout Diagram -->
          <div class="hw-chip-diagram-box">
            <div class="hw-chip-pin-row top">
              <div class="hw-pin-label-group"><span>g</span><small>10</small><div class="hw-pin-leg"></div></div>
              <div class="hw-pin-label-group"><span>f</span><small>9</small><div class="hw-pin-leg"></div></div>
              <div class="hw-pin-label-group com"><span>COM</span><small>8</small><div class="hw-pin-leg"></div></div>
              <div class="hw-pin-label-group"><span>a</span><small>7</small><div class="hw-pin-leg"></div></div>
              <div class="hw-pin-label-group"><span>b</span><small>6</small><div class="hw-pin-leg"></div></div>
            </div>

            <div class="hw-chip-body">
              <span>มองด้านหน้า</span>
            </div>

            <div class="hw-chip-pin-row bottom">
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><small>1</small><span>e</span></div>
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><small>2</small><span>d</span></div>
              <div class="hw-pin-label-group com"><div class="hw-pin-leg"></div><small>3</small><span>COM</span></div>
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><small>4</small><span>c</span></div>
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><small>5</small><span>dp</span></div>
            </div>
          </div>
        </div>
      `;
    }

    if (visualType === 'led') {
      return `
        <div class="hw-visual-dual-container">
          <!-- LED 5mm SVG with ample spacing -->
          <div class="hw-graphic-box">
            <svg viewBox="0 0 200 135" style="width: 160px; height: 110px;">
              <!-- Dome -->
              <path d="M 60,60 A 40,40 0 0,1 140,60 L 146,66 L 54,66 Z" fill="#ef4444" stroke="#f87171" stroke-width="2"/>
              <!-- Flat rim at cathode (right side) -->
              <line x1="54" y1="66" x2="54" y2="72" stroke="#dc2626" stroke-width="2" />
              <line x1="146" y1="66" x2="146" y2="72" stroke="#b91c1c" stroke-width="4" />
              <line x1="50" y1="72" x2="150" y2="72" stroke="#dc2626" stroke-width="2" />
              
              <!-- Anode Leg (Longer, Left) -->
              <line x1="78" y1="72" x2="78" y2="120" stroke="#cbd5e1" stroke-width="3.5" />
              <!-- Cathode Leg (Shorter, Right) -->
              <line x1="122" y1="72" x2="122" y2="105" stroke="#cbd5e1" stroke-width="3.5" />
              
              <!-- Text Callouts with ample separation -->
              <text x="78" y="132" fill="#38bdf8" font-size="11" text-anchor="middle" font-weight="bold">Anode (+)</text>
              <text x="126" y="118" fill="#f87171" font-size="11" text-anchor="middle" font-weight="bold">Cathode (-)</text>
              <text x="160" y="68" fill="#fbbf24" font-size="9" text-anchor="start">ขอบบากเรียบ</text>
            </svg>
          </div>

          <!-- Physical Lead Identification Box -->
          <div class="hw-chip-diagram-box">
            <div class="hw-chip-pin-row top">
              <div class="hw-pin-label-group"><span style="color:#38bdf8;">ขายาวกว่า</span><div class="hw-pin-leg"></div></div>
              <div class="hw-pin-label-group"><span style="color:#f87171;">ขาสั้น/บาก</span><div class="hw-pin-leg"></div></div>
            </div>

            <div class="hw-chip-body" style="width: 130px; height: 46px;">
              <span style="font-size: 11px; text-align: center;">มองด้านหน้า<br><small style="color:var(--text-muted); font-size:9.5px;">ขอบบาก = ขั้วลบ</small></span>
            </div>

            <div class="hw-chip-pin-row bottom">
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><span style="color:#38bdf8;">Anode (+)</span><small style="color:#94a3b8;">ต่อ MCU</small></div>
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><span style="color:#f87171;">Cathode (-)</span><small style="color:#94a3b8;">ต่อ R 470Ω</small></div>
            </div>
          </div>
        </div>
      `;
    }

    if (visualType === 'lcd') {
      return `
        <div class="hw-visual-dual-container lcd-layout">
          <div class="hw-lcd-screen-box">
            <div class="hw-lcd-bezel">
              <div class="hw-lcd-glass">
                <div class="hw-lcd-line">1: CDTI EMBEDDED</div>
                <div class="hw-lcd-line">2: 16x2 LCD 4-BIT</div>
              </div>
            </div>
            <div class="hw-lcd-pinout-bar">
              <span title="Pin 1: VSS (GND)">1:VSS</span>
              <span title="Pin 2: VDD (+5V)">2:VDD</span>
              <span title="Pin 3: V0 (Contrast)" class="pin-hi">3:V0</span>
              <span title="Pin 4: RS (Register Select)">4:RS</span>
              <span title="Pin 5: RW (ต่อ GND)">5:RW</span>
              <span title="Pin 6: E (Enable Strobe)">6:E</span>
              <span title="Pins 7-10: D0-D3 (NC โหมด 4 บิต)" class="pin-nc">7-10:NC</span>
              <span title="Pins 11-14: D4-D7 (Data 4-bit)" class="pin-data">11-14:D4-D7</span>
              <span title="Pins 15-16: BLA/BLK (Backlight)">15:A 16:K</span>
            </div>
          </div>
        </div>
      `;
    }

    if (visualType === 'btn') {
      return `
        <div class="hw-visual-dual-container">
          <!-- Button Top View SVG -->
          <div class="hw-graphic-box">
            <svg viewBox="0 0 160 120" style="width: 140px; height: 105px;">
              <rect x="35" y="20" width="90" height="70" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2" />
              <circle cx="80" cy="55" r="22" fill="#334155" stroke="#64748b" stroke-width="2" />
              <circle cx="80" cy="55" r="16" fill="#0284c7" />
              <rect x="15" y="30" width="20" height="6" fill="#cbd5e1" rx="2" />
              <rect x="15" y="70" width="20" height="6" fill="#cbd5e1" rx="2" />
              <rect x="125" y="30" width="20" height="6" fill="#cbd5e1" rx="2" />
              <rect x="125" y="70" width="20" height="6" fill="#cbd5e1" rx="2" />
              <text x="8" y="36" fill="#94a3b8" font-size="10" font-weight="bold">1</text>
              <text x="8" y="76" fill="#94a3b8" font-size="10" font-weight="bold">2</text>
              <text x="150" y="36" fill="#94a3b8" font-size="10" font-weight="bold">3</text>
              <text x="150" y="76" fill="#94a3b8" font-size="10" font-weight="bold">4</text>
            </svg>
          </div>

          <!-- Internal Bridge Pinout Box -->
          <div class="hw-chip-diagram-box">
            <div class="hw-chip-pin-row top">
              <div class="hw-pin-label-group"><span>ขา 1</span><small>MCU</small><div class="hw-pin-leg"></div></div>
              <div class="hw-pin-label-group"><span>ขา 3</span><small>GND</small><div class="hw-pin-leg"></div></div>
            </div>

            <div class="hw-chip-body" style="width: 130px; height: 46px;">
              <span style="font-size: 11px; text-align: center;">มองด้านบน 4 ขา<br><small style="color:#38bdf8; font-size:9.5px;">1-2 และ 3-4 ต่อถึงกัน</small></span>
            </div>

            <div class="hw-chip-pin-row bottom">
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><small>MCU</small><span>ขา 2</span></div>
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><small>GND</small><span>ขา 4</span></div>
            </div>
          </div>
        </div>
      `;
    }

    if (visualType === 'pot') {
      return `
        <div class="hw-visual-dual-container">
          <!-- Potentiometer SVG -->
          <div class="hw-graphic-box">
            <svg viewBox="0 0 160 125" style="width: 140px; height: 110px;">
              <circle cx="80" cy="50" r="34" fill="#1e293b" stroke="#0284c7" stroke-width="2.5" />
              <circle cx="80" cy="50" r="16" fill="#334155" stroke="#64748b" stroke-width="2" />
              <line x1="80" y1="50" x2="80" y2="38" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
              <rect x="42" y="86" width="10" height="24" fill="#ef4444" rx="2" />
              <rect x="75" y="86" width="10" height="24" fill="#38bdf8" rx="2" />
              <rect x="108" y="86" width="10" height="24" fill="#3b82f6" rx="2" />
              <text x="47" y="122" fill="#ef4444" font-size="10" text-anchor="middle" font-weight="bold">1:5V</text>
              <text x="80" y="122" fill="#38bdf8" font-size="10" text-anchor="middle" font-weight="bold">2:Wiper</text>
              <text x="113" y="122" fill="#3b82f6" font-size="10" text-anchor="middle" font-weight="bold">3:GND</text>
            </svg>
          </div>

          <!-- Potentiometer Pinout Box -->
          <div class="hw-chip-diagram-box">
            <div class="hw-chip-body" style="width: 130px; height: 46px;">
              <span style="font-size: 11px; text-align: center;">มองด้านหน้า 3 ขา<br><small style="color:#38bdf8; font-size:9.5px;">B10K / B1K Linear</small></span>
            </div>

            <div class="hw-chip-pin-row bottom">
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><small>1</small><span style="color:#ef4444;">+5V</span></div>
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><small>2</small><span style="color:#38bdf8;">Wiper</span></div>
              <div class="hw-pin-label-group"><div class="hw-pin-leg"></div><small>3</small><span style="color:#3b82f6;">GND</span></div>
            </div>
          </div>
        </div>
      `;
    }

    if (visualType === 'res') {
      return `
        <div class="hw-visual-dual-container">
          <!-- Resistor SVG -->
          <div class="hw-graphic-box">
            <svg viewBox="0 0 180 85" style="width: 160px; height: 75px;">
              <line x1="10" y1="42" x2="40" y2="42" stroke="#cbd5e1" stroke-width="3" />
              <line x1="140" y1="42" x2="170" y2="42" stroke="#cbd5e1" stroke-width="3" />
              <path d="M 40,42 Q 40,28 55,28 L 125,28 Q 140,28 140,42 Q 140,56 125,56 L 55,56 Q 40,56 40,42 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
              <rect x="58" y="28" width="7" height="28" fill="#eab308" />
              <rect x="74" y="28" width="7" height="28" fill="#a855f7" />
              <rect x="90" y="28" width="7" height="28" fill="#78350f" />
              <rect x="114" y="28" width="7" height="28" fill="#d97706" />
              <text x="90" y="74" fill="#f59e0b" font-size="10.5" text-anchor="middle" font-weight="bold">470 Ω (เหลือง-ม่วง-น้ำตาล-ทอง)</text>
            </svg>
          </div>

          <!-- Resistor Spec Box -->
          <div class="hw-chip-diagram-box">
            <div class="hw-chip-pin-row top">
              <div class="hw-pin-label-group"><span>ขา 1</span><div class="hw-pin-leg"></div></div>
              <div class="hw-pin-label-group"><span>ขา 2</span><div class="hw-pin-leg"></div></div>
            </div>
            <div class="hw-chip-body" style="width: 130px; height: 46px;">
              <span style="font-size: 11px; text-align: center;">ไม่มีขั้วไฟฟ้า<br><small style="color:#22c55e; font-size:9.5px;">ต่อสลับข้างได้อิสระ</small></span>
            </div>
          </div>
        </div>
      `;
    }

    if (visualType === 'proto') {
      return `
        <div class="hw-visual-dual-container">
          <div class="hw-graphic-box">
            <svg viewBox="0 0 180 100" style="width: 160px; height: 90px;">
              <rect x="10" y="8" width="160" height="84" rx="5" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
              <line x1="20" y1="18" x2="160" y2="18" stroke="#ef4444" stroke-width="2" />
              <line x1="20" y1="24" x2="160" y2="24" stroke="#3b82f6" stroke-width="2" />
              <rect x="15" y="48" width="150" height="6" fill="#cbd5e1" />
              <line x1="20" y1="78" x2="160" y2="78" stroke="#3b82f6" stroke-width="2" />
              <line x1="20" y1="84" x2="160" y2="84" stroke="#ef4444" stroke-width="2" />
              <circle cx="50" cy="35" r="2" fill="#64748b" /><circle cx="70" cy="35" r="2" fill="#64748b" /><circle cx="90" cy="35" r="2" fill="#64748b" />
              <circle cx="50" cy="62" r="2" fill="#64748b" /><circle cx="70" cy="62" r="2" fill="#64748b" /><circle cx="90" cy="62" r="2" fill="#64748b" />
              <text x="90" y="53" fill="#475569" font-size="7" text-anchor="middle">ร่องผ่ากลาง (คร่อม IC/7-Seg)</text>
            </svg>
          </div>

          <div class="hw-chip-diagram-box">
            <div class="hw-chip-body" style="width: 130px; height: 50px;">
              <span style="font-size: 11px; text-align: center;">ผังโครงสร้างบอร์ด<br><small style="color:#38bdf8; font-size:9.5px;">รางไฟแนวนอน / รูแนวตั้ง</small></span>
            </div>
          </div>
        </div>
      `;
    }

    if (visualType === 'arduino') {
      return `
        <div class="hw-visual-dual-container">
          <div class="hw-graphic-box">
            <svg viewBox="0 0 180 115" style="width: 160px; height: 100px;">
              <rect x="15" y="12" width="150" height="90" rx="6" fill="#0284c7" stroke="#0369a1" stroke-width="2" />
              <rect x="5" y="22" width="20" height="22" fill="#cbd5e1" rx="2" />
              <rect x="5" y="66" width="22" height="25" fill="#1e293b" rx="2" />
              <rect x="65" y="52" width="65" height="20" fill="#1e293b" stroke="#475569" rx="2" />
              <text x="97" y="66" fill="#fff" font-size="8" text-anchor="middle" font-family="monospace">ATmega328P</text>
              <rect x="60" y="14" width="95" height="8" fill="#1e293b" />
              <text x="107" y="20" fill="#38bdf8" font-size="6" text-anchor="middle">DIGITAL (D0 - D13)</text>
              <rect x="60" y="92" width="95" height="8" fill="#1e293b" />
              <text x="107" y="98" fill="#4ade80" font-size="6" text-anchor="middle">POWER &amp; ANALOG (A0-A5)</text>
            </svg>
          </div>

          <div class="hw-chip-diagram-box">
            <div class="hw-chip-body" style="width: 130px; height: 50px;">
              <span style="font-size: 11px; text-align: center;">ATmega328P @ 16M<br><small style="color:#4ade80; font-size:9.5px;">D0-7:PORTD · D8-13:PORTB</small></span>
            </div>
          </div>
        </div>
      `;
    }

    return "";
  },

  setLiveSegDigit: function(digit) {
    this.activeSegDigit = digit;
    const item = COMPONENT_CHEATSHEETS.seg7.rows.find(r => r.num === digit);
    if (!item) return;

    const allSegs = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    allSegs.forEach(s => {
      const el = document.getElementById("hw-seg-" + s);
      if (el) {
        if (item.segs.includes(s)) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    });

    // Update active row highlight in table
    document.querySelectorAll(".hw-seg-row").forEach(r => {
      r.classList.toggle("selected-row", r.dataset.digit === digit);
    });
  },

  renderCheatsheet: function(compKey, containerEl) {
    if (!containerEl) return;
    const data = COMPONENT_CHEATSHEETS[compKey] || COMPONENT_CHEATSHEETS['seg7'];

    let tableHtml = "";
    if (data.visualType === 'seg7') {
      tableHtml = `
        <div class="hw-table-scroll">
          <table class="hw-lookup-table">
            <thead>
              <tr>
                ${data.headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.rows.map(r => `
                <tr class="hw-seg-row ${r.num === this.activeSegDigit ? 'selected-row' : ''}" data-digit="${r.num}" onclick="STUDIO_CHEATSHEET_RENDERER.setLiveSegDigit('${r.num}')" title="คลิกเพื่อพรีวิวเลข ${r.num} บนหน้าจอ 7-Segment ด้านบน">
                  <td class="col-num">${r.num}</td>
                  <td class="col-bin">${r.bin}</td>
                  <td class="col-hex cc">${r.cc}</td>
                  <td class="col-hex ca">${r.ca}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      tableHtml = `
        <div class="hw-table-scroll">
          <table class="hw-lookup-table generic">
            <thead>
              <tr>
                ${data.headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.rows.map(r => `
                <tr>
                  ${r.col1 !== undefined ? `<td class="col-hi">${r.col1}</td>` : ''}
                  ${r.col2 !== undefined ? `<td>${r.col2}</td>` : ''}
                  ${r.col3 !== undefined ? `<td>${r.col3}</td>` : ''}
                  ${r.col4 !== undefined ? `<td>${r.col4}</td>` : ''}
                  ${r.col5 !== undefined ? `<td><code>${r.col5}</code></td>` : ''}
                  ${r.col6 !== undefined ? `<td>${r.col6}</td>` : ''}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    containerEl.innerHTML = `
      <div class="hw-cheatsheet-card">
        <!-- Header -->
        <div class="hw-cheatsheet-header">
          <div class="hw-title-box">
            <h4>${data.name}</h4>
          </div>
          <span class="hw-badge ${data.badgeClass}">${data.badge}</span>
        </div>

        <!-- Top Section: Visual Graphic + Specifications -->
        <div class="hw-top-grid">
          <div class="hw-visual-box">
            ${this.generateVisualSvg(data.visualType)}
          </div>
          <div class="hw-specs-box">
            <table class="hw-specs-table">
              <tbody>
                ${data.specs.map(s => `
                  <tr>
                    <td class="spec-label">${s.label}</td>
                    <td class="spec-val">${s.val}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Bottom Reference Table -->
        <div class="hw-bottom-section">
          <div class="hw-table-header">
            <span>${data.tableTitle}</span>
            ${data.visualType === 'seg7' ? '<span style="font-size: 11px; color: var(--accent); font-weight: normal;">(คลิกที่แถวตัวเลขเพื่อทดสอบการติดดับของเซกเมนต์สด)</span>' : ''}
          </div>
          ${tableHtml}
        </div>

        <!-- Warning Bullet Points -->
        <div class="hw-warnings-box">
          ${data.warnings.map(w => `
            <div class="hw-warning-line">
              <span class="hw-warn-bullet">•</span>
              <span>${w}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Trigger initial visual refresh if 7-seg
    if (data.visualType === 'seg7') {
      this.setLiveSegDigit(this.activeSegDigit);
    }
  }
};
