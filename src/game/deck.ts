import type {Rank, Suit, Card} from "./types";

const SUITS: Suit[] = ["cannon", "rose", "saber", "anchor"];

const RANKS: Rank[] = [
  1, 2, 3, 4,
  "pirate",
  "bride",
  "governor",
  "parrot",
];

function generateDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, id: `${suit}-${rank}` });
    }
  }

  return deck;
}

function shuffle(deck: Card[]): void {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

export interface DealtHands {
  aiHand: Card[];
  playerHand: Card[];
}

export function dealHands(): DealtHands {
  const deck = generateDeck();
  shuffle(deck);

  return {
    aiHand: deck.slice(0, 5),
    playerHand: deck.slice(5, 10),
  };
}