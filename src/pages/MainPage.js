import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(''); // Variabele voor geselecteerde speler
  const [pointsToAdd, setPointsToAdd] = useState(0); // Variabele voor toe te voegen punten
  


  const addPlayer = (name) => {
    setPlayers(prevPlayers => [
      ...prevPlayers,
      { name: name, score: 0 }
    ]);
  };

  const increaseScore = (index) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[index] = {
        ...updatedPlayers[index],
        score: updatedPlayers[index].score + 1
      };
      return updatedPlayers;
    });
  };
  
  const decreaseScore = (index) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      if (updatedPlayers[index].score > 0) {
        updatedPlayers[index] = {
          ...updatedPlayers[index],
          score: updatedPlayers[index].score - 1
        };
      }
      return updatedPlayers;
    });
  };

  const addPointsToPlayer = () => {
    if (selectedPlayer === '') {
      alert('Selecteer een speler');
      return;
    }

    setPlayers(prevPlayers => {
      return prevPlayers.map(player => {
        if (player.name === selectedPlayer) {
          return {
            ...player,
            score: player.score + pointsToAdd
          };
        }
        return player;
      });
    });

    // Reset geselecteerde speler en punten toe te voegen
    setSelectedPlayer('');
    setPointsToAdd(0);
  };

  

  const showCardPoints = () => {
    alert("Kaartpunten:\n" +
      "meeste kaarten: 2\n" +
      "meeste ♠: 2\n" +
      "♦10: 2\n" +
      "♠2 :1\n" +
      "elke A kaart:1");
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

      <div className="text-center mt-4">
        {/* Knop voor het tonen van kaartpunten */}
        <button className="btn btn-info mr-2" data-toggle="modal" data-target="#cardPointsModal">Toon Kaartpunten</button>
        {/* Dropdown voor spelerselectie */}
        <select className="form-control mr-2" value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)}>
          <option value="">Selecteer een speler</option>
          {players.map((player, index) => (
            <option key={index} value={player.name}>{player.name}</option>
          ))}
        </select>
        {/* Input voor het toevoegen van punten */}
        <input type="number" className="form-control mr-2" placeholder="Punten toevoegen" value={pointsToAdd} onChange={(e) => setPointsToAdd(parseInt(e.target.value))} />
        {/* Knop voor het toevoegen van punten */}
        <button className="btn btn-success" onClick={addPointsToPlayer}>Volgende Ronde</button>
      </div>

      <div className="text-center mt-4">
      <button className="btn btn-info" onClick={showCardPoints}>Toon Kaartpunten</button>
    </div>
    </div>
  );
};

export default MainPage;
