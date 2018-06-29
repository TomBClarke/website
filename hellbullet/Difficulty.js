var diff,
    DIFF_EASY = new Difficulty(0.004, 4, 15, 8, 1000, 120, 100, 6000),
    DIFF_NORM = new Difficulty(0.01, 3, 20, 5, 500, 80, 100, 3000),
    DIFF_HARD = new Difficulty(0.05, 2, 25, 4, 400, 70, 100, 2000),
    DIFF_INSANE = new Difficulty(0.1, 1, 30, 3, 300, 50, 100, 100);

function Difficulty(spawnRate, lives, guySize, bulletSize, botSpeedFar, botSpeedNear,
        shotSpeed, invincibilityTime) {
    
    this.spawnRate = spawnRate;
    this.lives = lives;
    this.guySize = guySize;
    this.bulletSize = bulletSize;
    this.botSpeedFar = botSpeedFar;
    this.botSpeedNear = botSpeedNear;
    this.shotSpeed = shotSpeed;
    this.invincibilityTime = invincibilityTime;
    
}