import type { Card as CardType } from "../../game/types";
import { Card } from "../cards/Card";

type Props = {
  leadCard: CardType | null;
  responseCard: CardType | null;
};

export function TablePlayArea({ leadCard, responseCard }: Props) {
  return (
    <div className="table-play-area">
      {leadCard && (
        <div className="table-card lead">
          <Card card={leadCard} large />
        </div>
      )}

      {responseCard && (
        <div className="table-card response">
          <Card card={responseCard} large />
        </div>
      )}
    </div>
  );
}