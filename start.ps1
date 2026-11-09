param(
    [switch]$Dev,
    [int]$Port = 8000,
    [switch]$NoBuild
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontend = Join-Path $root 'frontend'
$backend = Join-Path $root 'backend'

function Ensure-Frontend {
    if (-not (Test-Path (Join-Path $frontend 'node_modules'))) {
        Write-Host '[1/2] 安装前端依赖 ...' -ForegroundColor Cyan
        Push-Location $frontend
        try { npm install --no-audit --no-fund } finally { Pop-Location }
    }
    Push-Location $frontend
    try {
        # Vite leaves stale hashed bundles behind on Windows; clear them first so
        # dist only ever holds the current build.
        $dist = Join-Path $frontend 'dist'
        if (Test-Path $dist) { Remove-Item $dist -Recurse -Force }
        Write-Host '[2/2] 构建前端 ...' -ForegroundColor Cyan
        npm run build
    } finally { Pop-Location }
}

if ($Dev) {
    Start-Process pwsh -ArgumentList @(
        '-NoExit', '-NoProfile', '-Command',
        "Set-Location '$backend'; python -m uvicorn app.main:app --reload --port $Port"
    )
    Start-Process pwsh -ArgumentList @(
        '-NoExit', '-NoProfile', '-Command',
        "Set-Location '$frontend'; npm run dev"
    )
    Write-Host "后端 http://127.0.0.1:$Port/docs   前端 http://127.0.0.1:5173" -ForegroundColor Green
    exit 0
}

if (-not $NoBuild) { Ensure-Frontend }

Push-Location $backend
try {
    Write-Host "简历页面: http://127.0.0.1:$Port" -ForegroundColor Green
    python -m uvicorn app.main:app --host 127.0.0.1 --port $Port
} finally { Pop-Location }
