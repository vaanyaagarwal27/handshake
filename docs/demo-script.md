# Handshake — demo video script (draft)

Length: **3:00 max**. Track 01 — Best Business Workflow.
Voices: **H** = Hamsini (frontend dev), **V** = Vaanya (backend dev).
Speed up any waiting (agents thinking, npm installs) and add a small "⏩ sped up" label.

## Screen setup for recording

- Left: Discord, #handshake channel (zoom so messages are readable: Cmd + a few times)
- Right: VS Code or terminal, depending on the shot
- Browser tab ready at http://localhost:5173
- Dark/light theme the same across all windows
- Close notifications (Do Not Disturb on)

## Shots

| # | Time | On screen | Narration |
|---|------|-----------|-----------|
| 1 | 0:00–0:15 | Title card: "Handshake — frontend and backend agents agree on the API before they build it" | **H:** "Frontend and backend teams lose days to one sentence: *that's not the shape we agreed on.*" |
| 2 | 0:15–0:30 | Simple diagram: two agents → one Discord room → `contract/openapi.yaml` | **V:** "Handshake puts each side's coding agent in one Switch room. Each one reads only its own code, they negotiate the contract, and a human makes the final call." |
| 3 | 0:30–0:45 | Split: orders screen in browser (Arriving in N min, Prev/Next) + backend JSON in terminal (eta timestamp, all orders) | **H:** "Here's our starting point. My screen expects minutes remaining and pagination." **V:** "My API returns an ETA timestamp and every order at once. Neither of us knows that yet." |
| 4 | 0:45–0:55 | Discord: Hamsini posts "We need order tracking with an ETA on the orders screen." | **H:** "I just ask for the feature." |
| 5 | 0:55–1:20 | Discord: `[DISCOVERY]` lines, then both `[PROPOSAL]` messages (⏩ sped up) | **V:** "Each agent reads only its own folder and posts what its side actually does." |
| 6 | 1:20–1:40 | **Hero shot.** Zoom into the conflict list: ETA ❌, Pagination ❌ | **H:** "And here's the important part: instead of guessing, they surface the conflicts. Two mismatches, found before anyone wrote integration code." |
| 7 | 1:40–1:55 | Discord: human posts the decision: "timestamp; frontend computes minutes; add pagination." Agents repeat it back. | **V:** "Agents don't decide. A human does, in one message." |
| 8 | 1:55–2:10 | Discord `🔒 contract v1 locked`, then VS Code showing `contract/openapi.yaml` | **V:** "The backend agent writes the contract. It's now the single source of truth for both sides." |
| 9 | 2:10–2:30 | Terminal: `scripts/check-contract.sh` → backend ✅ frontend ✅. Browser: screen still shows "Arriving in N min", now computed from the timestamp, Page 1 of 3 | **H:** "Both agents build against it. pytest checks the backend's real responses, TypeScript checks the frontend. Both green." |
| 10 | 2:30–2:50 | *(stretch)* Terminal: `scripts/sabotage.sh` → check ❌ → Discord `[DRIFT]` → frontend-agent fixes → check ✅ | **V:** "Later, someone renames a field." **H:** "The check catches the drift, and my agent fixes its side in seconds." |
| 11 | 2:50–3:00 | End card: Handshake · Team Larpers · repo link | **H:** "Handshake: agree on the API first, then build. Thanks!" |

## If drift is cut (backup timing)

Drop shot 10. Give shot 6 (conflict list) and shot 9 (both ✅) 10 more seconds each, so viewers can read them.

## Recording checklist

- [ ] Reset both demo apps to the seeded mismatch before every take
- [ ] Record several takes; pick the cleanest agent run
- [ ] Record narration separately if live talking is awkward
- [ ] Check that every Discord message is readable at 1080p
- [ ] Final length ≤ 3:00
