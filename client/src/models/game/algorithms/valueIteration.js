export default class ValueIteration {
    constructor(rows, columns, params) {
        this.rows = rows;
        this.columns = columns;
        this.h = params.h; // history penalty parameter
        this.a = params.a; // learning rate
        this.e = params.e; // exploration chance
        this.initialReward = params.initialReward;

        this.rewards_mat = this.initialiseRewards();        
        this.rewardsHistory = [];
        this.pushToHistory(this.rewards_mat);

    }

    pushToHistory(rewardsMat) {
        this.rewardsHistory.push(this.deepCopy(rewardsMat));
    }

    deepCopy(fromArray) {
        const newAarray = [];
        for (let i = 0; i < fromArray.length; i++) {
            newAarray.push([...fromArray[i]]);
        }
        return newAarray;
    }

    initialiseRewards() {
        const rewards_mat = [];
        for (let row = 0; row < this.rows.length; row++) {
            const row_list = []
            for (let column = 0; column < this.columns.length; column++) {
                // if it's finish
                row_list.push(this.initialReward);
            }
            rewards_mat.push(row_list)
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
        if (this.h) this.rewards_mat[state.x][state.y] +=  this.h;
    }

    restoreRewardsOfVisitedStates(history) {
        this.h && history.forEach((state, idx) => {
            this.rewards_mat[state.x][state.y] += -this.h;
        });
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
        this.restoreRewardsOfVisitedStates(history.filter((_, i) => i !== history.length)); // all but the last one
        // setting the final's state reward to the
        // corresponding reward (either trap or finish)
        let updatedReward = reward;
        history[history.length - 1].reward = reward;
        history.reverse().forEach((state, idx) => {
            // if (!idx) return;
            const currentValue = this.rewards_mat[state.x][state.y]; // e.g. rewards_mat[0][3]['south'].reward
            // const currentQValue = history[idx].reward; // alternative to the above
            updatedReward = currentValue + this.a * (updatedReward - currentValue);
            this.rewards_mat[state.x][state.y] = updatedReward;
        });
        history.reverse();
        // push to grid history
        this.pushToHistory(this.rewards_mat);
        
        return history;
    }

    getRewardOfState(dummy, state) {
        return this.rewards_mat[state.x][state.y];
    }

}



