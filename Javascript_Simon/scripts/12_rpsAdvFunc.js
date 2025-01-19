let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, loss: 0, tie: 0 }; // 
// if left side is truthy, then we have score and will show. if left is falsy (score is null), then default value right side will show

const op = document.getElementById('js-op');
const move = document.getElementById('js-move');
const val = document.getElementById('js-val');
let Computer = '';
let result = '';


val.innerText = `Wins: ${score.wins}, Loss: ${score.loss}, Tie: ${score.tie}`;

let isAutoPlaying = false;
let interval;

document.querySelector('.stop-play').addEventListener('click', () => {
    autoPlay();
});

function autoPlay() {
    if(!isAutoPlaying) {
        // interval = setInterval( function() => { // regular function
        interval = setInterval( () => { // arrow function 
            const playMove = randomMove();
            CompVal(playMove);
            isAutoPlaying = true;
            document.querySelector('.stop-play').innerHTML = 'Stop Play';
        }, 2000);
    }
    else{
        clearInterval(interval);
        isAutoPlaying = false;
        document.querySelector('.stop-play').innerHTML = 'Auto Play';
    }
}

// used add event listeners instead of onclick
document.querySelector('.rock-click').addEventListener('click', () => {
    rockEvent();
});
document.querySelector('.paper-click').addEventListener('click', () => {
    paperEvent();
});
document.querySelector('.scissor-click').addEventListener('click', () => {
    scissorEvent();
});
const rockEvent = function() {
    CompVal('Rock');
};
const paperEvent = function() {
    CompVal('Paper');
}
const scissorEvent = function() {
    CompVal('Scissor');
}
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
        rockEvent(); // CompVal('Rock') - we can also directly call the function instead of creating rockEvent function
    }
    else if(event.key === 'p') {
        paperEvent();
    }
    else if(event.key === 's') {
        scissorEvent();
    }
    else if(event.key === 'a') {
        autoPlay();
    }
    else if(event.key === 'Backspace') {
        resetScore();
        
    }
    else{
        console.log(event.key);
    }
});

function randomMove() {
    let randomNo = Math.random();
    if (randomNo >= 0 && randomNo < 1 / 3) {
        Computer = 'Rock';
    }
    else if (randomNo >= 1 / 3 && randomNo < 2 / 3) {
        Computer = 'Paper';
    }
    else if (randomNo >= 2 / 3 && randomNo < 1) {
        Computer = 'Scissor';
    }
    //console.log(Computer);
    return Computer;
}

function CompVal(playerMove) {
    randomMove();

    //Rock
    if (playerMove === 'Rock') {
        if (Computer === 'Rock') {
            result = 'Tie';
        }
        else if (Computer === 'Paper') {
            result = 'User Lose';
        }
        else if (Computer === 'Scissor') {
            result = 'User Won';
        }
    }

    //Paper
    else if (playerMove === 'Paper') {
        if (Computer === 'Rock') {
            result = 'User Won';
        }
        else if (Computer === 'Paper') {
            result = 'Tie';
        }
        else if (Computer === 'Scissor') {
            result = 'User Lose';
        }
    }

    //Scissor
    else if (playerMove === 'Scissor') {
        if (Computer === 'Rock') {
            result = 'User Lose';
        }
        else if (Computer === 'Paper') {
            result = 'User Won';
        }
        else if (Computer === 'Scissor') {
            result = 'Tie';
        }
    }

    if (result === 'User Won') {
        score.wins += 1;
    }
    else if (result === 'User Lose') {
        score.loss += 1;
    }
    else if (result === 'Tie') {
        score.tie += 1;
    }

    localStorage.setItem('score', JSON.stringify(score)); // we cannot write only score as it is a number and json takes only string

    op.innerHTML = `${result}.`;
    move.innerHTML = `You <img src="images/${playerMove}-emoji.png" alt="rock"> <img src="images/${Computer}-emoji.png" alt="paper"> Computer`;
    val.innerText = `Wins: ${score.wins}, Loss: ${score.loss}, Tie: ${score.tie}`;
}

document.querySelector('.reset-score').addEventListener('click', () => {
    resetScore();
})
function resetScore() {
    const valConfirmed = window.confirm('Are you sure you want to reset the score?');
    if(valConfirmed) {
        score.wins = 0;
        score.loss = 0;
        score.tie = 0;
        
        localStorage.removeItem('score'); // to remove items
        val.innerText = 'Your Score have been reset.';
    }
    else {
        console.log('hello');
    }
}   
