#!/usr/bin/env bash
set -euo pipefail

# Run from anywhere — resolve the repo root from the script's own location.
cd "$(dirname "$0")/.."

BACKEND=demo/orders-backend

# Rename the dict key "eta" → "estimated_arrival" in the backend source files.
# sed -i '' is required on macOS (BSD sed needs an explicit backup extension with -i).
# Matching "eta": (key + colon) avoids touching any value that might contain "eta".
sed -i '' 's/"eta":/"estimated_arrival":/g' "$BACKEND/data.py"
sed -i '' 's/"eta":/"estimated_arrival":/g' "$BACKEND/main.py"

echo "💥 backend changed: eta → estimated_arrival"
