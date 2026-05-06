import { useEffect } from "react";
import "./App.css";

import { useGame } from "./context/GameContext";
import { generateRoles, getRandomTheme } from "./game/gameLogic";

import Menu from "./screens/Menu";
import SetupGame from "./screens/SetupGame";
import CardScreen from "./screens/CardScreen";
import TimerScreen from "./screens/TimerScreen";
import ResultScreen from "./screens/ResultScreen";

import { THEMES } from "./data/themes";

function App() {
  const {
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
  } = useGame();

  // (пока просто заглушка, позже для Telegram)
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();
    tg?.expand();
  }, []);

  function startGame(settings) {
    const selectedTheme = getRandomTheme(settings.category, THEMES);
    setTheme(selectedTheme);

    const rolesArr = generateRoles(settings.players, settings.spies);
    setRoles(rolesArr);

    const spies = rolesArr
      .map((role, index) => (role === "spy" ? index : null))
      .filter((i) => i !== null);

    setSpyIndexes(spies);

    setCurrentPlayer(0);
    setScreen("cards");
  }

  return (
    <>
      {screen === "menu" && <Menu onPlay={() => setScreen("setup")} />}

      {screen === "setup" && <SetupGame onStart={startGame} />}

      {screen === "cards" && roles.length > 0 && (
        <CardScreen
          role={roles[currentPlayer]}
          theme={theme}
          playerNumber={currentPlayer + 1}
          isLast={currentPlayer === roles.length - 1}
          onNext={() => {
            if (currentPlayer === roles.length - 1) setScreen("timer");
            else setCurrentPlayer(currentPlayer + 1);
          }}
        />
      )}

      {screen === "timer" && (
        <TimerScreen
          duration={300}
          onFinish={() => setScreen("end")}
        />
      )}

      {screen === "end" && (
        <ResultScreen
          theme={theme}
          spyIndexes={spyIndexes}
          onRestart={() => setScreen("menu")}
        />
      )}
    </>
  );
}

export default App;