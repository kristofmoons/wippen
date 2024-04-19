import {useEffect, useState} from "react";

const MainPage = () => {
  // Staat voor het bijhouden van de scores van de spelers
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0,
    // Voeg meer spelers toe indien nodig
  });

  // Functie om de score van een speler te verhogen
  const increaseScore = (player) => {
    setScores(prevScores => ({
      ...prevScores,
      [player]: prevScores[player] + 1
    }));
  };

  // Functie om de score van een speler te verlagen
  const decreaseScore = (player) => {
    if (scores[player] > 0) {
      setScores(prevScores => ({
        ...prevScores,
        [player]: prevScores[player] - 1
      }));
    }
  };

  return (
    <div>
      <h1>Wippen Score Tracker</h1>
      <div>
        <h2>Spelers:</h2>
        <div>
          <span>Speler 1: {scores.player1}</span>
          <button onClick={() => increaseScore('player1')}>+</button>
          <button onClick={() => decreaseScore('player1')}>-</button>
        </div>
        <div>
          <span>Speler 2: {scores.player2}</span>
          <button onClick={() => increaseScore('player2')}>+</button>
          <button onClick={() => decreaseScore('player2')}>-</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
