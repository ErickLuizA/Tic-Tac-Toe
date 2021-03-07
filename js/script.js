const cell = document.querySelectorAll('.cell');
const player = document.querySelector('span');
const restart = document.querySelector('button');

const player1 = 'X';
const player2 = 'O';

let playTime = player1;
let gameOver = false;

gameInit();

function gameInit() {
    for(let i = 0; i < cell.length; i++) {
        cell[i].addEventListener('click', cellChange);
    }
}

function playerChange() {
    if(gameOver) return;

    if(playTime == player1) {
        player.innerHTML = 'X';
    } else {
        player.innerHTML = 'O';
    }
}

function cellChange(e) {

    if(gameOver) return;
    
    targetCell = e.target;

    if(targetCell.innerHTML === "") {
        if (playTime == player1) {
            targetCell.setAttribute('play', player1);

            targetCell.innerHTML = 'X';

            playTime = player2;
        } else {
            targetCell.setAttribute('play', player2);

            targetCell.innerHTML = 'O';

            playTime = player1;
        }

        playerChange();
    }

    winnerValidator();
}

async function winnerValidator() {
    const a1 = document.querySelector('#a1').getAttribute('play');
    const a2 = document.querySelector('#a2').getAttribute('play');
    const a3 = document.querySelector('#a3').getAttribute('play');
    const b1 = document.querySelector('#b1').getAttribute('play');
    const b2 = document.querySelector('#b2').getAttribute('play');
    const b3 = document.querySelector('#b3').getAttribute('play');
    const c1 = document.querySelector('#c1').getAttribute('play');
    const c2 = document.querySelector('#c2').getAttribute('play');
    const c3 = document.querySelector('#c3').getAttribute('play');
    
    let winner = '';

    if(a1 == a2 && a1 == a3 || a1 == b1 && a1 == c1 || a1 == b2 && a1 == c3) {
        winner = a1;
    } else if(b2 == b1 && b2 == b3 || b2 == a2 && b2 == c2 || b2 == a1 && b2 == c3) {
        winner = b2;
    } else if(c3 == c2 && c3 == c1 || c3 == a3 && c3 == b3) {
        winner = c3;
    }

    if(winner != '') {
        gameOver = true;

        await sleep(50);

        alert(`O vencedor é ${winner}`);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

restart.addEventListener('click', restartGame);

function restartGame() {
    document.querySelector('#a1').setAttribute('play', '');
    document.querySelector('#a2').setAttribute('play', '');
    document.querySelector('#a3').setAttribute('play', '');
    document.querySelector('#b1').setAttribute('play', '');
    document.querySelector('#b2').setAttribute('play', '');
    document.querySelector('#b3').setAttribute('play', '');
    document.querySelector('#c1').setAttribute('play', '');
    document.querySelector('#c2').setAttribute('play', '');
    document.querySelector('#c3').setAttribute('play', '');

    playTime = player1;
    player.innerHTML = 'X';
    gameOver = false;
    cell.forEach((i) => i.innerHTML = '');
}
