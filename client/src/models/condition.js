export default class Condition {
    constructor(
        finishingCoordinates,
        trapsCoordinates
    ) {

        this.finishingCoordinates = finishingCoordinates.map(coord => {
            return { ...coord, revealed: false };
        });
        
        this.numberOfTraps = trapsCoordinates.length;
        this.numberOfFinishLines = this.finishingCoordinates.length;


        this.trapsSpecs = trapsCoordinates.map(coord => {
            return { ...coord, revealed: false }
        });
    }

    isTrap(state) {
        for (const trap of this.trapsSpecs) {
            if (state.x === trap.x && state.y === trap.y) {
                return trap;
            }
        }
    }

    isFinish(state) {
        for (let i = 0; i < this.finishingCoordinates.length; i++) {
            if (state.x === this.finishingCoordinates[i].x && state.y === this.finishingCoordinates[i].y) {
                return this.finishingCoordinates[i];
            }
        }
    }

    isFinishReveald(finishLine) {
        return finishLine.revealed;
    }

    isTrapRevealed(trap) {
        return trap.revealed;
    }

    revealTrap(state) {
        this.trapsSpecs.forEach(trap => {
            if (trap.x === state.x && trap.y === state.y) trap.revealed = true;
        })
    }

    revealFinish(state) {
        this.finishingCoordinates.forEach(finish => {
            if (finish.x === state.x && finish.y === state.y) finish.revealed = true;
        });
    }


}