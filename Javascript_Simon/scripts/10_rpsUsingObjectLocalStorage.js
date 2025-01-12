 // let score = {
        //     wins: 0,
        //     loss: 0,
        //     tie: 0
        // };

        let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, loss: 0, tie: 0 }; // shortcut of line no 69 code
        // if left side is truthy, then we have scre and will show. if left is falsy (score is null), then default value right side will show

        //console.log(localStorage.getItem('message')); // just an example

        // console.log(localStorage.getItem('score'));
        // console.log(JSON.parse(localStorage.getItem('score'))); // to convert back to number

        // if use removeItem and when we click reset, will give null error so to avoid this, we are giving default score
        // if(!score) {  //score === null
        //     score = {
        //         wins: 0,
        //         loss: 0,
        //         tie: 0
        //     }    
        // }
        const op = document.getElementById('js-op');
        const move = document.getElementById('js-move');
        const val = document.getElementById('js-val');
        let Computer = '';
        let result = '';
         
        val.innerText = `Wins: ${score.wins}, Loss: ${score.loss}, Tie: ${score.tie}`;

        function CompVal(playerMove) {
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
            console.log(Computer);

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

            // localStorage.setItem('message', 'hello'); // just an example
            localStorage.setItem('score', JSON.stringify(score)); // we cannot write only score as it is a number and json takes only string

            op.innerHTML = `${result}.`;
            move.innerHTML = `You <img src="images/${playerMove}-emoji.png" alt="rock"> <img src="images/${Computer}-emoji.png" alt="paper"> Computer`;
            val.innerText = `Wins: ${score.wins}, Loss: ${score.loss}, Tie: ${score.tie}`;
        }

        function resetScore() {
            score.wins = 0;
            score.loss = 0;
            score.tie = 0;

            localStorage.removeItem('score'); // to remove items
            val.innerText = 'Your Score have been reset.';
        }   