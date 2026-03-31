// Canvas setup
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

// Particle system
let particles = [];
let mouseX = width / 2;
let mouseY = height / 2;
let targetMouseX = width / 2;
let targetMouseY = height / 2;

// Color palette
const colorPalette = [
    'rgba(100, 70, 180, 0.6)',
    'rgba(140, 80, 200, 0.5)',
    'rgba(80, 50, 160, 0.7)',
    'rgba(180, 90, 210, 0.4)',
    'rgba(60, 40, 140, 0.8)'
];

// Particle class
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.originalRadius = radius;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Interactive force: particles attracted to mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.5;
            const angle = Math.atan2(dy, dx);
            this.velocity.x += Math.cos(angle) * force * 0.3;
            this.velocity.y += Math.sin(angle) * force * 0.3;
            
            // Particles grow near mouse
            this.radius = this.originalRadius + (1 - distance / maxDistance) * 6;
        } else {
            this.radius = this.originalRadius;
        }
        
        // Damping
        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;
        
        // Boundary check with wrapping
        if (this.x + this.radius < 0) this.x = width + this.radius;
        if (this.x - this.radius > width) this.x = -this.radius;
        if (this.y + this.radius < 0) this.y = height + this.radius;
        if (this.y - this.radius > height) this.y = -this.radius;
        
        this.draw();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    const particleCount = Math.min(180, Math.floor(width * height / 8000));
    for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 3 + 1.5;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        const velocity = {
            x: (Math.random() - 0.5) * 0.4,
            y: (Math.random() - 0.5) * 0.4
        };
        particles.push(new Particle(x, y, radius, color, velocity));
    }
}

// Draw gradient background with stars
function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a2a');
    gradient.addColorStop(0.5, '#1a0a3a');
    gradient.addColorStop(1, '#2a104a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Twinkling stars
    for (let i = 0; i < 300; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(Date.now() * 0.001 + i) * 0.3 + 0.4})`;
        ctx.beginPath();
        ctx.arc((i * 131) % width, (i * 253) % height, 1.2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    
    // Smooth mouse follow
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}

// Handle window resize
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
}

// Event listeners
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
});

canvas.addEventListener('mouseleave', () => {
    targetMouseX = width / 2;
    targetMouseY = height / 2;
});

// Initialize
resizeCanvas();
animate();