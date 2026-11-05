#!/usr/bin/env bash
set -euo pipefail

# Restore tracked files in demo/ to the seeded mismatch state.
git restore --source=demo-start -- demo

# Remove files created during the demo in demo/ and contract/.
# .venv and node_modules are already protected by .gitignore (git clean -fd
# skips ignored files), but we exclude them explicitly to be safe.
git clean -fd \
  --exclude='.venv' \
  --exclude='node_modules' \
  demo contract

# Remove the locked contract if it exists.
rm -f contract/openapi.yaml

echo "✅ reset to demo-start"
