// PlayerList.js

import React from 'react';

const PlayerList = ({ players, increaseScore, decreaseScore, addPlayer, playerNameError }) => {
  return (
    <div>
      <h2>Spelers:</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const playerName = e.target.elements.playerName.value;
        addPlayer(playerName);
        e.target.elements.playerName.value = '';
      }}>
        <div className="input-group mb-3">
          <input type="text" className={`form-control ${playerNameError ? 'is-invalid' : ''}`} name="playerName" placeholder="Voeg speler toe" />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">Toevoegen</button>
          </div>
          {playerNameError && <div className="invalid-feedback">Voer een geldige naam in voor de speler.</div>}
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
  );
};

export default PlayerList;
