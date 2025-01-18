import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "./Dropdown";

const ScoreModal = ({ show, handleClose, players, setPlayers, addRound }) => {
  const [mostCardsPlayer, setMostCardsPlayer] = useState(null);
  const [mostSpadesPlayer, setMostSpadesPlayer] = useState(null);
  const [diamondTenPlayer, setDiamondTenPlayer] = useState(null);
  const [spadeTwoPlayer, setSpadeTwoPlayer] = useState(null);
  const [spadeAcePlayer, setSpadeAcePlayer] = useState(null);
  const [heartAcePlayer, setHeartAcePlayer] = useState(null);
  const [diamondAcePlayer, setDiamondAcePlayer] = useState(null);
  const [clubAcePlayer, setClubAcePlayer] = useState(null);
  const [whips, setWhips] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (show) {
      setWhips(players.map((player) => ({ name: player.name, whips: 0 })));
      setMostCardsPlayer(null);
      setMostSpadesPlayer(null);
      setDiamondTenPlayer(null);
      setSpadeTwoPlayer(null);
      setSpadeAcePlayer(null);
      setHeartAcePlayer(null);
      setDiamondAcePlayer(null);
      setClubAcePlayer(null);
      setValidationErrors({});
    }
  }, [show, players]);

  const handleDropdownChange = (e, setter) => {
    const selectedPlayer = players.find(
      (player) => player.name === e.target.value
    );
    setter(selectedPlayer);
  };

  const handleWhipChange = (playerName, increment) => {
    setWhips((prevWhips) =>
      prevWhips.map((whip) =>
        whip.name === playerName
          ? { ...whip, whips: Math.max(0, whip.whips + increment) }
          : whip
      )
    );
  };

  const validateFields = () => {
    const errors = {};
    if (!mostCardsPlayer) errors.mostCardsPlayer = true;
    if (!mostSpadesPlayer) errors.mostSpadesPlayer = true;
    if (!diamondTenPlayer) errors.diamondTenPlayer = true;
    if (!spadeTwoPlayer) errors.spadeTwoPlayer = true;
    if (!spadeAcePlayer) errors.spadeAcePlayer = true;
    if (!heartAcePlayer) errors.heartAcePlayer = true;
    if (!diamondAcePlayer) errors.diamondAcePlayer = true;
    if (!clubAcePlayer) errors.clubAcePlayer = true;
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveScores = () => {
    if (!validateFields()) return;

    const updatedPlayers = players.map((player) => {
      let newScore = player.score;
      if (mostCardsPlayer && player.name === mostCardsPlayer.name) {
        newScore += 2;
      }
      if (mostSpadesPlayer && player.name === mostSpadesPlayer.name) {
        newScore += 2;
      }
      if (diamondTenPlayer && player.name === diamondTenPlayer.name) {
        newScore += 2;
      }
      if (spadeTwoPlayer && player.name === spadeTwoPlayer.name) {
        newScore += 1;
      }
      if (spadeAcePlayer && player.name === spadeAcePlayer.name) {
        newScore += 1;
      }
      if (heartAcePlayer && player.name === heartAcePlayer.name) {
        newScore += 1;
      }
      if (diamondAcePlayer && player.name === diamondAcePlayer.name) {
        newScore += 1;
      }
      if (clubAcePlayer && player.name === clubAcePlayer.name) {
        newScore += 1;
      }
      const playerWhip = whips.find((whip) => whip.name === player.name);
      if (playerWhip) {
        newScore += playerWhip.whips;
      }
      return { ...player, score: newScore };
    });

    const roundDetails = {
      mostCardsPlayer: mostCardsPlayer ? mostCardsPlayer.name : null,
      mostSpadesPlayer: mostSpadesPlayer ? mostSpadesPlayer.name : null,
      diamondTenPlayer: diamondTenPlayer ? diamondTenPlayer.name : null,
      spadeTwoPlayer: spadeTwoPlayer ? spadeTwoPlayer.name : null,
      spadeAcePlayer: spadeAcePlayer ? spadeAcePlayer.name : null,
      heartAcePlayer: heartAcePlayer ? heartAcePlayer.name : null,
      diamondAcePlayer: diamondAcePlayer ? diamondAcePlayer.name : null,
      clubAcePlayer: clubAcePlayer ? clubAcePlayer.name : null,
      whips: whips.filter((whip) => whip.whips > 0),
    };

    setPlayers(updatedPlayers);
    addRound({ players: updatedPlayers, details: roundDetails });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Score toevoegen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mt-4">
          <div className="row">
            <div className="col">
              <Dropdown
                title="meeste kaarten:"
                players={players}
                selectedPlayer={mostCardsPlayer ? mostCardsPlayer.name : ""}
                onChange={(e) => handleDropdownChange(e, setMostCardsPlayer)}
                className={validationErrors.mostCardsPlayer ? "is-invalid" : ""}
              />
            </div>
            <div className="col">
              <Dropdown
                title="meeste ♠:"
                players={players}
                selectedPlayer={mostSpadesPlayer ? mostSpadesPlayer.name : ""}
                onChange={(e) => handleDropdownChange(e, setMostSpadesPlayer)}
                className={
                  validationErrors.mostSpadesPlayer ? "is-invalid" : ""
                }
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <Dropdown
                title="♦10 in bezit:"
                players={players}
                selectedPlayer={diamondTenPlayer ? diamondTenPlayer.name : ""}
                onChange={(e) => handleDropdownChange(e, setDiamondTenPlayer)}
                className={
                  validationErrors.diamondTenPlayer ? "is-invalid" : ""
                }
              />
            </div>
            <div className="col">
              <Dropdown
                title="♠2 in bezit:"
                players={players}
                selectedPlayer={spadeTwoPlayer ? spadeTwoPlayer.name : ""}
                onChange={(e) => handleDropdownChange(e, setSpadeTwoPlayer)}
                className={validationErrors.spadeTwoPlayer ? "is-invalid" : ""}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <Dropdown
                title="♠A in bezit:"
                players={players}
                selectedPlayer={spadeAcePlayer ? spadeAcePlayer.name : ""}
                onChange={(e) => handleDropdownChange(e, setSpadeAcePlayer)}
                className={validationErrors.spadeAcePlayer ? "is-invalid" : ""}
              />
            </div>
            <div className="col">
              <Dropdown
                title="♥A in bezit:"
                players={players}
                selectedPlayer={heartAcePlayer ? heartAcePlayer.name : ""}
                onChange={(e) => handleDropdownChange(e, setHeartAcePlayer)}
                className={validationErrors.heartAcePlayer ? "is-invalid" : ""}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <Dropdown
                title="♦A in bezit:"
                players={players}
                selectedPlayer={diamondAcePlayer ? diamondAcePlayer.name : ""}
                onChange={(e) => handleDropdownChange(e, setDiamondAcePlayer)}
                className={
                  validationErrors.diamondAcePlayer ? "is-invalid" : ""
                }
              />
            </div>
            <div className="col">
              <Dropdown
                title="♣A in bezit:"
                players={players}
                selectedPlayer={clubAcePlayer ? clubAcePlayer.name : ""}
                onChange={(e) => handleDropdownChange(e, setClubAcePlayer)}
                className={validationErrors.clubAcePlayer ? "is-invalid" : ""}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <h5>Whips:</h5>
              {players.map((player, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center border-bottom py-2"
                >
                  <div className="d-flex align-items-center ms-3">
                    <span className="font-weight-bold me-3">{player.name}</span>
                    <span className="text-muted ml-3">
                      (
                      {whips.find((whip) => whip.name === player.name)?.whips ||
                        0}
                      )
                    </span>
                  </div>
                  <div className="me-3">
                    <button
                      className="btn btn-outline-danger btn-sm mx-3"
                      onClick={() => handleWhipChange(player.name, -1)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-outline-success btn-sm mx-1"
                      onClick={() => handleWhipChange(player.name, 1)}
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