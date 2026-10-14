// ==========================================
// Dynamic SVG Flowchart Generator for All 80 Labs (Zero-Overflow & Auto-Wrapping)
// ==========================================

const LAB_FLOWCHARTS = {
  "tier1_button_hold_1sw_1led": {
    "title": "T1.01: Push Button ควบคุม LED (Hold-to-Activate & Toggle)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= (1 << PB0) [LED Output], DDRD &= ~(1 << PD2) [SW1 Input]"
      },
      {
        "type": "process",
        "text": "เปิด Internal Pull-Up: PORTD |= (1 << PD2)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบปุ่ม SW1 ถูกกด? (!(PIND & (1 << PD2)))"
      },
      {
        "type": "process",
        "text": "ปุ่มถูกกด (Active-Low): เปิดไฟ LED -> PORTB |= (1 << PB0)"
      },
      {
        "type": "process",
        "text": "ปล่อยปุ่ม (Pull-Up HIGH): ดับไฟ LED -> PORTB &= ~(1 << PB0)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปอ่านค่าสถานะปุ่มกด"
      }
    ]
  },
  "tier1_button_hold_2sw_2led": {
    "title": "T1.02: Dual Button Hold-to-Light (2 Switches, 2 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB: ขา PB0, PB1 เป็น OUTPUT, DDRD: ขา PD2, PD3 เป็น INPUT"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-Up บนขา PD2 และ PD3"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "สวิตช์ SW1 ถูกกด? (!(PIND & (1 << PD2)))"
      },
      {
        "type": "process",
        "text": "จริง: สั่งเปิด LED1 (PB0=1) / เท็จ: สั่งดับ LED1 (PB0=0)"
      },
      {
        "type": "decision",
        "text": "สวิตช์ SW2 ถูกกด? (!(PIND & (1 << PD3)))"
      },
      {
        "type": "process",
        "text": "จริง: สั่งเปิด LED2 (PB1=1) / เท็จ: สั่งดับ LED2 (PB1=0)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบสวิตช์ทั้งสองตัว"
      }
    ]
  },
  "tier1_button_hold_4sw_4led": {
    "title": "T1.03: Quad Button Hold-to-Light (4 Switches, 4 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= 0x0F (PB0-PB3 Output), DDRD &= ~0x3C (PD2-PD5 Input)"
      },
      {
        "type": "process",
        "text": "เปิด Internal Pull-Up บนขา PD2-PD5: PORTD |= 0x3C"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าพอร์ตอินพุต PIND และกลับค่าลอจิก (~PIND & 0x3C)"
      },
      {
        "type": "process",
        "text": "เลื่อนบิตแมปปิ้งตรงเข้าสู่ LED: PORTB = ((~PIND >> 2) & 0x0F)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตสถานะหลอดไฟ LED 4 ช่อง"
      }
    ]
  },
  "tier1_button_toggle_1sw_1led": {
    "title": "T1.04: Single Button Toggle Mode with Software Debounce",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า PB0 เป็น Output, PD2 เป็น Input Pull-Up, led_state = 0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจพบขอบขาลง (Falling Edge: ปล่อย 1 เป็น กด 0)?"
      },
      {
        "type": "process",
        "text": "หน่วงเวลา 20 ms ขจัดสัญญาณกระดอน (Software Debounce)"
      },
      {
        "type": "decision",
        "text": "ยืนยันปุ่มยังคงถูกกดอยู่จริง? (!(PIND & (1 << PD2)))"
      },
      {
        "type": "process",
        "text": "สลับสถานะ: led_state ^= 1 และอัปเดตออกพอร์ต PB0"
      },
      {
        "type": "loop_back",
        "text": "บันทึกสถานะปุ่มรอบปัจจุบัน แล้ววนลูปรอบถัดไป"
      }
    ]
  },
  "tier1_button_toggle_2sw_2led": {
    "title": "T1.05: Dual Button Independent Toggle (2 Switches, 2 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า Output LED1, LED2 และ Input Pull-Up SW1, SW2"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "ปุ่ม SW1 มีขอบขาลง? (Debounce 20ms)"
      },
      {
        "type": "process",
        "text": "สลับสถานะหลอด LED1: led1_state ^= 1"
      },
      {
        "type": "decision",
        "text": "ปุ่ม SW2 มีขอบขาลง? (Debounce 20ms)"
      },
      {
        "type": "process",
        "text": "สลับสถานะหลอด LED2: led2_state ^= 1"
      },
      {
        "type": "loop_back",
        "text": "ส่งค่า led1_state, led2_state ออกพอร์ต แล้ววนรอบ"
      }
    ]
  },
  "tier1_button_toggle_4sw_4led": {
    "title": "T1.06: Quad Button Independent Toggle (4 Switches, 4 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนด PB0-PB3 Output, PD2-PD5 Input Pull-Up, states[4] = {0}"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนลูป i = 0 ถึง 3 ตรวจสอบสถานะปุ่มกดทั้ง 4 ตัว"
      },
      {
        "type": "decision",
        "text": "ปุ่มที่ i ตรวจพบขอบขาลง (กดลง)?"
      },
      {
        "type": "process",
        "text": "สลับสถานะ: states[i] ^= 1 (ดีบาวน์ 15ms) และอัปเดต LED"
      },
      {
        "type": "process",
        "text": "ส่งค่า states ทั้ง 4 บิตออกสู่พอร์ต PORTB"
      },
      {
        "type": "loop_back",
        "text": "วนลูปสแกนปุ่มกดรอบถัดไป"
      }
    ]
  },
  "tier1_staircase_light_2sw_1led": {
    "title": "T1.07: Two-Way Staircase Switch with XOR Logic",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= (1 << PB0) [LED], DDRD &= ~(PD2 | PD3) [SW1, SW2 Input]"
      },
      {
        "type": "process",
        "text": "เปิด Internal Pull-Up บนขา PD2 และ PD3, กำหนด sw1_s=0, sw2_s=0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "สวิตช์ SW1 หรือ SW2 ตัวใดตัวหนึ่งถูกกด (Falling Edge)?"
      },
      {
        "type": "process",
        "text": "ดีบาวน์ 20ms และสลับสถานะสวิตช์ตัวนั้น (sw1_s ^= 1 หรือ sw2_s ^= 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบเงื่อนไข XOR: (sw1_s ^ sw2_s) == 1?"
      },
      {
        "type": "process",
        "text": "จริง: สั่งเปิดไฟบันได -> PORTB |= (1 << PB0)"
      },
      {
        "type": "process",
        "text": "เท็จ: สั่งดับไฟบันได -> PORTB &= ~(1 << PB0)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปรอรับการกดสวิตช์บันได"
      }
    ]
  },
  "tier1_radio_selector_3sw_3led": {
    "title": "T1.08: Radio Button Mutual Exclusion Selector (3 SW, 3 LED)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนด PB0-PB2 เป็น Output LED, PD2-PD4 เป็น Input Pull-Up"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW1 (โหมด 1)?"
      },
      {
        "type": "process",
        "text": "เปิด LED1 ดวงเดียว และดับ LED2, LED3 (PORTB = 0b001)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW2 (โหมด 2)?"
      },
      {
        "type": "process",
        "text": "เปิด LED2 ดวงเดียว และดับ LED1, LED3 (PORTB = 0b010)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW3 (โหมด 3)?"
      },
      {
        "type": "process",
        "text": "เปิด LED3 ดวงเดียว และดับ LED1, LED2 (PORTB = 0b100)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปคอยสแกนการเลือกช่องโหมด"
      }
    ]
  },
  "tier1_multi_switch_quantity_led": {
    "title": "T1.09: Multi-Switch Quantity Indicator (นับจำนวนปุ่มที่กดติด LED ตามจำนวน)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า LED 4 ดวงเป็น Output, สวิตช์ 4 ตัวเป็น Input Pull-Up"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "วนลูปนับจำนวนปุ่มที่ถูกกด: pressed_count = 0 ถึง 4"
      },
      {
        "type": "process",
        "text": "สร้างบิตแพทเทิร์นบาร์กราฟ: mask = (1 << pressed_count) - 1"
      },
      {
        "type": "process",
        "text": "ขับเอาต์พุตออก PORTB ตามจำนวนปุ่มที่กดพร้อมกัน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอ่านจำนวนปุ่มกดต่อเนื่อง"
      }
    ]
  },
  "tier1_multi_switch_or_alarm_led": {
    "title": "T1.10: Multi-Switch OR Logic Emergency Alarm System",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า PB0 ขับไซเรน/LED Alarm, PD2-PD5 รับสัญญาณเซนเซอร์ฉุกเฉิน"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีเซนเซอร์ตัวใดตัวหนึ่งตรวจพบเหตุ (OR Logic: ค่าบิตเป็น 0)?"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณเตือนภัยทันที: PORTB |= (1 << PB0) [Alarm ON]"
      },
      {
        "type": "process",
        "text": "ทุกเซนเซอร์อยู่ในสภาวะปกติ: ดับสัญญาณเตือนภัย [Alarm OFF]"
      },
      {
        "type": "loop_back",
        "text": "วนลูปตรวจสอบระบบความปลอดภัย"
      }
    ]
  },
  "tier1_industrial_start_stop_dual_led": {
    "title": "T1.11: Industrial Start-Stop Motor Latch Circuit",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "Output: PB0 (ไฟเขียว RUN), PB1 (ไฟแดง STOP) / Input: SW1(Start), SW2(Stop)"
      },
      {
        "type": "process",
        "text": "สถานะเริ่มต้น: run_state = 0 (ไฟแดง STOP สว่าง, ไฟเขียว ดับ)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW2 (STOP) หรือกดค้าง?"
      },
      {
        "type": "process",
        "text": "Priority สูงสุด: สั่งรีเซ็ต run_state = 0 (ดับมอเตอร์ทันที)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW1 (START) และไม่ได้กดปุ่ม STOP?"
      },
      {
        "type": "process",
        "text": "สั่ง Latch ทำงาน: เซ็ต run_state = 1 (สตาร์ทมอเตอร์)"
      },
      {
        "type": "process",
        "text": "อัปเดตไฟสถานะตาม run_state (เขียว RUN หรือ แดง STOP)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปควบคุมมอเตอร์อุตสาหกรรม"
      }
    ]
  },
  "tier1_industrial_start_stop_jog_3sw": {
    "title": "T1.12: Industrial Start-Stop with Momentary Jog Function",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนด PB0 (Motor Relay), Input: SW1(Start), SW2(Stop), SW3(Jog)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW2 (Emergency Stop)?"
      },
      {
        "type": "process",
        "text": "ตัดการทำงานทันที: motor_run = 0, PORTB &= ~(1 << PB0)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW3 (JOG - หมุนชั่วขณะ) ค้างไว้?"
      },
      {
        "type": "process",
        "text": "ขับมอเตอร์เฉพาะช่วงที่กดค้าง ปล่อยปุ่มแล้วมอเตอร์หยุดทันที"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW1 (START Latch)?"
      },
      {
        "type": "process",
        "text": "ล็อกการทำงานต่อเนื่อง: motor_run = 1"
      },
      {
        "type": "loop_back",
        "text": "วนลูปตรวจสอบคำสั่งควบคุมมอเตอร์"
      }
    ]
  },
  "tier1_safety_interlock_dual_hand": {
    "title": "T1.13: Dual-Hand Safety Interlock Press Controller",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนด PB0 ขับกระบอกสูบเพรส (Pneumatic Press), PD2, PD3 เป็นเซนเซอร์สองมือ"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่มทั้งสองมือพร้อมกันภายในช่วงเวลาความปลอดภัย (Window < 500ms)?"
      },
      {
        "type": "process",
        "text": "ปลอดภัย: สั่งกระบอกสูบเลื่อนลงอัดชิ้นงาน (PORTB |= (1 << PB0))"
      },
      {
        "type": "process",
        "text": "ปล่อยมือข้างใดข้างหนึ่ง: หยุดการทำงานทันที (Safety Release)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปป้องกันอุบัติเหตุในโรงงาน"
      }
    ]
  },
  "tier1_binary_counter_4bit_led": {
    "title": "T1.14: 4-Bit Binary Counter on LEDs with Step Button",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= 0x0F (PB0-PB3 Output), Input SW1(Count), counter = 0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW1 ตรวจพบ Falling Edge?"
      },
      {
        "type": "process",
        "text": "ดีบาวน์ 20ms และเพิ่มค่า: counter = (counter + 1) % 16"
      },
      {
        "type": "process",
        "text": "ส่งค่าเลขฐานสองออกทาง LED 4 บิต: PORTB = (PORTB & 0xF0) | counter"
      },
      {
        "type": "loop_back",
        "text": "วนลูปรอรับการกดนับสเต็ปถัดไป"
      }
    ]
  },
  "tier1_button_short_long_press_led": {
    "title": "T1.15: Button Short-Press vs Long-Press Action Classifier",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "Output: PB0 (LED1 Short), PB1 (LED2 Long) / Input: PD2 (Button Pull-Up)"
      },
      {
        "type": "decision",
        "text": "ตรวจพบปุ่มถูกกดลง (Active-Low)?"
      },
      {
        "type": "process",
        "text": "เริ่มจับเวลาการกดค้าง (t_start = millis, loop count)"
      },
      {
        "type": "decision",
        "text": "เมื่อปล่อยปุ่ม: ระยะเวลากดค้าง >= 1000 ms?"
      },
      {
        "type": "process",
        "text": "Long-Press: สลับสถานะหลอดไฟยาว LED2 (PB1 ^= 1)"
      },
      {
        "type": "process",
        "text": "Short-Press (< 1000 ms): สลับสถานะหลอดไฟสั้น LED1 (PB0 ^= 1)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปพร้อมจำแนกประเภทการกดรอบใหม่"
      }
    ]
  },
  "tier1_led_bar_level_stepper": {
    "title": "T1.16: LED Bar Graph Stepper (Up/Down Dual Button)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= 0x3F (LED1-LED6 Output), SW_UP(PD2), SW_DOWN(PD3)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม UP และ level < 6?"
      },
      {
        "type": "process",
        "text": "เพิ่มระดับ: level++"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม DOWN และ level > 0?"
      },
      {
        "type": "process",
        "text": "ลดระดับ: level--"
      },
      {
        "type": "process",
        "text": "คำนวณบิตมาสก์: PORTB = (1 << level) - 1"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตแถบระดับไฟ LED"
      }
    ]
  },
  "tier1_alternating_blinker_hazard_strobe": {
    "title": "T1.17: Alternating Hazard Strobe Blinker",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนด PB0 (LED ฝั่งซ้าย), PB1 (LED ฝั่งขวา), SW1 (เปิด/ปิดไฟฉุกเฉิน)"
      },
      {
        "type": "decision",
        "text": "สวิตช์ไฟฉุกเฉินถูกเปิด (Hazard Active)?"
      },
      {
        "type": "process",
        "text": "เปิด LED ซ้าย 300ms, ดับ LED ขวา"
      },
      {
        "type": "process",
        "text": "เปิด LED ขวา 300ms, ดับ LED ซ้าย"
      },
      {
        "type": "process",
        "text": "สลับการกะพริบซ้าย-ขวาแบบไฟไซเรนฉุกเฉินต่อเนื่อง"
      },
      {
        "type": "loop_back",
        "text": "วนลูปตรวจสอบคำสั่งเปิด/ปิดไฟฉุกเฉิน"
      }
    ]
  },
  "tier1_button_dual_and_logic_1led": {
    "title": "T1.18: Button Dual AND Logic (กดพร้อมกัน 2 ปุ่มเพื่อเปิด LED)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= (1 << PB0) [LED Output], DDRD &= ~(PD2 | PD3) [SW1, SW2 Input]"
      },
      {
        "type": "process",
        "text": "เปิด Internal Pull-Up บนขา PD2 และ PD3"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดทั้ง SW1 และ SW2? (!(PIND & PD2) && !(PIND & PD3))"
      },
      {
        "type": "process",
        "text": "ลอจิก AND จริง (กดคู่): PORTB |= (1 << PB0) [LED ติด]"
      },
      {
        "type": "process",
        "text": "ลอจิกเป็นเท็จ (ปล่อยปุ่มใดปุ่มหนึ่ง): PORTB &= ~(1 << PB0) [LED ดับ]"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบสถานะปุ่มกด"
      }
    ]
  },
  "tier1_button_active_high_external_pd": {
    "title": "T1.19: Button Active-High (วงจรพูลดาวน์ภายนอก External Pull-Down)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRD &= ~(1 << PD2) [Input ไม่เปิด Pull-Up], DDRB |= (1 << PB0) [LED]"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "สัญญาณอินพุตขา PD2 เป็น HIGH (5V)? (PIND & (1 << PD2))"
      },
      {
        "type": "process",
        "text": "กดปุ่ม (Active-High): ส่งลอจิก 1 ขับ LED ติด -> PORTB |= (1 << PB0)"
      },
      {
        "type": "process",
        "text": "ปล่อยปุ่ม (ดึงลง GND ผ่านตัวต้านทาน 10k): LED ดับ -> PORTB &= ~(1 << PB0)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอ่านระดับแรงดันลอจิก"
      }
    ]
  },
  "tier1_button_press_accumulator_blink_n": {
    "title": "T1.20: Button Press Accumulator (นับสะสมจำนวนครั้งที่กดเพื่อสั่งกะพริบ N ครั้ง)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า I/O, SW1 (ปุ่มนับ), SW2 (ปุ่มยืนยัน), ตัวแปรนับ count = 0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW1 นับสะสม (Falling Edge)?"
      },
      {
        "type": "process",
        "text": "เพิ่มตัวแปรสะสม: count++"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW2 ยืนยันการทำงาน?"
      },
      {
        "type": "process",
        "text": "วนลูปกะพริบไฟ LED ตามจำนวนรอบ count ครั้ง แล้วเคลียร์ count = 0"
      },
      {
        "type": "loop_back",
        "text": "วนลูปพร้อมรับรอบการนับใหม่"
      }
    ]
  },
  "tier2_led_knight_rider_pingpong": {
    "title": "T2.01: Knight Rider / Ping-Pong 6-LED Scanner",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= 0x3F (PB0-PB5 Output), pos = 0, dir = 1 (วิ่งไปข้างหน้า)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "เปิด LED ตำแหน่ง pos ดวงเดียว: PORTB = (1 << pos)"
      },
      {
        "type": "process",
        "text": "หน่วงเวลาความเร็วสแกน _delay_ms(80)"
      },
      {
        "type": "decision",
        "text": "pos ชนขอบขวา (pos == 5)?"
      },
      {
        "type": "process",
        "text": "กลับทิศทางการวิ่ง: dir = -1 (วิ่งย้อนกลับ)"
      },
      {
        "type": "decision",
        "text": "pos ชนขอบซ้าย (pos == 0)?"
      },
      {
        "type": "process",
        "text": "กลับทิศทางการวิ่ง: dir = 1 (วิ่งไปข้างหน้า)"
      },
      {
        "type": "process",
        "text": "คำนวณตำแหน่งใหม่: pos += dir"
      },
      {
        "type": "loop_back",
        "text": "วนลูปเลื่อนสเต็ปไฟวิ่ง Ping-Pong"
      }
    ]
  },
  "tier2_led_curtain_expand_contract": {
    "title": "T2.02: LED Curtain Expand and Contract Pattern",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า LED 6 ดวง (PB0-PB5 Output), ลำดับแพทเทิร์นคู่สมมาตร"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "เฟส Expand (ขยายออก): เปิดคู่กลาง (LED 3,4) -> คู่ถัดไป (2,5) -> คู่นอก (1,6)"
      },
      {
        "type": "process",
        "text": "เฟส Contract (หุบเข้า): เปิดคู่นอก (1,6) -> คู่ถัดไป (2,5) -> คู่กลาง (3,4)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปสร้างม่านไฟวิ่งอย่างต่อเนื่อง"
      }
    ]
  },
  "tier2_led_stacker_fill_drain": {
    "title": "T2.03: LED Stacker Fill and Drain Pattern",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= 0x3F, stacked_mask = 0, top_limit = 5"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "ยิง LED วิ่งจากตำแหน่ง 0 พุ่งไปกองสะสมที่ top_limit"
      },
      {
        "type": "process",
        "text": "อัปเดต stacked_mask |= (1 << top_limit) และลด top_limit--"
      },
      {
        "type": "decision",
        "text": "ไฟซ้อนเต็มแถว (top_limit < 0)?"
      },
      {
        "type": "process",
        "text": "เข้าสู่โหมด Drain: ค่อยๆ ดับไฟทีละดวงจนหมดแถว แล้วรีเซ็ตใหม่"
      },
      {
        "type": "loop_back",
        "text": "วนลูปซ้อนกองไฟรอบถัดไป"
      }
    ]
  },
  "tier2_led_chaser_6led_2buttons": {
    "title": "T2.04: 6-LED Direction & Speed Controlled Chaser",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= 0x3F, SW_DIR(PD2 สลับทิศ), SW_SPEED(PD3 สลับความเร็ว)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW_DIR?"
      },
      {
        "type": "process",
        "text": "สลับทิศทางไฟวิ่ง (ซ้าย -> ขวา หรือ ขวา -> ซ้าย)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW_SPEED?"
      },
      {
        "type": "process",
        "text": "สลับระดับความเร็วการหน่วงเวลา (50ms, 150ms, 300ms)"
      },
      {
        "type": "process",
        "text": "เลื่อนตำแหน่งไฟวิ่ง 1 สเต็ป และขับออกพอร์ต PORTB"
      },
      {
        "type": "loop_back",
        "text": "วนลูปควบคุมไฟวิ่ง"
      }
    ]
  },
  "tier2_police_strobe_dual_led": {
    "title": "T2.05: Police Emergency Dual Strobe Flasher",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "Output: PB0 (ไฟแดง), PB1 (ไฟน้ำเงิน)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "แฟลชไฟแดงรัว 3 ครั้ง (50ms ON / 50ms OFF)"
      },
      {
        "type": "process",
        "text": "หยุดพักสั้น 100 ms"
      },
      {
        "type": "process",
        "text": "แฟลชไฟน้ำเงินรัว 3 ครั้ง (50ms ON / 50ms OFF)"
      },
      {
        "type": "process",
        "text": "หยุดพักสั้น 100 ms"
      },
      {
        "type": "loop_back",
        "text": "วนลูปไซเรนไฟตำรวจฉุกเฉิน"
      }
    ]
  },
  "tier2_morse_code_sos_beacon": {
    "title": "T2.06: Optical SOS Morse Code Emergency Beacon",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB |= (1 << PB0) [LED Beacon], นิยาม Dot=150ms, Dash=450ms"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "ส่งตัว 'S': กะพริบสั้น Dot 3 ครั้ง (• • •)"
      },
      {
        "type": "process",
        "text": "ส่งตัว 'O': กะพริบยาว Dash 3 ครั้ง (— — —)"
      },
      {
        "type": "process",
        "text": "ส่งตัว 'S': กะพริบสั้น Dot 3 ครั้ง (• • •)"
      },
      {
        "type": "process",
        "text": "เว้นระยะหยุดพักสัญญาณ 2,000 ms ก่อนเริ่มรอบใหม่"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกระจายสัญญาณขอความช่วยเหลือ SOS"
      }
    ]
  },
  "tier2_dual_traffic_intersection_6led": {
    "title": "T2.07: Dual Traffic Intersection 4-Phase FSM",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าไฟจราจร 6 ดวง: ทิศเหนือ-ใต้ (G,Y,R) และ ทิศตะวันออก-ตก (G,Y,R)"
      },
      {
        "type": "decision",
        "text": "State ปัจจุบันของ FSM ไฟจราจร?"
      },
      {
        "type": "process",
        "text": "State 0: ทิศเหนือ-ใต้ เขียว (5s) / ทิศตะวันออก-ตก แดง"
      },
      {
        "type": "process",
        "text": "State 1: ทิศเหนือ-ใต้ เหลือง (2s) / ทิศตะวันออก-ตก แดง"
      },
      {
        "type": "process",
        "text": "State 2: ทิศเหนือ-ใต้ แดง / ทิศตะวันออก-ตก เขียว (5s)"
      },
      {
        "type": "process",
        "text": "State 3: ทิศเหนือ-ใต้ แดง / ทิศตะวันออก-ตก เหลือง (2s)"
      },
      {
        "type": "loop_back",
        "text": "วนรอบเปลี่ยนเฟสไฟสี่แยกอย่างปลอดภัย"
      }
    ]
  },
  "tier2_industrial_fsm_3state_machine": {
    "title": "T2.08: Industrial Machine 3-State FSM (STOP, READY, RUN)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "นิยามสถานะ: STATE_STOP, STATE_READY, STATE_RUN"
      },
      {
        "type": "decision",
        "text": "ตรวจเช็กสถานะปัจจุบันของเครื่องจักร?"
      },
      {
        "type": "process",
        "text": "STOP: ไฟแดงติด นิ่งรอปุ่ม Reset/Ready"
      },
      {
        "type": "process",
        "text": "READY: ไฟเหลืองติด ตรวจสอบอินเตอร์ล็อกความปลอดภัย"
      },
      {
        "type": "process",
        "text": "RUN: ไฟเขียวติด สั่งสตาร์ทมอเตอร์และขับเคลื่อนงาน"
      },
      {
        "type": "decision",
        "text": "เกิดสัญญาณข้อผิดพลาด (Fault/Emergency)?"
      },
      {
        "type": "process",
        "text": "ตัดกลับสู่สถานะ STOP ทันที"
      },
      {
        "type": "loop_back",
        "text": "วนลูปประมวลผล State Machine"
      }
    ]
  },
  "tier2_multiclick_mode_selector": {
    "title": "T2.09: Sequential Multi-Click Single Button Mode Selector",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า PB0-PB3 Output, ปุ่มกดเดี่ยว PD2, mode = 0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจพบการกดปุ่ม (Falling Edge)?"
      },
      {
        "type": "process",
        "text": "ดีบาวน์และเปลี่ยนโหมด: mode = (mode + 1) % 5"
      },
      {
        "type": "decision",
        "text": "ประมวลผลลูปแสดงผลตามค่า mode ปัจจุบัน?"
      },
      {
        "type": "process",
        "text": "Mode 0: ดับหมด, Mode 1: ติดหมด, Mode 2: กะพริบ, Mode 3: ไฟวิ่ง, Mode 4: ไซเรน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปรอรับการกดเปลี่ยนโหมดรอบถัดไป"
      }
    ]
  },
  "tier2_traffic_light_pedestrian": {
    "title": "T2.10: Smart Traffic Light with Pedestrian Countdown",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ไฟรถยนต์ (เขียว/เหลือง/แดง), ไฟคนข้าม (แดง/เขียว), สวิตช์ขอข้ามถนน"
      },
      {
        "type": "decision",
        "text": "สภาวะปกติ (ไฟรถยนต์เขียว): มีการกดปุ่มขอข้ามถนน?"
      },
      {
        "type": "process",
        "text": "เริ่มขั้นตอนเปลี่ยนเฟส: ไฟรถยนต์เปลี่ยนเป็นเหลือง 2 วินาที แล้วเป็นแดง"
      },
      {
        "type": "process",
        "text": "เปิดไฟคนข้ามเขียว พร้อมนับถอยหลัง 9 ถึง 0 บน 7-Segment"
      },
      {
        "type": "process",
        "text": "เมื่อครบเวลา: ไฟคนข้ามกลับเป็นแดง และเปิดไฟรถยนต์เขียวตามเดิม"
      },
      {
        "type": "loop_back",
        "text": "วนลูปควบคุมไฟทางข้ามอัจฉริยะ"
      }
    ]
  },
  "tier3_7segment_auto_counter_blink_dp": {
    "title": "T3.01: Auto 1-Second 0-9 Counter with Blinking DP on 7-Segment",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRD |= 0xFF (ขา a-g, dp ขับ 7-Segment), ตัวแปรนับ count = 0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "ดึงรูปแบบ 7-Segment จากตาราง: PORTD = seg_table[count]"
      },
      {
        "type": "process",
        "text": "สลับสถานะจุดทศนิยม DP (Blinking DP ทุก 500 ms)"
      },
      {
        "type": "process",
        "text": "หน่วงเวลา 1 วินาที และเลื่อนตัวนับ: count = (count + 1) % 10"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลข 0 ถึง 9 อัตโนมัติ"
      }
    ]
  },
  "tier3_7segment_counter_updown": {
    "title": "T3.02: 7-Segment Up/Down Counter with Dual Buttons",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRD ขับ 7-Segment, Input: SW_UP (PD2), SW_DOWN (PD3), count = 0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW_UP?"
      },
      {
        "type": "process",
        "text": "นับเพิ่ม: count = (count + 1) % 10"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW_DOWN?"
      },
      {
        "type": "process",
        "text": "นับลด: count = (count == 0) ? 9 : count - 1"
      },
      {
        "type": "process",
        "text": "อัปเดตเอาต์พุต: PORTD = seg_digits[count]"
      },
      {
        "type": "loop_back",
        "text": "วนลูปรอรับการกดปุ่ม Up/Down"
      }
    ]
  },
  "tier3_7segment_countdown_alarm_led": {
    "title": "T3.03: 7-Segment Countdown Timer with Alarm LED",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดค่าเริ่มต้น: count = 9, PB0 (Alarm LED Output)"
      },
      {
        "type": "decision",
        "text": "วนรอบการนับถอยหลัง? (while 1)"
      },
      {
        "type": "process",
        "text": "แสดงผลตัวเลขปัจจุบัน count บน 7-Segment"
      },
      {
        "type": "decision",
        "text": "ตัวเลขลดถึง 0 (count == 0)?"
      },
      {
        "type": "process",
        "text": "เปิดเสียงเตือนและกะพริบ Alarm LED รัวแจ้งเตือนหมดเวลา"
      },
      {
        "type": "process",
        "text": "หน่วงเวลา 1,000 ms แล้วลดค่า count--"
      },
      {
        "type": "loop_back",
        "text": "วนลูปนับถอยหลังรอบถัดไป"
      }
    ]
  },
  "tier3_7segment_hex_counter_0_to_f": {
    "title": "T3.04: Hexadecimal Counter (0 to F) on 7-Segment",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตารางรหัสฐานสิบหก 16 ค่า: 0, 1, 2... 9, A, b, C, d, E, F"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "ดึงรหัสตัวอักษร: PORTD = hex_table[hex_val]"
      },
      {
        "type": "decision",
        "text": "กดปุ่มก้าวหน้า (Next Step) หรือถึงเวลา 1s?"
      },
      {
        "type": "process",
        "text": "เลื่อนค่าฐาน 16: hex_val = (hex_val + 1) % 16"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลค่า Hex ต่อเนื่อง"
      }
    ]
  },
  "tier3_7segment_modulo_n_counter": {
    "title": "T3.05: Modulo-N Programmable Counter on 7-Segment",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดค่าโมดูโล N (เช่น N = 6 สำหรับนับ 0 ถึง 5)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "แสดงผลตัวเลขปัจจุบันบน 7-Segment"
      },
      {
        "type": "decision",
        "text": "ตรวจพบพัลส์นับ (Clock Pulse)?"
      },
      {
        "type": "process",
        "text": "คำนวณ: val = (val + 1) % N (รีเซ็ตกลับเป็น 0 เมื่อถึง N)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปนับแบบจำกัดช่วง Modulo-N"
      }
    ]
  },
  "tier3_7segment_spinner_ring_cw_ccw": {
    "title": "T3.06: 7-Segment Outer Segment Spinner (CW/CCW Rotation)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ลำดับพินขอบนอก: Seg-a -> Seg-b -> Seg-c -> Seg-d -> Seg-e -> Seg-f"
      },
      {
        "type": "decision",
        "text": "ทิศทางการหมุนตามเข็ม (CW) หรือทวนเข็ม (CCW)?"
      },
      {
        "type": "process",
        "text": "เปิดเซกเมนต์ทีละส่วนตามทิศทางอย่างต่อเนื่อง"
      },
      {
        "type": "process",
        "text": "หน่วงเวลาความเร็วรอบ _delay_ms(60)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปสร้างแอนิเมชันวงล้อหมุนบน 7-Segment"
      }
    ]
  },
  "tier3_7segment_word_letter_display": {
    "title": "T3.07: 7-Segment Character and Word Message Display",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตารางฟอนต์ตัวอักษร: 'H', 'E', 'L', 'P', 'O', 'F', 'F'"
      },
      {
        "type": "decision",
        "text": "วนรอบแสดงข้อความทีละตัวอักษร?"
      },
      {
        "type": "process",
        "text": "แสดงตัวอักษรบนหน้าจอ 7-Segment เป็นเวลา 800 ms"
      },
      {
        "type": "process",
        "text": "ดับหน้าจอสั้น 100 ms เพื่อแยกความต่างระหว่างตัวอักษร"
      },
      {
        "type": "process",
        "text": "เลื่อนพอยน์เตอร์ไปยังตัวอักษรตัวถัดไปในสตริง"
      },
      {
        "type": "loop_back",
        "text": "วนลูปเล่นข้อความซ้ำต่อเนื่อง"
      }
    ]
  },
  "tier3_7segment_digital_roulette_wheel": {
    "title": "T3.08: Digital Roulette Wheel with Exponential Slowdown",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "สภาวะ IDLE: รอการกดปุ่ม Start Spin"
      },
      {
        "type": "decision",
        "text": "กดปุ่มเริ่มหมุนรูเล็ตต์?"
      },
      {
        "type": "process",
        "text": "หมุนตัวเลข 0-9 ด้วยความเร็วสูงสุด (Delay 20ms)"
      },
      {
        "type": "process",
        "text": "ค่อยๆ ชะลอความเร็วแบบ Exponential (เพิ่ม Delay ทีละ 10%)"
      },
      {
        "type": "process",
        "text": "หยุดนิ่งที่ตัวเลขผลลัพธ์สุดท้าย พร้อมกะพริบแสดงรางวัล"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับสู่สถานะพร้อมเริ่มเกมใหม่"
      }
    ]
  },
  "tier3_electronic_dice_7segment": {
    "title": "T3.09: Electronic Dice (1-6 Pseudo-Random Number on 7-Segment)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "สภาวะรอ: วนรอบตัวเลข 1 ถึง 6 ในความเร็วสูงหลักไมโครวินาที"
      },
      {
        "type": "decision",
        "text": "ตรวจพบการกดปุ่มทอยลูกเต๋า (Roll Button)?"
      },
      {
        "type": "process",
        "text": "ทำแอนิเมชันสุ่มตัวเลขวิ่งสลับไปมาอย่างรวดเร็ว"
      },
      {
        "type": "process",
        "text": "จับค่าตัวเลขขณะปล่อยปุ่ม: dice_val = (seed % 6) + 1"
      },
      {
        "type": "process",
        "text": "แสดงแต้มลูกเต๋า 1 ถึง 6 บน 7-Segment อย่างชัดเจน"
      },
      {
        "type": "loop_back",
        "text": "คงการแสดงแต้มไว้จนกว่าจะกดทอยครั้งถัดไป"
      }
    ]
  },
  "tier3_stopwatch_timer1_7segment": {
    "title": "T3.10: Hardware Timer1 CTC 0-9 Second Stopwatch",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า Timer1 CTC Mode: TCCR1B |= (1 << WGM12) | (1 << CS12)"
      },
      {
        "type": "process",
        "text": "กำหนดค่าเปรียบเทียบ OCR1A = 62499 (สร้างอินเทอร์รัปต์แม่นยำทุก 1.000s)"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Interrupt: TIMSK1 |= (1 << OCIE1A), สั่ง sei()"
      },
      {
        "type": "decision",
        "text": "เกิดสัญญาณ ISR(TIMER1_COMPA_vect)?"
      },
      {
        "type": "process",
        "text": "เพิ่มตัวแปรเวลา: seconds = (seconds + 1) % 10"
      },
      {
        "type": "process",
        "text": "ส่งค่ารหัสตัวเลขออก 7-Segment ในลูปหลัก"
      },
      {
        "type": "loop_back",
        "text": "วนลูปจับเวลาระดับฮาร์ดแวร์แม่นยำสูง"
      }
    ]
  },
  "tier4_external_interrupt_int0": {
    "title": "T4.01: External Interrupt INT0 Falling-Edge Handler",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนด PB0 (LED Output), PD2 (INT0 Input Pull-Up)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า EICRA |= (1 << ISC01) [Falling-Edge Trigger บนขา INT0]"
      },
      {
        "type": "process",
        "text": "เปิดใช้งานอินเทอร์รัปต์ภายนอก: EIMSK |= (1 << INT0), sei()"
      },
      {
        "type": "decision",
        "text": "Main Loop ทำงานพื้นหลัง (Idle/Sleep Polling)?"
      },
      {
        "type": "decision",
        "text": "มีสัญญาณฮาร์ดแวร์กระตุ้นเข้าขา INT0?"
      },
      {
        "type": "process",
        "text": "CPU พักงานหลักทันทีแล้วกระโดดเข้าสู่ ISR(INT0_vect)"
      },
      {
        "type": "process",
        "text": "สลับสถานะหลอดไฟ LED: PORTB ^= (1 << PB0) แล้วออกจาก ISR"
      },
      {
        "type": "loop_back",
        "text": "CPU กลับไปทำงานหลักต่อโดยไม่เสียเวลารอบ้างปุ่ม"
      }
    ]
  },
  "tier4_dual_external_interrupt_int0_int1": {
    "title": "T4.02: Dual External Interrupts (INT0 & INT1 Independent Handlers)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าขา INT0 (PD2), INT1 (PD3) ตรวจจับขอบขาลงในรีจิสเตอร์ EICRA"
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์คู่: EIMSK |= (1 << INT0) | (1 << INT1), sei()"
      },
      {
        "type": "decision",
        "text": "เกิดสัญญาณจาก INT0?"
      },
      {
        "type": "process",
        "text": "เรียก ISR(INT0_vect): สลับสถานะหลอดไฟ LED1"
      },
      {
        "type": "decision",
        "text": "เกิดสัญญาณจาก INT1?"
      },
      {
        "type": "process",
        "text": "เรียก ISR(INT1_vect): สลับสถานะหลอดไฟ LED2"
      },
      {
        "type": "loop_back",
        "text": "ระบบรองรับอินเทอร์รัปต์อิสระสองช่องสัญญาณ"
      }
    ]
  },
  "tier4_timer1_ctc_1hz_precision_clock": {
    "title": "T4.03: 16-Bit Timer1 CTC Precision 1.000 Hz Clock Generator",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "TCCR1B |= (1 << WGM12) [โหมด CTC: Clear Timer on Compare Match]"
      },
      {
        "type": "process",
        "text": "คำนวณ Prescaler 256: OCR1A = (16MHz / (256 * 1Hz)) - 1 = 62499"
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์: TIMSK1 |= (1 << OCIE1A), เรียกคำสั่ง sei()"
      },
      {
        "type": "decision",
        "text": "เคาน์เตอร์ TCNT1 นับถึง 62499 (เกิด Compare Match)?"
      },
      {
        "type": "process",
        "text": "ฮาร์ดแวร์เคลียร์ TCNT1 = 0 อัตโนมัติ และเรียก ISR(TIMER1_COMPA_vect)"
      },
      {
        "type": "process",
        "text": "สลับสถานะ Clock Output พิน PB0 ทุกๆ 1 วินาทีอย่างแม่นยำ"
      },
      {
        "type": "loop_back",
        "text": "สร้างฐานเวลามาตรฐานความแม่นยำสูง"
      }
    ]
  },
  "tier4_adc_variable_blink_rate": {
    "title": "T4.04: Potentiometer Controlled Variable LED Blink Rate",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า ADMUX (AVCC Reference, Channel ADC0/A0)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า ADCSRA (เปิด ADC, กำหนด Prescaler 128 = 125 kHz)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "สั่งเริ่มแปลงสัญญาณแอนะล็อก: ADCSRA |= (1 << ADSC)"
      },
      {
        "type": "decision",
        "text": "รอจนกว่าการแปลงจะเสร็จสมบูรณ์? (ADCSRA & (1 << ADSC)) == 0"
      },
      {
        "type": "process",
        "text": "อ่านค่าผลลัพธ์ดิจิทัล 10 บิต (ADCW ช่วง 0 ถึง 1023)"
      },
      {
        "type": "process",
        "text": "ปรับสเกลค่าเป็นเวลาหน่วง: delay_time = map(ADCW, 20ms, 1000ms)"
      },
      {
        "type": "process",
        "text": "สลับสถานะหลอดไฟ LED ตามอัตราเร็วที่ปรับจาก Potentiometer"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอ่านค่าแรงดันแอนะล็อกรอบถัดไป"
      }
    ]
  },
  "tier4_adc_schmitt_trigger_hysteresis": {
    "title": "T4.05: Software Schmitt Trigger with Hysteresis Band",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดจุดตัดแรงดัน: Upper_Threshold = 650, Lower_Threshold = 350"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อกปัจจุบันจากเซนเซอร์ (ADC0)"
      },
      {
        "type": "decision",
        "text": "ค่าแอนะล็อก > Upper_Threshold (650)?"
      },
      {
        "type": "process",
        "text": "สั่งเปิดเอาต์พุต: PORTB |= (1 << PB0) [Output ON]"
      },
      {
        "type": "decision",
        "text": "ค่าแอนะล็อก < Lower_Threshold (350)?"
      },
      {
        "type": "process",
        "text": "สั่งปิดเอาต์พุต: PORTB &= ~(1 << PB0) [Output OFF]"
      },
      {
        "type": "process",
        "text": "อยู่ในช่วง Hysteresis Band (350-650): คงสถานะเดิม ป้องกันสัญญาณกระเพื่อม"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกรองสัญญาณรบกวน Schmitt Trigger"
      }
    ]
  },
  "tier4_adc_window_comparator_3led": {
    "title": "T4.06: 3-Level Voltage Window Comparator with 3 LEDs",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนด 3 ช่วงแรงดัน: Low (<1.6V), Normal (1.6V-3.3V), High (>3.3V)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าเซนเซอร์แอนะล็อก ADC0 (0 ถึง 1023)"
      },
      {
        "type": "decision",
        "text": "ADC < 340 (ช่วงต่ำ)?"
      },
      {
        "type": "process",
        "text": "เปิด LED เขียว (Low), ดับ LED เหลือง/แดง"
      },
      {
        "type": "decision",
        "text": "ADC อยู่ระหว่าง 340 ถึง 680 (ช่วงปกติ)?"
      },
      {
        "type": "process",
        "text": "เปิด LED เหลือง (Normal), ดับ LED เขียว/แดง"
      },
      {
        "type": "process",
        "text": "ADC > 680 (ช่วงสูง): เปิด LED แดง (Overvoltage Alarm)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปตรวจสอบระดับหน้าต่างแรงดัน Window Comparator"
      }
    ]
  },
  "tier4_adc_battery_monitor_low_warn": {
    "title": "T4.07: Battery Voltage Monitor with Low Battery Buzzer Warning",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแรงดันแบตเตอรี่ผ่านตัวแบ่งแรงดัน (Voltage Divider)"
      },
      {
        "type": "decision",
        "text": "คำนวณแรงดันแบตเตอรี่เทียบเกณฑ์ 3.3V วิกฤต?"
      },
      {
        "type": "process",
        "text": "แรงดันปกติ (> 3.6V): ไฟเขียวติดปกติ สแตนด์บาย"
      },
      {
        "type": "process",
        "text": "แรงดันเตือน (3.3V - 3.6V): ไฟส้มกะพริบช้าๆ"
      },
      {
        "type": "process",
        "text": "แรงดันวิกฤต (< 3.3V): ไฟแดงกะพริบรัวพร้อมส่งเสียงร้องเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปติดตามระดับพลังงานแบตเตอรี่"
      }
    ]
  },
  "tier4_adc_pwm_dimmer_timer0": {
    "title": "T4.08: Potentiometer Controlled Timer0 Fast PWM Dimmer",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า Timer0 Fast PWM: TCCR0A |= (1 << COM0A1) | (1 << WGM01) | (1 << WGM00)"
      },
      {
        "type": "process",
        "text": "กำหนด Prescaler 64: TCCR0B |= (1 << CS01) | (1 << CS00) [ความถี่ ~976 Hz]"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อก 10 บิตจาก Potentiometer (ADC0 ช่วง 0-1023)"
      },
      {
        "type": "process",
        "text": "แปลงสเกล 10 บิต เป็น 8 บิต: pwm_val = adc_val >> 2 (ช่วง 0-255)"
      },
      {
        "type": "process",
        "text": "เขียนค่าลงรีจิสเตอร์เปรียบเทียบ: OCR0A = pwm_val"
      },
      {
        "type": "loop_back",
        "text": "ฮาร์ดแวร์สร้างพัลส์ PWM ควบคุมความสว่างอัตโนมัติ"
      }
    ]
  },
  "tier4_adc_potentiometer_led_bar": {
    "title": "T4.09: Analog Potentiometer to 6-LED Bar Graph Visualizer",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนด PB0-PB5 Output LED Bar, เปิดวงจร ADC แชนแนล A0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าเซนเซอร์แอนะล็อก adc_raw (0 ถึง 1023)"
      },
      {
        "type": "process",
        "text": "แบ่งสเกลเป็น 6 ระดับ: level = adc_raw / 170 (ช่วง 0 ถึง 6)"
      },
      {
        "type": "process",
        "text": "สร้างบิตแพทเทิร์นบาร์กราฟ: bar_mask = (1 << level) - 1"
      },
      {
        "type": "process",
        "text": "ส่งค่าออกสู่พอร์ต PORTB เพื่อแสดงระดับความสูงของแท่งไฟ"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตบาร์กราฟตามเวลาจริง"
      }
    ]
  },
  "tier4_adc_dual_channel_a0_a1": {
    "title": "T4.10: Dual Channel ADC Multiplexing (A0 & A1 Interleaved Sampling)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดค่าสลับช่องสัญญาณ ADMUX: ช่อง A0 และ ช่อง A1"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "สลับ ADMUX ไปที่แชนแนล 0 (A0) สั่งเริ่มแปลงค่า ADC และอ่านผลลัพธ์"
      },
      {
        "type": "process",
        "text": "สลับ ADMUX ไปที่แชนแนล 1 (A1) สั่งเริ่มแปลงค่า ADC และอ่านผลลัพธ์"
      },
      {
        "type": "process",
        "text": "นำค่า A0 มาคุมความเร็วไฟวิ่ง และค่า A1 มาคุมความสว่าง PWM"
      },
      {
        "type": "loop_back",
        "text": "วนลูปสลับอ่านมัลติเพล็กซ์เซนเซอร์ 2 ช่อง"
      }
    ]
  },
  "tier5_lcd1602_hello_world_static": {
    "title": "T5.01: Static 2-Line Text Display on LCD 1602 (4-Bit Mode)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "หน่วงเวลา 50ms ให้แรงดันไฟเลี้ยง VDD นิ่งสมบูรณ์"
      },
      {
        "type": "process",
        "text": "ส่งคำสั่ง 4-bit Init Sequence: 0x33, 0x32, 0x28 (Function Set)"
      },
      {
        "type": "process",
        "text": "ส่งคำสั่ง 0x0C (Display ON), 0x06 (Entry Mode), 0x01 (Clear Display)"
      },
      {
        "type": "process",
        "text": "ตั้งพิกัด Cursor บรรทัดที่ 1 (0x80) และส่งข้อความ \"Hello, World!\""
      },
      {
        "type": "process",
        "text": "ตั้งพิกัด Cursor บรรทัดที่ 2 (0xC0) และส่งข้อความ \"Embedded CDTI\""
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "สแตนด์บายคงการแสดงผลบนหน้าจออย่างมีเสถียรภาพ"
      },
      {
        "type": "loop_back",
        "text": "ระบบคงการทำงาน"
      }
    ]
  },
  "tier5_lcd1602_student_id_name": {
    "title": "T5.02: Student Identity and Department Display on LCD 1602",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "เริ่มต้นการทำงานจอ LCD1602 ในโหมด 4 บิต (HD44780)"
      },
      {
        "type": "process",
        "text": "กำหนดตำแหน่งเคอร์เซอร์บรรทัดที่ 1: lcd_set_cursor(0, 0)"
      },
      {
        "type": "process",
        "text": "ส่งข้อความแสดงรหัสนักศึกษา: lcd_print(\"ID: 6710301009\")"
      },
      {
        "type": "process",
        "text": "กำหนดตำแหน่งเคอร์เซอร์บรรทัดที่ 2: lcd_set_cursor(1, 0)"
      },
      {
        "type": "process",
        "text": "ส่งข้อความแสดงชื่อผู้ทำแล็บ: lcd_print(\"Apisak Kongpakdee\")"
      },
      {
        "type": "loop_back",
        "text": "คงสถานะการแสดงข้อมูลระบุตัวตนบนจอ"
      }
    ]
  },
  "tier5_lcd1602_button_text_switcher": {
    "title": "T5.03: Multi-Button LCD Message Switcher",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "Init จอ LCD1602 และตั้งค่าสวิตช์ 3 ปุ่มเป็น Input Pull-Up"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW1?"
      },
      {
        "type": "process",
        "text": "เคลียร์จอและแสดงข้อความกลุ่มที่ 1: \"MODE 1: NORMAL\""
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW2?"
      },
      {
        "type": "process",
        "text": "เคลียร์จอและแสดงข้อความกลุ่มที่ 2: \"MODE 2: WARNING\""
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW3?"
      },
      {
        "type": "process",
        "text": "เคลียร์จอและแสดงข้อความกลุ่มที่ 3: \"MODE 3: CRITICAL\""
      },
      {
        "type": "loop_back",
        "text": "วนลูปตรวจสอบการกดปุ่มสลับข้อความ"
      }
    ]
  },
  "tier5_lcd1602_simple_counter_00_99": {
    "title": "T5.04: Two-Digit Decimal Counter (00-99) with ASCII Formatting on LCD",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "เริ่มต้นระบบจอ LCD1602, กำหนดตัวแปรนับ count = 0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "แยกหลักสิบ: tens = (count / 10) + '0' (แปลงเป็น ASCII)"
      },
      {
        "type": "process",
        "text": "แยกหลักหน่วย: ones = (count % 10) + '0' (แปลงเป็น ASCII)"
      },
      {
        "type": "process",
        "text": "ส่งอักขระ ASCII ออกสู่จอ LCD: lcd_write_char(tens), lcd_write_char(ones)"
      },
      {
        "type": "process",
        "text": "หน่วงเวลา 500 ms และเพิ่มค่านับ: count = (count + 1) % 100"
      },
      {
        "type": "loop_back",
        "text": "วนลูปนับเลขสองหลักบนหน้าจอ LCD"
      }
    ]
  },
  "tier5_lcd1602_custom_characters_cgram": {
    "title": "T5.05: Custom Graphic Characters in LCD CGRAM (Heart, Battery, Bell)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "เริ่มต้นระบบจอ LCD1602 โหมด 4 บิต"
      },
      {
        "type": "process",
        "text": "ส่งคำสั่งเลือกที่อยู่ CGRAM: lcd_send_cmd(0x40) [Start Address 0]"
      },
      {
        "type": "process",
        "text": "ส่งข้อมูลบิตแมป 8 ไบต์ต่อตัวอักษรลง CGRAM (Heart, Battery, Bell)"
      },
      {
        "type": "process",
        "text": "สลับกลับสู่หน่วยความจำแสดงผล DDRAM: lcd_send_cmd(0x80)"
      },
      {
        "type": "process",
        "text": "พิมพ์อักขระพิเศษด้วยรหัสตำแหน่ง: lcd_write_data(0), lcd_write_data(1)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตไอคอน CGRAM บนหน้าจอ LCD"
      }
    ]
  },
  "tier5_lcd1602_direct_adc_volt_display": {
    "title": "T5.06: Direct ADC and Real-Time Voltmeter on LCD1602",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "เริ่มต้นจอ LCD1602 และเปิดใช้งานโมดูล ADC แชนแนล A0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "สุ่มอ่านค่าแอนะล็อก 10 บิตจาก ADC0 (ช่วง 0-1023)"
      },
      {
        "type": "process",
        "text": "คำนวณแรงดันจริง: Voltage = (adc_raw * 5.0) / 1023.0"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงข้อความ: sprintf(buf, \"Volt: %1.2f V\", Voltage)"
      },
      {
        "type": "process",
        "text": "อัปเดตตัวเลขแสดงผลบนจอ LCD บรรทัดที่ 1 ทุกๆ 200 ms"
      },
      {
        "type": "loop_back",
        "text": "วนลูปมอนิเตอร์ระดับแรงดันไฟฟ้าแบบเรียลไทม์"
      }
    ]
  },
  "tier5_lcd1602_4bit_text_scroll": {
    "title": "T5.07: Horizontal Marquee Text Scrolling on LCD1602",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "Init จอ LCD1602, โหลดข้อความยาวเข้าสู่บัฟเฟอร์หน่วยความจำ"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "ส่งคำสั่งเลื่อนข้อความทั้งหน้าจอ: lcd_send_cmd(0x18) [Shift Left]"
      },
      {
        "type": "process",
        "text": "หน่วงเวลาควบคุมความเร็วตัววิ่ง _delay_ms(300)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปเลื่อนตัวอักษรแบบป้ายไฟวิ่ง Marquee"
      }
    ]
  },
  "tier5_reaction_game_lcd_button": {
    "title": "T5.08: Reflex Reaction Time Testing Game on LCD 1602",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "แสดงข้อความ \"Ready...\", สุ่มหน่วงเวลานิรนาม 2-5 วินาที"
      },
      {
        "type": "process",
        "text": "ขึ้นสัญญาณ \"PRESS NOW!\" และเริ่มนับเวลาความละเอียด 1 ms"
      },
      {
        "type": "decision",
        "text": "ผู้เล่นกดปวิตช์ตอบสนอง?"
      },
      {
        "type": "process",
        "text": "บันทึกเวลาที่ใช้: reaction_ms = current_time - start_time"
      },
      {
        "type": "process",
        "text": "แสดงผลคะแนนความเร็ว: sprintf(\"Time: %d ms\", reaction_ms)"
      },
      {
        "type": "loop_back",
        "text": "วนรอบเตรียมตัวเล่นเกมรอบถัดไป"
      }
    ]
  },
  "tier5_pin_code_lock_lcd_buttons": {
    "title": "T5.09: 4-Digit Security PIN Code Lock on LCD 1602",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดรหัสลับ Master PIN: \"1234\", บัฟเฟอร์รับค่า key_buf[4]"
      },
      {
        "type": "decision",
        "text": "ผู้ใช้กดปุ่มป้อนตัวเลขครบ 4 หลัก?"
      },
      {
        "type": "process",
        "text": "แสดงสัญลักษณ์ดาวบนหน้าจอ: \"PIN: ****\""
      },
      {
        "type": "decision",
        "text": "รหัสตรงกับ Master PIN? (strcmp == 0)"
      },
      {
        "type": "process",
        "text": "ถูกต้อง: แสดง \"ACCESS GRANTED\" และสั่งปลดกลอนโซลินอยด์"
      },
      {
        "type": "process",
        "text": "ผิดพลาด: แสดง \"WRONG PIN\" พร้อมส่งสัญญาณเตือนและนับข้อผิดพลาด"
      },
      {
        "type": "loop_back",
        "text": "เคลียร์บัฟเฟอร์พร้อมรับรหัสผ่านใหม่"
      }
    ]
  },
  "tier5_lcd_menu_controller_4buttons": {
    "title": "T5.10: Multi-Level Interactive LCD Menu Controller (4 Buttons)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "Input: SW_UP, SW_DOWN, SW_ENTER, SW_BACK"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม UP หรือ DOWN?"
      },
      {
        "type": "process",
        "text": "เลื่อนเคอร์เซอร์เลือกเมนู: current_selection (0 ถึง max_menu)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม ENTER?"
      },
      {
        "type": "process",
        "text": "เข้าสู่ฟังก์ชันการทำงานของเมนูย่อยนั้นๆ"
      },
      {
        "type": "process",
        "text": "เรนเดอร์หน้าจอเมนูและสัญลักษณ์ลูกศรชี้บน LCD"
      },
      {
        "type": "loop_back",
        "text": "วนลูปควบคุมระบบเมนู"
      }
    ]
  },
  "tier5_analog_thermostat_fan_controller": {
    "title": "T5.11: Automatic Temperature Thermostat & PWM Fan on LCD",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "อ่านค่าอุณหภูมิเซนเซอร์แอนะล็อก และตั้งค่าจุดตัด Setpoint"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "คำนวณอุณหภูมิปัจจุบันและแสดงผลบนจอ LCD บรรทัดที่ 1"
      },
      {
        "type": "decision",
        "text": "อุณหภูมิเกินกว่าจุดตัด Setpoint?"
      },
      {
        "type": "process",
        "text": "คำนวณความเร็วพัดลม (ตามส่วนต่างอุณหภูมิ)"
      },
      {
        "type": "process",
        "text": "แสดงสถานะการทำงานของพัดลม: \"Fan: ON (XX%)\" บน LCD บรรทัดที่ 2"
      },
      {
        "type": "loop_back",
        "text": "วนรอบรักษาสมดุลความร้อน Thermostat"
      }
    ]
  },
  "tier5_master_system_adc_lcd_voltmeter": {
    "title": "T5.12: Master Exam System: Dual-Display Precision Digital Voltmeter",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กําหนดการทำงานพร้อมกันของ ADC, จอ LCD 1602 และ 7-Segment"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแรงดันแอนะล็อกความแม่นยำสูงด้วย ADC Oversampling"
      },
      {
        "type": "process",
        "text": "แสดงค่าแรงดันตัวเลขละเอียดบน LCD: \"V = 3.48 V\""
      },
      {
        "type": "process",
        "text": "แสดงค่าหลักหน่วยของแรงดันบน 7-Segment: \"3.\""
      },
      {
        "type": "loop_back",
        "text": "วนรอบแสดงผลเครื่องมือวัดระบบผสมผสานระดับ Master"
      }
    ]
  },
  "tier6_multitasking_dual_blink_nonblocking": {
    "title": "T6.01: Multitasking Dual Blink (Non-Blocking Concurrency)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า LED1 (PB0), LED2 (PB1) เป็น Output, t1_prev = 0, t2_prev = 0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าเวลาปัจจุบัน: current_time = get_millis()"
      },
      {
        "type": "decision",
        "text": "Task 1 ถึงกำหนด: (current_time - t1_prev >= 500 ms)?"
      },
      {
        "type": "process",
        "text": "สลับสถานะ LED1 และบันทึกเวลา: t1_prev = current_time"
      },
      {
        "type": "decision",
        "text": "Task 2 ถึงกำหนด: (current_time - t2_prev >= 200 ms)?"
      },
      {
        "type": "process",
        "text": "สลับสถานะ LED2 และบันทึกเวลา: t2_prev = current_time"
      },
      {
        "type": "loop_back",
        "text": "วนลูปทำงานคู่ขนานโดยไม่ใช้คำสั่งหน่วงเวลาบล็อก CPU"
      }
    ]
  },
  "tier6_multitasking_heartbeat_debounce_chaser": {
    "title": "T6.02: Concurrent Heartbeat, Debounced Button & LED Chaser",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "แบ่งภารกิจ 3 งาน: Task Heartbeat (1s), Task Debounce (10ms), Task Chaser (80ms)"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "Task 1 (Heartbeat): ตรวจเวลา 1000ms สลับสถานะไฟบ่งชี้ระบบทำงานปกติ"
      },
      {
        "type": "process",
        "text": "Task 2 (Debounce): สแกนอ่านค่าปุ่มกดและกรองสัญญาณกระดอนทุก 10ms"
      },
      {
        "type": "process",
        "text": "Task 3 (Chaser): เลื่อนสเต็ปไฟวิ่งตามช่วงเวลาที่กำหนดอย่างลื่นไหล"
      },
      {
        "type": "loop_back",
        "text": "วนรอบบริหารเวลาภารกิจคู่ขนาน"
      }
    ]
  },
  "tier6_multitasking_cooperative_scheduler_1ms_tick": {
    "title": "T6.03: Cooperative Task Scheduler with 1ms Hardware Timer Tick",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า Timer0 CTC Mode สร้างอินเทอร์รัปต์ System Tick ทุก 1.000 ms"
      },
      {
        "type": "process",
        "text": "ลงทะเบียน Task Table (Task 100ms, Task 500ms, Task 1000ms)"
      },
      {
        "type": "decision",
        "text": "เกิดสัญญาณ Timer ISR (System Tick 1ms)?"
      },
      {
        "type": "process",
        "text": "อัปเดตตัวนับหน่วงเวลาของแต่ละภารกิจในตารางคิวงาน"
      },
      {
        "type": "decision",
        "text": "มี Task ใดถึงกำหนดเวลาประมวลผล (Timer <= 0)?"
      },
      {
        "type": "process",
        "text": "เรียกฟังก์ชันงานนั้นทำงานแบบ Cooperative จนจบ"
      },
      {
        "type": "loop_back",
        "text": "วนลูปตรวจสอบตารางงานในรอบถัดไป"
      }
    ]
  },
  "tier6_multitasking_7segment_background_counter_interactive": {
    "title": "T6.04: Background 7-Segment Counter with Immediate Button Response",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ต 7-Segment, LED แสดงผล และสวิตช์ปุ่มกดฉุกเฉิน"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "Background Task: ตรวจเวลา 1.0s เพื่อนับเลขและขับออก 7-Segment"
      },
      {
        "type": "process",
        "text": "Foreground Task: อ่านปุ่มกดทันที สั่งเปิด/ปิดไฟ LED ตอบสนองฉับไว"
      },
      {
        "type": "loop_back",
        "text": "วนลูปประมวลผลงานพื้นหลังและงานส่วนหน้าคู่กัน"
      }
    ]
  },
  "tier6_multitasking_adc_sensor_monitor_background_strobe": {
    "title": "T6.05: Background Strobe Warning with Periodic ADC Sampling",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า ADC แชนแนล A0 และพอร์ตขับหลอดไฟสโตรปแจ้งเตือน"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "Task ADC (ทุก 100 ms): เริ่มการแปลงค่า ADC และคำนวณระดับแรงดัน"
      },
      {
        "type": "process",
        "text": "Task Strobe: สลับสถานะไฟแฟลชเตือนภัยความถี่สูงตามช่วงเวลาจำเพาะ"
      },
      {
        "type": "loop_back",
        "text": "วนลูปประมวลผลควบคู่กันอย่างต่อเนื่อง"
      }
    ]
  },
  "tier6_multitasking_traffic_light_pedestrian_beeper": {
    "title": "T6.06: Concurrent Traffic Light Controller with Pedestrian Beeper",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ไฟจราจร 3 สี, ไฟคนข้าม, สวิตช์ขอข้าม, ลำโพงบัซเซอร์เตือนคนข้ามถนน"
      },
      {
        "type": "decision",
        "text": "FSM State: ประมวลผลสถานะไฟจราจรปัจจุบัน?"
      },
      {
        "type": "process",
        "text": "เลื่อนเฟสเวลาไฟจราจรตามไทม์มิ่ง (เขียว -> เหลือง -> แดง)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มคนขอข้ามถนน (Pedestrian Request)?"
      },
      {
        "type": "process",
        "text": "เปิดไฟคนข้ามเขียว พร้อมสร้างพัลส์เสียงเตือนบี๊บเป็นจังหวะตามเวลา"
      },
      {
        "type": "loop_back",
        "text": "วนรอบ State Machine จัดการเวลาคู่ขนาน"
      }
    ]
  },
  "tier6_multitasking_lcd_display_smooth_led_chaser": {
    "title": "T6.07: Non-Blocking LCD Frame Slicing with Smooth LED Chaser",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าหน้าจอ LCD 1602 และพอร์ตขับไฟวิ่ง LED Chaser"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "Task Chaser (ทุก 80 ms): ขยับสเต็ปไฟวิ่งอย่างสม่ำเสมอ ไม่ติดหน่วง"
      },
      {
        "type": "process",
        "text": "Task LCD (ทุก 250 ms): อัปเดตข้อความบนจอ LCD แบบจัดสรรจังหวะเวลา"
      },
      {
        "type": "loop_back",
        "text": "วนลูปทำงานคู่ขนานโดยไฟวิ่งไม่กระตุกแม้แต่น้อย"
      }
    ]
  },
  "tier6_multitasking_round_robin_executive_master": {
    "title": "T6.08: Round-Robin Executive Multi-Tasking Architecture",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดตารางเวลา Slot ภารกิจแบบรอบวงกลม Round-Robin"
      },
      {
        "type": "decision",
        "text": "วนรอบ Executive Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "Slot 1: ตรวจสอบและสแกนอินพุตสวิตช์ทั้งหมด (Input Scan)"
      },
      {
        "type": "process",
        "text": "Slot 2: อ่านค่าเซนเซอร์แอนะล็อกและกรองสัญญาณ (Sensor Processing)"
      },
      {
        "type": "process",
        "text": "Slot 3: ประมวลผลตรรกะระบบและสเตตแมชีน FSM (State Engine)"
      },
      {
        "type": "process",
        "text": "Slot 4: ส่งข้อมูลออกแสดงผลบนพอร์ตและหน้าจอ (Output Dispatcher)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไป Slot 1 ตามลำดับรอบวงกลม"
      }
    ]
  },
  "tier7_multitasking_industrial_process_mixer": {
    "title": "T7.01: Industrial Automated Chemical Process Mixer System",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ฮาร์ดแวร์: มอเตอร์กวน PWM, ฮีตเตอร์, วาล์วจ่ายสาร, เซนเซอร์ ADC, ปุ่มฉุกเฉิน"
      },
      {
        "type": "decision",
        "text": "FSM State: IDLE, FILLING, HEATING, MIXING, DRAINING?"
      },
      {
        "type": "process",
        "text": "ตรวจสอบคำสั่ง Start/Stop และค่าเซนเซอร์ความเร็ว/อุณหภูมิ"
      },
      {
        "type": "process",
        "text": "ควบคุมเอาต์พุตตามลำดับเฟสการกวนสารเคมีอย่างปลอดภัย"
      },
      {
        "type": "decision",
        "text": "กดปุ่มหยุดฉุกเฉิน (Emergency Stop) หรืออุณหภูมิเกินพิกัด?"
      },
      {
        "type": "process",
        "text": "ตัดการทำงานของมอเตอร์และฮีตเตอร์ทันที (Safety Interlock)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปประมวลผลวงจรกวนสารเคมีอุตสาหกรรม"
      }
    ]
  },
  "tier7_multitasking_digital_scale_batch_doser": {
    "title": "T7.02: Precision Digital Scale & Automatic Batch Dosing System",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าพอร์ตวาล์วจ่ายวัตถุดิบ, เซนเซอร์ชั่งน้ำหนัก (ADC Load Cell)"
      },
      {
        "type": "process",
        "text": "กรองสัญญาณน้ำหนักด้วยอัลกอริทึม Moving Average Digital Filter"
      },
      {
        "type": "decision",
        "text": "น้ำหนักถึงค่าเป้าหมายที่ตั้งไว้ (Target Weight)?"
      },
      {
        "type": "process",
        "text": "สั่งปิดวาล์วจ่ายสารทันที และส่งสัญญาณแจ้งเตือนสิ้นสุดแบทช์"
      },
      {
        "type": "loop_back",
        "text": "วนรอบพร้อมรับคำสั่งชั่งจ่ายแบทช์ถัดไป"
      }
    ]
  },
  "tier7_multitasking_medical_patient_monitor": {
    "title": "T7.03: Medical Patient Vital Signs & Heart Rate Monitor",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตแจ้งเตือน, จอแสดงผล และตัวแปลงสัญญาณชีพแอนะล็อก"
      },
      {
        "type": "decision",
        "text": "วนรอบการประมวลผลสัญญาณชีพ?"
      },
      {
        "type": "process",
        "text": "คำนวณอัตราชีพจร (Heart Rate BPM) และสังเคราะห์พัลส์คลื่น QRS"
      },
      {
        "type": "decision",
        "text": "ค่าชีพจรหลุดช่วงปกติ (< 50 หรือ > 120 bpm)?"
      },
      {
        "type": "process",
        "text": "เปิดไซเรน และส่งสัญญาณเตือนภาวะฉุกเฉิน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปติดตามสัญญาณชีพผู้ป่วยต่อเนื่อง"
      }
    ]
  },
  "tier7_multitasking_smart_elevator_dispatcher": {
    "title": "T7.04: Smart 4-Floor Passenger Elevator Dispatcher Controller",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ปุ่มกดเรียกลิฟต์ 4 ชั้น, จอ 7-Segment แสดงชั้น, ไฟแสดงทิศทางขึ้น/ลง"
      },
      {
        "type": "decision",
        "text": "มีคำขอเรียกลิฟต์ในคิว (Pending Request)?"
      },
      {
        "type": "process",
        "text": "คำนวณทิศทางเคลื่อนที่ตามอัลกอริทึม Elevator SCAN"
      },
      {
        "type": "process",
        "text": "อัปเดตตำแหน่งชั้นปัจจุบันบน 7-Segment และควบคุมประตูลิฟต์"
      },
      {
        "type": "loop_back",
        "text": "วนลูปรับคำขอเรียกลิฟต์รอบถัดไป"
      }
    ]
  },
  "tier7_multitasking_security_vault_lockout": {
    "title": "T7.05: High-Security Vault Access & Automatic Lockout System",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ระบบป้อนรหัสผ่าน PIN, กลอนแม่เหล็กไฟฟ้า, ไฟสถานะความปลอดภัย"
      },
      {
        "type": "decision",
        "text": "ผู้ใช้ป้อนรหัสผ่านครบ 4 หลัก?"
      },
      {
        "type": "decision",
        "text": "รหัสผ่านตรงกับ Master PIN หรือไม่?"
      },
      {
        "type": "process",
        "text": "ถูกต้อง: ปลดล็อกกลอนและส่งสัญญาณเปิดตู้สำเร็จ"
      },
      {
        "type": "process",
        "text": "ผิดพลาด: บันทึกความผิดพลาด (ถ้าผิดเกิน 3 ครั้งเข้าสู่โหมด Lockdown)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปตรวจจับสิทธิ์การเข้าถึงความปลอดภัยสูง"
      }
    ]
  },
  "tier7_multitasking_greenhouse_climate_hvac": {
    "title": "T7.06: Automated Greenhouse Climate & HVAC Environment Controller",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "พอร์ตพัดลมระบายอากาศ, สเปรย์ละอองน้ำ, แผ่นทำความร้อน, เซนเซอร์สภาพอากาศ"
      },
      {
        "type": "process",
        "text": "อ่านค่าอุณหภูมิและความชื้นสัมพัทธ์จากเซนเซอร์แอนะล็อก"
      },
      {
        "type": "decision",
        "text": "อุณหภูมิสูงกว่าขีดจำกัดวิกฤต (> 35°C)?"
      },
      {
        "type": "process",
        "text": "สั่งเปิดพัดลมระบายอากาศและสเปรย์ละอองน้ำลดอุณหภูมิ"
      },
      {
        "type": "loop_back",
        "text": "วนรอบควบคุมสมดุลสภาพแวดล้อมเรือนกระจก"
      }
    ]
  },
  "tier7_multitasking_highway_toll_gate_barrier": {
    "title": "T7.07: Intelligent Highway Toll Gate Barrier Controller",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "มอเตอร์ไม้กั้น, ไฟเขียว/แดง, ลูปตรวจจับยานพาหนะ (Induction Loop)"
      },
      {
        "type": "decision",
        "text": "ตรวจพบรถเข้าสู่ช่องด่าน (Vehicle Detected)?"
      },
      {
        "type": "decision",
        "text": "ชำระค่าผ่านทางสำเร็จ (Payment Confirmed)?"
      },
      {
        "type": "process",
        "text": "เปิดไม้กั้นและเปลี่ยนสัญญาณไฟเป็นสีเขียวให้รถผ่าน"
      },
      {
        "type": "process",
        "text": "รถเคลื่อนพ้นลูปตรวจจับ -> ปิดไม้กั้นและกลับสู่ไฟแดง"
      },
      {
        "type": "loop_back",
        "text": "วนลูปพร้อมรับรถคันถัดไป"
      }
    ]
  },
  "tier7_multitasking_dual_display_workcell": {
    "title": "T7.08: Dual Display Assembly Line Industrial Workcell",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับ 7-Segment, LCD 1602 และเซนเซอร์ชิ้นงาน"
      },
      {
        "type": "decision",
        "text": "วนรอบ FSM ควบคุมสายพานการผลิต?"
      },
      {
        "type": "process",
        "text": "อัปเดตจำนวนชิ้นงานสะสมบน 7-Segment ทันทีแบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "แสดงผลสถานะขั้นตอนการประกอบ (Station Status) บนหน้าจอ LCD"
      },
      {
        "type": "loop_back",
        "text": "วนลูปควบคุมเวิร์กสเตชันอัตโนมัติ"
      }
    ]
  },
  "tier7_multitasking_solar_mppt_bms_hybrid": {
    "title": "T7.09: Solar MPPT Tracker & Battery Management Hybrid Controller",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ADC วัดแรงดัน/กระแสแผงโซลาร์ และระบบตัดต่อชาร์จแบตเตอรี่"
      },
      {
        "type": "decision",
        "text": "วนรอบคำนวณกำลังไฟฟ้า P = V * I?"
      },
      {
        "type": "process",
        "text": "ปรับเปลี่ยนดิวตีไซเคิลตามอัลกอริทึม Perturb & Observe"
      },
      {
        "type": "decision",
        "text": "แรงดันแบตเตอรี่เต็มพิกัด (Over-Voltage Protection)?"
      },
      {
        "type": "process",
        "text": "ตัดวงจรชาร์จเพื่อรักษาสภาพแบตเตอรี่อย่างปลอดภัย"
      },
      {
        "type": "loop_back",
        "text": "วนลูปควบคุมการแปลงพลังงานต่อเนื่อง"
      }
    ]
  },
  "tier7_multitasking_ultimate_grand_prix_master": {
    "title": "T7.10: Ultimate Grand Prix Master Embedded Executive Controller",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดการทำงานของทุกโมดูล: Timers, ADC, I/O, 7-Segment และ LCD 1602"
      },
      {
        "type": "process",
        "text": "สร้าง System Heartbeat และบริหารตารางภารกิจแบบ Cooperative Tick 1ms"
      },
      {
        "type": "decision",
        "text": "วนรอบ Executive Loop (Master Control)?"
      },
      {
        "type": "process",
        "text": "สแกนอินพุต, แปลงค่าแอนะล็อก, รัน Finite State Machine"
      },
      {
        "type": "process",
        "text": "ขับการแสดงผลพร้อมกันอย่างสมดุลโดยไม่มีการบล็อกเวลาแม้แต่มิลลิวินาทีเดียว"
      },
      {
        "type": "loop_back",
        "text": "วนลูปปฏิบัติการระบบฝังตัวระดับ Master"
      }
    ]
  }
};

// Flowchart Engine with Dynamic Multi-Line Wrapping & Zero-Overflow Protection
const STUDIO_FLOWCHARTS = {
  flowcharts: LAB_FLOWCHARTS,

  wrapText: function(text, maxChars) {
    if (!text || text.length <= maxChars) {
      return [text];
    }
    const thaiSplitters = ['และ', 'หรือ', 'เป็น', 'สั่ง', 'ตรวจ', 'ไม่', 'ถ้า', 'จริง', 'เท็จ', 'เมื่อ', 'แล้ว', 'เพื่อ', 'โดย', 'ตัด', 'หน่วง', 'วน'];
    const delims = [' ', ':', ',', '(', ')', '[', ']', '•', '-', ';', '/', '&', '|', '?', '!', '=', '>', '<'];
    const lines = [];
    let rem = text.trim();

    while (rem.length > maxChars) {
      const limit = Math.min(rem.length, maxChars);
      let splitPos = -1;

      // 1. Backwards search for explicit punctuation or space
      for (let i = limit; i >= Math.max(4, limit - 16); i--) {
        if (delims.includes(rem[i])) {
          splitPos = i;
          break;
        }
      }

      // 2. Thai word boundary search
      if (splitPos === -1) {
        for (let i = limit; i >= Math.max(4, limit - 16); i--) {
          const sub = rem.substring(i);
          if (thaiSplitters.some(w => sub.startsWith(w))) {
            splitPos = i;
            break;
          }
        }
      }

      // 3. Forwards search slightly
      if (splitPos === -1 && limit < rem.length) {
        for (let i = limit; i < Math.min(rem.length, limit + 6); i++) {
          if (delims.includes(rem[i])) {
            splitPos = i;
            break;
          }
        }
      }

      if (splitPos === -1) {
        splitPos = limit;
      }

      // Safeguard against severing Thai combining vowels and tone marks
      const thaiCombining = ['\u0E31', '\u0E34', '\u0E35', '\u0E36', '\u0E37', '\u0E38', '\u0E39', '\u0E3A', '\u0E47', '\u0E48', '\u0E49', '\u0E4A', '\u0E4B', '\u0E4C', '\u0E4D', '\u0E4E', '\u0E30', '\u0E32', '\u0E33'];
      while (splitPos > 4 && thaiCombining.includes(rem[splitPos])) {
        splitPos--;
      }
      if (splitPos < rem.length && thaiCombining.includes(rem[splitPos])) {
        splitPos--;
      }

      const part = rem.substring(0, splitPos).trim();
      if (splitPos < rem.length && rem[splitPos] === ' ') {
        rem = rem.substring(splitPos + 1).trim();
      } else {
        rem = rem.substring(splitPos).trim();
      }

      if (part) lines.push(part);
    }

    if (rem) lines.push(rem);
    return lines;
  },

  escapeXml: function(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case "'": return '&apos;';
        case '"': return '&quot;';
      }
    });
  },

  generateSvg: function(labId) {
    const chart = this.flowcharts[labId] || this.flowcharts["tier1_button_hold_1sw_1led"] || Object.values(this.flowcharts)[0];
    if (!chart || !chart.steps) {
      return '<svg width="520" height="100"><text x="260" y="50" fill="#94a3b8" text-anchor="middle">ไม่พบข้อมูลผังงาน</text></svg>';
    }

    const cx = 260;
    const boxWidth = 440;
    const boxX = cx - (boxWidth / 2); // 40
    const diamondWidth = 380;
    const gapY = 24;
    let currentY = 24;
    let loopTargetY = 140;

    const elements = [];
    let foundLoopTarget = false;

    chart.steps.forEach((step, idx) => {
      const isLast = idx === chart.steps.length - 1;
      const isDecision = step.type === "decision";
      const isTerm = step.type === "term";
      const isLoop = step.type === "loop_back";

      const maxChars = isDecision ? 22 : 32;
      const lines = this.wrapText(step.text, maxChars);
      const lineCount = lines.length;

      let stepHeight = 46;
      if (isDecision) {
        stepHeight = Math.max(62, 36 + lineCount * 20);
      } else if (isTerm) {
        stepHeight = 44;
      } else {
        stepHeight = Math.max(46, 26 + lineCount * 18);
      }

      if (!foundLoopTarget && (isDecision || idx === 2 || (idx === 1 && chart.steps.length <= 3))) {
        loopTargetY = currentY + (stepHeight / 2);
        foundLoopTarget = true;
      }

      // Draw arrow to next step
      if (!isLast && !isLoop) {
        const arrowStartY = currentY + stepHeight;
        const arrowEndY = arrowStartY + gapY;
        elements.push(`
          <line x1="${cx}" y1="${arrowStartY}" x2="${cx}" y2="${arrowEndY}" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead)"/>
        `);
      }

      if (isTerm) {
        const termWidth = 300;
        const termX = cx - (termWidth / 2);
        elements.push(`
          <g class="fc-step fc-terminal">
            <rect x="${termX}" y="${currentY}" width="${termWidth}" height="${stepHeight}" rx="22" fill="#065f46" stroke="#10b981" stroke-width="2"/>
            <text x="${cx}" y="${currentY + 27}" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="700" font-family="'Sarabun', 'TH Sarabun New', sans-serif">${this.escapeXml(step.text)}</text>
          </g>
        `);
        currentY += stepHeight + gapY;
      } else if (isDecision) {
        const cy = currentY + stepHeight / 2;
        const hw = diamondWidth / 2;
        const hh = stepHeight / 2;
        const points = `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`;

        const lineHeight = 16;
        const startY = cy - ((lineCount - 1) * lineHeight / 2) + 4;
        const tspans = lines.map((l, i) => `<tspan x="${cx}" y="${startY + i * lineHeight}">${this.escapeXml(l)}</tspan>`).join('');

        elements.push(`
          <g class="fc-step fc-decision">
            <polygon points="${points}" fill="#3b0764" stroke="#c084fc" stroke-width="2"/>
            <text text-anchor="middle" fill="#faf5ff" font-size="11" font-weight="600" font-family="'Sarabun', 'TH Sarabun New', sans-serif">
              ${tspans}
            </text>
          </g>
        `);
        currentY += stepHeight + gapY;
      } else if (isLoop) {
        const lineHeight = 16;
        const startY = currentY + (stepHeight / 2) - ((lineCount - 1) * lineHeight / 2) + 4;
        const tspans = lines.map((l, i) => {
          const prefix = i === 0 ? '🔄 ' : '';
          return `<tspan x="${cx}" y="${startY + i * lineHeight}">${prefix}${this.escapeXml(l)}</tspan>`;
        }).join('');

        elements.push(`
          <g class="fc-step fc-loop">
            <rect x="${boxX}" y="${currentY}" width="${boxWidth}" height="${stepHeight}" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="4"/>
            <text text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="600" font-family="'Sarabun', 'TH Sarabun New', sans-serif">
              ${tspans}
            </text>
            <path d="M ${boxX + boxWidth} ${currentY + stepHeight / 2} H 500 V ${loopTargetY} H ${boxX + boxWidth + 4}" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3" marker-end="url(#arrowhead)"/>
          </g>
        `);
        currentY += stepHeight + 10;
      } else {
        const lineHeight = 16;
        const startY = currentY + (stepHeight / 2) - ((lineCount - 1) * lineHeight / 2) + 4;
        const tspans = lines.map((l, i) => `<tspan x="${cx}" y="${startY + i * lineHeight}">${this.escapeXml(l)}</tspan>`).join('');

        elements.push(`
          <g class="fc-step fc-process">
            <rect x="${boxX}" y="${currentY}" width="${boxWidth}" height="${stepHeight}" rx="6" fill="#1e293b" stroke="#0284c7" stroke-width="1.8"/>
            <text text-anchor="middle" fill="#f8fafc" font-size="11.5" font-family="'Sarabun', 'TH Sarabun New', sans-serif">
              ${tspans}
            </text>
          </g>
        `);
        currentY += stepHeight + gapY;
      }
    });

    const totalHeight = currentY + 20;
    return `
<svg id="lab-svg-root" xmlns="http://www.w3.org/2000/svg" width="520" height="${totalHeight}" viewBox="0 0 520 ${totalHeight}" style="background: transparent; max-width: 100%; height: auto; min-width: 300px; display: inline-block;">
  <defs>
    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
      <polygon points="0 0, 6 3, 0 6" fill="#10b981"/>
    </marker>
    <marker id="arrowhead-cyan" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
      <polygon points="0 0, 6 3, 0 6" fill="#38bdf8"/>
    </marker>
  </defs>
  ${elements.join("\n")}
</svg>
    `.trim();
  },

  renderFlowchartViewer: function(labId) {
    const chart = this.flowcharts[labId] || this.flowcharts["tier1_button_hold_1sw_1led"] || Object.values(this.flowcharts)[0];
    if (!chart) return `<div class="flowchart-empty">ไม่พบผังงานสำหรับแล็บนี้</div>`;

    const svg = this.generateSvg(labId);

    return `
      <div class="flowchart-viewer-card" style="max-width: 100%; overflow: hidden;">
        <div class="flowchart-viewer-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin: 0 0 4px 0; font-size: 16px; color: var(--text-main);">📊 ผังงานกระบวนการทำงาน (System Flowchart)</h3>
            <p style="margin: 0; font-size: 13px; color: var(--text-dim);">${this.escapeXml(chart.title)}</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="STUDIO_FLOWCHARTS.downloadSvg('${labId}')">💾 บันทึก SVG</button>
        </div>
        <div class="flowchart-canvas-wrapper" style="overflow-x: auto; text-align: center; padding: 20px 0; width: 100%; display: flex; justify-content: center;">
          ${svg}
        </div>
      </div>
    `;
  },

  downloadSvg: function(labId) {
    const svgContent = this.generateSvg(labId);
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flowchart_${labId}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

