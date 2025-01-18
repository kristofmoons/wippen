import React from 'react';

const Dropdown = ({ title, players, selectedPlayer, onChange, className }) => {
  return (
    <div className="form-group">
      <label>{title}</label>
      <select className={`form-control ${className}`} value={selectedPlayer} onChange={onChange}>
        <option value=""></option>
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