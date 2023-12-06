// JavaScript
let sequence = "";
let userScore = 0;
let timer;
let gameTimer;
let loadingTimer;
let loadingTime = 0;
let timerDuration;
let level = 1;  // Adiciona uma variável para controlar o nível

function startGame(difficulty) {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("user-input").value = "";
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    document.getElementById("loading-screen").style.display = "block";

    switch (difficulty) {
        case 'easy':
            timerDuration = 20;
            break;
        case 'medium':
            timerDuration = 15;
            break;
        case 'hard':
            timerDuration = 10;
            break;
        default:
            timerDuration = 10;
            break;
    }

    level = 1;  // Reinicia o nível ao iniciar um novo jogo
    generateSequence();
    displayAndAllowInput();
    startGameTimer();

    simulateLoading(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";
        displayRandomSequence();
    });
}

function simulateLoading(callback) {
    let loadingBar = document.getElementById("loading-bar");
    let width = 0;
    let interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            callback();
        } else {
            width++;
            loadingBar.style.width = width + "%";
            updateLoadingTimer();
        }
    }, 50);
}

function updateLoadingTimer() {
    loadingTime += 0.05;
    document.getElementById("loading-timer").innerText = loadingTime.toFixed(2) + "s";
}

function generateSequence() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    sequence = "";
    for (let i = 0; i < level * 2; i++) {  // Aumenta o tamanho da sequência com base no nível
        sequence += letters.charAt(Math.floor(Math.random() * letters.length));
    }
}

function displayAndAllowInput() {
    document.getElementById("user-input").disabled = false;
    document.getElementById("check-button").disabled = false;
    startTimer();
}

function displayRandomSequence() {
    document.getElementById("sequence-display").innerText = sequence;
    setTimeout(() => {
        document.getElementById("sequence-display").innerText = "";
        document.getElementById("user-input").focus(); // Move o foco para o input
    }, 3000); // Ajuste o tempo de exibição conforme necessário (3 segundos no exemplo)
}

function startTimer() {
    timer = setTimeout(() => {
        endGame(false);
    }, timerDuration * 1000);
}

function startGameTimer() {
    let seconds = timerDuration;
    updateGameTimer(seconds);
    gameTimer = setInterval(() => {
        seconds--;
        updateGameTimer(seconds);
        if (seconds < 0) {
            clearInterval(gameTimer); // Limpa o temporizador do jogo
            endGame(false);
        }
    }, 1000);
}/*  */


function updateGameTimer(seconds) {
    const gameTimerDisplay = document.getElementById("game-timer");
    gameTimerDisplay.innerText = seconds + "s";
}

function checkSequence() {
    clearTimeout(timer);
    document.getElementById("user-input").disabled = true;
    document.getElementById("check-button").disabled = true;

    const userInput = document.getElementById("user-input").value.toUpperCase();

    if (userInput === sequence) {
        userScore += 5;
        document.getElementById("score").innerText = "Score: " + userScore;

        if (userScore === level * 10) {  // Aumenta o nível a cada 10 pontos
            level++;
            document.getElementById("level").innerText = "Nível: " + level;
        }

        sequence = "";
        generateSequence();
        displayAndAllowInput();
        startTimer();
        resetGameTimer();
        displayRandomSequence(); // Adiciona a exibição da nova sequência aleatória
    } else {
        endGame(false);
    }

    document.getElementById("user-input").value = "";
}

function resetGameTimer() {
    clearInterval(gameTimer);
    startGameTimer();
}

function endGame(win) {
    clearInterval(gameTimer);

    document.getElementById("user-input").disabled = true;
    document.getElementById("check-button").disabled = true;

    setTimeout(() => {
        if (!win) {
            document.getElementById("game-screen").style.display = "none";
            document.getElementById("result-screen").style.display = "block";

            const resultMessage = document.getElementById("result-message");
            resultMessage.innerText = "Você perdeu, tente novamente! (:";
        } else {
            document.getElementById("game-screen").style.display = "none";
            document.getElementById("result-screen").style.display = "block";

            const resultMessage = document.getElementById("result-message");
            resultMessage.innerText = "Parabéns, você ganhou!!!";
            userScore = 0;
            document.getElementById("score").innerText = "Score: 0";
        }
    }, 1000);
}

function exitGame() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("start-screen").classList.remove("hidden");
    sequence = "";
    userScore = 0;
    document.getElementById("score").innerText = "Score: 0";
    resetLoadingTimer();
    clearInterval(gameTimer);
}

function resetLoadingTimer() {
    clearInterval(loadingTimer);
    loadingTime = 0;
}
