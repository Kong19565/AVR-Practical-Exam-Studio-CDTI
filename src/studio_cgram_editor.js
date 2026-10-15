// ==============================================================================
// studio_cgram_editor.js - LCD 16x2 Text Customizer & CGRAM Font Studio
// Includes:
// 1. Interactive 16x2 LCD Text Customizer & Real-Time Dot Matrix Simulator
// 2. 5x8 CGRAM Pixel Matrix Designer (8 Slots + Presets)
// 3. TIS-620 Thai Font Engine (Friend's Original vs Improved & Engineering Audit)
// ==============================================================================

const LCD_ASCII_FONT = {" ": [0, 0, 0, 0, 0, 0, 0, 0], "!": [4, 4, 4, 4, 4, 0, 4, 0], "\"": [10, 10, 10, 0, 0, 0, 0, 0], "#": [10, 10, 31, 10, 31, 10, 10, 0], "$": [4, 15, 20, 14, 5, 30, 4, 0], "%": [24, 25, 2, 4, 8, 19, 3, 0], "&": [8, 20, 20, 8, 21, 18, 13, 0], "'": [12, 4, 8, 0, 0, 0, 0, 0], "(": [2, 4, 8, 8, 8, 4, 2, 0], ")": [8, 4, 2, 2, 2, 4, 8, 0], "*": [0, 4, 21, 14, 21, 4, 0, 0], "+": [0, 4, 4, 31, 4, 4, 0, 0], ",": [0, 0, 0, 0, 12, 4, 8, 0], "-": [0, 0, 0, 31, 0, 0, 0, 0], ".": [0, 0, 0, 0, 0, 12, 12, 0], "/": [0, 1, 2, 4, 8, 16, 0, 0], "0": [14, 17, 19, 21, 25, 17, 14, 0], "1": [4, 12, 4, 4, 4, 4, 14, 0], "2": [14, 17, 1, 2, 4, 8, 31, 0], "3": [31, 2, 4, 2, 1, 17, 14, 0], "4": [2, 6, 10, 18, 31, 2, 2, 0], "5": [31, 16, 30, 1, 1, 17, 14, 0], "6": [6, 8, 16, 30, 17, 17, 14, 0], "7": [31, 1, 2, 4, 8, 8, 8, 0], "8": [14, 17, 17, 14, 17, 17, 14, 0], "9": [14, 17, 17, 15, 1, 2, 12, 0], ":": [0, 12, 12, 0, 12, 12, 0, 0], ";": [0, 12, 12, 0, 12, 4, 8, 0], "<": [2, 4, 8, 16, 8, 4, 2, 0], "=": [0, 31, 0, 31, 0, 0, 0, 0], ">": [8, 4, 2, 1, 2, 4, 8, 0], "?": [14, 17, 1, 2, 4, 0, 4, 0], "@": [14, 17, 1, 13, 21, 21, 14, 0], "A": [14, 17, 17, 31, 17, 17, 17, 0], "B": [30, 17, 17, 30, 17, 17, 30, 0], "C": [14, 17, 16, 16, 16, 17, 14, 0], "D": [28, 18, 17, 17, 17, 18, 28, 0], "E": [31, 16, 16, 30, 16, 16, 31, 0], "F": [31, 16, 16, 30, 16, 16, 16, 0], "G": [14, 17, 16, 23, 17, 17, 15, 0], "H": [17, 17, 17, 31, 17, 17, 17, 0], "I": [14, 4, 4, 4, 4, 4, 14, 0], "J": [7, 2, 2, 2, 2, 18, 12, 0], "K": [17, 18, 20, 24, 20, 18, 17, 0], "L": [16, 16, 16, 16, 16, 16, 31, 0], "M": [17, 27, 21, 21, 17, 17, 17, 0], "N": [17, 17, 25, 21, 19, 17, 17, 0], "O": [14, 17, 17, 17, 17, 17, 14, 0], "P": [30, 17, 17, 30, 16, 16, 16, 0], "Q": [14, 17, 17, 17, 21, 18, 13, 0], "R": [30, 17, 17, 30, 20, 18, 17, 0], "S": [14, 17, 16, 14, 1, 17, 14, 0], "T": [31, 4, 4, 4, 4, 4, 4, 0], "U": [17, 17, 17, 17, 17, 17, 14, 0], "V": [17, 17, 17, 17, 17, 10, 4, 0], "W": [17, 17, 17, 21, 21, 21, 10, 0], "X": [17, 17, 10, 4, 10, 17, 17, 0], "Y": [17, 17, 10, 4, 4, 4, 4, 0], "Z": [31, 1, 2, 4, 8, 16, 31, 0], "[": [14, 8, 8, 8, 8, 8, 14, 0], "\\": [0, 16, 8, 4, 2, 1, 0, 0], "]": [14, 2, 2, 2, 2, 2, 14, 0], "^": [4, 10, 17, 0, 0, 0, 0, 0], "_": [0, 0, 0, 0, 0, 0, 31, 0], "`": [8, 4, 2, 0, 0, 0, 0, 0], "a": [0, 0, 14, 1, 15, 17, 15, 0], "b": [16, 16, 22, 25, 17, 17, 30, 0], "c": [0, 0, 14, 16, 16, 17, 14, 0], "d": [1, 1, 13, 19, 17, 17, 15, 0], "e": [0, 0, 14, 17, 31, 16, 14, 0], "f": [6, 9, 8, 28, 8, 8, 8, 0], "g": [0, 15, 17, 17, 15, 1, 14, 0], "h": [16, 16, 22, 25, 17, 17, 17, 0], "i": [4, 0, 12, 4, 4, 4, 14, 0], "j": [2, 0, 6, 2, 2, 18, 12, 0], "k": [16, 16, 18, 20, 24, 20, 18, 0], "l": [12, 4, 4, 4, 4, 4, 14, 0], "m": [0, 0, 26, 21, 21, 17, 17, 0], "n": [0, 0, 22, 25, 17, 17, 17, 0], "o": [0, 0, 14, 17, 17, 17, 14, 0], "p": [0, 30, 17, 17, 30, 16, 16, 0], "q": [0, 13, 19, 17, 15, 1, 1, 0], "r": [0, 0, 22, 25, 16, 16, 16, 0], "s": [0, 0, 14, 16, 14, 1, 30, 0], "t": [8, 8, 28, 8, 8, 9, 6, 0], "u": [0, 0, 17, 17, 17, 19, 13, 0], "v": [0, 0, 17, 17, 17, 10, 4, 0], "w": [0, 0, 17, 17, 21, 21, 10, 0], "x": [0, 0, 17, 10, 4, 10, 17, 0], "y": [0, 17, 17, 15, 1, 17, 14, 0], "z": [0, 0, 31, 2, 4, 8, 31, 0], "{": [2, 4, 4, 8, 4, 4, 2, 0], "|": [4, 4, 4, 4, 4, 4, 4, 0], "}": [8, 4, 4, 2, 4, 4, 8, 0], "~": [0, 8, 21, 2, 0, 0, 0, 0]};
const THAI_FONT_ORIGINAL = {"0xA1": {"label": "ก (Ko Kai)", "bytes": [14, 17, 25, 21, 19, 17, 17, 0]}, "0xA2": {"label": "ข (Kho Khai)", "bytes": [14, 17, 16, 14, 17, 17, 14, 0]}, "0xA3": {"label": "ฃ (Kho Khuat)", "bytes": [22, 9, 16, 14, 17, 17, 14, 0]}, "0xA4": {"label": "ค (Kho Khwai)", "bytes": [14, 17, 17, 31, 17, 17, 17, 0]}, "0xA5": {"label": "ฅ (Kho Khon)", "bytes": [21, 10, 17, 31, 17, 17, 17, 0]}, "0xA6": {"label": "ฆ (Kho Rakhang)", "bytes": [22, 9, 17, 29, 19, 17, 14, 0]}, "0xA7": {"label": "ง (Ngo Ngu)", "bytes": [14, 17, 16, 16, 16, 24, 7, 0]}, "0xA8": {"label": "จ (Cho Chan)", "bytes": [14, 17, 16, 30, 17, 17, 14, 0]}, "0xA9": {"label": "ฉ (Cho Ching)", "bytes": [14, 17, 17, 29, 19, 17, 14, 0]}, "0xAA": {"label": "ช (Cho Chang)", "bytes": [14, 17, 16, 30, 17, 17, 30, 1]}, "0xAB": {"label": "ซ (So So)", "bytes": [22, 9, 16, 30, 17, 17, 30, 1]}, "0xAC": {"label": "ฌ (Cho Choe)", "bytes": [14, 17, 31, 21, 21, 21, 18, 0]}, "0xAD": {"label": "ญ (Yo Ying)", "bytes": [14, 17, 31, 17, 17, 17, 17, 14]}, "0xAE": {"label": "ฎ (Do Chada)", "bytes": [14, 17, 17, 31, 17, 17, 18, 12]}, "0xAF": {"label": "ฏ (To Patak)", "bytes": [14, 17, 17, 31, 17, 17, 21, 10]}, "0xB0": {"label": "ฐ (Tho Than)", "bytes": [14, 17, 16, 14, 17, 17, 0, 14]}, "0xB1": {"label": "ฑ (Tho Montho)", "bytes": [21, 10, 17, 31, 17, 17, 17, 0]}, "0xB2": {"label": "ฒ (Tho Phuthao)", "bytes": [14, 17, 17, 29, 21, 21, 18, 0]}, "0xB3": {"label": "ณ (No Nen)", "bytes": [14, 17, 17, 29, 19, 17, 17, 0]}, "0xB4": {"label": "ด (Do Dek)", "bytes": [14, 17, 17, 31, 17, 17, 17, 0]}, "0xB5": {"label": "ต (To Tao)", "bytes": [21, 10, 17, 31, 17, 17, 17, 0]}, "0xB6": {"label": "ถ (Tho Thung)", "bytes": [14, 17, 17, 17, 17, 17, 14, 0]}, "0xB7": {"label": "ท (Tho Thahan)", "bytes": [14, 17, 16, 23, 25, 17, 17, 0]}, "0xB8": {"label": "ธ (Tho Thong)", "bytes": [31, 16, 16, 30, 17, 17, 14, 0]}, "0xB9": {"label": "น (No Nu)", "bytes": [14, 17, 17, 17, 25, 21, 18, 0]}, "0xBA": {"label": "บ (Bo Baimai)", "bytes": [17, 17, 17, 17, 17, 17, 14, 0]}, "0xBB": {"label": "ป (Po Pla)", "bytes": [17, 17, 17, 17, 17, 17, 14, 16]}, "0xBC": {"label": "ผ (Pho Phueng)", "bytes": [17, 17, 17, 21, 21, 21, 10, 0]}, "0xBD": {"label": "ฝ (Fo Fa)", "bytes": [17, 17, 17, 21, 21, 21, 10, 16]}, "0xBE": {"label": "พ (Pho Phan)", "bytes": [17, 17, 21, 21, 21, 17, 17, 0]}, "0xBF": {"label": "ฟ (Fo Fan)", "bytes": [17, 17, 21, 21, 21, 17, 17, 16]}, "0xC0": {"label": "ภ (Pho Samphao)", "bytes": [14, 17, 16, 16, 17, 17, 14, 0]}, "0xC1": {"label": "ม (Mo Ma)", "bytes": [14, 17, 17, 25, 21, 19, 17, 0]}, "0xC2": {"label": "ย (Yo Yak)", "bytes": [26, 21, 1, 14, 17, 17, 14, 0]}, "0xC3": {"label": "ร (Ro Ruea)", "bytes": [14, 17, 1, 6, 8, 16, 16, 0]}, "0xC4": {"label": "ฤ (Ru)", "bytes": [14, 17, 17, 17, 17, 18, 12, 0]}, "0xC5": {"label": "ล (Lo Ling)", "bytes": [14, 17, 1, 14, 17, 17, 14, 0]}, "0xC6": {"label": "ฦ (Lu)", "bytes": [14, 17, 1, 14, 17, 18, 12, 0]}, "0xC7": {"label": "ว (Wo Waen)", "bytes": [14, 17, 1, 1, 1, 2, 4, 0]}, "0xC8": {"label": "ศ (So Sala)", "bytes": [6, 9, 17, 31, 17, 17, 17, 0]}, "0xC9": {"label": "ษ (So Rusi)", "bytes": [17, 17, 21, 19, 17, 17, 14, 0]}, "0xCA": {"label": "ส (So Suea)", "bytes": [6, 9, 1, 14, 17, 17, 14, 0]}, "0xCB": {"label": "ห (Ho Hip)", "bytes": [17, 17, 21, 27, 17, 17, 17, 0]}, "0xCC": {"label": "ฬ (Lo Chula)", "bytes": [6, 9, 17, 21, 21, 17, 17, 0]}, "0xCD": {"label": "อ (O Ang)", "bytes": [14, 17, 16, 14, 17, 17, 14, 0]}, "0xCE": {"label": "ฮ (Ho Nok-huk)", "bytes": [14, 21, 18, 14, 17, 17, 14, 0]}, "0xCF": {"label": "ฯ (Paiyannoi)", "bytes": [8, 20, 8, 4, 4, 4, 0, 0]}, "0xD0": {"label": "ะ (Sara A)", "bytes": [12, 12, 0, 12, 12, 0, 0, 0]}, "0xD1": {"label": "ั (Mai Han-Akat) - สระบน", "bytes": [12, 18, 0, 0, 0, 0, 0, 0]}, "0xD2": {"label": "า (Sara Aa)", "bytes": [15, 1, 1, 1, 1, 1, 1, 0]}, "0xD3": {"label": "ำ (Sara Am)", "bytes": [6, 6, 15, 1, 1, 1, 1, 0]}, "0xD4": {"label": "ิ (Sara I) - สระบน", "bytes": [14, 31, 0, 0, 0, 0, 0, 0]}, "0xD5": {"label": "ี (Sara Ii) - สระบน", "bytes": [10, 31, 0, 0, 0, 0, 0, 0]}, "0xD6": {"label": "ึ (Sara Ue) - สระบน", "bytes": [14, 27, 0, 0, 0, 0, 0, 0]}, "0xD7": {"label": "ื (Sara Uee) - สระบน", "bytes": [21, 31, 0, 0, 0, 0, 0, 0]}, "0xD8": {"label": "ุ (Sara U) - สระล่าง", "bytes": [0, 0, 0, 0, 0, 0, 12, 8]}, "0xD9": {"label": "ู (Sara Uu) - สระล่าง", "bytes": [0, 0, 0, 0, 0, 0, 14, 10]}, "0xDA": {"label": "ฺ (Phinthu) - สระล่าง", "bytes": [0, 0, 0, 0, 0, 0, 4, 4]}, "0xE0": {"label": "เ (Sara E)", "bytes": [14, 17, 16, 16, 16, 16, 16, 0]}, "0xE1": {"label": "แ (Sara Ae)", "bytes": [27, 18, 18, 18, 18, 18, 18, 0]}, "0xE2": {"label": "โ (Sara O)", "bytes": [7, 9, 1, 14, 16, 16, 16, 0]}, "0xE3": {"label": "ใ (Sara Ai Maimuan)", "bytes": [7, 9, 5, 2, 2, 2, 2, 0]}, "0xE4": {"label": "ไ (Sara Ai Maimaloi)", "bytes": [13, 18, 1, 2, 2, 2, 2, 0]}, "0xE5": {"label": "ๅ (Lakkhangyao)", "bytes": [15, 1, 1, 1, 1, 1, 2, 4]}, "0xE6": {"label": "ๆ (Maiyamok)", "bytes": [12, 18, 4, 8, 16, 14, 1, 0]}, "0xE7": {"label": "็ (Maitaikhu) - สระบน", "bytes": [10, 21, 0, 0, 0, 0, 0, 0]}, "0xE8": {"label": "่ (Mai Ek)", "bytes": [4, 4, 0, 0, 0, 0, 0, 0]}, "0xE9": {"label": "้ (Mai Tho)", "bytes": [12, 6, 0, 0, 0, 0, 0, 0]}, "0xEA": {"label": "๊ (Mai Tri)", "bytes": [21, 10, 0, 0, 0, 0, 0, 0]}, "0xEB": {"label": "๋ (Mai Chattawa)", "bytes": [4, 14, 4, 0, 0, 0, 0, 0]}, "0xEC": {"label": "์ (Thanthakhat / Karan)", "bytes": [6, 9, 2, 0, 0, 0, 0, 0]}, "0xF0": {"label": "๐", "bytes": [14, 17, 17, 17, 17, 17, 14, 0]}, "0xF1": {"label": "๑", "bytes": [4, 10, 17, 10, 4, 2, 1, 0]}, "0xF2": {"label": "๒", "bytes": [14, 17, 2, 4, 8, 16, 31, 0]}, "0xF3": {"label": "๓", "bytes": [21, 21, 10, 4, 2, 1, 1, 0]}, "0xF4": {"label": "๔", "bytes": [17, 17, 31, 1, 1, 2, 4, 0]}, "0xF5": {"label": "๕", "bytes": [10, 21, 31, 1, 1, 2, 4, 0]}, "0xF6": {"label": "๖", "bytes": [2, 4, 8, 23, 21, 21, 14, 0]}, "0xF7": {"label": "๗", "bytes": [21, 21, 10, 4, 4, 4, 4, 0]}, "0xF8": {"label": "๘", "bytes": [21, 21, 21, 10, 4, 2, 1, 0]}, "0xF9": {"label": "๙", "bytes": [14, 17, 17, 14, 4, 2, 1]}};
const THAI_FONT_IMPROVED = {"0xA1": {"label": "ก (Ko Kai)", "bytes": [14, 17, 25, 21, 19, 17, 17, 0]}, "0xA2": {"label": "ข (Kho Khai)", "bytes": [12, 18, 12, 4, 4, 20, 14, 0]}, "0xA3": {"label": "ฃ (Kho Khuat)", "bytes": [22, 9, 16, 14, 17, 17, 14, 0]}, "0xA4": {"label": "ค (Kho Khwai)", "bytes": [12, 18, 4, 14, 17, 17, 17, 0]}, "0xA5": {"label": "ฅ (Kho Khon)", "bytes": [21, 10, 17, 31, 17, 17, 17, 0]}, "0xA6": {"label": "ฆ (Kho Rakhang)", "bytes": [22, 9, 17, 29, 19, 17, 14, 0]}, "0xA7": {"label": "ง (Ngo Ngu)", "bytes": [14, 17, 16, 16, 16, 24, 7, 0]}, "0xA8": {"label": "จ (Cho Chan)", "bytes": [14, 17, 16, 30, 17, 17, 14, 0]}, "0xA9": {"label": "ฉ (Cho Ching)", "bytes": [14, 17, 17, 29, 19, 17, 14, 0]}, "0xAA": {"label": "ช (Cho Chang)", "bytes": [14, 17, 16, 30, 17, 17, 30, 1]}, "0xAB": {"label": "ซ (So So)", "bytes": [22, 9, 16, 30, 17, 17, 30, 1]}, "0xAC": {"label": "ฌ (Cho Choe)", "bytes": [14, 17, 31, 21, 21, 21, 18, 0]}, "0xAD": {"label": "ญ (Yo Ying)", "bytes": [14, 17, 31, 17, 17, 17, 17, 14]}, "0xAE": {"label": "ฎ (Do Chada)", "bytes": [14, 17, 17, 31, 17, 17, 18, 12]}, "0xAF": {"label": "ฏ (To Patak)", "bytes": [14, 17, 17, 31, 17, 17, 21, 10]}, "0xB0": {"label": "ฐ (Tho Than)", "bytes": [14, 17, 16, 14, 17, 17, 0, 14]}, "0xB1": {"label": "ฑ (Tho Montho)", "bytes": [21, 10, 17, 31, 17, 17, 17, 0]}, "0xB2": {"label": "ฒ (Tho Phuthao)", "bytes": [14, 17, 17, 29, 21, 21, 18, 0]}, "0xB3": {"label": "ณ (No Nen)", "bytes": [14, 17, 17, 29, 19, 17, 17, 0]}, "0xB4": {"label": "ด (Do Dek)", "bytes": [14, 17, 20, 22, 17, 17, 17, 0]}, "0xB5": {"label": "ต (To Tao)", "bytes": [20, 10, 20, 22, 17, 17, 17, 0]}, "0xB6": {"label": "ถ (Tho Thung)", "bytes": [14, 25, 21, 17, 17, 17, 14, 0]}, "0xB7": {"label": "ท (Tho Thahan)", "bytes": [14, 17, 16, 23, 25, 17, 17, 0]}, "0xB8": {"label": "ธ (Tho Thong)", "bytes": [31, 16, 16, 30, 17, 17, 14, 0]}, "0xB9": {"label": "น (No Nu)", "bytes": [14, 17, 17, 17, 25, 21, 18, 0]}, "0xBA": {"label": "บ (Bo Baimai)", "bytes": [17, 17, 17, 17, 17, 17, 14, 0]}, "0xBB": {"label": "ป (Po Pla)", "bytes": [17, 17, 17, 17, 17, 17, 14, 16]}, "0xBC": {"label": "ผ (Pho Phueng)", "bytes": [17, 17, 17, 21, 21, 21, 10, 0]}, "0xBD": {"label": "ฝ (Fo Fa)", "bytes": [17, 17, 17, 21, 21, 21, 10, 16]}, "0xBE": {"label": "พ (Pho Phan)", "bytes": [17, 17, 21, 21, 21, 17, 17, 0]}, "0xBF": {"label": "ฟ (Fo Fan)", "bytes": [17, 17, 21, 21, 21, 17, 17, 16]}, "0xC0": {"label": "ภ (Pho Samphao)", "bytes": [14, 17, 16, 16, 17, 17, 14, 0]}, "0xC1": {"label": "ม (Mo Ma)", "bytes": [14, 17, 17, 25, 21, 19, 17, 0]}, "0xC2": {"label": "ย (Yo Yak)", "bytes": [26, 21, 1, 14, 17, 17, 14, 0]}, "0xC3": {"label": "ร (Ro Ruea)", "bytes": [14, 17, 1, 6, 8, 16, 16, 0]}, "0xC4": {"label": "ฤ (Ru)", "bytes": [14, 17, 17, 17, 17, 18, 12, 0]}, "0xC5": {"label": "ล (Lo Ling)", "bytes": [14, 17, 1, 14, 17, 17, 14, 0]}, "0xC6": {"label": "ฦ (Lu)", "bytes": [14, 17, 1, 14, 17, 18, 12, 0]}, "0xC7": {"label": "ว (Wo Waen)", "bytes": [14, 17, 1, 1, 1, 2, 4, 0]}, "0xC8": {"label": "ศ (So Sala)", "bytes": [6, 9, 17, 31, 17, 17, 17, 0]}, "0xC9": {"label": "ษ (So Rusi)", "bytes": [17, 17, 21, 19, 17, 17, 14, 0]}, "0xCA": {"label": "ส (So Suea)", "bytes": [6, 9, 1, 14, 17, 17, 14, 0]}, "0xCB": {"label": "ห (Ho Hip)", "bytes": [17, 17, 21, 27, 17, 17, 17, 0]}, "0xCC": {"label": "ฬ (Lo Chula)", "bytes": [6, 9, 17, 21, 21, 17, 17, 0]}, "0xCD": {"label": "อ (O Ang)", "bytes": [14, 17, 16, 22, 25, 17, 14, 0]}, "0xCE": {"label": "ฮ (Ho Nok-huk)", "bytes": [14, 21, 18, 14, 17, 17, 14, 0]}, "0xCF": {"label": "ฯ (Paiyannoi)", "bytes": [8, 20, 8, 4, 4, 4, 0, 0]}, "0xD0": {"label": "ะ (Sara A)", "bytes": [12, 12, 0, 12, 12, 0, 0, 0]}, "0xD1": {"label": "ั (Mai Han-Akat) - สระบน", "bytes": [12, 18, 0, 0, 0, 0, 0, 0]}, "0xD2": {"label": "า (Sara Aa)", "bytes": [15, 1, 1, 1, 1, 1, 1, 0]}, "0xD3": {"label": "ำ (Sara Am)", "bytes": [6, 6, 15, 1, 1, 1, 1, 0]}, "0xD4": {"label": "ิ (Sara I) - สระบน", "bytes": [14, 31, 0, 0, 0, 0, 0, 0]}, "0xD5": {"label": "ี (Sara Ii) - สระบน", "bytes": [10, 31, 0, 0, 0, 0, 0, 0]}, "0xD6": {"label": "ึ (Sara Ue) - สระบน", "bytes": [14, 27, 0, 0, 0, 0, 0, 0]}, "0xD7": {"label": "ื (Sara Uee) - สระบน", "bytes": [21, 31, 0, 0, 0, 0, 0, 0]}, "0xD8": {"label": "ุ (Sara U) - สระล่าง", "bytes": [0, 0, 0, 0, 0, 0, 12, 8]}, "0xD9": {"label": "ู (Sara Uu) - สระล่าง", "bytes": [0, 0, 0, 0, 0, 0, 14, 10]}, "0xDA": {"label": "ฺ (Phinthu) - สระล่าง", "bytes": [0, 0, 0, 0, 0, 0, 4, 4]}, "0xE0": {"label": "เ (Sara E)", "bytes": [14, 17, 16, 16, 16, 16, 16, 0]}, "0xE1": {"label": "แ (Sara Ae)", "bytes": [27, 18, 18, 18, 18, 18, 18, 0]}, "0xE2": {"label": "โ (Sara O)", "bytes": [7, 9, 1, 14, 16, 16, 16, 0]}, "0xE3": {"label": "ใ (Sara Ai Maimuan)", "bytes": [7, 9, 5, 2, 2, 2, 2, 0]}, "0xE4": {"label": "ไ (Sara Ai Maimaloi)", "bytes": [13, 18, 1, 2, 2, 2, 2, 0]}, "0xE5": {"label": "ๅ (Lakkhangyao)", "bytes": [15, 1, 1, 1, 1, 1, 2, 4]}, "0xE6": {"label": "ๆ (Maiyamok)", "bytes": [12, 18, 4, 8, 16, 14, 1, 0]}, "0xE7": {"label": "็ (Maitaikhu) - สระบน", "bytes": [10, 21, 0, 0, 0, 0, 0, 0]}, "0xE8": {"label": "่ (Mai Ek)", "bytes": [4, 4, 0, 0, 0, 0, 0, 0]}, "0xE9": {"label": "้ (Mai Tho)", "bytes": [12, 6, 0, 0, 0, 0, 0, 0]}, "0xEA": {"label": "๊ (Mai Tri)", "bytes": [21, 10, 0, 0, 0, 0, 0, 0]}, "0xEB": {"label": "๋ (Mai Chattawa)", "bytes": [4, 14, 4, 0, 0, 0, 0, 0]}, "0xEC": {"label": "์ (Thanthakhat / Karan)", "bytes": [6, 9, 2, 0, 0, 0, 0, 0]}, "0xF0": {"label": "๐", "bytes": [0, 14, 17, 17, 17, 14, 0, 0]}, "0xF1": {"label": "๑", "bytes": [4, 10, 17, 10, 4, 2, 1, 0]}, "0xF2": {"label": "๒", "bytes": [14, 17, 2, 4, 8, 16, 31, 0]}, "0xF3": {"label": "๓", "bytes": [21, 21, 10, 4, 2, 1, 1, 0]}, "0xF4": {"label": "๔", "bytes": [17, 17, 31, 1, 1, 2, 4, 0]}, "0xF5": {"label": "๕", "bytes": [10, 21, 31, 1, 1, 2, 4, 0]}, "0xF6": {"label": "๖", "bytes": [2, 4, 8, 23, 21, 21, 14, 0]}, "0xF7": {"label": "๗", "bytes": [21, 21, 10, 4, 4, 4, 4, 0]}, "0xF8": {"label": "๘", "bytes": [21, 21, 21, 10, 4, 2, 1, 0]}, "0xF9": {"label": "๙", "bytes": [14, 17, 17, 14, 4, 2, 1]}};


const STUDIO_CGRAM = {
  activeTab: 'customizer', // 'customizer' | 'cgram' | 'thai_audit'
  line1: 'HELLO WORLD! {0}',
  line2: 'CDTI EMBEDDED   ',
  lcdTheme: 'green',       // 'green' | 'blue'
  alignMode: 'left',
  activeSlot: 0,
  thaiMode: 'improved',    // 'improved' | 'original'
  selectedThaiCode: '0xA1',
  isDrawing: false,
  drawMode: 1,             // 1 = paint, 0 = erase
  lastFocusedLine: 1,

  STORAGE_KEY_SLOTS: 'AVR_STUDIO_CGRAM_SLOTS_V3',
  STORAGE_KEY_NAMES: 'AVR_STUDIO_CGRAM_NAMES_V3',
  STORAGE_KEY_LIB:   'AVR_STUDIO_CGRAM_LIB_V3',

  // Default 8 CGRAM Slots (Classic Lab & Sensor Icons)
  defaultSlots: [
    [0x00, 0x0A, 0x1F, 0x1F, 0x0E, 0x04, 0x00, 0x00], // 0: Heart
    [0x1C, 0x14, 0x1C, 0x00, 0x00, 0x00, 0x00, 0x00], // 1: Degree
    [0x00, 0x0A, 0x00, 0x04, 0x00, 0x11, 0x0E, 0x00], // 2: Smiley
    [0x04, 0x0E, 0x15, 0x04, 0x04, 0x04, 0x04, 0x00], // 3: Up Arrow
    [0x04, 0x04, 0x04, 0x04, 0x15, 0x0E, 0x04, 0x00], // 4: Down Arrow
    [0x04, 0x0E, 0x0E, 0x0E, 0x1F, 0x00, 0x04, 0x00], // 5: Bell
    [0x04, 0x0A, 0x0A, 0x0E, 0x0E, 0x1F, 0x1F, 0x0E], // 6: Thermo
    [0x04, 0x04, 0x0A, 0x0A, 0x11, 0x11, 0x0E, 0x00]  // 7: Drop
  ],

  defaultNames: [
    '❤️ หัวใจ', '🌡️ องศา', '😊 หน้ายิ้ม', '⬆️ ขึ้น',
    '⬇️ ลง', '🔔 กระดิ่ง', '🌡️ ปรอท', '💧 หยดน้ำ'
  ],

  slots: [],
  slotNames: [],
  savedLibrary: [],

  // Built-in templates for instant drawing start
  presets: {
    heart: { name: "❤️ หัวใจ", data: [0x00, 0x0A, 0x1F, 0x1F, 0x0E, 0x04, 0x00, 0x00] },
    degree: { name: "🌡️ องศา (°)", data: [0x1C, 0x14, 0x1C, 0x00, 0x00, 0x00, 0x00, 0x00] },
    smiley: { name: "😊 หน้ายิ้ม", data: [0x00, 0x0A, 0x00, 0x04, 0x00, 0x11, 0x0E, 0x00] },
    up_arrow: { name: "⬆️ ลูกศรขึ้น", data: [0x04, 0x0E, 0x15, 0x04, 0x04, 0x04, 0x04, 0x00] },
    down_arrow: { name: "⬇️ ลูกศรลง", data: [0x04, 0x04, 0x04, 0x04, 0x15, 0x0E, 0x04, 0x00] },
    bell: { name: "🔔 กระดิ่ง", data: [0x04, 0x0E, 0x0E, 0x0E, 0x1F, 0x00, 0x04, 0x00] },
    thermo: { name: "🌡️ ปรอท", data: [0x04, 0x0A, 0x0A, 0x0E, 0x0E, 0x1F, 0x1F, 0x0E] },
    drop: { name: "💧 หยดน้ำ", data: [0x04, 0x04, 0x0A, 0x0A, 0x11, 0x11, 0x0E, 0x00] },
    bulb: { name: "💡 หลอดไฟ", data: [0x0E, 0x11, 0x11, 0x11, 0x0A, 0x0E, 0x0E, 0x04] },
    battery: { name: "🔋 แบตเตอรี่", data: [0x0E, 0x1B, 0x11, 0x1F, 0x1F, 0x1F, 0x1F, 0x00] },
    motor: { name: "⚙️ มอเตอร์", data: [0x00, 0x0E, 0x15, 0x17, 0x15, 0x0E, 0x00, 0x00] },
    block: { name: "⬛ สี่เหลี่ยมเต็ม", data: [0x1F, 0x1F, 0x1F, 0x1F, 0x1F, 0x1F, 0x1F, 0x1F] }
  },

  thaiTemplates: [
    { label: 'ก', tis: '0xA1' }, { label: 'ข', tis: '0xA2' }, { label: 'ค', tis: '0xA4' },
    { label: 'ง', tis: '0xA7' }, { label: 'จ', tis: '0xA8' }, { label: 'ช', tis: '0xAA' },
    { label: 'ด', tis: '0xB4' }, { label: 'ต', tis: '0xB5' }, { label: 'ถ', tis: '0xB6' },
    { label: 'ท', tis: '0xB7' }, { label: 'น', tis: '0xB9' }, { label: 'บ', tis: '0xBA' },
    { label: 'ป', tis: '0xBB' }, { label: 'ผ', tis: '0xBC' }, { label: 'พ', tis: '0xBE' },
    { label: 'ม', tis: '0xC1' }, { label: 'ย', tis: '0xC2' }, { label: 'ร', tis: '0xC3' },
    { label: 'ล', tis: '0xC5' }, { label: 'ว', tis: '0xC7' }, { label: 'ส', tis: '0xCA' },
    { label: 'ห', tis: '0xCB' }, { label: 'อ', tis: '0xCD' }, { label: 'ฮ', tis: '0xCE' },
    { label: 'ะ', tis: '0xD0' }, { label: 'า', tis: '0xD2' }, { label: 'ิ', tis: '0xD4' },
    { label: 'ี', tis: '0xD5' }, { label: 'ุ', tis: '0xD8' }, { label: 'ู', tis: '0xD9' },
    { label: 'เ', tis: '0xE0' }, { label: 'แ', tis: '0xE1' }, { label: 'โ', tis: '0xE2' },
    { label: 'ไ', tis: '0xE4' }
  ],

  // Initialize and load from Persistent Memory (localStorage)
  init: function() {
    try {
      const storedSlots = localStorage.getItem(this.STORAGE_KEY_SLOTS);
      if (storedSlots) {
        const parsed = JSON.parse(storedSlots);
        if (Array.isArray(parsed) && parsed.length === 8) {
          this.slots = parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load CGRAM slots from localStorage", e);
    }
    if (!this.slots || this.slots.length !== 8) {
      this.slots = JSON.parse(JSON.stringify(this.defaultSlots));
    }

    try {
      const storedNames = localStorage.getItem(this.STORAGE_KEY_NAMES);
      if (storedNames) {
        const parsed = JSON.parse(storedNames);
        if (Array.isArray(parsed) && parsed.length === 8) {
          this.slotNames = parsed;
        }
      }
    } catch (e) {}
    if (!this.slotNames || this.slotNames.length !== 8) {
      this.slotNames = [...this.defaultNames];
    }

    try {
      const storedLib = localStorage.getItem(this.STORAGE_KEY_LIB);
      if (storedLib) {
        const parsed = JSON.parse(storedLib);
        if (Array.isArray(parsed)) {
          this.savedLibrary = parsed;
        }
      }
    } catch (e) {}
    if (!this.savedLibrary || this.savedLibrary.length === 0) {
      this.savedLibrary = [
        { name: "ก (Ko Kai)", data: [14, 17, 25, 21, 19, 17, 17, 0] },
        { name: "อ (O Ang)", data: [14, 17, 16, 22, 25, 17, 14, 0] },
        { name: "⚙️ มอเตอร์หมุน", data: [0x00, 0x0E, 0x15, 0x17, 0x15, 0x0E, 0x00, 0x00] },
        { name: "🔋 แบตเตอรี่", data: [0x0E, 0x1B, 0x11, 0x1F, 0x1F, 0x1F, 0x1F, 0x00] }
      ];
    }

    // Attach global mouseup listener to terminate drag-painting
    window.addEventListener('mouseup', () => {
      if (this.isDrawing) {
        this.stopDrawing();
      }
    });
  },

  // Save changes to persistent memory
  saveToStorage: function() {
    try {
      localStorage.setItem(this.STORAGE_KEY_SLOTS, JSON.stringify(this.slots));
      localStorage.setItem(this.STORAGE_KEY_NAMES, JSON.stringify(this.slotNames));
      localStorage.setItem(this.STORAGE_KEY_LIB, JSON.stringify(this.savedLibrary));
      this.flashAutoSaveBadge();
    } catch (e) {
      console.warn("Error saving CGRAM to localStorage", e);
    }
  },

  flashAutoSaveBadge: function() {
    const badge = document.getElementById("cgram-autosave-badge");
    if (badge) {
      badge.textContent = "💾 บันทึกความจำแล้ว (Auto-saved)";
      badge.style.color = "#10b981";
      badge.style.borderColor = "#10b981";
      setTimeout(() => {
        if (badge) {
          badge.textContent = "💾 บันทึกความจำถาวร (Persistent)";
          badge.style.color = "";
          badge.style.borderColor = "";
        }
      }, 1500);
    }
  },

  // Render top-level Studio Container
  renderEditor: function() {
    if (!this.slots || this.slots.length !== 8) {
      this.init();
    }
    const currentTab = this.activeTab;

    return `
      <div class="cgram-container">
        <!-- Header & Nav Tabs -->
        <div class="lcd-studio-header">
          <div class="lcd-studio-titles">
            <h3>📟 LCD 16&times;2 Studio & CGRAM Font Designer</h3>
            <p>จำลองหน้าจอ LCD 1602A เสมือนจริง • วาดพิกเซล CGRAM 8 ช่องบันทึกถาวร • รองรับการแทรก {0}-{7} • วิเคราะห์ฟอนต์ไทย TIS-620</p>
          </div>
          <div class="lcd-nav-tabs">
            <button class="lcd-nav-btn ${currentTab === 'customizer' ? 'active' : ''}" onclick="STUDIO_CGRAM.switchSubTab('customizer')">
              <span>📟</span> ปรับแต่งข้อความ LCD 16&times;2
            </button>
            <button class="lcd-nav-btn ${currentTab === 'cgram' ? 'active' : ''}" onclick="STUDIO_CGRAM.switchSubTab('cgram')">
              <span>🎨</span> ตัววาดพิกเซล CGRAM (8 Slots & คลังความจำ)
            </button>
            <button class="lcd-nav-btn ${currentTab === 'thai_audit' ? 'active' : ''}" onclick="STUDIO_CGRAM.switchSubTab('thai_audit')">
              <span>🇹🇭</span> คลังฟอนต์ไทย 91 ตัว & การวิเคราะห์
            </button>
          </div>
        </div>

        <!-- Sub-View Panels -->
        <div class="lcd-studio-content">
          ${currentTab === 'customizer' ? this.renderCustomizer() : (currentTab === 'cgram' ? this.renderCgramDesigner() : this.renderThaiAudit())}
        </div>
      </div>
    `;
  },

  switchSubTab: function(tab) {
    this.activeTab = tab;
    const el = document.getElementById("studio-tab-cgram");
    if (el) {
      el.innerHTML = this.renderEditor();
    }
  },

  // ============================================================================
  // TAB 1: LCD 16x2 Text Customizer & Live Dot Matrix Simulator
  // ============================================================================
  renderCustomizer: function() {
    const screenHtml = this.renderVirtualScreen();
    const cCode = this.generateLcdCCode();
    const asmCode = this.generateLcdAsmCode();

    // Render Quick Slot Chips
    let slotChipsHtml = '';
    for (let s = 0; s < 8; s++) {
      const name = this.slotNames[s] || `Slot ${s}`;
      slotChipsHtml += `
        <button class="lcd-slot-insert-chip" onclick="STUDIO_CGRAM.insertSlotToken(${s})" title="แทรกอักขระพิเศษ CGRAM Slot {${s}} ลงในข้อความ">
          <span>+ {${s}}</span> <span>${this.escapeHtml(name)}</span>
        </button>
      `;
    }

    return `
      <div class="lcd-customizer-grid">
        <!-- Left: Virtual LCD 16x2 Screen & Inputs -->
        <div class="lcd-left-panel">
          
          <!-- Virtual LCD Hardware Module -->
          <div class="lcd-hardware-bezel theme-${this.lcdTheme}">
            <div class="lcd-bezel-top">
              <span class="lcd-brand-label">1602A • HD44780 CONTROLLER</span>
              <div class="lcd-theme-toggles">
                <button class="lcd-theme-btn ${this.lcdTheme === 'green' ? 'active' : ''}" onclick="STUDIO_CGRAM.setTheme('green')" title="จอสีเขียว-เหลืองคลาสสิก">🟢 Classic</button>
                <button class="lcd-theme-btn ${this.lcdTheme === 'blue' ? 'active' : ''}" onclick="STUDIO_CGRAM.setTheme('blue')" title="จอสีน้ำเงินไฮเทค">🔵 Blue</button>
              </div>
            </div>

            <!-- Dot Matrix Screen -->
            <div class="lcd-glass-screen" id="lcd-glass-screen">
              ${screenHtml}
            </div>

            <div class="lcd-bezel-bottom">
              <div class="lcd-pin-header">
                <span>VSS</span><span>VDD</span><span>V0</span><span>RS</span><span>RW</span><span>E</span>
                <span>D4</span><span>D5</span><span>D6</span><span>D7</span><span>A</span><span>K</span>
              </div>
              <span class="lcd-voltage-label">5V DC • 4-BIT INTERFACE</span>
            </div>
          </div>

          <!-- Text Input Controls -->
          <div class="lcd-input-card">
            <div style="font-weight: 700; font-size: 13.5px; color: var(--text-main); margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span>✏️ กำหนดข้อความและการจัดวาง (Text & Spacing Controls)</span>
              <span style="font-size: 11px; color: var(--primary);">16 ตัวอักษรต่อบรรทัด</span>
            </div>

            <!-- Slot Insert Bar -->
            <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 4px;">
              💡 จอ LCD 1602 (HD44780) แสดงตัวอักษรภาษาอังกฤษ ASCII และอักขระพิเศษ CGRAM 8 ตัวที่วาดเอง {0}-{7}:
            </div>
            <div class="lcd-slot-insert-bar">
              <span style="font-size: 11px; font-weight: 600; color: var(--primary);">แทรก CGRAM:</span>
              ${slotChipsHtml}
            </div>

            <!-- Line 1 Control -->
            <div class="lcd-input-row">
              <label>บรรทัดที่ 1 (0x80):</label>
              <div class="lcd-input-wrapper">
                <input type="text" id="lcd-input-l1" maxlength="32" value="${this.escapeHtml(this.line1)}"
                  onfocus="STUDIO_CGRAM.lastFocusedLine = 1"
                  oninput="STUDIO_CGRAM.onLineChange(1, this.value)"
                  placeholder="ข้อความบรรทัด 1 เช่น HELLO {0}">
                <span class="lcd-len-badge" id="lcd-len-l1">${this.countDisplayCols(this.line1)}/16</span>
              </div>
            </div>

            <!-- Line 2 Control -->
            <div class="lcd-input-row">
              <label>บรรทัดที่ 2 (0xC0):</label>
              <div class="lcd-input-wrapper">
                <input type="text" id="lcd-input-l2" maxlength="32" value="${this.escapeHtml(this.line2)}"
                  onfocus="STUDIO_CGRAM.lastFocusedLine = 2"
                  oninput="STUDIO_CGRAM.onLineChange(2, this.value)"
                  placeholder="ข้อความบรรทัด 2 เช่น CDTI EMBEDDED">
                <span class="lcd-len-badge" id="lcd-len-l2">${this.countDisplayCols(this.line2)}/16</span>
              </div>
            </div>

            <!-- Quick Alignment Toolbar -->
            <div class="lcd-align-toolbar">
              <span style="font-size: 12px; font-weight: 600; color: var(--text-muted); align-self: center;">การจัดตำแหน่ง:</span>
              <button class="btn-sm btn-secondary" onclick="STUDIO_CGRAM.setAlignment('left')" title="ชิดซ้ายทั้ง 2 บรรทัด">⬅️ ชิดซ้าย</button>
              <button class="btn-sm btn-secondary" onclick="STUDIO_CGRAM.setAlignment('center')" title="กึ่งกลางจอ 16 ช่อง">↔️ กึ่งกลาง</button>
              <button class="btn-sm btn-secondary" onclick="STUDIO_CGRAM.setAlignment('right')" title="ชิดขวา">➡️ ชิดขวา</button>
              <button class="btn-sm btn-secondary" onclick="STUDIO_CGRAM.shiftText('right')" title="ขยับวรรคไปทางขวา 1 ช่อง">⏩ เลื่อนขวา</button>
              <button class="btn-sm btn-secondary" onclick="STUDIO_CGRAM.shiftText('left')" title="ขยับวรรคไปทางซ้าย 1 ช่อง">⏪ เลื่อนซ้าย</button>
              <button class="btn-sm btn-secondary" onclick="STUDIO_CGRAM.clearLcd()" title="ล้างหน้าจอ">🔄 ล้างข้อความ</button>
            </div>

            <!-- Quick Lab Exam Presets -->
            <div class="lcd-presets-bar">
              <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
                🎯 พรีเซ็ตโจทย์ข้อสอบยอดนิยม (Exam Presets):
              </div>
              <div class="lcd-preset-chips">
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t501')">T5.01: Hello World {0}</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t502')">T5.02: ID & Name</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t503')">T5.03: Button Status</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t504')">T5.04: Counter 00-99</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t506')">T5.06: Temp {1}C {6}</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t507')">T5.07: Water Level {7}</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t509')">T5.09: PIN Lock</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('thai_slots')">🎨 Custom Chars {0}{1}{2}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Real-Time Generated Code & Lab Integration -->
        <div class="lcd-right-panel">
          <div class="lcd-code-card">
            <div class="lcd-code-header">
              <div>
                <h4 style="margin: 0; font-size: 14px; color: var(--text-main);">⚡ ซอร์สโค้ดภาษาซี (Embedded C / AVR-GCC)</h4>
                <p style="margin: 2px 0 0 0; font-size: 11.5px; color: var(--text-muted);">มีฟังก์ชันโหลด CGRAM ที่คุณวาดไว้พร้อมคำสั่งพิมพ์ DDRAM ครบชุด</p>
              </div>
              <button class="btn btn-primary btn-sm" onclick="STUDIO_CGRAM.applyToActiveLab()">
                🚀 นำข้อความนี้ไปใส่ในแล็บปัจจุบัน
              </button>
            </div>
            <pre class="lcd-code-display"><code id="lcd-code-c">${this.escapeHtml(cCode)}</code></pre>

            <div class="lcd-code-header" style="margin-top: 14px;">
              <div>
                <h4 style="margin: 0; font-size: 14px; color: var(--text-main);">🏛️ ซอร์สโค้ดภาษาแอสเซมบลี (AVR Assembly GNU Syntax)</h4>
                <p style="margin: 2px 0 0 0; font-size: 11.5px; color: var(--text-muted);">ส่งตำแหน่งและข้อมูลอักขระพิเศษผ่านพอร์ต 4-bit</p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="STUDIO_CGRAM.copyAsmCode()">📋 คัดลอก ASM</button>
            </div>
            <pre class="lcd-code-display"><code id="lcd-code-asm">${this.escapeHtml(asmCode)}</code></pre>
          </div>
        </div>
      </div>
    `;
  },

  // Insert token like {0} into line 1 or line 2
  insertSlotToken: function(slotNum) {
    const inputId = (this.lastFocusedLine === 2) ? 'lcd-input-l2' : 'lcd-input-l1';
    const input = document.getElementById(inputId);
    const token = `{${slotNum}}`;

    if (input) {
      const start = input.selectionStart || input.value.length;
      const end = input.selectionEnd || input.value.length;
      const val = input.value;
      const newVal = val.substring(0, start) + token + val.substring(end);
      input.value = newVal;
      this.onLineChange(this.lastFocusedLine, newVal);
      input.focus();
      input.setSelectionRange(start + token.length, start + token.length);
    } else {
      if (this.lastFocusedLine === 2) {
        this.line2 += token;
      } else {
        this.line1 += token;
      }
      this.refreshAllInputs();
    }
  },

  // Calculate actual columns occupied on the 16x2 LCD screen
  countDisplayCols: function(str) {
    const chars = this.prepareLineChars(str);
    return chars.filter(c => c !== ' ').length;
  },

  // Tokenize line string, keeping slot tokens {0}..{7} as single characters!
  prepareLineChars: function(str) {
    const res = [];
    let i = 0;
    while (i < str.length && res.length < 16) {
      // Check for CGRAM token {0} - {7}
      if (str[i] === '{' && (i + 2 < str.length) && str[i + 2] === '}') {
        const slotIdx = parseInt(str[i + 1], 10);
        if (!isNaN(slotIdx) && slotIdx >= 0 && slotIdx < 8) {
          res.push(`{${slotIdx}}`);
          i += 3;
          continue;
        }
      }

      const char = str[i];
      const nextChar = (i + 1 < str.length) ? str[i + 1] : null;

      // Check Thai combining vowel or tone mark
      if (nextChar && this.isThaiCombining(nextChar)) {
        res.push({ base: char, upper: nextChar });
        i += 2;
      } else {
        res.push(char);
        i += 1;
      }
    }
    while (res.length < 16) {
      res.push(' ');
    }
    return res;
  },

  isThaiCombining: function(ch) {
    const code = ch.charCodeAt(0);
    return (code === 0x0E31 || (code >= 0x0E34 && code <= 0x0E3A) || (code >= 0x0E47 && code <= 0x0E4E));
  },

  // Render 16x2 character grid on the virtual LCD screen
  renderVirtualScreen: function() {
    const l1Chars = this.prepareLineChars(this.line1);
    const l2Chars = this.prepareLineChars(this.line2);

    let html = '<div class="lcd-grid-row" id="lcd-row-0">';
    for (let c = 0; c < 16; c++) {
      const ch = l1Chars[c] || ' ';
      html += this.renderCharCell(0, c, ch);
    }
    html += '</div>';

    html += '<div class="lcd-grid-row" id="lcd-row-1">';
    for (let c = 0; c < 16; c++) {
      const ch = l2Chars[c] || ' ';
      html += this.renderCharCell(1, c, ch);
    }
    html += '</div>';

    return html;
  },

  renderCharCell: function(row, col, charData) {
    const dots = this.getGlyphDots(charData);
    let dotsHtml = '';

    for (let r = 0; r < 8; r++) {
      const rowByte = dots[r] || 0;
      for (let c = 0; c < 5; c++) {
        const isLit = (rowByte & (1 << (4 - c))) !== 0;
        dotsHtml += `<div class="lcd-dot ${isLit ? 'lit' : ''}"></div>`;
      }
    }

    const addressHex = (row === 0) ? `0x${(0x80 + col).toString(16).toUpperCase()}` : `0x${(0xC0 + col).toString(16).toUpperCase()}`;
    let labelChar = '';
    if (typeof charData === 'string' && charData.length === 3 && charData[0] === '{' && charData[2] === '}') {
      labelChar = `<span style="color:#10b981;font-weight:700;">${charData}</span>`;
    } else if (typeof charData === 'object') {
      labelChar = this.escapeHtml(charData.base + charData.upper);
    } else {
      labelChar = (charData === ' ') ? '&nbsp;' : this.escapeHtml(charData);
    }

    return `
      <div class="lcd-char-block" title="Row ${row}, Col ${col} (DDRAM: ${addressHex})">
        <div class="lcd-dots-matrix">${dotsHtml}</div>
        <div class="lcd-char-footer">${labelChar}</div>
      </div>
    `;
  },

  getGlyphDots: function(charData) {
    if (typeof charData === 'object' && charData.base && charData.upper) {
      const baseDots = this.getSingleCharDots(charData.base);
      const upperDots = this.getSingleCharDots(charData.upper);
      const res = [];
      for (let r = 0; r < 8; r++) {
        res.push((baseDots[r] || 0) | (upperDots[r] || 0));
      }
      return res;
    }
    return this.getSingleCharDots(charData);
  },

  getSingleCharDots: function(ch) {
    if (!ch) return [0,0,0,0,0,0,0,0];

    // Check CGRAM slots placeholder like '{0}', '{1}' ... '{7}'
    if (typeof ch === 'string' && ch.length === 3 && ch[0] === '{' && ch[2] === '}') {
      const slotNum = parseInt(ch[1], 10);
      if (!isNaN(slotNum) && slotNum >= 0 && slotNum < 8 && this.slots[slotNum]) {
        return this.slots[slotNum];
      }
    }

    // Check Thai font table if single Thai char
    const charCode = ch.charCodeAt(0);
    if (charCode >= 0x0E01 && charCode <= 0x0E5B) {
      const tisCode = '0x' + (charCode - 0x0E00 + 0xA0).toString(16).toUpperCase();
      const fontTable = (this.thaiMode === 'improved') ? THAI_FONT_IMPROVED : THAI_FONT_ORIGINAL;
      if (fontTable[tisCode] && fontTable[tisCode].bytes) {
        return fontTable[tisCode].bytes;
      }
    }

    // Check ASCII font
    if (LCD_ASCII_FONT[ch]) {
      return LCD_ASCII_FONT[ch];
    }

    // Fallback: blank
    return [0,0,0,0,0,0,0,0];
  },

  // Input handling
  onLineChange: function(lineNum, val) {
    if (lineNum === 1) {
      this.line1 = val;
      const el = document.getElementById("lcd-len-l1");
      if (el) el.textContent = `${this.countDisplayCols(val)}/16`;
    } else {
      this.line2 = val;
      const el = document.getElementById("lcd-len-l2");
      if (el) el.textContent = `${this.countDisplayCols(val)}/16`;
    }
    this.refreshLiveSimulator();
  },

  setAlignment: function(mode) {
    this.alignMode = mode;
    this.line1 = this.alignText(this.line1, mode);
    this.line2 = this.alignText(this.line2, mode);
    this.refreshAllInputs();
  },

  alignText: function(text, mode) {
    const trimmed = text.trim();
    const cols = this.countDisplayCols(trimmed);
    if (mode === 'left') {
      return trimmed;
    } else if (mode === 'center') {
      const padTotal = Math.max(0, 16 - cols);
      const padLeft = Math.floor(padTotal / 2);
      return ' '.repeat(padLeft) + trimmed;
    } else if (mode === 'right') {
      const padLeft = Math.max(0, 16 - cols);
      return ' '.repeat(padLeft) + trimmed;
    }
    return text;
  },

  shiftText: function(dir) {
    if (dir === 'right') {
      if (this.countDisplayCols(this.line1) < 16) this.line1 = ' ' + this.line1;
      if (this.countDisplayCols(this.line2) < 16) this.line2 = ' ' + this.line2;
    } else if (dir === 'left') {
      if (this.line1.startsWith(' ')) this.line1 = this.line1.substring(1);
      if (this.line2.startsWith(' ')) this.line2 = this.line2.substring(1);
    }
    this.refreshAllInputs();
  },

  clearLcd: function() {
    this.line1 = '';
    this.line2 = '';
    this.refreshAllInputs();
  },

  setTheme: function(theme) {
    this.lcdTheme = theme;
    const bezel = document.querySelector(".lcd-hardware-bezel");
    if (bezel) {
      bezel.className = `lcd-hardware-bezel theme-${theme}`;
    }
  },

  loadPreset: function(id) {
    const presets = {
      't501': { l1: 'HELLO WORLD! {0}', l2: 'CDTI EMBEDDED' },
      't502': { l1: 'ID: 6710301009', l2: 'APISAK KONGPAKDI' },
      't503': { l1: 'SW1: SYSTEM ON', l2: 'SW2: RUNNING {3}' },
      't504': { l1: 'COUNT: 00', l2: 'UP/DOWN TIMER' },
      't506': { l1: 'TEMP: 28.5{1}C {6}', l2: 'VOLT: 4.85V' },
      't507': { l1: 'WATER: 85% {7}', l2: 'PUMP: RUNNING' },
      't509': { l1: 'ENTER PIN: 4-DIG', l2: '**** [LOCKED]' },
      'thai_slots': { l1: '{0}{1}{2} AVR 2026', l2: 'MY CUSTOM CHARS' }
    };
    if (presets[id]) {
      this.line1 = presets[id].l1;
      this.line2 = presets[id].l2;
      this.refreshAllInputs();
    }
  },

  refreshAllInputs: function() {
    const in1 = document.getElementById("lcd-input-l1");
    const in2 = document.getElementById("lcd-input-l2");
    if (in1) in1.value = this.line1;
    if (in2) in2.value = this.line2;
    const el1 = document.getElementById("lcd-len-l1");
    const el2 = document.getElementById("lcd-len-l2");
    if (el1) el1.textContent = `${this.countDisplayCols(this.line1)}/16`;
    if (el2) el2.textContent = `${this.countDisplayCols(this.line2)}/16`;
    this.refreshLiveSimulator();
  },

  refreshLiveSimulator: function() {
    const screen = document.getElementById("lcd-glass-screen");
    if (screen) {
      screen.innerHTML = this.renderVirtualScreen();
    }
    const codeC = document.getElementById("lcd-code-c");
    const codeAsm = document.getElementById("lcd-code-asm");
    if (codeC) codeC.textContent = this.generateLcdCCode();
    if (codeAsm) codeAsm.textContent = this.generateLcdAsmCode();
  },

  // Helper to replace {0} with \x08 and {1}-{7} with \x01-\x07 in C string
  formatCStringWithSlots: function(str) {
    let out = str.replace(/"/g, '\\"');
    out = out.replace(/\{([0-7])\}/g, (match, slot) => {
      const s = parseInt(slot, 10);
      return (s === 0) ? '\\x08' : `\\x0${s}`;
    });
    return out;
  },

  // Generate Embedded C snippet
  generateLcdCCode: function() {
    const str1 = this.formatCStringWithSlots(this.line1);
    const str2 = this.formatCStringWithSlots(this.line2);

    // Identify which CGRAM slots are actually referenced in line1 or line2
    const usedSlots = new Set();
    const regex = /\{([0-7])\}/g;
    let m;
    while ((m = regex.exec(this.line1)) !== null) usedSlots.add(parseInt(m[1], 10));
    while ((m = regex.exec(this.line2)) !== null) usedSlots.add(parseInt(m[1], 10));

    let cgramDefinitions = '';
    let cgramLoads = '';

    if (usedSlots.size > 0) {
      cgramDefinitions += `// ==========================================\n// ข้อมูลบิตแมปอักขระพิเศษ CGRAM (PROGMEM)\n// ==========================================\n`;
      usedSlots.forEach(s => {
        const hexArr = this.slots[s].map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ');
        cgramDefinitions += `const uint8_t custom_char_${s}[8] PROGMEM = { ${hexArr} }; // ${this.slotNames[s] || 'Slot ' + s}\n`;
        cgramLoads += `    lcd_load_cgram(${s}, custom_char_${s});\n`;
      });
    }

    return `// ==========================================
// Embedded C (AVR-GCC): LCD 1602 Custom Text Display
// ==========================================
#include <avr/io.h>
#include <avr/pgmspace.h>
#include <util/delay.h>

${cgramDefinitions}
${usedSlots.size > 0 ? `// ฟังก์ชันโหลดข้อมูลเข้า CGRAM (Address: 0x40 + slot * 8)
void lcd_load_cgram(uint8_t slot, const uint8_t *glyph) {
    lcd_command(0x40 | (slot << 3));
    for (uint8_t i = 0; i < 8; i++) {
        lcd_data(pgm_read_byte(&glyph[i]));
    }
}
` : ''}
void lcd_display_custom_text(void) {
    // 1. เริ่มต้นระบบ LCD
    lcd_command(0x01); // Clear Display
    _delay_ms(2);
    lcd_command(0x0C); // Display ON, Cursor OFF

${cgramLoads ? `    // 2. โหลดอักขระพิเศษ CGRAM ที่คุณวาดไว้เข้าหน้าจอ\n${cgramLoads}\n` : ''}    // บรรทัดที่ 1: กำหนด DDRAM Address = 0x80 (Row 0, Col 0)
    lcd_command(0x80);
    // หมายเหตุ: อักขระ Slot 0 สามารถส่งด้วยรหัส \\x08 เพื่อเลี่ยง null-terminator \\0 ในสตริงภาษา C
    lcd_puts("${str1}");

    // บรรทัดที่ 2: กำหนด DDRAM Address = 0xC0 (Row 1, Col 0)
    lcd_command(0xC0);
    lcd_puts("${str2}");
}`;
  },

  // Generate AVR GNU Assembly snippet
  generateLcdAsmCode: function() {
    return `; ==========================================
; AVR GNU Assembly: LCD 1602 Custom Text Display
; ==========================================
.global lcd_display_custom_text
lcd_display_custom_text:
    ; 1. เคลียร์จอภาพ (0x01)
    ldi   r24, 0x01
    rcall lcd_command
    rcall delay_2ms

    ; 2. กำหนดตำแหน่งบรรทัดที่ 1 (DDRAM Address 0x80)
    ldi   r24, 0x80
    rcall lcd_command
    ldi   r30, lo8(str_line1)
    ldi   r31, hi8(str_line1)
    rcall lcd_print_flash_string

    ; 3. กำหนดตำแหน่งบรรทัดที่ 2 (DDRAM Address 0xC0)
    ldi   r24, 0xC0
    rcall lcd_command
    ldi   r30, lo8(str_line2)
    ldi   r31, hi8(str_line2)
    rcall lcd_print_flash_string
    ret

str_line1: .asciz "${this.line1}"
str_line2: .asciz "${this.line2}"`;
  },

  applyToActiveLab: function() {
    if (typeof state === 'undefined' || !state.activeLabId) {
      alert("กรุณาเลือกแล็บที่ต้องการแก้ไขก่อน");
      return;
    }
    const lab = LABS_DATA.find(l => l.id === state.activeLabId);
    if (!lab) return;

    const str1 = this.formatCStringWithSlots(this.line1);
    const str2 = this.formatCStringWithSlots(this.line2);

    if (lab.avrCode) {
      if (lab.avrCode.includes("lcd_puts") || lab.avrCode.includes("lcd_command(0x80)")) {
        lab.avrCode = lab.avrCode.replace(/lcd_puts\s*\(\s*"[^"]*"\s*\)/g, (match, idx) => {
          return (idx === 0) ? `lcd_puts("${str1}")` : `lcd_puts("${str2}")`;
        });
      }
    }

    if (typeof updateCodeDisplays === 'function') {
      updateCodeDisplays(lab);
    }
    alert(`อัปเดตข้อความ "${this.line1}" / "${this.line2}" เข้าสู่โค้ดแล็บ ${lab.id} เรียบร้อยแล้ว!`);
  },

  copyAsmCode: function() {
    const code = this.generateLcdAsmCode();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => alert("คัดลอกโค้ด Assembly เรียบร้อยแล้ว!"));
    }
  },

  // ============================================================================
  // TAB 2: CGRAM 5x8 Pixel Matrix Designer (Drag-to-Paint & Persistent Storage)
  // ============================================================================
  renderCgramDesigner: function() {
    if (!this.slots || this.slots.length !== 8) {
      this.init();
    }

    // Render 8 Slot buttons with mini dot previews
    let slotButtons = '';
    for (let s = 0; s < 8; s++) {
      const activeClass = (this.activeSlot === s) ? 'active' : '';
      const name = this.slotNames[s] || `Slot ${s}`;
      const miniDotsHtml = this.renderMiniSlotDots(s);

      slotButtons += `
        <button class="cgram-slot-btn ${activeClass}" id="cgram-slot-${s}" onclick="STUDIO_CGRAM.selectSlot(${s})">
          <div style="display:flex; justify-content:space-between; width:100%; font-size:11px;">
            <span>Slot {${s}}</span>
          </div>
          <div class="cgram-slot-mini-preview" id="cgram-mini-slot-${s}">
            ${miniDotsHtml}
          </div>
          <div style="font-size:10.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:85px;">
            ${this.escapeHtml(name)}
          </div>
        </button>
      `;
    }

    // Render 5x8 drawing cells
    let cellsHtml = '';
    const currentData = this.slots[this.activeSlot];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 5; c++) {
        const bitMask = 1 << (4 - c);
        const isSet = (currentData[r] & bitMask) !== 0;
        const activeClass = isSet ? 'active' : '';
        cellsHtml += `
          <div class="cgram-cell ${activeClass}" id="cgram-cell-${r}-${c}"
            onmousedown="STUDIO_CGRAM.startDrawing(${r}, ${c}, event)"
            onmouseenter="STUDIO_CGRAM.paintCell(${r}, ${c})"
            title="แถว ${r}, คอลัมน์ ${c}">
          </div>
        `;
      }
    }

    // Render Thai Templates Chips
    let thaiChips = '';
    this.thaiTemplates.forEach(t => {
      thaiChips += `
        <button class="cgram-template-chip" onclick="STUDIO_CGRAM.loadThaiTemplate('${t.tis}', '${t.label}')" title="โหลด '${t.label}' มาแก้ไขต่อ">
          ${t.label}
        </button>
      `;
    });

    // Render Hardware Icon Presets
    let presetButtons = '';
    Object.keys(this.presets).forEach(k => {
      const p = this.presets[k];
      presetButtons += `<button class="cgram-preset-btn" onclick="STUDIO_CGRAM.applyPreset('${k}')">${p.name}</button>`;
    });

    // Render Saved Custom Character Library
    let savedLibHtml = '';
    if (this.savedLibrary.length === 0) {
      savedLibHtml = `<div style="font-size:11.5px; color:var(--text-muted); font-style:italic;">ยังไม่มีอักขระที่บันทึกไว้ — คุณสามารถวาดแล้วกด 'บันทึกเข้าคลัง' ได้ทันที</div>`;
    } else {
      this.savedLibrary.forEach((item, idx) => {
        savedLibHtml += `
          <div class="cgram-saved-item">
            <div class="cgram-saved-item-left">
              <span style="font-weight:700; color:var(--text-main); font-size:12px;">${this.escapeHtml(item.name)}</span>
            </div>
            <div class="cgram-saved-actions">
              <button class="btn-sm btn-primary" style="padding:4px 8px; font-size:11px;" onclick="STUDIO_CGRAM.loadFromLibrary(${idx})" title="โหลดเข้า Slot {${this.activeSlot}}">
                📥 โหลดลง Slot {${this.activeSlot}}
              </button>
              <button class="cgram-saved-btn" onclick="STUDIO_CGRAM.deleteFromLibrary(${idx})" title="ลบออกจากคลัง">❌</button>
            </div>
          </div>
        `;
      });
    }

    setTimeout(() => {
      this.updatePreviewAndCode();
    }, 0);

    return `
      <div class="cgram-workspace-row">
        <!-- Left: 5x8 Grid & Tool Buttons -->
        <div class="cgram-grid-box">
          <div style="font-weight: 700; font-size: 13.5px; margin-bottom: 8px; color: var(--text-main); display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span>กระดานวาดพิกเซล CGRAM (5&times;8 Dots)</span>
            <span class="badge-status" id="cgram-autosave-badge">💾 บันทึกความจำถาวร (Persistent)</span>
          </div>

          <!-- Slots Bar -->
          <div class="cgram-slots-bar">
            ${slotButtons}
          </div>

          <!-- 5x8 Interactive Drawing Board -->
          <div class="cgram-pixel-grid" id="cgram-pixel-grid" onmouseleave="STUDIO_CGRAM.stopDrawing()">
            ${cellsHtml}
          </div>

          <!-- Tool Buttons -->
          <div class="cgram-grid-tools">
            <button class="cgram-tool-btn" onclick="STUDIO_CGRAM.invertGrid()" title="สลับพิกเซลมืด/สว่าง">🌓 กลับสี (Invert)</button>
            <button class="cgram-tool-btn" onclick="STUDIO_CGRAM.clearGrid()" title="ล้างพิกเซลทั้งหมดใน Slot นี้">🔄 ล้างกระดาน</button>
            <button class="cgram-tool-btn" onclick="STUDIO_CGRAM.shiftGrid('up')" title="เลื่อนพิกเซลขึ้น 1 แถว">⬆️ เลื่อนขึ้น</button>
            <button class="cgram-tool-btn" onclick="STUDIO_CGRAM.shiftGrid('down')" title="เลื่อนพิกเซลลง 1 แถว">⬇️ เลื่อนลง</button>
            <button class="cgram-tool-btn" onclick="STUDIO_CGRAM.shiftGrid('left')" title="เลื่อนพิกเซลไปทางซ้าย 1 คอลัมน์">⬅️ ซ้าย</button>
            <button class="cgram-tool-btn" onclick="STUDIO_CGRAM.shiftGrid('right')" title="เลื่อนพิกเซลไปทางขวา 1 คอลัมน์">➡️ ขวา</button>
            <button class="cgram-tool-btn" onclick="STUDIO_CGRAM.renameActiveSlot()" title="ตั้งชื่อให้กับ Slot นี้">✏️ เปลี่ยนชื่อ</button>
          </div>

          <!-- Quick Templates Section -->
          <div class="cgram-template-section">
            <div style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
              🇹🇭 แม่แบบภาษาไทย (คลิกเพื่อโหลดมาวาดต่อใน Slot {${this.activeSlot}}):
            </div>
            <div class="cgram-template-chips">
              ${thaiChips}
            </div>

            <div style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); margin: 10px 0 6px 0;">
              🎨 แม่แบบไอคอนสำเร็จรูป:
            </div>
            <div class="cgram-presets-grid">
              ${presetButtons}
            </div>
          </div>
        </div>

        <!-- Right: Preview, Hex array, and C Function Generator -->
        <div class="cgram-code-view">
          <div style="font-weight: 700; font-size: 13.5px; margin-bottom: 10px; color: var(--text-main);">
            📟 ตัวอย่างการแสดงผลบน LCD เสมือน (Live HD44780 Emulation)
          </div>

          <div class="cgram-lcd-preview-card" style="margin-bottom: 16px;">
            <div class="cgram-lcd-dot-preview" id="cgram-live-dots"></div>
            <div>
              <div style="font-weight: 700; font-size: 14.5px; color: #10b981;" id="cgram-live-title">
                HD44780 CGRAM Slot {${this.activeSlot}}: ${this.escapeHtml(this.slotNames[this.activeSlot] || '')}
              </div>
              <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 3px;">
                CGRAM Address: <code style="color: var(--primary);">0x${(0x40 + (this.activeSlot * 8)).toString(16).toUpperCase()}</code> | DDRAM Code: <code>0x0${this.activeSlot}</code> (หรือ <code>0x08</code>)
              </div>
            </div>
          </div>

          <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px; color: var(--text-main);">
            📦 ตารางข้อมูลไบนารีและเลขฐานสิบหก (C Array / PROGMEM)
          </div>
          <pre class="cgram-hex-output" id="cgram-hex-box"></pre>

          <div class="cgram-code-actions">
            <button class="btn-action btn-flash" onclick="STUDIO_CGRAM.saveActiveSlotToLibrary()" title="บันทึกอักขระนี้เก็บไว้ในคลังความจำถาวร">
              <span>💾</span> บันทึกลงคลัง
            </button>
            <button class="btn-action btn-download" onclick="STUDIO_CGRAM.copyCode()" title="คัดลอกโค้ด C ไปใช้งาน">
              <span>📋</span> คัดลอกโค้ด C
            </button>
            <button class="btn-action btn-full" onclick="STUDIO_CGRAM.sendActiveSlotToLcd()" title="นำอักขระนี้ไปเปิดดูในแท็บหน้าจอ LCD 16x2">
              <span>📟</span> นำอักขระนี้ไปแสดงบนหน้าจอ LCD 16&times;2
            </button>
          </div>

          <!-- Saved Library Section -->
          <div class="cgram-memory-card">
            <div class="cgram-memory-header">
              <span>🗄️ คลังอักขระที่คุณบันทึกไว้ (My Saved Glyphs)</span>
              <span style="font-size: 11px; color: var(--primary);">${this.savedLibrary.length} รายการ</span>
            </div>
            <div class="cgram-saved-list" id="cgram-saved-list">
              ${savedLibHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Render 5x8 mini preview for a slot button
  renderMiniSlotDots: function(slot) {
    const data = this.slots[slot] || [0,0,0,0,0,0,0,0];
    let html = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 5; c++) {
        const isSet = (data[r] & (1 << (4 - c))) !== 0;
        html += `<div class="cgram-slot-mini-dot ${isSet ? 'active' : ''}"></div>`;
      }
    }
    return html;
  },

  updateMiniPreview: function(slot) {
    const el = document.getElementById(`cgram-mini-slot-${slot}`);
    if (el) {
      el.innerHTML = this.renderMiniSlotDots(slot);
    }
  },

  selectSlot: function(slot) {
    this.activeSlot = slot;
    this.renderCgramSlotGrid();
    document.querySelectorAll(".cgram-slot-btn").forEach((b, idx) => {
      b.classList.toggle("active", idx === slot);
    });
    const titleEl = document.getElementById("cgram-live-title");
    if (titleEl) {
      titleEl.textContent = `HD44780 CGRAM Slot {${slot}}: ${this.slotNames[slot] || ''}`;
    }
    this.updatePreviewAndCode();
  },

  renderCgramSlotGrid: function() {
    const currentData = this.slots[this.activeSlot];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 5; c++) {
        const cell = document.getElementById(`cgram-cell-${r}-${c}`);
        if (cell) {
          const isSet = (currentData[r] & (1 << (4 - c))) !== 0;
          cell.className = "cgram-cell" + (isSet ? " active" : "");
        }
      }
    }
  },

  updateCellDom: function(r, c) {
    const bitMask = 1 << (4 - c);
    const isSet = (this.slots[this.activeSlot][r] & bitMask) !== 0;
    const cell = document.getElementById(`cgram-cell-${r}-${c}`);
    if (cell) {
      cell.className = "cgram-cell" + (isSet ? " active" : "");
    }
  },

  // Mouse Drag-to-Paint handlers
  startDrawing: function(r, c, event) {
    if (event) event.preventDefault();
    this.isDrawing = true;
    const bitMask = 1 << (4 - c);
    const wasSet = (this.slots[this.activeSlot][r] & bitMask) !== 0;
    this.drawMode = wasSet ? 0 : 1; // if cell was already active, switch to erasing

    if (this.drawMode === 1) {
      this.slots[this.activeSlot][r] |= bitMask;
    } else {
      this.slots[this.activeSlot][r] &= ~bitMask;
    }

    this.updateCellDom(r, c);
    this.updateMiniPreview(this.activeSlot);
    this.updatePreviewAndCode();
  },

  paintCell: function(r, c) {
    if (!this.isDrawing) return;
    const bitMask = 1 << (4 - c);
    if (this.drawMode === 1) {
      this.slots[this.activeSlot][r] |= bitMask;
    } else {
      this.slots[this.activeSlot][r] &= ~bitMask;
    }
    this.updateCellDom(r, c);
    this.updateMiniPreview(this.activeSlot);
    this.updatePreviewAndCode();
  },

  stopDrawing: function() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.saveToStorage();
      this.refreshLiveSimulator();
    }
  },

  invertGrid: function() {
    for (let r = 0; r < 8; r++) {
      this.slots[this.activeSlot][r] = (~this.slots[this.activeSlot][r]) & 0x1F;
    }
    this.renderCgramSlotGrid();
    this.updateMiniPreview(this.activeSlot);
    this.updatePreviewAndCode();
    this.saveToStorage();
    this.refreshLiveSimulator();
  },

  clearGrid: function() {
    this.slots[this.activeSlot] = [0, 0, 0, 0, 0, 0, 0, 0];
    this.renderCgramSlotGrid();
    this.updateMiniPreview(this.activeSlot);
    this.updatePreviewAndCode();
    this.saveToStorage();
    this.refreshLiveSimulator();
  },

  shiftGrid: function(dir) {
    const data = this.slots[this.activeSlot];
    if (dir === 'up') {
      const top = data.shift();
      data.push(0);
    } else if (dir === 'down') {
      data.pop();
      data.unshift(0);
    } else if (dir === 'left') {
      for (let r = 0; r < 8; r++) {
        data[r] = (data[r] << 1) & 0x1F;
      }
    } else if (dir === 'right') {
      for (let r = 0; r < 8; r++) {
        data[r] = (data[r] >> 1) & 0x1F;
      }
    }
    this.renderCgramSlotGrid();
    this.updateMiniPreview(this.activeSlot);
    this.updatePreviewAndCode();
    this.saveToStorage();
    this.refreshLiveSimulator();
  },

  renameActiveSlot: function() {
    const oldName = this.slotNames[this.activeSlot] || '';
    const newName = prompt(`ตั้งชื่อให้กับ Slot {${this.activeSlot}}:`, oldName);
    if (newName !== null && newName.trim() !== '') {
      this.slotNames[this.activeSlot] = newName.trim();
      this.saveToStorage();
      const el = document.getElementById("studio-tab-cgram");
      if (el) el.innerHTML = this.renderEditor();
    }
  },

  applyPreset: function(key) {
    const p = this.presets[key];
    if (p) {
      this.slots[this.activeSlot] = [...p.data];
      this.slotNames[this.activeSlot] = p.name;
      this.renderCgramSlotGrid();
      this.updateMiniPreview(this.activeSlot);
      this.updatePreviewAndCode();
      this.saveToStorage();
      this.refreshLiveSimulator();
    }
  },

  loadThaiTemplate: function(tisCode, label) {
    const fontTable = (this.thaiMode === 'improved') ? THAI_FONT_IMPROVED : THAI_FONT_ORIGINAL;
    if (fontTable[tisCode] && fontTable[tisCode].bytes) {
      this.slots[this.activeSlot] = [...fontTable[tisCode].bytes];
      this.slotNames[this.activeSlot] = label;
      this.renderCgramSlotGrid();
      this.updateMiniPreview(this.activeSlot);
      this.updatePreviewAndCode();
      this.saveToStorage();
      this.refreshLiveSimulator();
    }
  },

  saveActiveSlotToLibrary: function() {
    const defaultName = this.slotNames[this.activeSlot] || `Custom ${this.savedLibrary.length + 1}`;
    const name = prompt("ตั้งชื่ออักขระเพื่อบันทึกลงคลังความจำ (Persistent Library):", defaultName);
    if (!name || name.trim() === '') return;

    this.savedLibrary.push({
      name: name.trim(),
      data: [...this.slots[this.activeSlot]]
    });
    this.saveToStorage();
    alert(`บันทึกอักขระ "${name}" ลงในคลังเรียบร้อยแล้ว!`);
    const el = document.getElementById("studio-tab-cgram");
    if (el) el.innerHTML = this.renderEditor();
  },

  loadFromLibrary: function(idx) {
    if (this.savedLibrary[idx]) {
      const item = this.savedLibrary[idx];
      this.slots[this.activeSlot] = [...item.data];
      this.slotNames[this.activeSlot] = item.name;
      this.renderCgramSlotGrid();
      this.updateMiniPreview(this.activeSlot);
      this.updatePreviewAndCode();
      this.saveToStorage();
      this.refreshLiveSimulator();
      alert(`โหลด "${item.name}" เข้าสู่ Slot {${this.activeSlot}} แล้ว!`);
    }
  },

  deleteFromLibrary: function(idx) {
    if (confirm(`คุณต้องการลบ "${this.savedLibrary[idx].name}" ออกจากคลังใช่หรือไม่?`)) {
      this.savedLibrary.splice(idx, 1);
      this.saveToStorage();
      const el = document.getElementById("studio-tab-cgram");
      if (el) el.innerHTML = this.renderEditor();
    }
  },

  sendActiveSlotToLcd: function() {
    // Append slot token to Line 1
    this.line1 += `{${this.activeSlot}}`;
    this.switchSubTab('customizer');
  },

  updatePreviewAndCode: function() {
    const dotsEl = document.getElementById("cgram-live-dots");
    const hexBox = document.getElementById("cgram-hex-box");
    if (!dotsEl || !hexBox) return;

    const current = this.slots[this.activeSlot];
    let dotsHtml = '';
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 5; c++) {
        const isSet = (current[r] & (1 << (4 - c))) !== 0;
        dotsHtml += `<div class="cgram-preview-dot ${isSet ? 'active' : ''}"></div>`;
      }
    }
    dotsEl.innerHTML = dotsHtml;

    const hexList = current.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ');
    const slotAddr = '0x' + (0x40 + (this.activeSlot * 8)).toString(16).toUpperCase();

    hexBox.textContent = `// CGRAM Slot {${this.activeSlot}} Custom Character (5x8 Dots): ${this.slotNames[this.activeSlot] || ''}
const uint8_t custom_char_${this.activeSlot}[8] PROGMEM = {
  ${hexList}
};

// ฟังก์ชันโหลดข้อมูลเข้าสู่ CGRAM ของ LCD 1602 (Address: ${slotAddr})
void load_custom_char_${this.activeSlot}(void) {
    lcd_command(${slotAddr}); // คำสั่งตั้งค่า CGRAM Address
    for (uint8_t i = 0; i < 8; i++) {
        lcd_data(pgm_read_byte(&custom_char_${this.activeSlot}[i]));
    }
    lcd_command(0x80); // เลื่อนตำแหน่งกลับมาที่ DDRAM บรรทัดที่ 1
}`;
  },

  copyCode: function() {
    const hexBox = document.getElementById("cgram-hex-box");
    if (hexBox && navigator.clipboard) {
      navigator.clipboard.writeText(hexBox.textContent).then(() => {
        alert("คัดลอกโค้ด C เรียบร้อยแล้ว!");
      });
    }
  },

  // ============================================================================
  // TAB 3: Thai Font (TIS-620) Library & Technical Audit
  // ============================================================================
  renderThaiAudit: function() {
    const fontData = (this.thaiMode === 'improved') ? THAI_FONT_IMPROVED : THAI_FONT_ORIGINAL;
    const selected = fontData[this.selectedThaiCode] || Object.values(fontData)[0];

    // Build character buttons
    let glyphButtons = '';
    Object.keys(fontData).forEach(code => {
      const g = fontData[code];
      const activeClass = (this.selectedThaiCode === code) ? 'active' : '';
      const isFixed = (this.thaiMode === 'improved' && ['0xA2', '0xCD', '0xA4', '0xB4', '0xB5', '0xB6', '0xF0'].includes(code));
      glyphButtons += `
        <button class="thai-glyph-chip ${activeClass} ${isFixed ? 'fixed-badge' : ''}" onclick="STUDIO_CGRAM.inspectThai('${code}')">
          <span class="thai-char-symbol">${g.label.split(' ')[0]}</span>
          <span class="thai-char-code">${code}</span>
        </button>
      `;
    });

    // Build 5x8 preview for selected
    let previewDots = '';
    const bytes = selected ? selected.bytes : [0,0,0,0,0,0,0,0];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 5; c++) {
        const isSet = (bytes[r] & (1 << (4 - c))) !== 0;
        previewDots += `<div class="thai-matrix-dot ${isSet ? 'lit' : ''}"></div>`;
      }
    }

    const hexStr = bytes.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ');

    return `
      <div class="thai-audit-container">
        <!-- Top: Technical Audit & Comparison Report -->
        <div class="thai-audit-card">
          <div class="thai-audit-header">
            <h4>🔬 บทวิเคราะห์ทางวิศวกรรม: การประเมินฟอนต์ภาษาไทย (THAI_FONT_Assembly & THAI_FONT_DATA)</h4>
            <div class="thai-mode-toggle">
              <span style="font-size: 12px; font-weight: 600; color: var(--text-muted);">เลือกดูชุดข้อมูล:</span>
              <button class="btn-sm ${this.thaiMode === 'improved' ? 'btn-primary' : 'btn-secondary'}" onclick="STUDIO_CGRAM.toggleThaiMode('improved')">
                ✨ ฟอนต์ปรับปรุง (แก้ไขจุดบกพร่องแล้ว)
              </button>
              <button class="btn-sm ${this.thaiMode === 'original' ? 'btn-primary' : 'btn-secondary'}" onclick="STUDIO_CGRAM.toggleThaiMode('original')">
                📄 ฟอนต์เดิมของเพื่อน (Original)
              </button>
            </div>
          </div>

          <div class="thai-audit-points">
            <div class="audit-point-box positive">
              <div class="point-title">✅ ข้อดีและจุดเด่นของไฟล์เพื่อน:</div>
              <ul>
                <li><strong>หน่วยความจำ Flash เบามาก:</strong> ขนาดเพียง 728 ไบต์ (91 Glyphs &times; 8 Bytes) จัดเก็บลง Flash Memory (PROGMEM) โดยใช้ SRAM 0 ไบต์</li>
                <li><strong>ฟังก์ชัน Assembly คมชัด:</strong> ฟังก์ชัน <code>thai_get_glyph_asm</code> ใช้คำสั่ง <code>lpm</code> พร้อมคำนวณ Z Pointer แบบ Offset &times; 8 ด้วย <code>lsl/rol</code> ได้รวดเร็ว</li>
              </ul>
            </div>

            <div class="audit-point-box warning">
              <div class="point-title">⚠️ จุดบกพร่องวิกฤตที่ต้องระวัง:</div>
              <ul>
                <li><strong>ตัวอักษรซ้ำซ้อน 100%:</strong> ในไฟล์เดิมของเพื่อน <code>ข</code> กับ <code>อ</code> มีบิตแมปเหมือนกันทุกประการ! เช่นเดียวกับ <code>ค</code> กับ <code>ด</code>, <code>ฅ</code> กับ <code>ต</code> กับ <code>ฑ</code>, และ <code>ถ</code> กับ <code>๐</code></li>
                <li><strong>ข้อจำกัดฮาร์ดแวร์ LCD1602 (HD44780):</strong> ตัวคอนโทรลเลอร์ไม่มีตารางภาษาไทยใน ROM มาตรฐาน การจะแสดงผลต้องโหลดผ่าน CGRAM ซึ่งมีเพียง <strong>8 ช่อง (Slots 0-7)</strong> เท่านั้น! จึงแนะนำให้ผู้ใช้วาดหรือเลือกเฉพาะตัวที่จำเป็น 8 ตัวลงใน CGRAM Slots เพื่อแสดงผลได้สะอาดและคมชัด</li>
                <li><strong>ปัญหาการเรียงสระ/วรรณยุกต์:</strong> สระบนและสระล่างถูกออกแบบแยกเป็นอักขระ 5&times;8 หากส่งพิมพ์ตามลำดับปกติจะกินช่องอักษรแยกต่างหาก</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Middle: 91 Glyphs Explorer & Inspector -->
        <div class="thai-explorer-row">
          <!-- Left: 91 Glyphs Grid -->
          <div class="thai-glyphs-box">
            <div style="font-weight: 700; font-size: 13px; color: var(--text-main); margin-bottom: 8px;">
              📚 คลังอักขระภาษาไทย TIS-620 ครบ 91 ตัว (คลิกเพื่อตรวจสอบพิกเซล 5&times;8)
            </div>
            <div class="thai-glyphs-grid">
              ${glyphButtons}
            </div>
          </div>

          <!-- Right: Selected Glyph Inspector -->
          <div class="thai-inspector-box">
            <div style="font-weight: 700; font-size: 14px; color: var(--primary); margin-bottom: 10px;">
              🔍 รายละเอียดอักขระ: ${selected ? selected.label : ''}
            </div>

            <div class="thai-inspector-screen">
              <div class="thai-matrix-5x8">
                ${previewDots}
              </div>
              <div class="thai-inspector-meta">
                <div><strong>รหัส TIS-620:</strong> <code>${this.selectedThaiCode}</code></div>
                <div><strong>ขนาดเมทริกซ์:</strong> 5 &times; 8 พิกเซล</div>
                <div><strong>สถานะในชุดฟอนต์:</strong> <span class="badge-status">${this.thaiMode === 'improved' ? 'ผ่านการตรวจสอบสรีระอักษร' : 'ข้อมูลดั้งเดิม'}</span></div>
              </div>
            </div>

            <div style="margin-top: 14px;">
              <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 4px;">
                รหัสบิตแมป 8 ไบต์ (Flash Memory):
              </div>
              <pre class="cgram-hex-output" style="font-size: 11px;">{ ${hexStr} };</pre>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="btn btn-primary btn-sm" onclick="STUDIO_CGRAM.sendSelectedThaiToCgram()" style="flex: 1;">
                📥 ส่งตัวนี้เข้า CGRAM Slot {${this.activeSlot}} เพื่อวาดหรือปรับแต่ง
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  inspectThai: function(code) {
    this.selectedThaiCode = code;
    const el = document.getElementById("studio-tab-cgram");
    if (el) el.innerHTML = this.renderEditor();
  },

  toggleThaiMode: function(mode) {
    this.thaiMode = mode;
    const el = document.getElementById("studio-tab-cgram");
    if (el) el.innerHTML = this.renderEditor();
    this.refreshLiveSimulator();
  },

  sendSelectedThaiToCgram: function() {
    const fontData = (this.thaiMode === 'improved') ? THAI_FONT_IMPROVED : THAI_FONT_ORIGINAL;
    const selected = fontData[this.selectedThaiCode];
    if (selected && selected.bytes) {
      this.slots[this.activeSlot] = [...selected.bytes];
      this.slotNames[this.activeSlot] = selected.label.split(' ')[0];
      this.saveToStorage();
      alert(`นำอักขระ "${selected.label}" บันทึกลง CGRAM Slot {${this.activeSlot}} เรียบร้อยแล้ว!`);
      this.switchSubTab('cgram');
    }
  },

  escapeHtml: function(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
};

// Auto-initialize when loaded
try {
  STUDIO_CGRAM.init();
} catch (e) {
  console.warn("STUDIO_CGRAM init error", e);
}
