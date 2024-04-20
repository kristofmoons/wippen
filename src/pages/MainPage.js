import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(''); // Variabele voor geselecteerde speler
  const [pointsToAdd, setPointsToAdd] = useState(0); // Variabele voor toe te voegen punten
  const [mostCardsPlayer, setMostCardsPlayer] = useState(''); // Variabele voor geselecteerde speler met meeste kaarten
  const [mostSpadesPlayer, setMostSpadesPlayer] = useState(''); // Variabele voor geselecteerde speler met meeste schoppen
  const [diamondsTenPlayer, setDiamondsTenPlayer] = useState(''); // Variabele voor geselecteerde speler met ♦10
  const [spadesTwoPlayer, setSpadesTwoPlayer] = useState(''); // Variabele voor geselecteerde speler met ♠2
  const [playerNameError, setPlayerNameError] = useState(false); // Variabele om aan te geven of er een fout is opgetreden bij het toevoegen van een speler



  const addPlayer = (name) => {
    // Controleer of de naam niet leeg is
    if (name.trim() === '') {
      setPlayerNameError(true);
      return;
    }

    setPlayers(prevPlayers => [
      ...prevPlayers,
      { name: name, score: 0 }
    ]);
    setPlayerNameError(false); // Reset de foutmelding
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
    if (mostCardsPlayer === '' || mostSpadesPlayer === '' || diamondsTenPlayer === '' || spadesTwoPlayer === '') {
      alert('Selecteer een speler voor elke situatie');
      return;
    }

    // Voeg punten toe aan spelers voor elke situatie
    setPlayers(prevPlayers => {
      return prevPlayers.map(player => {
        let scoreToAdd = 0;
        if (player.name === mostCardsPlayer) scoreToAdd += 2;
        if (player.name === mostSpadesPlayer) scoreToAdd += 2;
        if (player.name === diamondsTenPlayer) scoreToAdd += 2;
        if (player.name === spadesTwoPlayer) scoreToAdd += 1;

        return {
          ...player,
          score: player.score + scoreToAdd
        };
      });
    });

    // Reset geselecteerde spelers
    setMostCardsPlayer('');
    setMostSpadesPlayer('');
    setDiamondsTenPlayer('');
    setSpadesTwoPlayer('');
  };

  const handleMostCardsPlayerChange = (e) => {
    setMostCardsPlayer(e.target.value);
  };

  const handleMostSpadesPlayerChange = (e) => {
    setMostSpadesPlayer(e.target.value);
  };

  const handleDiamondsTenPlayerChange = (e) => {
    setDiamondsTenPlayer(e.target.value);
  };

  const handleSpadesTwoPlayerChange = (e) => {
    setSpadesTwoPlayer(e.target.value);
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

      <div className="text-center mt-4">
        <h2>Situaties:</h2>
        {/* Dropdown voor "Meeste kaarten" situatie */}
        <select className="form-control mb-2" value={mostCardsPlayer} onChange={handleMostCardsPlayerChange}>
          <option value="">Selecteer een speler voor meeste kaarten</option>
          {players.map((player, index) => (
            <option key={index} value={player.name}>{player.name}</option>
          ))}
        </select>
        {/* Dropdown voor "Meeste schoppen" situatie */}
        <select className="form-control mb-2" value={mostSpadesPlayer} onChange={handleMostSpadesPlayerChange}>
          <option value="">Selecteer een speler voor meeste schoppen</option>
          {players.map((player, index) => (
            <option key={index} value={player.name}>{player.name}</option>
          ))}
        </select>
        {/* Dropdown voor "♦10 in bezit" situatie */}
        <select className="form-control mb-2" value={diamondsTenPlayer} onChange={handleDiamondsTenPlayerChange}>
          <option value="">Selecteer een speler voor ♦10 in bezit</option>
          {players.map((player, index) => (
            <option key={index} value={player.name}>{player.name}</option>
          ))}
        </select>
        {/* Dropdown voor "♠2 in bezit" situatie */}
        <select className="form-control mb-2" value={spadesTwoPlayer} onChange={handleSpadesTwoPlayerChange}>
          <option value="">Selecteer een speler voor ♠2 in bezit</option>
          {players.map((player, index) => (
            <option key={index} value={player.name}>{player.name}</option>
          ))}
        </select>
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
