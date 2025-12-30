import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMoon, FaSun } from 'react-icons/fa';
import useLocalStorageState from 'use-local-storage-state';

import ScoreModal from '../components/ScoreModal';
import RoundModal from '../components/RoundModal';
import { useGameActions, useModals } from '../hooks/useGame';
import { STORAGE_KEYS } from '../constants/gameConfig';
import '../assets/styles/App.css';
import '../assets/styles/DarkMode.css';

/**
 * Get system dark mode preference
 */
const getSystemDarkModePreference = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Main page component for Wippen Score Tracker
 */
const MainPage = () => {
  // Persistent state (localStorage)
  const [players, setPlayers] = useLocalStorageState(STORAGE_KEYS.PLAYERS, { defaultValue: [] });
  const [rounds, setRounds] = useLocalStorageState(STORAGE_KEYS.ROUNDS, { defaultValue: [] });
  const [darkMode, setDarkMode] = useLocalStorageState(STORAGE_KEYS.DARK_MODE, {
    defaultValue: getSystemDarkModePreference(),
  });

  // Game actions
  const { playerNameError, addPlayer, restartGame, addRound } = useGameActions(setPlayers, setRounds);

  // Modal state
  const {
    showScoreModal,
    showRoundModal,
    selectedRound,
    setSelectedRound,
    openScoreModal,
    closeScoreModal,
    openRoundModal,
    closeRoundModal,
  } = useModals();

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Handle player form submission
  const handleAddPlayer = (e) => {
    e.preventDefault();
    const input = e.target.elements.playerName;
    if (addPlayer(input.value)) {
      input.value = '';
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Wippen Score Tracker</h1>

        <div className="card">
          {/* Header */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Score Board</h5>
            <div>
              <button
                className="btn btn-outline-dark me-2"
                onClick={toggleDarkMode}
                aria-label={darkMode ? 'Light mode' : 'Dark mode'}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <button className="btn btn-outline-danger" onClick={restartGame}>
                Restart Game
              </button>
            </div>
          </div>

          {/* Add player form */}
          <form onSubmit={handleAddPlayer}>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${playerNameError ? 'is-invalid' : ''}`}
                name="playerName"
                placeholder="Voeg speler toe"
                autoComplete="off"
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

          {/* Players table */}
          <div className="card-body">
            {players.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Naam</th>
                    <th scope="col" className="text-center">Score</th>
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
              <p className="text-center text-muted">Nog geen spelers toegevoegd.</p>
            )}
          </div>

          {/* Footer buttons */}
          <div className="card-footer d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={openRoundModal}>
              Bekijk Rondes
            </button>
            <button
              className="btn btn-primary"
              onClick={openScoreModal}
              disabled={players.length < 2}
            >
              Volgende Ronde
            </button>
          </div>
        </div>

        {/* Modals */}
        <ScoreModal
          show={showScoreModal}
          handleClose={closeScoreModal}
          players={players}
          setPlayers={setPlayers}
          addRound={addRound}
        />

        <RoundModal
          show={showRoundModal}
          handleClose={closeRoundModal}
          rounds={rounds}
          selectedRound={selectedRound}
          setSelectedRound={setSelectedRound}
        />
      </div>
    </div>
  );
};

export default MainPage;