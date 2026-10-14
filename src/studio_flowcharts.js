// ==========================================
// Dynamic SVG Flowchart Generator for All 80 Labs
// ==========================================

const LAB_FLOWCHARTS = {
  "tier1_button_hold_1sw_1led": {
    "title": "T1.01: Sample 01 - Push Button ควบคุม LED (Hold-to-Activate & Toggle)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRD: ขา D2 เป็น INPUT, DDRB: ขา D8 (PB0) เป็น OUTPUT"
      },
      {
        "type": "process",
        "text": "เปิด Internal Pull-up: PORTD |= (1 << PD2)"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดปุ่ม SW1? (!(PIND & (1 << PD2)))"
      },
      {
        "type": "process",
        "text": "ปุ่มถูกกด (Active-Low): สั่ง PORTB |= (1 << PB0) [LED ติด]"
      },
      {
        "type": "process",
        "text": "ปล่อยปุ่ม (Active-High): สั่ง PORTB &= ~(1 << PB0) [LED ดับ]"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบปุ่มกด"
      }
    ]
  },
  "tier1_button_hold_2sw_2led": {
    "title": "T1.02: Sample 02 - Dual Button Hold-to-Light (2 Switches, 2 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ Dual Button Hold-to-Light"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_button_hold_4sw_4led": {
    "title": "T1.03: Sample 03 - Quad Button Hold-to-Light (4 Switches, 4 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ Quad Button Hold-to-Light"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_button_toggle_1sw_1led": {
    "title": "T1.04: Sample 09 - สวิตช์ปุ่มกดแบบ Toggle (กดติด-กดดับ) และตรวจจับ Long-Press",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRD: D2 Input (Pull-up) | DDRB: PB0 Output"
      },
      {
        "type": "process",
        "text": "ตัวแปร led_state = 0, last_btn = 1"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจพบขอบขาลง? (last_btn==1 && cur_btn==0)"
      },
      {
        "type": "process",
        "text": "หน่วงเวลา 20 ms ขจัดสัญญาณกระดอน (Debounce)"
      },
      {
        "type": "process",
        "text": "สลับสถานะ: led_state ^= 1 -> ส่งออก PORTB"
      },
      {
        "type": "process",
        "text": "ตรวจจับการกดค้าง (Long-Press > 1.5s -> Reset)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปบันทึกสถานะปุ่มรอบถัดไป"
      }
    ]
  },
  "tier1_button_toggle_2sw_2led": {
    "title": "T1.05: Sample 05 - Dual Button Independent Toggle (2 Switches, 2 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ Dual Button Independent T"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_button_toggle_4sw_4led": {
    "title": "T1.06: Sample 06 - Quad Button Independent Toggle (4 Switches, 4 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ Quad Button Independent T"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_staircase_light_2sw_1led": {
    "title": "T1.07: Sample 07 - Two-Way Staircase Switch (2 Switches, 1 LED)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ Two-Way Staircase Switch "
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_radio_selector_3sw_3led": {
    "title": "T1.08: Sample 08 - 1-of-3 Exclusive Mode Selector (Radio Buttons)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ 1-of-3 Exclusive Mode Sel"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_multi_switch_quantity_led": {
    "title": "T1.09: Sample 03 - ระบบเลือกจำนวนหลอดไฟตามสวิตช์ 1 ถึง 4 ดวง (Quantity Selector)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ ระบบเลือกจำนวนหลอดไฟตามสว"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_multi_switch_or_alarm_led": {
    "title": "T1.10: Sample 10 - Multi-Switch OR Logic Emergency Alarm (3 Switches, 1 LED)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ Multi-Switch OR Logic Eme"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_industrial_start_stop_dual_led": {
    "title": "T1.11: Sample 02 - สวิตช์ 2 ปุ่ม ควบคุม LED 2 หลอด (Multi-Button Logic Control)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ สวิตช์ 2 ปุ่ม ควบคุม LED "
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_industrial_start_stop_jog_3sw": {
    "title": "T1.12: Sample 11 - Industrial Start / Stop / Jog Control (3 Switches, 2 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ Industrial Start / Stop /"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_safety_interlock_dual_hand": {
    "title": "T1.13: Sample 05 - ระบบความปลอดภัยควบคุมเครื่องจักรด้วยการกด 2 ปุ่มพร้อมกัน (Two-Hand Safety)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ ระบบความปลอดภัยควบคุมเครื"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_binary_counter_4bit_led": {
    "title": "T1.14: Sample 06 - วงจรนับเลขฐานสอง 4 บิต (0-15) แสดงผลผ่าน 4 LEDs พร้อมปุ่ม Up/Down",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ วงจรนับเลขฐานสอง 4 บิต (0"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_button_short_long_press_led": {
    "title": "T1.15: Sample 15 - Push Button Short Press vs Long Press Reset (1 SW, 4 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ Push Button Short Press v"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_led_bar_level_stepper": {
    "title": "T1.16: Sample 14 - 4-Level LED Bar Stepper (2 Buttons, 4 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ 4-Level LED Bar Stepper ("
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_alternating_blinker_hazard_strobe": {
    "title": "T1.17: Sample 07 - ไฟกะพริบสลับข้างและไฟฉุกเฉิน (Alternating Hazard Strobe) พร้อมปรับความเร็ว",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าทิศทางพอร์ต I/O (DDRB/DDRD) สำหรับ ไฟกะพริบสลับข้างและไฟฉุกเ"
      },
      {
        "type": "process",
        "text": "เปิดใช้งาน Internal Pull-up ให้สวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจสอบสัญญาณสวิตช์ Active-Low ผ่านรีจิสเตอร์ PINx"
      },
      {
        "type": "process",
        "text": "ขจัดสัญญาณกระดอน (Software Debounce) และประมวลผลลอจิก"
      },
      {
        "type": "process",
        "text": "อัปเดตสถานะหลอดไฟ LED ออกทางรีจิสเตอร์ PORTx"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบอินพุตรอบถัดไป"
      }
    ]
  },
  "tier1_button_dual_and_logic_1led": {
    "title": "T1.18: Sample 18 - Button Dual AND Logic (กดพร้อมกัน 2 ปุ่มเพื่อเปิด LED)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRB: ขา PB0 (D8) เป็น OUTPUT, DDRD: ขา PD2, PD3 (D2, D3) เป็น INPUT"
      },
      {
        "type": "process",
        "text": "เปิด Internal Pull-Up: PORTD |= (1 << PD2) | (1 << PD3)"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "กดทั้ง SW1 และ SW2? (!(PIND & PD2) && !(PIND & PD3))"
      },
      {
        "type": "process",
        "text": "เงื่อนไข AND เป็นจริง (กดคู่): PORTB |= (1 << PB0) [LED ติด]"
      },
      {
        "type": "process",
        "text": "เงื่อนไขเป็นเท็จ (ปล่อยปุ่มใดปุ่มหนึ่ง): PORTB &= ~(1 << PB0) [LED ดับ]"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปตรวจสอบสถานะปุ่มกด"
      }
    ]
  },
  "tier1_button_active_high_external_pd": {
    "title": "T1.19: Sample 19 - Button Active-High (วงจรพูลดาวน์ภายนอก External Pull-Down)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRD: ขา PD2 เป็น INPUT (ไม่เปิด Pull-up), DDRB: ขา PB0 เป็น OUTPUT"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "สัญญาณเข้าขา PD2 เป็น HIGH? (PIND & (1 << PD2))"
      },
      {
        "type": "process",
        "text": "กดปุ่ม (Active-High 5V): PORTB |= (1 << PB0) [LED ติด]"
      },
      {
        "type": "process",
        "text": "ปล่อยปุ่ม (Pull-down GND): PORTB &= ~(1 << PB0) [LED ดับ]"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปอ่านค่าระดับลอจิก"
      }
    ]
  },
  "tier1_button_press_accumulator_blink_n": {
    "title": "T1.20: Sample 20 - Button Press Accumulator (นับสะสมจำนวนครั้งที่กดเพื่อสั่งกะพริบ N ครั้ง)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า I/O และเปิด Pull-Up ให้ปุ่มกด, กำหนดตัวแปรนับ count = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจพบขอบขาลงของปุ่มกด? (Falling Edge + Debounce)"
      },
      {
        "type": "process",
        "text": "เพิ่มตัวแปรนับ: count++ (สะสมจำนวนการกด)"
      },
      {
        "type": "decision",
        "text": "ครบเงื่อนไขสั่งประมวลผลหรือไม่?"
      },
      {
        "type": "process",
        "text": "สั่งกะพริบหลอด LED ตามจำนวนรอบ count ครั้ง แล้วรีเซ็ตตัวนับ"
      },
      {
        "type": "loop_back",
        "text": "วนลูปกลับไปรอรับการกดปุ่มรอบใหม่"
      }
    ]
  },
  "tier2_led_knight_rider_pingpong": {
    "title": "T2.01: Sample 18 - Knight Rider / Ping-Pong 6-LED Scanner",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขาขับ LED และสวิตช์: Knight Rider / Ping-Pong "
      },
      {
        "type": "process",
        "text": "กำหนดค่าสถานะเริ่มต้น State Machine / Step Counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มเปลี่ยนโหมดหรือทริกเกอร์เหตุการณ์?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสเต็ปแพทเทิร์นแสงสว่างถัดไป (State Transition)"
      },
      {
        "type": "process",
        "text": "ส่งค่าลอจิกไบนารีออกพอร์ตแสดงผลไฟวิ่ง"
      },
      {
        "type": "loop_back",
        "text": "หน่วงเวลาจังหวะไฟวิ่งและวนลูปทำซ้ำ"
      }
    ]
  },
  "tier2_led_curtain_expand_contract": {
    "title": "T2.02: LED Curtain Expand Contract",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขาขับ LED และสวิตช์: T2.22: LED Curtain Expand"
      },
      {
        "type": "process",
        "text": "กำหนดค่าสถานะเริ่มต้น State Machine / Step Counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มเปลี่ยนโหมดหรือทริกเกอร์เหตุการณ์?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสเต็ปแพทเทิร์นแสงสว่างถัดไป (State Transition)"
      },
      {
        "type": "process",
        "text": "ส่งค่าลอจิกไบนารีออกพอร์ตแสดงผลไฟวิ่ง"
      },
      {
        "type": "loop_back",
        "text": "หน่วงเวลาจังหวะไฟวิ่งและวนลูปทำซ้ำ"
      }
    ]
  },
  "tier2_led_stacker_fill_drain": {
    "title": "T2.03: LED Stacker Fill Drain",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขาขับ LED และสวิตช์: T2.23: LED Stacker Fill D"
      },
      {
        "type": "process",
        "text": "กำหนดค่าสถานะเริ่มต้น State Machine / Step Counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มเปลี่ยนโหมดหรือทริกเกอร์เหตุการณ์?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสเต็ปแพทเทิร์นแสงสว่างถัดไป (State Transition)"
      },
      {
        "type": "process",
        "text": "ส่งค่าลอจิกไบนารีออกพอร์ตแสดงผลไฟวิ่ง"
      },
      {
        "type": "loop_back",
        "text": "หน่วงเวลาจังหวะไฟวิ่งและวนลูปทำซ้ำ"
      }
    ]
  },
  "tier2_led_chaser_6led_2buttons": {
    "title": "T2.04: Sample 03 - วงจรไฟวิ่ง LED 6 ดวง ควบคุมทิศทางและความเร็วด้วยสวิตช์",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRD: PD2..PD7 เป็น OUTPUT | PB0, PB1 เป็น INPUT Pull-up"
      },
      {
        "type": "process",
        "text": "ตัวแปร pattern = 0b000001, direction = 1, speed = 100ms"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ปุ่ม SW1 กด? -> สลับทิศทางวิ่ง (direction ^= 1)"
      },
      {
        "type": "decision",
        "text": "ปุ่ม SW2 กด? -> สลับความเร็ว (100ms <-> 250ms)"
      },
      {
        "type": "process",
        "text": "เลื่อนบิต: pattern = (direction) ? (pattern<<1) : (pattern>>1)"
      },
      {
        "type": "process",
        "text": "ส่งค่าออก PORTD (PD2..PD7) ขับหลอดไฟ 6 ดวง"
      },
      {
        "type": "loop_back",
        "text": "วนลูปไฟวิ่งสเต็ปถัดไป"
      }
    ]
  },
  "tier2_police_strobe_dual_led": {
    "title": "T2.05: Sample 20 - Dual Police Strobe & Alternating Flasher (1 SW, 2 LEDs)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขาขับ LED และสวิตช์: Dual Police Strobe & Alte"
      },
      {
        "type": "process",
        "text": "กำหนดค่าสถานะเริ่มต้น State Machine / Step Counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มเปลี่ยนโหมดหรือทริกเกอร์เหตุการณ์?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสเต็ปแพทเทิร์นแสงสว่างถัดไป (State Transition)"
      },
      {
        "type": "process",
        "text": "ส่งค่าลอจิกไบนารีออกพอร์ตแสดงผลไฟวิ่ง"
      },
      {
        "type": "loop_back",
        "text": "หน่วงเวลาจังหวะไฟวิ่งและวนลูปทำซ้ำ"
      }
    ]
  },
  "tier2_morse_code_sos_beacon": {
    "title": "T2.06: Morse Code SOS Beacon",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขาขับ LED และสวิตช์: T2.25: Morse Code SOS Bea"
      },
      {
        "type": "process",
        "text": "กำหนดค่าสถานะเริ่มต้น State Machine / Step Counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มเปลี่ยนโหมดหรือทริกเกอร์เหตุการณ์?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสเต็ปแพทเทิร์นแสงสว่างถัดไป (State Transition)"
      },
      {
        "type": "process",
        "text": "ส่งค่าลอจิกไบนารีออกพอร์ตแสดงผลไฟวิ่ง"
      },
      {
        "type": "loop_back",
        "text": "หน่วงเวลาจังหวะไฟวิ่งและวนลูปทำซ้ำ"
      }
    ]
  },
  "tier2_dual_traffic_intersection_6led": {
    "title": "T2.07: Dual Traffic Intersection 6LED",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขาขับ LED และสวิตช์: T2.26: Dual Traffic Inter"
      },
      {
        "type": "process",
        "text": "กำหนดค่าสถานะเริ่มต้น State Machine / Step Counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มเปลี่ยนโหมดหรือทริกเกอร์เหตุการณ์?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสเต็ปแพทเทิร์นแสงสว่างถัดไป (State Transition)"
      },
      {
        "type": "process",
        "text": "ส่งค่าลอจิกไบนารีออกพอร์ตแสดงผลไฟวิ่ง"
      },
      {
        "type": "loop_back",
        "text": "หน่วงเวลาจังหวะไฟวิ่งและวนลูปทำซ้ำ"
      }
    ]
  },
  "tier2_industrial_fsm_3state_machine": {
    "title": "T2.08: Industrial FSM 3State Machine",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขาขับ LED และสวิตช์: T2.27: Industrial FSM 3St"
      },
      {
        "type": "process",
        "text": "กำหนดค่าสถานะเริ่มต้น State Machine / Step Counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มเปลี่ยนโหมดหรือทริกเกอร์เหตุการณ์?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสเต็ปแพทเทิร์นแสงสว่างถัดไป (State Transition)"
      },
      {
        "type": "process",
        "text": "ส่งค่าลอจิกไบนารีออกพอร์ตแสดงผลไฟวิ่ง"
      },
      {
        "type": "loop_back",
        "text": "หน่วงเวลาจังหวะไฟวิ่งและวนลูปทำซ้ำ"
      }
    ]
  },
  "tier2_multiclick_mode_selector": {
    "title": "T2.09: Sample 10 - สวิตช์ปุ่มเดียวเปลี่ยนโหมดไฟ 5 สเต็ป (Sequential Mode Selector)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขาขับ LED และสวิตช์: สวิตช์ปุ่มเดียวเปลี่ยนโหม"
      },
      {
        "type": "process",
        "text": "กำหนดค่าสถานะเริ่มต้น State Machine / Step Counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มเปลี่ยนโหมดหรือทริกเกอร์เหตุการณ์?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสเต็ปแพทเทิร์นแสงสว่างถัดไป (State Transition)"
      },
      {
        "type": "process",
        "text": "ส่งค่าลอจิกไบนารีออกพอร์ตแสดงผลไฟวิ่ง"
      },
      {
        "type": "loop_back",
        "text": "หน่วงเวลาจังหวะไฟวิ่งและวนลูปทำซ้ำ"
      }
    ]
  },
  "tier2_traffic_light_pedestrian": {
    "title": "T2.10: Sample 17 - ระบบไฟจราจรคนข้ามอัจฉริยะ พร้อมนับถอยหลัง 7-Segment (Traffic Light)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขาขับ LED และสวิตช์: ระบบไฟจราจรคนข้ามอัจฉริยะ"
      },
      {
        "type": "process",
        "text": "กำหนดค่าสถานะเริ่มต้น State Machine / Step Counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มเปลี่ยนโหมดหรือทริกเกอร์เหตุการณ์?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสเต็ปแพทเทิร์นแสงสว่างถัดไป (State Transition)"
      },
      {
        "type": "process",
        "text": "ส่งค่าลอจิกไบนารีออกพอร์ตแสดงผลไฟวิ่ง"
      },
      {
        "type": "loop_back",
        "text": "หน่วงเวลาจังหวะไฟวิ่งและวนลูปทำซ้ำ"
      }
    ]
  },
  "tier3_7segment_auto_counter_blink_dp": {
    "title": "T3.01: Sample 23 - Auto 1-Second 0-9 Counter with Blinking DP on 7-Segment",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตารางรหัสเซกเมนต์ segCodes[] (Common Cathode)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับเซกเมนต์ a-g และสวิตช์ควบคุม: Auto 1-Second 0-9 Co"
      },
      {
        "type": "process",
        "text": "ตัวแปรค่าแสดงผลตัวเลข digit_val = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจจับอินพุตปุ่มกด หรือครบกำหนดรอบเวลา?"
      },
      {
        "type": "process",
        "text": "คำนวณค่าตัวเลขใหม่ (บวก/ลบ/สุ่ม/นับถอยหลัง)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสเซกเมนต์ segCodes[digit_val] ขับจอ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลขสเต็ปถัดไป"
      }
    ]
  },
  "tier3_7segment_counter_updown": {
    "title": "T3.02: Sample 04 - ตัวนับเลข 0-9 แสดงผลบน 7-Segment (Common Cathode)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตาราง 7-Segment segCodes[] (0-9 Common Cathode)"
      },
      {
        "type": "process",
        "text": "DDRD: ขับเซกเมนต์ a-g เป็น OUTPUT | PB0, PB1 เป็น INPUT Pull-up"
      },
      {
        "type": "process",
        "text": "ตัวแปร counter = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ปุ่ม SW_UP กด? -> counter = (counter + 1) % 10"
      },
      {
        "type": "decision",
        "text": "ปุ่ม SW_DOWN กด? -> counter = (counter == 0) ? 9 : counter - 1"
      },
      {
        "type": "process",
        "text": "ส่งค่า segCodes[counter] ออกพอร์ตขับ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปตรวจจับปุ่มและอัปเดตตัวเลข"
      }
    ]
  },
  "tier3_7segment_countdown_alarm_led": {
    "title": "T3.03: 7Segment Countdown Alarm LED",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตารางรหัสเซกเมนต์ segCodes[] (Common Cathode)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับเซกเมนต์ a-g และสวิตช์ควบคุม: T3.32: 7Segment Coun"
      },
      {
        "type": "process",
        "text": "ตัวแปรค่าแสดงผลตัวเลข digit_val = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจจับอินพุตปุ่มกด หรือครบกำหนดรอบเวลา?"
      },
      {
        "type": "process",
        "text": "คำนวณค่าตัวเลขใหม่ (บวก/ลบ/สุ่ม/นับถอยหลัง)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสเซกเมนต์ segCodes[digit_val] ขับจอ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลขสเต็ปถัดไป"
      }
    ]
  },
  "tier3_7segment_hex_counter_0_to_f": {
    "title": "T3.04: Sample 25 - Hexadecimal Counter (0 to F) on 7-Segment (Up/Down)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตารางรหัสเซกเมนต์ segCodes[] (Common Cathode)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับเซกเมนต์ a-g และสวิตช์ควบคุม: Hexadecimal Counter "
      },
      {
        "type": "process",
        "text": "ตัวแปรค่าแสดงผลตัวเลข digit_val = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจจับอินพุตปุ่มกด หรือครบกำหนดรอบเวลา?"
      },
      {
        "type": "process",
        "text": "คำนวณค่าตัวเลขใหม่ (บวก/ลบ/สุ่ม/นับถอยหลัง)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสเซกเมนต์ segCodes[digit_val] ขับจอ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลขสเต็ปถัดไป"
      }
    ]
  },
  "tier3_7segment_modulo_n_counter": {
    "title": "T3.05: 7Segment Modulo N Counter",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตารางรหัสเซกเมนต์ segCodes[] (Common Cathode)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับเซกเมนต์ a-g และสวิตช์ควบคุม: T3.34: 7Segment Modu"
      },
      {
        "type": "process",
        "text": "ตัวแปรค่าแสดงผลตัวเลข digit_val = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจจับอินพุตปุ่มกด หรือครบกำหนดรอบเวลา?"
      },
      {
        "type": "process",
        "text": "คำนวณค่าตัวเลขใหม่ (บวก/ลบ/สุ่ม/นับถอยหลัง)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสเซกเมนต์ segCodes[digit_val] ขับจอ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลขสเต็ปถัดไป"
      }
    ]
  },
  "tier3_7segment_spinner_ring_cw_ccw": {
    "title": "T3.06: 7Segment Spinner Ring CW CCW",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตารางรหัสเซกเมนต์ segCodes[] (Common Cathode)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับเซกเมนต์ a-g และสวิตช์ควบคุม: T3.35: 7Segment Spin"
      },
      {
        "type": "process",
        "text": "ตัวแปรค่าแสดงผลตัวเลข digit_val = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจจับอินพุตปุ่มกด หรือครบกำหนดรอบเวลา?"
      },
      {
        "type": "process",
        "text": "คำนวณค่าตัวเลขใหม่ (บวก/ลบ/สุ่ม/นับถอยหลัง)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสเซกเมนต์ segCodes[digit_val] ขับจอ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลขสเต็ปถัดไป"
      }
    ]
  },
  "tier3_7segment_word_letter_display": {
    "title": "T3.07: 7Segment Word Letter Display",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตารางรหัสเซกเมนต์ segCodes[] (Common Cathode)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับเซกเมนต์ a-g และสวิตช์ควบคุม: T3.36: 7Segment Word"
      },
      {
        "type": "process",
        "text": "ตัวแปรค่าแสดงผลตัวเลข digit_val = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจจับอินพุตปุ่มกด หรือครบกำหนดรอบเวลา?"
      },
      {
        "type": "process",
        "text": "คำนวณค่าตัวเลขใหม่ (บวก/ลบ/สุ่ม/นับถอยหลัง)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสเซกเมนต์ segCodes[digit_val] ขับจอ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลขสเต็ปถัดไป"
      }
    ]
  },
  "tier3_7segment_digital_roulette_wheel": {
    "title": "T3.08: 7Segment Digital Roulette Wheel",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตารางรหัสเซกเมนต์ segCodes[] (Common Cathode)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับเซกเมนต์ a-g และสวิตช์ควบคุม: T3.37: 7Segment Digi"
      },
      {
        "type": "process",
        "text": "ตัวแปรค่าแสดงผลตัวเลข digit_val = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจจับอินพุตปุ่มกด หรือครบกำหนดรอบเวลา?"
      },
      {
        "type": "process",
        "text": "คำนวณค่าตัวเลขใหม่ (บวก/ลบ/สุ่ม/นับถอยหลัง)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสเซกเมนต์ segCodes[digit_val] ขับจอ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลขสเต็ปถัดไป"
      }
    ]
  },
  "tier3_electronic_dice_7segment": {
    "title": "T3.09: Sample 15 - ลูกเต๋าอิเล็กทรอนิกส์ 1-6 สุ่มตัวเลขบน 7-Segment (Electronic Dice)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตารางรหัสเซกเมนต์ segCodes[] (Common Cathode)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับเซกเมนต์ a-g และสวิตช์ควบคุม: ลูกเต๋าอิเล็กทรอนิกส"
      },
      {
        "type": "process",
        "text": "ตัวแปรค่าแสดงผลตัวเลข digit_val = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจจับอินพุตปุ่มกด หรือครบกำหนดรอบเวลา?"
      },
      {
        "type": "process",
        "text": "คำนวณค่าตัวเลขใหม่ (บวก/ลบ/สุ่ม/นับถอยหลัง)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสเซกเมนต์ segCodes[digit_val] ขับจอ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลขสเต็ปถัดไป"
      }
    ]
  },
  "tier3_stopwatch_timer1_7segment": {
    "title": "T3.10: Sample 11 - นาฬิกาจับเวลา 0-9 วินาที ด้วย Hardware Timer1 CTC Mode แสดงผล 7-Segment",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "โหลดตารางรหัสเซกเมนต์ segCodes[] (Common Cathode)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตขับเซกเมนต์ a-g และสวิตช์ควบคุม: นาฬิกาจับเวลา 0-9 วิ"
      },
      {
        "type": "process",
        "text": "ตัวแปรค่าแสดงผลตัวเลข digit_val = 0"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "decision",
        "text": "ตรวจจับอินพุตปุ่มกด หรือครบกำหนดรอบเวลา?"
      },
      {
        "type": "process",
        "text": "คำนวณค่าตัวเลขใหม่ (บวก/ลบ/สุ่ม/นับถอยหลัง)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสเซกเมนต์ segCodes[digit_val] ขับจอ 7-Segment"
      },
      {
        "type": "loop_back",
        "text": "วนลูปแสดงผลตัวเลขสเต็ปถัดไป"
      }
    ]
  },
  "tier4_external_interrupt_int0": {
    "title": "T4.01: Sample 05 - ระบบอินเทอร์รัปต์ภายนอก (External Interrupt INT0) ควบคุม LED",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "DDRD: ขา PD2 (INT0) เป็น INPUT Pull-up | PB0 เป็น OUTPUT"
      },
      {
        "type": "process",
        "text": "ตั้งค่า EICRA: ตรวจจับขอบขาลง ISC01=1, ISC00=0 (Falling Edge)"
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์: EIMSK |= (1 << INT0)"
      },
      {
        "type": "process",
        "text": "เปิด Global Interrupt Flag: sei()"
      },
      {
        "type": "decision",
        "text": "วนซ้ำ Background Task ใน main()"
      },
      {
        "type": "decision",
        "text": "⚡ สัญญาณ INT0 เข้ามา? (กดปุ่มฉุกเฉิน)"
      },
      {
        "type": "process",
        "text": "พักการทำงาน CPU -> กระโดดเข้า ISR(INT0_vect)"
      },
      {
        "type": "process",
        "text": "สลับสถานะไฟเตือน PORTB ^= (1 << PB0) ทันที"
      },
      {
        "type": "loop_back",
        "text": "จบ ISR ด้วย reti และกลับสู่ลูปหลัก"
      }
    ]
  },
  "tier4_dual_external_interrupt_int0_int1": {
    "title": "T4.02: Dual External Interrupt INT0 INT1",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าโมดูลฮาร์ดแวร์ Timers / ADC: T4.41: Dual External I"
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์ หรือตั้งค่าความถี่สัญญาณนาฬิกา Prescaler"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อก ADC หรือรอสัญญาณอินเทอร์รัปต์ฮาร์ดแวร์"
      },
      {
        "type": "decision",
        "text": "ค่าที่ได้ข้ามเกณฑ์เงื่อนไข (Threshold Comparison)?"
      },
      {
        "type": "process",
        "text": "ปรับปรุง Duty Cycle PWM หรือเปลี่ยนสถานะเอาต์พุตแจ้งเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปมอนิเตอร์สัญญาณอย่างต่อเนื่อง"
      }
    ]
  },
  "tier4_timer1_ctc_1hz_precision_clock": {
    "title": "T4.03: Timer1 CTC 1Hz Precision Clock",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าโมดูลฮาร์ดแวร์ Timers / ADC: T4.42: Timer1 CTC 1Hz "
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์ หรือตั้งค่าความถี่สัญญาณนาฬิกา Prescaler"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อก ADC หรือรอสัญญาณอินเทอร์รัปต์ฮาร์ดแวร์"
      },
      {
        "type": "decision",
        "text": "ค่าที่ได้ข้ามเกณฑ์เงื่อนไข (Threshold Comparison)?"
      },
      {
        "type": "process",
        "text": "ปรับปรุง Duty Cycle PWM หรือเปลี่ยนสถานะเอาต์พุตแจ้งเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปมอนิเตอร์สัญญาณอย่างต่อเนื่อง"
      }
    ]
  },
  "tier4_adc_variable_blink_rate": {
    "title": "T4.04: Sample 29 - Variable LED Blink Rate Controlled by Potentiometer (ADC0)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าโมดูลฮาร์ดแวร์ Timers / ADC: Variable LED Blink Rat"
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์ หรือตั้งค่าความถี่สัญญาณนาฬิกา Prescaler"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อก ADC หรือรอสัญญาณอินเทอร์รัปต์ฮาร์ดแวร์"
      },
      {
        "type": "decision",
        "text": "ค่าที่ได้ข้ามเกณฑ์เงื่อนไข (Threshold Comparison)?"
      },
      {
        "type": "process",
        "text": "ปรับปรุง Duty Cycle PWM หรือเปลี่ยนสถานะเอาต์พุตแจ้งเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปมอนิเตอร์สัญญาณอย่างต่อเนื่อง"
      }
    ]
  },
  "tier4_adc_schmitt_trigger_hysteresis": {
    "title": "T4.05: ADC Schmitt Trigger Hysteresis",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าโมดูลฮาร์ดแวร์ Timers / ADC: T4.44: ADC Schmitt Tri"
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์ หรือตั้งค่าความถี่สัญญาณนาฬิกา Prescaler"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อก ADC หรือรอสัญญาณอินเทอร์รัปต์ฮาร์ดแวร์"
      },
      {
        "type": "decision",
        "text": "ค่าที่ได้ข้ามเกณฑ์เงื่อนไข (Threshold Comparison)?"
      },
      {
        "type": "process",
        "text": "ปรับปรุง Duty Cycle PWM หรือเปลี่ยนสถานะเอาต์พุตแจ้งเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปมอนิเตอร์สัญญาณอย่างต่อเนื่อง"
      }
    ]
  },
  "tier4_adc_window_comparator_3led": {
    "title": "T4.06: Sample 30 - 3-Level Voltage Window Comparator with 3 LEDs (ADC0)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าโมดูลฮาร์ดแวร์ Timers / ADC: 3-Level Voltage Window"
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์ หรือตั้งค่าความถี่สัญญาณนาฬิกา Prescaler"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อก ADC หรือรอสัญญาณอินเทอร์รัปต์ฮาร์ดแวร์"
      },
      {
        "type": "decision",
        "text": "ค่าที่ได้ข้ามเกณฑ์เงื่อนไข (Threshold Comparison)?"
      },
      {
        "type": "process",
        "text": "ปรับปรุง Duty Cycle PWM หรือเปลี่ยนสถานะเอาต์พุตแจ้งเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปมอนิเตอร์สัญญาณอย่างต่อเนื่อง"
      }
    ]
  },
  "tier4_adc_battery_monitor_low_warn": {
    "title": "T4.07: ADC Battery Monitor Low Warn",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าโมดูลฮาร์ดแวร์ Timers / ADC: T4.46: ADC Battery Mon"
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์ หรือตั้งค่าความถี่สัญญาณนาฬิกา Prescaler"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อก ADC หรือรอสัญญาณอินเทอร์รัปต์ฮาร์ดแวร์"
      },
      {
        "type": "decision",
        "text": "ค่าที่ได้ข้ามเกณฑ์เงื่อนไข (Threshold Comparison)?"
      },
      {
        "type": "process",
        "text": "ปรับปรุง Duty Cycle PWM หรือเปลี่ยนสถานะเอาต์พุตแจ้งเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปมอนิเตอร์สัญญาณอย่างต่อเนื่อง"
      }
    ]
  },
  "tier4_adc_pwm_dimmer_timer0": {
    "title": "T4.08: Sample 13 - วงจรหรี่ไฟ LED ด้วย Hardware Timer0 Fast PWM ควบคุมด้วย Potentiometer",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "Init ADC: ADMUX (AVcc, A0), ADCSRA (ADEN, Prescaler 128)"
      },
      {
        "type": "process",
        "text": "Init Timer0: Fast PWM (WGM01|WGM00), Non-Inverting (COM0A1)"
      },
      {
        "type": "process",
        "text": "DDRD: ขา PD6 (OC0A) เป็น OUTPUT ขับไฟหรี่"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "เริ่มอ่าน ADC: ADCSRA |= (1 << ADSC)"
      },
      {
        "type": "process",
        "text": "รอจนกว่าแปลงเสร็จ: while (ADCSRA & (1 << ADSC))"
      },
      {
        "type": "process",
        "text": "สเกลค่า: OCR0A = (uint8_t)(ADC >> 2) [แปลง 10 บิต -> 8 บิต]"
      },
      {
        "type": "loop_back",
        "text": "ปรับความกว้างพัลส์ PWM สว่างเรียบเนียน"
      }
    ]
  },
  "tier4_adc_potentiometer_led_bar": {
    "title": "T4.09: Sample 06 - การอ่านสัญญาณแอนะล็อก (ADC) ด้วย Potentiometer ขับ LED Bar Graph",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าโมดูลฮาร์ดแวร์ Timers / ADC: การอ่านสัญญาณแอนะล็อก "
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์ หรือตั้งค่าความถี่สัญญาณนาฬิกา Prescaler"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อก ADC หรือรอสัญญาณอินเทอร์รัปต์ฮาร์ดแวร์"
      },
      {
        "type": "decision",
        "text": "ค่าที่ได้ข้ามเกณฑ์เงื่อนไข (Threshold Comparison)?"
      },
      {
        "type": "process",
        "text": "ปรับปรุง Duty Cycle PWM หรือเปลี่ยนสถานะเอาต์พุตแจ้งเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปมอนิเตอร์สัญญาณอย่างต่อเนื่อง"
      }
    ]
  },
  "tier4_adc_dual_channel_a0_a1": {
    "title": "T4.10: ADC Dual Channel A0 A1",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าโมดูลฮาร์ดแวร์ Timers / ADC: T4.47: ADC Dual Channe"
      },
      {
        "type": "process",
        "text": "เปิดสวิตช์อินเทอร์รัปต์ หรือตั้งค่าความถี่สัญญาณนาฬิกา Prescaler"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแอนะล็อก ADC หรือรอสัญญาณอินเทอร์รัปต์ฮาร์ดแวร์"
      },
      {
        "type": "decision",
        "text": "ค่าที่ได้ข้ามเกณฑ์เงื่อนไข (Threshold Comparison)?"
      },
      {
        "type": "process",
        "text": "ปรับปรุง Duty Cycle PWM หรือเปลี่ยนสถานะเอาต์พุตแจ้งเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนลูปมอนิเตอร์สัญญาณอย่างต่อเนื่อง"
      }
    ]
  },
  "tier5_lcd1602_hello_world_static": {
    "title": "T5.01: Sample 33 - Static 2-Line Text Display \"Hello World!\" on LCD1602",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: Static 2-Line Text Dis"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier5_lcd1602_student_id_name": {
    "title": "T5.02: Sample 34 - Student ID and Name Display on LCD1602",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: Student ID and Name Di"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier5_lcd1602_button_text_switcher": {
    "title": "T5.03: Sample 35 - Button-Triggered LCD Message Switcher (3 Buttons)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: Button-Triggered LCD M"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier5_lcd1602_simple_counter_00_99": {
    "title": "T5.04: Sample 36 - Simple Up/Down Counter (00-99) with ASCII Formatting on LCD1602",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: Simple Up/Down Counter"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier5_lcd1602_custom_characters_cgram": {
    "title": "T5.05: Sample 37 - Custom Character Icons in CGRAM (Heart, Battery, Smile, Bell)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: Custom Character Icons"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier5_lcd1602_direct_adc_volt_display": {
    "title": "T5.06: Sample 38 - Direct ADC and Voltage Measurement on LCD1602",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: Direct ADC and Voltage"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier5_lcd1602_4bit_text_scroll": {
    "title": "T5.07: Sample 07 - หน้าจอ LCD 16x2 โหมด 4-Bit (HD44780 Controller)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งคำสั่ง 4-Bit Init: 0x03, 0x03, 0x03, 0x02 -> 0x28, 0x0C, 0x06, 0x01"
      },
      {
        "type": "process",
        "text": "ข้อความคงที่ Line 1: 'CDTI EMBEDDED'"
      },
      {
        "type": "process",
        "text": "ข้อความเลื่อน Line 2: 'WELCOME TO PRACTICAL EXAM 2026'"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "ตัดสตริง 16 ตัวอักษรตามตำแหน่ง Offset เริ่มต้น"
      },
      {
        "type": "process",
        "text": "ส่งข้อมูลตัวอักษรลงบรรทัดที่ 2 ผ่านฟังก์ชัน lcd_print()"
      },
      {
        "type": "process",
        "text": "offset = (offset + 1) % total_len | หน่วงเวลา 300 ms"
      },
      {
        "type": "loop_back",
        "text": "เลื่อนตัวอักษรต่อไปอย่างต่อเนื่อง"
      }
    ]
  },
  "tier5_reaction_game_lcd_button": {
    "title": "T5.08: Sample 12 - เกมทดสอบความเร็วในการตอบสนอง (Reaction Time Game) บน LCD 16x2",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: เกมทดสอบความเร็วในการต"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier5_pin_code_lock_lcd_buttons": {
    "title": "T5.09: Sample 16 - ระบบล็อครหัสผ่านความปลอดภัย 4 หลัก (PIN Code Lock) บน LCD 16x2",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: ระบบล็อครหัสผ่านความปล"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier5_lcd_menu_controller_4buttons": {
    "title": "T5.10: Sample 14 - เมนูควบคุมแบบโต้ตอบหลายระดับบน LCD 16x2 ด้วยสวิตช์ 4 ปุ่ม",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: เมนูควบคุมแบบโต้ตอบหลา"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier5_analog_thermostat_fan_controller": {
    "title": "T5.11: Sample 18 - ระบบควบคุมอุณหภูมิ/พัดลมอัตโนมัติด้วย Potentiometer, PWM และ LCD",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "Init LCD 16x2 (4-Bit) | Init ADC0 (A0) | Init Timer1 PWM (OC1A)"
      },
      {
        "type": "process",
        "text": "DDRB: ขา PB1 (OC1A/พัดลม) และ PB0 (Alarm LED) เป็น OUTPUT"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "อ่านค่าแรงดันเซนเซอร์อุณหภูมิ: adc_val = adc_read()"
      },
      {
        "type": "process",
        "text": "คำนวณอุณหภูมิ: temp_c = (adc_val * 500UL) / 1024UL"
      },
      {
        "type": "decision",
        "text": "temp_c > 40°C? -> ติดไฟเตือน Alarm และเร่งพัดลม 100%"
      },
      {
        "type": "process",
        "text": "คำนวณ PWM Duty Cycle แปรผันตามอุณหภูมิ -> อัปเดต OCR1A"
      },
      {
        "type": "process",
        "text": "แสดงผล 'TEMP: xx.x C' และ Bar Graph บน LCD"
      },
      {
        "type": "loop_back",
        "text": "วนลูปควบคุมอุณหภูมิและรอบพัดลม"
      }
    ]
  },
  "tier5_master_system_adc_lcd_voltmeter": {
    "title": "T5.12: Sample 08 - Master Exam System: โวลต์มิเตอร์ดิจิทัลแบบหลายจอแสดงผล",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ส่งสัญญาณ Reset และ Init จอ LCD 16x2 โหมด 4 บิต (0x28, 0x0C, 0x01)"
      },
      {
        "type": "process",
        "text": "โหลดข้อความและพารามิเตอร์เริ่มต้น: Master Exam System: โว"
      },
      {
        "type": "decision",
        "text": "วนซ้ำตลอดเวลา? (while 1)"
      },
      {
        "type": "process",
        "text": "สแกนสวิตช์เมนู หรืออ่านค่าเซนเซอร์แบบเรียลไทม์"
      },
      {
        "type": "process",
        "text": "จัดฟอร์แมตสตริงตัวอักษรและตำแหน่งเคอร์เซอร์ (Line 1/2)"
      },
      {
        "type": "process",
        "text": "ส่งรหัสข้อมูลอักษรออกทาง LCD Bus (D4-D7) ด้วยพัลส์ EN"
      },
      {
        "type": "loop_back",
        "text": "วนลูปอัปเดตหน้าจอโต้ตอบกับผู้ใช้งาน"
      }
    ]
  },
  "tier6_multitasking_dual_blink_nonblocking": {
    "title": "T6.01: Sample 63 - Multitasking Dual Blink (ระบบสองงานคู่ขนานแบบ Non-Blocking)",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าพอร์ต LED1 (PB0) และ LED2 (PB1) เป็น OUTPUT"
      },
      {
        "type": "process",
        "text": "กำหนดตัวจับเวลา t1_prev = 0, t2_prev = 0"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "decision",
        "text": "Task 1: เวลาผ่านไปครบ Period 1 (เช่น 500 ms)?"
      },
      {
        "type": "process",
        "text": "สลับสถานะ LED1 และบันทึกเวลา t1_prev ใหม่"
      },
      {
        "type": "decision",
        "text": "Task 2: เวลาผ่านไปครบ Period 2 (เช่น 200 ms)?"
      },
      {
        "type": "process",
        "text": "สลับสถานะ LED2 และบันทึกเวลา t2_prev ใหม่"
      },
      {
        "type": "loop_back",
        "text": "วนกลับไปตรวจเช็กเวลาทันทีโดยไม่ติดบล็อก"
      }
    ]
  },
  "tier6_multitasking_heartbeat_debounce_chaser": {
    "title": "T6.02: Sample 64 - Multitasking Heartbeat, Debounce & Chaser",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าพอร์ต LED Chaser, Heartbeat LED และสวิตช์อินพุต"
      },
      {
        "type": "decision",
        "text": "วนรอบการทำงาน (Super Loop)?"
      },
      {
        "type": "process",
        "text": "Task 1 (Heartbeat): สลับสถานะไฟบ่งชี้ระบบรันปกติทุก 1000 ms"
      },
      {
        "type": "process",
        "text": "Task 2 (Debounce): สแกนอ่านค่าปุ่มกดและกรองสัญญาณกระดอนทุก 10 ms"
      },
      {
        "type": "process",
        "text": "Task 3 (Chaser): เลื่อนสเต็ปไฟวิ่งตามช่วงเวลาที่กำหนดอย่างลื่นไหล"
      },
      {
        "type": "loop_back",
        "text": "วนลูปบริหารเวลารอบถัดไป"
      }
    ]
  },
  "tier6_multitasking_cooperative_scheduler_1ms_tick": {
    "title": "T6.03: Sample 65 - Cooperative Scheduler 1ms Tick",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า Timer0 CTC Mode สร้างอินเทอร์รัปต์ System Tick ทุก 1 ms"
      },
      {
        "type": "process",
        "text": "ลงทะเบียนภารกิจ Task Table (Task 100ms, Task 500ms, Task 1000ms)"
      },
      {
        "type": "decision",
        "text": "เกิดสัญญาณ Timer ISR (System Tick)?"
      },
      {
        "type": "process",
        "text": "อัปเดตตัวนับหน่วงเวลาของแต่ละภารกิจในตารางคิว"
      },
      {
        "type": "decision",
        "text": "มี Task ใดถึงกำหนดเวลาประมวลผล?"
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
    "title": "T6.04: Sample 66 - 7-Segment Background Counter & Interactive Task",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าพอร์ตขับ 7-Segment, หลอดไฟ LED และสวิตช์ปุ่มกด"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop? (while 1)"
      },
      {
        "type": "process",
        "text": "Background Task: ตรวจเช็กเวลา 1 วินาทีเพื่อนับเลขและอัปเดต 7-Segment"
      },
      {
        "type": "process",
        "text": "Foreground Task: อ่านปุ่มกดทันที สั่งเปิด/ปิดไฟ LED ตอบสนองทันใจ"
      },
      {
        "type": "loop_back",
        "text": "วนกลับไปประมวลผลงานคู่ขนาน"
      }
    ]
  },
  "tier6_multitasking_adc_sensor_monitor_background_strobe": {
    "title": "T6.05: Sample 67 - ADC Sensor Monitor & Background Strobe",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า ADC อ่านค่า Potentiometer (A0) และพอร์ตขับหลอดไฟแจ้งเตือน"
      },
      {
        "type": "decision",
        "text": "วนรอบการประมวลผล?"
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
        "text": "วนลูปทำงานคู่ขนานต่อเนื่อง"
      }
    ]
  },
  "tier6_multitasking_traffic_light_pedestrian_beeper": {
    "title": "T6.06: Sample 68 - Multitasking Traffic Light with Pedestrian Crossing",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กำหนดพอร์ตไฟเขียว/เหลือง/แดง, ไฟคนข้าม และปุ่มกดขอทาง"
      },
      {
        "type": "decision",
        "text": "FSM State: สถานะไฟจราจรปัจจุบัน?"
      },
      {
        "type": "process",
        "text": "ประมวลผล State: เขียว -> เหลือง -> แดง (ตามเวลาที่กำหนด)"
      },
      {
        "type": "decision",
        "text": "มีการกดปุ่มคนขอข้ามถนน (Pedestrian Request)?"
      },
      {
        "type": "process",
        "text": "เปลี่ยนสู่เฟสไฟแดงและเปิดสัญญาณไฟคนข้ามพร้อมส่งพัลส์เสียงเตือน"
      },
      {
        "type": "loop_back",
        "text": "วนรอบ State Machine ต่อเนื่อง"
      }
    ]
  },
  "tier6_multitasking_lcd_display_smooth_led_chaser": {
    "title": "T6.07: Sample 69 - Non-Blocking LCD Display & Smooth Chaser",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าจอ LCD 1602 และพอร์ตขับไฟวิ่ง LED"
      },
      {
        "type": "decision",
        "text": "วนรอบการทำงาน Super Loop?"
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
        "text": "วนลูปทำงานคู่ขนานโดยไฟวิ่งไม่กระตุก"
      }
    ]
  },
  "tier6_multitasking_round_robin_executive_master": {
    "title": "T6.08: Sample 70 - Round-Robin Executive Master",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าฮาร์ดแวร์ระบบทั้งหมดและเตรียมคิวภารกิจ Round-Robin"
      },
      {
        "type": "decision",
        "text": "วนรอบ Super Loop (Executive Loop)?"
      },
      {
        "type": "process",
        "text": "Slot 1: ตรวจสอบและประมวลผลอินพุตสวิตช์ (Input Scan)"
      },
      {
        "type": "process",
        "text": "Slot 2: อ่านค่าเซนเซอร์แอนะล็อกและกรองสัญญาณ (Sensor Processing)"
      },
      {
        "type": "process",
        "text": "Slot 3: ประมวลผลตรรกะระบบและสถานะ FSM (State Machine Engine)"
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
    "title": "T7.01: Sample 71 - Industrial Process Chemical Mixer",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าพอร์ตมอเตอร์, ฮีตเตอร์, วาล์ว, ป้อนข้อมูล ADC และปุ่มควบคุม"
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
        "text": "กดปุ่มหยุดฉุกเฉิน (Emergency Stop) หรือสารเคมีเกินพิกัด?"
      },
      {
        "type": "process",
        "text": "ตัดการทำงานของมอเตอร์และฮีตเตอร์ทันที (Safety Interlock)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปประมวลผลวงจรกวนสารเคมี"
      }
    ]
  },
  "tier7_multitasking_digital_scale_batch_doser": {
    "title": "T7.02: Sample 72 - Digital Scale & Batch Doser",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าพอร์ตวาล์วจ่าย, มอเตอร์ป้อนสาร และเซนเซอร์ชั่งน้ำหนัก (ADC)"
      },
      {
        "type": "process",
        "text": "กรองสัญญาณน้ำหนักด้วยอัลกอริทึม Moving Average Filter"
      },
      {
        "type": "decision",
        "text": "น้ำหนักถึงค่าเป้าหมายที่ตั้งไว้ (Target Weight)?"
      },
      {
        "type": "process",
        "text": "ปิดวาล์วป้อนสารทันทีและส่งสัญญาณแจ้งเตือนสิ้นสุดแบทช์"
      },
      {
        "type": "loop_back",
        "text": "วนรอบพร้อมรับคำสั่งชั่งแบทช์ถัดไป"
      }
    ]
  },
  "tier7_multitasking_medical_patient_monitor": {
    "title": "T7.03: Sample 73 - Medical Patient Vital Signs Monitor",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าพอร์ตแจ้งเตือน, จอแสดงผล และตัวแปลงสัญญาณชีพแอนะล็อก"
      },
      {
        "type": "decision",
        "text": "วนรอบการประมวลผลสัญญาณชีพ?"
      },
      {
        "type": "process",
        "text": "คำนวณอัตราชีพจร (Heart Rate BPM) และสังเคราะห์พัลส์ QRS"
      },
      {
        "type": "decision",
        "text": "ค่าชีพจรหลุดช่วงปกติ (< 50 หรือ > 120 bpm)?"
      },
      {
        "type": "process",
        "text": "เปิดไซเรนและส่งสัญญาณเตือนภาวะฉุกเฉิน (Arrhythmia Alarm)"
      },
      {
        "type": "loop_back",
        "text": "วนลูปติดตามสัญญาณชีพต่อเนื่อง"
      }
    ]
  },
  "tier7_multitasking_smart_elevator_dispatcher": {
    "title": "T7.04: Sample 74 - Smart Elevator Dispatcher",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าปุ่มกดเรียกลิฟต์ 4 ชั้น, จอ 7-Segment และไฟสถานะทิศทาง"
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
    "title": "T7.05: Sample 75 - Security Vault Access & Lockout System",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าระบบรับรหัสผ่าน PIN, กลอนแม่เหล็กไฟฟ้า และไฟสถานะความปลอดภัย"
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
        "text": "วนลูปตรวจจับสิทธิ์การเข้าถึง"
      }
    ]
  },
  "tier7_multitasking_greenhouse_climate_hvac": {
    "title": "T7.06: Sample 76 - Greenhouse Climate HVAC Controller",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าพอร์ตควบคุมพัดลม, สเปรย์น้ำ, ฮีตเตอร์ และเซนเซอร์สภาพอากาศ"
      },
      {
        "type": "process",
        "text": "อ่านค่าอุณหภูมิและความชื้นจากอินพุตเซนเซอร์แอนะล็อก"
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
    "title": "T7.07: Sample 77 - Highway Toll Gate & Barrier System",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่ามอเตอร์ไม้กั้น, ไฟเขียว/แดง และลูปตรวจจับยานพาหนะ"
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
    "title": "T7.08: Sample 78 - Dual Display Industrial Workcell",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่าจอ 7-Segment, จอ LCD 1602 และระบบตรวจจับสายพานการผลิต"
      },
      {
        "type": "decision",
        "text": "วนรอบการควบคุมสายพานการผลิต?"
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
        "text": "วนลูปประมวลผลเวิร์กสเตชันโรงงานต่อเนื่อง"
      }
    ]
  },
  "tier7_multitasking_solar_mppt_bms_hybrid": {
    "title": "T7.09: Sample 79 - Solar MPPT & Battery Management Hybrid",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "ตั้งค่า ADC วัดแรงดัน/กระแสแผงโซลาร์ และระบบตัดต่อชาร์จแบตเตอรี่"
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
    "title": "T7.10: Sample 80 - Ultimate Grand Prix Master Executive",
    "steps": [
      {
        "type": "term",
        "text": "เริ่มต้น (Power ON / Reset)"
      },
      {
        "type": "process",
        "text": "กําหนดการทำงานของโมดูลฮาร์ดแวร์ทั้งหมด: Timers, ADC, I/O และหน้าจอ"
      },
      {
        "type": "process",
        "text": "สร้าง System Heartbeat และบริหารตารางภารกิจแบบ Cooperative Tick"
      },
      {
        "type": "decision",
        "text": "วนรอบ Executive Loop (Master Control)?"
      },
      {
        "type": "process",
        "text": "สแกนและประมวลผลอินพุต, แปลงค่าแอนะล็อก, รัน Finite State Machine"
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


// Flowchart Engine
const STUDIO_FLOWCHARTS = {
  flowcharts: LAB_FLOWCHARTS,

  generateSvg: function(labId) {
    const chart = this.flowcharts[labId] || this.flowcharts["tier1_button_hold_1sw_1led"] || Object.values(this.flowcharts)[0];
    if (!chart || !chart.steps) {
      return '<svg width="360" height="100"><text x="180" y="50" fill="#94a3b8" text-anchor="middle">ไม่พบข้อมูลผังงาน</text></svg>';
    }

    const boxWidth = 270;
    const boxHeight = 44;
    const diamondWidth = 230;
    const diamondHeight = 54;
    const gapY = 28;
    let currentY = 24;

    const elements = [];

    chart.steps.forEach((step, idx) => {
      const isLast = idx === chart.steps.length - 1;

      // Draw arrow to next step
      if (!isLast && step.type !== "loop_back") {
        const nextStep = chart.steps[idx + 1];
        const stepH = (step.type === "decision") ? diamondHeight : boxHeight;
        const arrowStartY = currentY + stepH;
        const arrowEndY = arrowStartY + gapY;

        elements.push(`
          <line x1="170" y1="${arrowStartY}" x2="170" y2="${arrowEndY}" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead)"/>
        `);
      }

      if (step.type === "term") {
        elements.push(`
          <g class="fc-step fc-terminal">
            <rect x="50" y="${currentY}" width="240" height="40" rx="20" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
            <text x="170" y="${currentY + 25}" text-anchor="middle" fill="#ecfdf5" font-size="12" font-weight="700" font-family="'Sarabun', sans-serif">${step.text}</text>
          </g>
        `);
        currentY += 40 + gapY;
      } else if (step.type === "decision") {
        const cx = 170;
        const cy = currentY + diamondHeight / 2;
        const hw = diamondWidth / 2;
        const hh = diamondHeight / 2;
        const points = `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`;

        elements.push(`
          <g class="fc-step fc-decision">
            <polygon points="${points}" fill="#2e1065" stroke="#a855f7" stroke-width="2"/>
            <text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="#f3e8ff" font-size="10.5" font-weight="600" font-family="'Sarabun', sans-serif">${step.text}</text>
          </g>
        `);
        currentY += diamondHeight + gapY;
      } else if (step.type === "loop_back") {
        elements.push(`
          <g class="fc-step fc-loop">
            <rect x="35" y="${currentY}" width="${boxWidth}" height="${boxHeight}" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4"/>
            <text x="170" y="${currentY + 26}" text-anchor="middle" fill="#38bdf8" font-size="11.5" font-weight="600" font-family="'Sarabun', sans-serif">🔄 ${step.text}</text>
            <path d="M 305 ${currentY + 22} H 335 V 155 H 290" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="3" marker-end="url(#arrowhead-cyan)"/>
          </g>
        `);
        currentY += boxHeight + 10;
      } else {
        elements.push(`
          <g class="fc-step fc-process">
            <rect x="35" y="${currentY}" width="${boxWidth}" height="${boxHeight}" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8"/>
            <text x="170" y="${currentY + 26}" text-anchor="middle" fill="#f8fafc" font-size="11" font-family="'Sarabun', sans-serif">${step.text}</text>
          </g>
        `);
        currentY += boxHeight + gapY;
      }
    });

    const totalHeight = currentY + 20;
    return `
<svg id="lab-svg-root" xmlns="http://www.w3.org/2000/svg" width="360" height="${totalHeight}" viewBox="0 0 360 ${totalHeight}" style="background: transparent;">
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
      <div class="flowchart-viewer-card">
        <div class="flowchart-viewer-header">
          <div>
            <h3>📊 ผังงานกระบวนการทำงาน (System Flowchart)</h3>
            <p>${chart.title}</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="STUDIO_FLOWCHARTS.downloadSvg('${labId}')">💾 บันทึก SVG</button>
        </div>
        <div class="flowchart-canvas-wrapper" style="overflow-x: auto; text-align: center; padding: 20px 0;">
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
