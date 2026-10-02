@echo off
cd /d "%~dp0"
echo Starting HIGHROLERS website...

if not exist node_modules (
  echo Installing dependencies...
  call npm install || goto :error
)

rem Builds the site and opens it in the browser (Vite preview)
call npm start || goto :error
pause
exit /b

:error
echo.
echo Something went wrong. Make sure Node.js 20.19+ is installed: https://nodejs.org
pause
