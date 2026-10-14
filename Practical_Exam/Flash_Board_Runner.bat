@echo off
chcp 65001 >nul
title AVR-GCC Flash Board Runner - CDTI Practical Exam 2569
color 0b

echo ===============================================================================
echo      AVR-GCC BARE-METAL FLASH RUNNER - CDTI PRACTICAL EXAM 2569
echo      เครื่องมือคอมไพล์ด้วย avr-gcc และแฟลชผ่าน avrdude อัตโนมัติ
echo ===============================================================================
echo.

:: 1. Locate AVR Toolchain (avr-gcc, avr-objcopy, avr-size, avrdude)
set "AVR_BIN=D:\My_server\My_work\arduino-1.8.19\hardware\tools\avr\bin"
set "AVR_ETC=D:\My_server\My_work\arduino-1.8.19\hardware\tools\avr\etc"

if not exist "%AVR_BIN%\avr-gcc.exe" (
    if exist "%LOCALAPPDATA%\Arduino15\packages\arduino\tools\avr-gcc\7.3.0-atmel3.6.1-arduino7\bin\avr-gcc.exe" (
        set "AVR_BIN=%LOCALAPPDATA%\Arduino15\packages\arduino\tools\avr-gcc\7.3.0-atmel3.6.1-arduino7\bin"
        set "AVR_ETC=%LOCALAPPDATA%\Arduino15\packages\arduino\tools\avrdude\6.3.0-arduino17\etc"
    ) else if exist "C:\Program Files (x86)\Arduino\hardware\tools\avr\bin\avr-gcc.exe" (
        set "AVR_BIN=C:\Program Files (x86)\Arduino\hardware\tools\avr\bin"
        set "AVR_ETC=C:\Program Files (x86)\Arduino\hardware\tools\avr\etc"
    ) else if exist "C:\Program Files\Arduino\hardware\tools\avr\bin\avr-gcc.exe" (
        set "AVR_BIN=C:\Program Files\Arduino\hardware\tools\avr\bin"
        set "AVR_ETC=C:\Program Files\Arduino\hardware\tools\avr\etc"
    )
)

set "CC=%AVR_BIN%\avr-gcc.exe"
set "OBJCOPY=%AVR_BIN%\avr-objcopy.exe"
set "SIZE=%AVR_BIN%\avr-size.exe"
set "AVRDUDE=%AVR_BIN%\avrdude.exe"
set "AVRDUDE_CONF=%AVR_ETC%\avrdude.conf"

if not exist "%CC%" (
    where avr-gcc.exe >nul 2>&1
    if not errorlevel 1 (
        set "CC=avr-gcc.exe"
        set "OBJCOPY=avr-objcopy.exe"
        set "SIZE=avr-size.exe"
        set "AVRDUDE=avrdude.exe"
    ) else (
        color 0c
        echo [ERROR] ไม่พบ avr-gcc.exe ในเครื่อง
        echo กรุณาตรวจสอบว่ามี AVR-GCC หรือ Arduino IDE ติดตั้งอยู่ในเครื่องหรือไม่
        echo.
        pause
        exit /b 1
    )
)

echo [✓] พบคอมไพเลอร์ AVR-GCC: "%CC%"
echo [✓] พบโปรแกรมเมอร์ AVRDUDE: "%AVRDUDE%"
echo.

:: 2. Detect Available COM Ports
echo [i] กำลังค้นหาพอร์ต COM ที่เชื่อมต่ออยู่ในเครื่องขณะนี้...
powershell -NoProfile -Command "[System.IO.Ports.SerialPort]::GetPortNames() | ForEach-Object { Write-Host ('   - ' + $_) }"
echo.

:: Check target COM port
set "TARGET_PORT="
if "%1" neq "" (
    set "TARGET_PORT=%1"
    echo [i] ใช้พอร์ตจากคำสั่ง: %TARGET_PORT%
) else (
    for /f "usebackq tokens=*" %%p in (`powershell -NoProfile -Command "$port = (Get-CimInstance Win32_PnPEntity | Where-Object { $_.Caption -match 'Arduino|CH340|CP210|FTDI|USB Serial' } | Select-Object -First 1).Caption; if ($port -match '\((COM\d+)\)') { $matches[1] } else { [System.IO.Ports.SerialPort]::GetPortNames()[0] }"`) do set "TARGET_PORT=%%p"
)

if "%TARGET_PORT%"=="" (
    echo [!] ตรวจไม่พบพอร์ตอัตโนมัติ กรุณาระบุพอร์ต เช่น COM3, COM4
    set /p TARGET_PORT="ระบุหมายเลขพอร์ต COM: "
) else (
    echo [✓] ตรวจพบพอร์ตอัตโนมัติ: %TARGET_PORT%
    set /p USER_CHOICE="กด Enter เพื่อใช้พอร์ต %TARGET_PORT% (หรือพิมพ์พอร์ตอื่นที่ต้องการ): "
    if not "%USER_CHOICE%"=="" set "TARGET_PORT=%USER_CHOICE%"
)

echo.
echo [✓] เลือกใช้พอร์ต: %TARGET_PORT%
echo ===============================================================================

:: 3. Select Source File (.c or .cpp or .hex)
set "SRC_TO_FLASH="
if "%2" neq "" (
    set "SRC_TO_FLASH=%2"
) else (
    if exist "%~dp0*.c" (
        for %%f in ("%~dp0*.c") do set "SRC_TO_FLASH=%%~ff"
    ) else if exist "%~dp0build\main.c" (
        set "SRC_TO_FLASH=%~dp0build\main.c"
    )
)

if "%SRC_TO_FLASH%"=="" (
    echo [i] ลากไฟล์ภาษา C (.c) หรือ .hex มาวางในหน้าต่างนี้:
    set /p SRC_TO_FLASH="ไฟล์ที่ต้องการแฟลช: "
    set "SRC_TO_FLASH=%SRC_TO_FLASH:"=%"
)

if not exist "%SRC_TO_FLASH%" (
    color 0c
    echo [ERROR] ไม่พบไฟล์: %SRC_TO_FLASH%
    echo.
    pause
    exit /b 1
)

echo [✓] ไฟล์ซอร์สโค้ด: "%SRC_TO_FLASH%"

set "EXT=%~x2"
if "%EXT%"=="" (
    for %%x in ("%SRC_TO_FLASH%") do set "EXT=%%~xx"
)

set "HEX_FILE=%~dp0temp_flash.hex"

if /i "%EXT%"==".hex" (
    set "HEX_FILE=%SRC_TO_FLASH%"
    goto FLASH_STEP
)

:: Compile .c with avr-gcc
echo.
echo [i] กำลังคอมไพล์ด้วย avr-gcc (ATmega328P @ 16 MHz)...
echo -------------------------------------------------------------------------------
"%CC%" -mmcu=atmega328p -DF_CPU=16000000UL -Os -Wall -o "%~dp0temp_flash.elf" "%SRC_TO_FLASH%"
if %errorlevel% neq 0 (
    color 0c
    echo.
    echo [ERROR] คอมไพล์ด้วย avr-gcc ไม่ผ่าน กรุณาตรวจสอบโค้ด
    pause
    exit /b %errorlevel%
)
echo [✓] คอมไพล์ผ่านเรียบร้อย

"%OBJCOPY%" -O ihex -R .eeprom "%~dp0temp_flash.elf" "%HEX_FILE%"
echo [✓] แปลงไฟล์ HEX สำเร็จ

echo.
"%SIZE%" --format=avr --mcu=atmega328p "%~dp0temp_flash.elf"
echo.

:FLASH_STEP
echo [i] กำลังอัปโหลด HEX ลงบอร์ด Arduino Uno ผ่าน avrdude (%TARGET_PORT% @ 115200 baud)...
echo -------------------------------------------------------------------------------

if exist "%AVRDUDE_CONF%" (
    "%AVRDUDE%" -C "%AVRDUDE_CONF%" -v -p m328p -c arduino -P %TARGET_PORT% -b 115200 -D -U flash:w:"%HEX_FILE%":i
) else (
    "%AVRDUDE%" -v -p m328p -c arduino -P %TARGET_PORT% -b 115200 -D -U flash:w:"%HEX_FILE%":i
)
set UPLOAD_RESULT=%errorlevel%

echo -------------------------------------------------------------------------------
if %UPLOAD_RESULT% equ 0 (
    color 0a
    echo.
    echo ===============================================================================
    echo   [SUCCESS] ✓ แฟลชโค้ด AVR-GCC ลงบอร์ด Arduino Uno สำเร็จสมบูรณ์!
    echo   ชิป ATmega328P เริ่มทำงานตามคำสั่ง Register ทันที
    echo ===============================================================================
) else (
    color 0c
    echo.
    echo ===============================================================================
    echo   [FAILED] ✗ แฟลชไม่สำเร็จ (Error Code: %UPLOAD_RESULT%)
    echo   ข้อแนะนำการแก้ไขหน้างาน:
    echo    1. ตรวจสอบว่าพอร์ต %TARGET_PORT% ตรงกับบอร์ด Arduino จริงหรือไม่
    echo    2. ตรวจสอบว่าปิดหน้าต่าง Serial Monitor ของโปรแกรมอื่นแล้วหรือยัง
    echo    3. ถอดสาย USB แล้วเสียบใหม่ หรือกดปุ่ม Reset สีแดงบนบอร์ด
    echo    4. ตรวจสอบว่าไม่มีสายไฟจัมเปอร์ต่อค้างที่ขา D0 (RX) หรือ D1 (TX) ขณะแฟลช
    echo ===============================================================================
)

echo.
echo กดปุ่มใดๆ เพื่อสิ้นสุดการทำงาน...
pause >nul
