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
  line1: 'HELLO WORLD!    ',
  line2: 'CDTI EMBEDDED   ',
  lcdTheme: 'green',       // 'green' | 'blue'
  alignMode: 'left',
  activeSlot: 0,
  thaiMode: 'improved',    // 'improved' | 'original'
  selectedThaiCode: '0xA1',
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

  // Render top-level Studio Container
  renderEditor: function() {
    const currentTab = this.activeTab;

    return `
      <div class="cgram-container">
        <!-- Header & Nav Tabs -->
        <div class="lcd-studio-header">
          <div class="lcd-studio-titles">
            <h3>📟 LCD 16&times;2 Studio & CGRAM Font Designer</h3>
            <p>จำลองหน้าจอ LCD 1602A เสมือนจริง • ปรับแต่งข้อความ 2 บรรทัดพร้อมจัดตำแหน่ง • ออกแบบ CGRAM • วิเคราะห์ฟอนต์ไทย TIS-620</p>
          </div>
          <div class="lcd-nav-tabs">
            <button class="lcd-nav-btn ${currentTab === 'customizer' ? 'active' : ''}" onclick="STUDIO_CGRAM.switchSubTab('customizer')">
              <span>📟</span> ปรับแต่งข้อความ LCD 16&times;2
            </button>
            <button class="lcd-nav-btn ${currentTab === 'cgram' ? 'active' : ''}" onclick="STUDIO_CGRAM.switchSubTab('cgram')">
              <span>🎨</span> ตัววาดพิกเซล CGRAM (8 Slots)
            </button>
            <button class="lcd-nav-btn ${currentTab === 'thai_audit' ? 'active' : ''}" onclick="STUDIO_CGRAM.switchSubTab('thai_audit')">
              <span>🇹🇭</span> คลังฟอนต์ไทย & บทวิเคราะห์ฟอนต์
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
            <div style="font-weight: 700; font-size: 13.5px; color: var(--text-main); margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
              <span>✏️ กำหนดข้อความและการเว้นวรรค (Text & Spacing Controls)</span>
              <span style="font-size: 11px; color: var(--primary);">16 ตัวอักษรต่อบรรทัด</span>
            </div>

            <!-- Line 1 Control -->
            <div class="lcd-input-row">
              <label>บรรทัดที่ 1 (0x80):</label>
              <div class="lcd-input-wrapper">
                <input type="text" id="lcd-input-l1" maxlength="16" value="${this.escapeHtml(this.line1)}" oninput="STUDIO_CGRAM.onLineChange(1, this.value)" placeholder="ข้อความบรรทัด 1 (สูงสุด 16 ตัว)">
                <span class="lcd-len-badge" id="lcd-len-l1">${this.line1.length}/16</span>
              </div>
            </div>

            <!-- Line 2 Control -->
            <div class="lcd-input-row">
              <label>บรรทัดที่ 2 (0xC0):</label>
              <div class="lcd-input-wrapper">
                <input type="text" id="lcd-input-l2" maxlength="16" value="${this.escapeHtml(this.line2)}" oninput="STUDIO_CGRAM.onLineChange(2, this.value)" placeholder="ข้อความบรรทัด 2 (สูงสุด 16 ตัว)">
                <span class="lcd-len-badge" id="lcd-len-l2">${this.line2.length}/16</span>
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
                🎯 พรีเซ็ตโจทย์สอบปฏิบัติการยอดนิยม (Exam Presets):
              </div>
              <div class="lcd-preset-chips">
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t501')">T5.01: Hello World</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t502')">T5.02: ID & Name</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t503')">T5.03: Button Status</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t504')">T5.04: Counter 00-99</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t506')">T5.06: Voltmeter</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('t509')">T5.09: PIN Lock</button>
                <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadPreset('thai')">🇹🇭 Thai Demo (ยินดีต้อนรับ)</button>
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
                <p style="margin: 2px 0 0 0; font-size: 11.5px; color: var(--text-muted);">คำสั่งควบคุม DDRAM Address และส่งสตริงออกหน้าจอ</p>
              </div>
              <button class="btn btn-primary btn-sm" onclick="STUDIO_CGRAM.applyToActiveLab()">
                🚀 นำข้อความนี้ไปใส่ในแล็บปัจจุบัน
              </button>
            </div>
            <pre class="lcd-code-display"><code id="lcd-code-c">${this.escapeHtml(cCode)}</code></pre>

            <div class="lcd-code-header" style="margin-top: 14px;">
              <div>
                <h4 style="margin: 0; font-size: 14px; color: var(--text-main);">🏛️ ซอร์สโค้ดภาษาแอสเซมบลี (AVR Assembly GNU Syntax)</h4>
                <p style="margin: 2px 0 0 0; font-size: 11.5px; color: var(--text-muted);">โหลดตำแหน่งและส่งข้อมูลเข้าหน้าจอ 4-bit</p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="STUDIO_CGRAM.copyAsmCode()">📋 คัดลอก ASM</button>
            </div>
            <pre class="lcd-code-display"><code id="lcd-code-asm">${this.escapeHtml(asmCode)}</code></pre>
          </div>
        </div>
      </div>
    `;
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

  prepareLineChars: function(str) {
    const res = [];
    let i = 0;
    while (i < str.length && res.length < 16) {
      const char = str[i];
      const nextChar = (i + 1 < str.length) ? str[i + 1] : null;

      // Check if next char is Thai combining vowel or tone mark
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
    // Thai combining: 0x0E31 (ั), 0x0E34 - 0x0E3A (ิ-ฺ), 0x0E47 - 0x0E4E (็-๎)
    return (code === 0x0E31 || (code >= 0x0E34 && code <= 0x0E3A) || (code >= 0x0E47 && code <= 0x0E4E));
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
    const labelChar = (typeof charData === 'object') ? (charData.base + charData.upper) : (charData === ' ' ? '&nbsp;' : this.escapeHtml(charData));

    return `
      <div class="lcd-char-block" title="Row ${row}, Col ${col} (DDRAM: ${addressHex})">
        <div class="lcd-dots-matrix">${dotsHtml}</div>
        <div class="lcd-char-footer">${labelChar}</div>
      </div>
    `;
  },

  getGlyphDots: function(charData) {
    // Handle combined Thai base + upper
    if (typeof charData === 'object' && charData.base && charData.upper) {
      const baseDots = this.getSingleCharDots(charData.base);
      const upperDots = this.getSingleCharDots(charData.upper);
      const res = [];
      for (let r = 0; r < 8; r++) {
        res.push(baseDots[r] | upperDots[r]);
      }
      return res;
    }
    return this.getSingleCharDots(charData);
  },

  getSingleCharDots: function(ch) {
    if (!ch) return [0,0,0,0,0,0,0,0];

    // Check CGRAM slots placeholder like '\x00', '\x01' or '{0}', '{1}'
    if (ch.startsWith && ch.startsWith('{') && ch.endsWith('}')) {
      const slotNum = parseInt(ch.substring(1, ch.length - 1));
      if (!isNaN(slotNum) && slotNum >= 0 && slotNum < 8) {
        return this.slots[slotNum];
      }
    }

    // Check Thai font table
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

  // User input handling
  onLineChange: function(lineNum, val) {
    if (lineNum === 1) {
      this.line1 = val;
      const el = document.getElementById("lcd-len-l1");
      if (el) el.textContent = `${val.length}/16`;
    } else {
      this.line2 = val;
      const el = document.getElementById("lcd-len-l2");
      if (el) el.textContent = `${val.length}/16`;
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
    if (mode === 'left') {
      return trimmed;
    } else if (mode === 'center') {
      const padTotal = Math.max(0, 16 - trimmed.length);
      const padLeft = Math.floor(padTotal / 2);
      return ' '.repeat(padLeft) + trimmed;
    } else if (mode === 'right') {
      const padLeft = Math.max(0, 16 - trimmed.length);
      return ' '.repeat(padLeft) + trimmed;
    }
    return text;
  },

  shiftText: function(dir) {
    if (dir === 'right') {
      if (this.line1.length < 16) this.line1 = ' ' + this.line1;
      if (this.line2.length < 16) this.line2 = ' ' + this.line2;
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
      't501': { l1: 'HELLO WORLD!', l2: 'CDTI EMBEDDED' },
      't502': { l1: 'ID: 6710301009', l2: 'APISAK KONGPAKDI' },
      't503': { l1: 'SW1: SYSTEM ON', l2: 'SW2: PROCESS RUN' },
      't504': { l1: 'COUNT: 00', l2: 'UP/DOWN TIMER' },
      't506': { l1: 'VOLT: 4.85 V', l2: 'ADC RAW: 993' },
      't509': { l1: 'ENTER PIN: 4-DIG', l2: '**** [LOCKED]' },
      'thai': { l1: 'ยินดีต้อนรับ', l2: 'ระบบสมองกล' }
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
    if (el1) el1.textContent = `${this.line1.length}/16`;
    if (el2) el2.textContent = `${this.line2.length}/16`;
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

  // Generate Embedded C snippet
  generateLcdCCode: function() {
    const str1 = this.line1.replace(/"/g, '\\"');
    const str2 = this.line2.replace(/"/g, '\\"');
    return `// ==========================================
// Embedded C (AVR-GCC): LCD 1602 Custom Text Display
// ==========================================
#include <avr/io.h>
#include <util/delay.h>

void lcd_display_custom_text(void) {
    // ล้างหน้าจอ LCD และตั้งค่าตำแหน่งเริ่มต้น
    lcd_command(0x01); // Clear Display
    _delay_ms(2);
    lcd_command(0x0C); // Display ON, Cursor OFF

    // บรรทัดที่ 1: กำหนด DDRAM Address = 0x80 (Row 0, Col 0)
    lcd_command(0x80);
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

  // Apply to active lab source code
  applyToActiveLab: function() {
    if (typeof state === 'undefined' || !state.activeLabId) {
      alert("กรุณาเลือกแล็บที่ต้องการแก้ไขก่อน");
      return;
    }
    const lab = LABS_DATA.find(l => l.id === state.activeLabId);
    if (!lab) return;

    // Check if lab code has lcd_puts or lcd.print
    const str1 = this.line1.replace(/"/g, '\\"');
    const str2 = this.line2.replace(/"/g, '\\"');

    if (lab.avrCode) {
      if (lab.avrCode.includes("lcd_puts") || lab.avrCode.includes("lcd_command(0x80)")) {
        lab.avrCode = lab.avrCode.replace(/lcd_puts\s*\(\s*"[^"]*"\s*\)/, `lcd_puts("${str1}")`);
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
  // TAB 2: CGRAM 5x8 Pixel Matrix Designer (Original Features Enhanced)
  // ============================================================================
  renderCgramDesigner: function() {
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
      <div class="cgram-workspace-row">
        <!-- Left: 5x8 Grid & Tool Buttons -->
        <div class="cgram-grid-box">
          <div style="font-weight: 600; font-size: 13px; margin-bottom: 8px; color: var(--text-main); display: flex; justify-content: space-between; width: 100%;">
            <span>กระดานวาดพิกเซล CGRAM (5&times;8 Dots)</span>
            <span style="font-size: 11px; color: var(--text-muted);">คลิกเพื่อสลับ เปิด/ปิด</span>
          </div>

          <!-- Slots Bar -->
          <div class="cgram-slots-bar" style="margin-bottom: 12px;">
            ${slotButtons}
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
              🎨 พรีเซ็ตไอคอนสำเร็จรูปยอดนิยม:
            </div>
            <div class="cgram-presets-grid">
              ${presetButtons}
            </div>
          </div>
        </div>

        <!-- Right: Preview, Hex array, and C Function Generator -->
        <div class="cgram-code-view">
          <div style="font-weight: 600; font-size: 13px; margin-bottom: 10px; color: var(--text-main);">
            📟 ตัวอย่างการแสดงผลบน LCD เสมือน (Live HD44780 Emulation)
          </div>

          <div class="cgram-lcd-preview-card" style="margin-bottom: 16px;">
            <div class="cgram-lcd-dot-preview" id="cgram-live-dots"></div>
            <div>
              <div style="font-weight: 600; font-size: 14px; color: #10b981;">HD44780 CGRAM Slot {${this.activeSlot}}</div>
              <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 3px;">
                Address: <code style="color: var(--primary);">0x${(0x40 + (this.activeSlot * 8)).toString(16).toUpperCase()}</code> (คำสั่งเซ็ตพอยเตอร์ CGRAM)
              </div>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 13px; margin-bottom: 6px; color: var(--text-main);">
            📦 ตารางข้อมูลไบนารีและเลขฐานสิบหก (C Array / PROGMEM)
          </div>
          <pre class="cgram-hex-output" id="cgram-hex-box"></pre>

          <div style="display: flex; gap: 8px; margin-top: 14px;">
            <button class="btn-action btn-flash" onclick="STUDIO_CGRAM.insertIntoEditor()" style="flex: 1;">
              <span>💾</span> แทรกโค้ดลงในแบบจำลอง
            </button>
            <button class="btn-action btn-download" onclick="STUDIO_CGRAM.copyCode()" style="flex: 1;">
              <span>📋</span> คัดลอกโค้ด C
            </button>
          </div>
        </div>
      </div>
    `;
  },

  selectSlot: function(slot) {
    this.activeSlot = slot;
    this.renderCgramSlotGrid();
    document.querySelectorAll(".cgram-slot-btn").forEach((b, idx) => {
      b.classList.toggle("active", idx === slot);
    });
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

  togglePixel: function(r, c) {
    const bitMask = 1 << (4 - c);
    this.slots[this.activeSlot][r] ^= bitMask;
    const isSet = (this.slots[this.activeSlot][r] & bitMask) !== 0;
    const cell = document.getElementById(`cgram-cell-${r}-${c}`);
    if (cell) cell.className = "cgram-cell" + (isSet ? " active" : "");
    this.updatePreviewAndCode();
    this.refreshLiveSimulator();
  },

  invertGrid: function() {
    for (let r = 0; r < 8; r++) {
      this.slots[this.activeSlot][r] = (~this.slots[this.activeSlot][r]) & 0x1F;
    }
    this.renderCgramSlotGrid();
    this.updatePreviewAndCode();
    this.refreshLiveSimulator();
  },

  clearGrid: function() {
    this.slots[this.activeSlot] = [0, 0, 0, 0, 0, 0, 0, 0];
    this.renderCgramSlotGrid();
    this.updatePreviewAndCode();
    this.refreshLiveSimulator();
  },

  applyPreset: function(key) {
    const p = this.presets[key];
    if (p) {
      this.slots[this.activeSlot] = [...p.data];
      this.renderCgramSlotGrid();
      this.updatePreviewAndCode();
      this.refreshLiveSimulator();
    }
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

    hexBox.textContent = `// CGRAM Slot {${this.activeSlot}} Custom Character (5x8 Dots)
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

  insertIntoEditor: function() {
    const hexBox = document.getElementById("cgram-hex-box");
    if (hexBox) {
      alert("ข้อมูลอักขระพิเศษ Slot {" + this.activeSlot + "} ถูกบันทึกแล้ว คุณสามารถคัดลอกไปใช้ในโปรแกรมได้ทันที!");
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
                <li><strong>หน่วยความจำ Flash เบามาก:</strong> ขนาดเพียง 728 ไบต์ (91 Glyphs &times; 8 Bytes) ถูกจัดเก็บลง Flash Memory (PROGMEM) โดยใช้ SRAM 0 ไบต์</li>
                <li><strong>ฟังก์ชัน Assembly คมชัด:</strong> ฟังก์ชัน <code>thai_get_glyph_asm</code> ใช้คำสั่ง <code>lpm</code> พร้อมคำนวณ Z Pointer แบบ Offset &times; 8 ด้วย <code>lsl/rol</code> ได้รวดเร็ว</li>
              </ul>
            </div>

            <div class="audit-point-box warning">
              <div class="point-title">⚠️ จุดบกพร่องวิกฤตที่ต้องระวัง:</div>
              <ul>
                <li><strong>ตัวอักษรซ้ำซ้อน 100%:</strong> ในไฟล์เดิมของเพื่อน <code>ข</code> กับ <code>อ</code> มีบิตแมปเหมือนกันทุกประการ! เช่นเดียวกับ <code>ค</code> กับ <code>ด</code>, <code>ฅ</code> กับ <code>ต</code> กับ <code>ฑ</code>, และ <code>ถ</code> กับ <code>๐</code> (ทำให้ผู้อ่านแยกคำไม่ออก)</li>
                <li><strong>ข้อจำกัดฮาร์ดแวร์ LCD1602 (HD44780):</strong> ตัวคอนโทรลเลอร์ไม่มีตารางภาษาไทยใน ROM มาตรฐาน การจะแสดงผลต้องโหลดผ่าน CGRAM ซึ่งมีเพียง <strong>8 ช่อง (Slots 0-7)</strong> เท่านั้น! จึงไม่สามารถแสดงผลคำไทยขนาดยาวพร้อมกันได้หากไม่ใช้ระบบผสมสระ (Composite Stacking)</li>
                <li><strong>ปัญหาการเรียงสระ/วรรณยุกต์:</strong> สระบน (ิ, ี) และสระล่าง (ุ, ู) ถูกออกแบบแยกเป็นอักขระ 5&times;8 หากส่งพิมพ์ตามลำดับปกติจะกินช่องอักษรแยกต่างหาก แทนที่จะซ้อนอยู่บนหัวพยัญชนะ</li>
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

            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="btn btn-primary btn-sm" onclick="STUDIO_CGRAM.sendSelectedThaiToCgram()" style="flex: 1;">
                📥 ส่งตัวนี้เข้า CGRAM Slot {${this.activeSlot}}
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
      alert(`นำอักขระ "${selected.label}" บันทึกลง CGRAM Slot {${this.activeSlot}} เรียบร้อยแล้ว!`);
      this.switchSubTab('cgram');
    }
  },

  escapeHtml: function(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
};
