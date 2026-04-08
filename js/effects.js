// ========== 动态粒子背景 ==========
(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.pointerEvents = 'none';
    document.body.insertBefore(canvas, document.body.firstChild);

    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 70;
    const COLORS = ['rgba(255, 100, 50, 0.6)', 'rgba(255, 180, 80, 0.5)', 'rgba(200, 50, 50, 0.4)', 'rgba(255, 215, 0, 0.4)'];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < -20) this.x = width + 20;
            if (this.x > width + 20) this.x = -20;
            if (this.y < -20) this.y = height + 20;
            if (this.y > height + 20) this.y = -20;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255, 100, 50, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            p.update();
            p.draw();
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
    resizeCanvas();
    initParticles();
    animate();
})();

// ========== 鼠标跟随光晕 ==========
(function() {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(255, 80, 40, 0.25)';
    cursor.style.boxShadow = '0 0 20px 6px rgba(255, 50, 30, 0.5)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'transform 0.08s linear';
    cursor.style.backdropFilter = 'blur(2px)';
    cursor.style.border = '1px solid rgba(255, 200, 100, 0.4)';
    document.body.appendChild(cursor);

    const inner = document.createElement('div');
    inner.style.position = 'absolute';
    inner.style.top = '50%';
    inner.style.left = '50%';
    inner.style.width = '16px';
    inner.style.height = '16px';
    inner.style.transform = 'translate(-50%, -50%)';
    inner.style.borderRadius = '50%';
    inner.style.backgroundColor = 'rgba(255, 180, 80, 0.8)';
    inner.style.boxShadow = '0 0 12px #ffaa44';
    cursor.appendChild(inner);

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    function animateCursor() {
        curX += (mouseX - curX) * 0.2;
        curY += (mouseY - curY) * 0.2;
        cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mousedown', () => {
        cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px) scale(1.3)`;
        cursor.style.backgroundColor = 'rgba(255, 100, 50, 0.4)';
        setTimeout(() => {
            cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px) scale(1)`;
            cursor.style.backgroundColor = 'rgba(255, 80, 40, 0.25)';
        }, 150);
    });
})();