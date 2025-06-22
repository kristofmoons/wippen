import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ScoreChart from "./ScoreChart";

const RoundModal = ({
  show,
  handleClose,
  rounds,
  selectedRound,
  setSelectedRound,
}) => {
  const [showChart, setShowChart] = useState(true);

  const handleRoundChange = (e) => {
    const value = e.target.value;
    
    if (value === "chart") {
      setShowChart(true);
      setSelectedRound(null);
    } else {
      setShowChart(false);
      const roundIndex = parseInt(value, 10);
      setSelectedRound(rounds[roundIndex]);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Rondes Overzicht</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="roundSelect">Selecteer een ronde of bekijk grafiek:</label>
          <select
            id="roundSelect"
            className="form-control"
            onChange={handleRoundChange}
            value={showChart ? "chart" : selectedRound ? rounds.indexOf(selectedRound) : ""}
          >
            <option value="chart">Score Verloop (Grafiek)</option>
            <option value="" disabled>--- Rondes ---</option>
            {rounds.map((round, index) => (
              <option key={index} value={index}>
                Ronde {index + 1}
              </option>
            ))}
          </select>
        </div>

        {showChart ? (
          <div className="mt-4">
            {rounds.length > 0 ? (
              <ScoreChart rounds={rounds} />
            ) : (
              <div className="alert alert-info">Nog geen rondes beschikbaar voor de grafiek.</div>
            )}
          </div>
        ) : (
          selectedRound && selectedRound.players && (
            <div className="mt-4">
              <h5 className="text-center">Ronde Details</h5>
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Naam</th>
                    <th scope="col" className="text-center">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRound.players.map((player, index) => (
                    <tr key={index}>
                      <td>{player.name}</td>
                      <td className="text-center">{player.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
              <h5 className="text-center">Details</h5>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Meeste kaarten:</span>
                  <span>{selectedRound.details.mostCardsPlayers.join(', ')}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Meeste ♠:</span>
                  <span>{selectedRound.details.mostSpadesPlayers.join(', ')}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>♦10:</span>
                  <span>{selectedRound.details.diamondTenPlayer}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>♠2:</span>
                  <span>{selectedRound.details.spadeTwoPlayer}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>♠A:</span>
                  <span>{selectedRound.details.spadeAcePlayer}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>♥A:</span>
                  <span>{selectedRound.details.heartAcePlayer}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>♦A:</span>
                  <span>{selectedRound.details.diamondAcePlayer}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>♣A:</span>
                  <span>{selectedRound.details.clubAcePlayer}</span>
                </li>
                <li className="list-group-item">
                  <h6 className="text-center">Wippen:</h6>
                  <div>
                    {selectedRound.details.whips && selectedRound.details.whips.length > 0 ? (
                      selectedRound.details.whips.map((whip, index) => (
                        <div key={index} className="list-group-item">
                          {whip.name}: {whip.points}
                        </div>
                      ))
                    ) : (
                      <div>No bonus points available</div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
            </div>
          )
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Sluiten
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoundModal;