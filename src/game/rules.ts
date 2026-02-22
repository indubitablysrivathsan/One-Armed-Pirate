import type {Rank, Suit, Card, Player} from "./types";

export function getRankValue(rank: Rank): number {
  switch (rank) {
    case 1: return 1;
    case 2: return 2;
    case 3: return 3;
    case 4: return 4;
    case "pirate": return 5;
    case "bride": return 6;
    case "governor": return 7;
    case "parrot": return 8;
    default:
      throw new Error("Invalid rank");
  }
}

export function determineRoundWinner(
  leadPlayer: Player,
  leadCard: Card,
  responsePlayer: Player,
  responseCard: Card,
  trumpSuit: Suit
): Player {

  if (leadCard.suit === responseCard.suit) {
    return getRankValue(leadCard.rank) >= getRankValue(responseCard.rank)
      ? leadPlayer
      : responsePlayer;
  }

  if (responseCard.suit === trumpSuit) {
    return responsePlayer;
  }

  return leadPlayer;
}