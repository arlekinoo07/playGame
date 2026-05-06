export default function Menu({ onPlay }) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-neutral-900 text-white">
        <h1 className="text-3xl font-bold">Шпион</h1>
  
        <button
          className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl text-lg"
          onClick={onPlay}>
          Играть
        </button>
        <button
          className="bg-neutral-700 px-8 py-4 rounded-xl text-lg opacity-60"
          disabled>
          Настройки (скоро)
        </button>
      </div>
    );
  }