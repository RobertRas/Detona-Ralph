const state = {
    view: {
        squares: document.querySelectorAll((".square")),
        enemy: document.querySelector((".enemy")),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector(".score")
    },
    values:{
        gameVelocity: 300,
        hitPosition: 0,
        result:0,
        currentTime: 60,
        
    },
    actions:{
        timeId: setInterval(randomSquare, 400),
        countTimeId: setInterval(countDown, 1000),
    }
};

    function playSound(){
        let audio = new Audio("./src/audio/hit.m4a");
        audio.volume = 0.2;
        audio.play();
    }

    function countDown(){
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime

        if(state.values.currentTime <= 0){
            clearInterval(state.actions.countTimeId);
            clearInterval(state.actions.timeId);
            alert("Game over! Seu resultado foi: " + state.values.result)
        }
    }
/*
function moveEnemy(){
    state.values.timeId = setInterval(randomSquare, state.values.gameVelocity)
}
*/

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    })
}

function initialize(){
//    moveEnemy();
    addListenerHitBox();
}

initialize()



