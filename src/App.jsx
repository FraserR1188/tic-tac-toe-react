import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function devriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = devriveActivePlayer(gameTurns);

  let gameBoard = [...intialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const winningCombination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[winningCombination[0].row][winningCombination[0].column];
    const secondSquareSymbol =
      gameBoard[winningCombination[1].row][winningCombination[1].column];
    const thirdSquareSymbol =
      gameBoard[winningCombination[2].row][winningCombination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      // setHasWinner(true);
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = devriveActivePlayer(prevTurns);

      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
    });
  }

  function handleResetGame() {
    setGameTurns([]);
    // setHasWinner(false);
    // setActivePlayer("X");
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onResetGame={handleResetGame} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
