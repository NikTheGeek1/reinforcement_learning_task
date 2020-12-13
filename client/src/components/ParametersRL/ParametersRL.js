import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Classes from './ParametersRL.module.scss';

import { changeParameter } from '../../store/actions/parameters';

const ParametersRL = props => {
    const dispatch = useDispatch();
    const parameters = useSelector(state => state.parameters.valueIteration);


    const paramHandler = (e, parameter) => {
        dispatch(changeParameter('valueIteration', parameter, +e.target.value));
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
                    id="reward"
                    type="range"
                    min="0"
                    max="10"
                    step=".1"
                    value={parameters.reward}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'reward')}
                />
                <label htmlFor="reward">Reward: {parameters.reward}</label>
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
                    id="penalty"
                    type="range"
                    min="-10"
                    max="0"
                    step=".1"
                    value={parameters.penalty}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'penalty')}
                />
                <label htmlFor="penalty">Penalty: {parameters.penalty}</label>
            </div>

            <div className={Classes.ParamContainer}>
                <input
                    id="h"
                    type="range"
                    min="0"
                    max="10"
                    step=".1"
                    value={parameters.h}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'h')}
                />
                <label htmlFor="h">History penalty (h): {parameters.h}</label>
            </div>

            <div className={Classes.ParamContainer}>
                <input
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
                    id="l"
                    type="range"
                    min="0"
                    max="1"
                    step=".01"
                    value={parameters.l}
                    className={Classes.Slider}
                    onChange={e => paramHandler(e, 'l')}
                />
                <label htmlFor="l">Learning rate (l): {parameters.l}</label>
            </div>

            <div className={Classes.ParamContainer}>
                <input
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