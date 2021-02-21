const startBlock    = document.querySelector('#start-block');
const playButton    = document.querySelector('button');
const playToSelect  = document.querySelector('select#selectScore');
const resetButton   = document.querySelector('button#reset');
const gameBlock     = document.querySelector('#game-block');
const imgsDiv       = document.querySelector('#game-block #imgs');
const playerScore   = document.querySelector('#scores #player p:last-child');
const computerScore = document.querySelector('#scores #computer p:last-child');
const playerButtons = document.querySelectorAll('#game-block #buttons button');


playButton.addEventListener('click', function(){
    startBlock.classList.add('fade-out');
    startBlock.parentElement.removeChild(startBlock);

    gameBlock.classList.remove('fade-out');
    gameBlock.classList.add('fade-in');
});

playToSelect.addEventListener('change', function(){
    resetGame();
});

resetButton.addEventListener('click', resetGame);

for(let i=0; i<playerButtons.length; i++){
    let player = "rock";
    let computer = "rock";
    playerButtons[i].addEventListener('click', function(){
        imgsDiv.classList.add('start-anim');
        setTimeout(function(){
            imgsDiv.classList.remove('start-anim');

            // let computer select at random
            const choices = ["rock", "paper", "scissors"];
            computer =  choices[Math.floor(Math.random() * (choices.length - 0) + 0)];
            document.querySelector('#game-block div#computer img').setAttribute('src', `imgs/${computer}.png`)

            if(playerButtons[i].innerText==="paper"){
                document.querySelector('#game-block div#player img').setAttribute('src', 'imgs/paper.png')
                player = "paper";

            } else if(playerButtons[i].innerText==="rock"){
                document.querySelector('#game-block div#player img').setAttribute('src', 'imgs/rock.png')
                player = "rock";
            } else {
                document.querySelector('#game-block div#player img').setAttribute('src', 'imgs/scissors.png')
                player = "scissors";
            }
            
            let winner = getScore(player, computer);
            updateScore(winner);
        }, 2000);    
    });
}

function getScore(player, computer){
    let winner = "";
    switch(player){
        case "rock":
            if(computer==="rock") winner = "";
            else if(computer === "paper") winner="computer";
            else winner = "player";
            break;
        case "paper":
            if(computer==="rock") winner = "player";
            else if(computer==="paper") winner = "";
            else winner = "computer";
            break;
        case "scissors":
            if(computer==="rock") winner = "computer";
            else if(computer==="paper") winner = "player";
            else winner = "";
            break;
        default: winner = "";
    }
    return winner;
}

function updateScore(winner){
    if(winner==="player"){
        playerScore.innerText = parseInt(playerScore.innerText)+1;
    } else if(winner==="computer"){
        computerScore.innerText = parseInt(computerScore.innerText)+1;
    } 
    checkGameStatus();
}

function checkGameStatus(){
    let winner;
    if(playerScore.innerText === playToSelect.value){   
        document.querySelector('div#game-block h1').innerText = "Player wins!!!"
        winner = "player";
    } else if(computerScore.innerText === playToSelect.value){
        document.querySelector('div#game-block h1').innerText = "Computer wins!!!"
        winner = "computer";
    }
    
    if(winner){
        // disable play buttons until reset
        for(let i = 0; i<playerButtons.length;i++){
            playerButtons[i].disabled = true;
        }
        resetButton.classList.remove('fade-out');
        resetButton.classList.add('reset-style', 'fade-in');
        playToSelect.disabled = true;
    }

    
}

function resetGame(){
    playerScore.innerText = "0";
    computerScore.innerText = "0";
    document.querySelector('div#game-block h1').innerText = "Choose an Option";
    // enable play buttons again
    for(let i = 0; i<playerButtons.length;i++){
        playerButtons[i].disabled = false;
    }
    playToSelect.disabled = false;

    resetButton.classList.add('fade-out');
    resetButton.classList.remove('reset-in');

    document.querySelector('#game-block div#player img').setAttribute('src', 'imgs/rock.png')
    document.querySelector('#game-block div#computer img').setAttribute('src', 'imgs/rock.png')
}

