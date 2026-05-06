"use client";

import { useState } from "react";

import StartScreen from "./screens/StartScreen";
import SpyScreen from "./screens/SpyScreen";

export default function App() {
  const [screen, setScreen] = useState("start");

  return (
    <>
      {screen === "start" && <StartScreen onOpenSpy={() => setScreen("spy")} />}
      {screen === "spy" && <SpyScreen onBack={() => setScreen("start")} />}
    </>
  );
}
