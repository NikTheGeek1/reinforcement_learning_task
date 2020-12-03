import State from './stateRL';

export default class RobotRL extends State {
    constructor(score, steps, grid_rows, grid_columns) {
        super(grid_rows, grid_columns);
        this.x = 0;
        this.y = 0;
        this.currentRound = 0;
        this.currentMove = '';
        this.legalMoves = ['right', 'down'];
        this.score = score;
        this.steps = steps;
        this.robotHistory = [
            [{}]
        ];
    };

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

    getAbsoluteLegalMoves() {
        this.setLegalMoves();
        const MOVES = {
            up: [this.x, this.y - 1],
            down: [this.x, this.y + 1],
            left: [this.x - 1, this.y],
            right: [this.x + 1, this.y]
        };
        const absoluteMoves = this.legalMoves.map(move => {
            const moveObj = {x: MOVES[move][0], y: MOVES[move][1]};
            return moveObj;
        });
        return absoluteMoves;
    }

    getProbsOfAvailableMoves() {
        const absoluteMovesObjs = this.getAbsoluteLegalMoves();
        const absoluteMoves = absoluteMovesObjs.map(absoluteMovesObj => {
            return Object.values(absoluteMovesObj);
        });
        const probsOfMoves = this.probsOfPossibleMoves(absoluteMoves, this.robotHistory[this.currentRound]);
        return probsOfMoves;
    }

    move() {
        const absoluteMovesObjs = this.getAbsoluteLegalMoves();
        const absoluteMoves = absoluteMovesObjs.map(absoluteMovesObj => {
            return Object.values(absoluteMovesObj);
        });
        const probsOfMoves = this.getProbsOfAvailableMoves();
        const move = this.chooseAMove(probsOfMoves, absoluteMoves)
        this.addToHistory(move);
        this.x = move[0];
        this.y = move[1];
        
        return {x: move[0], y: move[1]};
    }


    addToHistory(move) {
        this.robotHistory[this.currentRound].push({x: move[0], y: move[1]});
    }

    chooseAMove(probs, moves) {
            const sum = probs.reduce((acc, el) => acc + el, 0); // this should sum to one
            if (sum != 1) {
                new Error('sum of probs is not equal to 1');
            }
            var acc = 0;
            probs = probs.map(el => (acc = el + acc));
            var rand = Math.random();
            return moves[probs.filter(el => el <= rand).length];
    }
    
    
    isVisited(x, y) {
        if (!x && !y) return true;
        for (let idx_round = 0; idx_round < this.robotHistory.length; idx_round++) {
            for (let idx_hist = 0; idx_hist < this.robotHistory[idx_round].length; idx_hist++) {
                if (this.robotHistory[idx_round][idx_hist].x === x && 
                    this.robotHistory[idx_round][idx_hist].y === y)
                    return true
                }
            }
    }


    fellInTrap() {
        this.decreaseScore(10);
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
        this.robotHistory.push([]);
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