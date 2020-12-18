export default class MonteCarlo {
    constructor(rows, columns, params) {
        this.name = 'MonteCarlo';
        this.rows = rows;
        this.columns = columns;
        this.h = params.h; // history penalty parameter
        // this.a = params.a; // learning rate
        this.e = params.e; // exploration chance
        this.initialReward = params.initialReward;
        this.gamma = params.gamma;
        this.rewards_mat = this.initialiseRewards();
        this.rewardsHistory = [];
        this.pushToHistory(this.rewards_mat);

    }

    goToInitialState(state, grid) {
        let x = Math.floor(Math.random() * this.columns.length);
        let y = Math.floor(Math.random() * this.rows.length);
        let move = { x, y };
        while (grid.isTrap(move) || grid.isFinish(move)) {
            x = Math.floor(Math.random() * this.columns.length);
            y = Math.floor(Math.random() * this.rows.length);
            move = { x, y };
        }

        return { x, y };
    }

    getRewardOfState(direction, state) {
        if (direction === 'east') return this.rewards_mat[state.x + 1][state.y].V;
        if (direction === 'west') return this.rewards_mat[state.x - 1][state.y].V;
        if (direction === 'north') return this.rewards_mat[state.x][state.y - 1].V;
        if (direction === 'south') return this.rewards_mat[state.x][state.y + 1].V;
        if (direction === 'current') return this.rewards_mat[state.x][state.y].V;
    }

    penaliseVisitedInRoundStates(state) {
        if (this.h) this.rewards_mat[state.x][state.y].V += this.h;
    }

    restoreRewardsOfVisitedStates(history) {
        this.h && history.forEach((state, idx) => {
            this.rewards_mat[state.x][state.y].V += -this.h;
        });
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

    isVisitedInRound(state, history) {
        for (let state_i = 0; state_i < history.length; state_i++) {
            if (history[state_i].x === state.x &&
                history[state_i].y === state.y) return true;
        }
        return false
    }

    updateRewards(history, reward) {
        this.restoreRewardsOfVisitedStates(history.filter((_, i) => i !== history.length)); // all but the last one

        let G = reward;
        // history[history.length - 1].V = reward;
        history.reverse().forEach((state, idx) => {
            if (this.isVisitedInRound(state, history.slice(0, idx))) return; // <- first visit monte carlo
            this.rewards_mat[state.x][state.y].returns.push(G);
            G = this.gamma * G;
            const newValue = this.average(this.rewards_mat[state.x][state.y].returns);
            this.rewards_mat[state.x][state.y].deltas.push(
                Math.abs(this.rewards_mat[state.x][state.y].V - newValue)
            );
            this.rewards_mat[state.x][state.y].V = newValue;
        });
        history.reverse();
        // push to grid history
        this.pushToHistory(this.rewards_mat);
        return history;
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
                    ...deepCopied,
                    returns: { ...deepCopied.returns },
                    deltas: { ...deepCopied.deltas }
                });
            }
            newAarrayC.push(newArrayR);
        }
        return newAarrayC;
    }

    sum(numArray) {
        let total = 0;
        numArray.forEach(move => total = total + move);
        return total;
    }

    average(numArray) {
        const total = this.sum(numArray);
        return total / numArray.length;
    }

    initialiseRewards() {
        const rewards_mat = [];
        for (let column = 0; column < this.columns.length; column++) {
            const row_list = []
            for (let row = 0; row < this.rows.length; row++) {
                row_list.push({ V: this.initialReward, returns: [], deltas: [] });
            }
            rewards_mat.push(row_list);
        }
        return rewards_mat;
    }

}