import type { Card as CardType } from "../../types";
import { PipLayout } from "./PipLayout";

type Props = {
  card: CardType;
  onClick?: () => void;
  large?: boolean;
};

export function Card({ card, onClick, large }: Props) {
  const isFace =
    ["pirate", "bride", "governor", "parrot"].includes(card.rank);

  return (
    <div
      className={`card ${large ? "card-large" : ""}`}
      onClick={onClick}
    >
      <img
        src="/assets/card/base.png"
        className="card-base"
      />

      <div className="card-corner top-left">
        <img
          src={`/assets/suits/${card.suit}.png`}
          className={`corner-suit ${card.suit}`}
        />
      </div>

      <div className="card-corner bottom-right">
        <img
          src={`/assets/suits/${card.suit}.png`}
          className={`corner-suit ${card.suit}`}
        />
      </div>

      {isFace ? (
        <img
          src={`/assets/characters/${card.rank}.png`}
          className="card-face"
        />
      ) : (
        <PipLayout rank={card.rank} suit={card.suit} />
      )}
    </div>
  );
}