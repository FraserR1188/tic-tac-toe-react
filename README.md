# Tic-Tac-Toe React App

A simple two-player Tic-Tac-Toe game built with React.

This project allows two players to edit their names, take turns placing `X` and `O`, view a move log, detect a winner or draw, and restart the game with a rematch button.

## Features

- Two-player Tic-Tac-Toe gameplay
- Editable player names
- Active player highlighting
- Dynamic game board rendering
- Move log / turn history
- Automatic winner detection
- Draw detection
- Rematch / reset functionality

## Tech Stack

- React
- JavaScript (ES6+)
- JSX
- CSS

## Project Structure

src/\
├── components/\
│ ├── GameBoard.jsx\
│ ├── GameOver.jsx\
│ ├── Log.jsx\
│ └── Player.jsx\
├── App.jsx\
└── winning-combinations.js

## Component Overview

### `App.jsx`

This is the main component and contains the core game logic.

Responsibilities:

- stores player names in state
- stores game turns in state
- derives the active player from turn history
- rebuilds the game board from the turn list
- checks for winning combinations
- checks for draws
- handles square selection
- handles player name updates
- handles game reset

### `Player.jsx`

Responsible for displaying and editing each player's name.

Features:

- toggles between display mode and edit mode
- saves the updated player name
- highlights the active player

### `GameBoard.jsx`

Responsible for rendering the 3x3 board.

Features:

- displays buttons for each square
- triggers square selection on click
- disables squares that have already been played

### `Log.jsx`

Displays the move history for the game.

Features:

- shows which player selected which square
- updates live as turns are added

### `GameOver.jsx`

Displayed when the game finishes.

Features:

- shows the winning player or a draw message
- provides a rematch button to reset the game

## How the Game Works

The game does **not** store the board directly in state.

Instead, it stores a list of turns and derives the board from that history.

### Turn State

Each turn is stored as an object like this:

{\
 square: { row: 0, col: 1 },\
 player: "X"\
}

### Active Player

The active player is derived from the existing turn list rather than tracked separately.

### Board Reconstruction

On each render, the app:

1.  creates a fresh empty board
2.  loops through all recorded turns
3.  fills in the board with the appropriate player symbols

This keeps the turn history as the main source of truth.

## Winner Detection

Winner detection is handled using the predefined combinations in `winning-combinations.js`.

The app checks whether any valid row, column, or diagonal contains the same non-null symbol.

If so, the corresponding player is declared the winner.

## Draw Detection

A draw is declared when:

- all 9 turns have been played
- no winner has been found

## Important Implementation Note

When storing selected squares, the square object must use consistent property names:

square: { row: rowIndex, col: colIndex }

This matters because the board reconstruction logic expects:

const { row, col } = square;

If mismatched names such as `rowIndex` are stored in state but `row` is expected later, rendering will break.

## Getting Started

### 1\. Clone the repository

git clone <your-repo-url>\
cd <your-project-folder>

### 2\. Install dependencies

npm install

### 3\. Start the development server

npm run dev

Then open the local development URL shown in your terminal.

## Available Scripts

npm run dev\
npm run build\
npm run preview

## Example Logic Flow

### Selecting a Square

When a user clicks a square:

1.  the row and column are passed to the click handler
2.  the current active player is derived
3.  a new turn object is added to the turn history
4.  the board is rebuilt from the updated history
5.  the app checks for a winner or draw

## Suggested Improvements

Possible future enhancements:

- prevent moves after game over
- highlight the winning combination
- add score tracking between rounds
- add single-player mode
- add AI opponent
- improve styling and animations
- display player names in the move log instead of only `X` / `O`

## Known Notes / Cleanup Opportunities

A few areas that could be improved in the current codebase:

- rename `intialGameBoard` to `initialGameBoard`
- rename `devriveActivePlayer` to `deriveActivePlayer`
- ensure square coordinates always use `row` and `col`
- ensure `Log.jsx` uses the same square property names consistently
- use the freshly derived `currentPlayer` when creating a turn inside `setGameTurns`

Example:

function handleSelectSquare(rowIndex, colIndex) {\
 setGameTurns((prevTurns) => {\
 const currentPlayer = deriveActivePlayer(prevTurns);

    return [\
      { square: { row: rowIndex, col: colIndex }, player: currentPlayer },\
      ...prevTurns,\
    ];\

});\
}

## Game Rules

- The game is played on a 3x3 grid
- Player 1 uses `X`
- Player 2 uses `O`
- Players take turns choosing empty squares
- The first player to get three in a row wins
- If all squares are filled and there is no winner, the game ends in a draw

## Author

Built by Robbie.
