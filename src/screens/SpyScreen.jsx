"use client";

import { useState } from "react";
import { ArrowBigRight, ChevronDown, Undo2 } from "lucide-react";

import spy1 from "../assets/photo/PageSpy/spy1.png";
import spy2 from "../assets/photo/PageSpy/spy2.png";
import back from "../assets/photo/PageSpy/back.png";
import button from "../assets/photo/PageSpy/button.png";

export default function SpyScreen({ onBack }) {
  const [step, setStep] = useState(0);
  const showSettingsPreview = step >= 1;

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center gap-6 bg-black"
      style={{ backgroundImage: `url(${back.src})`, backgroundSize: "cover" }}
    >
      <img src={spy1.src} className="absolute bottom-0 left-0 z-10" alt="spy" />
      <img src={spy2.src} className="absolute right-0 bottom-0 z-10" alt="spy" />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-20 flex h-[600px] items-center justify-center gap-10 overflow-hidden">
        <div
          className={`flex h-[558px] w-[471px] shrink-0 flex-col items-center justify-center gap-[144px] rounded-[10px] bg-[#222222] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            showSettingsPreview ? "-translate-x-6" : "translate-x-0"
          }`}
        >
            <div className="flex flex-col items-center justify-center gap-[30px]">
              <p className="text-2xl font-bold">Шпион</p>
              <div className="flex flex-col gap-[10px]">
                <div
                  className="group relative h-[50px] w-[362px]"
                >
                  <div className="absolute inset-0 cursor-pointer rounded-[10px] border-2 border-[#9A0D1B] bg-[#1E1E1E]" />
                  <div
                    className="absolute inset-0 cursor-pointer rounded-[10px] bg-cover bg-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
            className={`flex h-[558px] w-[471px] shrink-0 flex-col items-center justify-center gap-[35px] rounded-[10px] bg-[#222222] text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              showSettingsPreview
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-10">
              <p className="text-2xl font-bold">Настройки игры</p>
              <div className="flex flex-col gap-3">
                <SettingsButton label="Категория" />
                <SettingsButton label="Кол-во игроков" />
                <SettingsButton label="Кол-во шпионов" />
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
          <div className="flex h-[558px] w-[471px] animate-[fadeIn_.5s_forwards] flex-col items-center justify-center gap-5 rounded-xl bg-[#222222] text-white">
              <p className="text-2xl font-bold">Имена игроков</p>

              <div className="flex flex-col items-center justify-center gap-3">
                {[1, 2, 3, 4, 5].map((player) => (
                  <label
                    key={player}
                    className="h-[46px] w-[256px] rounded-[10px] border border-black bg-[#1E1E1E]"
                  >
                    <input
                      placeholder={`Игрок ${player}`}
                      className="h-full w-full rounded-[10px] bg-transparent px-4 outline-none focus:outline-2 focus:outline-black"
                    />
                  </label>
                ))}
              </div>

              <button className="h-[46px] w-[256px] cursor-pointer rounded-[10px] border border-white bg-[#1E1E1E] text-lg transition duration-300 hover:border-black hover:bg-white hover:text-black">
                Начать игру
              </button>
            </div>
        )}
      </div>
    </div>
  );
}

function SettingsButton({ label }) {
  return (
    <button className="flex h-[57px] w-[328px] cursor-pointer items-center justify-center gap-[5px] rounded-[10px] border border-black bg-[#1E1E1E] text-lg transition duration-300 hover:bg-[#363636]">
      {label} <ChevronDown />
    </button>
  );
}
