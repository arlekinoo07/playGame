import App from "../src/App";
import { GameProvider } from "../src/context/GameContext";

export default function Page() {
  return (
    <GameProvider>
      <App />
    </GameProvider>
  );
}
