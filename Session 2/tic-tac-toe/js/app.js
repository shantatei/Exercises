window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const restartButton = document.querySelector('#restart-btn');
    const announcer = document.querySelector('.display-announcer');
    const playerDisplayhide = document.querySelector('#player-display')
    const gamelogsButton = document.querySelector('#logs-btn')





    let boardstate ;
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;



    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


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

    
    //Checks for Win/Tie
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            //winCondition refers to a scenario in which all 3 tiles are the same 
            const winCondition = winningConditions[i];
            //a = first tile 
            const a = board[winCondition[0]];
            //b = second tile 
            const b = board[winCondition[1]];
            //c = third  tile 
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            //If all 3 tiles are of the player (in this case X / Y)
            if (a === b && b === c) {
                //Set the roundWon to true
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            //Checks which player won depending on the currentPlayer var 
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        // if all tiles have been filled up and roundWon is still false announce a Tie
        if (!board.includes(''))
            announce(TIE);
    }


    const saveLocalBoardState = (boardstate) => {
        let historyboard = getHistoryBoard();
        historyboard.push(boardstate);
        localStorage.setItem('board', JSON.stringify(historyboard));
    }
    
    function getHistoryBoard() {
        if (localStorage.getItem('board') === null) return [];
        return JSON.parse(localStorage.getItem('board'));
    }

    const showboardHistory = () =>{
        let historyboardstate = JSON.parse(localStorage.getItem('board'));
        console.log(historyboardstate)
    }


    const announce = (type) => {
        boardstate = {
            board : board ,
            state : type
        }
        saveLocalBoardState(boardstate);
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                playerDisplayhide.classList.add(`hide`);
                playerDisplayhide.parentNode.replaceChild(announcer, playerDisplayhide)
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                playerDisplayhide.classList.add(`hide`);
                playerDisplayhide.parentNode.replaceChild(announcer, playerDisplayhide)

                break;
            case TIE:
                announcer.innerText = 'Tie';
                playerDisplayhide.classList.add(`hide`);
                playerDisplayhide.parentNode.replaceChild(announcer, playerDisplayhide)

        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }

        return true;
    };

    const updateBoard = (index) => {
        //updates the board array and set the tile 0-9 to either player X / Y depending on curentPlayer var 
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }




    //User Action Function checks if the game is active & if the tile that they are clicking is already used 
    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            //If true set inner text to X/O (CurrentPlayer)
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
        playerDisplayhide.classList.remove('hide')
        announcer.parentNode.replaceChild(playerDisplayhide, announcer)


        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }


    //When User Click on Each Tile Call User Action Function
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    restartButton.addEventListener('click', resetBoard);

    gamelogsButton.addEventListener('click', showboardHistory );


})