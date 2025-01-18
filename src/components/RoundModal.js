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
                                <th scope="col" className="text-center">
                                    Score
                                </th>
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
                            <li className="list-group-item">
                                Meeste kaarten: {selectedRound.details.mostCardsPlayer}
                            </li>
                            <li className="list-group-item">
                                Meeste ♠: {selectedRound.details.mostSpadesPlayer}
                            </li>
                            <li className="list-group-item">
                                ♦10: {selectedRound.details.diamondTenPlayer}
                            </li>
                            <li className="list-group-item">
                                ♠2: {selectedRound.details.spadeTwoPlayer}
                            </li>
                            <li className="list-group-item">
                                ♠A: {selectedRound.details.spadeAcePlayer}
                            </li>
                            <li className="list-group-item">
                                ♥A: {selectedRound.details.heartAcePlayer}
                            </li>
                            <li className="list-group-item">
                                ♦A: {selectedRound.details.diamondAcePlayer}
                            </li>
                            <li className="list-group-item">
                                ♣A: {selectedRound.details.clubAcePlayer}
                            </li>      
                        </ul>
                        <h6 className="mt-3 text-center">Whips:</h6>
                        <div className="list-group">
                            {selectedRound.details.whips.map((whip, index) => (
                                <div key={index} className="list-group-item">
                                    {whip.name}: {whip.whips}
                                </div>
                            ))}
                        </div>
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
