// HTML Elements:
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset-btn');
const cells = document.querySelectorAll('.cell');
const scoreBoard = document.querySelector('.scoreboard');

// Game Constants:
const xSymbol = '✖';
const oSymbol = '〇';

// Game Variables:
let playGame = true;
let turnX = true;
let winner = null;
let scoreX = 0;
let scoreO = 0;

// Functions:
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    playGame = false;
    winner = letter;
    for (const cell of cells) {
        cell.classList.add('ended');
    }

    if (winner === 'x') {
        statusDiv.innerHTML = `${letterToSymbol(winner)} has won!`;
        scoreX++;
        scoreBoard.innerHTML = `${xSymbol}: ${scoreX} ${oSymbol}: ${scoreO}`;
    } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(winner)} has won!</span>`;
        scoreO++;
        scoreBoard.innerHTML = `${xSymbol}: ${scoreX} <span>${oSymbol}: ${scoreO}</span>`;
    }
}

const checkGameStatus = () => {
    const a1 = cells[0].classList[2];
    const a2 = cells[1].classList[2];
    const a3 = cells[2].classList[2];
    const b1 = cells[3].classList[2];
    const b2 = cells[4].classList[2];
    const b3 = cells[5].classList[2];
    const c1 = cells[6].classList[2];
    const c2 = cells[7].classList[2];
    const c3 = cells[8].classList[2];

    console.log(a1, a2, a3, b1, b2, b3, c1, c2, c3);

    // Check for winner:
    if(a1 && a1 === a2 && a2 == a3) {
        handleWin(a1)
        cells[0].classList.add('won');
        cells[1].classList.add('won');
        cells[2].classList.add('won');
    } else if (b1 && b1 === b2 && b2 === b3) {
        handleWin(b1);
        cells[3].classList.add('won');
        cells[4].classList.add('won');
        cells[5].classList.add('won');
    } else if (c1 && c1 === c2 && c2 === c3) {
        handleWin(c1);
        cells[6].classList.add('won');
        cells[7].classList.add('won');
        cells[8].classList.add('won');
    } else if (a1 && a1 === b1 && b1 === c1) {
        handleWin(a1);
        cells[0].classList.add('won');
        cells[3].classList.add('won');
        cells[6].classList.add('won');
    } else if (a2 && a2 === b2 && b2 === c2) {
        handleWin(a2);
        cells[1].classList.add('won');
        cells[4].classList.add('won');
        cells[7].classList.add('won');
    } else if (a3 && a3 === b3 && b3 === c3) {
        handleWin(a3);
        cells[2].classList.add('won');
        cells[5].classList.add('won');
        cells[8].classList.add('won');
    } else if (a1 && a1 === b2 && b2 === c3) {
        handleWin(a1);
        cells[0].classList.add('won');
        cells[4].classList.add('won');
        cells[8].classList.add('won');
    } else if (a3 && a3 === b2 && b2 === c1) {
        handleWin(a3);
        cells[2].classList.add('won');
        cells[4].classList.add('won');
        cells[6].classList.add('won');
    } else if (a1 && a2 && a3 && b1 && b2 &&b3 && c1 && c2 && c3) {
        playGame = false;
        statusDiv.innerHTML = 'It\'s a tie!'
        for (const cell of cells) {
            cell.classList.add('blink');
        }
    } else {
        turnX = !turnX;
        if (turnX) {
            statusDiv.innerHTML = `${xSymbol} is next`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`
        }
    }
};

// Event Handlers:
const handleReset = (e) => {
    playGame = true;
    turnX = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    winner = null;

    for (const cell of cells) {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.classList.remove('won');
        cell.classList.remove('ended');
        cell.classList.remove('blink');
    }
};

const handleCellMark = (e) => {
    const classList = e.target.classList;

    if (!playGame || classList[2] === 'x' || classList[2] === 'o') {
        return;
    }

    if (turnX) {
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }
};

// Event Listeners:
resetDiv.addEventListener('click', handleReset);

for (const cell of cells) {
    cell.addEventListener('click', handleCellMark)
}
