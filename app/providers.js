"use client";

import { GameProvider } from "../src/context/GameContext";

export default function Providers({ children }) {
  return <GameProvider>{children}</GameProvider>;
}
