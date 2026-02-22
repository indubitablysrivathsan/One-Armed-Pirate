import { useState } from "react";
import rules from "../../../public/assets/rules.json";



export function RulesPanel() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        className="wood-btn"
        onClick={() => setOpen(true)}
      >
        View Rules
      </button>
    );
  }

  return (
    <>
      {/* Floating close button */}
      <button className="rules-close-global"
        onClick={() => setOpen(false)}
      >
        ✕
      </button>


      {/* Scrollable rules inside panel */}
      <div className="rules-scroll">
        <h4>Game Rules</h4>
        {rules.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </>
  );
}