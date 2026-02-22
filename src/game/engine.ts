import {dealHands} from "./deck";
import type {Suit, Card, Player, GamePhase} from "./types";
import {getRankValue, determineRoundWinner} from "./rules";

export interface GameState {
  phase: GamePhase;
  aiHand: Card[];
  playerHand: Card[];
  trumpSuit: Suit | null;
  aiBid: number;
  playerBid: number;
  declarer: Player | null;
  currentLeader: Player | null;
  currentRound: {
    leadCard: Card | null;
    responseCard: Card | null;
    leadPlayer: Player | null;
  };
  aiRounds: number;
  playerRounds: number;
}

export class GameEngine {
  state: GameState;

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): GameState {
    return {
      phase: "IDLE",
      aiHand: [],
      playerHand: [],
      trumpSuit: null,
      aiBid: 0,
      playerBid: 0,
      declarer: null,
      currentLeader: null,
      currentRound: {
        leadCard: null,
        responseCard: null,
        leadPlayer: null,
      },
      aiRounds: 0,
      playerRounds: 0,
    };
  }

  startGame(): void {
    const { aiHand, playerHand } = dealHands();

    this.state = {
      ...this.createInitialState(),
      aiHand,
      playerHand,
      phase: "BID",
      aiBid: 0,
      playerBid: 0,
      declarer: null,
    };

    this.aiMakeBid();
  }

  aiMakeBid(): void {
    if (this.state.phase !== "BID") return;
    this.state.declarer = "AI";
    this.state.aiBid = 3; // temp placeholder
  }

  private chooseAiTrump(): Suit {
    const suits: Record<string, number> = {};

    for (const card of this.state.aiHand) {
      suits[card.suit] = (suits[card.suit] || 0) + 1;
    }

    const maxSuit = Object.keys(suits).reduce((a, b) => suits[a] > suits[b] ? a : b)

    return maxSuit as Suit;
  }

  playerRaiseBid(raise: boolean): void {
    if (this.state.phase !== "BID") return;

    if (raise) {
      this.state.playerBid = this.state.aiBid + 1;
      this.state.declarer = "PLAYER";
      this.state.phase = "TRUMP_SELECT";
    } else {
      this.state.playerBid = this.state.aiBid;
      this.state.declarer = "AI";
      this.state.phase = "TRUMP_SELECT";

      const aiTrump = this.chooseAiTrump();
      this.setTrump(aiTrump);
    }
  }

  setTrump(suit: Suit): void {
    if (this.state.phase !== "TRUMP_SELECT") return;

    this.state.trumpSuit = suit;
    this.state.currentLeader = this.state.declarer;
    this.state.phase = "ROUND";
    if (this.state.currentLeader === "AI") {
      const aiCard = this.chooseAiCard();
      this.playCard("AI", aiCard);
    }
  }

  private chooseAiCard(): Card {
    const aiHand = this.state.aiHand;
    const leadCard = this.state.currentRound.leadCard;

    const getValue = (c: Card) => getRankValue(c.rank);

    // AI leading
    if (!leadCard) {
      return aiHand.reduce((a, b) =>
        getValue(b) > getValue(a) ? b : a
      );
    }

    const leadSuit = leadCard.suit;
    const followSuitCards = aiHand.filter(c => c.suit === leadSuit);

    if (followSuitCards.length > 0) {
      const winningCards = followSuitCards.filter(
        c => getValue(c) > getValue(leadCard)
      );

      if (winningCards.length > 0) {
        return winningCards.reduce((a, b) =>
          getValue(a) < getValue(b) ? a : b
        );
      }

      return followSuitCards.reduce((a, b) =>
        getValue(a) < getValue(b) ? a : b
      );
    }

    const trumpCards = aiHand.filter(c => c.suit === this.state.trumpSuit);

    if (trumpCards.length > 0) {
      return trumpCards.reduce((a, b) =>
        getValue(a) < getValue(b) ? a : b
      );
    }

    return aiHand.reduce((a, b) =>
      getValue(a) < getValue(b) ? a : b
    );
  }

  playCard(player: Player, card: Card, refresh?: () => void): void {
    if (this.state.phase !== "ROUND") return
    if (player !== this.state.currentLeader) return

    const hand = player === "AI" ? this.state.aiHand : this.state.playerHand
    const index = hand.findIndex(c => c.id === card.id)
    if (index === -1) return

    // enforce lead suit
    if (this.state.currentRound.leadCard) {
      const leadSuit = this.state.currentRound.leadCard.suit
      const hasLeadSuit = hand.some(c => c.suit === leadSuit)
      if (hasLeadSuit && card.suit !== leadSuit) return // illegal
    }

    // remove the played card from hand
    hand.splice(index, 1)

    if (!this.state.currentRound.leadCard) {
      this.state.currentRound.leadCard = card
      this.state.currentRound.leadPlayer = player

      // switch turn
      this.state.currentLeader = player === "AI" ? "PLAYER" : "AI"

      if (player === "PLAYER") {
        const aiCard = this.chooseAiCard()
        this.playCard("AI", aiCard)
      }
      return
    }
    else {
      // this player is responding
      this.state.currentRound.responseCard = card
      this.state.phase = "ROUND_RESULT";
      return
    }
  }

  continueRound(): void {
    if (this.state.phase !== "ROUND_RESULT") return;
    this.state.phase = "ROUND";
    this.resolveRound();
  }

  private resolveRound(): void {
    const { leadCard, responseCard, leadPlayer } = this.state.currentRound;
    if (!leadCard || !responseCard || !leadPlayer || !this.state.trumpSuit) return;

    const responsePlayer = leadPlayer === "AI" ? "PLAYER" : "AI";

    const winner = determineRoundWinner(
      leadPlayer,
      leadCard,
      responsePlayer,
      responseCard,
      this.state.trumpSuit
    );

    if (winner === "AI") {
      this.state.aiRounds++;
    } 
    else {
      this.state.playerRounds++;
    }

    this.state.currentLeader = winner;
    this.state.currentRound = {
      leadCard: null,
      responseCard: null,
      leadPlayer: null,
    };

    this.checkEndCondition();
  }

  private checkEndCondition(): void {
    const bid =
      this.state.declarer === "AI"
        ? this.state.aiBid
        : this.state.playerBid;

    const declarerRounds =
      this.state.declarer === "AI"
        ? this.state.aiRounds
        : this.state.playerRounds;

    const remainingRounds = this.state.aiHand.length;

    if (declarerRounds >= bid || declarerRounds + remainingRounds < bid) {
      this.state.phase = "END";
    }
    else if (this.state.phase === "ROUND" && this.state.currentLeader === "AI") {
      const aiCard = this.chooseAiCard();
      this.playCard("AI", aiCard);
    }
  }
}