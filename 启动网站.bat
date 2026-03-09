@echo off
color 0A
title Start Web Server

echo ===================================================
echo.
echo               Start MakeLight Web
echo.
echo ===================================================
echo.

echo [1/3] Go to web directory...
cd /d "%~dp0web"

echo [2/3] Checking dependencies...
if not exist node_modules (
    echo Installing node_modules...
    call npm install --registry=https://registry.npmmirror.com
)

echo.
echo [3/3] Starting server...
echo.
echo ===================================================
echo   Server is running... (Press Ctrl+C to stop)
echo ===================================================

set PORT=
call npm run dev

pause