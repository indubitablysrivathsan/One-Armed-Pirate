type Props = {
  rank: number;
};

export function PipLayout({ rank }: Props) {
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