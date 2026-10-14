// studio_datasheets.js - Interactive Datasheet and Pinout Reference for AVR Practical Exam Studio
// Provides detailed technical specifications, pinout tables, register maps, and practical pitfalls for 8 components

const STUDIO_DATASHEETS = {
  activeDevice: 'lcd1602',

  devices: {
    lcd1602: {
      name: 'จอ LCD 1602A (HD44780 Controller)',
      icon: '📟',
      category: 'Display / Output',
      voltage: '4.5V - 5.5V DC (ปกติ 5.0V)',
      current: '1.2 - 2.5 mA (ไม่รวม Backlight), Backlight LED ~20 - 30 mA',
      summary: 'โมดูลจอแสดงผลตัวอักษร 16 ตัวอักษร &times; 2 แถว ชิปคอนโทรลเลอร์มาตรฐาน HD44780 หรือเบอร์เทียบเท่า (ST7066U/KS0066) รองรับการรับส่งข้อมูลทั้งแบบ 8-bit และ 4-bit (ซึ่งนิยมใช้แบบ 4-bit เพื่อประหยัดขา Microcontroller จาก 8 เหลือ 4 ขา)',
      pinout: [
        { pin: 1, name: 'VSS', type: 'Power', desc: 'กราวด์ (GND 0V)' },
        { pin: 2, name: 'VDD', type: 'Power', desc: 'ไฟเลี้ยงระบบ (+5V)' },
        { pin: 3, name: 'V0', type: 'Analog', desc: 'ปรับความคมชัด (Contrast Voltage: 0V - 0.5V ผ่านขากลาง Potentiometer 10k)' },
        { pin: 4, name: 'RS', type: 'Control', desc: 'Register Select: LOW = สั่งงาน Command (0x01, 0x80), HIGH = ส่งตัวอักษร Data' },
        { pin: 5, name: 'RW', type: 'Control', desc: 'Read / Write: ต่อลง GND เสมอสำหรับการเขียนข้อมูลอย่างเดียว (Write Only)' },
        { pin: 6, name: 'E', type: 'Control', desc: 'Enable Strobe: พัลส์สัญญาณขอบขาลง (HIGH -> LOW) กว้าง &ge; 450 ns เพื่อให้อ่านคำสั่ง' },
        { pin: '7-10', name: 'D0 - D3', type: 'Data Bus', desc: 'ดาต้าบิตต่ำ: สำหรับโหมด 8-bit (ในโหมด 4-bit ปล่อยลอย Floating หรือต่อ GND)' },
        { pin: '11-14', name: 'D4 - D7', type: 'Data Bus', desc: 'ดาต้าบิตสูง: รับส่งข้อมูล 4-bit นิยมต่อเข้าขาพิน MCU (เช่น D4-D7 บน Arduino Uno)' },
        { pin: 15, name: 'A (LED+)', type: 'Power', desc: 'ขั้วบวกไฟ Backlight (+5V ผ่านตัวต้านทาน 220Ω หรือ 330Ω ป้องกันหลอดขาด)' },
        { pin: 16, name: 'K (LED-)', type: 'Power', desc: 'ขั้วลบไฟ Backlight (ต่อลง GND 0V)' }
      ],
      commands: [
        { cmd: '0x01', desc: 'Clear Display (ล้างจอทั้งหมด และรีเซ็ตเคอร์เซอร์ไปแถว 1 ช่อง 1)' },
        { cmd: '0x02', desc: 'Return Home (นำเคอร์เซอร์กลับแถว 1 ช่อง 1 โดยไม่ลบแรม DDRAM)' },
        { cmd: '0x06', desc: 'Entry Mode Set (เคอร์เซอร์เลื่อนไปทางขวาอัตโนมัติเมื่อพิมพ์ตัวอักษร)' },
        { cmd: '0x0C', desc: 'Display ON (เปิดการแสดงผล, ปิดเคอร์เซอร์ขีดล่าง, ปิดการกะพริบ)' },
        { cmd: '0x0E', desc: 'Display ON, Cursor Underline ON (เปิดจอ พร้อมขีดเส้นใต้เคอร์เซอร์)' },
        { cmd: '0x0F', desc: 'Display ON, Cursor Blink ON (เปิดจอ พร้อมเคอร์เซอร์สี่เหลี่ยมกะพริบ)' },
        { cmd: '0x28', desc: 'Function Set: 4-bit mode, 2 display lines, 5x8 font dot format' },
        { cmd: '0x80', desc: 'Set DDRAM Address: แถวที่ 1 ช่องที่ 1 (0x80 ถึง 0x8F)' },
        { cmd: '0xC0', desc: 'Set DDRAM Address: แถวที่ 2 ช่องที่ 1 (0xC0 ถึง 0xCF)' },
        { cmd: '0x40', desc: 'Set CGRAM Address: เริ่มเขียนตัวอักษรพิเศษ Slot 0 (0x40 ถึง 0x7F)' }
      ],
      pitfalls: [
        'จอขึ้นสี่เหลี่ยมดำแถวเดียว (Black Box) หรือจอมืดว่างเปล่า: ร้อยละ 90 เกิดจากแรงดันขา V0 ลอย หรือตัวต้านทานปรับค่าได้ (Potentiometer) ปรับความสว่างมากเกินไป ให้หมุนปรับตัวต้านทานจนเห็นตัวอักษรชัดเจน',
        'การ Initialized โหมด 4-bit: HD44780 เริ่มต้นด้วยโหมด 8-bit จากโรงงาน โค้ด Bare-metal ต้องส่งพัลส์คำสั่ง 0x03 ซ้ำกัน 3 ครั้ง พร้อมหน่วงเวลา > 4.1ms ก่อนจะส่งคำสั่ง 0x02 เพื่อตัดเข้าโหมด 4-bit อย่างสมบูรณ์',
        'สายต่อขา R/W ลอย: หากลอยขา R/W ไว้ ระดับแรงดันอาจเป็น HIGH ทำให้อยู่ในโหมด Read และหน้าจอไม่รับการเขียนใดๆ ทั้งสิ้น ให้ต่อขา R/W ลงกราวด์ (GND) เสมอ'
      ]
    },

    seg7: {
      name: '7-Segment Display (1 หลัก / มัลติเพล็กซ์)',
      icon: '🔢',
      category: 'Display / Output',
      voltage: 'Forward Voltage (Vf): 1.8V - 2.2V (สีแดง), 3.0V - 3.2V (สีฟ้า/ขาว)',
      current: '10 - 20 mA ต่อ Segment (ห้ามต่อตรงโดยไม่ผ่านตัวต้านทาน)',
      summary: 'หลอด LED จัดเรียงเป็นตัวเลข 8 ชิ้น (a, b, c, d, e, f, g และ dp จุดทศนิยม) แบ่งออกเป็น 2 ชนิดหลักตามจุดต่อร่วมคือ Common Cathode (ขั้วลบร่วม - สั่ง HIGH ติด) และ Common Anode (ขั้วบวกร่วม - สั่ง LOW ติด)',
      pinout: [
        { pin: 'a, b, c', name: 'Segment Top/Right', type: 'Anode/Cathode', desc: 'เส้นขอบบน (a), ขอบขวาบน (b), ขอบขวาล่าง (c)' },
        { pin: 'd, e, f', name: 'Segment Bottom/Left', type: 'Anode/Cathode', desc: 'เส้นขอบล่าง (d), ขอบซ้ายล่าง (e), ขอบซ้ายบน (f)' },
        { pin: 'g, dp', name: 'Center & Dot', type: 'Anode/Cathode', desc: 'เส้นกลาง (g), จุดทศนิยมมุมล่างขวา (dp)' },
        { pin: 'COM (3, 8)', name: 'Common Pin', type: 'Power/GND', desc: 'ขา 3 และขา 8 ต่อถึงกันภายใน CC ต่อลง GND / CA ต่อเข้า +5V' }
      ],
      commands: [
        { cmd: '0: 0x3F', desc: 'CC: a,b,c,d,e,f ON | CA: 0xC0' },
        { cmd: '1: 0x06', desc: 'CC: b,c ON | CA: 0xF9' },
        { cmd: '2: 0x5B', desc: 'CC: a,b,d,e,g ON | CA: 0xA4' },
        { cmd: '3: 0x4F', desc: 'CC: a,b,c,d,g ON | CA: 0xB0' },
        { cmd: '4: 0x66', desc: 'CC: b,c,f,g ON | CA: 0x99' },
        { cmd: '5: 0x6D', desc: 'CC: a,c,d,f,g ON | CA: 0x92' },
        { cmd: '6: 0x7D', desc: 'CC: a,c,d,e,f,g ON | CA: 0x82' },
        { cmd: '7: 0x07', desc: 'CC: a,b,c ON | CA: 0xF8' },
        { cmd: '8: 0x7F', desc: 'CC: ทุกเซกเมนต์เปิดทั้งหมด | CA: 0x80' },
        { cmd: '9: 0x6F', desc: 'CC: a,b,c,d,f,g ON | CA: 0x90' }
      ],
      pitfalls: [
        'ต่อตัวต้านทานตัวเดียวที่ขา COM รวม: หากใช้ตัวต้านทานตัวเดียวที่ขา COM ความสว่างของตัวเลขจะแกว่งตามจำนวนหลอดที่ติด (เลข 1 สว่างจ้า แต่เลข 8 ดิมมืดลง) ทางวิศวกรรมต้องต่อตัวต้านทาน 220Ω-330Ω แยกที่ขา a-g แต่ละเส้น',
        'จำสับสนระหว่าง CC กับ CA: ถ้าต่อ CC วงจรต้องป้อนลอจิก HIGH (Active-HIGH) เพื่อให้ไฟติด หากโค้ดทำงานกลับทิศ (เลขติดส่วนที่ไม่ควรติด) ให้ใช้ bitwise NOT (~) สลับค่าในตาราง Lookup Table'
      ]
    },

    uno: {
      name: 'บอร์ดทดลอง Arduino Uno R3 (ATmega328P)',
      icon: '🧠',
      category: 'Microcontroller Board',
      voltage: '5.0V USB / 7V - 12V DC Jack (VIN)',
      current: 'พิน I/O แต่ละขาขับกระแสสูงสุด 40mA (แนะนำ &le; 20mA), จ่ายรวมทั้งชิปไม่เกิน 200mA',
      summary: 'บอร์ดพัฒนาไมโครคอนโทรลเลอร์แกนสถาปัตยกรรม 8-bit AVR RISC ความถี่สัญญาณนาฬิกา 16 MHz หน่วยความจำ Flash 32KB, SRAM 2KB, EEPROM 1KB มีระบบบูตโหลดเดอร์ Optiboot และชิปแปลง USB-to-UART ในตัว',
      pinout: [
        { pin: 'D0 (RX)', name: 'PD0', type: 'UART / IO', desc: 'รับข้อมูล USART Receive (ต่อเข้าชิป USB ไม่ควรใช้ถ้าต่อ Serial)' },
        { pin: 'D1 (TX)', name: 'PD1', type: 'UART / IO', desc: 'ส่งข้อมูล USART Transmit (ต่อเข้าชิป USB)' },
        { pin: 'D2 - D7', name: 'PD2 - PD7', type: 'PORTD', desc: 'ดิจิทัล I/O พอร์ต D (D2/D3 เป็น External Interrupt INT0/INT1)' },
        { pin: 'D8 - D13', name: 'PB0 - PB5', type: 'PORTB', desc: 'ดิจิทัล I/O พอร์ต B (D13 ต่อหลอด LED บนบอร์ด, D11/12/13 เป็นขา SPI)' },
        { pin: 'A0 - A5', name: 'PC0 - PC5', type: 'PORTC / ADC', desc: 'ช่องสัญญาณอนาล็อกอินพุต 10-bit (สามารถใช้งานเป็น Digital I/O ได้)' },
        { pin: 'AREF', name: 'AREF', type: 'Analog Ref', desc: 'พินแรงดันอ้างอิงภายนอกสำหรับ ADC (ห้ามป้อนเกิน 5V)' },
        { pin: 'RESET', name: 'PC6', type: 'Reset', desc: 'สั่ง Reset ระบบเมื่อดึงลง Active-LOW (0V)' }
      ],
      commands: [
        { cmd: 'DDRB / DDRD / DDRC', desc: 'Data Direction Register: กำหนดทิศทาง 1 = OUTPUT, 0 = INPUT' },
        { cmd: 'PORTB / PORTD / PORTC', desc: 'Port Data Register: ส่งสถานะ HIGH/LOW หรือเปิด Internal Pull-Up' },
        { cmd: 'PINB / PIND / PINC', desc: 'Port Input Pins: อ่านค่าระดับแรงดันทางตรรกะที่เข้ามาที่ขาพินจริง' },
        { cmd: 'TCCR1A / TCCR1B', desc: 'Timer/Counter 1 Control Register: ตั้งค่าโหมด CTC, PWM, และ Prescaler' },
        { cmd: 'ADMUX / ADCSRA', desc: 'ADC Control: เลือกช่องสัญญาณ A0-A5, เลือก VREF, และเริ่มแปลงค่า (ADSC)' }
      ],
      pitfalls: [
        'ลืมใส่ตัวต้านทาน Drop ให้โหลด: การต่อหลอด LED หรือออปโต้เข้าขาพินตรงๆ ทำให้กระแสพุ่งเกิน 40mA และทำลายทรานซิสเตอร์ภายในชิป ATmega328P ถาวร',
        'ชนกับขาสื่อสาร D0/D1: หากต่อวงจรปุ่มกดหรือหลอดไฟที่ขา D0/D1 บอร์ดจะอัปโหลดโปรแกรมไม่เข้า (avrdude: stk500_getsync() not in sync) ต้องถอดสายออกก่อนอัปโหลดเสมอ'
      ]
    },

    m32: {
      name: 'ไมโครคอนโทรลเลอร์ ATmega32 (DIP-40 Package)',
      icon: '⚙️',
      category: 'Standalone Microcontroller',
      voltage: '4.5V - 5.5V DC (ความถี่ 16MHz) หรือ 2.7V - 5.5V (รุ่น ATmega32L)',
      current: 'กระแสสูงสุดต่อขาพิน 40mA, ขา VCC/GND รับได้รวม 200mA',
      summary: 'ไอซีไมโครคอนโทรลเลอร์ขนาด 40 ขา ยอดนิยมในหลักสูตรวิศวกรรม CDTI มี 4 พอร์ตสมบูรณ์ (PORTA, PORTB, PORTC, PORTD) แต่ละพอร์ตมี 8 บิตเต็ม 32 I/O lines พร้อมหน่วยความจำ Flash 32KB, SRAM 2KB และ 8-channel 10-bit ADC ในตัว',
      pinout: [
        { pin: 'PA0 - PA7 (Pin 40-33)', name: 'PORTA', type: 'ADC / IO', desc: 'พอร์ต A 8 บิต รองรับ ADC Channel 0 ถึง 7 สมบูรณ์แบบ' },
        { pin: 'PB0 - PB7 (Pin 1-8)', name: 'PORTB', type: 'Timer/SPI/IO', desc: 'พอร์ต B 8 บิต (PB0: T0, PB1: T1, PB2: AIN0, PB4-7: SPI Bus)' },
        { pin: 'PC0 - PC7 (Pin 22-29)', name: 'PORTC', type: 'I2C/JTAG/IO', desc: 'พอร์ต C 8 บิต (PC0/PC1: I2C SCL/SDA, PC2-5: JTAG Interface)' },
        { pin: 'PD0 - PD7 (Pin 14-21)', name: 'PORTD', type: 'USART/INT/IO', desc: 'พอร์ต D 8 บิต (PD0/PD1: RXD/TXD, PD2/PD3: INT0/INT1)' },
        { pin: 'Pin 10 / Pin 11', name: 'VCC / GND', type: 'Power', desc: 'ไฟเลี้ยงหลักไอซี (+5V และ 0V)' },
        { pin: 'Pin 30 / Pin 31', name: 'AVCC / GND', type: 'Power', desc: 'ไฟเลี้ยงชุดวงจร ADC ต้องต่อผ่าน LC Filter หรือต่อตรงกับ 5V/GND' },
        { pin: 'Pin 12 / Pin 13', name: 'XTAL2 / XTAL1', type: 'Clock', desc: 'ต่อคริสตัลภายนอก 8MHz / 16MHz พร้อมตัวเก็บประจุ 22pF สองตัว' }
      ],
      commands: [
        { cmd: 'DDRA = 0xFF;', desc: 'กำหนดให้พอร์ต A ทั้ง 8 ขาเป็น OUTPUT (สำหรับขับ 7-Segment หรือ LED)' },
        { cmd: 'PORTB = 0xFF;', desc: 'เปิด Internal Pull-Up พอร์ต B ทั้ง 8 ขา เมื่อเป็น Input' },
        { cmd: 'SFIOR', desc: 'Special Function IO Register (ใช้เปิด/ปิด Pull-up รวม PUD)' }
      ],
      pitfalls: [
        'พอร์ต C ขา PC2-PC5 อ่านค่าไม่ออก: ชิป ATmega32 จากโรงงานจะเปิดใช้งานฟิวส์ JTAGEN ไว้เป็นค่าเริ่มต้น ทำให้ขา PC2-PC5 ถูกจองโดยระบบดีบัก JTAG ถ้าต้องการใช้เป็น Digital I/O ต้องปิด JTAG ในโปรแกรมเมอร์ หรือเขียนเคลียร์บิต JTD ใน MCUCSR สองครั้งติดกัน'
      ]
    },

    btn: {
      name: 'สวิตช์ปุ่มกด Tactile (Tactile Push Switch 4 ขา)',
      icon: '🔘',
      category: 'Input / Mechanical',
      voltage: 'รองรับแรงดันลอจิก 3.3V ถึง 5.0V',
      current: 'พิกัดหน้าสัมผัส 50mA @ 12V DC',
      summary: 'สวิตช์กดติด-ปล่อยดับ โครงสร้างภายในมีขาต่อถึงกันเป็นคู่ๆ (ขา 1 ต่อกับขา 2, ขา 3 ต่อกับขา 4) เมื่อถูกกด หน้าสัมผัสแผ่นโลหะโค้ง (Metal Dome) จะดีดลงมาเชื่อมวงจรทั้งสองฝั่งเข้าด้วยกัน นิยมต่อแบบ Active-LOW ร่วมกับตัวต้านทาน Pull-Up',
      pinout: [
        { pin: 'ขาคู่หน้า (1 & 2)', name: 'Terminal A', type: 'Switch Contact', desc: 'เชื่อมต่อถึงกันภายในตลอดเวลา นิยมต่อเข้าขาพิน I/O ของ MCU' },
        { pin: 'ขาคู่หลัง (3 & 4)', name: 'Terminal B', type: 'Switch Contact', desc: 'เชื่อมต่อถึงกันภายในตลอดเวลา นิยมต่อลงกราวด์ (GND) สำหรับระบบ Active-LOW' }
      ],
      commands: [
        { cmd: 'pinMode(pin, INPUT_PULLUP);', desc: 'โหมด Arduino: เปิดตัวต้านทานดึงไฟขึ้น 20k-50k ภายในชิป' },
        { cmd: 'DDRB &= ~(1 << PB0);', desc: 'Bare-metal: ตั้งขาเป็น Input' },
        { cmd: 'PORTB |= (1 << PB0);', desc: 'Bare-metal: สั่ง HIGH ให้พิน Input เพื่อเปิด Internal Pull-Up' },
        { cmd: 'if (!(PINB & (1 << PB0)))', desc: 'ตรวจสอบการกดปุ่ม (เมื่อกดจะกลายเป็นลอจิก 0 / Active-LOW)' }
      ],
      pitfalls: [
        'ลืมใส่ตัวต้านทาน Pull-up / ปล่อยพินลอย (Floating Pin): หากไม่เปิด Pull-up พินจะทำตัวเป็นเสาอากาศรับคลื่นรบกวนในอากาศ ลอจิกจะสวิง 0 และ 1 มั่วซั่วตลอดเวลา',
        'การกระดอนของหน้าสัมผัส (Switch Bouncing): แผ่นโลหะสวิตช์จะกระดอนไปมา 5 - 20 ms ทำให้ MCU ตีความเป็นว่าเรากดปุ่มรัวๆ นับสิบครั้ง ต้องใส่ Delay หน่วงเวลา 20ms (Software Debounce) เสมอ'
      ]
    },

    led: {
      name: 'หลอดไฟ LED ขนาด 5 มม. (Light Emitting Diode)',
      icon: '💡',
      category: 'Output / Optical',
      voltage: 'Vf สีแดง/เหลือง: ~1.8V - 2.1V, สีเขียว: ~2.2V - 2.8V, สีน้ำเงิน/ขาว: ~3.0V - 3.4V',
      current: 'กระแสทำงานมาตรฐาน (If): 10 mA - 20 mA (กระแสเกิน 30mA หลอดเสื่อม/ขาดทันที)',
      summary: 'ไดโอดเปล่งแสง เป็นอุปกรณ์สารกึ่งตัวนำชนิดมีขั้ว ยอมให้กระแสไหลผ่านได้ทิศทางเดียวจาก Anode ไป Cathode เมื่อกระแสไหลผ่านจะคายพลังงานในรูปโฟตอนของแสง',
      pinout: [
        { pin: 'ขายาว (Long Lead)', name: 'Anode (+)', type: 'Anode', desc: 'ขั้วบวก แผ่นโลหะข้างในตัวถังชิ้นเล็ก ต่อเข้าพินเอาต์พุต MCU หรือไฟบวก' },
        { pin: 'ขาสั้น (Short Lead)', name: 'Cathode (-)', type: 'Cathode', desc: 'ขั้วลบ มีรอยบากเรียบที่ขอบพลาสติก แผ่นโลหะข้างในชิ้นใหญ่รูปทั่ง ต่อลง GND' }
      ],
      commands: [
        { cmd: 'สูตรหาค่า R Drop:', desc: 'R = (VCC - Vf) / If -> เช่น (5V - 2.0V) / 0.01A = 300Ω (ใช้ค่ามาตรฐาน 330Ω หรือ 470Ω)' }
      ],
      pitfalls: [
        'ต่อกลับขั้ว: หลอดจะไม่ติด แต่ทนแรงดันย้อนกลับ (Reverse Breakdown) ได้ประมาณ 5V จึงมักไม่เสียหาย เพียงแค่สลับขั้วให้ถูกต้อง',
        'ต่อตรงไม่ใส่ตัวต้านทานจำกัดกระแส (Current-Limiting Resistor): หลอดจะกินกระแสไม่อั้นจนเกิดความร้อน เปล่งแสงวาบแล้วดับขาด และอาจดึงกระแสจนพิน MCU เสียหาย'
      ]
    },

    pot: {
      name: 'ตัวต้านทานปรับค่าได้ (Potentiometer 10kΩ Rotary)',
      icon: '🎛️',
      category: 'Input / Passive Analog',
      voltage: 'แรงดันตกคร่อมสูงสุดตามระบบ (0V - 5V DC)',
      current: 'กระแสไหลผ่านแถบคาร์บอน I = V / R = 5V / 10,000Ω = 0.5 mA (ปลอดภัย)',
      summary: 'อุปกรณ์แบ่งแรงดัน (Voltage Divider) แบบแปรผัน มีหน้าสัมผัสกวาด (Wiper) เลื่อนไปบนแถบความต้านทานคาร์บอน เมื่อหมุนแกน อัตราส่วนความต้านทานระหว่างขากลางกับขาริมจะเปลี่ยนไป ส่งผลให้แรงดันเอาต์พุตแปรผันต่อเนื่องตั้งแต่ 0.0V ถึง 5.0V',
      pinout: [
        { pin: 'ขา 1 (Terminal A)', name: 'VCC / GND', type: 'End Terminal', desc: 'ปลายแถบความต้านทานข้างหนึ่ง (ต่อเข้า 5V หรือ GND)' },
        { pin: 'ขา 2 (Wiper ขากลาง)', name: 'Output Voltage', type: 'Wiper Contact', desc: 'จุดดึงแรงดันที่แบ่งแล้ว ต่อเข้าขาพิน ADC เช่น A0 หรือขา V0 ของจอ LCD' },
        { pin: 'ขา 3 (Terminal B)', name: 'GND / VCC', type: 'End Terminal', desc: 'ปลายแถบความต้านทานอีกข้างหนึ่ง (ต่อตรงข้ามกับขา 1)' }
      ],
      commands: [
        { cmd: 'สูตรแบ่งแรงดัน:', desc: 'Vout = Vin * (R_ล่าง / (R_บน + R_ล่าง))' }
      ],
      pitfalls: [
        'ต่อขากลาง (Wiper) เข้ากับ 5V และขาริมเข้ากับ GND: อันตรายสูงสุด! เมื่อหมุนแกนสุดไปฝั่งขาริมที่ต่อกราวด์ ความต้านทานจะกลายเป็น 0Ω ส่งผลให้เกิดการลัดวงจรตรง (Dead Short) ระหว่าง 5V กับ GND ทำให้ภาคจ่ายไฟตัดหรือตัวต้านทานไหม้',
        'จำตำแหน่งขากลาง: ขากลางคือขาที่วิ่งไปหาขาอ่านเสมอ (A0 หรือ V0) ขาริม 2 ขาคือไฟเลี้ยงและกราวด์'
      ]
    },

    dht11: {
      name: 'เซนเซอร์วัดอุณหภูมิและความชื้นสัมพัทธ์ (DHT11 Digital Sensor)',
      icon: '🌡️',
      category: 'Sensor / 1-Wire Digital',
      voltage: '3.3V - 5.5V DC (เสถียรสุดที่ 5.0V)',
      current: '0.5 - 2.5 mA ขณะวัดค่า, 100 - 150 uA ขณะ Standby',
      summary: 'เซนเซอร์วัดความชื้นชนิดสารโพลีเมอร์นำไฟฟ้า และวัดอุณหภูมิด้วย NTC Thermistor ส่งข้อมูลดิจิทัลผ่านโปรโตคอล Single-Bus (สายสัญญาณเส้นเดียว) ความแม่นยำความชื้น &plusmn;5% RH, อุณหภูมิ &plusmn;2&deg;C อัตราการสุ่มตัวอย่างสูงสุด 1 วินาทีต่อครั้ง (1 Hz)',
      pinout: [
        { pin: 1, name: 'VCC', type: 'Power', desc: 'ไฟเลี้ยงบวก (+3.3V ถึง +5V)' },
        { pin: 2, name: 'DATA', type: 'Bi-directional Bus', desc: 'สายส่งข้อมูลดิจิทัล ต้องต่อตัวต้านทาน Pull-up 4.7kΩ ถึง 10kΩ ขึ้นไฟ 5V' },
        { pin: 3, name: 'NC', type: 'No Connect', desc: 'ไม่มีการเชื่อมต่อภายใน (ในโมดูลสำเร็จรูป 3 ขาจะตัดพินนี้ออก)' },
        { pin: 4, name: 'GND', type: 'Power', desc: 'กราวด์ (0V)' }
      ],
      commands: [
        { cmd: 'Start Signal', desc: 'MCU ดึงสาย DATA ลง LOW อย่างน้อย 18 ms แล้วปล่อย HIGH 20-40 us' },
        { cmd: 'Sensor Response', desc: 'DHT11 ดึง LOW 80 us แล้วปล่อย HIGH 80 us เพื่อยืนยันว่าพร้อมส่งข้อมูล' },
        { cmd: 'Data Frame (40 bits)', desc: 'Byte 0: ความชื้น (จำนวนเต็ม), Byte 1: ความชื้น (ทศนิยม), Byte 2: อุณหภูมิ (เต็ม), Byte 3: อุณหภูมิ (ทศนิยม), Byte 4: Checksum รวม' }
      ],
      pitfalls: [
        'อ่านค่าถี่เกิน 1 วินาที: DHT11 มีเวลาตอบสนองช้า หากโค้ดวนลูปอ่านเร็วกว่า 1 วินาทีต่อครั้ง ข้อมูลจะค้างหรืออ่านได้ 0 หรือเกิด Timeout',
        'ลืมใส่ตัวต้านทาน Pull-Up: ขา DATA เป็นแบบ Open-Drain หากไม่มีตัวต้านทานดึงไฟขึ้น 4.7k-10k ข้อมูลจะไม่สามารถสวิงกลับมาเป็น HIGH ได้'
      ]
    }
  },

  renderDatasheetPanel: function() {
    let buttonsHtml = '';
    Object.keys(this.devices).forEach(k => {
      const dev = this.devices[k];
      const isActive = (k === this.activeDevice) ? 'active' : '';
      buttonsHtml += `
        <button class="ds-device-btn ${isActive}" onclick="STUDIO_DATASHEETS.selectDevice('${k}')">
          <span style="font-size: 16px;">${dev.icon}</span>
          <span>${dev.name.split(' (')[0]}</span>
        </button>
      `;
    });

    const dev = this.devices[this.activeDevice];

    let pinRows = '';
    dev.pinout.forEach(p => {
      pinRows += `
        <tr>
          <td><strong>${p.pin}</strong></td>
          <td><code class="pin-name-code">${p.name}</code></td>
          <td><span class="pin-type-badge">${p.type}</span></td>
          <td>${p.desc}</td>
        </tr>
      `;
    });

    let cmdRows = '';
    if (dev.commands && dev.commands.length > 0) {
      dev.commands.forEach(c => {
        cmdRows += `
          <tr>
            <td style="width: 25%;"><code>${c.cmd}</code></td>
            <td>${c.desc}</td>
          </tr>
        `;
      });
    }

    let pitfallItems = '';
    dev.pitfalls.forEach(pf => {
      pitfallItems += `<li>⚠️ ${pf}</li>`;
    });

    return `
      <div class="ds-panel-inner">
        <div class="calc-section-intro">
          <h3>📖 คลังข้อมูล Datasheet, Pinout & ข้อผิดพลาดหน้างาน</h3>
          <p>คู่มือวิศวกรรมฝังตัวฉบับย่อ สำหรับเปิดทบทวนสเปก ตำแหน่งขา ตารางคำสั่ง และข้อควรระวังหน้างานสอบปฏิบัติ</p>
        </div>

        <!-- Device Selector Carousel / Bar -->
        <div class="ds-device-bar">
          ${buttonsHtml}
        </div>

        <!-- Active Device Detail Card -->
        <div class="ds-main-card">
          <div class="ds-header">
            <div class="ds-icon-box">${dev.icon}</div>
            <div>
              <h4 style="margin: 0; font-size: 17px; color: var(--text-main);">${dev.name}</h4>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
                หมวดหมู่: <span style="color: var(--primary); font-weight: 600;">${dev.category}</span> &nbsp;|&nbsp;
                แรงดัน: <code>${dev.voltage}</code> &nbsp;|&nbsp;
                กระแส: <code>${dev.current}</code>
              </div>
            </div>
          </div>

          <p class="ds-summary-text">${dev.summary}</p>

          <!-- Pinout Table -->
          <div class="ds-sub-section">
            <h5 class="ds-sub-title">📌 ตารางตำแหน่งขาและการเชื่อมต่อ (Pinout Table)</h5>
            <table class="calc-table ds-table">
              <thead>
                <tr>
                  <th style="width: 10%;">พิน</th>
                  <th style="width: 20%;">ชื่อพิน</th>
                  <th style="width: 20%;">ประเภท</th>
                  <th>หน้าที่การทำงานและจุดเชื่อมต่อ</th>
                </tr>
              </thead>
              <tbody>
                ${pinRows}
              </tbody>
            </table>
          </div>

          <!-- Command / Lookup Table (if exists) -->
          ${cmdRows ? `
            <div class="ds-sub-section" style="margin-top: 16px;">
              <h5 class="ds-sub-title">⚙️ ตารางคำสั่งทางเทคนิค / รหัสค่าคงที่ (Command & Lookup Values)</h5>
              <table class="calc-table ds-table">
                <thead>
                  <tr>
                    <th>รหัสคำสั่ง / ค่า Hex</th>
                    <th>ความหมายและหน้าที่การทำงาน</th>
                  </tr>
                </thead>
                <tbody>
                  ${cmdRows}
                </tbody>
              </table>
            </div>
          ` : ''}

          <!-- Pitfalls -->
          <div class="ds-sub-section" style="margin-top: 16px;">
            <h5 class="ds-sub-title" style="color: #ef4444;">🚨 ข้อควรระวังและข้อผิดพลาดที่มักตกม้าตายหน้างานสอบ</h5>
            <ul class="ds-pitfall-list">
              ${pitfallItems}
            </ul>
          </div>

        </div>

      </div>
    `;
  },

  selectDevice: function(devKey) {
    if (this.devices[devKey]) {
      this.activeDevice = devKey;
      const container = document.getElementById('studio-tab-datasheet');
      if (container) {
        container.innerHTML = this.renderDatasheetPanel();
      }
    }
  }
};
