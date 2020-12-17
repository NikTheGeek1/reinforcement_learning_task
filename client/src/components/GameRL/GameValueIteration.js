import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Classes from './Game.module.scss';
import { useSelector } from 'react-redux';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import GridComponent from '../Grid/Grid';

let algorithm;
let grid;
let robot;
const GameValueIteration = props => {

    const params = useSelector(state => state.parameters.valueIteration);
    const [scoreBoard, setScoreBoard] = useState({ showPlus: false, showMinus: false, dummy: 0 });
    const [restart, setRestart] = useState(false);
    
    useMemo(() => {
        algorithm = new props.Algorithm(props.gridSpecs.rows, props.gridSpecs.columns, params);
        grid = new props.Grid(props.gridSpecs.rows, props.gridSpecs.columns, props.gridSpecs.finishingCoordinates, props.gridSpecs.trapsCoordinates, params);
        robot = new props.Robot(algorithm, grid, { x: 0, y: 0 }, params);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restart, props.Algorithm, props.Grid, props.Robot]);

    const trapOrFinish = useCallback(trapOrFinish => {
        setScoreBoard({ showMinus: false, showPlus: false, dummy: scoreBoard.dummy + 1 });
        trapOrFinish === 'finish' && setScoreBoard({ showMinus: false, showPlus: true });
        trapOrFinish === 'trap' && setScoreBoard({ showMinus: true, showPlus: false });
    }, [scoreBoard]);

    const restartHandler = () => {
        setRestart(oldState => !oldState);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            trapOrFinish(robot.move());
        }, params.robotTimeMs);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trapOrFinish]);

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
            />
            <GridComponent
                robot={robot}
                rewardType={props.rewardType}
            />
            <button className={Classes.Btn} onClick={restartHandler}>
                Restart
                </button>
            <button className={Classes.Btn} onClick={analysisHandler}>
                Analyse
            </button>
        </div>
    );
};

export default GameValueIteration;