/**
 * Game configuration constants for Wippen Score Tracker
 */

// Card definitions with their scoring values
export const SPECIAL_CARDS = [
  { id: 'diamondTen', label: '♦10 in bezit:', points: 2 },
  { id: 'spadeTwo', label: '♠2 in bezit:', points: 1 },
  { id: 'spadeAce', label: '♠A in bezit:', points: 1 },
  { id: 'heartAce', label: '♥A in bezit:', points: 1 },
  { id: 'diamondAce', label: '♦A in bezit:', points: 1 },
  { id: 'clubAce', label: '♣A in bezit:', points: 1 },
];

// Multi-select categories (most cards, most spades)
export const MULTI_SELECT_CATEGORIES = [
  { id: 'mostCards', label: 'Meeste kaarten:', pointsSingle: 2, pointsShared: 1 },
  { id: 'mostSpades', label: 'Meeste ♠:', pointsSingle: 2, pointsShared: 1 },
];

// Round details display configuration
export const ROUND_DETAILS_CONFIG = [
  { key: 'mostCardsPlayers', label: 'Meeste kaarten:', isArray: true },
  { key: 'mostSpadesPlayers', label: 'Meeste ♠:', isArray: true },
  { key: 'diamondTenPlayer', label: '♦10:', isArray: false },
  { key: 'spadeTwoPlayer', label: '♠2:', isArray: false },
  { key: 'spadeAcePlayer', label: '♠A:', isArray: false },
  { key: 'heartAcePlayer', label: '♥A:', isArray: false },
  { key: 'diamondAcePlayer', label: '♦A:', isArray: false },
  { key: 'clubAcePlayer', label: '♣A:', isArray: false },
];

// Local storage keys
export const STORAGE_KEYS = {
  PLAYERS: 'wippen_players',
  ROUNDS: 'wippen_rounds',
  DARK_MODE: 'wippen_darkMode',
};

// Default values
export const DEFAULTS = {
  PLAYER_SCORE: 0,
  BONUS_POINTS: 0,
};
