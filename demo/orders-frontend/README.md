# Handshake – orders frontend

Food order tracking screen (Vite + React + TypeScript).

## Requirements

- Node 20.19+ or 22.12+ (required by Vite 8; check with `node -v`)

## Run it

From the repo root:

```sh
cd demo/orders-frontend
npm install
npm run dev
```

Then open http://localhost:5173.

## Typecheck

```sh
npm run typecheck
```

No output means it passed.

## Notes

- This app uses mock data for now (`src/mockOrders.ts`, loaded through `src/api.ts`). The backend will be at http://localhost:8000 later.
- TypeScript is pinned to `~5.9.3` on purpose. Don't upgrade it.
