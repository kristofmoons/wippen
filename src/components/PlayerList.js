import React from 'react';

const PlayerList = ({ players, increaseScore, decreaseScore, addPlayer, playerNameError, restartGame, nextRound }) => {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Score Board</h5>
        <button className="btn btn-outline-danger" onClick={restartGame}>Restart Game</button>
      </div>
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
      <div className="card-body">
        {players.length > 0 ? (
          players.map((player, index) => (
            <div key={index} className="mb-2 d-flex align-items-center">
              <div className="mr-4" style={{ minWidth: '100px' }}>{player.name}</div>
              <div className="mx-auto">{player.score}</div>
              <div className="ml-auto">
                <button className="btn btn-danger mr-1" onClick={() => decreaseScore(index)}>-</button>
                <button className="btn btn-success" onClick={() => increaseScore(index)}>+</button>
              </div>
            </div>
          ))
        ) : (
          <p>No players added yet.</p>
        )}
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={nextRound}>Volgende Ronde</button>
      </div>
    </div>
  );
};

export default PlayerList;
