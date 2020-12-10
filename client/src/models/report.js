export default class Report {

    getChanceOfExploring(history) {
        // get back an array of 0 and 1 indicating
        // if the agent chose to explore (1) or exploit (0)
        // in the current time point t in the current round
        const history_ = history.filter(moveHist => moveHist.alternatives);
        const timesOfExploring = history_
            .map(move => {
                for (const altMove of move.alternatives) {
                    if (move.reward < altMove.reward) {
                        return 1
                    } else {
                        return 0
                    }
                }
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

    stepsBeforeFinish(history, finishState) {
        // Getting the number of steps it took them 
        // to find the finishing state
        let numSteps = 0;
        let foundFinish = false;
        let idxRound = 0;
        while (!foundFinish) {
            const round = history[idxRound];
            numSteps += round.length;
            const endingState = round[round.length - 1];
            if (endingState.x === finishState.x && endingState.y === finishState.y) {
                foundFinish = true;
            }
            idxRound++;
        }
        return numSteps;
    }

    roundsBeforeFinish(history, finishState) {
        // Getting the number of rounds it took them 
        // to find the finishing state
        let foundFinish = false;
        let idxRound = 0;
        while (!foundFinish) {
            const round = history[idxRound];
            const endingState = round[round.length - 1];
            if (endingState.x === finishState.x && endingState.y === finishState.y) {
                foundFinish = true;
            }
            idxRound++;
        }
        return idxRound;
    }

    stepsToFinishInEachRound(history, finishState) {
        // gets the number of steps in each winning round
        // returns an array of numbers
        const numSteps = [];
        for (const round of history) {
            if (round.length) {
                const endingState = round[round.length - 1];
                if (endingState.x === finishState.x && endingState.y === finishState.y) {
                    numSteps.push(round.length);
                }
            }
        }
        return numSteps;
    }

    scoreBeforeFinish(history, finishState) {
        // to be added. possibly depends on condition setup
    }

}