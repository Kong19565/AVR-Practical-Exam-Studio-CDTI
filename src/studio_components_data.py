# Component metadata and pinout dictionary
COMPONENTS_DATA_JS = """
const COMPONENTS_DATA = {
  arduino: {
    id: "arduino",
    name: "Arduino Uno R3",
    sub: "บอร์ดประมวลผลหลัก (ATmega328P DIP-28, 16 MHz)",
    desc: "หัวใจหลักของระบบ ทำหน้าที่รันโปรแกรม รับอินพุตจากสวิตช์/เซนเซอร์ และส่งสัญญาณขับอุปกรณ์แสดงผล",
    pins: [
      { id: "5v", name: "5V Power", role: "แหล่งจ่ายไฟหลัก +5V", note: "ต่อเข้าแถบสีแดง (+) ของ Protoboard เพื่อจ่ายไฟให้อุปกรณ์ทุกตัว" },
      { id: "gnd1", name: "GND (กราวด์)", role: "กราวด์ระบบ 0V", note: "ต่อเข้าแถบสีน้ำเงิน (-) ของ Protoboard เป็นกราวด์ร่วม (Common GND)" },
      { id: "d2", name: "Digital Pin 2", role: "GPIO / External INT0", note: "มักใช้เป็นสวิตช์ปุ่มกด หรือขาควบคุม 7-Segment ขา a / LCD Data D7" },
      { id: "d3", name: "Digital Pin 3", role: "GPIO / PWM / INT1", note: "รองรับ PWM 8 บิตจาก Timer 2 / ควบคุมสปีดหรือสลับขั้ว" },
      { id: "d4", name: "Digital Pin 4", role: "GPIO", note: "มักใช้ต่อสวิตช์ปุ่มกด หรือขา 7-Segment / LCD" },
      { id: "d5", name: "Digital Pin 5", role: "GPIO / PWM", note: "รองรับ PWM จาก Timer 0 / ใช้เป็นขาข้อมูล LCD D4" },
      { id: "d6", name: "Digital Pin 6", role: "GPIO / PWM", note: "รองรับ PWM จาก Timer 0" },
      { id: "d7", name: "Digital Pin 7", role: "GPIO", note: "ขา Digital I/O ทั่วไป" },
      { id: "d8", name: "Digital Pin 8", role: "GPIO", note: "ขา Digital I/O (Port B บิต 0)" },
      { id: "d9", name: "Digital Pin 9", role: "GPIO / PWM (Timer 1)", note: "PWM ความละเอียดสูง 16 บิต เหมาะสำหรับหรี่ไฟ LED จาก ADC" },
      { id: "d10", name: "Digital Pin 10", role: "GPIO / PWM / SS", note: "มักใช้เป็นขา Enable (E) ของจอ LCD 16x2" },
      { id: "d11", name: "Digital Pin 11", role: "GPIO / PWM / MOSI", note: "มักใช้เป็นขา RW ของจอ LCD หรือสวิตช์ปุ่มกด" },
      { id: "d12", name: "Digital Pin 12", role: "GPIO / MISO", note: "มักใช้เป็นขา RS (Register Select) ของจอ LCD 16x2" },
      { id: "d13", name: "Digital Pin 13", role: "GPIO / Built-in LED", note: "ต่อขนานกับ LED บนบอร์ด (SCK)" },
      { id: "a0", name: "Analog Pin A0", role: "ADC Input Channel 0", note: "ต่อเข้าขากลางของ Potentiometer เพื่ออ่านแรงดัน 0.0 - 5.0 V" },
      { id: "a1", name: "Analog Pin A1", role: "ADC Input Channel 1", note: "ขา Analog Input หรือ Digital GPIO (D15)" },
      { id: "a4", name: "Analog A4 (SDA)", role: "ADC 4 / TWI SDA", note: "ใช้ส่งข้อมูลสำหรับบัส I2C (ถ้ามี)" },
      { id: "a5", name: "Analog A5 (SCL)", role: "ADC 5 / TWI SCL", note: "ใช้จ่ายสัญญาณนาฬิกาสำหรับบัส I2C (ถ้ามี)" }
    ]
  },
  led: {
    id: "led",
    name: "หลอดไฟ LED 5 mm",
    sub: "อุปกรณ์เปล่งแสง แสดงสถานะดิจิทัล",
    desc: "หลอดไฟแสดงผล เมื่อต่อกระแสไหลผ่านจาก Anode (+) ไปยัง Cathode (-) หลอดจะสว่างขึ้น",
    pins: [
      { id: "anode", name: "Anode (+)", role: "ขั้วบวก (ขายาวกว่า)", note: "ต่อเข้าขา Digital Pin ของ Arduino (ขับลอจิก HIGH ให้ไฟติด)" },
      { id: "cathode", name: "Cathode (-)", role: "ขั้วลบ (ขาสั้นกว่า / ขอบบากเรียบ)", note: "ต่อผ่านตัวต้านทาน 470 โอห์ม ลงกราวด์ (GND)" }
    ]
  },
  seg7: {
    id: "seg7",
    name: "7-Segment 1 หลัก (Common Cathode)",
    sub: "ขนาด 0.56 นิ้ว (ต่อคร่อมร่องกลาง Protoboard)",
    desc: "หลอด LED จัดเรียง 7 ส่วนเป็นรูปเลข 8 ขั้วลบภายในเชื่อมต่อถึงกัน (Common Cathode) ป้อนไฟลอจิก HIGH ให้ส่วนใด ส่วนนั้นจะสว่าง",
    pins: [
      { id: "a", name: "Pin a (Top bar)", role: "เซกเมนต์ a (เส้นบนสุด)", note: "ต่อผ่าน R 470 โอห์ม เข้าขา Arduino D2" },
      { id: "b", name: "Pin b (Top Right)", role: "เซกเมนต์ b (ขวาบน)", note: "ต่อผ่าน R 470 โอห์ม เข้าขา Arduino D3" },
      { id: "c", name: "Pin c (Bottom Right)", role: "เซกเมนต์ c (ขวาล่าง)", note: "ต่อผ่าน R 470 โอห์ม เข้าขา Arduino D4" },
      { id: "d", name: "Pin d (Bottom bar)", role: "เซกเมนต์ d (เส้นล่างสุด)", note: "ต่อผ่าน R 470 โอห์ม เข้าขา Arduino D5" },
      { id: "e", name: "Pin e (Bottom Left)", role: "เซกเมนต์ e (ซ้ายล่าง)", note: "ต่อผ่าน R 470 โอห์ม เข้าขา Arduino D6" },
      { id: "f", name: "Pin f (Top Left)", role: "เซกเมนต์ f (ซ้ายบน)", note: "ต่อผ่าน R 470 โอห์ม เข้าขา Arduino D7" },
      { id: "g", name: "Pin g (Middle bar)", role: "เซกเมนต์ g (เส้นกลาง)", note: "ต่อผ่าน R 470 โอห์ม เข้าขา Arduino D8" },
      { id: "dp", name: "Pin dp (Decimal Point)", role: "จุดทศนิยม", note: "ต่อผ่าน R 470 โอห์ม เข้าขา Arduino D9 (ถ้าต้องการใช้)" },
      { id: "com1", name: "Common Cathode (Pin 3)", role: "ขั้วลบรวมหลักบน", note: "ต่อตรงลงกราวด์ (GND)" },
      { id: "com2", name: "Common Cathode (Pin 8)", role: "ขั้วลบรวมหลักล่าง", note: "ต่อตรงลงกราวด์ (GND) (เลือกต่อขาใดขาหนึ่งได้)" }
    ]
  },
  lcd: {
    id: "lcd",
    name: "จอ LCD 16x2 (Parallel 4-bit)",
    sub: "โมดูลแสดงผลตัวอักษร 2 แถว 16 ตัวอักษร (ต่อตรง 16 ขา)",
    desc: "จอแสดงผลผลึกเหลว ทำงานในโหมด Parallel 4-bit ตามแบบฝึกหัด Lab 6 ใช้สายควบคุมและสายข้อมูลรวม 6 ขาหลัก",
    pins: [
      { id: "1", name: "ขา 1 (VSS)", role: "กราวด์ของวงจรดิจิทัล", note: "ต่อลงกราวด์ (GND)" },
      { id: "2", name: "ขา 2 (VDD)", role: "ไฟเลี้ยงวงจร +5V", note: "ต่อเข้าไฟเลี้ยง +5V" },
      { id: "3", name: "ขา 3 (V0)", role: "ปรับความเข้ม Contrast", note: "ต่อเข้าขากลางของ Potentiometer (หากจอขึ้นแถบดำ ให้หมุนปรับตัวนี้)" },
      { id: "4", name: "ขา 4 (RS)", role: "Register Select (0=คำสั่ง, 1=ข้อมูล)", note: "ต่อเข้าขา Arduino D12 (หรือ PB4)" },
      { id: "5", name: "ขา 5 (RW)", role: "Read/Write Select", note: "ต่อลงกราวด์ (GND) ถาวรเพื่อให้อยู่ในโหมดเขียนข้อมูล (Write Only)" },
      { id: "6", name: "ขา 6 (E)", role: "Enable Strobe", note: "ต่อเข้าขา Arduino D11 (หรือ PB2) ส่งพัลส์ขอบขาลงเพื่อล็อกข้อมูล" },
      { id: "7_10", name: "ขา 7-10 (D0-D3)", role: "บิตข้อมูลล่าง (ไม่ได้ใช้ในโหมด 4-bit)", note: "ปล่อยว่างไว้ (NC: Not Connected)" },
      { id: "11", name: "ขา 11 (D4)", role: "Data Bit 4", note: "ต่อเข้าขา Arduino D5 (หรือ PD2)" },
      { id: "12", name: "ขา 12 (D5)", role: "Data Bit 5", note: "ต่อเข้าขา Arduino D4 (หรือ PD3)" },
      { id: "13", name: "ขา 13 (D6)", role: "Data Bit 6", note: "ต่อเข้าขา Arduino D3 (หรือ PD4)" },
      { id: "14", name: "ขา 14 (D7)", role: "Data Bit 7 (Busy Flag)", note: "ต่อเข้าขา Arduino D2 (หรือ PD5)" },
      { id: "15", name: "ขา 15 (A / BLA)", role: "ไฟแบล็กไลต์ขั้วบวก (+)", note: "ต่อผ่านตัวต้านทาน 470 โอห์ม เข้าไฟ 5V" },
      { id: "16", name: "ขา 16 (K / BLK)", role: "ไฟแบล็กไลต์ขั้วลบ (-)", note: "ต่อลงกราวด์ (GND)" }
    ]
  },
  pot: {
    id: "pot",
    name: "ตัวต้านทานปรับค่าได้ (Potentiometer)",
    sub: "ค่า 1kΩ หรือ 10kΩ แบบหมุน 3 ขา",
    desc: "ทำหน้าที่เป็นตัวแบ่งแรงดัน (Voltage Divider) สำหรับปรับความเข้มจอ LCD หรือป้อนแรงดันแอนะล็อก 0-5V เข้าขา ADC",
    pins: [
      { id: "1", name: "ขาริม 1 (Terminal A)", role: "ขั้วต่อแรงดันไฟบวก", note: "ต่อเข้าไฟเลี้ยง +5V" },
      { id: "2", name: "ขากลาง 2 (Wiper)", role: "ขาแรงดันเอาต์พุตปรับค่าได้", note: "ต่อเข้าขา A0 ของ Arduino หรือต่อเข้าขา 3 (V0) ของจอ LCD" },
      { id: "3", name: "ขาริม 3 (Terminal B)", role: "ขั้วต่อกราวด์", note: "ต่อลงกราวด์ (GND)" }
    ]
  },
  btn: {
    id: "btn",
    name: "สวิตช์ปุ่มกด Tactile (4 ขา)",
    sub: "ขนาด 6x6 mm เสียบพอดีกับ Breadboard",
    desc: "ปุ่มกดขนาดเล็ก มี 4 ขาเชื่อมต่อเป็นคู่ เมื่อกดปุ่ม ขาฝั่งซ้ายจะถูกเชื่อมเข้ากับขาฝั่งขวา",
    pins: [
      { id: "1_2", name: "คู่ขาด้านบน (Pins 1 & 2)", role: "ฝั่งสัญญาณอินพุต (ฝั่ง A)", note: "ต่อเข้าขา Digital Pin ของ Arduino (ตั้งโหมด INPUT_PULLUP)" },
      { id: "3_4", name: "คู่ขาด้านล่าง (Pins 3 & 4)", role: "ฝั่งกราวด์ (ฝั่ง B)", note: "ต่อลงกราวด์ (GND) ตรงๆ เมื่อกดปุ่มจะดึงสัญญาณเป็น LOW" }
    ]
  },
  res: {
    id: "res",
    name: "ตัวต้านทานค่าคงที่ (Resistor)",
    sub: "ค่า 470 Ω (เหลือง-ม่วง-น้ำตาล) และ 1 kΩ (น้ำตาล-ดำ-แดง)",
    desc: "จำกัดกระแสไฟฟ้าไม่ให้หลอดไฟ LED หรือจอ LCD เสียหาย และใช้เป็นตัวต้านทาน Pull-up/Pull-down",
    pins: [
      { id: "leg1", name: "ขาที่ 1", role: "ขั้วเชื่อมต่อ (ไม่มีขั้ว)", note: "ต่อเข้ากับขาอุปกรณ์ เช่น ขั้วลบ LED หรือขาไฟเลี้ยงจอ" },
      { id: "leg2", name: "ขาที่ 2", role: "ขั้วเชื่อมต่อ (ไม่มีขั้ว)", note: "ต่อลงกราวด์ (GND) หรือต่อเข้ากับไฟ 5V" }
    ]
  },
  proto: {
    id: "proto",
    name: "บอร์ดทดลอง (Protoboard / Breadboard)",
    sub: "แผงเสียบวงจรแบบไม่ต้องบัดกรี",
    desc: "มีรางไฟยาวด้านบน-ล่างสำหรับต่อ 5V (+) และ GND (-) และมีรูเสียบตรงกลางแยกซ้าย-ขวาด้วยร่องตรงกลาง",
    pins: [
      { id: "red_rail", name: "แถบสีแดง (+)", role: "รางจ่ายไฟบวก (+5V)", note: "เชื่อมสายจากขา 5V ของ Arduino เข้ามาที่รางนี้" },
      { id: "blue_rail", name: "แถบสีน้ำเงิน (-)", role: "รางจ่ายไฟกราวด์ (GND)", note: "เชื่อมสายจากขา GND ของ Arduino เข้ามาที่รางนี้" },
      { id: "center_trough", name: "ร่องผ่าตรงกลาง", role: "ฉนวนกั้นแยกขา", note: "วาง 7-Segment หรือ IC ให้คร่อมร่องนี้เพื่อไม่ให้ขาตรงข้ามช็อตกัน" }
    ]
  }
};
"""
print("studio_components_data.py written.")
