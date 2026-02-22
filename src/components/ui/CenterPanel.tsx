type Props = {
  phase: string;
  aiBid: number;
  playerBid: number;
  startGame: () => void;
  playerRaiseBid: (raise: boolean) => void;
  continueRound: () => void;
  setTrump: (suit: string) => void;
  declarer: string | null;
  currentLeader: string | null;
};

export function CenterPanel({
  phase,
  aiBid,
  startGame,
  playerRaiseBid,
  continueRound,
  setTrump,
  declarer,
  currentLeader,
}: Props) {

  if (phase === "IDLE") {
    return (
      <div className="menu-block">
        <h2>Care for a Game?</h2>
        <button className="wood-btn" onClick={startGame}>
          Begin
        </button>
      </div>
    );
  }

  if (phase === "BID") {
    return (
      <div className="menu-text">
        <h3>The AI bids {aiBid} points.</h3>
        <p>Do you raise?</p>
      </div>
    );
  }

  if (phase === "TRUMP_SELECT" && declarer === "PLAYER") {
    return (
      <div className="menu-block">
        <h3>Select a card to declare trump</h3>
      </div>
    );
  }

  if (phase === "ROUND") {
    return (
      <div className="menu-block">
        {currentLeader === "PLAYER"
          ? "Your move."
          : "Opponent is thinking..."}
      </div>
    );
  }

  return null;
}