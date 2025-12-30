import { useState, useCallback } from 'react';
import { getInitialSelections } from '../utils/gameUtils';

/**
 * Custom hook for managing round selections in ScoreModal
 * @param {Array} players - Array of player objects
 * @returns {Object} - Selection state and handlers
 */
export const useRoundSelections = (players) => {
  const [selections, setSelections] = useState(getInitialSelections());
  const [bonusPoints, setBonusPoints] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  // Reset all selections
  const resetSelections = useCallback(() => {
    setSelections(getInitialSelections());
    setBonusPoints(players.map((player) => ({ name: player.name, points: 0 })));
    setValidationErrors({});
  }, [players]);

  // Handle dropdown change for single player selection
  const handleDropdownChange = useCallback((e, fieldName) => {
    const selectedPlayer = players.find((player) => player.name === e.target.value);
    setSelections((prev) => ({ ...prev, [fieldName]: selectedPlayer || null }));
  }, [players]);

  // Handle multi-select change
  const handleMultiSelectChange = useCallback((selectedOptions, fieldName) => {
    if (!selectedOptions) {
      setSelections((prev) => ({ ...prev, [fieldName]: [] }));
      return;
    }
    const selectedPlayers = selectedOptions
      .map((option) => players.find((player) => player.name === option.value))
      .filter(Boolean);
    setSelections((prev) => ({ ...prev, [fieldName]: selectedPlayers }));
  }, [players]);

  // Toggle player in multi-select array (for button clicks)
  const togglePlayerInArray = useCallback((player, fieldName) => {
    setSelections((prev) => {
      const currentArray = prev[fieldName];
      const isSelected = currentArray.some((p) => p.name === player.name);
      
      return {
        ...prev,
        [fieldName]: isSelected
          ? currentArray.filter((p) => p.name !== player.name)
          : [...currentArray, player],
      };
    });
  }, []);

  // Handle bonus points change
  const handleBonusPointsChange = useCallback((playerName, increment) => {
    setBonusPoints((prevPoints) =>
      prevPoints.map((point) =>
        point.name === playerName
          ? { ...point, points: Math.max(0, point.points + increment) }
          : point
      )
    );
  }, []);

  return {
    selections,
    bonusPoints,
    validationErrors,
    setValidationErrors,
    resetSelections,
    handleDropdownChange,
    handleMultiSelectChange,
    togglePlayerInArray,
    handleBonusPointsChange,
  };
};

/**
 * Custom hook for managing game state
 * @param {Function} setPlayers - State setter for players
 * @param {Function} setRounds - State setter for rounds
 * @returns {Object} - Game state handlers
 */
export const useGameActions = (setPlayers, setRounds) => {
  const [playerNameError, setPlayerNameError] = useState(false);

  // Add a new player
  const addPlayer = useCallback((name) => {
    if (name.trim() === '') {
      setPlayerNameError(true);
      return false;
    }

    setPlayerNameError(false);

    let isDuplicate = false;
    setPlayers((prevPlayers) => {
      if (prevPlayers.some((player) => player.name === name.trim())) {
        isDuplicate = true;
        return prevPlayers;
      }
      return [...prevPlayers, { name: name.trim(), score: 0 }];
    });

    if (isDuplicate) {
      setPlayerNameError(true);
      return false;
    }

    return true;
  }, [setPlayers]);

  // Restart the game
  const restartGame = useCallback(() => {
    if (window.confirm('Weet je zeker dat je het spel wilt herstarten? Alle scores worden gewist.')) {
      setPlayers([]);
      setRounds([]);
      return true;
    }
    return false;
  }, [setPlayers, setRounds]);

  // Add a new round
  const addRound = useCallback((roundDetails) => {
    setRounds((prevRounds) => [...prevRounds, roundDetails]);
  }, [setRounds]);

  return {
    playerNameError,
    addPlayer,
    restartGame,
    addRound,
  };
};

/**
 * Custom hook for managing modal visibility
 * @returns {Object} - Modal state and handlers
 */
export const useModals = () => {
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);

  const openScoreModal = useCallback(() => setShowScoreModal(true), []);
  const closeScoreModal = useCallback(() => setShowScoreModal(false), []);
  const openRoundModal = useCallback(() => setShowRoundModal(true), []);
  const closeRoundModal = useCallback(() => setShowRoundModal(false), []);

  return {
    showScoreModal,
    showRoundModal,
    selectedRound,
    setSelectedRound,
    openScoreModal,
    closeScoreModal,
    openRoundModal,
    closeRoundModal,
  };
};
