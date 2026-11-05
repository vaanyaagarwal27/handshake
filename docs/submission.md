# Handshake — submission draft

## Deadline

**Friday, November 7, 2026, 11:59 PM IST** (official page: "Submissions close at 11:59 PM IST on November 7").
Our target: submit by **6:00 PM IST on Nov 7**, so we have buffer for upload problems.

Event page: https://www.wemakedevs.org/hackathons/switch
## Judging (weights)

- **Use of Switch, 30%:** Is Switch central, and would the project stop working without it?
- **Technical execution, 25%:** Does it run, and could someone clone the repo and reproduce it?
- **Creativity and impact, 25%:** Is it a fresh idea that solves a problem a real team has?
- **Presentation, 20%:** Do the demo video and README make clear how Switch is used?
## Form fields

⚠️ TODO: the public event page doesn't list the form fields. Log in on wemakedevs.org, open
"Submit your project", and replace this list with the real fields.

### Project name
Handshake

### Team name
Larpers

### Team members
- Vaanya Agarwal (leader): TODO GitHub username, email
- Hamsini V: TODO GitHub username, email

### Track
Track 01: Best Business Workflow

### Tagline (one line)
Frontend and backend coding agents agree on the API contract in one Switch room, with a human making the final call, before either side builds.

### Short description (~50 words)
Frontend and backend teams lose days to API mismatches. Handshake puts each side's coding agent in one Switch room on Discord. Each agent reads only its own code and proposes its half of the API. They post a conflict list, a human decides, and the contract is locked as OpenAPI. Then both agents build against it, and a contract check catches any later drift.

### Long description
**Problem.** "That's not the shape we agreed on" is one of the most common, and most expensive, sentences between frontend and backend teams. Mismatches in field names, formats and pagination surface late, at integration time. AI coding agents speed up each side, but neither agent knows what the other side does.

**What Handshake does.** Each side's Claude Code agent joins one Switch room, connected to Discord. frontend-agent can only see the frontend folder, and backend-agent only the backend folder, just like two real teams. When a person asks for a feature, frontend-agent proposes what the screen needs, backend-agent answers with what the API actually returns, and backend-agent posts a conflict list. The agents never settle conflicts. A human decides in one message. backend-agent then writes the locked contract (`contract/openapi.yaml`), and both agents build against it. Contract checks (pytest for the backend, generated TypeScript types and typecheck for the frontend) go green. If someone later renames a field, the check catches the drift, a human approves the contract change, and frontend-agent updates its side.

**Demo.** A food order tracking app, seeded with three real mismatches: ETA format (timestamp vs minutes remaining), pagination, and response shape. All three are found and resolved in the room.

### How Switch is used
- Two Claude Code agents, each owned by a different team member, run through Switch with their own working directory (one per side of the app).
- Both agents and both people share one Switch room on Discord. The room's Instructions hold the shared rules (`switch/room-rules.md`): phase tags, fixed turn order, @mention handoffs, and "only a human settles a conflict".
- Agents hand off to each other with @mentions in the room, and humans make every decision in the same conversation.
- Without Switch, there's no shared room where the two isolated agents and the humans can negotiate, so Handshake wouldn't work.

### Tech stack
Switch (local server + Switch Console), Discord, Claude Code, Python + FastAPI, pytest, React + Vite + TypeScript, OpenAPI 3, openapi-typescript.

### Links
- GitHub repo: https://github.com/vaanyaagarwal27/handshake
- Demo video: TODO
- Blog post (optional, Best Blog side track): TODO / skip
- #HowISwitch social post (optional): TODO / skip

## Before submitting, check

- [ ] Repo is public
- [ ] README explains how Switch is used and how to reproduce the project
- [ ] Demo video ≤ 3 min, uploaded, link works when logged out
- [ ] All TODOs in README.md are resolved
- [ ] Both team members are listed on the submission