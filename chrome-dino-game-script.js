const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dino = {
    x: 50,
    y: 150,
    width: 40,
    height: 40,
    jumping: false,
    jumpStrength: 10,
    gravity: 0.6,
    velocity: 0
};

const obstacle = {
    x: canvas.width,
    y: 150,
    width: 20,
    height: 40,
    speed: 5
};

let score = 0;
let gameLoop;

function drawDino() {
    ctx.fillStyle = '#555';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacle() {
    ctx.fillStyle = '#000';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 650, 30);
}

function jump() {
    if (!dino.jumping) {
        dino.jumping = true;
        dino.velocity = -dino.jumpStrength;
    }
}

function updateDino() {
    if (dino.jumping) {
        dino.y += dino.velocity;
        dino.velocity += dino.gravity;

        if (dino.y > 150) {
            dino.y = 150;
            dino.jumping = false;
        }
    }
}

function updateObstacle() {
    obstacle.x -= obstacle.speed;
    if (obstacle.x < -obstacle.width) {
        obstacle.x = canvas.width;
        score++;
    }
}

function checkCollision() {
    if (
        dino.x < obstacle.x + obstacle.width &&
        dino.x + dino.width > obstacle.x &&
        dino.y < obstacle.y + obstacle.height &&
        dino.y + dino.height > obstacle.y
    ) {
        clearInterval(gameLoop);
        alert(`Game Over! Your score: ${score}`);
    }
}

function gameUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateDino();
    updateObstacle();
    checkCollision();
    drawDino();
    drawObstacle();
    drawScore();
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

gameLoop = setInterval(gameUpdate, 1000 / 60);
