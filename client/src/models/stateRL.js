import Condition from './condition';

export default class State extends Condition {
    constructor(grid_rows, grid_columns, finishingCoordinates, trapsCoordinates) {
        super(finishingCoordinates, trapsCoordinates)
        
        this.rows = grid_rows;
        this.columns = grid_columns;
        this.stateHistory = [
            [{}]
        ];
        this.h = .1; // history penalty parameter
        this.l = .1; // learning rate
        this.rewards_mat = [];
        for (let row = 0; row < this.rows; row++) {
            const row_list = []
            for (let column = 0; column < this.columns; column++) {
                // if it's finish
                
                row_list.push(0)
            }
            this.rewards_mat.push(row_list)
        }
    }


    rewardsOfStates(states) { // states is an array of absolute moves eg [[10, 2], [3, 4]]
        states.forEach((state, idx) => {
            const reward = this.rewards_mat[state.x][state.y];
            states[idx] = {...states[idx], reward};
        });

        return states;
    }

    probsOfPossibleMoves(possibleMoves, roundHistory) { // this is an array of absolute moves eg [[3, 34], [3, 4]]
        const rewards = this.rewardsOfStates(possibleMoves, roundHistory);
        const probabilitites = this.rewardsToProbs(rewards);
        return probabilitites;
    }

    isVisited(state) {
        if (!state.x && !state.y) return true;
        for (let idx_round = 0; idx_round < this.robotHistory.length; idx_round++) {
            for (let idx_hist = 0; idx_hist < this.robotHistory[idx_round].length; idx_hist++) {
                if (this.robotHistory[idx_round][idx_hist].x === state.x &&
                    this.robotHistory[idx_round][idx_hist].y === state.y)
                    return true
            }
        }
    }

    isVisitedInRound(state, roundHistory) {
        if (!state.x && !state.y) return true;
        for (let stateIdx = 0; stateIdx < roundHistory.length; stateIdx++) {
            if (roundHistory[stateIdx].x === state.x &&
                roundHistory[stateIdx].y === state.y)
                return true
        }
    }

    whichVisitedInRound(state, roundHistory) {
        for (let stateIdx = 0; stateIdx < roundHistory.length; stateIdx++) {
            if (roundHistory[stateIdx].x === state.x &&
                roundHistory[stateIdx].y === state.y)
                return stateIdx
        }
    }


    updateRewardTrap(state) {
        this.rewards_mat[state.x][state.y] = 0;
    }

    updateRewards(history, reward) {
        history[history.length-1].reward = reward;
        history.reverse().forEach((state, idx) => {
            // let previousReward = history[idx].reward;
            // if (idx !== 0) {
            //     previousReward = history[idx-1].reward;
            // }
            
            this.rewards_mat[state.x][state.y] = history[idx].reward + this.l * (reward - history[idx].reward);
            history[idx].reward = this.rewards_mat[state.x][state.y];
        })

        return history;
    }
}