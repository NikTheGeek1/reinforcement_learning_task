import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import GameValueIteration from '../../components/GameRL/Game';
import GameHuman from '../../components/Game/Game';
import GameQLearning from '../../components/GameQ/GameQ';
import ReportFigure from '../../components/ReportFigure/ReportFigure';
import Console from '../../components/Console/Console';

import ParametersValueIterations from '../../components/ParametersRL/ParametersRL';
import { GAME_TYPE_OPTIONS } from '../../store/actions/gameType';

import Classes from './Dashboard.module.scss';

const Dashboard = props => {
    const gameTypeState = useSelector(state => state.gameType);
    const [figureSpecs, setFigureSpecs] = useState({ x: null, y: null, show: false });
    const showStatsHandler = (x, y) => {
        setFigureSpecs({
            x: x,
            y: y,
            show: true
        });
    };

    let game;
    let parameters;
    switch (GAME_TYPE_OPTIONS[gameTypeState.gameType]) {
        case GAME_TYPE_OPTIONS.valueIteration:
            game = <GameValueIteration onShowStats={showStatsHandler} />
            parameters = <ParametersValueIterations />
            break;

        case GAME_TYPE_OPTIONS.human:
            game = <GameHuman />;
            break;
        case GAME_TYPE_OPTIONS.qLearning:
            game = <GameQLearning />;
            break;
        default:
            break;
    }

    return (
        <div className={Classes.Dashboard}>
            {game}
            {parameters}
            {figureSpecs.show && <ReportFigure x={figureSpecs.x} y={figureSpecs.y} />}
            <Console />
        </div>
    );
};

export default Dashboard;