"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import cloud1 from "../assets/photo/PageStart/cloud1.png";
import cloud2 from "../assets/photo/PageStart/cloud2.png";
import spy1 from "../assets/photo/PageStart/spy1.png";
import spy2 from "../assets/photo/PageStart/spy2.png";
import back from "../assets/photo/PageStart/back.png";
import button from "../assets/photo/PageStart/button.png";

export default function StartScreen({ onOpenSpy }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [language, setLanguage] = useState("Русский");
  const menuRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative h-dvh min-h-[560px] w-screen overflow-hidden"
      style={
        hover
          ? {
              backgroundImage: `url(${back.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          : { backgroundColor: "#121212" }
      }
    >
      <p className="absolute right-4 bottom-1 z-30 text-sm text-white">v 0 . 01 . 01</p>

      <img
        src={cloud1.src}
        className={`absolute top-0 right-0 max-h-[48vh] max-w-[72vw] object-contain transition-opacity duration-500 md:max-h-none md:max-w-none ${hover ? "opacity-0" : "opacity-100"}`}
        alt="cloud"
      />
      <img
        src={spy2.src}
        className={`absolute top-0 right-0 max-h-[48vh] max-w-[72vw] object-contain transition-opacity duration-500 md:max-h-none md:max-w-none ${hover ? "opacity-100" : "opacity-0"}`}
        alt="spy"
      />
      <img
        src={cloud2.src}
        className={`absolute bottom-0 left-0 max-h-[48vh] max-w-[72vw] object-contain transition-opacity duration-500 md:max-h-none md:max-w-none ${hover ? "opacity-0" : "opacity-100"}`}
        alt="cloud"
      />
      <img
        src={spy1.src}
        className={`absolute bottom-0 left-0 max-h-[48vh] max-w-[72vw] object-contain transition-opacity duration-500 md:max-h-none md:max-w-none ${hover ? "opacity-100" : "opacity-0"}`}
        alt="spy"
      />

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-16 px-4 py-10 md:gap-[130px] md:px-0 md:py-0">
        <div className="flex flex-col items-center justify-center gap-[30px]">
          <p className={`text-2xl ${hover ? "text-white" : "text-black"}`}>Игры</p>

          <div className="flex flex-col items-center justify-center gap-[10px]">
            <div
              className="group relative h-[50px] w-[242px]"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <div className="absolute inset-0 cursor-pointer rounded-[10px] border-2 border-[#9A0D1B] bg-[#1E1E1E] transition-all duration-300" />
              <div
                className="absolute inset-0 cursor-pointer rounded-[10px] bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundImage: `url(${button.src})` }}
              />
              <button
                onClick={onOpenSpy}
                className="relative h-full w-full cursor-pointer text-lg font-bold text-white"
              >
                Шпион
              </button>
            </div>

            <button className="h-[50px] w-[242px] cursor-no-drop rounded-[10px] border-2 border-black bg-[#1E1E1E] text-lg text-white">
              Мафия(скоро)
            </button>
            <button className="h-[50px] w-[242px] cursor-no-drop rounded-[10px] border-2 border-black bg-[#1E1E1E] text-lg text-white">
              Дурак(скоро)
            </button>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((value) => !value)}
            className="flex h-[50px] w-[242px] cursor-pointer items-center justify-center gap-1 rounded-[10px] border-2 border-white bg-[#1E1E1E] text-white transition"
          >
            Язык: {language} <ChevronDown />
          </button>

          {open && (
            <div className="absolute mt-2 w-full overflow-hidden rounded-xl bg-white shadow-lg">
              <button
                onClick={() => {
                  setLanguage("Русский");
                  setOpen(false);
                }}
                className="block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
              >
                Русский
              </button>
              <button
                onClick={() => {
                  setLanguage("English");
                  setOpen(false);
                }}
                className="block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
              >
                English
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
