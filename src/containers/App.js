import React, { useState, useEffect } from 'react';
import './App.css';
import Display from '../components/Display/Display';
import Button from '../components/Button/Button';
import ScoreBoard from '../components/ScoreBoard/ScoreBoard';

const random = Math.floor(Math.random() * (1000 - 100) + 100) / (100);
let startTime = 0;
let totalPoints = 0;

export default function App() {
  const [timer, setTimer] = useState('0.00');
  const [isRunning, setIsRunning] = useState(false);
  const [goal, setGoal] = useState(random);
  const [points, setPoints] = useState(0);

  const resetGame = () => {
    setIsRunning(false);
    setTimer('0.00');
    setGoal(Math.floor(Math.random() * (1000 - 100) + 100) / (100));
    startTime = 0;
    totalPoints += Number(points);
    setPoints(0);
  }

  useEffect(() => {
    startTime = (isRunning && startTime === 0) ? new Date().getTime() : startTime;
    let timerID = (isRunning) ? setInterval(() => {
      let currentTime = new Date().getTime();
      let difTime = currentTime - startTime;
      setTimer((difTime / 1000).toFixed(2));
    }, 1) : null;

    let valueDif = (!isRunning && timer !== '0.00') ? Math.abs(goal - timer) : 0;
    valueDif = valueDif.toFixed(2);
    let calcDif = (!isRunning && timer !== '0.00') ? (valueDif >= 1) ? 0 : (valueDif === 0) ? 200 : (1 - valueDif) * (100 - (Math.floor(valueDif * 10) * 10)) : 0;
    setPoints(calcDif.toFixed(2));

    return function cleanup() {
      clearInterval(timerID);
    }

  }, [isRunning, timer, goal]);

  return (
    <div className="App">
      <ScoreBoard goal={goal} result={timer} points={points} total={totalPoints.toFixed(2)} />
      <Display>{timer}</Display>
      <Button clicked={() => setIsRunning(!isRunning)}>{(!isRunning) ? 'Iniciar' : 'Pausar'}</Button>
      <Button clicked={resetGame}>{'Novo Jogo'}</Button>
    </div>
  );
}
