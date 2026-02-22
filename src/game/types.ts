export type Suit = "cannon" | "rose" | "saber" | "anchor";

export type Rank =
  | 1 | 2 | 3 | 4
  | "pirate"
  | "bride"
  | "governor"
  | "parrot";

export interface Card {
  suit: Suit;
  rank: Rank;
  id: string;
}

export type Player = "AI" | "PLAYER";

export type GamePhase =
  | "IDLE"
  | "BID"
  | "TRUMP_SELECT"
  | "ROUND"
  | "ROUND_RESULT"
  | "END";