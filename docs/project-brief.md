# Handshake — project brief

Team **Larpers**: Vaanya Agarwal (leader) + Hamsini V
Hackathon: WeMakeDevs × DevTools Academy "Flip the Switch" (Switch AI), online, Nov 4–7 2026
Track: **Track 01 — Best Business Workflow**
Repo: https://github.com/vaanyaagarwal27/handshake

> **Why this file is in docs/ and not CLAUDE.md:** Claude Code auto-loads every CLAUDE.md in its
> working directory and all parent folders. The two demo agents run inside this repo, so a root
> CLAUDE.md would leak the whole plan (the other side's API shape, the expected human decision)
> into both agents. **Never add a CLAUDE.md anywhere in this repo.** To use this brief in your own
> Claude Code session, tell it: "Read docs/project-brief.md first."

> **Note for any Claude helping Vaanya or Hamsini build this:** the decisions below are final.
> Don't propose extra repos, a different stack or a different structure. If something turns out to
> be impossible, say so plainly and suggest the smallest fix. Work one small step at a time: each
> step should run and show something, then stop so the human can check it. Explain each new file in
> plain words.

---

## 1. Who is who

| Role | Person | Folder they own |
|---|---|---|
| **Frontend person** | **Hamsini** | `demo/orders-frontend/`, `switch/frontend-agent.md`, `docs/demo-script.md` |
| **Backend person** | **Vaanya** | `demo/orders-backend/`, `switch/backend-agent.md` |
| **Switch host** | **Vaanya** | runs Switch Console + Docker on her Mac |

Shared (change only after telling each other): `docs/project-brief.md`, `README.md`,
`contract/`, `scripts/`, `switch/room-rules.md`.

## 2. Rules for any Claude helping us build

1. Only create or edit files inside your person's folders (section 1). If a change outside them
   seems needed, stop and tell the human.
2. Stage only your own folders (e.g. `git add demo/orders-backend`). Never `git add .` or `git add -A`.
3. Never `git push --force`, never `git reset --hard`, never delete branches.
4. Commit messages start with: `frontend:`, `backend:`, `switch:`, `docs:`, `contract:`.
5. The mismatch between the two demo apps is **on purpose** (section 4). Don't make them match
   before the demo flow does it.
6. **Never create a CLAUDE.md** in this repo.

## 3. What Handshake is

Frontend and backend teams lose time to API mismatches ("that's not the shape we agreed on").
Handshake puts each side's coding agent in one Switch room (a Discord channel). Each agent reads
**only its own side's code** and proposes its half of the API contract. Where they disagree, they
post a short conflict list, a human decides, and the contract is locked as `contract/openapi.yaml`.
Then both agents build against it, and the contract checks go green. If the backend later renames
a field, the checks catch the drift and the frontend agent fixes its side.

**Two different things, don't mix them up:**
- *Building Handshake* = Vaanya and Hamsini writing this repo with their own Claude Code.
- *The Handshake demo* = two agents inside Switch (`backend-agent`, `frontend-agent`) negotiating
  in Discord. Each works only inside its own `demo/` folder.

## 4. Final decisions

- **One GitHub repo.** "Separate repos" in the pitch = separate folders. Each demo agent's working
  directory is its own `demo/` folder.
- Chat: **Discord**, server "Larpers", channel `#handshake` (a clean `#handshake-demo` channel will
  be used for the final recording).
- Agents: **Claude Code** for both, running on **Vaanya's Mac** through Switch (see section 7).
- Backend demo app: **Python + FastAPI**, runs at **http://localhost:8000**
- Frontend demo app: **React + Vite + TypeScript**, runs at **http://localhost:5173**
  (TypeScript pinned to ~5.9.3; don't upgrade it, don't run `npm audit fix --force`)
- Contract: **OpenAPI 3** in `contract/openapi.yaml`. backend-agent writes it; frontend-agent only reads it.
- Contract checks: backend uses `pytest`; frontend generates TypeScript types from the contract
  with `openapi-typescript`, and `npm run typecheck` fails on a mismatch.
- Agents **never run git**. The humans review, commit and push.
- **Demo scenario: food order tracking with an ETA.** The two apps are seeded with three
  deliberate conflicts:

| | Backend has | Frontend expects |
|---|---|---|
| ETA | `eta` as an ISO 8601 timestamp | `minutesRemaining: number` |
| Pagination | none, returns all orders | `page` / `limit` query params |
| Response shape | a plain list `[ ... ]` | a wrapper `{ orders, page, limit, total }` |

  Expected human decision: "timestamp; frontend computes minutes; add page/limit; use the
  wrapped response."

## 5. Repo structure

```
handshake/
├── README.md                      ← detailed, written on Day 4
├── docs/
│   ├── project-brief.md           ← this file
│   └── demo-script.md             ← Hamsini: the ≤3-minute video, shot by shot
├── switch/
│   ├── frontend-agent.md          ← Hamsini: frontend-agent's instructions (draft done)
│   ├── backend-agent.md           ← Vaanya: backend-agent's instructions
│   └── room-rules.md              ← together: pasted into the room's Instructions box in Switch
├── contract/openapi.yaml          ← v0 created together; v1 written by backend-agent in the demo
├── demo/
│   ├── orders-backend/            ← Vaanya (FastAPI): main.py, data.py, requirements.txt, tests/
│   └── orders-frontend/           ← Hamsini (React + Vite + TS): OrdersScreen.tsx, mockOrders.ts, api.ts
└── scripts/                       ← check-contract.sh, sabotage.sh (later)
```

## 6. Room flow (the demo)

1. **[DISCOVERY]** Hamsini posts: "We need order tracking with an ETA on the orders screen."
   The request @mentions only @frontend-agent. Each agent reads only its own folder.
2. **[PROPOSAL]** @frontend-agent proposes first (3–6 lines) and @mentions @backend-agent when
   done. @backend-agent proposes second and **always** posts the conflict list right after, e.g.
   `ETA: frontend wants minutesRemaining · backend has eta (ISO timestamp) ❌`
   @backend-agent then asks the humans in the room to decide each ❌.
3. **[ARBITRATION]** A human decides. Agents never decide conflicts themselves; they repeat the
   decision back.
4. **[LOCKED]** backend-agent writes `contract/openapi.yaml` and posts "🔒 contract v1 locked
   @frontend-agent".
5. **[BUILD]** Each agent changes only its own app, runs its check, and reports ✅ / ❌.
6. **[DRIFT]** (stretch) Vaanya runs `scripts/sabotage.sh` (renames `eta` → `estimated_arrival`
   in the backend), then posts "@backend-agent check the contract". @backend-agent reads
   `main.py` and `data.py`, finds the drift, and reports which fields differ. A human picks
   "update the contract". @backend-agent writes `contract/openapi.yaml` v2 and posts
   "🔒 contract v2 locked @frontend-agent" with exactly what changed. @frontend-agent updates
   its side and reports ✅.

Every handoff between agents must @mention the other agent.

Agent messages stay short and start with a phase tag: `[DISCOVERY]`, `[PROPOSAL]`, `[ARBITRATION]`,
`[LOCKED]`, `[BUILD]`, `[DRIFT]`.

**What each agent must never read:**
- backend-agent: `demo/orders-frontend/`, `docs/`, `switch/`, `scripts/`
- frontend-agent: `demo/orders-backend/`, `docs/`, `switch/`, `scripts/`
- Neither asks the other for its code. They only learn the other side from the room.

## 7. Switch setup: verified facts (Nov 4–5)

- **Switch server runs locally on Vaanya's Mac** (Switch Console + Docker). Only the person who runs
  a local server can sign in to it, so **both demo agents run on Vaanya's Mac**. Hamsini takes part
  through Discord from her own laptop.
- Docs moved to **https://docs.switchagents.ai**. Docs tool for Claude Code:
  `claude mcp add switch-docs --transport http https://docs.switchagents.ai/mcp`
- Discord is connected (bot "agent switch", Message Content + Server Members intents on).
  Posting any message in a channel creates its Switch room.
- Add an agent to a room by typing in the channel: `!invite-agent @agent-name`
  (pick the agent from Discord's autocomplete).
- Agents created: `backend-agent` and `frontend-agent` (Claude Code, Auto mode on, Bypass off).
  "Who can talk to your agent" = "Me and my agents" (default).
- ✅ **Agent-to-agent works (tested Nov 5).** backend-agent @mentioned frontend-agent with a
  question, and frontend-agent answered it in the room.
- To do: set each agent's **Directory** to its own folder
  (`~/handshake/demo/orders-backend`, `~/handshake/demo/orders-frontend`); link Hamsini's Discord
  account and let her talk to frontend-agent; test whether agents can read/write `contract/`
  from outside their directory.

## 8. Plan

- **Day 1 (Nov 4), done:** repo, Discord, Docker, Switch running, frontend seed app.
- **Day 2 (Nov 5):** backend seed app ✅ next; agent directories; `contract/openapi.yaml` v0;
  `switch/backend-agent.md` + `switch/room-rules.md`; first full run of Discovery → Proposal →
  Arbitration → Lock.
- **Day 3 (Nov 6):** Build step, both contract checks green; drift moment only if everything else works.
- **Day 4 (Nov 7):** no new features. README, demo video (several takes, in `#handshake-demo`),
  submit early. Check the exact submission time on the hackathon site.

**Cut order if behind:** drift moment → pagination conflict → frontend polish.
Never cut: the conflict list, the human decision, the locked contract.

## 9. Git workflow

```bash
git add <your folders>
git commit -m "prefix: what you did"
git pull --rebase        # after committing: pull refuses to run with uncommitted changes
git push
```
