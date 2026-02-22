import { useState, useEffect } from "react";

export function RulesPanel() {
  const [open, setOpen] = useState(false);
  const [rules, setRules] = useState<string[]>([]);

  useEffect(() => {
    fetch("/assets/rules.json")
      .then((res) => res.json())
      .then((data) => setRules(data))
      .catch((err) => console.error("Failed to load rules:", err));
  }, []);

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
      <button
        className="rules-close-global"
        onClick={() => setOpen(false)}
      >
        ✕
      </button>

      <div className="rules-scroll">
        <h4>Game Rules</h4>

        {rules.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </>
  );
}