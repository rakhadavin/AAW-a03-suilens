# suilens-microservice-tutorial

Run all setup in one time
```bash
chmod +x setup-script-all.sh
./setup-script-all.sh
```
or using powershell

```powershell
.\setup-script-all copy.ps1
```


or if u want to run it one-by-one:




Microservices tutorial implementation for Assignment 1 Part 2.2.

## Run

```bash
docker compose up --build -d
```

## Migrate + Seed (from host)

```bash
(cd services/catalog-service && bun install --frozen-lockfile && bunx drizzle-kit push)
(cd services/order-service && bun install --frozen-lockfile && bunx drizzle-kit push)
(cd services/notification-service && bun install --frozen-lockfile && bunx drizzle-kit push)
(cd services/catalog-service && bun run src/db/seed.ts)
```

## Smoke Test

```bash
curl http://localhost:3001/api/lenses | jq
LENS_ID=$(curl -s http://localhost:3001/api/lenses | jq -r '.[0].id')
curl -X POST http://localhost:3002/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Rakha Davin",
    "customerEmail": "2206082650@gmail.com",
    "lensId": "'"$LENS_ID"'",
    "startDate": "2025-03-01",
    "endDate": "2025-03-05"
  }' | jq

docker compose logs notification-service --tail 20
```

## Stop

```bash
docker compose down
```


# Bukti Tugas

1. Keberhasilan membuat pod worker 
Saya hanya menggunakan 1 worker dikarenakan masalah storage.

2. Implementasi Dokumentasi API
- Catalog Service
- Order Service
- Notification Service

3. Websocket Test (smoke test)
4. Cluster Deployment
5. kubectl get pods –o wide
6. Smoke Test using Ingress Nginx

```bash
curl http://suilens.local:30465/api/lenses | jq
LENS_ID=$(curl -s http://suilens.local:30465/api/lenses | jq -r '.[0].id')

curl -s -X POST http://suilens.local:30465/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Rakha Davin",
    "customerEmail": "2206082650@gmail.com",
    "lensId": "'"$LENS_ID"'",
    "startDate": "2025-03-01",
    "endDate": "2025-03-05"
  }' | jq

kubectl logs deployment/notification-service -n suilens-2206082650 --tail=20
```