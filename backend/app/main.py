"""FastAPI backend — optional local tooling.

The published site is fully static: the front-end imports ``data/resume.json``
at build time, so nothing here is needed to serve the page. This server exists
to validate the JSON against the Pydantic schema while editing and to expose a
handful of read-only JSON endpoints.

Run from ``backend/``:
    uvicorn app.main:app --reload --port 8000
"""

from __future__ import annotations

import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse

from .models import Resume, Stats

VERSION = "1.0.0"

APP_DIR = Path(__file__).resolve().parent          # backend/app
BACKEND_DIR = APP_DIR.parent                        # backend
PROJECT_DIR = BACKEND_DIR.parent                    # resume-web
DATA_FILE = BACKEND_DIR / "data" / "resume.json"
DIST_DIR = PROJECT_DIR / "frontend" / "dist"

SECTION_NAMES = (
    "profile",
    "skills",
    "certificates",
    "aiAgents",
    "accounts",
    "education",
    "experience",
    "projects",
    "otherProjects",
)

app = FastAPI(
    title="简历 · 扎姆",
    description="API for the resume site built with FastAPI + React + Sober.",
    version=VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ],
    allow_methods=["GET"],
    allow_headers=["*"],
)


_cache: tuple[float, Resume] | None = None


def load_resume() -> Resume:
    """Parse the JSON once per file version.

    Keyed on the file's mtime so editing ``data/resume.json`` shows up on the
    next request — no restart, no stale cache to forget about.
    """
    global _cache
    mtime = DATA_FILE.stat().st_mtime
    if _cache is None or _cache[0] != mtime:
        raw = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        _cache = (mtime, Resume.model_validate(raw))
    return _cache[1]


@app.get("/api/health", tags=["meta"])
def health() -> dict:
    resume = load_resume()
    return {
        "status": "ok",
        "version": VERSION,
        "source": resume.meta.source,
        "built": DIST_DIR.is_dir(),
        "sections": list(SECTION_NAMES),
    }


@app.get("/api/resume", response_model=Resume, tags=["resume"])
def get_resume() -> Resume:
    return load_resume()


@app.get("/api/resume/stats", response_model=Stats, tags=["resume"])
def get_stats() -> Stats:
    r = load_resume()
    return Stats(
        degrees=len(r.education),
        roles=len(r.experience),
        projects=len(r.projects),
        skills=len(r.skills),
        certificates=len(r.certificates),
        accounts=len(r.accounts),
    )



@app.get("/api/resume/{section}", tags=["resume"])
def get_section(section: str):
    if section not in SECTION_NAMES:
        raise HTTPException(
            status_code=404,
            detail=f"unknown section '{section}'; expected one of {', '.join(SECTION_NAMES)}",
        )
    return getattr(load_resume(), section)


# --------------------------------------------------------------------------- #
# front-end
# --------------------------------------------------------------------------- #

_MISSING_BUILD = """<!doctype html>
<meta charset="utf-8">
<title>前端尚未构建</title>
<style>
  body {{ font-family: system-ui, sans-serif; background: #fff8f5; color: #201a17;
         display: grid; place-items: center; min-height: 100vh; margin: 0; }}
  pre {{ background: #f8ebe6; padding: 16px 20px; border-radius: 12px; }}
</style>
<h1>前端还没有构建</h1>
<p>先执行构建，再刷新本页面：</p>
<pre>cd frontend
npm install
npm run build</pre>
<p>开发时也可以用 <code>npm run dev</code>（默认 http://localhost:5173）。</p>
"""


@app.get("/", include_in_schema=False)
def index():
    if not DIST_DIR.is_dir():
        return HTMLResponse(_MISSING_BUILD, status_code=200)
    return FileResponse(DIST_DIR / "index.html")


@app.get("/{path:path}", include_in_schema=False)
def spa(path: str):
    if path.startswith("api/"):
        raise HTTPException(status_code=404, detail="not found")
    if not DIST_DIR.is_dir():
        return HTMLResponse(_MISSING_BUILD, status_code=200)
    candidate = (DIST_DIR / path).resolve()
    if DIST_DIR.resolve() in candidate.parents and candidate.is_file():
        return FileResponse(candidate)
    return FileResponse(DIST_DIR / "index.html")


if __name__ == "__main__":  # pragma: no cover
    import uvicorn

    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
