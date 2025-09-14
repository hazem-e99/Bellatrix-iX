@echo off
echo.
echo ============================================
echo   Bellatrix Admin Dashboard Startup
echo ============================================
echo.
echo Starting API Server and React Dev Server...
echo.

REM Kill any existing Node processes
taskkill /F /IM node.exe >nul 2>&1

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start both servers using the npm script
npm run admin

pause