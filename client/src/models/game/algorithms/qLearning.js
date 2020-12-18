export default class Qlearning {
    constructor(rows, columns, params) {
        this.name = 'Qlearning';
        this.rows = rows;
        this.columns = columns;
        this.h = params.h; // history penalty parameter
        this.a = params.a; // learning rate
        this.gamma = params.gamma; // reward decay
        this.e = params.e; // exploration chance
        this.initialReward = params.initialReward;

        this.rewards_mat = this.initialiseRewards();
        this.rewardsHistory = [];
        this.pushToHistory(this.rewards_mat);

    }

    goToInitialState(initState) {
        return initState;
    }

    pushToHistory(rewardsMat) {
        this.rewardsHistory.push(this.deepCopy(rewardsMat));
    }

    deepCopy(fromArray) {
        const newAarrayC = [];
        for (let c = 0; c < fromArray.length; c++) {
            const newArrayR = [];
            for (let r = 0; r < fromArray[c].length; r++) {
                const deepCopied = { ...fromArray[c][r] };
                newArrayR.push({
                    west: { ...deepCopied.west },
                    east: { ...deepCopied.east },
                    south: { ...deepCopied.south },
                    north: { ...deepCopied.north }
                });
            }
            newAarrayC.push(newArrayR);
        }
        return newAarrayC;
    }

    initialiseRewards() {
        const rewards_mat = [];
        for (let column = 0; column < this.columns.length; column++) {
            const row_list = []
            for (let row = 0; row < this.rows.length; row++) {
                row_list.push({
                    west: { reward: this.initialReward, x: column - 1, y: row, },
                    east: { reward: this.initialReward, x: column + 1, y: row },
                    north: { reward: this.initialReward, x: column, y: row - 1 },
                    south: { reward: this.initialReward, x: column, y: row + 1 }
                });
            }
            rewards_mat.push(row_list);
        }
        return rewards_mat;
    }

    exploit(moves) {

        let maxRewardIdx = 0;
        let higherReward = moves[maxRewardIdx].reward;

        for (let idx = 0; idx < moves.length; idx++) {
            if (moves[idx].reward > higherReward) {
                higherReward = moves[idx].reward;
                maxRewardIdx = idx;
                // or if there is a tie, chose one at random 
            } else if (moves[idx].reward === higherReward) {
                if (Math.random() > .5) maxRewardIdx = idx;
            }
        }
        return moves[maxRewardIdx];
    }

    exploreOnlyNonVisited(moves, grid) {
        const nonVisitedMoves = grid.grabNonVisited(moves);
        const idxChosen = Math.floor(Math.random() * nonVisitedMoves.length);
        return nonVisitedMoves[idxChosen];
    }

    exploreAll(moves) {
        const maxRewardIdx = Math.floor(Math.random() * moves.length);
        return moves[maxRewardIdx];
    }

    penaliseVisitedInRoundStates(state) {
        this.h && this.updateSelfFromAllDirections(state, this.h);
    }

    restoreRewardsOfVisitedStates(history) {
        this.h && history.forEach(state => {
            this.updateSelfFromAllDirections(state, -this.h);
        });
    }

    updateSelfFromAllDirections(state, value) {
        if (this.rewards_mat[state.x - 1]) { // from west
            this.rewards_mat[state.x - 1][state.y].east.reward += value;
        }
        if (this.rewards_mat[state.x + 1]) { // from east
            this.rewards_mat[state.x + 1][state.y].west.reward += value;
        }
        if (this.rewards_mat[state.x][state.y - 1]) { // from north
            this.rewards_mat[state.x][state.y - 1].south.reward += value;
        }
        if (this.rewards_mat[state.x][state.y + 1]) { // from south
            this.rewards_mat[state.x][state.y + 1].north.reward += value;
        }
    }

    chooseMove(moves, grid, exploreOnlyNonVisited = false) {
        // explore only non-visited (if there is any non-visited)
        if (exploreOnlyNonVisited && grid.grabNonVisited(moves).length) {
            if (Math.random() < this.e) {
                return this.exploreOnlyNonVisited(moves, grid);
            }
        } else {
            // explore all (visited/non-visited)
            if (Math.random() < this.e) {
                return this.exploreAll(moves);
            }
        }

        // exploit
        return this.exploit(moves);
    }

    updateRewards(history, reward) {
        this.restoreRewardsOfVisitedStates(history.filter((_, i) => i !== history.length));
        // setting the final's state reward to the
        // corresponding reward (either trap or finish)
        let updatedReward = reward;
        const lastState = history[history.length - 1];
        history[history.length - 1].reward = reward;
        // set last state's action rewards to reward
        for (const direction in this.rewards_mat[lastState.x][lastState.y]) {
            this.rewards_mat[lastState.x][lastState.y][direction].reward = reward;
        }
        history.reverse().forEach((state, idx) => {
            if (!idx) return;
            const lastDirection = history[idx - 1].direction;
            const currentQValue = this.rewards_mat[state.x][state.y][lastDirection].reward; // e.g. rewards_mat[0][3]['south'].reward
            // const currentQValue = history[idx].reward; // alternative to the above
            updatedReward = currentQValue + this.a * (this.gamma * updatedReward - currentQValue);
            this.rewards_mat[state.x][state.y][lastDirection].reward = updatedReward;
        });
        history.reverse();
        // push to grid history
        this.pushToHistory(this.rewards_mat);

        return history;
    }



    getRewardOfState(direction, state) {
        if (direction === 'east') return this.rewards_mat[state.x][state.y].east.reward;
        if (direction === 'west') return this.rewards_mat[state.x][state.y].west.reward;
        if (direction === 'north') return this.rewards_mat[state.x][state.y].north.reward;
        if (direction === 'south') return this.rewards_mat[state.x][state.y].south.reward;
    }

    getRewardsIfRobotAround(robotState, squareState) {
        // the robot is on the west of the current square
        if (robotState.x === squareState.x - 1 && robotState.y === squareState.y) return this.getRewardOfState('east', robotState);
        // the robot is on the east of the current square
        if (robotState.x === squareState.x + 1 && robotState.y === squareState.y) return this.getRewardOfState('west', robotState);
        // robot is on the north
        if (robotState.x === squareState.x && robotState.y === squareState.y - 1) return this.getRewardOfState('south', robotState);
        // robot is on the south
        if (robotState.x === squareState.x && robotState.y === squareState.y + 1) return this.getRewardOfState('north', robotState);
    }

}



