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
  const [spadesAcePlayer, setSpadesAcePlayer] = useState('');
  const [heartsAcePlayer, setHeartsAcePlayer] = useState('');
  const [diamondsAcePlayer, setDiamondsAcePlayer] = useState('');
  const [clubsAcePlayer, setClubsAcePlayer] = useState('');

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
    // Controleer of alle dropdowns zijn ingevuld, inclusief de Aas-kaarten
    if (
      mostCardsPlayer === '' ||
      mostSpadesPlayer === '' ||
      diamondsTenPlayer === '' ||
      spadesTwoPlayer === '' ||
      spadesAcePlayer === '' ||
      heartsAcePlayer === '' ||
      diamondsAcePlayer === '' ||
      clubsAcePlayer === ''
    ) {
      setMissingDropdowns([
        'meeste kaarten',
        'meeste schoppen',
        '♦10 in bezit',
        '♠2 in bezit',
        'Schoppen A',
        'Harten A',
        'Ruiten A',
        'Klaveren A'
      ]);
      return; // Stop de functie als niet alle dropdowns zijn ingevuld
    }
  
    // Voeg punten toe aan spelers voor elke situatie, inclusief de Aas-kaarten
    setPlayers(prevPlayers => {
      return prevPlayers.map(player => {
        let scoreToAdd = 0;
        if (player.name === mostCardsPlayer) scoreToAdd += 2;
        if (player.name === mostSpadesPlayer) scoreToAdd += 2;
        if (player.name === diamondsTenPlayer) scoreToAdd += 2;
        if (player.name === spadesTwoPlayer) scoreToAdd += 1;
        if (player.name === spadesAcePlayer) scoreToAdd += 1;
        if (player.name === heartsAcePlayer) scoreToAdd += 1;
        if (player.name === diamondsAcePlayer) scoreToAdd += 1;
        if (player.name === clubsAcePlayer) scoreToAdd += 1;

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
    setSpadesAcePlayer('');
    setHeartsAcePlayer('');
    setDiamondsAcePlayer('');
    setClubsAcePlayer('');
  
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
    if (spadesAcePlayer === '') missing.push('Schoppen A');
    if (heartsAcePlayer === '') missing.push('Harten A');
    if (diamondsAcePlayer === '') missing.push('Ruiten A');
    if (clubsAcePlayer === '') missing.push('Klaveren A');
    setMissingDropdowns(missing);
  
    // Reset de lijst met ontbrekende dropdowns als alle dropdowns zijn ingevuld
    if (missing.length === 0) {
      setMissingDropdowns([]);
    }
  
    return missing.length === 0;
  };
  
  

  const handleSpadesAcePlayerChange = (e) => {
    const selectedPlayer = e.target.value;
    setSpadesAcePlayer(selectedPlayer);
  };

  const handleHeartsAcePlayerChange = (e) => {
    const selectedPlayer = e.target.value;
    setHeartsAcePlayer(selectedPlayer);
  };

  const handleDiamondsAcePlayerChange = (e) => {
    const selectedPlayer = e.target.value;
    setDiamondsAcePlayer(selectedPlayer);
  };

  const handleClubsAcePlayerChange = (e) => {
    const selectedPlayer = e.target.value;
    setClubsAcePlayer(selectedPlayer);
  };

  const addPointsForAces = () => {
    const updatedPlayers = players.map(player => {
      let scoreToAdd = 0;
      if (player.name === spadesAcePlayer || player.name === heartsAcePlayer || player.name === diamondsAcePlayer || player.name === clubsAcePlayer) {
        scoreToAdd += 1;
      }
      return {
        ...player,
        score: player.score + scoreToAdd
      };
    });

    setPlayers(updatedPlayers);
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
  <h2>Situaties:</h2>

  <div className='row'>
  <div className="col">
      <h5>Meeste kaarten:</h5>
      <Dropdown title="meeste kaarten" players={players} selectedPlayer={mostCardsPlayer} onChange={(e) => handleDropdownChange(e, setMostCardsPlayer, 'meeste kaarten')} missing={missingDropdowns.includes('meeste kaarten')} points={2} />
    </div>
    <div className="col">
      <h5>Meeste ♠kaarten:</h5>
      <Dropdown title="meeste schoppen" players={players} selectedPlayer={mostSpadesPlayer} onChange={(e) => handleDropdownChange(e, setMostSpadesPlayer, 'meeste schoppen')} missing={missingDropdowns.includes('meeste schoppen')} points={2} />
    </div>
  </div>
  <div className='row'>
    <div className="col">
      <h5>♦10 in bezit:</h5>
      <Dropdown title="♦10 in bezit" players={players} selectedPlayer={diamondsTenPlayer} onChange={(e) => handleDropdownChange(e, setDiamondsTenPlayer, '♦10 in bezit')} missing={missingDropdowns.includes('♦10 in bezit')} points={2} />
    </div>
    <div className="col">
      <h5>♠2 in bezit:</h5>
      <Dropdown title="♠2 in bezit" players={players} selectedPlayer={spadesTwoPlayer} onChange={(e) => handleDropdownChange(e, setSpadesTwoPlayer, '♠2 in bezit')} missing={missingDropdowns.includes('♠2 in bezit')} points={1} />
    </div>
  </div>

  <div className='row'>
    <div className="col">
      <h5>♠A:</h5>
      <Dropdown title="Schoppen A" players={players} selectedPlayer={spadesAcePlayer} onChange={(e) => handleDropdownChange(e, setSpadesAcePlayer, 'Schoppen A')} missing={missingDropdowns.includes('Schoppen A')} points={1} />
    </div>
    <div className="col">
      <h5>♥A:</h5>
      <Dropdown title="Harten A" players={players} selectedPlayer={heartsAcePlayer} onChange={(e) => handleDropdownChange(e, setHeartsAcePlayer, 'Harten A')} missing={missingDropdowns.includes('Harten A')} points={1} />
    </div>
  </div>
  <div className='row'>
    <div className="col">
      <h5>♦A:</h5>
      <Dropdown title="Ruiten A" players={players} selectedPlayer={diamondsAcePlayer} onChange={(e) => handleDropdownChange(e, setDiamondsAcePlayer, 'Ruiten A')} missing={missingDropdowns.includes('Ruiten A')} points={1} />
    </div>
    <div className="col">
      <h5>♣A:</h5>
      <Dropdown title="Klaveren A" players={players} selectedPlayer={clubsAcePlayer} onChange={(e) => handleDropdownChange(e, setClubsAcePlayer, 'Klaveren A')} missing={missingDropdowns.includes('Klaveren A')} points={1} />
    </div>
  </div>
  <button className="btn btn-success" onClick={addPointsToPlayer}>Volgende Ronde</button>
</div>
    </div>
  );
};

export default MainPage;
