import React from 'react';

const Dropdown = ({ title, players, selectedPlayer, onChange, missing }) => {
  return (
    <div className="mb-2">
      <select className={`form-control ${missing && !selectedPlayer ? 'border border-danger' : ''}`} value={selectedPlayer} onChange={onChange}>
        <option value="">{``}</option>
        {players.map((player, index) => (
          <option key={index} value={player.name}>{player.name}</option>
        ))}
      </select>
      {missing && !selectedPlayer && <div className="text-danger">{`Selecteer een speler voor ${title}`}</div>}
    </div>
  );
};

export default Dropdown;
