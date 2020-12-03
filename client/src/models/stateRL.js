export default class State {
    constructor(grid_rows, grid_columns) {
        this.rows = grid_rows;
        this.columns = grid_columns;
        this.stateHistory = [
            [{}]
        ];
        this.round = 0;
        this.h = .1; // history penalty parameter
        this.rewards_mat = [];
        for (let row = 0; row < this.rows; row++) {
            const row_list = []
            for (let column = 0; column < this.columns; column++) {
                row_list.push(1)
            }
            this.rewards_mat.push(row_list)
        }
    }

    rewardsToProbs(rewards) { // rewards is list
        // summing
        let totalReward = 0;
        for (const reward of rewards) {
            totalReward += reward;
        };
        // division
        const probabilities = rewards.map(reward => {
            return reward / totalReward;
        });
        return probabilities;
    }

    rewardsOfStates(states, roundHistory) { // states is an array of absolute moves eg [[10, 2], [3, 4]]
        const rewards = states.map(move_coord => {
            let x = move_coord[0];
            let y = move_coord[1];
            return this.isVisitedInRound(x, y, roundHistory) ? this.rewards_mat[x][y] * this.h : this.rewards_mat[x][y];
        });
        
        return rewards;
    }

    
    probsOfPossibleMoves(possibleMoves, roundHistory) { // this is an array of absolute moves eg [[3, 34], [3, 4]]
        const rewards = this.rewardsOfStates(possibleMoves, roundHistory);
        const probabilitites = this.rewardsToProbs(rewards);
        return probabilitites;
    }

    isVisitedInRound(x, y, roundHistory) {
        if (!x && !y) return true;
        for (let stateIdx = 0; stateIdx < roundHistory.length; stateIdx++) {
            if (roundHistory[stateIdx].x === x &&
                roundHistory[stateIdx].y === y)
                return true
        }
    }

    whichVisitedInRound(x, y, roundHistory) {
        for (let stateIdx = 0; stateIdx < roundHistory.length; stateIdx++) {
            if (roundHistory[stateIdx].x === x &&
                roundHistory[stateIdx].y === y)
                return stateIdx
        }
    }

}