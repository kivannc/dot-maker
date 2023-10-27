import { useState, MouseEvent } from 'react';
import './App.css';

type Dot = {
  x: number;
  y: number;
};
function App() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [cache, setCache] = useState<Dot[]>([]);

  const drawDot = (event: MouseEvent) => {
    setDots([...dots, { x: event.clientX, y: event.clientY }]);
    setCache([]);
  };

  const undo = () => {
    if (dots.length === 0) return;
    const newDots = [...dots];
    const dot = newDots.pop();
    setDots(newDots);
    setCache([...cache, dot] as Dot[]);
  };

  const redo = () => {
    if (cache.length === 0) return;
    const newCache = [...cache];
    const dot = newCache.pop();
    setCache(newCache);
    setDots([...dots, dot] as Dot[]);
  };
  return (
    <div className="App">
      <div id="button-wrapper">
        <button
          className={dots.length === 0 ? 'disabledButton' : ''}
          onClick={undo}
        >
          Undo
        </button>
        <button
          className={cache.length === 0 ? 'disabledButton' : ''}
          onClick={redo}
        >
          Redo
        </button>
      </div>
      <div id="click-area" onClick={drawDot}>
        {dots.map((dot, i) => (
          <div
            key={`dot-${i}`}
            className="dot"
            style={{ left: dot.x, top: dot.y }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
