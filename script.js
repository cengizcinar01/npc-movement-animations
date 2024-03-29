/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
let gameFrame = 0;
const enemyTypeSelect = document.getElementById('enemyType');
let currentEnemyType = enemyTypeSelect.value;
let enemiesArray = [];

class Enemy1 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy1.png';
        const scale = 2.5;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / scale;
        this.height = this.spriteHeight / scale;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }
    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        this.frame = gameFrame % this.flapSpeed === 0 ? (this.frame + 1) % 5 : this.frame;
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Enemy2 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy2.png';
        const scale = 2;
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / scale;
        this.height = this.spriteHeight / scale;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7;
    }
    update() {
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        this.x = this.x + this.width < 0 ? canvas.width : this.x;
        this.frame = gameFrame % this.flapSpeed === 0 ? (this.frame + 1) % 5 : this.frame;
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Enemy3 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy3.png';
        const scale = 2;
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / scale;
        this.height = this.spriteHeight / scale;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 500;
        this.angleSpeed = Math.random() * 0.5 + 0.5;
    }
    update() {
        this.x = canvas.width / 2 + (canvas.width / 2 - this.width / 2) * Math.cos((this.angle * Math.PI) / 200);
        this.y = canvas.height / 2 + (canvas.height / 2 - this.height / 2) * Math.sin((this.angle * Math.PI) / 300);
        this.angle += this.angleSpeed;
        this.frame = gameFrame % this.flapSpeed === 0 ? (this.frame + 1) % 5 : this.frame;
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Enemy4 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy4.png';
        const scale = 2;
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / scale;
        this.height = this.spriteHeight / scale;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.setNewTargetLocation();
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 150 + 50);
    }

    setNewTargetLocation() {
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
    }

    update() {
        if (gameFrame % this.interval === 0) {
            this.setNewTargetLocation();
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx / 70;
        this.y -= dy / 70;

        this.frame = gameFrame % this.flapSpeed === 0 ? (this.frame + 1) % 5 : this.frame;
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

function createEnemies() {
    let numberOfEnemies;
    switch (currentEnemyType) {
        case 'enemy1':
            numberOfEnemies = 30;
            break;
        case 'enemy2':
            numberOfEnemies = 20;
            break;
        case 'enemy3':
            numberOfEnemies = 10;
            break;
        case 'enemy4':
            numberOfEnemies = 30;
            break;
        default:
            numberOfEnemies = 0;
    }

    enemiesArray = [];
    for (let i = 0; i < numberOfEnemies; i++) {
        switch (currentEnemyType) {
            case 'enemy1':
                enemiesArray.push(new Enemy1());
                break;
            case 'enemy2':
                enemiesArray.push(new Enemy2());
                break;
            case 'enemy3':
                enemiesArray.push(new Enemy3());
                break;
            case 'enemy4':
                enemiesArray.push(new Enemy4());
                break;
        }
    }
}

enemyTypeSelect.addEventListener('change', () => {
    currentEnemyType = enemyTypeSelect.value;
    createEnemies();
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}

createEnemies();
animate();
