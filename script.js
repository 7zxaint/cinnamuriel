var character = document.getElementById('character');
var block = document.getElementById('block');
var scoreElement = document.getElementById('score');
var gameArea = document.getElementById('game');
var score = 0;
var isJumping = false;

var gameOverModal = document.getElementById('gameOverModal');
var finalScoreElement = document.getElementById('finalScore');
var retryButton = document.getElementById('retryButton');

function jump() {
    if (isJumping) return;
    isJumping = true;
    character.classList.add("animate");

    setTimeout(function () {
        character.classList.remove("animate");
        isJumping = false;
    }, 500);
}

var blockLeft = 500;
var blockSpeed = 5;
var blockInterval;

function startGame() {
    blockLeft = 500; 
    block.style.left = blockLeft + 'px'; 
    score = 0;
    scoreElement.textContent = `Score: ${score}`;

    blockInterval = setInterval(function () {
        var characterRect = character.getBoundingClientRect();
        var blockRect = block.getBoundingClientRect();

        if (blockRect.left < characterRect.right &&
            blockRect.right > characterRect.left &&
            blockRect.bottom > characterRect.top &&
            blockRect.top < characterRect.bottom) {
            if (!isJumping) {
                endGame();
            }
        }

        if (blockRect.left < 0) {
            blockLeft = 500; 
            block.style.left = blockLeft + 'px';
            score++; 
            scoreElement.textContent = `Score: ${score}`;
        } else {
            blockLeft -= blockSpeed;
            block.style.left = blockLeft + 'px';
        }
    }, 10);
}

function endGame() {
    clearInterval(blockInterval);
    finalScoreElement.textContent = score; 
    gameOverModal.style.display = 'flex'; 
}

retryButton.onclick = function () {
    location.reload();
};

startGame(); 
