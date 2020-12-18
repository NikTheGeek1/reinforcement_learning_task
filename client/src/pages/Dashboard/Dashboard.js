import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// universal stuff
import Grid from '../../models/game/grid';

// Algorithms
import Qlearning from '../../models/game/algorithms/qLearning';
import ValueIteration from '../../models/game/algorithms/valueIteration';
import MonteCarlo from '../../models/game/algorithms/monteCarlo';

// computer stuff
import GameComputer from '../../components/Game/GameComputer';
import RobotComputer from '../../models/game/robot';

// human stuff
import GameHuman from '../../components/Game/PlayGame'; // component
import RobotHum from '../../models/robotHuman'; // model


import ReportFigure from '../../components/ReportFigure/ReportFigure';
import Console from '../../components/Console/Console';

// parameters
import ParametersQlearning from '../../components/GameQ/ParametersQ';
import ParametersValueIterations from '../../components/ParametersRL/ParametersRL';
import ParametersMonteCarlo from '../../components/GameMC/ParametersMonteCarlo';

import { GAME_TYPE_OPTIONS } from '../../store/actions/gameType';


import { rows, columns } from '../../models/setUpGrid';
import { finishingCoordinates, trapsCoordinates } from '../../models/setUpConditions';

import Classes from './Dashboard.module.scss';
const Dashboard = props => {
    const gameTypeState = useSelector(state => state.gameType);
    const analyseHumanBehaviourState = useSelector(state => state.behaviourAlgo);
    const [data, setData] = useState(null);
    const analysisHandler = dataObj => {
        setData(dataObj);
    };

    let game;
    let parameters;
    switch (GAME_TYPE_OPTIONS[gameTypeState.gameType]) {

        case GAME_TYPE_OPTIONS.valueIteration:
            game = <GameComputer
                parameters={GAME_TYPE_OPTIONS.valueIteration}
                Robot={RobotComputer}
                Algorithm={ValueIteration}
                Grid={Grid}
                rewardType={GAME_TYPE_OPTIONS.valueIteration}
                gridSpecs={{ rows, columns, finishingCoordinates, trapsCoordinates }}
                onAnalysis={analysisHandler}
            />;
            parameters = <ParametersValueIterations />;
            break;

        case GAME_TYPE_OPTIONS.human:
            const RobotHuman = RobotHum;
            let AlgorithmHuman = ValueIteration;
            let rewardType;
            let algoParams = GAME_TYPE_OPTIONS.valueIteration;
            if (analyseHumanBehaviourState.algoType === GAME_TYPE_OPTIONS.valueIteration) {
                rewardType = GAME_TYPE_OPTIONS.valueIteration;
                parameters = <ParametersValueIterations human={true} />;
            } else if (analyseHumanBehaviourState.algoType === GAME_TYPE_OPTIONS.qLearning) {
                AlgorithmHuman = Qlearning;
                rewardType = GAME_TYPE_OPTIONS.qLearning;
                parameters = <ParametersQlearning human={true} />;
                algoParams = GAME_TYPE_OPTIONS.qLearning;
            } else if (analyseHumanBehaviourState.algoType === GAME_TYPE_OPTIONS.monteCarlo) {
                AlgorithmHuman = MonteCarlo;
                rewardType = GAME_TYPE_OPTIONS.monteCarlo;
                parameters = <ParametersMonteCarlo human={true} />;
                algoParams = GAME_TYPE_OPTIONS.monteCarlo;
            }

            game = <GameHuman
                parameters={algoParams}
                Robot={RobotHuman}
                Algorithm={AlgorithmHuman}
                Grid={Grid}
                rewardType={rewardType}
                gridSpecs={{ rows, columns, finishingCoordinates, trapsCoordinates }}
                onAnalysis={analysisHandler}
            />;
            break;
        case GAME_TYPE_OPTIONS.qLearning:
            game = <GameComputer
                parameters={GAME_TYPE_OPTIONS.qLearning}
                Robot={RobotComputer}
                Algorithm={Qlearning}
                Grid={Grid}
                rewardType={GAME_TYPE_OPTIONS.qLearning}
                gridSpecs={{ rows, columns, finishingCoordinates, trapsCoordinates }}
                onAnalysis={analysisHandler}
            />;
            parameters = <ParametersQlearning />;
            break;
        case GAME_TYPE_OPTIONS.monteCarlo:
            game = <GameComputer
                parameters={GAME_TYPE_OPTIONS.monteCarlo}
                Robot={RobotComputer}
                Algorithm={MonteCarlo}
                Grid={Grid}
                rewardType={GAME_TYPE_OPTIONS.monteCarlo}
                gridSpecs={{ rows, columns, finishingCoordinates, trapsCoordinates }}
                onAnalysis={analysisHandler}
            />;
            parameters = <ParametersMonteCarlo />;
            break;
        default:
            break;
    }

    return (
        <div className={Classes.Dashboard}>
            {game}
            {parameters}
            {data && <ReportFigure data={data} />}
            <Console
                human={GAME_TYPE_OPTIONS[gameTypeState.gameType] === GAME_TYPE_OPTIONS.human && true}
                humanWithNoAlgo={analyseHumanBehaviourState.algoType === 'human'}
            />
        </div>
    );
};

export default Dashboard;