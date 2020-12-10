import React from 'react';
import { useDispatch } from 'react-redux';

import Classes from './Console.module.scss';

import { changeType } from '../../store/actions/gameType';

const Console = props => {
    const dispatch = useDispatch();


    const selectGameTypeHandler = type => {
        dispatch(changeType(type.target.value));
    };

    return (
        <div className={Classes.Container}>
            <div className={Classes.GameType}>
                <select name="gameType" id="gameType" onChange={selectGameTypeHandler}>
                    <option value="valueIteration">Value iteration</option>
                    <option value="human">Play the game</option>
                </select>
            </div>
        </div>
    );
};

export default Console;