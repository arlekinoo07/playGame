"use client";

import { useMemo, useState } from "react";
import { ArrowBigRight, ChevronDown, Undo2 } from "lucide-react";

import spy1 from "../assets/photo/PageSpy/spy1.png";
import spy2 from "../assets/photo/PageSpy/spy2.png";
import back from "../assets/photo/PageSpy/back.png";
import button from "../assets/photo/PageSpy/button.png";
import cardVector from "../assets/photo/card-vector.png";

const CATEGORIES = {
  countries: {
    name: "Страны",
    topics: ["Россия", "США", "Канада"],
  },
};

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

const CARD_PATTERN = Array.from({ length: 126 }, (_, index) => {
  const columns = 9;
  const column = index % columns;
  const row = Math.floor(index / columns);

  return {
    id: index,
    left: -14 + column * 17,
    top: -12 + row * 11,
  };
});

export default function SpyScreen({ onBack }) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("countries");
  const [playersCount, setPlayersCount] = useState(4);
  const [spiesCount, setSpiesCount] = useState(1);
  const [cards, setCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [cardOpened, setCardOpened] = useState(false);
  const [cardClosing, setCardClosing] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  const showSettingsPreview = step >= 1;
  const showNamesPreview = step >= 2;
  const showGameCards = step === 3;
  const showGameStarted = step === 4;
  const showResults = step === 5;
  const showModeCard = step < 2;

  const playerOptions = useMemo(
    () => Array.from({ length: 12 }, (_, index) => index + 4),
    []
  );
  const spyOptions = useMemo(() => {
    if (playersCount <= 6) {
      return [1];
    }

    if (playersCount <= 10) {
      return [1, 2];
    }

    return [1, 2, 3];
  }, [playersCount]);

  function startGame() {
    const topics = CATEGORIES[category].topics;
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const roles = [
      ...Array.from({ length: spiesCount }, () => "spy"),
      ...Array.from({ length: playersCount - spiesCount }, () => "civil"),
    ];
    const shuffledRoles = shuffle(roles).map((role) => ({
      role,
      text: role === "spy" ? "Ты шпион" : topic,
    }));

    setSelectedTopic(topic);
    setCards(shuffledRoles);
    setCurrentPlayer(0);
    setCardOpened(false);
    setCardClosing(false);
    setStep(3);
  }

  function closeCurrentCard() {
    setCardClosing(true);
    setCardOpened(false);
  }

  function finishClosingCard(event) {
    if (event.target !== event.currentTarget || !cardClosing || cardOpened) {
      return;
    }

    setCardClosing(false);

    if (currentPlayer === cards.length - 1) {
      setStep(4);
      return;
    }

    setCurrentPlayer((value) => value + 1);
  }

  function finishGame() {
    setStep(5);
  }

  function resetGame() {
    setCards([]);
    setCurrentPlayer(0);
    setCardOpened(false);
    setCardClosing(false);
    setSelectedTopic("");
    setStep(1);
  }

  function returnToMenu() {
    setCards([]);
    setCurrentPlayer(0);
    setCardOpened(false);
    setCardClosing(false);
    setSelectedTopic("");
    onBack();
  }

  return (
    <div
      className="relative flex h-dvh min-h-[560px] w-screen items-center justify-center gap-6 overflow-hidden bg-black"
      style={{ backgroundImage: `url(${back.src})`, backgroundSize: "cover" }}
    >
      <img src={spy1.src} className="absolute bottom-0 left-0 z-10 max-h-[42vh] max-w-[55vw] object-contain md:max-h-none md:max-w-none" alt="spy" />
      <img src={spy2.src} className="absolute right-0 bottom-0 z-10 max-h-[42vh] max-w-[55vw] object-contain md:max-h-none md:max-w-none" alt="spy" />
      <div className="absolute inset-0 bg-black/60" />

      {!showGameCards && !showGameStarted && !showResults && (
        <div className="relative z-20 flex h-full w-full items-center justify-center gap-10 px-4 py-5 md:h-[600px] md:w-[1080px] md:max-w-[calc(100vw-48px)] md:overflow-visible md:px-6 md:py-0">
          {showModeCard && (
            <div
              className={`h-auto min-h-[500px] w-full max-w-[471px] shrink-0 flex-col items-center justify-center gap-20 rounded-[10px] bg-[#222222] px-5 py-8 text-white transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:flex md:h-[558px] md:gap-[144px] md:px-0 md:py-0 ${
                showSettingsPreview
                  ? "mobile-previous-panel md:-translate-x-8 md:scale-[0.985] md:opacity-95"
                  : "flex translate-x-0 scale-100 opacity-100"
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-[30px]">
                <p className="text-2xl font-bold">Шпион</p>
                <div className="flex w-full flex-col gap-[10px]">
                  <div className="group relative h-[50px] w-full max-w-[362px]">
                    <div className="absolute inset-0 cursor-pointer rounded-[10px] border-2 border-[#9A0D1B] bg-[#1E1E1E]" />
                    <div
                      className={`absolute inset-0 cursor-pointer rounded-[10px] bg-cover bg-center transition-opacity duration-300 ${
                        showSettingsPreview ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ backgroundImage: `url(${button.src})` }}
                    />
                    <button
                      onClick={() => setStep(1)}
                      className="relative h-full w-full cursor-pointer text-lg font-bold text-white"
                    >
                      Однопользовательская
                    </button>
                  </div>
                  <button className="h-[50px] w-full max-w-[362px] cursor-no-drop rounded-[10px] border border-black bg-[#1E1E1E] px-2 text-base sm:text-lg">
                    Многопользовательская(скоро)
                  </button>
                  <button className="h-[50px] w-full max-w-[362px] cursor-no-drop rounded-[10px] border border-black bg-[#1E1E1E] text-lg">
                    Настройки(скоро)
                  </button>
                </div>
              </div>

              <button
                onClick={onBack}
                className="flex h-[50px] w-full max-w-[362px] cursor-pointer items-center justify-center gap-1 rounded-[10px] border border-white text-lg transition duration-300 hover:border-black hover:bg-white hover:text-black"
              >
                Назад <Undo2 />
              </button>
            </div>
          )}

          {(step === 1 || step === 2) && (
            <div
              className={`h-auto min-h-[500px] w-full max-w-[471px] shrink-0 flex-col items-center justify-center gap-[35px] rounded-[10px] bg-[#222222] px-5 py-8 text-white transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:flex md:h-[558px] md:px-0 md:py-0 ${
                showSettingsPreview
                  ? showNamesPreview
                    ? "mobile-previous-panel md:-translate-x-6 md:scale-[0.99] md:opacity-100"
                    : "flex translate-x-0 scale-100 opacity-100"
                  : "translate-x-40 scale-[0.94] opacity-0"
              }`}
            >
              <div className="flex w-full flex-col items-center justify-center gap-8 md:gap-10">
                <p className="text-2xl font-bold">Настройки игры</p>
                <div className="flex w-full max-w-[328px] flex-col gap-3">
                  <SettingsSelect
                    label="Категория"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    {Object.entries(CATEGORIES).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.name}
                      </option>
                    ))}
                  </SettingsSelect>
                  <SettingsSelect
                    label="Кол-во игроков"
                    value={playersCount}
                    onChange={(event) => {
                      const nextPlayers = Number(event.target.value);
                      setPlayersCount(nextPlayers);
                      setSpiesCount((current) => {
                        const allowedSpies =
                          nextPlayers <= 6 ? [1] : nextPlayers <= 10 ? [1, 2] : [1, 2, 3];

                        return allowedSpies.includes(current)
                          ? current
                          : allowedSpies[allowedSpies.length - 1];
                      });
                    }}
                  >
                    {playerOptions.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </SettingsSelect>
                  <SettingsSelect
                    label="Кол-во шпионов"
                    value={spiesCount}
                    onChange={(event) => setSpiesCount(Number(event.target.value))}
                  >
                    {spyOptions.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </SettingsSelect>
                </div>
              </div>

              <div className="flex w-full max-w-[328px] items-center justify-center gap-[10px]">
                <button
                  onClick={() => setStep(0)}
                  className="flex h-[42px] min-w-0 flex-1 cursor-pointer items-center justify-center gap-1 rounded-[10px] border border-white bg-[#1E1E1E] text-base transition duration-300 hover:border-black hover:bg-white hover:text-black"
                >
                  Назад <Undo2 />
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex h-[42px] min-w-0 flex-1 cursor-pointer items-center justify-center gap-1 rounded-[10px] border border-white bg-[#1E1E1E] text-base transition duration-300 hover:border-black hover:bg-white hover:text-black"
                >
                  Далее <ArrowBigRight />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div
              className={`flex h-auto min-h-[500px] w-full max-w-[471px] shrink-0 flex-col items-center justify-center gap-5 rounded-xl bg-[#222222] px-5 py-8 text-white transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:h-[558px] md:px-0 md:py-0 ${
                showNamesPreview
                  ? "translate-x-0 scale-100 opacity-100"
                  : "translate-x-52 scale-[0.9] opacity-0"
              }`}
            >
              <p className="text-2xl font-bold">Старт игры</p>

              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <p className="w-[256px] text-base text-white/80">
                  Категория: <span className="font-bold text-white">{CATEGORIES[category].name}</span>
                </p>
                <p className="w-[256px] text-base text-white/80">
                  Игроков: <span className="font-bold text-white">{playersCount}</span>
                </p>
                <p className="w-[256px] text-base text-white/80">
                  Шпионов: <span className="font-bold text-white">{spiesCount}</span>
                </p>
              </div>

              <button
                onClick={startGame}
                className="h-[46px] w-[256px] cursor-pointer rounded-[10px] border border-white bg-[#1E1E1E] text-lg transition duration-300 hover:border-black hover:bg-white hover:text-black"
              >
                Начать игру
              </button>
            </div>
          )}
        </div>
      )}

      {showGameCards && cards.length > 0 && (
        <div className="relative z-20 flex h-dvh w-full flex-col items-center justify-center px-4 py-5 text-white sm:px-6">
          <p className="mb-3 text-center text-2xl font-bold">Игрок {currentPlayer + 1}</p>
          <p className="mb-5 max-w-[330px] text-center text-base text-white/75 sm:mb-8 sm:text-lg">
            {cardOpened ? "Нажми ещё раз, чтобы передать ход дальше" : "Передайте устройство следующему игроку"}
          </p>

          <div className="flex items-center justify-center [perspective:1200px]">
            <button
              onClick={() => {
                if (cardClosing) {
                  return;
                }

                if (cardOpened) {
                  closeCurrentCard();
                  return;
                }

                setCardOpened(true);
              }}
              className="relative h-[min(440px,58dvh)] w-[min(290px,76vw)] cursor-pointer border-0 bg-transparent p-0 text-center shadow-2xl outline-none"
              aria-label={cardOpened ? "Закрыть карточку и передать ход" : "Открыть карточку"}
            >
              <div
                onTransitionEnd={finishClosingCard}
                className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] [transform-style:preserve-3d] ${
                  cardOpened ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[16px] border-2 border-[#3A3A3A] bg-[#1E1E1E] px-8 text-3xl font-bold text-white [backface-visibility:hidden] hover:border-[#4A4A4A]">
                  {CARD_PATTERN.map((item) => (
                    <img
                      key={item.id}
                      src={cardVector.src}
                      alt=""
                      className="absolute opacity-90"
                      style={{
                        left: `${item.left}%`,
                        top: `${item.top}%`,
                        width: "30px",
                        height: "30px",
                        transform: "rotate(-45deg)",
                      }}
                    />
                  ))}
                  <span className="relative z-10 flex min-h-[148px] w-[190px] items-center justify-center rounded-[18px] border border-white/10 bg-black/25 px-6 text-[34px] leading-[0.95] backdrop-blur-md">
                    Открыть карточку
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center rounded-[16px] border-2 border-[#9A0D1B] bg-white px-8 text-3xl font-bold text-black [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  {cards[currentPlayer].text}
                </div>
              </div>
            </button>
          </div>

          <p className="absolute bottom-3 text-center text-xs text-white/60 sm:bottom-8 sm:text-sm">
            Тестовая категория: {CATEGORIES[category].name}
            {selectedTopic ? ` • Тема выбрана` : ""}
          </p>
        </div>
      )}

      {showGameStarted && (
        <div className="relative z-20 flex h-dvh w-full items-center justify-center px-4 py-5 text-white sm:px-6">
          <div className="flex min-h-[330px] w-[471px] max-w-full flex-col items-center justify-center gap-12 rounded-[16px] border border-white/10 bg-[#222222] px-5 py-8 text-center shadow-2xl sm:h-[360px] sm:gap-16 sm:px-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-3xl font-bold sm:text-4xl">Игра началась</p>
              <p className="text-lg text-white/70">Обсуждайте и найдите шпиона</p>
            </div>

            <button
              onClick={finishGame}
              className="h-[50px] w-full max-w-[256px] cursor-pointer rounded-[10px] border border-white bg-[#1E1E1E] text-lg font-bold transition duration-300 hover:border-black hover:bg-white hover:text-black"
            >
              Завершить игру
            </button>
          </div>
        </div>
      )}

      {showResults && (
        <div className="relative z-20 flex h-dvh w-full items-center justify-center px-4 py-5 text-white sm:px-6">
          <div className="flex min-h-[400px] w-[471px] max-w-full flex-col items-center justify-center gap-10 rounded-[16px] border border-white/10 bg-[#222222] px-5 py-8 text-center shadow-2xl sm:min-h-[420px] sm:gap-12 sm:px-8 sm:py-12">
            <div className="flex flex-col items-center gap-6">
              <p className="text-3xl font-bold sm:text-4xl">Шпион был</p>
              <p className="text-3xl font-bold text-[#D9293A]">
                {cards
                  .map((card, index) => (card.role === "spy" ? `Игрок ${index + 1}` : null))
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p className="text-xl text-white/75">
                Тема: <span className="font-bold text-white">{selectedTopic}</span>
              </p>
            </div>

            <div className="flex w-full max-w-[256px] flex-col gap-3">
              <button
                onClick={resetGame}
                className="h-[50px] w-full cursor-pointer rounded-[10px] border border-white bg-[#1E1E1E] text-lg font-bold transition duration-300 hover:border-black hover:bg-white hover:text-black"
              >
                Новая игра
              </button>
              <button
                onClick={returnToMenu}
                className="h-[50px] w-full cursor-pointer rounded-[10px] border border-white/50 bg-[#1E1E1E] text-lg transition duration-300 hover:border-black hover:bg-white hover:text-black"
              >
                Назад
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsSelect({ children, label, onChange, value }) {
  return (
    <label className="relative flex flex-col gap-2">
      <span className="text-sm text-white/75">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="h-[57px] w-full cursor-pointer appearance-none rounded-[10px] border border-black bg-[#1E1E1E] px-5 pr-12 text-lg text-white outline-none transition duration-300 hover:bg-[#363636]"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute top-[47px] right-5 text-white">
        <ChevronDown />
      </span>
    </label>
  );
}
