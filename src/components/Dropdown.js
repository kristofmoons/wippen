import React from 'react';

/**
 * Reusable dropdown component for player selection
 */
const Dropdown = ({ title, players, selectedPlayer, onChange, className, id }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{title}</label>
      <select
        id={id}
        className={`form-control ${className || ''}`}
        value={selectedPlayer || ''}
        onChange={onChange}
      >
        <option value="">Selecteer...</option>
        {players.map((player, index) => (
          <option key={index} value={player.name}>
            {player.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;