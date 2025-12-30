import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ScoreChart from "./ScoreChart";
import { ROUND_DETAILS_CONFIG } from "../constants/gameConfig";

/**
 * Modal component for viewing round history and score chart
 */
const RoundModal = ({
  show,
  handleClose,
  rounds,
  selectedRound,
  setSelectedRound,
}) => {
  const [showChart, setShowChart] = useState(true);

  // Reset to chart view when modal opens
  useEffect(() => {
    if (show) {
      setShowChart(true);
      setSelectedRound(null);
    }
  }, [show, setSelectedRound]);

  // Handle round selection change
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

  // Get display value for round detail
  const getDetailValue = (config) => {
    const value = selectedRound.details[config.key];
    if (config.isArray) {
      return Array.isArray(value) ? value.join(", ") : "";
    }
    return value || "-";
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Rondes Overzicht</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Round selector */}
        <div className="form-group">
          <label htmlFor="roundSelect">
            Selecteer een ronde of bekijk grafiek:
          </label>
          <select
            id="roundSelect"
            className="form-control"
            onChange={handleRoundChange}
            value={
              showChart
                ? "chart"
                : selectedRound
                ? rounds.indexOf(selectedRound)
                : ""
            }
          >
            <option value="chart">Score Verloop (Grafiek)</option>
            <option value="" disabled>
              --- Rondes ---
            </option>
            {rounds.map((_, index) => (
              <option key={index} value={index}>
                Ronde {index + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Chart view */}
        {showChart && (
          <div className="mt-4">
            {rounds.length > 0 ? (
              <ScoreChart rounds={rounds} />
            ) : (
              <div className="alert alert-info">
                Nog geen rondes beschikbaar voor de grafiek.
              </div>
            )}
          </div>
        )}

        {/* Round details view */}
        {!showChart && selectedRound?.players && (
          <div className="mt-4">
            <h5 className="text-center">Ronde Details</h5>

            {/* Players score table */}
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

            {/* Round details list */}
            <div className="mt-4">
              <h5 className="text-center">Details</h5>
              <ul className="list-group">
                {ROUND_DETAILS_CONFIG.map((config, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>{config.label}</span>
                    <span>{getDetailValue(config)}</span>
                  </li>
                ))}

                {/* Whips/bonus points */}
                <li className="list-group-item">
                  <h6 className="text-center">Wippen:</h6>
                  <div>
                    {selectedRound.details.whips?.length > 0 ? (
                      selectedRound.details.whips.map((whip, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between px-3"
                        >
                          <span>{whip.name}</span>
                          <span>{whip.points}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted text-center">
                        Geen bonus punten
                      </div>
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
