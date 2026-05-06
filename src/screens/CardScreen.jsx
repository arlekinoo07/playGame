import { useState } from "react";

export default function CardScreen({
  role,
  theme,
  playerNumber,
  onNext,
  isLast,
}) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-sm w-full">
        {!opened ? (
          <>
            <p className="mb-6 text-lg">
              Игрок {playerNumber}, передайте телефон
            </p>

            <button
              onClick={() => setOpened(true)}
              className="w-full bg-yellow-500 text-black py-4 rounded-xl text-lg font-bold"
            >
              Открыть карточку
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl mb-6 font-bold">
              {role === "spy" ? "Ты шпион 🕵️" : `Тема: ${theme}`}
            </h1>

            <button
              onClick={() => {
                setOpened(false);
                onNext();
              }}
              className="w-full bg-red-500 py-4 rounded-xl text-lg"
            >
              {isLast ? "Завершить" : "Закрыть"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}