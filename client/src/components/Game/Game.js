import React, { useCallback, useEffect, useState } from 'react';

import Classes from './Game.module.scss';
import ClassesMovements from './Movements.module.scss';
import ClassesScore from './ScoreBoard.module.scss';

import ClassesGrid from './Grid.module.scss';
import Robot from '../../models/robot';
import Robocop from '../../static/images/human.png';
import { gridStyle, rowStyle, squareStyle, rows, columns } from '../../models/setUpGrid';
import { finishingCoordinates, trapsCoordinates } from '../../models/setUpConditions';


const robot = new Robot(100, 0, rows.length, columns.length, finishingCoordinates, trapsCoordinates)

const Game = props => {
    const [showScore, setShowScore] = useState({ plus: false, minus: false })
    const [moveSpecs, setMoveSpecs] = useState({
        state: {
            x: robot.state.x,
            y: robot.state.y
        },
        currentMove: robot.currentMove,
        facingDirection: ''
    });
    const makeMovement = useCallback(e => {
        if (e.keyCode === 37) {// left
            robot.moveLeft()
            setMoveSpecs({
                state: {
                    x: robot.state.x,
                    y: robot.state.y
                },
                currentMove: robot.currentMove,
                facingDirection: 'RobocopRev'
            });
        } else if (e.keyCode === 38) {// up
            robot.moveUp()
            setMoveSpecs({
                ...moveSpecs, state: {
                    x: robot.state.x,
                    y: robot.state.y
                }, currentMove: robot.currentMove
            });
        } else if (e.keyCode === 39) {// right
            robot.moveRight()
            setMoveSpecs({
                ...moveSpecs,
                state: {
                    x: robot.state.x,
                    y: robot.state.y
                },
                currentMove: robot.currentMove,
                facingDirection: ''
            });
        } else if (e.keyCode === 40) {// down
            robot.moveDown()
            setMoveSpecs({
                ...moveSpecs, state: {
                    x: robot.state.x,
                    y: robot.state.y
                }, currentMove: robot.currentMove
            });
        }
    }, [setMoveSpecs, moveSpecs]);

    useEffect(() => {
        document.addEventListener('keydown', makeMovement);
        return () => {
            document.removeEventListener('keydown', makeMovement);
        }
    });


    useEffect(() => {
        if (robot.isTrap(moveSpecs.state)) {
            robot.fellInTrap();
            robot.revealTrap(moveSpecs.state);
            setMoveSpecs({
                ...moveSpecs, state: {
                    x: 0,
                    y: 0
                }
            });
        }
        if (robot.isFinish(moveSpecs.state)) {
            robot.finish();
            robot.revealFinish(moveSpecs.state);
            setMoveSpecs({
                ...moveSpecs, state: {
                    x: 0,
                    y: 0
                }
            });
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
                                robot.isVisited({ x: square, y: row }) && ClassesGrid.Visited,
                                robot.isFinish({ x: square, y: row }) && robot.isFinishReveald() && ClassesGrid.Finishing,
                                robot.isTrap({ x: square, y: row }) && robot.isTrapRevealed(robot.isTrap({ x: square, y: row })) && ClassesGrid.Trap
                            ].join(" ")}
                            style={squareStyle}>
                            {row === moveSpecs.state.y && square === moveSpecs.state.x &&
                                <img
                                    className={[
                                        Classes.Robocop,
                                        ClassesMovements[moveSpecs.currentMove],
                                        Classes[moveSpecs.facingDirection]
                                    ].join(" ")}
                                    src={Robocop} alt="Robocop"
                                />}
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

    if (robot.isTrap(robot.state) && !showScore.minus) {
        setShowScore({ ...showScore, minus: true });
    }
    if (robot.isFinish(robot.state) && !showScore.plus) {
        setShowScore({ ...showScore, plus: true });
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
        <div className={Classes.OuterContainer}>
            <div className={ClassesScore.ScoreContainer}>
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
            <div className={Classes.GameGrid} style={gridStyle}>
                {grid}
            </div>
        </div>

    );
};

export default Game;