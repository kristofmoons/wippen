# Wippen Score Tracker

A modern React app for tracking scores in the card game **Wippen**. Designed with a warm, pub/bar-inspired theme for a fun but mature look.

---

## Features

- **Multi-player support**: Track scores for 2–6 players
- **Round-by-round scoring**: Add and view detailed scores per round
- **Score chart**: Visualize cumulative scores with a color-coded line chart
- **Dark mode**: Toggle between light and dark themes (persisted in local storage)
- **Persistent state**: Players, rounds, and theme are saved in local storage
- **Responsive design**: Works on desktop and mobile (including iOS/Safari)
- **Easy reset**: Start a new game with one click

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm or yarn

### Installation

```bash
cd wippen
npm install
```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

---

## Project Structure

```
wippen/
├── public/                # Static assets and index.html
├── src/
│   ├── assets/
│   │   └── styles/        # App.css, DarkMode.css
│   ├── components/        # Reusable UI components
│   │   ├── Dropdown.js    # Custom styled dropdown select
│   │   ├── RoundModal.js  # Modal for viewing round details
│   │   ├── ScoreChart.js  # Line chart for score visualization
│   │   └── ScoreModal.js  # Modal for adding new round scores
│   ├── constants/
│   │   └── gameConfig.js  # Game rules, score config, player colors
│   ├── hooks/
│   │   └── useGame.js     # Custom hook for game state and local storage
│   ├── pages/
│   │   └── MainPage.js    # Main app page
│   ├── utils/
│   │   └── gameUtils.js   # Score calculation, validation, chart helpers
│   ├── App.js             # App root
│   ├── index.js           # Entry point
│   └── ...
├── package.json
└── README.md
```

---
