@echo off
title Bhuvan portfolio - dev server
cd /d "%~dp0"
if not exist logs mkdir logs
echo Installing dependencies (first run only)...
if not exist node_modules (call npm install > logs\install.log 2>&1)
echo Checking production build...
call npm run build > logs\build.log 2>&1
echo.
echo Dev server: http://localhost:5173   (close this window to stop)
call npm run dev -- --host 127.0.0.1 > logs\dev.log 2>&1
pause
