export function BottomMenu({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bottom-menu">
      <div className="menu-inner">
        {children}
      </div>
    </div>
  );
}