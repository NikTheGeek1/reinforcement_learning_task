import React, { useCallback, useEffect, useState } from 'react';

import Classes from './Game.module.scss';
import ClassesMovements from './Movements.module.scss';
import ClassesScore from './ScoreBoard.module.scss';
import ClassesGrid from './Grid.module.scss';
import Robot from '../../models/robotRL';
import Report from '../../models/report.js';
import Robocop from '../../static/images/human.png';
import { gridStyle, rowStyle, squareStyle, rows, columns } from '../../models/setUpGrid';
import { finishingCoordinates, trapsCoordinates } from '../../models/setUpConditions';
import { useSelector } from 'react-redux';


const robot = new Robot(100, 0, rows.length, columns.length, finishingCoordinates, trapsCoordinates)
const report = new Report();
const Game = props => {
    const parameters = useSelector(state => state.parameters.valueIteration);
    useEffect(() => {
        robot.score = parameters.score;
        robot.steps = parameters.steps;
        robot.h = parameters.h;
        robot.l = parameters.l;
        robot.e = parameters.e;
    }, [parameters])
    const [showScore, setShowScore] = useState({ plus: false, minus: false })
    const [moveSpecs, setMoveSpecs] = useState({
        state: robot.state,
        moves: robot.getAbsoluteMovesWithRewards(),
    });

    useEffect(() => {
        const timer = setTimeout(() => {

            const moveObj = robot.move();
            setMoveSpecs({
                ...moveSpecs,
                state: moveObj
            });

        }, parameters.robotTimeMs);
        return () => clearTimeout(timer)
    }, [moveSpecs])

    useEffect(() => {
        if (robot.isTrap(moveSpecs.state)) {
            robot.fellInTrap();
            robot.revealTrap(moveSpecs.state);
            setMoveSpecs({ ...moveSpecs, state: { x: 0, y: 0 } });
        }
        if (robot.isFinish(moveSpecs.state)) {
            robot.finish();
            robot.revealFinish(moveSpecs.state);
            setMoveSpecs({ ...moveSpecs, state: { x: 0, y: 0 } });
        }
    }, [moveSpecs])


    const grid = rows.map(y => {
        return (
            <div key={y} className={Classes.GameRow} style={rowStyle}>
                {columns.map(x => {
                    const state = { x, y };
                    // LOGIC
                    // individual square classes
                    let squareClasses = [Classes.GameSquare];
                    if (robot.isVisited(state)) squareClasses.push(ClassesGrid.Visited);
                    if (robot.isVisited(state)) squareClasses.push(ClassesGrid.Visited);
                    if (robot.isVisitedInRound(state, robot.robotHistory[robot.t])) squareClasses.push(ClassesGrid.VisitedRound);
                    if (robot.isFinish(state) && robot.isFinishReveald()) squareClasses.push(ClassesGrid.Finishing)
                    if (robot.isTrap(state) && robot.isTrapRevealed(robot.isTrap(state))) squareClasses.push(ClassesGrid.Trap)
                    squareClasses = squareClasses.join(" ")
                    // robot classes
                    let showRobot = false;
                    if (y === moveSpecs.state.y && x === moveSpecs.state.x) showRobot = true;
                    let robotClasses = [
                        Classes.Robocop,
                        ClassesMovements[moveSpecs.currentMove],
                        Classes[moveSpecs.facingDirection]
                    ].join(" ");
                    // rewards 
                    let showRewards = true;
                    return (
                        //printing the square 
                        <div key={x}
                            className={squareClasses}
                            style={squareStyle}>
                            {/* printing the robot */}
                            {showRobot &&
                                <img
                                    className={robotClasses}
                                    src={Robocop} alt="Robocop"
                                />}
                            {/* printing probs */}
                            <span className={ClassesGrid.Probs}>{
                                showRewards &&
                                robot.rewards_mat[state.x][state.y]
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

    if (robot.isTrap(moveSpecs.state) && !showScore.minus) {
        const chanceOfExplor = report.getChanceOfExploringForAllRounds(robot.robotHistory);
        console.log(chanceOfExplor, 'Game.js', 'line: ', '107');
        setShowScore({ ...showScore, minus: true });
    }
    if (robot.isFinish(moveSpecs.state) && !showScore.plus) {
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
            <button onClick={() => props.onShowStats(
                report.stepsToFinishInEachRound(robot.robotHistory, robot.finishingCoordinates).length,
                report.stepsToFinishInEachRound(robot.robotHistory, robot.finishingCoordinates)
            )}>
                Stats</button>
        </div>
    );
};

export default Game;