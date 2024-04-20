import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from '../components/Dropdown';
import PlayerList from '../components/PlayerList';


const MainPage = () => {
  const [players, setPlayers] = useState([]);
  const [mostCardsPlayer, setMostCardsPlayer] = useState(''); // Variabele voor geselecteerde speler met meeste kaarten
  const [mostSpadesPlayer, setMostSpadesPlayer] = useState(''); // Variabele voor geselecteerde speler met meeste schoppen
  const [diamondsTenPlayer, setDiamondsTenPlayer] = useState(''); // Variabele voor geselecteerde speler met ♦10
  const [spadesTwoPlayer, setSpadesTwoPlayer] = useState(''); // Variabele voor geselecteerde speler met ♠2
  const [playerNameError, setPlayerNameError] = useState(false); // Variabele om aan te geven of er een fout is opgetreden bij het toevoegen van een speler
  const [missingDropdowns, setMissingDropdowns] = useState([]); // Variabele om aan te geven welke dropdowns niet zijn ingevuld


  const addPlayer = (name) => {
    if (name.trim() === '') {
      setPlayerNameError(true);
      return;
    }

    setPlayers(prevPlayers => [
      ...prevPlayers,
      { name: name, score: 0 }
    ]);
    setPlayerNameError(false);
  };

  const handleDropdownChange = (e, setter, situation) => {
    const selectedPlayer = e.target.value;
    setter(selectedPlayer);
    setMissingDropdowns(prevMissingDropdowns => prevMissingDropdowns.filter(item => item !== situation));
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
    // Controleer of alle dropdowns zijn ingevuld
    if (mostCardsPlayer === '' || mostSpadesPlayer === '' || diamondsTenPlayer === '' || spadesTwoPlayer === '') {
      setMissingDropdowns(['meeste kaarten', 'meeste schoppen', '♦10 in bezit', '♠2 in bezit']);
      return; // Stop de functie als niet alle dropdowns zijn ingevuld
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

    // Controleer opnieuw of alle dropdowns zijn ingevuld na het toevoegen van punten
    if (!validateDropdowns()) {
      return; // Stop de functie als niet alle dropdowns zijn ingevuld
    }
  };

  const validateDropdowns = () => {
    const missing = [];
    if (mostCardsPlayer === '') missing.push('meeste kaarten');
    if (mostSpadesPlayer === '') missing.push('meeste schoppen');
    if (diamondsTenPlayer === '') missing.push('♦10 in bezit');
    if (spadesTwoPlayer === '') missing.push('♠2 in bezit');
    setMissingDropdowns(missing);

    // Reset de lijst met ontbrekende dropdowns als alle dropdowns zijn ingevuld
    if (missing.length === 0) {
      setMissingDropdowns([]);
    }

    return missing.length === 0;
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
       {/* PlayerList-component */}
       <PlayerList
          players={players}
          increaseScore={increaseScore}
          decreaseScore={decreaseScore}
          addPlayer={addPlayer}
          playerNameError={playerNameError}
      />


      <div className="text-center mt-4">

        <div className="row">
          <div className="col">
            <h5>Meeste kaarten:</h5>
            <Dropdown title="meeste kaarten" players={players} selectedPlayer={mostCardsPlayer} onChange={(e) => handleDropdownChange(e, setMostCardsPlayer, 'meeste kaarten')} missing={missingDropdowns.includes('meeste kaarten')} />
          </div>
          <div className="col">
            <h5>Meeste ♠kaarten:</h5>
            <Dropdown title="meeste schoppen" players={players} selectedPlayer={mostSpadesPlayer} onChange={(e) => handleDropdownChange(e, setMostSpadesPlayer, 'meeste schoppen')} missing={missingDropdowns.includes('meeste schoppen')} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>♦10 in bezit:</h4>
            <Dropdown title="♦10 in bezit" players={players} selectedPlayer={diamondsTenPlayer} onChange={(e) => handleDropdownChange(e, setDiamondsTenPlayer, '♦10 in bezit')} missing={missingDropdowns.includes('♦10 in bezit')} />
          </div>
          <div className="col">
            <h4>♠2 in bezit:</h4>
            <Dropdown title="♠2 in bezit" players={players} selectedPlayer={spadesTwoPlayer} onChange={(e) => handleDropdownChange(e, setSpadesTwoPlayer, '♠2 in bezit')} missing={missingDropdowns.includes('♠2 in bezit')} />
          </div>
        </div>

        <button className="btn btn-success" onClick={addPointsToPlayer}>Volgende Ronde</button>
      </div>



      <div className="text-center mt-4">
        <button className="btn btn-info" onClick={showCardPoints}>Toon Kaartpunten</button>
      </div>
    </div>
  );
};

export default MainPage;
