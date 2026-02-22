import {useState} from "react";
import {GameEngine} from "../game/engine";
import type {Suit, Card, Player} from "../game/types";

export function useGameEngine() {
  const [engine] = useState(() => new GameEngine());
  const [, setVersion] = useState(0);

  const refresh = () => setVersion(v => v + 1);

  return {
    state: engine.state,

    startGame: () => {
      engine.startGame();
      refresh();
    },

    playerRaiseBid: (raise: boolean) => {
      engine.playerRaiseBid(raise);
      refresh();
    },

    setTrump: (suit: Suit) => {
      engine.setTrump(suit);
      refresh();
    },

    playCard: (player: Player, card: Card) => {
      engine.playCard(player, card);
      refresh();
    },

    continueRound: () => {
      engine.continueRound();
      refresh();
    },

    restartGame: () => {
      engine.restartGame();
      refresh();
    }
  };
}