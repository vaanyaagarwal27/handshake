# Handshake — demo video script (draft v2)

Length: **3:00 max**. Track 01 — Best Business Workflow.
Voices: **H** = Hamsini (frontend dev), **V** = Vaanya (backend dev).
Recorded in a clean channel: **#handshake-demo**.
Speed up any waiting (agents thinking, installs) and add a small "⏩ sped up" label.

## Screen setup (all on Vaanya's Mac, where both agents run)

- Left: Discord, #handshake-demo (zoomed in so messages are readable)
- Right: terminal / VS Code, depending on the shot
- Backend running at http://localhost:8000, frontend at http://localhost:5173
- Same theme in every window; Do Not Disturb on

## Shots

| # | Time | On screen | Narration |
|---|------|-----------|-----------|
| 1 | 0:00–0:12 | Title card: "Handshake: frontend and backend agents agree on the API before they build" | **H:** "Frontend and backend teams lose days to one sentence: *that's not the shape we agreed on.*" |
| 2 | 0:12–0:25 | Diagram: frontend-agent + backend-agent → one Discord room → `contract/openapi.yaml` | **V:** "Handshake puts each side's coding agent in one Switch room. Each reads only its own code, they surface conflicts, and a human makes the call." |
| 3 | 0:25–0:40 | Split: orders screen in the browser (Arriving in N min, Prev/Next) + `curl localhost:8000/orders` in the terminal (plain list, eta timestamps) | **H:** "My screen expects minutes remaining, pages, and a wrapped response." **V:** "My API returns every order as a plain list, with an ETA timestamp. Neither agent knows that yet." |
| 4 | 0:40–0:48 | Discord: H posts "@frontend-agent we need order tracking with an ETA on the orders screen." | **H:** "I ask my agent for the feature. That's it." |
| 5 | 0:48–1:05 | frontend-agent: `[DISCOVERY]`, then `[PROPOSAL]` ending "@backend-agent your turn" (⏩) | **H:** "My agent reads only the frontend folder, proposes first, and hands over." |
| 6 | 1:05–1:20 | backend-agent: `[PROPOSAL]` from the backend's side (⏩) | **V:** "The backend agent reads only the backend folder and answers with what it actually serves." |
| 7 | 1:20–1:42 | **Hero shot.** Zoom into the conflict list: ETA ❌ · Pagination ❌ · Response shape ❌ | **H:** "And this is the point: three mismatches, found in a minute, before anyone wrote integration code." |
| 8 | 1:42–1:55 | Discord: human decision ("eta stays a timestamp, frontend computes minutes; add page/limit; wrap the response"). Agents repeat it back. | **V:** "The agents never settle it themselves. A human decides, in one message." |
| 9 | 1:55–2:05 | Discord "🔒 contract v1 locked @frontend-agent" → VS Code on `contract/openapi.yaml` | **V:** "The backend agent writes the contract. Now it's the single source of truth." |
| 10 | 2:05–2:25 | frontend-agent `[BUILD]` lines, one ✅ per field → `scripts/check-contract.sh` backend ✅ frontend ✅ → browser shows real orders, "Arriving in N min", Page 1 of 3 | **H:** "Both sides build against it. pytest checks the backend, TypeScript checks the frontend. All green, with real data." |
| 11 | 2:25–2:52 | *(stretch)* V runs `scripts/sabotage.sh` → posts "@backend-agent check the contract" → backend-agent reports the drift → human: "update the contract" → "🔒 contract v2 locked @frontend-agent" → frontend-agent `[DRIFT]` ❌ → ✅ → check ✅ | **V:** "Later, someone renames a field." **H:** "The check catches it, a human approves the change, and my agent updates its side." |
| 12 | 2:52–3:00 | End card: Handshake · Team Larpers · repo link | **H:** "Handshake: agree on the API first, then build. Thanks!" |

## If drift is cut (backup timing)

Drop shot 11. Give shot 7 (conflict list) and shot 10 (all green) about 12 more seconds each,
so viewers can read them, and end at ~2:40.

## Recording checklist

- [ ] Fresh, empty #handshake-demo channel for each take
- [ ] Both demo apps reset to the seeded mismatch before every take (agree how with Vaanya)
- [ ] Backend (:8000) and frontend (:5173) running before recording starts
- [ ] Record several takes; keep the cleanest agent run
- [ ] Narration can be recorded separately and laid over the video
- [ ] Every Discord message readable at 1080p
- [ ] Final length ≤ 3:00