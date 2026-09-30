# Landing page DPJ Consultoria Esportiva

Protótipo da landing page do personal trainer Deusmar Junqueira (DPJ).

- **Frontend:** React + TypeScript + Vite + Tailwind CSS (`frontend/`)
- **Backend:** Python + FastAPI (`backend/`), recebe os cadastros de quem quer assinar um plano
- **Banco:** PostgreSQL no Supabase (`database/schema.sql`), ainda **desligado**: no modo protótipo os cadastros vão para `backend/data/leads.json`

## Como rodar

### Sem instalar nada (navegador)

- **GitHub Codespaces:** no repositório, clique em **Code > Codespaces > Create codespace on main**.
  A instalação acontece sozinha na primeira vez. Depois rode `bash iniciar.sh` no terminal e abra a porta 5173.
- **Claude Code na web:** em claude.ai/code, escolha este repositório e continue pedindo alterações.

### No Windows

Clique duas vezes em `iniciar.bat`, ou rode em dois terminais:

```bash
cd backend
.venv\Scripts\python -m uvicorn app.main:app --port 8000
```

```bash
cd frontend
npm run dev
```

Depois abra http://localhost:5173

### Primeira instalação em outro computador

```bash
cd backend
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
cd ..\frontend
npm install
```

## Ligar no Supabase (quando for para produção)

1. Crie o projeto no Supabase.
2. Em **SQL Editor**, cole e rode o conteúdo de `database/schema.sql`.
3. Copie `backend/.env.example` para `backend/.env` e preencha `SUPABASE_URL` e `SUPABASE_SERVICE_KEY`
   (Project Settings > API > chave `service_role`; ela fica **só** no backend).
4. Reinicie o backend. `GET /api/health` passa a mostrar `"armazenamento": "supabase"`.

## Onde editar o conteúdo

Textos, preços, planos, FAQ, links de WhatsApp e dados da empresa ficam em `frontend/src/data/conteudo.ts`.

## Mídias

As fotos e os vídeos originais ficam em `Imagens/` e não são alterados.
O script `scripts/preparar_midia.py` gera as versões otimizadas em `frontend/public/media/`:
limpa o fundo da logo, converte as fotos para WebP e recomprime os vídeos com capa.
Para rodar de novo depois de trocar alguma mídia:

```bash
pip install imageio-ffmpeg pillow numpy
python scripts/preparar_midia.py
```

## Antes de publicar

- Definir o domínio e preencher o `canonical` e a URL absoluta do `og:image` em `frontend/index.html`.
- Colar o código do Meta Pixel no local indicado em `frontend/index.html`.
- Validar com o Deusmar as respostas do FAQ e os textos da página.
- Gerar a versão final com `npm run build` (sai em `frontend/dist/`).
