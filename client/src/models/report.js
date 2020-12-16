export default class Report {
    constructor() {
        this.stepsToFinishInRound = [];
    }

    getChanceOfExploring(history) {
        // get back an array of 0 and 1 indicating
        // if the agent chose to explore (1) or exploit (0)
        // in the current time point t in the current round
        const history_ = history.filter(moveHist => moveHist.alternatives);
        const timesOfExploring = history_
            .map(move => {
                return move.alternatives.every(altMove => !(altMove.reward < move.reward));
            });
        const total = this.sum(timesOfExploring);
        return total / history_.length;
    }

    getChanceOfExploringForAllRounds(allHistory) {
        // probability of exploring across all rounds
        const chanceOfExploringInRounds = allHistory.map(round => {
            return this.getChanceOfExploring(round);
        });
        
        const total = this.sum(chanceOfExploringInRounds);
        return total / allHistory.length;
    }

    sum(numArray) {
        let total = 0;
        numArray.forEach(move => total = total + move);
        return total;
    }

    stepsBeforeFinish(history, finishStates) {
        // Getting the number of steps it took them 
        // to find the finishing state
        let numSteps = 0;
        let foundFinish = false;
        let idxRound = 0;
        while (!foundFinish) {
            const round = history[idxRound];
            numSteps += round.length;
            const endingState = round[round.length - 1];
            for (let i = 0; i < finishStates.length; i++) {                
                if (endingState.x === finishStates[i].x && endingState.y === finishStates[i].y) {
                    foundFinish = true;
                    break;
                }
            }
            idxRound++;
        }
        return numSteps;
    }

    roundsBeforeFinish(history, finishStates) {
        // Getting the number of rounds it took them 
        // to find the finishing state
        let foundFinish = false;
        let idxRound = 0;
        while (!foundFinish) {
            const round = history[idxRound];
            const endingState = round[round.length - 1];
            for (let i = 0; i < finishStates.length; i++) {                
                if (endingState.x === finishStates[i].x && endingState.y === finishStates[i].y) {
                    foundFinish = true;
                    break;
                }
            }
            idxRound++;
        }
        return idxRound;
    }

    stepsToFinishInEachRound(history, finishStates) {
        // gets the number of steps in each winning round
        // returns an array of numbers
        const numSteps = [];
        for (const round of history) {
            if (round.length) {
                const endingState = round[round.length - 1];
                for (let i = 0; i < finishStates.length; i++) {                
                    if (endingState.x === finishStates[i].x && endingState.y === finishStates[i].y) {
                        numSteps.push(round.length);
                        break;
                    }
                }
            }
        }
        return numSteps;
    }

    scoreBeforeFinish(history, finishState) {
        // to be added. possibly depends on condition setup
    }

}