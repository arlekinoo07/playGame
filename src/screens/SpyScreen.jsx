"use client";

import { useMemo, useState } from "react";
import { ArrowBigRight, ChevronDown, Undo2 } from "lucide-react";

import spy1 from "../assets/photo/PageSpy/spy1.png";
import spy2 from "../assets/photo/PageSpy/spy2.png";
import back from "../assets/photo/PageSpy/back.png";
import button from "../assets/photo/PageSpy/button.png";

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

export default function SpyScreen({ onBack }) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("countries");
  const [playersCount, setPlayersCount] = useState(4);
  const [spiesCount, setSpiesCount] = useState(1);
  const [cards, setCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [cardOpened, setCardOpened] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  const showSettingsPreview = step >= 1;
  const showNamesPreview = step >= 2;
  const showGameCards = step === 3;

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
    setStep(3);
  }

  function closeCurrentCard() {
    if (currentPlayer === cards.length - 1) {
      setStep(1);
      setCardOpened(false);
      return;
    }

    setCurrentPlayer((value) => value + 1);
    setCardOpened(false);
  }

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center gap-6 bg-black"
      style={{ backgroundImage: `url(${back.src})`, backgroundSize: "cover" }}
    >
      <img src={spy1.src} className="absolute bottom-0 left-0 z-10" alt="spy" />
      <img src={spy2.src} className="absolute right-0 bottom-0 z-10" alt="spy" />
      <div className="absolute inset-0 bg-black/60" />

      {!showGameCards && (
        <div className="relative z-20 flex h-[600px] w-[1080px] max-w-[calc(100vw-48px)] items-center justify-center gap-10 overflow-visible px-6">
          <div
            className={`flex h-[558px] w-[471px] shrink-0 flex-col items-center justify-center gap-[144px] rounded-[10px] bg-[#222222] text-white transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showSettingsPreview
                ? "-translate-x-8 scale-[0.985] opacity-95"
                : "translate-x-0 scale-100 opacity-100"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-[30px]">
              <p className="text-2xl font-bold">Шпион</p>
              <div className="flex flex-col gap-[10px]">
                <div className="group relative h-[50px] w-[362px]">
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
                <button className="h-[50px] w-[362px] cursor-no-drop rounded-[10px] border border-black bg-[#1E1E1E] text-lg">
                  Многопользовательская(скоро)
                </button>
                <button className="h-[50px] w-[362px] cursor-no-drop rounded-[10px] border border-black bg-[#1E1E1E] text-lg">
                  Настройки(скоро)
                </button>
              </div>
            </div>

            <button
              onClick={onBack}
              className="flex h-[50px] w-[362px] cursor-pointer items-center justify-center gap-1 rounded-[10px] border border-white text-lg transition duration-300 hover:border-black hover:bg-white hover:text-black"
            >
              Назад <Undo2 />
            </button>
          </div>

          {(step === 1 || step === 2) && (
            <div
              className={`flex h-[558px] w-[471px] shrink-0 flex-col items-center justify-center gap-[35px] rounded-[10px] bg-[#222222] text-white transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                showSettingsPreview
                  ? showNamesPreview
                    ? "-translate-x-6 scale-[0.99] opacity-100"
                    : "translate-x-0 scale-100 opacity-100"
                  : "translate-x-32 scale-[0.94] opacity-0"
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-10">
                <p className="text-2xl font-bold">Настройки игры</p>
                <div className="flex flex-col gap-3">
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

              <div className="flex items-center justify-center gap-[10px]">
                <button
                  onClick={() => setStep(0)}
                  className="flex h-[42px] w-[159px] cursor-pointer items-center justify-center gap-1 rounded-[10px] border border-white bg-[#1E1E1E] text-base transition duration-300 hover:border-black hover:bg-white hover:text-black"
                >
                  Назад <Undo2 />
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex h-[42px] w-[159px] cursor-pointer items-center justify-center gap-1 rounded-[10px] border border-white bg-[#1E1E1E] text-base transition duration-300 hover:border-black hover:bg-white hover:text-black"
                >
                  Далее <ArrowBigRight />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div
              className={`flex h-[558px] w-[471px] shrink-0 flex-col items-center justify-center gap-5 rounded-xl bg-[#222222] text-white transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                showNamesPreview
                  ? "translate-x-0 scale-100 opacity-100"
                  : "translate-x-32 scale-[0.94] opacity-0"
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
        <div className="relative z-20 flex h-[600px] w-full items-center justify-center px-6">
          <div className="flex h-[558px] w-[471px] flex-col items-center justify-center gap-8 rounded-[10px] bg-[#222222] px-10 text-white">
            <p className="text-center text-2xl font-bold">Игрок {currentPlayer + 1}</p>
            <p className="text-center text-lg text-white/75">
              {cardOpened ? "Нажми ещё раз, чтобы передать ход дальше" : "Передайте устройство следующему игроку"}
            </p>

            <button
              onClick={() => {
                if (cardOpened) {
                  closeCurrentCard();
                  return;
                }

                setCardOpened(true);
              }}
              className={`flex h-[320px] w-[320px] items-center justify-center rounded-[20px] border-2 text-center text-3xl font-bold transition-all duration-500 ${
                cardOpened
                  ? "border-[#9A0D1B] bg-white text-black"
                  : "border-white bg-[#1E1E1E] text-white hover:border-black hover:bg-white hover:text-black"
              }`}
            >
              {cardOpened ? cards[currentPlayer].text : "Открыть карточку"}
            </button>

            <p className="text-center text-sm text-white/60">
              Тестовая категория: {CATEGORIES[category].name}
              {selectedTopic ? ` • Тема выбрана` : ""}
            </p>
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
        className="h-[57px] w-[328px] cursor-pointer appearance-none rounded-[10px] border border-black bg-[#1E1E1E] px-5 pr-12 text-lg text-white outline-none transition duration-300 hover:bg-[#363636]"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute top-[47px] right-5 text-white">
        <ChevronDown />
      </span>
    </label>
  );
}
