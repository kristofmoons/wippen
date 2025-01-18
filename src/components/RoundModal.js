import React from "react";
import Modal from "react-bootstrap/Modal";

const RoundModal = ({
  show,
  handleClose,
  rounds,
  selectedRound,
  setSelectedRound,
}) => {
  const handleRoundChange = (e) => {
    const roundIndex = parseInt(e.target.value, 10);
    setSelectedRound(rounds[roundIndex]);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bekijk Ronde</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="roundSelect">Selecteer een ronde:</label>
          <select
            id="roundSelect"
            className="form-control"
            onChange={handleRoundChange}
          >
            <option value="">Selecteer een ronde</option>
            {rounds.map((round, index) => (
              <option key={index} value={index}>
                Ronde {index + 1}
              </option>
            ))}
          </select>
        </div>
        {selectedRound && selectedRound.players && (
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