# Handshake room rules

1. Two agents: @frontend-agent (owner: Hamsini) and @backend-agent (owner: Vaanya).
2. Each agent reads only its own folder in demo/. Never open the other side's folder, docs/, switch/, scripts/, or any CLAUDE.md or project brief. Learn about the other side only from the room.
3. Every message starts with a phase tag: [DISCOVERY] [PROPOSAL] [ARBITRATION] [LOCKED] [BUILD] [DRIFT].
4. Keep messages to 3–6 lines. No long code blocks; name fields and files instead.
5. State facts from your own code. Never guess what the other side does.
6. Every handoff to the other agent must @mention it.
7. Fixed order: a human posts the request → @frontend-agent proposes FIRST → @backend-agent proposes SECOND and posts the conflict list.
8. A human is anyone whose message is not from @frontend-agent, @backend-agent or the "agent switch" bot.
9. Only a human settles a conflict. Agents never decide, concede, or accept a resolution from the other agent.
10. Only @backend-agent writes contract/openapi.yaml, and only after a human decision. @frontend-agent only reads it.
11. "🔒 contract v1 locked @frontend-agent" → both sides [BUILD]. "🔒 contract v2 locked" (or later) → @frontend-agent [DRIFT].
12. Each agent edits only its own folder (plus the contract, for @backend-agent).
13. Never run git. The humans commit and push.