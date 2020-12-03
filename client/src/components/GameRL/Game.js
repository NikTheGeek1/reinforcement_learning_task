import React, { useCallback, useEffect, useState } from 'react';

import Classes from './Game.module.scss';
import ClassesMovements from './Movements.module.scss';
import ClassesScore from './ScoreBoard.module.scss';

import ClassesGrid from './Grid.module.scss';
import Robot from '../../models/robotRL';
import Robocop from '../../static/images/human.png';
import { gridStyle, rowStyle, squareStyle, rows, columns } from '../../models/setUpGrid';
import { condition } from '../../models/setUpConditions';


const robot = new Robot(100, 100, rows.length, columns.length)

const Game = props => {
    const [showScore, setShowScore] = useState({ plus: false, minus: false })
    const [moveSpecs, setMoveSpecs] = useState({
        x: robot.x,
        y: robot.y,
        moves: robot.getAbsoluteLegalMoves(),
        probs: robot.getProbsOfAvailableMoves()
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            const moveObj = robot.move();
            const moves = robot.getAbsoluteLegalMoves();
            const probs = robot.getProbsOfAvailableMoves();
            setMoveSpecs({
                ...moveSpecs, 
                x: moveObj.x, 
                y: moveObj.y,
                moves: moves,
                probs: probs
            });
            
        }, 1000);
        return () => clearTimeout(timer)
    }, [moveSpecs])

    useEffect(() => {
        if (condition.isTrap(moveSpecs.x, moveSpecs.y)) {
            robot.fellInTrap();
            condition.revealTrap(moveSpecs.x, moveSpecs.y);
            setMoveSpecs({ ...moveSpecs, x: 0, y: 0 });
        }
        if (condition.isFinish(moveSpecs.x, moveSpecs.y)) {
            robot.finish();
            condition.revealFinish(moveSpecs.x, moveSpecs.y);
            setMoveSpecs({ ...moveSpecs, x: 0, y: 0 });
        }
    }, [moveSpecs])


    const grid = rows.map(row => {
        return (
            <div key={row} className={Classes.GameRow} style={rowStyle}>
                {columns.map(square => {
                    return (
                        <div key={square}
                            className={[
                                Classes.GameSquare,
                                robot.isVisited(square, row) && ClassesGrid.Visited,
                                condition.isFinish(square, row) && condition.isFinishReveald() && ClassesGrid.Finishing,
                                condition.isTrap(square, row) && condition.isTrapRevealed(condition.isTrap(square, row)) && ClassesGrid.Trap
                            ].join(" ")}
                            style={squareStyle}>
                                {/* printing the robot */}
                            {row === moveSpecs.y && square === moveSpecs.x &&
                                <img
                                    className={[
                                        Classes.Robocop,
                                        ClassesMovements[moveSpecs.currentMove],
                                        Classes[moveSpecs.facingDirection]
                                    ].join(" ")}
                                    src={Robocop} alt="Robocop"
                                />}
                                {/* printing probs */}
                                <span className={ClassesGrid.Probs}>{
                                    robot.isVisitedInRound(
                                        square, 
                                        row,
                                        moveSpecs.moves) && moveSpecs.probs[robot.whichVisitedInRound(
                                            square, 
                                            row,
                                            moveSpecs.moves)]
                                }</span>
                        </div>
                    );
                })}
            </div>
        );
    });
    // score board logic
    const cleanScore = useCallback((scoreType) => {
        const timer = setTimeout(() => {
            setShowScore({ ...showScore, [scoreType]: false });
            clearTimeout(timer)
        }, 700);
    }, [showScore, setShowScore]);

    if (condition.isTrap(robot.x, robot.y) && !showScore.minus) {
        setShowScore({ ...showScore, minus: true })
    }
    if (condition.isFinish(robot.x, robot.y) && !showScore.plus) {
        setShowScore({ ...showScore, plus: true })
    }
    let plusScore;
    let minusScore;
    if (showScore.plus) {
        plusScore = <span className={ClassesScore.PlusScore}> +50</span>;
        cleanScore('plus');
    }

    if (showScore.minus) {
        minusScore = <span className={ClassesScore.MinusScore}> -10</span>;
        cleanScore('minus')
    }
    ///////
    return (
        <div className={Classes.GameGrid} style={gridStyle}>
            <div className={ClassesScore.Container}>
                <h3>Score Board</h3>
                <hr />
                <div className={ClassesScore.StepsDiv}>
                    <p className={ClassesScore.SubText}>Steps: {robot.steps} </p>
                </div>
                <div className={ClassesScore.ScoreDiv}>
                    <p className={ClassesScore.SubText}>Score: {robot.score}
                        {plusScore} {minusScore}</p>
                </div>
            </div>
            {grid}
        </div>
    );
};

export default Game;