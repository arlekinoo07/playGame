export default function ResultScreen({
    theme,
    spyIndexes,
    onRestart,
  }) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6">Итоги игры</h1>
  
          <p className="mb-4">
            <span className="opacity-70">Тема:</span>
            <span className="block text-xl font-bold mt-1">{theme}</span>
          </p>
  
          <p className="mb-6">
            <span className="opacity-70">Шпионы:</span>
            <span className="block mt-1">
              {spyIndexes.map((i) => `Игрок ${i + 1}`).join(", ")}
            </span>
          </p>
  
          <button
            onClick={onRestart}
            className="w-full bg-green-500 py-4 rounded-xl text-lg"
          >
            Новая игра
          </button>
        </div>
      </div>
    );
  }