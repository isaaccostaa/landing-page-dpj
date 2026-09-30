#!/usr/bin/env bash
# Inicia backend (8000) e frontend (5173) no Codespaces / Linux / Mac
cd "$(dirname "$0")"
(cd backend && .venv/bin/python -m uvicorn app.main:app --port 8000) &
cd frontend && npm run dev -- --host
