import State from './stateRL';

export default class RobotRL extends State {
    constructor(score, steps, grid_rows, grid_columns, finishingCoordinates, trapsCoordinates) {
        super(grid_rows, grid_columns, finishingCoordinates, trapsCoordinates);
        this.state = { x: 0, y: 0 }
        this.t = 0;
        this.legalMoves = this.setLegalMoves();
        this.score = score;
        this.steps = steps;
        this.robotHistory = [
            [{...this.state, reward: this.rewards_mat[0][0]}]
        ];
    };

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

    getAbsoluteMovesWithRewards() {
        this.setLegalMoves();
        const MOVES = {
            up: [this.state.x, this.state.y - 1],
            down: [this.state.x, this.state.y + 1],
            left: [this.state.x - 1, this.state.y],
            right: [this.state.x + 1, this.state.y]
        };
        const absoluteMoves = this.legalMoves.map(move => {
            const moveObj = { x: MOVES[move][0], y: MOVES[move][1] };
            return moveObj;
        });
        const absoluteMovesWithRewards = this.rewardsOfStates(absoluteMoves);
        return absoluteMovesWithRewards;
    }


    move() {
        const moves = this.getAbsoluteMovesWithRewards();
        const move = this.choseMove(moves);
        this.decreaseRewardOfVisitedState(move);
        this.state = move;
        
        this.addToHistory(move);
        return move;
    }

    choseMove(moves) {
        let idxOfHigherReward = 0;
        // exploration
        if (Math.random() < .1) {
            // TODO: randomly choose one of the non-visited moves
            const idxOfHigherReward = Math.floor(Math.random() * moves.length); 
        } else {
            // exploitation
            let higherReward = moves[idxOfHigherReward].reward;
            for (let idx = 0; idx < moves.length; idx++) {
                if (moves[idx].reward > higherReward) {
                    higherReward = moves[idx].reward;
                    idxOfHigherReward = idx;
                } 
                else if (moves[idx].reward === higherReward) {
                    if (Math.random() > .5) idxOfHigherReward = idx;
                }
            }
        }
        return moves[idxOfHigherReward];
    }

    addToHistory(move) {
        this.robotHistory[this.t].push(move);
    }

    fellInTrap() {
        this.updateRewards(this.robotHistory[this.t], -1);
        this.decreaseScore(10);
        this.increaseRound();
        this.goToStart();
    }

    goToStart() {
        this.state = { x: 0, y: 0 };
        this.setLegalMoves();
    }

    increaseRound() {
        this.t += 1;
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
    finish() {
        this.updateRewards(this.robotHistory[this.t], 1);
        this.increaseScore(50);
        this.increaseRound();
        this.goToStart();
    }

}