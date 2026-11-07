# Recording checklist (Nov 7)

Follow it top to bottom. Every command block is one paste. Three Terminal tabs:
**T1** = backend, **T2** = frontend, **T3** = repo root (git + scripts).

## Time budget

| Block | Time | By (IST) |
|---|---|---|
| Setup (part A) | 15 min | |
| Rehearsal (parts B–D, no recording) | 15 min | |
| Recording takes (repeat A + B–D per take) | 30 min | 2:00 PM |
| Editing (Hamsini) | 45 min | 3:30 PM |
| Review together + submit | 30 min | **6:00 PM** |

Hard deadline: Nov 7, 11:59 PM IST.
backup video (`docs/backup-video.md`).

---

## A. Setup (before EVERY take)

### 1. T3: reset the repo
```
cd ~/handshake
```
```
git switch main
```
```
git pull --rebase
```
```
./scripts/reset-demo.sh
```
```
git status
```
Must say `nothing to commit, working tree clean`. If not, stop and check what changed.

### 2. T1: restart the backend (this also makes the ETAs fresh)
Press Ctrl+C if uvicorn is already running, then:
```
kill -9 $(lsof -ti:8000)
```
(If it says `kill: not enough arguments`, that's fine: no server was running.)
```
cd ~/handshake/demo/orders-backend
```
```
source .venv/bin/activate
```
```
pip install -r requirements.txt
```
```
uvicorn main:app --reload
```
Wait for `Uvicorn running on http://127.0.0.1:8000`. Leave T1 running.

### 3. T2: start the frontend
Press Ctrl+C if Vite is already running, then:
```
cd ~/handshake/demo/orders-frontend
```
```
npm run dev
```
Leave T2 running.

### 4. Browser: check the starting state
- http://localhost:8000/orders → a **plain list** (starts with `[`), **12 orders**,
  ETAs with **today's date**, close to now.
- http://localhost:5173 → **mock** orders (Margherita Pizza, Pad Thai, …), "Arriving in N min", **Page 1 of 3**.

### 5. Switch Console: re-paste the agent instructions
Do this once per day (or after either file changes):
- **frontend-agent** → its Instructions → Cmd+A → paste the whole of `switch/frontend-agent.md` → Save
- **backend-agent** → its Instructions → Cmd+A → paste the whole of `switch/backend-agent.md` → Save

Check that frontend-agent's text has a **"Where things are"** section.

### 6. Discord: a fresh channel (never reuse one)
A Switch room remembers its whole history, so a reused channel confuses the agents.
1. Create a new text channel: `#handshake-final` (next take: `#handshake-final-2`, …).
2. In it, post: `hello` (this creates the room).
3. Post: `!invite-agent @backend-agent`
4. Post: `!invite-agent @frontend-agent`
5. Switch Console → Your Rooms → the new room → Configuration → Instructions →
   paste the whole of `switch/room-rules.md` → **Save**.

### 7. Screen layout
- Left: Discord on the new channel, zoomed in (Cmd + a few times).
- Right: browser on localhost:5173.
- Do Not Disturb on. Close other tabs and notifications.

---

## B. Record the main run

### 8. Start the screen recording
Cmd+Shift+5 → Record Entire Screen (or the Discord + browser area) → Record.
Record the **whole run uncut**. Waits get sped up in editing.

### 9. Show "before" (shot 3)
- Browser on localhost:5173: mock orders, Page 1 of 3. Hold 3 s.
- T3:
```
curl -s localhost:8000/orders | head -c 300
```

### 10. Post the request in the channel (Hamsini, or Vaanya if alone)
```
@frontend-agent we need order tracking with an ETA on the orders screen.
```
Wait: frontend-agent posts `[DISCOVERY]` and `[PROPOSAL]` and opens a **thread**.
Open the thread panel. backend-agent replies there with its `[PROPOSAL]` and the
**conflict list**. Hold on the conflict list for 5 s.

### 11. Post the decision INSIDE THE THREAD (only after the conflict list appears)
```
ETA: keep eta as an ISO timestamp; frontend computes minutes remaining.
Pagination: add page/limit query params.
Response shape: wrap it as { orders, page, limit, total }.
```
Wait for: both agents repeat it back → `🔒 contract v1 locked @frontend-agent` →
both agents' `[BUILD]` lines with ✅.

### 12. Show the locked contract (shot 9)
T3:
```
open -a "Visual Studio Code" contract/openapi.yaml
```

### 13. Run the contract check (shot 10)
T3:
```
./scripts/check-contract.sh
```
Expected last line: `✅ backend ✅ frontend: both sides match contract/openapi.yaml`.

### 14. Show "after" (shot 10)
Refresh localhost:5173: **real orders** from the backend (Chicken Biryani etc.),
"Arriving in N min", **Page 1 of 3**. Click **Next** and **Prev**.

---

## C. Drift (optional, only if B went cleanly)

### 15. T3: break the backend on purpose
```
./scripts/sabotage.sh
```
```
./scripts/check-contract.sh
```
Expected: `❌ backend`, with `eta: missing` and `estimated_arrival: not in contract`.

### 16. In the thread, post:
```
@backend-agent check the contract
```
Wait for `[DRIFT] ❌`. Then post:
```
@backend-agent update the contract
```
Wait for: `🔒 contract v2 locked @frontend-agent` → frontend-agent `[DRIFT] ❌` → `[DRIFT] ✅`.

### 17. T3: green again
```
./scripts/check-contract.sh
```
Refresh localhost:5173: same screen, still works.

---

## D. After the take

### 18. Stop the recording
Cmd+Ctrl+Esc (or the stop button in the menu bar). Rename the file `take-1.mov`, `take-2.mov`, …

### 19. (Good take only) Save the agents' result as evidence
T3:
```
git switch -c final-run
```
```
git add demo contract
```
```
git commit -m "final run: result of the agents' build"
```
```
git push -u origin final-run
```
```
git switch main
```
Never merge `final-run` into main.

### 20. Send the recording to Hamsini
AirDrop / Google Drive. Then go back to step 1 for another take.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| localhost:5173 stuck on "Loading…" or shows an error after BUILD | Stale backend. T1: Ctrl+C → `kill -9 $(lsof -ti:8000)` → `uvicorn main:app --reload` → refresh. |
| Every order says "Arriving in 0 min" | Backend wasn't restarted. Restart it (step 2). |
| Agents talk about an old run, or reply out of order | You reused a channel. Make a new one (step 6). |
| An agent stops and doesn't hand over | @mention it in the thread: `@backend-agent your turn` (or `@frontend-agent your turn`). |
| An agent asks for permission or shows a ZodError | Bypass permissions must be ON for both agents (Switch Console v0.40.1 bug). |
| check-contract says "PyYAML missing" | T1 (venv active): `pip install -r requirements.txt` |
| check-contract says "contract/openapi.yaml doesn't exist" | Lock didn't happen yet. Wait for `🔒 contract v1 locked`. |
| frontend-agent can't find the contract | Its Instructions in Switch Console are old. Re-paste `switch/frontend-agent.md` (step 5). |
| `git status` not clean after reset | `./scripts/reset-demo.sh` again. If still not clean, ask Hamsini before deleting anything. |
