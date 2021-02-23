import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import ScoreBoard from '../ScoreBoard/ScoreBoard';
import GridComponent from '../Grid/Grid';

import Classes from './Game.module.scss';

let algorithm;
let grid;
let robot;
const PlayGame = props => {

    const params = useSelector(state => state.parameters[props.parameters]);
    const [scoreBoard, setScoreBoard] = useState({ showPlus: false, showMinus: false, dummy: 0 });
    const [restart, setRestart] = useState(false);
    
    useMemo(() => {
        algorithm = new props.Algorithm(props.gridSpecs.rows, props.gridSpecs.columns, params);
        grid = new props.Grid(props.gridSpecs.rows, props.gridSpecs.columns, props.gridSpecs.finishingCoordinates, props.gridSpecs.trapsCoordinates, params);
        robot = new props.Robot(algorithm, grid, { x: 0, y: 0 }, params);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restart, props.Algorithm, props.Grid, props.Robot]);

    const trapOrFinish = trapOrFinish => {
        setScoreBoard({ showMinus: false, showPlus: false, dummy: scoreBoard.dummy + 1 });
        trapOrFinish === 'finish' && setScoreBoard({ showMinus: false, showPlus: true });
        trapOrFinish === 'trap' && setScoreBoard({ showMinus: true, showPlus: false });
    };

    const makeMovement = e => {
        if (e.keyCode === 37) {// left
            trapOrFinish(robot.moveWest());
        } else if (e.keyCode === 38) {// up
            trapOrFinish(robot.moveNorth());
        } else if (e.keyCode === 39) {// right
            trapOrFinish(robot.moveEast());
        } else if (e.keyCode === 40) {// down
            trapOrFinish(robot.moveSouth());
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', makeMovement);
        return () => {
            document.removeEventListener('keydown', makeMovement);
        }
    });

    const restartHandler = () => {
        setRestart(oldState => !oldState);
    };

    const analysisHandler = () => {
        props.onAnalysis({
            robotHistory: robot.history,
            rewardsHistory: algorithm.rewardsHistory,
            finishingCoords: grid.finishLines,
            trapCoords: grid.traps
        });
    };


    return (
        <div className={Classes.OuterContainer}>
            <ScoreBoard
                plus={scoreBoard.showPlus}
                minus={scoreBoard.showMinus}
                finishReward={robot.grid.finishReward}
                trapPenalty={robot.grid.trapPenalty}
                steps={robot.steps}
                score={robot.score}
                round={robot.t}
            />
            <GridComponent
                robot={robot}
                rewards={true}
                rewardType={props.rewardType}
            />
            <button className={Classes.Btn} onClick={restartHandler}>
                Restart
                </button>
            {/* <button className={Classes.Btn} onClick={analysisHandler}>
                Analyse
            </button> */}
        </div>

    );
};


export default PlayGame;