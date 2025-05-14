import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    const ms = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(time / 1000);
    const sec = `0${seconds % 60}`.slice(-2);
    const min = `0${Math.floor(seconds / 60)}`.slice(-2);
    return `${min}:${sec}.${ms}`;
  };

  return (
    <div className="container">
      <h1 className="timer">{formatTime(time)}</h1>
      <div className="buttons">
        <button className="btn" onClick={() => setIsRunning(true)}>Start</button>
        <button className="btn" onClick={() => setIsRunning(false)}>Stop</button>
        <button className="btn" onClick={() => { setTime(0); setIsRunning(false); }}>Reset</button>
      </div>
    </div>
  );
}

export default App;