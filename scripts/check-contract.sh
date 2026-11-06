#!/usr/bin/env bash
# Runs both contract checks against contract/openapi.yaml and prints ✅ / ❌.
#   backend:  the real GET /orders response (backend must be running on port 8000)
#   frontend: regenerate types from the contract, then npm run typecheck
set -uo pipefail

cd "$(dirname "$0")/.."

PY=python3
if [ -x demo/orders-backend/.venv/bin/python ]; then
  PY=demo/orders-backend/.venv/bin/python
fi

echo "── backend: GET /orders vs contract ──"
"$PY" scripts/check_contract.py
BACKEND=$?

echo
echo "── frontend: generated types + typecheck ──"
FRONTEND=1
if [ ! -f contract/openapi.yaml ]; then
  echo "❌ frontend: contract/openapi.yaml doesn't exist yet (not locked)"
else
  cd demo/orders-frontend
  if npm run --silent gen:types >/dev/null 2>&1 && npm run --silent typecheck; then
    echo "✅ frontend matches the contract"
    FRONTEND=0
  else
    echo "❌ frontend: typecheck fails against the contract (errors above)"
  fi
  cd ../..
fi

echo
if [ $BACKEND -eq 0 ] && [ $FRONTEND -eq 0 ]; then
  echo "✅ backend ✅ frontend: both sides match contract/openapi.yaml"
  exit 0
fi
[ $BACKEND -eq 0 ] && B="✅" || B="❌"
[ $FRONTEND -eq 0 ] && F="✅" || F="❌"
echo "$B backend $F frontend: contract check failed"
exit 1