import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Classes from './ParametersQ.module.scss';

import { changeParameter } from '../../store/actions/parameters';

const ParametersRL = props => {
    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters.qLearning);


    const paramHandler = (e, parameter) => {
        dispatch(changeParameter('qLearning', parameter, +e.target.value));
    };

    return (
        <div className={Classes.ParametersContainer}>
            <h1>Parameters</h1>
            <div className={Classes.ParamContainer}>
                <input
                    id="score"
                    type="range"
                    min="0"
                    max="500"
                    value={parameters.score}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'score')}
                />
                <label htmlFor="score">Score:{parameters.score}</label>
            </div>
            <div className={Classes.ParamContainer}>
                <input
                    id="steps"
                    type="range"
                    min="0"
                    max="1000"
                    step="1"
                    value={parameters.steps}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'steps')}
                />
                <label htmlFor="steps">steps: {parameters.steps}</label>
            </div>

            <div className={Classes.ParamContainer}>
                <input
                    id="finishReward"
                    type="range"
                    min="0"
                    max="10"
                    step=".1"
                    value={parameters.finishReward}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'finishReward')}
                />
                <label htmlFor="finishReward">Reward: {parameters.finishReward}</label>
            </div>

            <div className={Classes.ParamContainer}>
                <input
                    id="initialReward"
                    type="range"
                    min="0"
                    max="10"
                    step=".1"
                    value={parameters.initialReward}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'initialReward')}
                />
                <label htmlFor="initialReward">Initial Reward: {parameters.initialReward}</label>
            </div>

            <div className={Classes.ParamContainer}>
                <input
                    id="trapPenalty"
                    type="range"
                    min="-10"
                    max="0"
                    step=".1"
                    value={parameters.trapPenalty}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'trapPenalty')}
                />
                <label htmlFor="trapPenalty">Penalty: {parameters.trapPenalty}</label>
            </div>

            <div className={Classes.ParamContainer}>
                <input
                    id="h"
                    type="range"
                    min="-10"
                    max="0"
                    step=".1"
                    value={parameters.h}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'h')}
                />
                <label htmlFor="h">History penalty (h): {parameters.h}</label>
            </div>

            <div className={Classes.ParamContainer}>
                <input
                    disabled={props.human}
                    id="e"
                    type="range"
                    min="0"
                    max="1"
                    step=".01"
                    value={parameters.e}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'e')}
                />
                <label htmlFor="e">Exploration chance (e): {parameters.e}</label>
            </div>


            <div className={Classes.ParamContainer}>
                <input
                    id="a"
                    type="range"
                    min="0"
                    max="1"
                    step=".01"
                    value={parameters.a}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'a')}
                />
                <label htmlFor="a">Learning rate (a): {parameters.a}</label>
            </div>
            <div className={Classes.ParamContainer}>
                <input
                    id="gamma"
                    type="range"
                    min="0"
                    max="1"
                    step=".1"
                    value={parameters.gamma}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'gamma')}
                />
                <label htmlFor="gamma">Decay factor: {parameters.gamma}</label>
            </div>
            <div className={Classes.ParamContainer}>
                <input
                    disabled={props.human}
                    id="robotTimeMs"
                    type="range"
                    min="1"
                    max="1000"
                    step="10"
                    value={parameters.robotTimeMs}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'robotTimeMs')}
                />
                <label htmlFor="robotTimeMs">Robot Time in Milliseconds: {parameters.robotTimeMs}</label>
            </div>
        </div>
    );
};

export default ParametersRL;