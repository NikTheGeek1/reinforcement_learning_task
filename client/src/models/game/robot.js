export default class RobotComputer {
    constructor(algorithm, grid, state, params, initialDirection = 'east') {
        this.algorithm = algorithm;
        this.grid = grid;
        this.initialState = this.algorithm.goToInitialState(state, this.grid);
        this.state = { ...this.initialState };
        // robot parameters
        this.steps = params.steps;
        this.score = params.score;
        //
        this._legalMoves = [];
        this.initialDirection = initialDirection;
        this.history = [[{ reward: algorithm.initialReward, direction: this.initialDirection, ...this.state, alternatives: null }]];
        this.t = 0;
        this.algorithm.penaliseVisitedInRoundStates(this.state);
        this.setLegalMoves();
    }

    move() {
        // decrease rewards visited in round. 0 h for no penalty

        // set legal moves
        // choose move

        const move = this.algorithm.chooseMove(this._legalMoves);
        this.algorithm.penaliseVisitedInRoundStates(move);
        this.state = move;
        this.setLegalMoves();

        // move 

        // get alternatives 
        const altMoves = this._legalMoves.filter(altMove => altMove !== move);
        // push to history 
        this.pushToHistory({ ...move, alternatives: altMoves });
        this.increaseSteps();
        if (this.grid.isTrap(move)) {
            this.fellInTrap();
            return 'trap';
        }
        if (this.grid.isFinish(move)) {
            this.fellInFinish();
            return 'finish';
        }
    }

    pushToHistory(move) {
        this.history[this.t].push(move);
    }

    setLegalMoves() {
        const legalMoves = [];
        if (this.state.x < this.grid.columns.length - 1) {
            legalMoves.push({
                reward: this.algorithm.getRewardOfState('east', this.state),
                direction: 'east',
                x: this.state.x + 1,
                y: this.state.y
            });
        }
        if (this.state.x > 0) { // left
            legalMoves.push({
                reward: this.algorithm.getRewardOfState('west', this.state),
                direction: 'west',
                x: this.state.x - 1,
                y: this.state.y
            }); // left
        }
        if (this.state.y < this.grid.rows.length - 1) {
            legalMoves.push({
                reward: this.algorithm.getRewardOfState('south', this.state),
                direction: 'south',
                x: this.state.x,
                y: this.state.y + 1
            });
        }
        if (this.state.y > 0) {
            legalMoves.push({
                reward: this.algorithm.getRewardOfState('north', this.state),
                direction: 'north',
                x: this.state.x,
                y: this.state.y - 1
            })
        }
        this._legalMoves = legalMoves;
    }

    goToStart() {
        this.state = this.algorithm.goToInitialState(this.initialState, this.grid);
        this.algorithm.penaliseVisitedInRoundStates(this.state, this.grid);
        this.setLegalMoves();
        this.increaseRound();
        // calculate rewards
        this.pushToHistory(
            {
                reward: this.algorithm.getRewardOfState('current', { x: this.initialState.x, y: this.initialState.y }),
                direction: this.initialDirection,
                ...this.state,
                alternatives: null
            });
    }

    fellInTrap() {
        this.algorithm.updateRewards(this.history[this.t], this.grid.trapPenalty);
        this.updateScore(this.grid.trapPenalty);
        this.goToStart();
    }

    fellInFinish() {
        this.algorithm.updateRewards(this.history[this.t], this.grid.finishReward);
        this.updateScore(this.grid.finishReward)
        this.goToStart();
    }

    updateScore(amount) {
        this.score += amount;
    }
    decreaseSteps() {
        this.steps -= 1;
    }
    increaseSteps() {
        this.steps += 1;
    }
    increaseRound() {
        this.t += 1;
        this.history.push([]);
    }

    isRobotOnState(state) {
        return this.state.x === state.x && this.state.y === state.y;
    }
}