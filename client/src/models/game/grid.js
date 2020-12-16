export default class Grid {
    constructor(rows, columns, finishingCoordinates, trapsCoordinates, params) {
        this.rows = rows;
        this.columns = columns;
        this.trapPenalty = params.trapPenalty;
        this.finishReward = params.finishReward;
        this.finishLines = finishingCoordinates.map(coord => {
            return { ...coord, revealed: false };
        });
        
        this.numberOfTraps = trapsCoordinates.length;
        this.numberOfFinishLines = this.finishLines.length;

        this.traps = trapsCoordinates.map(coord => {
            return { ...coord, revealed: false };
        });

    }

    
    
    isTrap(state) {
        for (const trap of this.traps) {
            if (state.x === trap.x && state.y === trap.y) {
                return true;
            }
        }
    }

    isFinish(state) {
        for (let i = 0; i < this.finishLines.length; i++) {
            if (state.x === this.finishLines[i].x && state.y === this.finishLines[i].y) {
                return true;
            }
        }
    }

    isVisited(state, history) {
        for (let round_i = 0; round_i < history.length; round_i++) {
            for (let state_i = 0; state_i < history[round_i].length; state_i++) {
                if (history[round_i][state_i].x === state.x &&
                    history[round_i][state_i].y === state.y) return {
                        visited: true,
                        roundIdx: round_i,
                        stateIdx: state_i
                    };
            }
        }
        return {
            visited: false,
            roundIdx: false,
            stateIdx: false
        };
    }

    grabNonVisited(moves) {
        return moves.filter(move => !this.isVisited(move).visited);
    }

    isVisitedInRound(state, history, t) {
        for (let state_i = 0; state_i < history[t].length; state_i++) {
            if (history[t][state_i].x === state.x &&
                history[t][state_i].y === state.y) return {visited: true, stateIdx: state_i};
        }
        return {visited: false, stateIdx: false}
    }
    

}