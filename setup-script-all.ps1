$ErrorActionPreference = "Stop"

Write-Host "===> Start docker containers"
docker compose up --build -d

Write-Host "===> Catalog service: install + migrate"
Set-Location services/catalog-service
bun install --frozen-lockfile
bunx drizzle-kit push
Set-Location ../..

Write-Host "===> Order service: install + migrate"
Set-Location services/order-service
bun install --frozen-lockfile
bunx drizzle-kit push
Set-Location ../..

Write-Host "===> Notification service: install + migrate"
Set-Location services/notification-service
bun install --frozen-lockfile
bunx drizzle-kit push
Set-Location ../..

Write-Host "===> Seed catalog service"
Set-Location services/catalog-service
bun run src/db/seed.ts
Set-Location ../..

Write-Host "===> All setup complete"