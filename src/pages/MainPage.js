import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ScoreModal from "../components/ScoreModal";
import RoundModal from "../components/RoundModal";
import { FaMoon, FaSun } from "react-icons/fa"; 
import "../assets/styles/DarkMode.css"; 

const MainPage = () => {
  const [players, setPlayers] = useState([]);
  const [playerNameError, setPlayerNameError] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const addPlayer = (name) => {
    if (name.trim() === "") {
      setPlayerNameError(true);
      return;
    }

    setPlayerNameError(false);

    setPlayers((prevPlayers) => {
      if (prevPlayers.some((player) => player.name === name.trim())) {
        setPlayerNameError(true);
        return prevPlayers;
      }

      return [...prevPlayers, { name: name.trim(), score: 0 }];
    });
  };

  const restartGame = () => {
    setPlayers([]);
    setRounds([]);
  };

  const handleShowScoreModal = () => {
    setShowScoreModal(true);
  };

  const handleCloseScoreModal = () => {
    setShowScoreModal(false);
  };

  const handleShowRoundModal = () => {
    setShowRoundModal(true);
  };

  const handleCloseRoundModal = () => {
    setShowRoundModal(false);
  };

  const addRound = (roundDetails) => {
    setRounds((prevRounds) => [...prevRounds, roundDetails]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Wippen Score Tracker</h1>
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Score Board</h5>
            <div>
              <button className="btn btn-outline-dark me-2" onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <button className="btn btn-outline-danger" onClick={restartGame}>
                Restart Game
              </button>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const playerName = e.target.elements.playerName.value;
              addPlayer(playerName);
              e.target.elements.playerName.value = "";
            }}
          >
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${playerNameError ? "is-invalid" : ""}`}
                name="playerName"
                placeholder="Voeg speler toe"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  Toevoegen
                </button>
              </div>
              {playerNameError && (
                <div className="invalid-feedback">
                  Voer een geldige naam in voor de speler.
                </div>
              )}
            </div>
          </form>
          <div className="card-body">
            {players.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Naam</th>
                    <th scope="col" className="text-center">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={index}>
                      <td>{player.name}</td>
                      <td className="text-center">{player.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No players added yet.</p>
            )}
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={handleShowRoundModal}>
              Bekijk Rondes
            </button>
            <button className="btn btn-primary" onClick={handleShowScoreModal}>
              Volgende Ronde
            </button>
          </div>
        </div>
        <ScoreModal
          show={showScoreModal}
          handleClose={handleCloseScoreModal}
          players={players}
          setPlayers={setPlayers}
          addRound={addRound}
        />
        <RoundModal
          show={showRoundModal}
          handleClose={handleCloseRoundModal}
          rounds={rounds}
          selectedRound={selectedRound}
          setSelectedRound={setSelectedRound}
        />
      </div>
    </div>
  );
};

export default MainPage;