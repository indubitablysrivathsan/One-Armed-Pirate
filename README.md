# 🏴‍☠️ One-Armed Pirate – React Strategy Card Game

A browser-based trick-taking card game inspired by the *Port Royale 2* tavern minigame, fully recreated using a deterministic game engine and a React-driven UI.

This project focuses on **state machine architecture, AI decision logic, and clean separation between engine and presentation layers**, rather than being a simple UI demo.

---

## Game Overview

* 4 suits: **Cannon, Rose, Saber, Anchor**
* 8 ranks per suit: `1, 2, 3, 4, Pirate, Bride, Governor, Parrot`
* 5-card hands
* AI bids first (1–5)
* Player may **raise by exactly one** or accept
* Declarer selects trump
* Must follow suit if possible
* Trump beats all non-trump cards
* Early termination:

  * Declarer reaches bid
  * Declarer cannot mathematically reach bid

This is a deterministic trick-taking system with enforced rule integrity.

---

# Architecture

## Engine–UI Separation (Core Design Principle)

The project is architected around a strict separation:

### Game Engine (Pure Logic Layer)

* Stateful class (`GameEngine`)
* No React dependencies
* Handles:

  * State transitions
  * AI decisions
  * Rule enforcement
  * Round resolution
  * Early termination logic

### React Layer (Presentation Adapter)

* Custom hook: `useGameEngine`
* React components render from engine state
* No game logic inside UI
* UI only:

  * Triggers engine methods
  * Forces re-render

This allows:

* Deterministic testing
* UI replacement without rewriting logic
* Clean maintainability
* Extensibility for future multiplayer or server sync

---

# State Machine Design

The game runs on an explicit phase-based state machine:

```ts
type GamePhase =
  | "IDLE"
  | "BID"
  | "TRUMP_SELECT"
  | "ROUND"
  | "ROUND_RESULT"
  | "END";
```

Each engine method validates phase before execution.

Example:

```ts
if (this.state.phase !== "ROUND") return;
```

This prevents illegal transitions and ensures deterministic flow.

---

# AI System

The AI is heuristic-based and deterministic.

## Bidding Logic (Pluggable)

Currently supports:

* Configurable bid strategy
* Declarer advantage awareness
* Expandable for probabilistic modeling

---

## Trick Decision Strategy

AI implements:

### When Leading

* Plays highest-value card

### When Responding

1. Follow suit if possible
2. If can win → play **lowest winning card**
3. If cannot win → play **lowest losing card**
4. If no suit → use lowest trump
5. Else → discard lowest card

This creates:

* Non-random behavior
* Predictable competitiveness
* Realistic card conservation

---

# Rule Enforcement

Engine enforces:

### Follow Suit Rule

```ts
if (hasLeadSuit && card.suit !== leadSuit) return;
```

### Turn Enforcement

```ts
if (player !== this.state.currentLeader) return;
```

### Early Termination

Game ends when:

```ts
if (declarerRounds >= bid ||
    declarerRounds + remainingRounds < bid)
```

This prevents unnecessary round computation.

---

# Self-Driving Round Flow

AI automatically:

* Starts first trick if declarer
* Responds to player lead
* Leads next trick after winning
* Stops at END phase

No UI-based triggers are required.

The engine can theoretically run headless.

---

# UI System

## Built With:

* React
* TypeScript
* Custom hooks
* Component composition
* CSS layout (flex-based zone partitioning)

---

## Layout Architecture

```
GameLayout
 ├── Background
 ├── TablePlayArea
 └── BottomUI
      ├── Left Panel (Score / Trump)
      ├── Center Panel (Game Phase UI)
      └── Right Panel (Rules)
```

Each section is independently styled and replaceable.

---

# Scrollable Transparent Rules Panel

* Fully transparent background
* Scrollbar linked to parent height
* View Rules toggle
* Fixed-position close button at viewport edge
* Zero layout interference

---

# Tech Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Language      | TypeScript                  |
| UI            | React                       |
| State Adapter | Custom Hook                 |
| Game Logic    | Class-based engine          |
| Styling       | CSS Flexbox                 |
| Architecture  | Deterministic state machine |

---

# Key Technical Highlights

* Deterministic engine design
* Pure logic layer independent of UI
* Phase-driven state transitions
* Strict rule enforcement
* Recursive but controlled AI auto-play
* No external state libraries (intentional minimalism)
* Expandable AI heuristics
* Modular UI composition

---

# Future Extensions

Potential upgrades:

* Monte Carlo simulation AI
* Probability-based bidding model
* Multiplayer (WebSocket backend)
* Replay system
* Animation layer
* Mobile responsiveness
* Persistence (localStorage / IndexedDB)

---

# Running the Project

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:5173
```

---

Built as a fully custom React + TypeScript game engine recreation project focused on architecture, AI behavior, and rule integrity.

---