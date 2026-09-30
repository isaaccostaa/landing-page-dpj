-- Tabela de cadastros da landing page DPJ (Supabase / PostgreSQL)
-- Rodar no Supabase: SQL Editor > New query > colar e executar.

create extension if not exists "pgcrypto";

create table if not exists public.leads (
    id             uuid primary key default gen_random_uuid(),
    criado_em      timestamptz not null default now(),
    nome_completo  text not null check (char_length(nome_completo) between 5 and 120),
    email          text not null,
    celular        text not null check (celular ~ '^[0-9]{11}$'),
    plano          text not null check (plano in ('bimestral', 'semestral')),
    consentimento  boolean not null check (consentimento),
    utm_source     text,
    utm_medium     text,
    utm_campaign   text,
    utm_content    text,
    origem_pagina  text,
    status         text not null default 'novo'
                   check (status in ('novo', 'contatado', 'convertido', 'perdido'))
);

create index if not exists leads_criado_em_idx on public.leads (criado_em desc);
create index if not exists leads_email_idx on public.leads (lower(email));

-- Segurança: a tabela fica fechada para o público.
-- Só o backend (chave service_role) consegue inserir e ler.
alter table public.leads enable row level security;
