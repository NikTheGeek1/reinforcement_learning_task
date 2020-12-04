export default class Condition {
    constructor(
        finishingCoordinates,
        trapsCoordinates
    ) {
        this.finishingCoordinates = { ...finishingCoordinates, revealed: false };
        this.numberOfTraps = trapsCoordinates.length;
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
        if (this.finishingCoordinates.x === state.x &&
            this.finishingCoordinates.y === state.y) return true;
    }
    isFinishReveald() {
        return this.finishingCoordinates.revealed;
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
        if (this.finishingCoordinates.x === state.x &&
            this.finishingCoordinates.y === state.y) this.finishingCoordinates.revealed = true;
    }


}