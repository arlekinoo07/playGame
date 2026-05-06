"use client";

import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("menu");
  const [roles, setRoles] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [theme, setTheme] = useState(null);
  const [spyIndexes, setSpyIndexes] = useState([]);

  return (
    <GameContext.Provider
      value={{
        screen,
        setScreen,
        roles,
        setRoles,
        currentPlayer,
        setCurrentPlayer,
        theme,
        setTheme,
        spyIndexes,
        setSpyIndexes,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
