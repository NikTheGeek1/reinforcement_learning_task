import React, { useEffect, useState } from 'react';
import GridComponent from '../Grid/Grid';
import ScoreBoard from '../ScoreBoard/ScoreBoard';

import Classes from './GameQ.module.scss';

import Qlearning from '../../models/game/algorithms/qLearning';
import Grid from '../../models/game/grid';
import Robot from '../../models/game/robot';
import { columns, rows } from '../../models/setUpGrid';
import { finishingCoordinates, trapsCoordinates } from '../../models/setUpConditions';
import { useSelector } from 'react-redux';

let algorithm = new Qlearning(rows, columns);
let grid = new Grid(rows, columns, finishingCoordinates, trapsCoordinates);
let robot = new Robot(algorithm, grid, { x: 0, y: 0 });

const GameQ = props => {
    const [scoreBoard, setScoreBoard] = useState({ showPlus: false, showMinus: false, dummy: 0 });
    const params = useSelector(state => state.parameters.qLearning);

    useEffect(() => {

        const timer = setTimeout(() => {
            const trapOrFinish = robot.move();
            setScoreBoard({ showMinus: false, showPlus: false, dummy: scoreBoard.dummy + 1 });
            trapOrFinish === 'finish' && setScoreBoard({ showMinus: false, showPlus: true });
            trapOrFinish === 'trap' && setScoreBoard({ showMinus: true, showPlus: false });
        }, params.robotTimeMs);

        return () => clearTimeout(timer);
    }, [scoreBoard, params.robotTimeMs]);


    useEffect(() => {
        robot.score = params.score;
    }, [params.score]);

    useEffect(() => {
        robot.steps = params.steps;
    }, [params.steps]);

    useEffect(() => {
        algorithm.h = params.h;
    }, [params.h]);

    useEffect(() => {
        algorithm.a = params.a;
    }, [params.a]);

    useEffect(() => {
        algorithm.gamma = params.gamma;
    }, [params.gamma]);

    useEffect(() => {
        algorithm.e = params.e;
    }, [params.e]);

    useEffect(() => {
        algorithm.initialReward = params.initialReward;
    }, [params.initialReward]);

    useEffect(() => {
        grid.finishReward = params.reward;
    }, [params.reward]);

    useEffect(() => {
        grid.trapPenalty = params.penalty;
    }, [params.penalty]);


    const analysisHandler = () => {
        props.onAnalysis({
            robotHistory: robot.history,
            rewardsHistory: algorithm.rewardsHistory,
            finishingCoords: grid.finishLines,
            trapCoords: grid.traps
        });
    }; 

    const restartHandler = () => {
        algorithm = new Qlearning(rows, columns, params.initialReward, params.a, params.h, params.gamma, params.e);
        grid = new Grid(rows, columns, finishingCoordinates, trapsCoordinates, params.penalty, params.reward);
        robot = new Robot(algorithm, grid, { x: 0, y: 0 }, params.steps, params.score);
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
                rewards={true}
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

export default GameQ;