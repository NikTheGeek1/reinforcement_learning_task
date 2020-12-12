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

const algorithm = new Qlearning(rows, columns);
const grid = new Grid(rows, columns, finishingCoordinates, trapsCoordinates);
const robot = new Robot(algorithm, grid, { x: 0, y: 0 });

const GameQ = props => {
    const [scoreBoard, setScoreBoard] = useState({ showPlus: false, showMinus: false, dummy: 0 });
    const parameters = useSelector(state => state.parameters.qLearning);

    useEffect(() => {

        const timer = setTimeout(() => {
            const trapOrFinish = robot.move();
            setScoreBoard({showMinus: false, showPlus: true, dummy: scoreBoard.dummy + 1});
            trapOrFinish === 'finish' && setScoreBoard({showMinus: false, showPlus: true});
            trapOrFinish === 'trap' && setScoreBoard({showMinus: true, showPlus: false});
        }, 20);

        return () => clearTimeout(timer)
    }, [scoreBoard, parameters.robotTimeMs]);
    return (
        <div className={Classes.OuterContainer}>
            <ScoreBoard
                plus={true}
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
        </div>
    );
};

export default GameQ;