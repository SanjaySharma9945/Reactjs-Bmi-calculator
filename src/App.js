// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  // Star positions
  const [stars, setStars] = useState([
    { id: 1, twinkling: true },
    { id: 2, twinkling: false },
    { id: 3, twinkling: true },
    { id: 4, twinkling: false },
  ]);

  // Function to calculate BMI
  const calcBmi = (event) => {
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height');
    } else {
      let bmiValue = (weight / (height * height)) * 703;
      setBmi(bmiValue.toFixed(1));

      if (bmiValue < 25) {
        setMessage('You are underweight');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setMessage('You are a healthy weight');
      } else {
        setMessage('You are overweight');
      }
    }
  };

  // Function to reload the page
  const reload = () => {
    window.location.reload();
  };

  // Mouse move handler to update star positions
  const handleMouseMove = (event) => {
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    // Update positions of stars diagonally
    setStars([
      { id: 1, x: mouseX + 30, y: mouseY + 30, twinkling: true },
      { id: 2, x: mouseX + 60, y: mouseY + 60, twinkling: false },
      { id: 3, x: mouseX + 90, y: mouseY + 90, twinkling: true },
      { id: 4, x: mouseX + 120, y: mouseY + 120, twinkling: false },
    ]);
  };

  // Effect to update star positions on mouse move
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>
        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>
      </div>
      {/* Render stars based on state */}
      {stars.map((star) => (
        <svg
          key={star.id}
          className={`star ${star.twinkling ? 'twinkling' : 'bright'}`}
          style={{ left: star.x, top: star.y }}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.25l1.48 4.53h4.77l-3.86 2.8 1.48 4.53-3.86-2.8-3.86 2.8 1.48-4.53-3.86-2.8h4.77l1.48-4.53z"
            fill="#ffcf42"
          />
        </svg>
      ))}
    </div>
  );
}

export default App;
