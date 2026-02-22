import { Background } from "./Background";
import { BottomMenu } from "./BottomMenu";

export function GameLayout({
  children,
  bottomContent
}: {
  children?: React.ReactNode;
  bottomContent?: React.ReactNode;
}) {
  return (
    <div className="game-root">
      <Background />

      {children}

      <BottomMenu>
        {bottomContent}
      </BottomMenu>
    </div>
    
  );
}
