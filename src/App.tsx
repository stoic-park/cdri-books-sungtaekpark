import { useState } from 'react';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="https://vite.dev"
            target="_blank"
            className="hover:scale-110 transition-transform"
          >
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Vite + React</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button
            onClick={() => setCount(count => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors"
          >
            count is {count}
          </button>
          <p className="text-gray-600 mb-4">
            Edit{' '}
            <code className="bg-gray-200 px-2 py-1 rounded">src/App.tsx</code>{' '}
            and save to test HMR
          </p>
        </div>
        <p className="text-gray-500 mt-8">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
