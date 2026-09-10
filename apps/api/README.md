# BikeFlow API

NestJS 기반의 BikeFlow API입니다. 모든 공개 API는 `/api/v1` 아래에서 제공하며, 운영 환경에서는 `apps/web`의 Vite 빌드 결과도 함께 서빙합니다.

```bash
pnpm dev:api
```

기본 포트는 `8080`이며 `GET /api/v1/health`로 상태를 확인할 수 있습니다.
