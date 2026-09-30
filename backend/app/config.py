import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


class Settings:
    supabase_url: str = os.getenv("SUPABASE_URL", "").rstrip("/")
    supabase_key: str = os.getenv("SUPABASE_SERVICE_KEY", "")
    cors_origins: list[str] = [
        o.strip()
        for o in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
        if o.strip()
    ]
    arquivo_local: Path = BASE_DIR / "data" / "leads.json"

    @property
    def usa_supabase(self) -> bool:
        return bool(self.supabase_url and self.supabase_key)

    @property
    def modo_armazenamento(self) -> str:
        return "supabase" if self.usa_supabase else "prototipo-local"


settings = Settings()
