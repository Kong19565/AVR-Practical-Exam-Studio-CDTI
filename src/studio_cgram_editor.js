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
  simMode: 'static',       // 'static' | 'marquee' | 'buttons' | 'blink'
  activeButton: null,      // 'sw1' | 'sw2' | 'home'
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

  // Interactive Marquee State
  marqueePlaying: false,
  marqueeDir: 'left',      // 'left' | 'right'
  marqueeSpeed: 300,       // 150, 300, 600
  marqueeTarget: 'both',   // '1' | '2' | 'both'
  marqueeOffset1: 0,
  marqueeOffset2: 0,
  marqueeTimer: null,
  marqueeLine1: 'WELCOME TO CDTI EMBEDDED STUDIO 2026! {0}',
  marqueeLine2: 'MICROCHIP ATMEGA328P 16MHZ SYSTEM {6}    ',

  // Interactive Finite State Machine (FSM) Buttons State
  activePage: 1,           // 1, 2, 3
  buttonPages: {
    1: { title: "หน้า 1: เริ่มต้น (Home)", l1: "SYSTEM READY    ", l2: "PRESS SW1 / SW2 " },
    2: { title: "หน้า 2: กด SW1 (Pin 2)", l1: "SW1 ACTIVATED   ", l2: "MODE: RUNNING {0}" },
    3: { title: "หน้า 3: กด SW2 (Pin 3)", l1: "SW2 ACTIVATED   ", l2: "TEMP: 28.5{1}C {6}" }
  },

  // Interactive Blink & Alert State
  blinkPlaying: false,
  blinkType: 'display',    // 'display' | 'text' | 'cursor'
  blinkSpeed: 500,         // 250, 500, 1000
  blinkState: true,
  blinkTimer: null,
  blinkLine1: '! EMERGENCY ALERT !',
  blinkLine2: 'OVERHEAT {6} STOP   ',

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
      <!-- Simulation Mode Selector Bar -->
      <div class="lcd-mode-selector-bar">
        <div class="lcd-mode-selector-label">
          <span>🕹️ โหมดการจำลอง LCD:</span>
        </div>
        <div class="lcd-mode-btn-group">
          <button class="lcd-mode-btn ${this.simMode === 'static' ? 'active' : ''}" onclick="STUDIO_CGRAM.setSimMode('static')" title="โหมดข้อความคงที่มาตรฐาน">
            <span>📝</span> ข้อความคงที่ (Static)
          </button>
          <button class="lcd-mode-btn ${this.simMode === 'marquee' ? 'active' : ''}" onclick="STUDIO_CGRAM.setSimMode('marquee')" title="โหมดข้อความวิ่งวนซ้ำอัตโนมัติ">
            <span>⏩</span> ข้อความวิ่ง (Marquee Scroll)
          </button>
          <button class="lcd-mode-btn ${this.simMode === 'buttons' ? 'active' : ''}" onclick="STUDIO_CGRAM.setSimMode('buttons')" title="โหมดสลับหน้าจอด้วยปุ่มกด FSM">
            <span>🔘</span> สวิตช์ปุ่มกดสลับหน้า (Button FSM)
          </button>
          <button class="lcd-mode-btn ${this.simMode === 'blink' ? 'active' : ''}" onclick="STUDIO_CGRAM.setSimMode('blink')" title="โหมดไฟกะพริบแจ้งเตือนความผิดปกติ">
            <span>🚨</span> ไฟกะพริบแจ้งเตือน (Blink Alert)
          </button>
        </div>
      </div>

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

            <!-- Interactive Tactile Push-Buttons on Bezel (SW1, SW2, Home) -->
            <div class="lcd-bezel-hardware-controls">
              <div class="lcd-bezel-sw-group">
                <span class="lcd-sw-label">TACTILE INPUTS:</span>
                <button class="lcd-bezel-btn ${this.activeButton === 'sw1' ? 'pressed' : ''}"
                        id="lcd-btn-sw1"
                        onclick="STUDIO_CGRAM.pressVirtualButton('sw1')"
                        title="สวิตช์ SW1 (ต่อขา Digital Pin 2 / PD2 แบบ Active-Low)">
                  <span class="lcd-btn-cap">🔘 กด SW1</span>
                  <span class="lcd-btn-sub">Pin 2 (PD2)</span>
                </button>
                <button class="lcd-bezel-btn ${this.activeButton === 'sw2' ? 'pressed' : ''}"
                        id="lcd-btn-sw2"
                        onclick="STUDIO_CGRAM.pressVirtualButton('sw2')"
                        title="สวิตช์ SW2 (ต่อขา Digital Pin 3 / PD3 แบบ Active-Low)">
                  <span class="lcd-btn-cap">🔘 กด SW2</span>
                  <span class="lcd-btn-sub">Pin 3 (PD3)</span>
                </button>
                <button class="lcd-bezel-btn btn-home ${this.activeButton === 'home' ? 'pressed' : ''}"
                        id="lcd-btn-home"
                        onclick="STUDIO_CGRAM.pressVirtualButton('home')"
                        title="สวิตช์ Reset / หน้าหลัก (Page 1)">
                  <span class="lcd-btn-cap">🏠 Reset / Home</span>
                  <span class="lcd-btn-sub">Page 1</span>
                </button>
              </div>
              <div class="lcd-fsm-status-indicator" id="lcd-fsm-indicator">
                <span class="fsm-dot ${this.activePage > 1 ? 'active' : ''}"></span>
                <span class="fsm-text">${this.getFsmStatusText()}</span>
              </div>
            </div>

            <div class="lcd-bezel-bottom">
              <div class="lcd-pin-header">
                <span>VSS</span><span>VDD</span><span>V0</span><span>RS</span><span>RW</span><span>E</span>
                <span>D4</span><span>D5</span><span>D6</span><span>D7</span><span>A</span><span>K</span>
              </div>
              <span class="lcd-voltage-label">5V DC • 4-BIT INTERFACE</span>
            </div>
          </div>

          <!-- Dynamic Controls Card based on Simulation Mode -->
          <div class="lcd-input-card">
            <!-- Common Slot Insert Bar -->
            <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 4px;">
              💡 จอ LCD 1602 (HD44780) แสดงตัวอักษร ASCII และอักขระพิเศษ CGRAM 8 ตัวที่วาดเอง {0}-{7}:
            </div>
            <div class="lcd-slot-insert-bar">
              <span style="font-size: 11px; font-weight: 600; color: var(--primary);">แทรก CGRAM:</span>
              ${slotChipsHtml}
            </div>

            ${this.renderModeControlBody()}
          </div>
        </div>

        <!-- Right: Real-Time Generated Code & Lab Integration -->
        <div class="lcd-right-panel">
          <div class="lcd-code-card">
            <div class="lcd-code-header">
              <div>
                <h4 style="margin: 0; font-size: 14px; color: var(--text-main);">⚡ ซอร์สโค้ดภาษาซี (Embedded C / AVR-GCC)</h4>
                <p style="margin: 2px 0 0 0; font-size: 11.5px; color: var(--text-muted);">
                  ${this.getModeCodeDescription()}
                </p>
              </div>
              <button class="btn btn-primary btn-sm" onclick="STUDIO_CGRAM.applyToActiveLab()">
                🚀 นำข้อความนี้ไปใส่ในแล็บปัจจุบัน
              </button>
            </div>
            <pre class="lcd-code-display"><code id="lcd-code-c">${this.escapeHtml(cCode)}</code></pre>

            <div class="lcd-code-header" style="margin-top: 14px;">
              <div>
                <h4 style="margin: 0; font-size: 14px; color: var(--text-main);">🏛️ ซอร์สโค้ดภาษาแอสเซมบลี (AVR Assembly GNU Syntax)</h4>
                <p style="margin: 2px 0 0 0; font-size: 11.5px; color: var(--text-muted);">
                  โครงสร้างคำสั่ง Assembly ตรงตามโหมดที่เลือก
                </p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="STUDIO_CGRAM.copyAsmCode()">📋 คัดลอก ASM</button>
            </div>
            <pre class="lcd-code-display"><code id="lcd-code-asm">${this.escapeHtml(asmCode)}</code></pre>
          </div>
        </div>
      </div>
    `;
  },

  setSimMode: function(mode) {
    this.stopMarquee();
    this.stopBlink();
    this.simMode = mode;
    this.activeButton = null;
    const content = document.getElementById("studio-tab-cgram");
    if (content) {
      content.innerHTML = this.renderEditor();
    }
    if (mode === 'marquee') {
      this.startMarquee();
    } else if (mode === 'blink') {
      this.startBlink();
    }
  },

  renderModeControlBody: function() {
    if (this.simMode === 'marquee') {
      return `
        <!-- Marquee Controls Toolbar -->
        <div class="lcd-dynamic-toolbar">
          <button class="btn-sm btn-primary" id="lcd-marquee-play-btn" onclick="STUDIO_CGRAM.toggleMarqueePlay()">
            ${this.marqueePlaying ? '⏸️ หยุดเลื่อน (Pause)' : '▶️ เริ่มเลื่อน (Play)'}
          </button>
          <div style="display: flex; gap: 4px; align-items: center;">
            <span style="font-size: 11.5px; color: var(--text-muted);">ทิศทาง:</span>
            <button class="btn-sm ${this.marqueeDir === 'left' ? 'btn-primary' : 'btn-secondary'}" onclick="STUDIO_CGRAM.setMarqueeDir('left')">⬅️ วิ่งซ้าย (0x18)</button>
            <button class="btn-sm ${this.marqueeDir === 'right' ? 'btn-primary' : 'btn-secondary'}" onclick="STUDIO_CGRAM.setMarqueeDir('right')">➡️ วิ่งขวา (0x1C)</button>
          </div>
          <div style="display: flex; gap: 4px; align-items: center;">
            <span style="font-size: 11.5px; color: var(--text-muted);">ความเร็ว:</span>
            <button class="lcd-speed-btn ${this.marqueeSpeed === 150 ? 'active' : ''}" onclick="STUDIO_CGRAM.setMarqueeSpeed(150)">⚡ 150ms</button>
            <button class="lcd-speed-btn ${this.marqueeSpeed === 300 ? 'active' : ''}" onclick="STUDIO_CGRAM.setMarqueeSpeed(300)">⏱️ 300ms</button>
            <button class="lcd-speed-btn ${this.marqueeSpeed === 600 ? 'active' : ''}" onclick="STUDIO_CGRAM.setMarqueeSpeed(600)">🐢 600ms</button>
          </div>
          <div style="display: flex; gap: 4px; align-items: center;">
            <span style="font-size: 11.5px; color: var(--text-muted);">บรรทัด:</span>
            <button class="lcd-speed-btn ${this.marqueeTarget === '1' ? 'active' : ''}" onclick="STUDIO_CGRAM.setMarqueeTarget('1')">บรรทัด 1</button>
            <button class="lcd-speed-btn ${this.marqueeTarget === '2' ? 'active' : ''}" onclick="STUDIO_CGRAM.setMarqueeTarget('2')">บรรทัด 2</button>
            <button class="lcd-speed-btn ${this.marqueeTarget === 'both' ? 'active' : ''}" onclick="STUDIO_CGRAM.setMarqueeTarget('both')">ทั้ง 2 แถว</button>
          </div>
          <button class="btn-sm btn-secondary" onclick="STUDIO_CGRAM.resetMarqueeOffset()" title="เริ่มเลื่อนใหม่ตั้งแต่ตัวอักษรแรก">🔄 รีเซ็ต</button>
        </div>

        <!-- Marquee Text Inputs (allows up to 60 characters) -->
        <div class="lcd-input-row">
          <label>ข้อความวิ่งบรรทัดที่ 1 (รองรับข้อความยาว & เลื่อนวนซ้ำอัตโนมัติ):</label>
          <div class="lcd-input-wrapper">
            <input type="text" id="lcd-input-l1" maxlength="60" value="${this.escapeHtml(this.marqueeLine1)}"
              onfocus="STUDIO_CGRAM.lastFocusedLine = 1"
              oninput="STUDIO_CGRAM.onMarqueeLineChange(1, this.value)"
              placeholder="ใส่ข้อความวิ่งยาวๆ เช่น WELCOME TO CDTI EMBEDDED {0}">
            <span class="lcd-len-badge" id="lcd-len-l1">${this.marqueeLine1.length} ตัว</span>
          </div>
        </div>

        <div class="lcd-input-row">
          <label>ข้อความวิ่งบรรทัดที่ 2:</label>
          <div class="lcd-input-wrapper">
            <input type="text" id="lcd-input-l2" maxlength="60" value="${this.escapeHtml(this.marqueeLine2)}"
              onfocus="STUDIO_CGRAM.lastFocusedLine = 2"
              oninput="STUDIO_CGRAM.onMarqueeLineChange(2, this.value)"
              placeholder="ใส่ข้อความวิ่งยาวๆ เช่น MICROCHIP ATMEGA328P {6}">
            <span class="lcd-len-badge" id="lcd-len-l2">${this.marqueeLine2.length} ตัว</span>
          </div>
        </div>

        <!-- Marquee Presets -->
        <div class="lcd-presets-bar">
          <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
            🎯 พรีเซ็ตข้อความวิ่งยอดนิยม (Marquee Presets):
          </div>
          <div class="lcd-preset-chips">
            <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadMarqueePreset('welcome')">📢 ยินดีต้อนรับสู่ CDTI {0}</button>
            <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadMarqueePreset('temp')">🌡️ แจ้งเตือนอุณหภูมิเซนเซอร์ {6}</button>
            <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadMarqueePreset('news')">📰 ข่าวประชาสัมพันธ์แล็บสมองกล</button>
          </div>
        </div>
      `;
    } else if (this.simMode === 'buttons') {
      const p1 = this.buttonPages[1];
      const p2 = this.buttonPages[2];
      const p3 = this.buttonPages[3];
      const activeP = this.buttonPages[this.activePage] || p1;

      return `
        <!-- FSM Button Page Switcher Toolbar -->
        <div style="font-size: 12px; color: var(--primary); font-weight: 600; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          <span>🔘 เลือกหน้าที่ต้องการดูและแก้ไข (หรือคลิกปุ่มบนกรอบจอเพื่อทดสอบสลับจริง):</span>
        </div>
        <div class="lcd-page-tabs">
          <button class="lcd-page-btn ${this.activePage === 1 ? 'active' : ''}" onclick="STUDIO_CGRAM.selectButtonPage(1)">
            🏠 หน้า 1: เริ่มต้น (Home)
          </button>
          <button class="lcd-page-btn ${this.activePage === 2 ? 'active' : ''}" onclick="STUDIO_CGRAM.selectButtonPage(2)">
            🔘 หน้า 2: เมื่อกด SW1 (PD2)
          </button>
          <button class="lcd-page-btn ${this.activePage === 3 ? 'active' : ''}" onclick="STUDIO_CGRAM.selectButtonPage(3)">
            🔘 หน้า 3: เมื่อกด SW2 (PD3)
          </button>
        </div>

        <div style="padding: 6px 10px; background: rgba(2, 132, 199, 0.08); border-left: 3px solid var(--primary); border-radius: 4px; margin-bottom: 12px; font-size: 11.5px; color: var(--text-muted);">
          👉 <strong>กำลังแก้ไข:</strong> <span style="color: var(--primary); font-weight: 700;">${this.escapeHtml(activeP.title)}</span> — สามารถแก้ไขข้อความทั้งสองบรรทัดด้านล่าง และลองกดปุ่ม [🔘 กด SW1] หรือ [🔘 กด SW2] บนกรอบจอ LCD ด้านบน เพื่อดูผลลัพธ์ทันที!
        </div>

        <!-- Active Page Line 1 Control -->
        <div class="lcd-input-row">
          <label>บรรทัดที่ 1 ของ ${this.escapeHtml(activeP.title)} (0x80):</label>
          <div class="lcd-input-wrapper">
            <input type="text" id="lcd-input-btn-l1" maxlength="32" value="${this.escapeHtml(activeP.l1)}"
              onfocus="STUDIO_CGRAM.lastFocusedLine = 1"
              oninput="STUDIO_CGRAM.onButtonPageChange(1, this.value)"
              placeholder="ข้อความบรรทัด 1 ของหน้านี้">
            <span class="lcd-len-badge" id="lcd-len-btn-l1">${this.countDisplayCols(activeP.l1)}/16</span>
          </div>
        </div>

        <!-- Active Page Line 2 Control -->
        <div class="lcd-input-row">
          <label>บรรทัดที่ 2 ของ ${this.escapeHtml(activeP.title)} (0xC0):</label>
          <div class="lcd-input-wrapper">
            <input type="text" id="lcd-input-btn-l2" maxlength="32" value="${this.escapeHtml(activeP.l2)}"
              onfocus="STUDIO_CGRAM.lastFocusedLine = 2"
              oninput="STUDIO_CGRAM.onButtonPageChange(2, this.value)"
              placeholder="ข้อความบรรทัด 2 ของหน้านี้">
            <span class="lcd-len-badge" id="lcd-len-btn-l2">${this.countDisplayCols(activeP.l2)}/16</span>
          </div>
        </div>

        <!-- FSM Menu Presets -->
        <div class="lcd-presets-bar">
          <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
            🎯 พรีเซ็ตระบบเมนู 3 หน้า (FSM Menu Presets):
          </div>
          <div class="lcd-preset-chips">
            <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadButtonPreset('sensor')">📊 เมนูเซนเซอร์: หน้าหลัก / โหมดรัน {0} / อุณหภูมิ {6}</button>
            <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadButtonPreset('pump')">💧 เมนูปั๊มน้ำ: AUTO MODE / PUMP RUNNING {7} / ALARM</button>
            <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadButtonPreset('student')">🎓 ข้อมูลนักศึกษา: ID 6710301009 / APISAK / CE CDTI</button>
          </div>
        </div>
      `;
    } else if (this.simMode === 'blink') {
      return `
        <!-- Blink Controls Toolbar -->
        <div class="lcd-dynamic-toolbar">
          <button class="btn-sm btn-primary" id="lcd-blink-play-btn" onclick="STUDIO_CGRAM.toggleBlinkPlay()">
            ${this.blinkPlaying ? '⏹️ หยุดกะพริบ (Stop)' : '🚨 เริ่มกะพริบ (Start)'}
          </button>
          <div style="display: flex; gap: 4px; align-items: center;">
            <span style="font-size: 11.5px; color: var(--text-muted);">รูปแบบ:</span>
            <button class="btn-sm ${this.blinkType === 'display' ? 'btn-primary' : 'btn-secondary'}" onclick="STUDIO_CGRAM.setBlinkType('display')">🚨 ทั้งจอ (0x08/0x0C)</button>
            <button class="btn-sm ${this.blinkType === 'text' ? 'btn-primary' : 'btn-secondary'}" onclick="STUDIO_CGRAM.setBlinkType('text')">⚠️ ข้อความเตือน</button>
            <button class="btn-sm ${this.blinkType === 'cursor' ? 'btn-primary' : 'btn-secondary'}" onclick="STUDIO_CGRAM.setBlinkType('cursor')">🔲 เคอร์เซอร์ (0x0F)</button>
          </div>
          <div style="display: flex; gap: 4px; align-items: center;">
            <span style="font-size: 11.5px; color: var(--text-muted);">ความเร็ว:</span>
            <button class="lcd-speed-btn ${this.blinkSpeed === 250 ? 'active' : ''}" onclick="STUDIO_CGRAM.setBlinkSpeed(250)">⚡ 250ms</button>
            <button class="lcd-speed-btn ${this.blinkSpeed === 500 ? 'active' : ''}" onclick="STUDIO_CGRAM.setBlinkSpeed(500)">⏱️ 500ms</button>
            <button class="lcd-speed-btn ${this.blinkSpeed === 1000 ? 'active' : ''}" onclick="STUDIO_CGRAM.setBlinkSpeed(1000)">🐢 1000ms</button>
          </div>
        </div>

        <div class="lcd-input-row">
          <label>ข้อความแจ้งเตือนบรรทัดที่ 1 (0x80):</label>
          <div class="lcd-input-wrapper">
            <input type="text" id="lcd-input-l1" maxlength="32" value="${this.escapeHtml(this.blinkLine1)}"
              onfocus="STUDIO_CGRAM.lastFocusedLine = 1"
              oninput="STUDIO_CGRAM.onBlinkLineChange(1, this.value)"
              placeholder="ข้อความเตือนภัยบรรทัด 1">
            <span class="lcd-len-badge" id="lcd-len-l1">${this.countDisplayCols(this.blinkLine1)}/16</span>
          </div>
        </div>

        <div class="lcd-input-row">
          <label>ข้อความแจ้งเตือนบรรทัดที่ 2 (0xC0):</label>
          <div class="lcd-input-wrapper">
            <input type="text" id="lcd-input-l2" maxlength="32" value="${this.escapeHtml(this.blinkLine2)}"
              onfocus="STUDIO_CGRAM.lastFocusedLine = 2"
              oninput="STUDIO_CGRAM.onBlinkLineChange(2, this.value)"
              placeholder="ข้อความเตือนภัยบรรทัด 2">
            <span class="lcd-len-badge" id="lcd-len-l2">${this.countDisplayCols(this.blinkLine2)}/16</span>
          </div>
        </div>

        <div class="lcd-presets-bar">
          <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
            🎯 พรีเซ็ตระบบเตือนภัยฉุกเฉิน (Alert Presets):
          </div>
          <div class="lcd-preset-chips">
            <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadBlinkPreset('overheat')">🔥 OVERHEAT WARNING {6}</button>
            <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadBlinkPreset('stop')">🛑 EMERGENCY STOP</button>
            <button class="lcd-preset-chip" onclick="STUDIO_CGRAM.loadBlinkPreset('error')">⚠️ SYSTEM ERROR 0x4F</button>
          </div>
        </div>
      `;
    } else {
      // static mode
      return `
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
      `;
    }
  },

  getModeCodeDescription: function() {
    if (this.simMode === 'marquee') {
      return 'ซอร์สโค้ดฟังก์ชันเลื่อนข้อความวนซ้ำอัตโนมัติ (Marquee Auto-Scroll)';
    } else if (this.simMode === 'buttons') {
      return 'ซอร์สโค้ด Finite State Machine (FSM) สลับหน้าจอด้วยปุ่มกด SW1 (PD2) / SW2 (PD3)';
    } else if (this.simMode === 'blink') {
      return 'ซอร์สโค้ดระบบแจ้งเตือนกะพริบจอและไฟกะพริบแจ้งเตือนฮาร์ดแวร์';
    }
    return 'มีฟังก์ชันโหลด CGRAM ที่คุณวาดไว้พร้อมคำสั่งพิมพ์ DDRAM ครบชุด';
  },

  getFsmStatusText: function() {
    if (this.simMode === 'buttons') {
      const pageNames = { 1: "หน้า 1: Home (พร้อมทำงาน)", 2: "หน้า 2: SW1 ทำงาน (Mode 1)", 3: "หน้า 3: SW2 ทำงาน (Mode 2)" };
      const logicStates = { 1: "PD2=1, PD3=1 (Pull-up)", 2: "PD2=0 (กด), PD3=1", 3: "PD2=1, PD3=0 (กด)" };
      return `${pageNames[this.activePage] || 'Page ' + this.activePage} • ${logicStates[this.activePage] || ''}`;
    } else if (this.simMode === 'marquee') {
      return `ข้อความวิ่ง • ทิศทาง: ${this.marqueeDir.toUpperCase()} • ความเร็ว: ${this.marqueeSpeed}ms`;
    } else if (this.simMode === 'blink') {
      return `ระบบแจ้งเตือน • ${this.blinkType.toUpperCase()} • อัตรา: ${this.blinkSpeed}ms`;
    }
    return "LCD 1602A • โหมดข้อความมาตรฐาน (Static DDRAM)";
  },

  pressVirtualButton: function(btn) {
    this.activeButton = btn;
    if (btn === 'sw1') {
      this.activePage = 2;
    } else if (btn === 'sw2') {
      this.activePage = 3;
    } else if (btn === 'home') {
      this.activePage = 1;
    }

    // Visual button feedback on bezel
    const btnSw1 = document.getElementById("lcd-btn-sw1");
    const btnSw2 = document.getElementById("lcd-btn-sw2");
    const btnHome = document.getElementById("lcd-btn-home");
    if (btnSw1) btnSw1.classList.toggle("pressed", btn === 'sw1');
    if (btnSw2) btnSw2.classList.toggle("pressed", btn === 'sw2');
    if (btnHome) btnHome.classList.toggle("pressed", btn === 'home');

    setTimeout(() => {
      if (btnSw1) btnSw1.classList.remove("pressed");
      if (btnSw2) btnSw2.classList.remove("pressed");
      if (btnHome) btnHome.classList.remove("pressed");
    }, 250);

    // Update FSM indicator
    const fsmDot = document.querySelector(".fsm-dot");
    const fsmText = document.querySelector(".fsm-text");
    if (fsmDot) {
      fsmDot.className = (this.activePage === 1) ? "fsm-dot" : "fsm-dot active";
    }
    if (fsmText) {
      fsmText.textContent = this.getFsmStatusText();
    }

    // Refresh page tabs and inputs
    const pBtns = document.querySelectorAll(".lcd-page-btn");
    pBtns.forEach((b, idx) => {
      b.classList.toggle("active", (idx + 1) === this.activePage);
    });

    if (this.simMode === 'buttons') {
      const in1 = document.getElementById("lcd-input-btn-l1");
      const in2 = document.getElementById("lcd-input-btn-l2");
      const page = this.buttonPages[this.activePage];
      if (in1 && page) in1.value = page.l1;
      if (in2 && page) in2.value = page.l2;
      const len1 = document.getElementById("lcd-len-btn-l1");
      const len2 = document.getElementById("lcd-len-btn-l2");
      if (len1 && page) len1.textContent = `${this.countDisplayCols(page.l1)}/16`;
      if (len2 && page) len2.textContent = `${this.countDisplayCols(page.l2)}/16`;
    }

    this.refreshLiveSimulator();
  },

  selectButtonPage: function(pageNum) {
    this.activePage = pageNum;
    this.pressVirtualButton(pageNum === 1 ? 'home' : (pageNum === 2 ? 'sw1' : 'sw2'));
  },

  onButtonPageChange: function(line, val) {
    if (!this.buttonPages[this.activePage]) return;
    if (line === 1) {
      this.buttonPages[this.activePage].l1 = val;
    } else {
      this.buttonPages[this.activePage].l2 = val;
    }
    const len1 = document.getElementById("lcd-len-btn-l1");
    const len2 = document.getElementById("lcd-len-btn-l2");
    if (len1) len1.textContent = `${this.countDisplayCols(this.buttonPages[this.activePage].l1)}/16`;
    if (len2) len2.textContent = `${this.countDisplayCols(this.buttonPages[this.activePage].l2)}/16`;
    this.refreshLiveSimulator();
  },

  loadButtonPreset: function(id) {
    if (id === 'sensor') {
      this.buttonPages[1] = { title: "หน้า 1: เริ่มต้น (Home)", l1: "SYSTEM READY    ", l2: "PRESS SW1 / SW2 " };
      this.buttonPages[2] = { title: "หน้า 2: กด SW1 (Pin 2)", l1: "RUNNING MODE {0}", l2: "MOTOR SPEED: 80%" };
      this.buttonPages[3] = { title: "หน้า 3: กด SW2 (Pin 3)", l1: "TEMP: 28.5{1}C {6}", l2: "VOLT: 4.95V [OK]" };
    } else if (id === 'pump') {
      this.buttonPages[1] = { title: "หน้า 1: เริ่มต้น (Home)", l1: "WATER PUMP CNTRL", l2: "STATUS: STANDBY " };
      this.buttonPages[2] = { title: "หน้า 2: กด SW1 (Pin 2)", l1: "PUMP ACTIVATED  ", l2: "WATER LVL: 85% {7}" };
      this.buttonPages[3] = { title: "หน้า 3: กด SW2 (Pin 3)", l1: "! PUMP STOPPED !", l2: "TANK EMPTY ALERT" };
    } else if (id === 'student') {
      this.buttonPages[1] = { title: "หน้า 1: เริ่มต้น (Home)", l1: "STUDENT ID:     ", l2: "6710301009      " };
      this.buttonPages[2] = { title: "หน้า 2: กด SW1 (Pin 2)", l1: "NAME:           ", l2: "APISAK KONGPAKDI" };
      this.buttonPages[3] = { title: "หน้า 3: กด SW2 (Pin 3)", l1: "DEPARTMENT:     ", l2: "COMP ENG (CDTI) " };
    }
    this.selectButtonPage(1);
  },

  // Marquee Engine Functions
  startMarquee: function() {
    this.stopMarquee();
    this.marqueePlaying = true;
    const update = () => {
      const step = (this.marqueeDir === 'left') ? 1 : -1;
      this.marqueeOffset1 += step;
      this.marqueeOffset2 += step;
      const screen = document.getElementById("lcd-glass-screen");
      if (screen) screen.innerHTML = this.renderVirtualScreen();
    };
    this.marqueeTimer = setInterval(update, this.marqueeSpeed);
    const playBtn = document.getElementById("lcd-marquee-play-btn");
    if (playBtn) playBtn.innerHTML = "⏸️ หยุดเลื่อน (Pause)";
  },

  stopMarquee: function() {
    this.marqueePlaying = false;
    if (this.marqueeTimer) {
      clearInterval(this.marqueeTimer);
      this.marqueeTimer = null;
    }
    const playBtn = document.getElementById("lcd-marquee-play-btn");
    if (playBtn) playBtn.innerHTML = "▶️ เริ่มเลื่อน (Play)";
  },

  toggleMarqueePlay: function() {
    if (this.marqueePlaying) {
      this.stopMarquee();
    } else {
      this.startMarquee();
    }
  },

  setMarqueeDir: function(dir) {
    this.marqueeDir = dir;
    this.refreshLiveSimulator();
    const btn = document.getElementById("lcd-mode-c");
    if (btn) this.refreshAllInputs();
  },

  setMarqueeSpeed: function(speed) {
    this.marqueeSpeed = speed;
    if (this.marqueePlaying) {
      this.startMarquee();
    }
    this.refreshLiveSimulator();
  },

  setMarqueeTarget: function(target) {
    this.marqueeTarget = target;
    this.refreshLiveSimulator();
  },

  resetMarqueeOffset: function() {
    this.marqueeOffset1 = 0;
    this.marqueeOffset2 = 0;
    const screen = document.getElementById("lcd-glass-screen");
    if (screen) screen.innerHTML = this.renderVirtualScreen();
  },

  onMarqueeLineChange: function(line, val) {
    if (line === 1) {
      this.marqueeLine1 = val;
    } else {
      this.marqueeLine2 = val;
    }
    const len1 = document.getElementById("lcd-len-l1");
    const len2 = document.getElementById("lcd-len-l2");
    if (len1) len1.textContent = `${this.marqueeLine1.length} ตัว`;
    if (len2) len2.textContent = `${this.marqueeLine2.length} ตัว`;
    this.refreshLiveSimulator();
  },

  loadMarqueePreset: function(id) {
    if (id === 'welcome') {
      this.marqueeLine1 = 'WELCOME TO CDTI EMBEDDED SYSTEM 2026! {0}';
      this.marqueeLine2 = 'CHITRALADA TECHNOLOGY INSTITUTE LAB    ';
    } else if (id === 'temp') {
      this.marqueeLine1 = 'TEMPERATURE SENSOR ALERT: HIGH 38.5{1}C {6}';
      this.marqueeLine2 = 'COOLING SYSTEM ACTIVATED • FAN SPEED 100% ';
    } else if (id === 'news') {
      this.marqueeLine1 = 'EXAM PREPARATION: AVR ATMEGA328P REGISTERS';
      this.marqueeLine2 = 'DDRx PORTx PINx TIMERS ADC LCD1602 PRACTICE';
    }
    this.resetMarqueeOffset();
    const in1 = document.getElementById("lcd-input-l1");
    const in2 = document.getElementById("lcd-input-l2");
    if (in1) in1.value = this.marqueeLine1;
    if (in2) in2.value = this.marqueeLine2;
    this.refreshLiveSimulator();
  },

  // Blink Engine Functions
  startBlink: function() {
    this.stopBlink();
    this.blinkPlaying = true;
    const update = () => {
      this.blinkState = !this.blinkState;
      const screen = document.getElementById("lcd-glass-screen");
      if (screen) screen.innerHTML = this.renderVirtualScreen();
    };
    this.blinkTimer = setInterval(update, this.blinkSpeed);
    const playBtn = document.getElementById("lcd-blink-play-btn");
    if (playBtn) playBtn.innerHTML = "⏹️ หยุดกะพริบ (Stop)";
  },

  stopBlink: function() {
    this.blinkPlaying = false;
    this.blinkState = true;
    if (this.blinkTimer) {
      clearInterval(this.blinkTimer);
      this.blinkTimer = null;
    }
    const screen = document.getElementById("lcd-glass-screen");
    if (screen) screen.innerHTML = this.renderVirtualScreen();
    const playBtn = document.getElementById("lcd-blink-play-btn");
    if (playBtn) playBtn.innerHTML = "🚨 เริ่มกะพริบ (Start)";
  },

  toggleBlinkPlay: function() {
    if (this.blinkPlaying) {
      this.stopBlink();
    } else {
      this.startBlink();
    }
  },

  setBlinkType: function(type) {
    this.blinkType = type;
    this.refreshLiveSimulator();
  },

  setBlinkSpeed: function(speed) {
    this.blinkSpeed = speed;
    if (this.blinkPlaying) {
      this.startBlink();
    }
    this.refreshLiveSimulator();
  },

  onBlinkLineChange: function(line, val) {
    if (line === 1) {
      this.blinkLine1 = val;
    } else {
      this.blinkLine2 = val;
    }
    const len1 = document.getElementById("lcd-len-l1");
    const len2 = document.getElementById("lcd-len-l2");
    if (len1) len1.textContent = `${this.countDisplayCols(this.blinkLine1)}/16`;
    if (len2) len2.textContent = `${this.countDisplayCols(this.blinkLine2)}/16`;
    this.refreshLiveSimulator();
  },

  loadBlinkPreset: function(id) {
    if (id === 'overheat') {
      this.blinkLine1 = '!! OVERHEAT !!  ';
      this.blinkLine2 = 'TEMP > 80{1}C {6} ';
    } else if (id === 'stop') {
      this.blinkLine1 = 'EMERGENCY STOP  ';
      this.blinkLine2 = 'PRESS RESET SW  ';
    } else if (id === 'error') {
      this.blinkLine1 = 'SYSTEM FAULT {5}';
      this.blinkLine2 = 'ERR CODE: 0x4F  ';
    }
    const in1 = document.getElementById("lcd-input-l1");
    const in2 = document.getElementById("lcd-input-l2");
    if (in1) in1.value = this.blinkLine1;
    if (in2) in2.value = this.blinkLine2;
    this.refreshLiveSimulator();
  },

  // Insert token like {0} into line 1 or line 2 across all modes
  insertSlotToken: function(slotNum) {
    const token = `{${slotNum}}`;
    let input = null;

    if (this.simMode === 'buttons') {
      input = (this.lastFocusedLine === 2) ? document.getElementById("lcd-input-btn-l2") : document.getElementById("lcd-input-btn-l1");
      if (input) {
        const start = input.selectionStart || input.value.length;
        const end = input.selectionEnd || input.value.length;
        const val = input.value;
        const newVal = val.substring(0, start) + token + val.substring(end);
        input.value = newVal;
        this.onButtonPageChange(this.lastFocusedLine, newVal);
        input.focus();
        input.setSelectionRange(start + token.length, start + token.length);
        return;
      }
    }

    input = (this.lastFocusedLine === 2) ? document.getElementById("lcd-input-l2") : document.getElementById("lcd-input-l1");
    if (input) {
      const start = input.selectionStart || input.value.length;
      const end = input.selectionEnd || input.value.length;
      const val = input.value;
      const newVal = val.substring(0, start) + token + val.substring(end);
      input.value = newVal;
      if (this.simMode === 'marquee') {
        this.onMarqueeLineChange(this.lastFocusedLine, newVal);
      } else if (this.simMode === 'blink') {
        this.onBlinkLineChange(this.lastFocusedLine, newVal);
      } else {
        this.onLineChange(this.lastFocusedLine, newVal);
      }
      input.focus();
      input.setSelectionRange(start + token.length, start + token.length);
    } else {
      if (this.simMode === 'marquee') {
        if (this.lastFocusedLine === 2) this.marqueeLine2 += token; else this.marqueeLine1 += token;
      } else if (this.simMode === 'buttons') {
        if (this.lastFocusedLine === 2) this.buttonPages[this.activePage].l2 += token; else this.buttonPages[this.activePage].l1 += token;
      } else if (this.simMode === 'blink') {
        if (this.lastFocusedLine === 2) this.blinkLine2 += token; else this.blinkLine1 += token;
      } else {
        if (this.lastFocusedLine === 2) this.line2 += token; else this.line1 += token;
      }
      this.refreshAllInputs();
    }
  },

  // Calculate actual columns occupied on the 16x2 LCD screen
  countDisplayCols: function(str) {
    const chars = this.prepareLineChars(str);
    return chars.filter(c => c !== ' ').length;
  },

  tokenizeString: function(str) {
    if (!str) return [];
    const res = [];
    let i = 0;
    while (i < str.length) {
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
      if (nextChar && this.isThaiCombining(nextChar)) {
        res.push({ base: char, upper: nextChar });
        i += 2;
      } else {
        res.push(char);
        i += 1;
      }
    }
    return res;
  },

  getMarqueeTokens: function(str, offset) {
    let tokens = this.tokenizeString(str);
    if (tokens.length === 0) tokens = [' '];
    while (tokens.length < 16) tokens.push(' ');
    // Add 4-space separator between repeats
    tokens.push(' ', ' ', ' ', ' ');
    const len = tokens.length;
    const effOffset = ((offset % len) + len) % len;
    const windowTokens = [];
    for (let i = 0; i < 16; i++) {
      windowTokens.push(tokens[(effOffset + i) % len]);
    }
    return windowTokens;
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
    let l1Chars, l2Chars;

    if (this.simMode === 'marquee') {
      l1Chars = (this.marqueeTarget === '2') ? this.prepareLineChars(this.marqueeLine1) : this.getMarqueeTokens(this.marqueeLine1, this.marqueeOffset1);
      l2Chars = (this.marqueeTarget === '1') ? this.prepareLineChars(this.marqueeLine2) : this.getMarqueeTokens(this.marqueeLine2, this.marqueeOffset2);
    } else if (this.simMode === 'buttons') {
      const page = this.buttonPages[this.activePage] || this.buttonPages[1];
      l1Chars = this.prepareLineChars(page.l1);
      l2Chars = this.prepareLineChars(page.l2);
    } else if (this.simMode === 'blink') {
      if (this.blinkPlaying && !this.blinkState) {
        if (this.blinkType === 'display') {
          l1Chars = Array(16).fill(' ');
          l2Chars = Array(16).fill(' ');
        } else if (this.blinkType === 'text') {
          l1Chars = Array(16).fill(' ');
          l2Chars = this.prepareLineChars(this.blinkLine2);
        } else {
          l1Chars = this.prepareLineChars(this.blinkLine1);
          l2Chars = this.prepareLineChars(this.blinkLine2);
        }
      } else {
        l1Chars = this.prepareLineChars(this.blinkLine1);
        l2Chars = this.prepareLineChars(this.blinkLine2);
      }
    } else {
      l1Chars = this.prepareLineChars(this.line1);
      l2Chars = this.prepareLineChars(this.line2);
    }

    let html = '<div class="lcd-grid-row" id="lcd-row-0">';
    for (let c = 0; c < 16; c++) {
      const ch = l1Chars[c] || ' ';
      const isCursor = (this.simMode === 'blink' && this.blinkType === 'cursor' && this.blinkState && c === Math.min(15, this.countDisplayCols(this.blinkLine1)));
      html += this.renderCharCell(0, c, ch, isCursor);
    }
    html += '</div>';

    html += '<div class="lcd-grid-row" id="lcd-row-1">';
    for (let c = 0; c < 16; c++) {
      const ch = l2Chars[c] || ' ';
      html += this.renderCharCell(1, c, ch, false);
    }
    html += '</div>';

    return html;
  },

  renderCharCell: function(row, col, charData, isCursor) {
    const dots = this.getGlyphDots(charData);
    let dotsHtml = '';

    for (let r = 0; r < 8; r++) {
      let rowByte = dots[r] || 0;
      if (isCursor && r === 7) {
        rowByte = 0x1F; // Underline cursor
      }
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
      const combined = [0, 0, 0, 0, 0, 0, 0, 0];
      for (let r = 0; r < 8; r++) {
        combined[r] = (baseDots[r] || 0) | (upperDots[r] || 0);
      }
      return combined;
    }
    return this.getSingleCharDots(charData);
  },

  getSingleCharDots: function(token) {
    // Check if slot reference {0}..{7}
    if (typeof token === 'string' && token.length === 3 && token[0] === '{' && token[2] === '}') {
      const slot = parseInt(token[1], 10);
      if (!isNaN(slot) && slot >= 0 && slot < 8 && this.slots[slot]) {
        return this.slots[slot];
      }
    }

    // Check ASCII font table
    if (LCD_ASCII_FONT[token]) {
      return LCD_ASCII_FONT[token];
    }

    // Check Thai font
    const thaiHex = this.getThaiTis620Hex(token);
    if (thaiHex) {
      const fontTable = (this.thaiMode === 'improved') ? THAI_FONT_IMPROVED : THAI_FONT_ORIGINAL;
      if (fontTable[thaiHex]) {
        return fontTable[thaiHex].bytes;
      }
    }

    return [0, 0, 0, 0, 0, 0, 0, 0];
  },

  getThaiTis620Hex: function(ch) {
    const code = ch.charCodeAt(0);
    if (code >= 0x0E01 && code <= 0x0E5B) {
      const tis = (code - 0x0E00 + 0xA0).toString(16).toUpperCase();
      return `0x${tis}`;
    }
    return null;
  },

  onLineChange: function(line, value) {
    if (line === 1) {
      this.line1 = value;
    } else {
      this.line2 = value;
    }
    const len1 = document.getElementById("lcd-len-l1");
    const len2 = document.getElementById("lcd-len-l2");
    if (len1) len1.textContent = `${this.countDisplayCols(this.line1)}/16`;
    if (len2) len2.textContent = `${this.countDisplayCols(this.line2)}/16`;
    this.refreshLiveSimulator();
  },

  setAlignment: function(mode) {
    this.alignMode = mode;
    this.line1 = this.padText(this.line1, mode);
    this.line2 = this.padText(this.line2, mode);
    this.refreshAllInputs();
  },

  padText: function(text, mode) {
    const trimmed = text.trim();
    const cols = this.countDisplayCols(trimmed);
    if (cols >= 16) return trimmed;

    if (mode === 'left') {
      return trimmed;
    } else if (mode === 'center') {
      const padLeft = Math.floor((16 - cols) / 2);
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
    if (this.simMode === 'marquee') {
      const in1 = document.getElementById("lcd-input-l1");
      const in2 = document.getElementById("lcd-input-l2");
      if (in1) in1.value = this.marqueeLine1;
      if (in2) in2.value = this.marqueeLine2;
      const el1 = document.getElementById("lcd-len-l1");
      const el2 = document.getElementById("lcd-len-l2");
      if (el1) el1.textContent = `${this.marqueeLine1.length} ตัว`;
      if (el2) el2.textContent = `${this.marqueeLine2.length} ตัว`;
    } else if (this.simMode === 'buttons') {
      const page = this.buttonPages[this.activePage] || this.buttonPages[1];
      const in1 = document.getElementById("lcd-input-btn-l1");
      const in2 = document.getElementById("lcd-input-btn-l2");
      if (in1) in1.value = page.l1;
      if (in2) in2.value = page.l2;
      const el1 = document.getElementById("lcd-len-btn-l1");
      const el2 = document.getElementById("lcd-len-btn-l2");
      if (el1) el1.textContent = `${this.countDisplayCols(page.l1)}/16`;
      if (el2) el2.textContent = `${this.countDisplayCols(page.l2)}/16`;
    } else if (this.simMode === 'blink') {
      const in1 = document.getElementById("lcd-input-l1");
      const in2 = document.getElementById("lcd-input-l2");
      if (in1) in1.value = this.blinkLine1;
      if (in2) in2.value = this.blinkLine2;
      const el1 = document.getElementById("lcd-len-l1");
      const el2 = document.getElementById("lcd-len-l2");
      if (el1) el1.textContent = `${this.countDisplayCols(this.blinkLine1)}/16`;
      if (el2) el2.textContent = `${this.countDisplayCols(this.blinkLine2)}/16`;
    } else {
      const in1 = document.getElementById("lcd-input-l1");
      const in2 = document.getElementById("lcd-input-l2");
      if (in1) in1.value = this.line1;
      if (in2) in2.value = this.line2;
      const el1 = document.getElementById("lcd-len-l1");
      const el2 = document.getElementById("lcd-len-l2");
      if (el1) el1.textContent = `${this.countDisplayCols(this.line1)}/16`;
      if (el2) el2.textContent = `${this.countDisplayCols(this.line2)}/16`;
    }
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
    const fsmText = document.querySelector(".fsm-text");
    if (fsmText) fsmText.textContent = this.getFsmStatusText();
  },

  // Helper to replace {0} with \x08 and {1}-{7} with \x01-\x07 in C string
  formatCStringWithSlots: function(str) {
    if (!str) return "";
    let out = str.replace(/"/g, '\\"');
    out = out.replace(/\{([0-7])\}/g, (match, slot) => {
      const s = parseInt(slot, 10);
      return (s === 0) ? '\\x08' : `\\x0${s}`;
    });
    return out;
  },

  // Generate Embedded C snippet for current mode
  generateLcdCCode: function() {
    const usedSlots = new Set();
    const regex = /\{([0-7])\}/g;
    let m;

    const scanString = (str) => {
      if (!str) return;
      while ((m = regex.exec(str)) !== null) usedSlots.add(parseInt(m[1], 10));
    };

    if (this.simMode === 'buttons') {
      for (let p = 1; p <= 3; p++) {
        scanString(this.buttonPages[p].l1);
        scanString(this.buttonPages[p].l2);
      }
    } else if (this.simMode === 'marquee') {
      scanString(this.marqueeLine1);
      scanString(this.marqueeLine2);
    } else if (this.simMode === 'blink') {
      scanString(this.blinkLine1);
      scanString(this.blinkLine2);
    } else {
      scanString(this.line1);
      scanString(this.line2);
    }

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

    const cgramFunc = usedSlots.size > 0 ? `// ฟังก์ชันโหลดข้อมูลเข้า CGRAM (Address: 0x40 + slot * 8)
void lcd_load_cgram(uint8_t slot, const uint8_t *glyph) {
    lcd_command(0x40 | (slot << 3));
    for (uint8_t i = 0; i < 8; i++) {
        lcd_data(pgm_read_byte(&glyph[i]));
    }
}
` : '';

    if (this.simMode === 'marquee') {
      const str1 = this.formatCStringWithSlots(this.marqueeLine1);
      const str2 = this.formatCStringWithSlots(this.marqueeLine2);
      const shiftCmd = (this.marqueeDir === 'left') ? '0x18' : '0x1C';
      const shiftDesc = (this.marqueeDir === 'left') ? '0x18: เลื่อนซ้าย (Shift Display Left)' : '0x1C: เลื่อนขวา (Shift Display Right)';

      return `// ==========================================
// Embedded C (AVR-GCC): LCD 1602 Marquee Auto-Scroll
// โหมดข้อความเลื่อนอัตโนมัติบนจอ HD44780
// ==========================================
#include <avr/io.h>
#include <avr/pgmspace.h>
#include <util/delay.h>
#include <string.h>

${cgramDefinitions}
${cgramFunc}
// วิธีที่ 1: เลื่อนทั้งหน้าจอด้วยคำสั่งฮาร์ดแวร์ HD44780 (${shiftDesc})
void lcd_marquee_hardware(void) {
    lcd_command(0x01); // Clear Display
    _delay_ms(2);
    lcd_command(0x0C); // Display ON, Cursor OFF

${cgramLoads ? `    // โหลดอักขระ CGRAM\n${cgramLoads}\n` : ''}    lcd_command(0x80);
    lcd_puts("${str1}");
    lcd_command(0xC0);
    lcd_puts("${str2}");

    while (1) {
        _delay_ms(${this.marqueeSpeed});
        lcd_command(${shiftCmd}); // เลื่อนหน้าจอตามทิศทางที่เลือก
    }
}

// วิธีที่ 2: เลื่อนเฉพาะบรรทัดที่ 1 ด้วยเทคนิค Circular Sliding Window Buffer
const char msg_line1[] PROGMEM = "${str1}    ";
void lcd_marquee_sliding_window(void) {
    uint8_t len = strlen_P(msg_line1);
    for (uint8_t offset = 0; offset < len; offset++) {
        lcd_command(0x80); // เลื่อนตำแหน่งไปยังบรรทัดที่ 1
        for (uint8_t col = 0; col < 16; col++) {
            char c = pgm_read_byte(&msg_line1[(offset + col) % len]);
            lcd_data(c);
        }
        _delay_ms(${this.marqueeSpeed});
    }
}`;
    }

    if (this.simMode === 'buttons') {
      const p1_1 = this.formatCStringWithSlots(this.buttonPages[1].l1);
      const p1_2 = this.formatCStringWithSlots(this.buttonPages[1].l2);
      const p2_1 = this.formatCStringWithSlots(this.buttonPages[2].l1);
      const p2_2 = this.formatCStringWithSlots(this.buttonPages[2].l2);
      const p3_1 = this.formatCStringWithSlots(this.buttonPages[3].l1);
      const p3_2 = this.formatCStringWithSlots(this.buttonPages[3].l2);

      return `// ==========================================
// Embedded C (AVR-GCC): LCD Finite State Machine (FSM)
// สลับหน้าจอด้วยปุ่มกด SW1 (PD2) และ SW2 (PD3)
// ==========================================
#include <avr/io.h>
#include <avr/pgmspace.h>
#include <util/delay.h>

#define SW1_PIN  PD2  // สวิตช์ SW1 ต่อขา Digital Pin 2
#define SW2_PIN  PD3  // สวิตช์ SW2 ต่อขา Digital Pin 3

typedef enum {
    PAGE_HOME = 1,   // หน้าหลัก
    PAGE_SW1  = 2,   // หน้าเมื่อกด SW1
    PAGE_SW2  = 3    // หน้าเมื่อกด SW2
} LcdPage_t;

LcdPage_t current_page = PAGE_HOME;

${cgramDefinitions}
${cgramFunc}
void init_buttons(void) {
    // 1. กำหนดขา PD2 และ PD3 เป็นอินพุต
    DDRD &= ~((1 << SW1_PIN) | (1 << SW2_PIN));
    // 2. เปิดใช้งาน Internal Pull-Up Resistor (ระบบ Active-Low)
    PORTD |= (1 << SW1_PIN) | (1 << SW2_PIN);
}

void render_lcd_page(LcdPage_t page) {
    lcd_command(0x01); // Clear Display
    _delay_ms(2);
    switch (page) {
        case PAGE_HOME:
            lcd_command(0x80); lcd_puts("${p1_1}");
            lcd_command(0xC0); lcd_puts("${p1_2}");
            break;
        case PAGE_SW1:
            lcd_command(0x80); lcd_puts("${p2_1}");
            lcd_command(0xC0); lcd_puts("${p2_2}");
            break;
        case PAGE_SW2:
            lcd_command(0x80); lcd_puts("${p3_1}");
            lcd_command(0xC0); lcd_puts("${p3_2}");
            break;
    }
}

int main(void) {
    lcd_init();
    init_buttons();
${cgramLoads ? `    // โหลดอักขระพิเศษ CGRAM\n${cgramLoads}\n` : ''}    render_lcd_page(current_page);

    while (1) {
        // ตรวจจับปุ่ม SW1 (Active-Low: ลอจิก 0 เมื่อถูกกด)
        if (!(PIND & (1 << SW1_PIN))) {
            _delay_ms(20); // Software Debounce 20ms
            if (!(PIND & (1 << SW1_PIN))) {
                current_page = PAGE_SW1;
                render_lcd_page(current_page);
                while (!(PIND & (1 << SW1_PIN))); // รอจนกระทั่งปล่อยปุ่ม
            }
        }

        // ตรวจจับปุ่ม SW2
        if (!(PIND & (1 << SW2_PIN))) {
            _delay_ms(20); // Software Debounce 20ms
            if (!(PIND & (1 << SW2_PIN))) {
                current_page = PAGE_SW2;
                render_lcd_page(current_page);
                while (!(PIND & (1 << SW2_PIN))); // รอจนกระทั่งปล่อยปุ่ม
            }
        }
    }
}`;
    }

    if (this.simMode === 'blink') {
      const str1 = this.formatCStringWithSlots(this.blinkLine1);
      const str2 = this.formatCStringWithSlots(this.blinkLine2);

      return `// ==========================================
// Embedded C (AVR-GCC): LCD 1602 Alert & Flash Mode
// ควบคุมการกะพริบแจ้งเตือนความผิดปกติ
// ==========================================
#include <avr/io.h>
#include <avr/pgmspace.h>
#include <util/delay.h>

${cgramDefinitions}
${cgramFunc}
void lcd_alert_loop(void) {
    lcd_command(0x01); // Clear Display
    _delay_ms(2);
${cgramLoads ? `    // โหลดอักขระ CGRAM\n${cgramLoads}\n` : ''}    lcd_command(0x80);
    lcd_puts("${str1}");
    lcd_command(0xC0);
    lcd_puts("${str2}");

    while (1) {
${this.blinkType === 'display' ? `        // 1. ปิดการแสดงผลทั้งหน้าจอ (0x08)
        lcd_command(0x08);
        _delay_ms(${this.blinkSpeed});
        // 2. เปิดการแสดงผลกลับมา (0x0C)
        lcd_command(0x0C);
        _delay_ms(${this.blinkSpeed});` : (this.blinkType === 'cursor' ? `        // เปิดเคอร์เซอร์กะพริบด้วยฮาร์ดแวร์ HD44780 (0x0F)
        lcd_command(0x0F);
        _delay_ms(1000);` : `        // สลับข้อความบรรทัดที่ 1 กับช่องว่างเพื่อกะพริบเตือน
        lcd_command(0x80);
        lcd_puts("                ");
        _delay_ms(${this.blinkSpeed});
        lcd_command(0x80);
        lcd_puts("${str1}");
        _delay_ms(${this.blinkSpeed});`)}
    }
}`;
    }

    const str1 = this.formatCStringWithSlots(this.line1);
    const str2 = this.formatCStringWithSlots(this.line2);

    return `// ==========================================
// Embedded C (AVR-GCC): LCD 1602 Custom Text Display
// ==========================================
#include <avr/io.h>
#include <avr/pgmspace.h>
#include <util/delay.h>

${cgramDefinitions}
${cgramFunc}
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

  // Generate AVR GNU Assembly snippet for current mode
  generateLcdAsmCode: function() {
    if (this.simMode === 'buttons') {
      return `; ==========================================
; AVR GNU Assembly: LCD Finite State Machine (FSM)
; ตรวจจับสวิตช์ SW1 (PD2) และ SW2 (PD3) ด้วยคำสั่ง sbis
; ==========================================
.global main_fsm
main_fsm:
    ; 1. กำหนดขา PD2, PD3 เป็น INPUT และเปิด Pull-up
    cbi   _SFR_IO_ADDR(DDRD), 2   ; PD2 = Input
    cbi   _SFR_IO_ADDR(DDRD), 3   ; PD3 = Input
    sbi   _SFR_IO_ADDR(PORTD), 2  ; Pull-up on PD2
    sbi   _SFR_IO_ADDR(PORTD), 3  ; Pull-up on PD3
    rcall lcd_init
    rcall show_page_home

main_loop:
    ; ตรวจสอบสวิตช์ SW1 (PD2) - ข้ามถ้าบิตเป็น 1 (ยังไม่กด)
    sbic  _SFR_IO_ADDR(PIND), 2
    rjmp  check_sw2
    rcall delay_20ms
    sbic  _SFR_IO_ADDR(PIND), 2
    rjmp  check_sw2
    rcall show_page_sw1
wait_release_sw1:
    sbis  _SFR_IO_ADDR(PIND), 2
    rjmp  wait_release_sw1

check_sw2:
    ; ตรวจสอบสวิตช์ SW2 (PD3)
    sbic  _SFR_IO_ADDR(PIND), 3
    rjmp  main_loop
    rcall delay_20ms
    sbic  _SFR_IO_ADDR(PIND), 3
    rjmp  main_loop
    rcall show_page_sw2
wait_release_sw2:
    sbis  _SFR_IO_ADDR(PIND), 3
    rjmp  wait_release_sw2
    rjmp  main_loop

show_page_home:
    ldi   r24, 0x80
    rcall lcd_command
    ldi   r30, lo8(str_p1_l1)
    ldi   r31, hi8(str_p1_l1)
    rcall lcd_print_string
    ldi   r24, 0xC0
    rcall lcd_command
    ldi   r30, lo8(str_p1_l2)
    ldi   r31, hi8(str_p1_l2)
    rcall lcd_print_string
    ret

show_page_sw1:
    ldi   r24, 0x80
    rcall lcd_command
    ldi   r30, lo8(str_p2_l1)
    ldi   r31, hi8(str_p2_l1)
    rcall lcd_print_string
    ret

show_page_sw2:
    ldi   r24, 0x80
    rcall lcd_command
    ldi   r30, lo8(str_p3_l1)
    ldi   r31, hi8(str_p3_l1)
    rcall lcd_print_string
    ret

str_p1_l1: .asciz "${this.buttonPages[1].l1}"
str_p1_l2: .asciz "${this.buttonPages[1].l2}"
str_p2_l1: .asciz "${this.buttonPages[2].l1}"
str_p3_l1: .asciz "${this.buttonPages[3].l1}"`;
    }

    if (this.simMode === 'marquee') {
      const shiftCmd = (this.marqueeDir === 'left') ? '0x18' : '0x1C';
      return `; ==========================================
; AVR GNU Assembly: LCD Marquee Auto-Scroll
; เลื่อนหน้าจอต่อเนื่องด้วยคำสั่ง ${shiftCmd}
; ==========================================
.global marquee_loop
marquee_loop:
    rcall lcd_init
    ; พิมพ์ข้อความเริ่มต้น
    ldi   r24, 0x80
    rcall lcd_command
    ldi   r30, lo8(str_marq1)
    ldi   r31, hi8(str_marq1)
    rcall lcd_print_string

scroll_loop:
    rcall delay_300ms
    ldi   r24, ${shiftCmd}  ; คำสั่งเลื่อนจอ HD44780
    rcall lcd_command
    rjmp  scroll_loop

str_marq1: .asciz "${this.marqueeLine1}"`;
    }

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

    if (this.simMode === 'buttons') {
      lab.avrCode = this.generateLcdCCode();
      lab.asmCode = this.generateLcdAsmCode();
      alert(`อัปเดตโค้ดสลับหน้าจอ Finite State Machine (FSM) เข้าสู่แล็บ ${lab.id} เรียบร้อยแล้ว!`);
    } else if (this.simMode === 'marquee') {
      lab.avrCode = this.generateLcdCCode();
      lab.asmCode = this.generateLcdAsmCode();
      alert(`อัปเดตโค้ดข้อความวิ่ง Marquee Auto-Scroll เข้าสู่แล็บ ${lab.id} เรียบร้อยแล้ว!`);
    } else if (this.simMode === 'blink') {
      lab.avrCode = this.generateLcdCCode();
      lab.asmCode = this.generateLcdAsmCode();
      alert(`อัปเดตโค้ดไฟแจ้งเตือนกะพริบ Alert เข้าสู่แล็บ ${lab.id} เรียบร้อยแล้ว!`);
    } else {
      const str1 = this.formatCStringWithSlots(this.line1);
      const str2 = this.formatCStringWithSlots(this.line2);
      if (lab.avrCode) {
        if (lab.avrCode.includes("lcd_puts") || lab.avrCode.includes("lcd_command(0x80)")) {
          lab.avrCode = lab.avrCode.replace(/lcd_puts\s*\(\s*"[^"]*"\s*\)/g, (match, idx) => {
            return (idx === 0) ? `lcd_puts("${str1}")` : `lcd_puts("${str2}")`;
          });
        }
      }
      alert(`อัปเดตข้อความ "${this.line1}" / "${this.line2}" เข้าสู่โค้ดแล็บ ${lab.id} เรียบร้อยแล้ว!`);
    }

    if (typeof updateCodeDisplays === 'function') {
      updateCodeDisplays(lab);
    }
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
