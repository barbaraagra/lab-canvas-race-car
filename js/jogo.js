class Game {
    constructor(ctx, width, height, player) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.intervalId = null;
        this.obstacles = [];
        this.frames = 0;
    }

    start() {
        this.intervalId = setInterval(this.update, 1000 / 60);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }


    update = () => {
        this.frames++;
        drawBackground();
        this.player.draw();
        //  this.updateObstacles();

    }

    stop() {
        clearInterval(this.intervalId);
    }

    checkGameOver() {
        const crashed = this.obstacles.some((obstacle) => {
            return this.player.crashWith(obstacle);
        });

        if (crashed) {
            this.stop();
        }
    }

    updateObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].x -= 1;
            this.obstacles[i].draw();
        }

        if (this.frames % 180 === 0) {

            let x = 500;

            // para calcular o height das columns/obstacles
            let minHeight = 20;
            let maxHeight = 400;

            // garante que sempre seja um número entre 400 e 20.
            let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);


            //controla o espaço entre os obstáculos.
            let minGap = 75;
            let maxGap = 200;

            //thiscreates the gap
            let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)

            //add the obstacles to the array
            // this is the top obstacle
            this.obstacles.push(new Component(x, 0, height, 50, 'red', this.ctx))

            //botton obstacle
            this.obstacles.push(new Component(x, height + gap, 50, x - height - gap, 'red', this.ctx))
        }
    }
}