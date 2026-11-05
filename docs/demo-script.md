# Handshake — demo video script (v3, from rehearsal 1)

Length: **3:00 max**. Track 01 — Best Business Workflow.
Voices: **H** = Hamsini (frontend dev), **V** = Vaanya (backend dev).
Final recording: fresh channel **#handshake-demo-final**, on Vaanya's Mac (both agents run there).

## Timing: the real run is ~4 min

Rehearsal 1 took about 4 minutes end to end. Most of that is agents showing "Working…".
To fit 3:00:
- **⏩ = speed up** (8–16×) with a small "⏩ sped up" label. Never cut silently.
- **✂️ = cut** the wait completely and jump to the next message.
- Keep every message that matters on screen for **at least 3 seconds** so it can be read.
- Record the whole run uncut, then edit. Don't try to time it live.

## Screen setup

- Left: Discord on #handshake-demo-final, with the **thread panel open on the right**
  (the whole flow happens inside the thread that frontend-agent's proposal starts)
- Right: browser on http://localhost:5173 / terminal / VS Code, depending on the shot
- Backend running (`uvicorn main:app --reload`, port 8000), frontend running (`npm run dev`)
- Discord zoomed in (Cmd + a few times), same theme everywhere, Do Not Disturb on

## Shots

| # | Time | On screen | Edit | Narration |
|---|------|-----------|------|-----------|
| 1 | 0:00–0:10 | Title card: "Handshake: frontend and backend agents agree on the API before they build" | | **H:** "Every API mismatch between frontend and backend means a broken screen, rework and another meeting." |
| 2 | 0:10–0:22 | Diagram: frontend-agent + backend-agent → one Switch room on Discord → `contract/openapi.yaml` | | **V:** "Handshake puts each side's coding agent in one Switch room. Each reads only its own code, they surface the conflicts, and a human decides." |
| 3 | 0:22–0:35 | **Before.** Browser: mock orders, "Arriving in N min", **Page 1 of 3**. Then terminal: `curl localhost:8000/orders` → plain list with eta timestamps | | **H:** "My screen runs on mock data. It expects minutes remaining and pages." **V:** "My API sends a plain list with timestamps. Neither agent knows that yet." |
| 4 | 0:35–0:42 | Discord: H posts "@frontend-agent we need order tracking with an ETA on the orders screen." | | **H:** "I just ask my agent for the feature." |
| 5 | 0:42–0:57 | frontend-agent "Working…" → `[DISCOVERY]` → `[PROPOSAL]` ending "@backend-agent your turn". The thread opens. | ⏩ the wait | **H:** "It reads only the frontend folder, proposes first, and hands over in a thread." |
| 6 | 0:57–1:10 | Thread panel: backend-agent "Working…" → `[PROPOSAL]` | ⏩ the wait | **V:** "The backend agent reads only the backend folder and answers with what the API really serves." |
| 7 | 1:10–1:28 | **Hero shot.** Zoom into the conflict list: ETA ❌ · Pagination ❌ · Response shape ❌ | hold 5 s+ | **H:** "Three mismatches, found in a minute, before anyone wrote integration code." |
| 8 | 1:28–1:40 | Thread panel: human posts the decision **inside the thread**. Agents repeat it back. | ⏩ the repeat-backs | **V:** "The agents never settle it. A human decides, in one message, in the same thread." |
| 9 | 1:40–1:50 | Thread: "🔒 contract v1 locked @frontend-agent" → VS Code on `contract/openapi.yaml` | ✂️ the writing wait | **V:** "The backend agent writes the contract. Now there's one source of truth." |
| 10 | 1:50–2:10 | Both agents' `[BUILD]` lines with ✅ per field → terminal `scripts/check-contract.sh` backend ✅ frontend ✅ → **After.** Browser: the backend's **real orders**, "Arriving in N min" computed from eta, **Page 1 of 3**, Next works | ⏩ BUILD waits | **H:** "Both sides build against it, and both checks go green. Same screen, now with real data." |
| 11 | 2:10–2:40 | *(stretch)* V runs `scripts/sabotage.sh` → posts "@backend-agent check the contract" → `[DRIFT] ❌` → human: "update the contract" → "🔒 contract v2 locked @frontend-agent" → frontend-agent `[DRIFT]` ❌ → ✅ → check ✅ | ⏩ all waits | **V:** "Later, someone renames a field." **H:** "The check catches it, a human approves the change, and my agent updates its side." |
| 12 | 2:40–2:50 | *(optional)* **Teamwork.** V pushes the result. H runs `git pull` on her own laptop, and her screen shows the same real orders. | ✂️ install waits | **H:** "Vaanya pushes, I pull, and my screen matches. Two people, two agents, one contract." |
| 13 | 2:50–3:00 | End card: Handshake · Team Larpers · repo link | | **H:** "Handshake: agree on the API first, then build. Thanks!" |

## If we're over time or something breaks

- **Drift cut:** drop shot 11. Give shots 7 and 10 about 10 s more each. End around 2:30.
- **Teamwork cut:** drop shot 12 (it needs the backend running on Hamsini's laptop too).
- Never cut: the conflict list (7), the human decision (8), the locked contract (9).

## Before every take

- [ ] `git switch main` → `./scripts/reset-demo.sh` (back to tag `demo-start`)
- [ ] **Fresh** Discord channel, room rules pasted into its Instructions, both agents invited
- [ ] Backend and frontend running. localhost:5173 shows the **mock** orders, Page 1 of 3
- [ ] Discord zoomed in, thread panel ready, Do Not Disturb on

## After recording

- [ ] Final length ≤ 3:00
- [ ] Every ⏩ has a visible "sped up" label
- [ ] Every Discord message readable at 1080p
- [ ] Narration recorded separately if live talking is awkward