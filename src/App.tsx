import { GameLayout } from "./components/layout/GameLayout";
import { BottomUI } from "./components/ui/BottomUI";
import { CenterPanel } from "./components/ui/CenterPanel";
import { PlayerHand } from "./components/cards/PlayerHand";
import { TablePlayArea } from "./components/table/TablePlayArea";
import { RulesPanel } from "./components/ui/RulesPanel";

import { useGameEngine } from "./hooks/useGameEngine";

function App() {
  const {
    state,
    startGame,
    playerRaiseBid,
    setTrump,
    playCard,
    continueRound
  } = useGameEngine();

  console.log("HAND:", state.playerHand);

  return (
    <GameLayout
      bottomContent={
        <>
        <button onClick={startGame}>Start Game</button>
        <BottomUI


          left={
            <div className="left-panel">
              <div className="left-score">
                <h4>Score</h4>

                <div>AI Rounds: {state.aiRounds}</div>
                <div>Your Rounds: {state.playerRounds}</div>
              </div>

              <hr />
              
              <div className="left-bid">
                <div>Bid:</div>
                <div>
                  {state.declarer === "AI" ? "AI" : "You"} —
                  {state.declarer === "AI" ? state.aiBid : state.playerBid}
                </div>
              </div>

              <div className="left-trump">
                {state.trumpSuit && (
                  <>
                    <hr />
                    <div>Trump:</div>
                    <img
                      src={`/assets/suits/${state.trumpSuit}.png`}
                      className="score-trump"
                    />
                  </>
                )}
              </div>
            </div>
          }


          center={
            <div className="center-content">
              {/* Main panel */}
              <div className="center-text">
                <CenterPanel
                  phase={state.phase}
                  aiBid={state.aiBid}
                  playerBid={state.playerBid}
                  startGame={startGame}
                  playerRaiseBid={playerRaiseBid}
                  setTrump={setTrump}
                  declarer={state.declarer}
                  currentLeader={state.currentLeader}
                  continueRound={continueRound}
                />
              </div>

              {/* Player hand, only when not IDLE or END */}
              {state.phase !== "IDLE" && state.phase !== "END" && (
                <div className="center-cards">
                  <PlayerHand
                    cards={state.playerHand}
                    onPlay={(card) => {
                      if (state.phase === "TRUMP_SELECT") {
                        setTrump(card.suit);
                      } else if (
                        state.phase === "ROUND" &&
                        state.currentLeader === "PLAYER"
                      ) {
                        playCard("PLAYER", card);
                      }
                    }}
                  />
                </div>
              )}

              {/* Buttons for BID phase */}
              <div className="center-buttons">
                {state.phase === "BID" && (
                  <div className="menu-buttons">
                    <button className="wood-btn" onClick={() => playerRaiseBid(true)}>
                      Raise
                    </button>
                    <button className="wood-btn" onClick={() => playerRaiseBid(false)}>
                      Accept
                    </button>
                  </div>
                )}

                {/* Button for ROUND_RESULT phase */}
                {state.phase === "ROUND_RESULT" && (
                  <div className="menu-buttons">
                    <button className="wood-btn" onClick={continueRound}>
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </div>
          }


          right={<RulesPanel />}
        />
        </>
      }>
      <TablePlayArea
        leadCard={state.currentRound.leadCard}
        responseCard={state.currentRound.responseCard}
      />
    </GameLayout>
  );
}

export default App;