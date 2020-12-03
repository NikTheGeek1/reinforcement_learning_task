import Grid from './grid';
export default class Robot extends Grid {

    constructor(score, steps, grid_rows, grid_columns) {
        super(grid_rows, grid_columns);
        this.x = 0;
        this.y = 0;
        this.currentRound = 0;
        this.currentMove = '';
        this.legalMoves = ['right', 'down'];
        this.score = score;
        this.steps = steps;
        this.history = [
            [{}]
        ];
    };

    fellInTrap() {
        this.decreaseScore(10);
        this.increaseRound();
        this.goToStart();
    }

    finish() {
        this.increaseScore(50);
        this.increaseRound();
        this.goToStart();
    }
    
    goToStart() {
        this.x = 0;
        this.y = 0;
        this.setLegalMoves();
    }

    increaseRound() {
        this.currentRound += 1;
        this.history.push([]);
    }

    isVisited(x, y) {
        if (!x && !y) return true;
        for (let idx_round = 0; idx_round < this.history.length; idx_round++) {
            for (let idx_hist = 0; idx_hist < this.history[idx_round].length; idx_hist++) {
                if (this.history[idx_round][idx_hist].x === x && 
                    this.history[idx_round][idx_hist].y === y)
                    return true
                }
            }
        
    }

    setLegalMoves() {
        const legalMoves = [];
        if (this.x < this.columns - 1) {
            legalMoves.push('right');
        }
        if (this.x > 0) {
            legalMoves.push('left');
        }
        if (this.y < this.rows - 1) {
            legalMoves.push('down');
        }
        if (this.y > 0) {
            legalMoves.push('up')
        }
        this.legalMoves = legalMoves;
    }
    isLegal(move) {
        return this.legalMoves.indexOf(move) !== -1;
    }
    checkStepsMoreThanZero() {
        return this.steps > 0;
    }

    pushToHistory(move) {
        this.decreaseSteps()
        this.decreaseScore(1)
        console.log(this.currentRound, 'robot.js', 'line: ', '65');
        this.history[this.currentRound].push({
            x: this.x,
            y: this.y,
            move: move
        });
    }


    moveLeft() {
        if (!this.checkStepsMoreThanZero()) {
            return this.gameOver()
        }
        if (this.isLegal('left')) {
            this.x -= 1;
            this.currentMove = 'left'
            this.pushToHistory(this.currentMove);
            this.setLegalMoves()
        }
    }

    moveRight() {
        if (!this.checkStepsMoreThanZero()) {
            return this.gameOver()
        }
        if (this.isLegal('right')) {
            this.x += 1;
            this.currentMove = 'right'
            this.pushToHistory(this.currentMove);
            this.setLegalMoves()
        }
    }

    moveUp() {
        if (!this.checkStepsMoreThanZero()) {
            return this.gameOver()
        }
        if (this.isLegal('up')) {
            this.y -= 1;
            this.currentMove = 'up'
            this.pushToHistory(this.currentMove);
            this.setLegalMoves()
        }
    }

    moveDown() {
        if (!this.checkStepsMoreThanZero()) {
            return this.gameOver()
        }
        if (this.isLegal('down')) {
            this.y += 1;
            this.currentMove = 'down'
            this.pushToHistory(this.currentMove);
            this.setLegalMoves()
        }
    }

    decreaseScore(amount) {
        this.score -= amount;
    }
    increaseScore(amount) {
        this.score += amount;
    }

    decreaseSteps() {
        this.steps -= 1;
    }
}