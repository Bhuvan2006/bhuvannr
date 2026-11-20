@echo off
cd /d "%~dp0"
if not exist logs mkdir logs
echo Building production site...
call npm run build > logs\build.log 2>&1
echo Done. See logs\build.log
timeout /t 3 >nul
