@echo off
echo Starting Hustle Wear Full Stack Application...
echo.
start "Hustle Wear Backend API" cmd /k "cd hustle-wear-backend && npm start"
timeout /t 2 >nul
start "Hustle Wear Frontend (Vite)" cmd /k "cd hustle-wear-frontend && npm run dev"
echo.
echo ==============================================================
echo Backend API running at: http://localhost:5000
echo Frontend Dev running at: http://localhost:5173
echo ==============================================================
echo.
timeout /t 3 >nul
start http://localhost:5173
