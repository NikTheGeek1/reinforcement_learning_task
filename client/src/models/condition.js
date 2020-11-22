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

    isTrap(x, y) {
        for (const trap of this.trapsSpecs) {
            if (x === trap.x && y === trap.y) {
                return trap;
            }
        }
    }
    isFinish(x, y) {
        if (this.finishingCoordinates.x === x &&
            this.finishingCoordinates.y === y) return true;
    }
    isFinishReveald() {
        return this.finishingCoordinates.revealed;
    }

    isTrapRevealed(trap) {
        return trap.revealed;
    }

    revealTrap(x, y) {
        this.trapsSpecs.forEach(trap => {
            if (trap.x === x && trap.y === y) trap.revealed = true;
        })
    }

    revealFinish(x, y) {
        if (this.finishingCoordinates.x === x &&
            this.finishingCoordinates.y === y) this.finishingCoordinates.revealed = true;
    }


}