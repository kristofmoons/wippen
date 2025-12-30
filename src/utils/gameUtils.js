/**
 * Utility functions for Wippen Score Tracker
 */

// Distinct colors for player lines - easy to distinguish
const PLAYER_COLORS = [
  '#3498db', // Blue
  '#2ecc71', // Green
  '#e74c3c', // Red
  '#f39c12', // Orange
  '#9b59b6', // Purple
  '#1abc9c', // Teal
  '#e91e63', // Pink
  '#00bcd4', // Cyan
  '#ff5722', // Deep Orange
  '#8bc34a', // Light Green
  '#673ab7', // Deep Purple
  '#ffeb3b', // Yellow
];

/**
 * Get color for a player based on their index
 * @param {number} index - Player index
 * @returns {string} - Hex color code
 */
export const getPlayerColor = (index) => {
  return PLAYER_COLORS[index % PLAYER_COLORS.length];
};

/**
 * Generate a deterministic color based on a string (player name)
 * @param {string} name - The string to generate color from
 * @returns {string} - Hex color code
 * @deprecated Use getPlayerColor with index instead
 */
export const generateColorFromName = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase().padStart(6, '0');
  return `#${c}`;
};

/**
 * Calculate score for a player based on round selections
 * @param {Object} player - Player object
 * @param {Object} selections - All selections for the round
 * @param {Array} bonusPoints - Bonus points array
 * @returns {number} - New total score
 */
export const calculatePlayerScore = (player, selections, bonusPoints) => {
  let newScore = player.score;

  // Most cards points
  if (selections.mostCardsPlayers.some((p) => p.name === player.name)) {
    newScore += selections.mostCardsPlayers.length > 1 ? 1 : 2;
  }

  // Most spades points
  if (selections.mostSpadesPlayers.some((p) => p.name === player.name)) {
    newScore += selections.mostSpadesPlayers.length > 1 ? 1 : 2;
  }

  // Special cards points
  const cardPoints = {
    diamondTenPlayer: 2,
    spadeTwoPlayer: 1,
    spadeAcePlayer: 1,
    heartAcePlayer: 1,
    diamondAcePlayer: 1,
    clubAcePlayer: 1,
  };

  Object.entries(cardPoints).forEach(([cardKey, points]) => {
    if (selections[cardKey]?.name === player.name) {
      newScore += points;
    }
  });

  // Bonus (whip) points
  const playerBonus = bonusPoints.find((point) => point.name === player.name);
  if (playerBonus) {
    newScore += playerBonus.points;
  }

  return newScore;
};

/**
 * Create round details object from selections
 * @param {Array} updatedPlayers - Players with updated scores
 * @param {Object} selections - All selections for the round
 * @param {Array} bonusPoints - Bonus points array
 * @returns {Object} - Round details object
 */
export const createRoundDetails = (updatedPlayers, selections, bonusPoints) => {
  return {
    players: updatedPlayers,
    details: {
      mostCardsPlayers: selections.mostCardsPlayers.map((p) => p.name),
      mostSpadesPlayers: selections.mostSpadesPlayers.map((p) => p.name),
      diamondTenPlayer: selections.diamondTenPlayer?.name || null,
      spadeTwoPlayer: selections.spadeTwoPlayer?.name || null,
      spadeAcePlayer: selections.spadeAcePlayer?.name || null,
      heartAcePlayer: selections.heartAcePlayer?.name || null,
      diamondAcePlayer: selections.diamondAcePlayer?.name || null,
      clubAcePlayer: selections.clubAcePlayer?.name || null,
      whips: bonusPoints.filter((point) => point.points > 0),
    },
  };
};

/**
 * Validate round selections
 * @param {Object} selections - All selections for the round
 * @returns {Object} - Validation errors object
 */
export const validateSelections = (selections) => {
  const errors = {};

  if (selections.mostCardsPlayers.length === 0) errors.mostCardsPlayers = true;
  if (selections.mostSpadesPlayers.length === 0) errors.mostSpadesPlayers = true;
  if (!selections.diamondTenPlayer) errors.diamondTenPlayer = true;
  if (!selections.spadeTwoPlayer) errors.spadeTwoPlayer = true;
  if (!selections.spadeAcePlayer) errors.spadeAcePlayer = true;
  if (!selections.heartAcePlayer) errors.heartAcePlayer = true;
  if (!selections.diamondAcePlayer) errors.diamondAcePlayer = true;
  if (!selections.clubAcePlayer) errors.clubAcePlayer = true;

  return errors;
};

/**
 * Get initial selections state
 * @returns {Object} - Initial selections state
 */
export const getInitialSelections = () => ({
  mostCardsPlayers: [],
  mostSpadesPlayers: [],
  diamondTenPlayer: null,
  spadeTwoPlayer: null,
  spadeAcePlayer: null,
  heartAcePlayer: null,
  diamondAcePlayer: null,
  clubAcePlayer: null,
});

/**
 * Prepare chart data from rounds
 * @param {Array} rounds - Array of round objects
 * @returns {Object} - Chart data object
 */
export const prepareChartData = (rounds) => {
  if (rounds.length === 0) {
    return { labels: [], datasets: [] };
  }

  const playerData = {};
  const playerNames = [];

  // First pass: collect all unique player names to assign consistent colors
  rounds.forEach((round) => {
    round.players.forEach((player) => {
      if (!playerNames.includes(player.name)) {
        playerNames.push(player.name);
      }
    });
  });

  // Second pass: build player data with index-based colors
  rounds.forEach((round, roundIndex) => {
    round.players.forEach((player) => {
      if (!playerData[player.name]) {
        const playerIndex = playerNames.indexOf(player.name);
        playerData[player.name] = {
          scores: Array(rounds.length).fill(0),
          color: getPlayerColor(playerIndex),
        };
      }
      playerData[player.name].scores[roundIndex] = player.score;
    });
  });

  return {
    labels: rounds.map((_, index) => `Ronde ${index + 1}`),
    datasets: Object.entries(playerData).map(([name, data]) => ({
      label: name,
      data: data.scores,
      borderColor: data.color,
      backgroundColor: `${data.color}33`,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 8,
    })),
  };
};
