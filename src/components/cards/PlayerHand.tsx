import type { Card as CardType } from "../../game/types";
import { Card } from "./Card";

type Props = {
  cards: CardType[];
  onPlay: (card: CardType) => void;
};

export function PlayerHand({ cards, onPlay }: Props) {
  return (
    <div className="player-hand">
      {cards.map((card, index) => (
        <div
          key={card.id}
          style={{
            transform: `rotate(${(index - cards.length / 2) * 4}deg)`
          }}
        >
          <Card
            card={card}
            onClick={onPlay ? () => onPlay(card) : undefined}
          />
        </div>
      ))}
    </div>
  );
}