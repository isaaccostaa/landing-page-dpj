"""API da landing page DPJ: recebe os cadastros de quem quer assinar um plano."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .schemas import LeadIn, LeadOut
from .storage import salvar_lead

app = FastAPI(title="DPJ Consultoria Esportiva - API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "armazenamento": settings.modo_armazenamento}


@app.post("/api/leads", response_model=LeadOut, status_code=201)
async def criar_lead(lead: LeadIn) -> LeadOut:
    registro = await salvar_lead(lead)
    return LeadOut(id=registro["id"], nome=lead.nome_completo, plano=lead.plano)
