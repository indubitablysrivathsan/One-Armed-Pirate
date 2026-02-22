import type { Card as CardType } from "../../game/types";
import { PipLayout } from "./PipLayout";

type Props = {
  card: CardType;
  onClick?: () => void;
  large?: boolean;
};

export function Card({ card, onClick, large }: Props) {
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

      {typeof card.rank === "number" ? (
        <PipLayout rank={card.rank} />
      ) : (
        <img
          src={`/assets/characters/${card.rank}.png`}
          className="card-face"
        />
      )}
    </div>
  );
}