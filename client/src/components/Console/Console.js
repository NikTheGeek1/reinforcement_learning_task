import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import Classes from './Console.module.scss';

import { changeType } from '../../store/actions/gameType';

const Console = props => {
    const dispatch = useDispatch();
    const selectElement = useRef();

    const selectGameTypeHandler = type => {
        selectElement.current.blur();
        dispatch(changeType(type.target.value));
    };

    return (
        <div className={Classes.Container}>
            <div className={Classes.GameType}>
                <label htmlFor="gameType">Select Mode: </label>
                <select ref={selectElement} name="gameType" id="gameType" onChange={selectGameTypeHandler}>
                    <option value="valueIteration">Value iteration</option>
                    <option value="human">Play the game</option>
                    <option value="qLearning">Q-Learning</option>
                </select>
            </div>
        </div>
    );
};

export default Console;