"""Onde os cadastros são guardados.

- Modo protótipo (padrão): arquivo backend/data/leads.json.
- Modo Supabase: basta preencher SUPABASE_URL e SUPABASE_SERVICE_KEY no .env.
  O insert usa a API REST (PostgREST) do Supabase na tabela public.leads.
"""

import asyncio
import json
import uuid
from datetime import datetime, timezone

import httpx
from fastapi import HTTPException

from .config import settings
from .schemas import LeadIn

_trava_arquivo = asyncio.Lock()


async def salvar_lead(lead: LeadIn) -> dict:
    dados = lead.model_dump()
    if settings.usa_supabase:
        return await _salvar_supabase(dados)
    return await _salvar_local(dados)


async def _salvar_supabase(dados: dict) -> dict:
    url = f"{settings.supabase_url}/rest/v1/leads"
    headers = {
        "apikey": settings.supabase_key,
        "Authorization": f"Bearer {settings.supabase_key}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(url, headers=headers, json=dados)
    if resp.status_code >= 300:
        raise HTTPException(status_code=502, detail="Não foi possível salvar o cadastro")
    return resp.json()[0]


async def _salvar_local(dados: dict) -> dict:
    registro = {
        "id": str(uuid.uuid4()),
        "criado_em": datetime.now(timezone.utc).isoformat(),
        **dados,
    }
    arquivo = settings.arquivo_local
    async with _trava_arquivo:
        arquivo.parent.mkdir(parents=True, exist_ok=True)
        existentes = json.loads(arquivo.read_text("utf-8")) if arquivo.exists() else []
        existentes.append(registro)
        arquivo.write_text(json.dumps(existentes, ensure_ascii=False, indent=2), "utf-8")
    return registro
