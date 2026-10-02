@echo off
cd /d "%~dp0"
echo Starting HIGHROLERS Marketing Agency Web Server...

if not exist node_modules (
  echo Installing dependencies...
  call npm install || goto :error
)

call npm run build || goto :error
node server.js --open
pause
exit /b

:error
echo.
echo Something went wrong. Make sure Node.js 20.19+ is installed: https://nodejs.org
pause
