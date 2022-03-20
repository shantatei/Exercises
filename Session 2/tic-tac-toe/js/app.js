const announcer = document.querySelector('#player-display');
const numberOfTiles = 9;

let boardstate;
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'Player X Won';
const PLAYERO_WON = 'Player O Won';
const TIE = 'Tie';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function changePlayer(player) {
    currentPlayer = player ? player : currentPlayer === 'X' ? 'O' : 'X';
    announcer.innerText = `Player ${currentPlayer}'s turn`;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        //winCondition is possible way to win
        const winCondition = winningConditions[i];
        //getting the possible places in the board to check if they are the same to see if someone won
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        //Checks which player won depending on the currentPlayer var
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return true;
    }

    // if all tiles have been filled up and roundWon is still false announce a Tie
    if (!board.includes('')) {
        announce(TIE);
        return true;
    }

    return false;
}

function announce(type) {
    boardstate = {
        board: board,
        state: type
    };
    let historyboard = [];
    if (localStorage.getItem('board') !== null) {
        historyboard = JSON.parse(localStorage.getItem('board'));
    }
    historyboard.push(boardstate);
    localStorage.setItem('board', JSON.stringify(historyboard));
    announcer.innerHTML = type;
}

for (let i = 0; i < numberOfTiles; i++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    tile.addEventListener('click', () => {
        if (tile.innerText === '' && isGameActive) {
            tile.innerText = currentPlayer;
            board[i] = currentPlayer;
            if (!handleResultValidation()) changePlayer();
        }
    });
    document.querySelector('.container-game').appendChild(tile);
}

document.querySelector('#restart-btn').addEventListener('click', () => {
    if (board.every((item) => item == '')) return;
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;

    changePlayer('X');

    document.querySelectorAll('.tile').forEach((tile) => {
        tile.innerText = '';
    });
});

document.querySelector('#logs-btn').addEventListener('click', () => {
    let historyboardstate = JSON.parse(localStorage.getItem('board'));
    const modalbody = document.querySelector('.modal-body');
    modalbody.innerHTML = '';

    if (!historyboardstate || historyboardstate.length == 0)
        return (modalbody.innerHTML =
            'No game has been recorded. Try finishing a game to see it here');

    historyboardstate.forEach((prevGame, index) => {
        modalbody.insertAdjacentHTML(
            'beforeend',
            `<section class="display-announcer">${prevGame.state}</section>
            <section class="container-game-history" item = "${index}"></section>`
        );
        const gameContainerHistory = document.querySelector(
            `.container-game-history[item="${index}"]`
        );
        prevGame.board.forEach((tile) =>
            gameContainerHistory.insertAdjacentHTML(
                'beforeend',
                `<div class = "tilehistory">${tile}</div>`
            )
        );
    });
});