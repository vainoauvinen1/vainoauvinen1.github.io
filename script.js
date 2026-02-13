const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        this.color = '#ff6b00'; // Default Basketball Orange
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Drawing the "seams" of the basketball
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Simple cross-line for basketball look
        ctx.moveTo(this.x - this.radius, this.y);
        ctx.lineTo(this.x + this.radius, this.y);
        ctx.stroke();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy = -this.dy;
        
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    // Check if the click coordinates are inside the ball
    checkClick(mouseX, mouseY) {
        const distance = Math.hypot(mouseX - this.x, mouseY - this.y);
        if (distance < this.radius) {
            this.pop();
        }
    }

    pop() {
        // Flash white and speed up when clicked
        this.color = '#fff';
        this.dx *= 1.5; 
        this.dy *= 1.5;
        
        // Reset color after 100ms
        setTimeout(() => {
            this.color = '#ff6b00';
        }, 100);
    }
}

const balls = Array.from({ length: 15 }, () => new Ball());

// Listen for clicks
window.addEventListener('click', (event) => {
    balls.forEach(ball => ball.checkClick(event.clientX, event.clientY));
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
// New Global Score Variable
let score = 0;
const scoreElement = document.getElementById('score');
const scoreboard = document.getElementById('scoreboard');

// ... (Keep the rest of your Ball class the same until the pop() method)

    pop() {
        // Increment Score
        score++;
        scoreElement.innerText = score;

        // Visual Feedback
        scoreboard.classList.remove('score-bump');
        void scoreboard.offsetWidth; // Trigger reflow to restart animation
        scoreboard.classList.add('score-bump');

        // Change ball color and boost speed
        this.color = '#fff';
        this.dx *= 1.2; 
        this.dy *= 1.2;
        
        setTimeout(() => {
            this.color = '#ff6b00';
        }, 100);
    }
// ... (Rest of the script remains the same)
