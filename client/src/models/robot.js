import State from './stateRL';
export default class Robot extends State {

    constructor(score, steps, grid_rows, grid_columns, finishingCoordinates, trapsCoordinates) {
        super(grid_rows, grid_columns, finishingCoordinates, trapsCoordinates, 0);
        this.state = {
            x: 0,
            y: 0
        };

        this.currentRound = 0;
        this.currentMove = '';
        this.legalMoves = ['right', 'down'];
        this.score = score;
        this.steps = steps;
        this.robotHistory = [
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
        this.state = {
            x: 0,
            y: 0
        };
        this.setLegalMoves();
    }

    increaseRound() {
        this.currentRound += 1;
        this.robotHistory.push([]);
    }


    setLegalMoves() {
        const legalMoves = [];
        if (this.state.x < this.columns - 1) {
            legalMoves.push('right');
        }
        if (this.state.x > 0) {
            legalMoves.push('left');
        }
        if (this.state.y < this.rows - 1) {
            legalMoves.push('down');
        }
        if (this.state.y > 0) {
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
        this.robotHistory[this.currentRound].push({
            x: this.state.x,
            y: this.state.y,
            move: move
        });
    }


    moveLeft() {
        // if (!this.checkStepsMoreThanZero()) {
        //     return this.gameOver()
        // }
        if (this.isLegal('left')) {
            this.state.x -= 1;
            this.currentMove = 'left'
            this.pushToHistory(this.currentMove);
            this.setLegalMoves()
        }
    }

    moveRight() {
        // if (!this.checkStepsMoreThanZero()) {
        //     return this.gameOver()
        // }
        if (this.isLegal('right')) {
            this.state.x += 1;
            this.currentMove = 'right'
            this.pushToHistory(this.currentMove);
            this.setLegalMoves()
        }
    }

    moveUp() {
        // if (!this.checkStepsMoreThanZero()) {
        //     return this.gameOver()
        // }
        if (this.isLegal('up')) {
            this.state.y -= 1;
            this.currentMove = 'up'
            this.pushToHistory(this.currentMove);
            this.setLegalMoves()
        }
    }

    moveDown() {
        // if (!this.checkStepsMoreThanZero()) {
        //     return this.gameOver()
        // }
        if (this.isLegal('down')) {
            this.state.y += 1;
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