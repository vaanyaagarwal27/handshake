"""Backend contract check: compare the real API response with contract/openapi.yaml.

Usage: python3 scripts/check_contract.py [url]
Default url: http://localhost:8000/orders?page=1&limit=5
Prints one line per field and exits 1 if anything doesn't match.
"""
import json
import sys
import urllib.request
from datetime import datetime
from pathlib import Path

try:
    import yaml
except ImportError:
    print("❌ backend: PyYAML missing. Run: pip3 install pyyaml")
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
CONTRACT = ROOT / "contract" / "openapi.yaml"
URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/orders?page=1&limit=5"

errors = []
seen = set()


def resolve(schema, spec):
    ref = schema.get("$ref")
    if not ref:
        return schema
    node = spec
    for part in ref.lstrip("#/").split("/"):
        node = node[part]
    return node


def check(value, schema, spec, path):
    schema = resolve(schema, spec)
    kind = schema.get("type")

    if kind == "object":
        if not isinstance(value, dict):
            errors.append(f"{path}: expected object, got {type(value).__name__}")
            return
        props = schema.get("properties", {})
        for name in schema.get("required", []):
            if name not in value:
                errors.append(f"{path}.{name}: missing (contract requires it)")
        for name in value:
            if name not in props:
                errors.append(f"{path}.{name}: not in contract")
        for name, sub in props.items():
            if name in value:
                check(value[name], sub, spec, f"{path}.{name}")
        return

    if kind == "array":
        if not isinstance(value, list):
            errors.append(f"{path}: expected array, got {type(value).__name__}")
            return
        for item in value:
            check(item, schema.get("items", {}), spec, f"{path}[]")
        return

    seen.add(path)
    ok = {
        "integer": isinstance(value, int) and not isinstance(value, bool),
        "number": isinstance(value, (int, float)) and not isinstance(value, bool),
        "string": isinstance(value, str),
        "boolean": isinstance(value, bool),
    }.get(kind, True)
    if not ok:
        errors.append(f"{path}: expected {kind}, got {type(value).__name__} ({value!r})")
        return
    if "enum" in schema and value not in schema["enum"]:
        errors.append(f"{path}: {value!r} not one of {schema['enum']}")
    if schema.get("format") == "date-time":
        try:
            datetime.fromisoformat(value.replace("Z", "+00:00"))
        except ValueError:
            errors.append(f"{path}: {value!r} is not an ISO date-time")


def main():
    if not CONTRACT.exists():
        print("❌ backend: contract/openapi.yaml doesn't exist yet (not locked)")
        return 1
    spec = yaml.safe_load(CONTRACT.read_text())
    try:
        schema = spec["paths"]["/orders"]["get"]["responses"]["200"]["content"][
            "application/json"]["schema"]
    except (KeyError, TypeError):
        print("❌ backend: contract has no GET /orders 200 response")
        return 1

    try:
        with urllib.request.urlopen(URL, timeout=5) as resp:
            body = json.load(resp)
    except Exception as e:
        print(f"❌ backend: can't reach {URL} ({e}). Is uvicorn running on port 8000?")
        return 1

    check(body, schema, spec, "response")
    errors[:] = list(dict.fromkeys(errors))

    bad_paths = {e.split(":")[0] for e in errors}
    for path in sorted(seen - bad_paths):
        print(f"   ✅ {path}")
    for e in errors:
        print(f"   ❌ {e}")
    if errors:
        print(f"❌ backend: {len(errors)} mismatch(es) with the contract")
        return 1
    print("✅ backend matches the contract")
    return 0


if __name__ == "__main__":
    sys.exit(main())