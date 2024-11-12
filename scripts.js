// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle Navigation on Hamburger Click
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll-Based Animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Minigame: Catch the Ball
const canvas = document.getElementById('minigame-canvas');
const ctx = canvas.getContext('2d');

let paddleWidth = 100;
let paddleHeight = 15;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;
let rightPressed = false;
let leftPressed = false;

let ballRadius = 10;
let ballX = Math.random() * (canvas.width - 2 * ballRadius) + ballRadius;
let ballY = 0 - ballRadius;
let ballSpeed = 2;

let score = 0;
let gameOver = false;

// Paddle Movement
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Draw Paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#18BC9C";
    ctx.fill();
    ctx.closePath();
}

// Draw Ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#2C3E50";
    ctx.fill();
    ctx.closePath();
}

// Draw Score
function drawScore() {
    ctx.font = "16px 'Open Sans', sans-serif";
    ctx.fillStyle = "#2C3E50";
    ctx.fillText("Score: " + score, 8, 20);
}

// Draw Game Over
function drawGameOver() {
    ctx.font = "24px 'Poppins', sans-serif";
    ctx.fillStyle = "#E74C3C";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px 'Open Sans', sans-serif";
    ctx.fillText("Your Score: " + score, canvas.width / 2, canvas.height / 2 + 30);
}

// Update Ball Position
function updateBall() {
    ballY += ballSpeed;
    if(ballY + ballRadius > paddleY) {
        if(ballX > paddleX && ballX < paddleX + paddleWidth) {
            score++;
            resetBall();
        } else if(ballY + ballRadius > canvas.height) {
            gameOver = true;
        }
    }
}

// Reset Ball Position
function resetBall() {
    ballX = Math.random() * (canvas.width - 2 * ballRadius) + ballRadius;
    ballY = 0 - ballRadius;
    ballSpeed += 0.5; // Increase speed for difficulty
}

// Draw Everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();

    if(gameOver) {
        drawGameOver();
        return;
    }

    updateBall();

    // Move Paddle
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    requestAnimationFrame(draw);
}

// Start the Game
draw();
