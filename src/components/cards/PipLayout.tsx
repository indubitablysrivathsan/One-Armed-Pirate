type Props = {
  rank: number;
  suit: string;
};

export function PipLayout({ rank, suit }: Props) {
  const pips = Array.from({ length: rank });

  return (
    <div className="pip-container">
      {pips.map((_, i) => (
        <img
          key={i}
          src={`/assets/card/pip.png`}
          className="pip"
        />
      ))}
    </div>
  );
}