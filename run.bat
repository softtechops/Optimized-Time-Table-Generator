@echo off
title BIT Timetable Management System
echo ====================================================
echo   BIT Automated Class Timetable Management System
echo ====================================================
echo Starting local web server on port 8000...
echo.
timeout /t 1 >nul
start "" "http://localhost:8000"
python server.py
if %errorlevel% neq 0 (
    echo Python server exited or not found.
    echo Opening login.html directly in your default browser...
    start "" "login.html"
)
pause
