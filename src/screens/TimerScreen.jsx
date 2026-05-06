"use client";

import { useEffect, useState } from "react";

export default function TimerScreen({ duration, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onFinish]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-6">
      <div className="text-center w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6">Идёт игра</h1>

        <div className="text-5xl font-mono mb-8">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>

        <button
          onClick={onFinish}
          className="w-full bg-red-500 py-4 rounded-xl text-lg"
        >
          Завершить игру
        </button>
      </div>
    </div>
  );
}
