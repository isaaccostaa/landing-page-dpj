import re
from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator

Plano = Literal["bimestral", "semestral"]


class LeadIn(BaseModel):
    nome_completo: str = Field(min_length=5, max_length=120)
    email: EmailStr
    celular: str
    plano: Plano
    consentimento: bool
    utm_source: str | None = Field(default=None, max_length=100)
    utm_medium: str | None = Field(default=None, max_length=100)
    utm_campaign: str | None = Field(default=None, max_length=150)
    utm_content: str | None = Field(default=None, max_length=150)
    origem_pagina: str | None = Field(default=None, max_length=300)

    @field_validator("nome_completo")
    @classmethod
    def nome_com_sobrenome(cls, v: str) -> str:
        v = " ".join(v.split())
        if len(v.split(" ")) < 2:
            raise ValueError("Informe nome e sobrenome")
        return v

    @field_validator("celular")
    @classmethod
    def celular_brasileiro(cls, v: str) -> str:
        digitos = re.sub(r"\D", "", v)
        if digitos.startswith("55") and len(digitos) == 13:
            digitos = digitos[2:]
        if len(digitos) != 11 or digitos[2] != "9":
            raise ValueError("Celular inválido. Use DDD + 9 dígitos")
        return digitos

    @field_validator("consentimento")
    @classmethod
    def precisa_consentir(cls, v: bool) -> bool:
        if not v:
            raise ValueError("É preciso aceitar o contato para continuar")
        return v


class LeadOut(BaseModel):
    id: str
    nome: str
    plano: Plano
