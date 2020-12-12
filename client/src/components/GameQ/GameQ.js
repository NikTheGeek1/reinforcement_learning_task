import React, { useEffect, useState } from 'react';
import GridComponent from '../Grid/Grid';

import Classes from './GameQ.module.scss';

import Qlearning from '../../models/game/algorithms/qLearning';
import Grid from '../../models/game/grid';
import Robot from '../../models/game/robot';
import { columns, rows } from '../../models/setUpGrid';
import { finishingCoordinates, trapsCoordinates } from '../../models/setUpConditions';
import { useSelector } from 'react-redux';

const algorithm = new Qlearning(rows, columns);
const grid = new Grid(rows, columns, finishingCoordinates, trapsCoordinates);
const robot = new Robot(algorithm, grid, {x: 0, y: 0});

const GameQ = props => {
    const [dummyRender, setDummyRender] = useState(0);
    const parameters = useSelector(state => state.parameters.qLearning);

    useEffect(() => {

        const timer = setTimeout(() => {
            robot.move();
            setDummyRender(old => old + 1);
        }, 20);

        return () => clearTimeout(timer)
    }, [dummyRender, parameters.robotTimeMs, ]);

    return (
        <div className={Classes.OuterContainer}>
            {/* scoreContainer */}
            <GridComponent 
                robot={robot}
                rewards={true}
            />
        </div>
    );
};

export default GameQ;