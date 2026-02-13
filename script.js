// 1. SETUP & VARIABLES
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
const scoreElement = document.getElementById('score');
const scoreboard = document.getElementById('scoreboard');

// 2. BALL CLASS DEFINITION
class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.radius = Math.random() * 20 + 15;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = (Math.random() - 0.5) * 6;
        this.dy = (Math.random() - 0.5) * 6;
        this.color = '#ff6b00'; // Basketball Orange
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Basketball Seams
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.x - this.radius, this.y);
        ctx.lineTo(this.x + this.radius, this.y);
        ctx.stroke();
    }

    update() {
        // Wall Bounce Logic
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy = -this.dy;
        
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    checkClick(mouseX, mouseY) {
        const distance = Math.hypot(mouseX - this.x, mouseY - this.y);
        if (distance < this.radius) {
            this.pop();
        }
    }

    pop() {
        // Increment Score
        score++;
        if (scoreElement) scoreElement.innerText = score;

        // Scoreboard Animation
        if (scoreboard) {
            scoreboard.classList.remove('score-bump');
            void scoreboard.offsetWidth; // Force CSS reflow
            scoreboard.classList.add('score-bump');
        }

        // UNLOCK VIDEO AT 10 POINTS
        if (score === 10) {
            const overlay = document.getElementById('video-overlay');
            const video = document.getElementById('highlight-video');
            if (overlay && video) {
                overlay.style.display = 'flex';
                video.play();
            }
        }

        // Ball Feedback (Flash and Speed boost)
        this.color = '#fff';
        this.dx *= 1.4;
        this.dy *= 1.4;
        
        setTimeout(() => {
            this.color = '#ff6b00';
        }, 100);
    }
}

// 3. INITIALIZATION
const balls = Array.from({ length: 15 }, () => new Ball());

//
