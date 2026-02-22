type BottomUIProps = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

export function BottomUI({ left, center, right }: BottomUIProps) {
  return (
    <div className="bottom-ui">
      <div className="bottom-content">
        <div className="panel-left">{left}</div>
        <div className="panel-center">{center}</div>
        <div className="panel-right">{right}</div>
      </div>
    </div>
  );
}