import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { TbCardsFilled } from "react-icons/tb";
import { GiSpades } from "react-icons/gi";
import Dropdown from "./Dropdown";
import { useRoundSelections } from "../hooks/useGame";
import { SPECIAL_CARDS } from "../constants/gameConfig";
import {
  calculatePlayerScore,
  createRoundDetails,
  validateSelections,
} from "../utils/gameUtils";

/**
 * Modal component for adding scores at the end of each round
 */
const ScoreModal = ({ show, handleClose, players, setPlayers, addRound }) => {
  const {
    selections,
    bonusPoints,
    validationErrors,
    setValidationErrors,
    resetSelections,
    handleDropdownChange,
    handleMultiSelectChange,
    togglePlayerInArray,
    handleBonusPointsChange,
  } = useRoundSelections(players);

  // Reset selections when modal opens
  useEffect(() => {
    if (show) {
      resetSelections();
    }
  }, [show, resetSelections]);

  // Convert players to Select options
  const playerOptions = players.map((p) => ({ value: p.name, label: p.name }));

  // Handle save scores
  const handleSaveScores = () => {
    const errors = validateSelections(selections);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // Calculate new scores for all players
    const updatedPlayers = players.map((player) => ({
      ...player,
      score: calculatePlayerScore(player, selections, bonusPoints),
    }));

    // Create and save round details
    const roundDetails = createRoundDetails(
      updatedPlayers,
      selections,
      bonusPoints
    );
    setPlayers(updatedPlayers);
    addRound(roundDetails);
    handleClose();
  };

  // Check if player is selected in multi-select
  const isPlayerSelected = (player, fieldName) => {
    return selections[fieldName].some((p) => p.name === player.name);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Score toevoegen</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="text-center mt-4">
          {/* Multi-select rows */}
          <div className="row">
            <div className="col">
              <label className="form-label">Meeste kaarten:</label>
              <Select
                isMulti
                name="mostCardsPlayers"
                options={playerOptions}
                className={`basic-multi-select ${
                  validationErrors.mostCardsPlayers ? "is-invalid" : ""
                }`}
                classNamePrefix="select"
                value={selections.mostCardsPlayers.map((p) => ({
                  value: p.name,
                  label: p.name,
                }))}
                onChange={(selected) =>
                  handleMultiSelectChange(selected, "mostCardsPlayers")
                }
                placeholder="Selecteer..."
              />
            </div>
            <div className="col">
              <label className="form-label">Meeste ♠:</label>
              <Select
                isMulti
                name="mostSpadesPlayers"
                options={playerOptions}
                className={`basic-multi-select ${
                  validationErrors.mostSpadesPlayers ? "is-invalid" : ""
                }`}
                classNamePrefix="select"
                value={selections.mostSpadesPlayers.map((p) => ({
                  value: p.name,
                  label: p.name,
                }))}
                onChange={(selected) =>
                  handleMultiSelectChange(selected, "mostSpadesPlayers")
                }
                placeholder="Selecteer..."
              />
            </div>
          </div>

          {/* Special cards dropdowns - rendered in pairs */}
          {[0, 2, 4].map((startIndex) => (
            <div className="row mt-2" key={startIndex}>
              {SPECIAL_CARDS.slice(startIndex, startIndex + 2).map((card) => (
                <div className="col" key={card.id}>
                  <Dropdown
                    id={card.id}
                    title={card.label}
                    players={players}
                    selectedPlayer={selections[`${card.id}Player`]?.name || ""}
                    onChange={(e) => handleDropdownChange(e, `${card.id}Player`)}
                    className={
                      validationErrors[`${card.id}Player`] ? "is-invalid" : ""
                    }
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Bonus points section */}
          <div className="row mt-4">
            <div className="col">
              <h5>Bonus Points (Wippen):</h5>
              {players.map((player, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center border-bottom py-2"
                >
                  {/* Player name and current bonus */}
                  <div className="d-flex align-items-center ms-3">
                    <span className="font-weight-bold me-3">{player.name}</span>
                    <span className="text-muted">
                      ({bonusPoints.find((p) => p.name === player.name)?.points || 0})
                    </span>
                  </div>

                  {/* Quick select buttons for most cards/spades */}
                  <div className="me-3">
                    <button
                      type="button"
                      className={`btn btn-outline-dark btn-sm mx-1 ${
                        isPlayerSelected(player, "mostCardsPlayers") ? "active" : ""
                      }`}
                      onClick={() => togglePlayerInArray(player, "mostCardsPlayers")}
                      title="Meeste kaarten"
                    >
                      <TbCardsFilled />
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline-dark btn-sm mx-1 ${
                        isPlayerSelected(player, "mostSpadesPlayers") ? "active" : ""
                      }`}
                      onClick={() => togglePlayerInArray(player, "mostSpadesPlayers")}
                      title="Meeste schoppen"
                    >
                      <GiSpades />
                    </button>
                  </div>

                  {/* Bonus points increment/decrement */}
                  <div className="me-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm mx-1"
                      onClick={() => handleBonusPointsChange(player.name, -1)}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm mx-1"
                      onClick={() => handleBonusPointsChange(player.name, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Sluiten
        </button>
        <button className="btn btn-danger" onClick={handleSaveScores}>
          Voeg scores toe
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScoreModal;
