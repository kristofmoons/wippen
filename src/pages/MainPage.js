import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
  const [players, setPlayers] = useState([]);

  const addPlayer = (name) => {
    setPlayers(prevPlayers => [
      ...prevPlayers,
      { name: name, score: 0 }
    ]);
  };

  const increaseScore = (index) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[index].score += 1;
      return updatedPlayers;
    });
  };

  const decreaseScore = (index) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      if (updatedPlayers[index].score > 0) {
        updatedPlayers[index].score -= 1;
      }
      return updatedPlayers;
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Wippen Score Tracker</h1>
      <div>
        <h2>Spelers:</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const playerName = e.target.elements.playerName.value;
          addPlayer(playerName);
          e.target.elements.playerName.value = '';
        }}>
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="playerName" placeholder="Voeg speler toe" />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">Toevoegen</button>
            </div>
          </div>
        </form>

        {players.map((player, index) => (
          <div key={index} className="mb-2">
            <div className="row">
              <div className="col">
                <span>{player.name}</span>
              </div>
              <div className="col">
                <span>Score: {player.score}</span>
              </div>
              <div className="col">
                <button className="btn btn-success" onClick={() => increaseScore(index)}>+</button>
                <button className="btn btn-danger" onClick={() => decreaseScore(index)}>-</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
