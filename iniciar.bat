@echo off
REM Inicia o backend (porta 8000) e o frontend (porta 5173) da landing page DPJ
cd /d "%~dp0"
start "DPJ backend" cmd /k "cd backend && .venv\Scripts\python -m uvicorn app.main:app --port 8000"
start "DPJ frontend" cmd /k "cd frontend && npm run dev"
timeout /t 4 >nul
start "" http://localhost:5173
