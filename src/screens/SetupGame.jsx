"use client";

import { useState } from "react";
import { THEMES } from '../data/themes.js';

export default function SetupGame({ onStart }) {
  const categories = Object.keys(THEMES);

  const [category, setCategory] = useState(categories[0]);
  const [players, setPlayers] = useState(6);
  const [spies, setSpies] = useState(1);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Настройка игры</h2>

      {/* Категория */}
      <div>
        <p className="mb-2">Категория</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-neutral-800 p-3 rounded"
        >
          {categories.map((key) => (
            <option key={key} value={key}>
              {THEMES[key].name}
            </option>
          ))}
        </select>
      </div>

      {/* Игроки */}
      <div>
        <p className="mb-2">Количество игроков</p>
        <input
          type="number"
          min={3}
          max={12}
          value={players}
          onChange={(e) => setPlayers(+e.target.value)}
          className="w-full bg-neutral-800 p-3 rounded"
        />
      </div>

      {/* Шпионы */}
      <div>
        <p className="mb-2">Количество шпионов</p>
        <input
          type="number"
          min={1}
          max={players - 1}
          value={spies}
          onChange={(e) => setSpies(+e.target.value)}
          className="w-full bg-neutral-800 p-3 rounded"
        />
      </div>

      <button
        onClick={() =>
          onStart({
            players,
            spies,
            category,
          })
        }
        className="mt-auto bg-green-500 py-4 rounded-xl text-lg"
      >
        Начать игру
      </button>
    </div>
  );
}
