import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import GameValueIteration from '../../components/GameRL/Game';
import GameHuman from '../../components/Game/Game';
import GameQLearning from '../../components/GameQ/GameQ';
import ReportFigure from '../../components/ReportFigure/ReportFigure';
import Console from '../../components/Console/Console';

import ParametersQlearning from '../../components/GameQ/ParametersQ';
import ParametersValueIterations from '../../components/ParametersRL/ParametersRL';
import { GAME_TYPE_OPTIONS } from '../../store/actions/gameType';

import Classes from './Dashboard.module.scss';

const Dashboard = props => {
    const gameTypeState = useSelector(state => state.gameType);
    const [data, setData] = useState(null);

    const analysisHandler = dataObj => {
        setData(dataObj);
    };

    let game;
    let parameters;
    switch (GAME_TYPE_OPTIONS[gameTypeState.gameType]) {
        case GAME_TYPE_OPTIONS.valueIteration:
            game = <GameValueIteration onShowStats={analysisHandler} />;
            parameters = <ParametersValueIterations />;
            break;
        case GAME_TYPE_OPTIONS.human:
            game = <GameHuman />;
            break;
        case GAME_TYPE_OPTIONS.qLearning:
            game = <GameQLearning onAnalysis={analysisHandler}/>;
            parameters = <ParametersQlearning />;
            break;
        default:
            break;
    }

    return (
        <div className={Classes.Dashboard}>
            {game}
            {parameters}
            {data && <ReportFigure data={data}/>}
            <Console />
        </div>
    );
};

export default Dashboard;